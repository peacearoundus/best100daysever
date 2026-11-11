(function () {
  "use strict";

  var data = window.ANNIVERSARY || {};
  var DAY_MS = 24 * 60 * 60 * 1000;

  // "2026-08-08" → 날짜 (시간대 때문에 하루씩 밀리지 않게 직접 나눠요)
  function parseDate(text) {
    var parts = String(text).split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function toKey(date) {
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var d = String(date.getDate()).padStart(2, "0");
    return date.getFullYear() + "-" + m + "-" + d;
  }

  function addDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
  }

  function daysBetween(from, to) {
    var a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
    var b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
    return Math.round((b - a) / DAY_MS);
  }

  function dotted(date) {
    return toKey(date).replace(/-/g, ".");
  }

  var WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

  var start = parseDate(data.startDate);
  var hundredth = addDays(start, 99); // 시작한 날이 1일째
  var hundredKey = toKey(hundredth);
  var today = new Date();
  var todayKey = toKey(today);

  // 만난 날을 날짜순으로 정리해요.
  // markOnly 인 날은 달력에 색만 칠하고, 기록 목록에는 넣지 않아요.
  var allMet = (data.memories || []).slice().sort(function (a, b) {
    return a.date < b.date ? -1 : 1;
  });
  var orderOf = {};
  var marked = {};
  allMet.forEach(function (m, i) {
    orderOf[m.date] = i + 1;
    if (m.markOnly) marked[m.date] = true;
  });

  // 100일째가 없으면 자동으로 넣어요.
  var memories = allMet.filter(function (m) { return !m.markOnly; });
  if (!memories.some(function (m) { return m.date === hundredKey; })) {
    memories.push({
      date: hundredKey,
      title: data.hundredTitle || "우리의 100일",
      note: data.hundredNote || "",
      photos: [],
      auto: true,
    });
  }
  memories.sort(function (a, b) { return a.date < b.date ? -1 : 1; });

  var byDate = {};
  memories.forEach(function (m, i) { byDate[m.date] = i; });

  // 달 탭: 첫 만남의 달부터 마지막 기록의 달까지
  var months = [];
  var last = parseDate(memories[memories.length - 1].date);
  var cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  while (cursor <= last) {
    months.push({ year: cursor.getFullYear(), month: cursor.getMonth() });
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  }

  var el = {
    range: document.getElementById("range"),
    title: document.getElementById("title"),
    statDay: document.getElementById("stat-day"),
    statLeft: document.getElementById("stat-left"),
    statMeets: document.getElementById("stat-meets"),
    progress: document.getElementById("progress"),
    progressFill: document.getElementById("progress-fill"),
    progressText: document.getElementById("progress-text"),
    order: document.getElementById("memory-order"),
    pagerCount: document.getElementById("pager-count"),
    months: document.getElementById("months"),
    days: document.getElementById("days"),
    memory: document.getElementById("memory"),
    empty: document.getElementById("memory-empty"),
    body: document.getElementById("memory-body"),
    day: document.getElementById("memory-day"),
    memTitle: document.getElementById("memory-title"),
    note: document.getElementById("memory-note"),
    photos: document.getElementById("memory-photos"),
    prev: document.getElementById("prev"),
    next: document.getElementById("next"),
    letter: document.getElementById("letter"),
    envelope: document.getElementById("envelope"),
    letterTo: document.getElementById("letter-to"),
    letterText: document.getElementById("letter-text"),
    letterCredit: document.getElementById("letter-credit"),
    letterFrom: document.getElementById("letter-from"),
    letterHint: document.getElementById("letter-hint"),
    lightbox: document.getElementById("lightbox"),
    lightboxImg: document.getElementById("lightbox-img"),
    lightboxClose: document.getElementById("lightbox-close"),
  };

  var state = { monthIndex: 0, selected: null };

  // ── 첫 화면 ──────────────────────────
  function renderHero() {
    if (data.title) {
      document.title = data.title;
      // 제목에서 강조할 부분(titleHighlight, 없으면 "100일" 같은 숫자)만 색을 다르게 칠해요.
      el.title.textContent = "";
      var hl = data.titleHighlight;
      var pattern = hl ? new RegExp("(" + hl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")") : /(\d+일)/;
      data.title.split(pattern).forEach(function (part) {
        if (hl ? part === hl : /^\d+일$/.test(part)) {
          var num = document.createElement("span");
          num.className = "hero__num";
          num.textContent = part;
          el.title.appendChild(num);
        } else if (part) {
          el.title.appendChild(document.createTextNode(part));
        }
      });
    }
    el.range.textContent = dotted(start) + " — " + dotted(hundredth);

    // 전광판: 오늘 며칠째인지, 100일까지 남은 날, 지금까지 만난 횟수
    var nth = Math.max(daysBetween(start, today) + 1, 0);
    var left = Math.max(100 - nth, 0);
    var meets = allMet.filter(function (m) {
      return m.date <= todayKey;
    }).length;
    var percent = Math.min(Math.round(nth), 100);

    el.statDay.textContent = nth >= 1 ? "D+" + nth : "D-" + (1 - nth);
    el.statLeft.textContent = left === 0 ? (nth === 100 ? "오늘!" : "지났어") : left + "일";
    el.statMeets.textContent = meets + "번";
    el.progress.setAttribute("aria-valuenow", String(percent));
    el.progressText.textContent = percent + "%";
    // 화면이 뜬 다음에 막대가 차오르도록 한 박자 늦춰요.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.progressFill.style.width = percent + "%";
      });
    });
  }

  // ── 달 탭 ────────────────────────────
  function renderMonths() {
    el.months.innerHTML = "";
    months.forEach(function (m, i) {
      var tab = document.createElement("button");
      tab.type = "button";
      tab.className = "months__tab";
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", String(i === state.monthIndex));
      tab.setAttribute("aria-label", m.year + "년 " + (m.month + 1) + "월");
      tab.textContent = m.month + 1 + "월";
      tab.addEventListener("click", function () {
        state.monthIndex = i;
        renderMonths();
        renderDays();
      });
      el.months.appendChild(tab);
    });
  }

  // ── 날짜 칸 ──────────────────────────
  function renderDays() {
    var m = months[state.monthIndex];
    var first = new Date(m.year, m.month, 1);
    var total = new Date(m.year, m.month + 1, 0).getDate();

    el.days.innerHTML = "";

    for (var blank = 0; blank < first.getDay(); blank++) {
      el.days.appendChild(document.createElement("span"));
    }

    for (var d = 1; d <= total; d++) {
      var date = new Date(m.year, m.month, d);
      var key = toKey(date);
      var hasMemory = key in byDate;
      var cell = document.createElement(hasMemory ? "button" : "span");
      cell.className = "day";
      if (marked[key]) cell.classList.add("day--memory", "day--marked");

      var num = document.createElement("span");
      num.className = "day__num";
      num.textContent = d;
      cell.appendChild(num);

      if (key === todayKey) cell.classList.add("day--today");

      if (hasMemory) {
        cell.type = "button";
        cell.classList.add("day--memory");
        if (key === hundredKey) cell.classList.add("day--hundred");
        if (key === state.selected) cell.classList.add("day--selected");
        cell.setAttribute(
          "aria-label",
          m.month + 1 + "월 " + d + "일, " + memories[byDate[key]].title
        );
        cell.setAttribute("aria-pressed", String(key === state.selected));
        cell.addEventListener("click", select.bind(null, key, true));

        var firstMeet = memories[0].date < data.startDate && key === memories[0].date;
        var tag = key === hundredKey ? "100일" : key === data.startDate ? "1일" : firstMeet ? "첫만남" : "";
        if (tag) {
          var tagEl = document.createElement("span");
          tagEl.className = "day__tag";
          tagEl.textContent = tag;
          cell.appendChild(tagEl);
        }
      }

      el.days.appendChild(cell);
    }
  }

  // ── 그날의 기록 ──────────────────────
  function renderMemory() {
    var index = byDate[state.selected];
    var memory = memories[index];
    var date = parseDate(memory.date);
    var nth = daysBetween(start, date) + 1;

    el.empty.hidden = true;
    el.body.hidden = false;

    // 날짜를 바꿀 때마다 톡 하고 나타나는 움직임을 다시 틀어요.
    el.body.classList.remove("is-fresh");
    void el.body.offsetWidth;
    el.body.classList.add("is-fresh");

    var isHundred = memory.date === hundredKey;
    el.order.textContent = isHundred ? "100일" : orderOf[memory.date] + "번째 만남";
    el.order.className = "chip " + (isHundred ? "chip--gold" : "chip--blue");
    el.day.textContent =
      date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate() + " " +
      WEEKDAYS[date.getDay()] + "요일 · " + (nth >= 1 ? nth + "일째" : "사귀기 " + (nth === 0 ? "전날" : 1 - nth + "일 전"));
    el.pagerCount.textContent = index + 1 + " / " + memories.length;
    // 제목이 여러 줄이 되어도 줄마다 밑줄이 그어지도록 span으로 감싸요.
    el.memTitle.textContent = "";
    var titleText = document.createElement("span");
    // 폰트에 없는 일본어(가나·한자)는 기본 글꼴로 나와서 크기만 살짝 줄여 맞춰요.
    String(memory.title || "").split(/([\u3040-\u30ff\u4e00-\u9fff]+)/).forEach(function (part) {
      if (!part) return;
      if (/^[\u3040-\u30ff\u4e00-\u9fff]+$/.test(part)) {
        var ja = document.createElement("span");
        ja.className = "ja";
        ja.textContent = part;
        titleText.appendChild(ja);
      } else {
        titleText.appendChild(document.createTextNode(part));
      }
    });
    el.memTitle.appendChild(titleText);
    el.note.textContent = memory.note || "";

    var photos = memory.photos || [];
    el.photos.innerHTML = "";
    el.photos.classList.toggle("photos--single", photos.length === 1);
    el.photos.hidden = photos.length === 0; // 사진이 없는 날은 글만 보여 줘요.

    // 가로 사진은 한 줄을 다 쓰고, 짝 없이 남는 세로 사진은 가운데에 놓아요.
    var waiting = photos.length;
    function arrange() {
      var tall = [].filter.call(el.photos.children, function (b) {
        b.classList.remove("photo--lone");
        return !b.classList.contains("photo--wide");
      });
      if (tall.length % 2 === 1) tall[tall.length - 1].classList.add("photo--lone");
    }
    function settled() {
      waiting -= 1;
      if (waiting === 0) arrange();
    }

    photos.forEach(function (src, i) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "photo";
      button.setAttribute("aria-label", "사진 " + (i + 1) + " 크게 보기");

      var img = document.createElement("img");
      img.alt = memory.title + " 사진 " + (i + 1);
      img.addEventListener("load", function () {
        if (img.naturalWidth > img.naturalHeight * 1.05) button.classList.add("photo--wide");
        settled();
      });
      // 파일이 없거나 이름이 틀리면 그 사진만 빼고 보여 줘요.
      img.addEventListener("error", function () {
        button.remove();
        settled();
      });
      img.src = src;

      button.appendChild(img);
      button.addEventListener("click", function () {
        el.lightboxImg.src = src;
        el.lightboxImg.alt = img.alt;
        el.lightbox.showModal();
      });
      el.photos.appendChild(button);
    });

    renderLetter(isHundred && data.hundredLetter);

    el.prev.disabled = index === 0;
    el.next.disabled = index === memories.length - 1;
  }

  // ── 100일 편지 ────────────────────────
  var letterTimer = null;

  function setLetterOpen(open) {
    el.letter.classList.toggle("is-open", open);
    el.envelope.setAttribute("aria-expanded", String(open));
    el.envelope.setAttribute("aria-label", open ? "100일 편지 닫기" : "100일 편지 열기");
    el.letterHint.textContent = open ? "봉투를 누르면 다시 넣을 수 있어" : "봉투를 눌러 봐";
  }

  function renderLetter(letter) {
    clearTimeout(letterTimer);
    el.letter.hidden = !letter;
    if (!letter) return;

    el.letterTo.textContent = letter.to || "";
    el.letterText.textContent = letter.text || "";
    el.letterCredit.textContent = letter.credit || "";
    el.letterFrom.textContent = letter.from || "";

    // 날짜를 누르면 닫힌 봉투가 먼저 보이고, 잠깐 뒤에 스르륵 열려요.
    setLetterOpen(false);
    sizeLetter();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeLetter);
    letterTimer = setTimeout(function () { setLetterOpen(true); }, 650);
  }

  // 편지 글이 길면 편지지가 그만큼 늘어나야 해서, 길이를 재서 알려 줘요.
  function sizeLetter() {
    if (el.letter.hidden) return;
    var paper = document.getElementById("letter-paper");
    var envH = el.envelope.clientHeight;
    var full = Math.max(paper.scrollHeight + 4, Math.round(envH * 0.92));
    var lift = -Math.round(envH * 0.25);
    // 편지지와 젖혀진 뚜껑(봉투 높이의 56%) 중 더 높이 올라오는 쪽만큼 비워 둬요.
    var room = Math.max(Math.round(full - envH * 0.96 - lift), Math.round(envH * 0.56)) + 14;
    el.letter.style.setProperty("--paper-full", full + "px");
    el.letter.style.setProperty("--paper-lift", lift + "px");
    el.letter.style.setProperty("--letter-room", room + "px");
  }

  window.addEventListener("resize", sizeLetter);

  el.envelope.addEventListener("click", function () {
    clearTimeout(letterTimer);
    setLetterOpen(!el.letter.classList.contains("is-open"));
  });

  function select(key, scroll) {
    state.selected = key;

    var date = parseDate(key);
    months.forEach(function (m, i) {
      if (m.year === date.getFullYear() && m.month === date.getMonth()) {
        state.monthIndex = i;
      }
    });

    renderMonths();
    renderDays();
    renderMemory();

    // 휴대폰에서는 기록이 달력 아래에 있어서, 그쪽으로 화면을 내려 줘요.
    if (scroll && window.matchMedia("(max-width: 859px)").matches) {
      el.memory.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function step(offset) {
    var index = byDate[state.selected] + offset;
    if (index >= 0 && index < memories.length) select(memories[index].date, false);
  }

  el.prev.addEventListener("click", step.bind(null, -1));
  el.next.addEventListener("click", step.bind(null, 1));

  el.lightboxClose.addEventListener("click", function () { el.lightbox.close(); });
  el.lightbox.addEventListener("click", function (event) {
    if (event.target === el.lightbox) el.lightbox.close();
  });

  renderHero();
  renderMonths();
  renderDays();
})();
