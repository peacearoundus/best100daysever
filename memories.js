/*
  ───────────────────────────────────────────────
  이 파일만 고치면 페이지 내용이 바뀌어요.
  ───────────────────────────────────────────────

  startDate : 사귀기 시작한 날 (이 날이 1일째예요)
              100일째 되는 날은 자동으로 계산돼요.

  memories  : 만난 날 목록. 한 줄이 하루예요.
    date    : "연도-월-일" 형식 (예: "2026-08-17")
    title   : 그날의 제목
    note    : 그날의 한마디 (없으면 "" 로 비워 두세요)
    markOnly: true 로 적으면 달력에 색만 칠하고 누를 수는 없어요.
    photos  : 지금은 [] 로 비워 둬요. 나중에 사진을 넣고 싶으면
              photos 폴더에 파일을 넣고 경로를 적으면 돼요.
              예: ["photos/0817-1.jpg"]

  만난 날은 캘린더의 초록색 일정에서 옮겨 왔어요.
  (8월 17~31일, 10월 18~24일은 아직 확인하지 못했어요.)
*/
window.ANNIVERSARY = {
  title: "역전 만루홈런!",
  // 제목에서 노란 밑줄로 강조할 부분 (없으면 "" 로 비워 두세요)
  titleHighlight: "만루홈런",
  startDate: "2026-08-17",

  // 100일째 날짜를 눌렀을 때 보여 줄 글
  hundredTitle: "우리의 100일",
  hundredNote: "",

  // 100일째 날짜를 누르면 봉투가 열리고 나오는 편지
  hundredLetter: {
    to: "To. 영우",
    // 지민이가 쓸 편지로 바꿔 주세요 (줄바꿈은 \n)
    text: "영우야, 우리 100일 축하해!\n앞으로도 잘 부탁해 💙",
    credit: "",
    from: "From. 지민",
  },

  memories: [
    {
      date: "2026-08-16",
      title: "우리의 첫 만남",
      note: "",
      photos: [
        "photos/0816-1-receipt.jpg",
        "photos/0816-2-keyring.jpg",
        "photos/0816-3-pasta.jpg",
        "photos/0816-4-icecream.jpg",
        "photos/0816-5-icecream.jpg",
        "photos/0816-6-hands.jpg",
      ],
    },
    {
      date: "2026-08-17",
      title: "우리가 시작한 날",
      note: "",
      photos: ["photos/0817-1-shoes.jpg"],
    },
    {
      date: "2026-08-19",
      title: "영우 야근한 날",
      note: "",
      photos: [
        "photos/0819-2-mirror.jpg",
        "photos/0819-3-tv.jpg",
        "photos/0819-4-kimbap.jpg",
      ],
    },
    {
      date: "2026-08-24",
      title: "레고랜드 🧱",
      note: "",
      photos: [
        "photos/0824-1-itx.jpg",
        "photos/0824-1b-itx-together.jpg",
        "photos/0824-2-selfie.jpg",
        "photos/0824-3-dakgalbi.jpg",
        "photos/0824-4-legoland.jpg",
      ],
    },
    {
      date: "2026-08-29",
      title: "오이도 여행 🌊",
      note: "",
      photos: [
        "photos/0829-1-crocs.jpg",
        "photos/0829-2-bus.jpg",
        "photos/0829-3-waves.jpg",
        "photos/0829-4-beach.jpg",
        "photos/0829-5-hoe.jpg",
      ],
    },

    // 9월
    {
      date: "2026-09-05",
      title: "경복궁 야간개장 🏯",
      note: "",
      photos: [
        "photos/0905-1-tea.jpg",
        "photos/0905-2-gwanghwamun.jpg",
        "photos/0905-3-letter.jpg",
        "photos/0905-4-night-yeongwoo.jpg",
        "photos/0905-5-gyeonghoeru.jpg",
        "photos/0905-6-heungnyemun.jpg",
      ],
    },
    {
      date: "2026-09-06",
      title: "용산가족공원 🌳",
      note: "",
      photos: [
        "photos/0906-1-shadows.jpg",
        "photos/0906-2-onigiri.jpg",
        "photos/0906-3-platform.jpg",
        "photos/0906-4-yongsan-jimin.jpg",
        "photos/0906-5-yongsan-yeongwoo.jpg",
        "photos/0906-6-feet.jpg",
        "photos/0906-7-namsan.jpg",
      ],
    },
    {
      date: "2026-09-09",
      title: "A7C2와 WOO 📸",
      note: "",
      photos: [
        "photos/0909-1-chicken.jpg",
        "photos/0909-2-camera.jpg",
      ],
    },
    {
      date: "2026-09-12",
      title: "오란다 아르바이트 한 날 ㅋ.ㅋ",
      note: "",
      photos: [
        "photos/0912-1-portraits.jpg",
        "photos/0912-2-drinks.jpg",
        "photos/0912-3-cereal.jpg",
        "photos/0912-4-elevator.jpg",
      ],
    },
    // markOnly: 달력에 색만 칠하고, 눌러도 기록이 열리지 않는 날
    { date: "2026-09-13", markOnly: true },
    {
      date: "2026-09-15",
      title: "다정이네 김밥 🍙",
      note: "",
      photos: [
        "photos/0915-1-gashapon.jpg",
        "photos/0915-2-kimbap.jpg",
        "photos/0915-3-goods.jpg",
      ],
    },
    {
      date: "2026-09-20",
      title: "영우짱의 友達たち 그리고 나",
      note: "",
      photos: [
        "photos/0920-1-bread.jpg",
        "photos/0920-2-bingsu.jpg",
        "photos/0920-3-bottles.jpg",
        "photos/0920-4-night-walk.jpg",
      ],
    },
    {
      date: "2026-09-23",
      title: "왕십리 한바퀴 🚶",
      note: "",
      photos: [
        "photos/0923-1-chicken-cup.jpg",
        "photos/0923-2-gimbap-sarang.jpg",
        "photos/0923-3-hotteok.jpg",
        "photos/0923-4-sammat.jpg",
      ],
    },
    {
      date: "2026-09-24",
      title: "청계천, 용마산 스카이워크 🌃",
      note: "",
      photos: [
        "photos/0924-1-cheonggyecheon.jpg",
        "photos/0924-2-mirror.jpg",
        "photos/0924-3-yukhoe.jpg",
        "photos/0924-4-skywalk.jpg",
        "photos/0924-5-nightview.jpg",
      ],
    },
    {
      date: "2026-09-25",
      title: "롯데전만 보려고 하면 우천취소가 되는 슬픔에 대하여 ☔",
      note: "",
      photos: [
        "photos/0925-1-cereal.jpg",
        "photos/0925-2-pasta.jpg",
        "photos/0925-3-kfc.jpg",
      ],
    },
    {
      date: "2026-09-28",
      title: "연차+반차=분좋카 그리고 두루치기 🤩",
      note: "",
      photos: [
        "photos/0928-1-hutan.jpg",
        "photos/0928-2-hutan-jimin.jpg",
        "photos/0928-3-garden.jpg",
        "photos/0928-4-bag.jpg",
        "photos/0928-5-stones.jpg",
        "photos/0928-6-duruchigi.jpg",
      ],
    },

    // 10월
    {
      date: "2026-10-04",
      title: "상주감꽃마을캠핑장 ⛺",
      note: "",
      photos: [
        "photos/1004-1-map.jpg",
        "photos/1004-2-road.jpg",
        "photos/1004-3-lake.jpg",
        "photos/1004-4-shadows.jpg",
        "photos/1004-5-firewood.jpg",
        "photos/1004-6-grill.jpg",
        "photos/1004-7-mirror.jpg",
        "photos/1004-8-bbq.jpg",
        "photos/1004-9-wine.jpg",
        "photos/1004-10-carplay.jpg",
        "photos/1004-11-stars.jpg",
      ],
    },
    {
      date: "2026-10-05",
      title: "진짜 맛있었다 그치 😋",
      note: "",
      photos: [
        "photos/1005-1-jjigae.jpg",
        "photos/1005-2-sandwich.jpg",
      ],
    },
    {
      date: "2026-10-07",
      title: "신당동 떡볶이 전도사 🎁",
      note: "",
      photos: [
        "photos/1007-1-tteokbokki.jpg",
        "photos/1007-2-pan-handle.jpg",
        "photos/1007-3-buttercup-gift.jpg",
        "photos/1007-4-mirror.jpg",
      ],
    },
    {
      date: "2026-10-11",
      title: "명동 나들이 🎬",
      note: "",
      photos: [
        "photos/1011-1-gomtang.jpg",
        "photos/1011-2-eggs.jpg",
        "photos/1011-3-chiikawa-ticket.jpg",
        "photos/1011-4-bread.jpg",
        "photos/1011-5-fried-rice.jpg",
      ],
    },
    {
      date: "2026-10-12",
      title: "굿바이 잠실 ⚾",
      note: "",
      photos: [
        "photos/1012-1-scoreboard.jpg",
        "photos/1012-2-mandoo.jpg",
        "photos/1012-3-jerseys.jpg",
        "photos/1012-4-last-day-of-jamsil.jpg",
      ],
    },
    {
      date: "2026-10-14",
      title: "여름 소리 🎤",
      note: "",
      photos: ["photos/1014-1-karaoke.jpg"],
    },
    {
      date: "2026-10-17",
      title: "여의도에서 영우 찾기 🔍",
      note: "",
      photos: [
        "photos/1017-1-ramen-machine.jpg",
        "photos/1017-2-picnic.jpg",
        "photos/1017-3-neoguri-sign.jpg",
      ],
    },
    {
      date: "2026-10-18",
      title: "사진 촬영 준비물: 귀여움 📸",
      note: "",
      photos: [
        "photos/1018-1-candy.jpg",
        "photos/1018-2-photostrip.jpg",
        "photos/1018-3-mirror.jpg",
        "photos/1018-4-walk.jpg",
      ],
    },
    {
      date: "2026-10-24",
      title: "서울식물원 🌿",
      note: "",
      photos: [
        "photos/1024-1-tickets.jpg",
        "photos/1024-2-bookmark.jpg",
        "photos/1024-3-leaf.jpg",
        "photos/1024-4-little-prince.jpg",
        "photos/1024-5-big-tree.jpg",
      ],
    },
    {
      date: "2026-10-25",
      title: "귀찮아하지 않고 잘 놀아주는 영우 🧤",
      note: "",
      photos: [
        "photos/1025-1-mcmorning.jpg",
        "photos/1025-2-pudding-kit.jpg",
        "photos/1025-3-chicken-tteokbokki.jpg",
        "photos/1025-4-glove.jpg",
        "photos/1025-5-night-view.jpg",
        "photos/1025-6-bike.jpg",
      ],
    },
    {
      date: "2026-10-27",
      title: "서른한살에 쿠지 일등이 된 우짱 🏆",
      note: "",
      photos: [
        "photos/1027-1-kuji-a.jpg",
        "photos/1027-2-kuji-proud.jpg",
      ],
    },
    {
      date: "2026-10-30",
      title: "영우 나안아... 듀지미니 🍺",
      note: "",
      photos: [
        "photos/1030-1-beer.jpg",
        "photos/1030-2-chicken.jpg",
      ],
    },

    // 11월
    {
      date: "2026-11-03",
      title: "저기압일 때는 고기 앞으로 🥩",
      note: "",
      photos: [
        "photos/1103-1-pork-pack.jpg",
        "photos/1103-2-grilled-pork.jpg",
        "photos/1103-3-gotgam-box.jpg",
        "photos/1103-4-gotgam.jpg",
      ],
    },
    {
      date: "2026-11-07",
      title: "지민이의 애착동네 서촌 🍂",
      note: "",
      photos: [
        "photos/1107-1-ginkgo-street.jpg",
        "photos/1107-2-salt-bread.jpg",
        "photos/1107-3-highball.jpg",
        "photos/1107-4-yakitori.jpg",
      ],
    },
    {
      date: "2026-11-08",
      title: "다이어트는 내일부터 🍽️",
      note: "",
      photos: [
        "photos/1108-1-buffet.jpg",
        "photos/1108-2-two-like-four.jpg",
      ],
    },
  ],
};
