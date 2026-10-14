// =====================================================
//  成大狗狗 GO —— 在校園散步、和中途狗狗交朋友
// =====================================================

// ===== 十二隻狗狗（圖鑑順序，照勤務須知）=====
const ALL_DOGS = [
  { id: 'zongxiong', name: '棕熊' }, { id: 'beiji', name: '北極' },
  { id: 'pidan', name: '皮蛋' },     { id: 'doufu', name: '豆腐' },
  { id: 'heijiu', name: '黑九' },    { id: 'dongdong', name: '東東' },
  { id: 'xiaoguai', name: '小乖' },  { id: 'baimi', name: '白米' },
  { id: 'doudou', name: '豆豆' },    { id: 'xiaowu', name: '小武' },
  { id: 'shutiao', name: '薯條' },   { id: 'brownie', name: '布朗尼' },
];

// ===== 這一版會出現的狗狗：之後要加新狗狗，就在這裡多加一筆 =====
// chance = 丟中時成為朋友的基本機率；sway = 狗狗左右晃動的幅度和速度
const DOGS = [
  {
    id: 'doufu', name: '豆腐', chance: 0.55, sway: { amp: 10, speed: 1.2 },
    colors: { body: '#f7f2e8', ear: '#ece1cf', muzzle: '#ffffff', chest: '#ffffff', collar: '#3c3c3c' },
    meet: '豆腐遇到陌生狗會兇兇地叫，要拉好牽繩喔。',
    fact: '豆腐對其他狗狗會護食（對人不會），餵零食時要讓牠自己一隻吃。遇到陌生狗會兇吠，要拉好牽繩。',
  },
  {
    id: 'beiji', name: '北極', chance: 0.55, sway: { amp: 12, speed: 1.4 },
    colors: { body: '#dcae74', ear: '#c99358', muzzle: '#f8ecd8', chest: '#fbf3e6', collar: '#3f8f5a' },
    meet: '北極看到不認識的狗會兇吠，遛狗時要握緊牽繩。',
    fact: '北極看到不認識的狗會兇吠（棕熊聽到也會跟著叫）。吃飯時在飼料桶旁的桌子吃，志工要在旁邊陪著。',
  },
  {
    id: 'dongdong', name: '東東', chance: 0.45, sway: { amp: 20, speed: 2.2 },
    colors: { body: '#c98a4b', ear: '#4a3326', muzzle: '#5a4030', chest: '#e3b27c', collar: '#d9534f' },
    meet: '汪汪汪！東東一直叫不是要咬人，只是太 high 了～',
    fact: '東東一直叫不是要咬人，只是太 high 了！牠大便會分很多次，撿便袋要多帶幾個。',
  },
  {
    id: 'xiaoguai', name: '小乖', chance: 0.65, sway: { amp: 6, speed: 1.0 },
    colors: { body: '#b9682f', ear: '#a3561f', muzzle: '#e0a26a', chest: '#e0a26a', collar: '#4a7bd1' },
    noSnack: true,
    meet: '小乖不能吃零食喔，用球陪牠玩吧！',
    fact: '小乖不能吃零食，上下樓梯要用抱的。如果發現牠咳嗽突然變頻繁，要通知主揪。',
  },
  {
    id: 'doudou', name: '豆豆', chance: 0.5, sway: { amp: 10, speed: 1.3 },
    colors: { body: '#6b6058', ear: '#4f463f', muzzle: '#7d726a', chest: '#7d726a', collar: '#e0457b', stripes: '#463d37' },
    meet: '豆豆比較怕高高的男生，動作放輕鬆一點～',
    fact: '豆豆是目前唯一需要刷牙的狗狗！牠比較怕高高的男生，零食要放在手掌上餵，不然手指會被咬到。',
  },
  {
    id: 'brownie', name: '布朗尼', chance: 0.4, sway: { amp: 14, speed: 1.6 },
    colors: { body: '#332d2a', ear: '#26211f', muzzle: '#4d433d', chest: '#433a35', collar: '#f0a030' },
    startle: true,
    meet: '布朗尼容易受驚嚇，所有動作都要慢慢來。',
    fact: '布朗尼容易受驚嚇，動作要慢慢來。散步時對什麼都很好奇，繩子要牽好；牠咬斷過牽繩，不要用太細的繩子。',
  },
  {
    id: 'zongxiong', name: '棕熊', chance: 0.5, sway: { amp: 16, speed: 1.8 },
    colors: { body: '#8a5f3e', ear: '#6e4a30', muzzle: '#4a3428', chest: '#9c6c47', collar: '#2f2f2f', stripes: '#5a3d28' },
    meet: '棕熊看到好吃的會很興奮，零食要放在手掌上餵喔！',
    fact: '棕熊其實很少主動兇人，通常是太興奮了。拿著零食時牠可能會跳起來，餵零食要放在手掌上；走上坡時不要走太快。',
  },
  {
    id: 'pidan', name: '皮蛋', chance: 0.5, sway: { amp: 16, speed: 1.5 },
    colors: { body: '#2f2d2c', ear: '#262423', muzzle: '#5a5552', chest: '#3a3735', collar: '#c9b98a' },
    noSnack: true,
    meet: '皮蛋力氣很大，又很會找骨頭吃，要小心喔！',
    fact: '皮蛋力氣很大，牽繩要握好；上下樓梯要用抱的。牠很會找骨頭吃，也會借力掙脫胸背、想過馬路，要特別注意。皮蛋不能吃零食。',
  },
  {
    id: 'heijiu', name: '黑九', chance: 0.3, sway: { amp: 8, speed: 0.8 },
    colors: { body: '#1f1d1c', ear: '#1a1817', muzzle: '#2e2b29', chest: '#262321', collar: '#e0b830' },
    startle: true, noTouch: true,
    meet: '黑九容易受驚，請放慢動作，也不可以摸牠喔。',
    fact: '黑九遛狗時不可以觸碰牠，也不要走在牠前面或走太快。牠對人會嚴重護食，送飯、收碗要由主揪負責。容易受驚，靠近時請放慢速度。',
  },
  {
    // angel: true = 外觀是小天使（光環、翅膀、發光），其他玩法跟大家一樣
    id: 'baimi', name: '白米', chance: 0.5, sway: { amp: 8, speed: 1.0 },
    colors: { body: '#e8cfa4', ear: '#dcbd8b', muzzle: '#f4e4c6', chest: '#f6ead2', collar: '#8b2a2a' },
    angel: true, startle: true,
    meet: '白米有點怕陌生人，抖抖抖…動作放輕一點喔。',
    fact: '白米是個挑食小孩！遇到陌生人會害怕得抖抖抖，但很喜歡蹭蹭人類。',
  },
  {
    id: 'xiaowu', name: '小武', chance: 0.45, sway: { amp: 5, speed: 0.7 },
    colors: { body: '#998670', ear: '#6f6457', muzzle: '#7a6a5a', chest: '#b89a74', collar: '#5a8f5a' },
    startle: true, noTouch: true,
    meet: '小武眼睛看不太清楚，靠近時動作要放慢，也不要摸牠喔。',
    fact: '小武眼睛看不太到，容易受驚嚇，靠近時請放慢速度，也不要摸牠。牠是唯一不用穿胸背的狗狗。對其他狗會護食，餵零食要回自己的房間再餵。',
  },
  {
    id: 'shutiao', name: '薯條', chance: 0.3, sway: { amp: 18, speed: 1.6 },
    colors: { body: '#c48a50', ear: '#b07740', muzzle: '#2a211c', chest: '#d4a06a', collar: '#3c6e8f' },
    noTouch: true,
    meet: '薯條力氣很大，互動要小心，不要摸牠喔。',
    fact: '薯條遛狗時不可以觸碰，從 2026 年 5 月開始出現攻擊行為，互動請小心。力氣很大，牽繩要握好；剛進門時會跳起來撲人。若牠一直盯著某個人，可以喊牠的名字分散注意力。',
  },
];

// ===== 每隻狗狗的個性小標籤（圖鑑裡會顯示）=====
const TAGS = {
  doufu: ['白白一隻', '對狗會護食', '看到陌生狗會叫'],
  beiji: ['看到陌生狗會叫', '在桌子旁吃飯'],
  dongdong: ['超級 high', '愛叫但不咬人', '大便分很多次'],
  xiaoguai: ['不能吃零食', '上下樓梯要抱抱'],
  doudou: ['唯一要刷牙', '怕高高的男生', '零食放手掌餵'],
  brownie: ['容易受驚嚇', '什麼都好奇', '咬斷過牽繩'],
  zongxiong: ['太興奮會跳', '零食放手掌餵', '其實很少兇人'],
  pidan: ['力氣很大', '很會找骨頭', '不能吃零食'],
  heijiu: ['不能觸摸', '容易受驚', '對人護食'],
  baimi: ['挑食小孩', '怕陌生人', '喜歡蹭蹭'],
  xiaowu: ['眼睛看不太清楚', '不能觸摸', '對狗會護食'],
  shutiao: ['力氣很大', '進門會撲人', '不能觸摸'],
};

// ===== 地圖：參考成大「成功校區」的系館配置（單位：像素）=====
// 北邊小東路、南邊大學路、西邊勝利路、東邊長榮路
const W = 1314, H = 1831;                                    // 整張地圖大小
const BOUND = { x1: 100, y1: 100, x2: 1214, y2: 1731 };      // 校園範圍：只能在這裡面走
const BUILDINGS = [                                           // 系館：進不去，要繞路
  // 西側（靠勝利路）
  { name: '化學系', x: 150, y: 137, w: 195, h: 91 },
  { name: '理學教學大樓<br>物理系', x: 124, y: 241, w: 221, h: 247 },
  { name: '資訊大樓', x: 124, y: 982, w: 234, h: 65 },
  { name: '理化大樓', x: 124, y: 1073, w: 182, h: 169 },
  { name: '地科系館', x: 124, y: 1268, w: 221, h: 130 },
  { name: '綜合二館', x: 116, y: 1437, w: 216, h: 104 },
  { name: '綜合大樓<br>光電系', x: 116, y: 1567, w: 229, h: 156 },
  // 中間
  { name: '牙醫系<br><small>（舊生科系館）</small>', x: 357, y: 116, w: 295, h: 125 },
  { name: '總圖書館', x: 363, y: 340, w: 294, h: 200 },
  { name: '數學系館', x: 298, y: 756, w: 203, h: 114 },
  { name: '測量系館', x: 506, y: 756, w: 208, h: 114 },
  { name: '舊化學系館', x: 392, y: 1026, w: 299, h: 172 },
  { name: '舊物理系館', x: 392, y: 1203, w: 299, h: 156 },
  { name: '格致堂', x: 475, y: 1385, w: 143, h: 104 },
  { name: '校史館<br>博物館', x: 405, y: 1536, w: 322, h: 156 },
  // 東側（靠長榮路）
  { name: '水利系館', x: 782, y: 132, w: 244, h: 109 },
  { name: '海工大樓', x: 1052, y: 124, w: 146, h: 125 },
  { name: '環工系館', x: 782, y: 280, w: 208, h: 195 },
  { name: '卓群大樓', x: 1016, y: 280, w: 161, h: 195 },
  { name: '土木系館', x: 782, y: 532, w: 390, h: 190 },
  { name: '材料系館', x: 782, y: 774, w: 390, h: 190 },
  { name: '資源系館', x: 787, y: 1016, w: 390, h: 195 },
  { name: '資訊系館', x: 787, y: 1263, w: 390, h: 187 },
  { name: '工科系館', x: 787, y: 1502, w: 390, h: 190 },
];
const GARDENS = [                                             // 可以走進去的綠地
  { name: '大新園', x: 116, y: 618, w: 164, h: 65 },
  { name: '新園', x: 116, y: 722, w: 164, h: 170 },
  { name: '總圖前草地', x: 380, y: 575, w: 330, h: 150, round: true },
];
const HOME = { x: 757, y: 1726 };                             // 中途：博物館旁、靠大學路
const START = { x: 757, y: 1605 };                            // 從中途門口出發

// ===== 不能去的地方（地圖上不畫出來，走到才跳出提醒）=====
// 參考中途白板地圖：紅色虛線以北不在範圍內；❌ 的地方不要靠近
const NO_GO_AREAS = [
  { x1: 0, y1: 0, x2: 745, y2: 885, why: 'out' },        // 數學、測量系館（含）以北
  { x1: 745, y1: 0, x2: W, y2: 980, why: 'out' },        // 材料系館（含）以北
  { x1: 1180, y1: 980, x2: W, y2: 1490, why: 'x' },      // 三系館東側、靠長榮路
  { x1: 0, y1: 0, x2: 120, y2: H, why: 'west' },         // 西側系館靠勝利路的整段
  // 西側系館之間不能穿越
  { x1: 0, y1: 1040, x2: 366, y2: 1080, why: 'gap' },    // 資訊大樓 ↔ 理化大樓
  { x1: 0, y1: 1235, x2: 353, y2: 1275, why: 'gap' },    // 理化大樓 ↔ 地科系館
  { x1: 0, y1: 1391, x2: 353, y2: 1444, why: 'gap' },    // 地科系館 ↔ 綜合二館
  { x1: 0, y1: 1534, x2: 353, y2: 1574, why: 'gap' },    // 綜合二館 ↔ 綜合大樓
  // 中間這排（舊化學系館、舊物理系館、格致堂、校史館博物館）之間不能穿越
  { x1: 392, y1: 1026, x2: 727, y2: 1692, why: 'gap' },
];
const NO_GO_SPOTS = [                                         // 白板上的 ❌
  { x: 220, y: 885, r: 70 },                                  // 數學系館西側
  { x: 1195, y: 1476, r: 55 },                                // 長榮路旁、資訊和工科系館之間
];
const NO_GO_MSG = '🚧 這裡不能去喔，換個方向走吧～';   // 系館以外不能去的地方，都只顯示這句
function noGo(x, y) {
  const a = NO_GO_AREAS.find((r) => x >= r.x1 && x <= r.x2 && y >= r.y1 && y <= r.y2);
  if (a) return a.why;
  if (NO_GO_SPOTS.some((s) => Math.hypot(x - s.x, y - s.y) < s.r)) return 'x';
  return null;
}
const TREES = [[140, 660], [250, 760], [150, 860], [400, 610], [690, 600], [740, 300], [745, 760], [745, 990], [750, 1470], [368, 1480], [1000, 505], [1100, 505], [720, 1250], [200, 940], [260, 540], [600, 935]];

// ===== 遊戲設定 =====
const SPEED = 230;         // 走路速度
const NEAR = 150;          // 狗狗在這個距離內才能互動（白色虛線圈）
const MAX_MAP_DOGS = 4;    // 地圖上同時最多幾隻狗狗
const MAX_STOPS = 5;       // 地圖上同時最多幾個骨頭／廚餘

// ===== 小工具 =====
const $ = (id) => document.getElementById(id);
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const photoOf = (id) => `images/${id}.jpg`;

// ===== 畫狗狗 =====
function dogSVG(c, angel = false) {
  // 小天使：背上的翅膀和頭上的光環
  const wings = angel
    ? `<path d="M36 84 Q4 62 6 94 Q16 90 20 102 Q28 92 38 98 Z" fill="#fff" stroke="#e8d9a0" stroke-width="2"/>
       <path d="M84 84 Q116 62 114 94 Q104 90 100 102 Q92 92 82 98 Z" fill="#fff" stroke="#e8d9a0" stroke-width="2"/>`
    : '';
  const halo = angel
    ? `<ellipse cx="60" cy="-2" rx="22" ry="6" fill="none" stroke="#ffd84a" stroke-width="4.5"/>`
    : '';
  const stripes = c.stripes
    ? `<path d="M42 28 q6 6 2 12 M52 24 q5 6 1 12 M68 24 q-5 6 -1 12 M78 28 q-6 6 -2 12" stroke="${c.stripes}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>`
    : '';
  return `
  <svg class="dog-svg" viewBox="0 0 120 124" xmlns="http://www.w3.org/2000/svg">
    ${wings}
    <g class="tail"><path d="M86 94 Q110 84 104 60" stroke="${c.body}" stroke-width="10" fill="none" stroke-linecap="round"/></g>
    <ellipse cx="60" cy="92" rx="30" ry="24" fill="${c.body}"/>
    <ellipse cx="60" cy="97" rx="14" ry="17" fill="${c.chest}"/>
    <ellipse cx="46" cy="115" rx="9" ry="6.5" fill="${c.body}"/>
    <ellipse cx="74" cy="115" rx="9" ry="6.5" fill="${c.body}"/>
    <path d="M40 74 Q60 84 80 74" stroke="${c.collar}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g class="head">
      <path d="M33 40 L27 7 L55 27 Z" fill="${c.ear}"/>
      <path d="M87 40 L93 7 L65 27 Z" fill="${c.ear}"/>
      <path d="M36 33 L32 15 L48 28 Z" fill="#f2b8b5" opacity=".6"/>
      <path d="M84 33 L88 15 L72 28 Z" fill="#f2b8b5" opacity=".6"/>
      <ellipse cx="60" cy="48" rx="31" ry="27" fill="${c.body}"/>
      ${stripes}
      <ellipse cx="60" cy="62" rx="15" ry="11" fill="${c.muzzle}"/>
      <circle cx="47" cy="46" r="5.5" fill="#fff" opacity=".35"/>
      <circle cx="73" cy="46" r="5.5" fill="#fff" opacity=".35"/>
      <circle cx="47" cy="46" r="4.2" fill="#2b2220"/><circle cx="48.5" cy="44.5" r="1.5" fill="#fff"/>
      <circle cx="73" cy="46" r="4.2" fill="#2b2220"/><circle cx="74.5" cy="44.5" r="1.5" fill="#fff"/>
      <ellipse cx="60" cy="56.5" rx="5.5" ry="3.8" fill="#1d1512"/>
      <path d="M54 63 Q57 67 60 63 Q63 67 66 63" stroke="#1d1512" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <ellipse cx="39" cy="57" rx="5" ry="3" fill="#f39a9a" opacity=".5"/>
      <ellipse cx="81" cy="57" rx="5" ry="3" fill="#f39a9a" opacity=".5"/>
      ${halo}
    </g>
  </svg>`;
}

// 志工小人（穿橘色志工背心）
const PLAYER_SVG = `
  <svg viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="20" cy="57" rx="13" ry="3.5" fill="rgba(0,0,0,.2)"/>
    <rect x="12" y="44" width="6" height="12" rx="3" fill="#4a5a7a"/>
    <rect x="22" y="44" width="6" height="12" rx="3" fill="#4a5a7a"/>
    <rect x="8" y="23" width="24" height="25" rx="9" fill="#ff8a2a"/>
    <rect x="8" y="33" width="24" height="4" fill="#fff36b"/>
    <circle cx="20" cy="14" r="10" fill="#ffd9b8"/>
    <path d="M10 13 Q12 3 20 3 Q28 3 30 13 Q25 8 20 9 Q15 8 10 13 Z" fill="#3b2a20"/>
    <circle cx="16.5" cy="15" r="1.4" fill="#3b2a20"/><circle cx="23.5" cy="15" r="1.4" fill="#3b2a20"/>
  </svg>`;

// ===== 圖鑑紀錄（存在這台電腦的瀏覽器裡）=====
const DEX_KEY = 'ncku-dog-go-dex';
// 每隻狗狗記錄：{ n: 交朋友次數, first: 第一次相遇的日期 }
function loadDex() {
  let raw = {};
  try { raw = JSON.parse(localStorage.getItem(DEX_KEY)) || {}; } catch (e) { /* 讀不到就從空的開始 */ }
  Object.keys(raw).forEach((id) => { if (typeof raw[id] === 'number') raw[id] = { n: raw[id], first: '' }; });
  return raw;
}
const dexCount = (id) => (dex[id] ? dex[id].n : 0);
// 友好度：交朋友次數，加上在中途每互動 3 次多 1 顆心（最多 10 顆）
const friendLevel = (id) => (dex[id] ? Math.min(10, dex[id].n + Math.floor((dex[id].love || 0) / 3)) : 0);
function saveDex(dex) {
  try { localStorage.setItem(DEX_KEY, JSON.stringify(dex)); } catch (e) { /* 存不了就算了 */ }
}
let dex = loadDex();

// ===== 遊戲狀態 =====
let state = null;
let soundOn = true;
let lastFrame = 0;
const view = $('view');
const world = $('world');
const enc = $('encounter');

function showScreen(name) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('show'));
  $('screen-' + name).classList.add('show');
}

// ===== 開始畫面 =====
function buildStartScreen() {
  $('start-dogs').innerHTML = DOGS.map((d) =>
    `<figure class="${d.angel ? 'angel' : ''}"><img src="${photoOf(d.id)}" alt="${d.name}">${d.angel ? '👼 ' : ''}${d.name}</figure>`).join('');
}

// ===== 畫出地圖 =====
function buildWorld() {
  world.style.width = W + 'px';
  world.style.height = H + 'px';
  let html = `
    <div class="road-line" style="left:0;right:0;top:45px"></div>
    <div class="road-line" style="left:0;right:0;top:${H - 45}px"></div>
    <div class="road-line v" style="top:0;bottom:0;left:45px"></div>
    <div class="road-line v" style="top:0;bottom:0;left:${W - 45}px"></div>
    <div class="road-label" style="left:50%;top:6px">小東路</div>
    <div class="road-label" style="left:50%;top:${H - 34}px">大學路</div>
    <div class="road-label v" style="left:8px;top:50%">勝利路</div>
    <div class="road-label v" style="left:${W - 36}px;top:50%">長榮路</div>
    <div class="campus" style="left:90px;top:90px;width:${W - 180}px;height:${H - 180}px"></div>`;
  GARDENS.forEach((g) => {
    html += `<div class="garden${g.round ? ' round' : ''}" style="left:${g.x}px;top:${g.y}px;width:${g.w}px;height:${g.h}px"><span>${g.name}</span></div>`;
  });
  BUILDINGS.forEach((b) => {
    html += `<div class="bld" style="left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px"><span>${b.name}</span></div>`;
  });
  html += `<div id="home" class="home" style="left:${HOME.x}px;top:${HOME.y}px;z-index:${HOME.y}"><i class="home-hint">點我進去</i><span>🏠</span><b>中途</b></div>`;
  TREES.forEach(([x, y]) => { html += `<div class="tree" style="left:${x}px;top:${y}px;z-index:${y}">🌳</div>`; });
  html += `
    <div class="car" style="top:20px"><span>🛵</span></div>
    <div class="car back" style="top:${H - 72}px;animation-delay:-4s"><span>🚗</span></div>
    <div class="car" style="top:${H - 72}px;animation-delay:-7s"><span>🛵</span></div>
    <div id="range" class="range" style="width:${NEAR * 2}px;height:${NEAR * 2}px"></div>
    <div id="target" class="target hidden"></div>
    <div id="player" class="player">${PLAYER_SVG}</div>`;
  world.innerHTML = html;
}

// ===== 開始散步 =====
function startWalk() {
  buildWorld();
  $('toasts').innerHTML = '';
  enc.classList.add('hidden');
  $('shelter').classList.add('hidden');
  state = {
    running: true, paused: false,
    player: { x: START.x, y: START.y, tx: null, ty: null },
    keys: new Set(), balls: 8, snacks: 2,
    dist: 0, recycled: 0, friends: [],
    mapDogs: [], stops: [], nextDogIn: 0.8,
    tipsShown: new Set(), toastAt: {}, encounter: null, shelter: null,
  };
  for (let i = 0; i < MAX_STOPS; i++) addStop();
  $('home').addEventListener('pointerdown', (e) => { e.stopPropagation(); clickHome(); });
  showScreen('game');
  updateHud();
  render();
  lastFrame = performance.now();
  requestAnimationFrame(loop);
  setTimeout(() => toast('👆 點地圖上的任何地方，就能走過去！', 4000), 400);
}

// ===== 主迴圈 =====
function loop(now) {
  if (!state || !state.running) return;
  const dt = Math.min(0.1, (now - lastFrame) / 1000);
  lastFrame = now;
  if (!state.paused) {
    if (state.shelter) updateShelter(dt);
    else if (state.encounter) updateEncounter(dt);
    else updateMap(dt);
  }
  requestAnimationFrame(loop);
}

function updateMap(dt) {
  const p = state.player;

  // 決定走的方向：鍵盤優先，不然就走向點過的地方
  let vx = 0, vy = 0;
  const k = state.keys;
  if (k.size) {
    vx = (k.has('ArrowRight') || k.has('d') ? 1 : 0) - (k.has('ArrowLeft') || k.has('a') ? 1 : 0);
    vy = (k.has('ArrowDown') || k.has('s') ? 1 : 0) - (k.has('ArrowUp') || k.has('w') ? 1 : 0);
    if (vx || vy) p.tx = null;
  }
  if (!vx && !vy && p.tx !== null) {
    const dx = p.tx - p.x, dy = p.ty - p.y, d = Math.hypot(dx, dy);
    if (d < 5) p.tx = null; else { vx = dx / d; vy = dy / d; }
  }
  let moving = false;
  if (vx || vy) {
    const len = Math.hypot(vx, vy);
    const step = SPEED * dt;
    moving = walkTo(p.x + (vx / len) * step, p.y + (vy / len) * step);
  }
  $('player').classList.toggle('moving', moving);

  // 走過骨頭／廚餘就回收
  state.stops = state.stops.filter((s) => {
    if (Math.hypot(s.x - p.x, s.y - p.y) > 50) return true;
    collectStop(s);
    return false;
  });

  // 狗狗出現
  state.nextDogIn -= dt;
  if (state.nextDogIn <= 0) {
    if (state.mapDogs.length < MAX_MAP_DOGS) spawnDog();
    state.nextDogIn = rand(4, 7);
  }
  state.mapDogs.forEach((md) => updateMapDog(md, dt));
  state.mapDogs = state.mapDogs.filter((md) => !md.gone);

  updateHud();
  render();
}

// 嘗試走到 (nx, ny)，碰到馬路或系館就停下來
function insideBuilding(x, y, pad = 8) {
  return BUILDINGS.some((b) => x > b.x - pad && x < b.x + b.w + pad && y > b.y - 4 && y < b.y + b.h + pad);
}
function walkTo(nx, ny) {
  const p = state.player;
  if (nx < BOUND.x1 || nx > BOUND.x2 || ny < BOUND.y1 || ny > BOUND.y2) {
    toastOnce('nogo', NO_GO_MSG);
    nx = clamp(nx, BOUND.x1, BOUND.x2);
    ny = clamp(ny, BOUND.y1, BOUND.y2);
  }
  // 系館、範圍外、❌ 都走不過去
  const blocked = (x, y) => (insideBuilding(x, y) ? 'building' : noGo(x, y));
  const why = blocked(nx, ny);
  if (why) {
    if (!blocked(nx, p.y)) ny = p.y;                 // 沿著邊邊滑過去
    else if (!blocked(p.x, ny)) nx = p.x;
    else { nx = p.x; ny = p.y; }
    if (why === 'building') toastOnce('building', '🏢 系館不能去喔，繞過去吧～');
    else toastOnce('nogo', NO_GO_MSG);
  }
  const moved = Math.hypot(nx - p.x, ny - p.y);
  if (moved < 0.01) { p.tx = null; return false; }
  state.dist += moved;
  p.x = nx; p.y = ny;
  return true;
}

// 找一個可以放東西的空地
function randomSpot(minFromPlayer = 0, maxFromPlayer = 9999) {
  const p = state.player;
  for (let i = 0; i < 150; i++) {
    const x = rand(BOUND.x1 + 40, BOUND.x2 - 40);
    const y = rand(BOUND.y1 + 60, BOUND.y2 - 20);
    const d = Math.hypot(x - p.x, y - p.y);
    if (!insideBuilding(x, y, 35) && !noGo(x, y) && !noGo(x, y - 40) && d >= minFromPlayer && d <= maxFromPlayer) return { x, y };
  }
  return { x: START.x + rand(-15, 15), y: START.y + rand(0, 50) };   // 找不到就放在中途附近
}

// ===== 骨頭／廚餘（像寶可夢的補給站）=====
function addStop() {
  let spot = randomSpot(120);
  for (let i = 0; i < 20 && state.stops.some((s) => Math.hypot(s.x - spot.x, s.y - spot.y) < 150); i++) {
    spot = randomSpot(120);   // 不要跟別的骨頭／廚餘擠在一起
  }
  const { x, y } = spot;
  const el = document.createElement('div');
  el.className = 'stop';
  el.textContent = Math.random() < 0.5 ? '🦴' : '🍱';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  world.appendChild(el);
  state.stops.push({ x, y, el, kind: el.textContent });
}

function collectStop(s) {
  s.el.remove();
  state.recycled += 1;
  const gotSnack = Math.random() < 0.3;
  state.balls += 2;
  if (gotSnack) state.snacks += 1;
  const what = s.kind === '🦴' ? '骨頭' : '廚餘';
  toast(`${s.kind} 回收了${what}！獲得 🥎×2${gotSnack ? '、🍪×1' : ''}`);
  tip('stop', '骨頭、廚餘要盡量不讓狗狗吃到，看到就回收起來吧！');
  floatWorld(s.x, s.y - 20, '✨');
  ding(780, 0.1);
  // 過一下子在別的地方再出現
  setTimeout(() => { if (state && state.running) addStop(); }, 6000);
}

// ===== 地圖上的狗狗 =====
function spawnDog() {
  const onMap = new Set(state.mapDogs.map((m) => m.data.id));
  let pool = DOGS.filter((d) => !onMap.has(d.id));
  const notYet = pool.filter((d) => !state.friends.includes(d.id));
  if (notYet.length && Math.random() < 0.75) pool = notYet;   // 優先讓還沒交到朋友的狗狗出現
  if (!pool.length) return;
  const data = pick(pool);
  const { x, y } = randomSpot(200, 420);   // 出現在你附近，畫面上看得到
  const el = document.createElement('div');
  el.className = 'mdog spawn' + (data.angel ? ' angel' : '');
  el.innerHTML = `<div class="excl">${data.angel ? '✨' : '❗'}</div><div class="m-svg">${dogSVG(data.colors, data.angel)}</div><div class="m-name">${data.angel ? '👼 ' : ''}${data.name}</div>`;
  world.appendChild(el);
  const md = { data, el, x, y, hx: x, hy: y, tx: x, ty: y, idle: 1, life: rand(40, 55), gone: false, near: false };
  el.addEventListener('pointerdown', (e) => { e.stopPropagation(); clickMapDog(md); });
  state.mapDogs.push(md);
  floatWorld(x, y - 40, '✨');
}

function updateMapDog(md, dt) {
  md.life -= dt;
  if (md.life <= 0) {
    md.gone = true;
    md.el.classList.add('leaving');
    setTimeout(() => md.el.remove(), 900);
    return;
  }
  // 在出現的地方附近慢慢晃
  if (md.idle > 0) md.idle -= dt;
  else {
    const dx = md.tx - md.x, dy = md.ty - md.y, d = Math.hypot(dx, dy);
    if (d < 2) {
      md.idle = rand(1.5, 4);
      const nx = md.hx + rand(-60, 60), ny = md.hy + rand(-40, 40);
      if (!insideBuilding(nx, ny, 30) && !noGo(nx, ny)) { md.tx = clamp(nx, BOUND.x1, BOUND.x2); md.ty = clamp(ny, BOUND.y1 + 40, BOUND.y2); }
    } else {
      const step = Math.min(d, 35 * dt);
      md.x += (dx / d) * step; md.y += (dy / d) * step;
      md.el.querySelector('.dog-svg').style.transform = dx < 0 ? 'scaleX(-1)' : '';
    }
  }
  const p = state.player;
  md.near = Math.hypot(md.x - p.x, md.y - p.y) <= NEAR;
  md.el.classList.toggle('near', md.near);
}

function clickMapDog(md) {
  if (!state || !state.running || state.paused || state.encounter || state.shelter || md.gone) return;
  if (!md.near) {
    toastOnce('far', '再走近一點，狗狗頭上出現 ❗ 才能跟牠玩喔！', 2500);
    state.player.tx = md.x; state.player.ty = md.y + 10;   // 自動走過去
    return;
  }
  md.gone = true;
  md.el.remove();
  startEncounter(md.data);
}

// ===== 畫面更新 =====
function render() {
  const p = state.player;
  const pl = $('player');
  pl.style.left = p.x + 'px'; pl.style.top = p.y + 'px'; pl.style.zIndex = Math.round(p.y);
  const r = $('range');
  r.style.left = p.x + 'px'; r.style.top = (p.y - 6) + 'px';
  $('home').classList.toggle('near', nearHome());
  const t = $('target');
  if (p.tx !== null) { t.classList.remove('hidden'); t.style.left = p.tx + 'px'; t.style.top = p.ty + 'px'; }
  else t.classList.add('hidden');
  state.mapDogs.forEach((md) => {
    md.el.style.left = md.x + 'px'; md.el.style.top = md.y + 'px'; md.el.style.zIndex = Math.round(md.y);
  });
  // 鏡頭跟著人走；螢幕小的時候自動拉遠一點，看得到更多校園
  const z = clamp(Math.min(view.clientWidth, view.clientHeight * 0.8) / 650, 0.55, 1);
  const vw = view.clientWidth / z, vh = view.clientHeight / z;
  const cx = vw >= W ? (W - vw) / 2 : clamp(p.x - vw / 2, 0, W - vw);
  const cy = vh >= H ? (H - vh) / 2 : clamp(p.y - vh / 2, 0, H - vh);
  state.cam = { x: cx, y: cy, z };
  world.style.transform = `scale(${z}) translate(${-cx}px, ${-cy}px)`;
}

function updateHud() {
  $('steps').textContent = Math.round(state.dist / 6);
  $('balls').textContent = state.balls;
  $('snacks').textContent = state.snacks;
  $('c-ball').textContent = state.balls;
  $('c-snack').textContent = state.snacks;
}

// 遊戲畫面固定不捲動（避免畫面跑掉）
view.addEventListener('scroll', () => { view.scrollTop = 0; view.scrollLeft = 0; });

// 點地圖：走過去
view.addEventListener('pointerdown', (e) => {
  if (!state || !state.running || state.paused || state.encounter || state.shelter) return;
  if (e.target.closest('.hud')) return;
  const rect = view.getBoundingClientRect();
  const z = state.cam.z;
  state.player.tx = clamp((e.clientX - rect.left) / z + state.cam.x, BOUND.x1, BOUND.x2);
  state.player.ty = clamp((e.clientY - rect.top) / z + state.cam.y, BOUND.y1, BOUND.y2);
});

// =====================================================
//  中途：和已經交到的朋友們互動
// =====================================================
function nearHome() {
  return Math.hypot(state.player.x - HOME.x, state.player.y - (HOME.y - 20)) <= NEAR;
}

function clickHome() {
  if (!state || !state.running || state.paused || state.encounter || state.shelter) return;
  if (!nearHome()) {
    toastOnce('farhome', '再走近一點，就能進中途囉！', 2500);
    state.player.tx = HOME.x; state.player.ty = HOME.y - 50;   // 自動走過去
    return;
  }
  openShelter();
}

function openShelter() {
  state.keys.clear();
  state.player.tx = null;
  const sh = { dogs: [], sel: null, nextBarkIn: rand(5, 9), tips: new Set() };
  state.shelter = sh;
  const area = $('sh-area');
  area.innerHTML = '';
  const friends = DOGS.filter((d) => dexCount(d.id) > 0);
  friends.forEach((data, i) => {
    const el = document.createElement('div');
    el.className = 'sdog' + (data.angel ? ' angel' : '');
    el.innerHTML = `<div class="say"></div><div class="dog-body">${dogSVG(data.colors, data.angel)}</div><div class="m-name">${data.angel ? '👼 ' : ''}${data.name}</div>`;
    area.appendChild(el);
    const sd = {
      data, el,
      x: rand(12, 88),
      y: rand(55, 92),
      tx: 0, ty: 0, idle: rand(0.3, 2), busy: 0, mode: 'wander', sayTimer: null,
    };
    sd.tx = sd.x; sd.ty = sd.y;
    el.addEventListener('pointerdown', (e) => { e.stopPropagation(); selectShelterDog(sd); });
    sh.dogs.push(sd);
  });
  $('sh-count').textContent = friends.length ? `・${friends.length} 位朋友` : '';
  $('sh-empty').classList.toggle('hidden', friends.length > 0);
  $('sh-panel').classList.add('hidden');
  $('sh-snacks').textContent = state.snacks;
  $('shelter').classList.remove('hidden');
  updateShelter(0);
  if (friends.length) toast('🏠 歡迎回中途！點狗狗就能跟牠互動喔～', 3500);
  ding(660, 0.08); setTimeout(() => ding(880, 0.08), 120);
}

function closeShelter() {
  if (!state || !state.shelter) return;
  state.shelter = null;
  $('sh-area').innerHTML = '';
  $('shelter').classList.add('hidden');
  updateHud();
  lastFrame = performance.now();
}

function updateShelter(dt) {
  const sh = state.shelter;
  // 東東偶爾在中途裡亂叫
  sh.nextBarkIn -= dt;
  if (sh.nextBarkIn <= 0) {
    const dd = sh.dogs.find((d) => d.data.id === 'dongdong');
    if (dd) shSay(dd, '汪汪汪汪！');
    sh.nextBarkIn = rand(8, 14);
  }
  sh.dogs.forEach((sd) => {
    if (sd.busy > 0) {
      sd.busy -= dt;
      if (sd.busy <= 0) { sd.mode = 'wander'; sd.el.classList.remove('happy'); }
    }
    let moving = false;
    const still = sh.sel === sd || (sd.busy > 0 && sd.mode !== 'zoom');
    if (!still) {
      if (sd.idle > 0) sd.idle -= dt;
      else {
        const dx = sd.tx - sd.x, dy = sd.ty - sd.y, d = Math.hypot(dx, dy);
        if (d < 0.8) {
          sd.idle = sd.mode === 'zoom' ? 0 : rand(1, 3.5);
          sd.tx = rand(10, 90); sd.ty = rand(55, 93);
        } else {
          const step = Math.min(d, (sd.mode === 'zoom' ? 35 : 7) * dt);
          sd.x += (dx / d) * step; sd.y += (dy / d) * step;
          moving = true;
          sd.el.querySelector('.dog-svg').style.transform = dx < 0 ? 'scaleX(-1)' : '';
        }
      }
    }
    sd.el.classList.toggle('moving', moving);
    sd.el.style.left = sd.x + '%';
    sd.el.style.top = sd.y + '%';
    sd.el.style.zIndex = Math.round(sd.y * 10);
  });
}

// 點了一隻狗狗：下方出現可以做的事
function selectShelterDog(sd) {
  const sh = state.shelter;
  if (!sh || state.paused) return;
  if (sh.sel) sh.sel.el.classList.remove('sel');
  sh.sel = sd;
  sd.el.classList.add('sel');
  refreshShelterPanel();
  $('sh-panel').classList.remove('hidden');
  ding(600, 0.05);
}

function shelterActions(d) {
  const acts = [
    d.noTouch ? { id: 'stay', icon: '🪑', label: '靜靜陪牠' } : { id: 'pet', icon: '✋', label: '摸摸' },
    { id: 'ball', icon: '🥎', label: '玩球' },
    { id: 'snack', icon: '🍪', label: '餵零食' },
  ];
  if (d.id === 'doudou') acts.push({ id: 'brush', icon: '🪥', label: '刷牙' });
  return acts;
}

function refreshShelterPanel() {
  const sd = state.shelter && state.shelter.sel;
  if (!sd) return;
  const d = sd.data;
  const lv = friendLevel(d.id);
  $('sh-photo').src = photoOf(d.id);
  $('sh-photo').className = d.angel ? 'angel' : '';
  $('sh-name').textContent = (d.angel ? '👼 ' : '') + d.name;
  $('sh-level').textContent = '友好度 ' + '❤️'.repeat(lv);
  $('sh-acts').innerHTML = shelterActions(d).map((a) =>
    `<button class="item" data-act="${a.id}">${a.icon} ${a.label}</button>`).join('');
  $('sh-acts').querySelectorAll('button').forEach((b) => b.addEventListener('click', () => shelterAct(b.dataset.act)));
  $('sh-snacks').textContent = state.snacks;
}

function shSay(sd, text, ms = 1500) {
  const s = sd.el.querySelector('.say');
  s.textContent = text;
  s.classList.add('show');
  clearTimeout(sd.sayTimer);
  sd.sayTimer = setTimeout(() => s.classList.remove('show'), ms);
}

// 在中途的小知識：每次進中途，每則只說一次
function shTip(key, text) {
  const sh = state.shelter;
  if (sh.tips.has(key)) return;
  sh.tips.add(key);
  toast('💡 ' + text, 4200);
}

function shFloat(sd, icon) {
  const el = document.createElement('div');
  el.className = 'float';
  el.textContent = icon;
  el.style.left = (sd.x + rand(-3, 3)) + '%';
  el.style.top = (sd.y - 14) + '%';
  $('sh-area').appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

function shelterAct(act) {
  const sd = state.shelter && state.shelter.sel;
  if (!sd || sd.busy > 0) return;
  const d = sd.data;
  let text = '', icon = '❤️';

  if (act === 'pet') {
    text = d.id === 'baimi' ? '（蹭蹭你的手）' : pick(['好舒服～', '（瞇眼睛）', '再摸一下嘛！']);
    icon = '💕';
  } else if (act === 'stay') {
    text = '（安心地趴下）';
    icon = '🍃';
    shTip(d.id + '-stay', d.id === 'xiaowu'
      ? '小武眼睛看不太到、容易受驚嚇，不要摸牠，在旁邊靜靜陪牠就好～'
      : `${d.name}不喜歡被摸，在旁邊靜靜陪牠就很好了～`);
  } else if (act === 'ball') {
    text = '衝啊～！';
    icon = '🥎';
    sd.mode = 'zoom';
    sd.idle = 0;
    sd.tx = rand(10, 90); sd.ty = rand(55, 93);
  } else if (act === 'snack') {
    if (d.noSnack) {
      shSay(sd, '🙅');
      sd.el.classList.add('shake');
      setTimeout(() => sd.el.classList.remove('shake'), 700);
      toast(`💡 ${d.name}不能吃零食喔！改摸摸牠或陪牠玩球吧～`);
      return;
    }
    if (state.snacks <= 0) {
      toast('🍪 零食吃完了，去校園回收骨頭、廚餘就能拿到喔！');
      return;
    }
    state.snacks -= 1;
    text = d.id === 'baimi' ? '（聞一聞…挑食中）喀滋！' : '喀滋喀滋！';
    icon = '🍪';
    if (d.id === 'zongxiong' || d.id === 'doudou') shTip(d.id + '-snack', `餵${d.name}零食要放在手掌上，不然手指會被咬到喔！`);
    if (d.id === 'doufu' || d.id === 'xiaowu') shTip(d.id + '-snack', `${d.name}對其他狗會護食，餵零食時讓牠自己吃。`);
    if (d.id === 'shutiao') shTip('shutiao-snack', '薯條的零食要盡量少吃喔。');
  } else if (act === 'brush') {
    text = '牙齒亮晶晶✨';
    icon = '🪥';
    shTip('doudou-brush', '目前只有豆豆需要刷牙喔！');
  }

  const before = friendLevel(d.id);
  dex[d.id].love = (dex[d.id].love || 0) + 1;
  saveDex(dex);
  shSay(sd, text);
  shFloat(sd, icon);
  setTimeout(() => shFloat(sd, '❤️'), 150);
  sd.el.classList.remove('happy'); void sd.el.offsetWidth; sd.el.classList.add('happy');
  sd.busy = act === 'ball' ? 2.5 : 1.2;
  if (act === 'ball') {           // 玩球時先放開選擇，讓牠跑一跑
    sd.el.classList.remove('sel');
    state.shelter.sel = null;
    $('sh-panel').classList.add('hidden');
  }
  ding(660, 0.1); setTimeout(() => ding(990, 0.1), 90);
  if (friendLevel(d.id) > before) {
    toast(`❤️ 和${d.name}的友好度提升了！`);
    [523, 659, 784].forEach((f, i) => setTimeout(() => ding(f, 0.08), 200 + i * 100));
  }
  refreshShelterPanel();
}

// =====================================================
//  遇到狗狗：丟球交朋友
// =====================================================
function startEncounter(data) {
  const e = {
    data, t: 0, mode: 'aim', ring: 1, misses: 0,
    item: state.balls > 0 ? 'ball' : 'snack', fly: null, token: {},
  };
  state.encounter = e;
  const stars = data.chance >= 0.6 ? '🟢 很親人' : data.chance >= 0.5 ? '🟡 有點害羞' : '🔴 很有個性';
  $('enc-name').textContent = (data.angel ? '👼 ' : '') + data.name;
  $('enc-diff').textContent = stars;
  $('enc-ring').style.borderColor = data.chance >= 0.6 ? '#3fbf5f' : data.chance >= 0.5 ? '#f0b400' : '#e5534b';
  $('enc-svg').innerHTML = dogSVG(data.colors, data.angel);
  $('enc-dog').className = 'enc-dog' + (data.angel ? ' angel' : '');
  enc.classList.remove('hidden');
  setMsg('💬 ' + data.meet);
  if (data.id === 'dongdong') say('汪汪汪汪！');
  ding(600, 0.1); setTimeout(() => ding(800, 0.1), 100);
  setTimeout(() => { if (state.encounter === e && e.mode === 'aim') setMsg('把球往上滑丟給' + data.name + '，或直接點一下球！'); }, 3200);
  resetBall();
}

function setMsg(text) { $('enc-msg').textContent = text; }

function say(text, ms = 1400) {
  const s = $('enc-say');
  s.textContent = text;
  s.classList.add('show');
  clearTimeout(say.timer);
  say.timer = setTimeout(() => s.classList.remove('show'), ms);
}

function ballHome() {
  return { x: enc.clientWidth / 2, y: enc.clientHeight - 125 };
}

function placeBall(x, y, scale = 1, rot = 0) {
  const b = $('enc-ball');
  b.style.left = x + 'px';
  b.style.top = y + 'px';
  b.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rot}deg)`;
}

function resetBall() {
  const e = state.encounter;
  if (!e) return;
  // 沒有道具時，主揪幫忙補給
  if (state.balls <= 0 && state.snacks <= 0) {
    state.balls += 5;
    toast('📦 主揪幫你補了 🥎×5！');
  }
  if (e.item === 'ball' && state.balls <= 0) e.item = 'snack';
  if (e.item === 'snack' && state.snacks <= 0) e.item = 'ball';
  $('item-ball').classList.toggle('active', e.item === 'ball');
  $('item-snack').classList.toggle('active', e.item === 'snack');
  const b = $('enc-ball');
  b.textContent = e.item === 'ball' ? '🥎' : '🍪';
  b.style.visibility = 'visible';
  const h = ballHome();
  placeBall(h.x, h.y);
  e.mode = 'aim';
  updateHud();
}

function chooseItem(item) {
  const e = state && state.encounter;
  if (!e || e.mode !== 'aim') return;
  if (item === 'snack' && state.snacks <= 0) { toast('🍪 零食用完了，去回收骨頭或廚餘可以拿到喔！'); return; }
  if (item === 'ball' && state.balls <= 0) { toast('🥎 球用完了，去回收骨頭或廚餘可以拿到喔！'); return; }
  e.item = item;
  resetBall();
}

function updateEncounter(dt) {
  const e = state.encounter;
  e.t += dt;
  if (e.mode === 'aim' || e.mode === 'flying') {
    const off = Math.sin(e.t * e.data.sway.speed) * e.data.sway.amp;
    $('enc-dog').style.left = (50 + off) + '%';
    e.ring = 1 - 0.65 * ((e.t % 1.8) / 1.8);
    $('enc-ring').style.transform = `translate(-50%, -50%) scale(${e.ring})`;
  }
  if (e.mode === 'flying') {
    const f = e.fly;
    f.p = Math.min(1, f.p + dt / 0.6);
    const x = f.sx + (f.tx - f.sx) * f.p;
    const y = f.sy + (f.ty - f.sy) * f.p - Math.sin(Math.PI * f.p) * 120;
    placeBall(x, y, 1 - 0.45 * f.p, f.p * 540);
    if (f.p >= 1) resolveThrow();
  }
}

// 狗狗目前的位置（以遇到畫面為準）
function dogBox() {
  const er = enc.getBoundingClientRect();
  const r = $('enc-svg').getBoundingClientRect();
  return { cx: r.left - er.left + r.width / 2, cy: r.top - er.top + r.height * 0.6, w: r.width, h: r.height };
}

// 拖曳 / 點擊球
const ball = $('enc-ball');
let drag = null;
ball.addEventListener('pointerdown', (ev) => {
  const e = state && state.encounter;
  if (!e || e.mode !== 'aim' || state.paused) return;
  ev.preventDefault();
  ball.setPointerCapture(ev.pointerId);
  drag = { x: ev.clientX, y: ev.clientY };
});
ball.addEventListener('pointermove', (ev) => {
  if (!drag) return;
  const er = enc.getBoundingClientRect();
  placeBall(ev.clientX - er.left, ev.clientY - er.top, 1.05);
});
ball.addEventListener('pointerup', (ev) => {
  if (!drag) return;
  const e = state.encounter;
  const dx = ev.clientX - drag.x, dy = ev.clientY - drag.y;
  drag = null;
  const er = enc.getBoundingClientRect();
  const home = ballHome();
  const dog = dogBox();
  let sx, sy, tx;
  if (Math.abs(dx) < 15 && Math.abs(dy) < 15) {
    // 只是點一下：直直往前丟
    sx = home.x; sy = home.y; tx = home.x;
  } else if (dy > -25) {
    setMsg('要把球「往上」滑，才丟得出去喔！');
    resetBall();
    return;
  } else {
    sx = ev.clientX - er.left; sy = ev.clientY - er.top;
    tx = clamp(sx + dx * ((sy - dog.cy) / -dy), 0, er.width);
  }
  throwItem(e, sx, sy, tx, dog.cy);
});
ball.addEventListener('pointercancel', () => { drag = null; resetBall(); });

function throwItem(e, sx, sy, tx, ty) {
  if (e.item === 'ball') state.balls -= 1; else state.snacks -= 1;
  e.thrown = e.item;
  e.fly = { sx, sy, tx, ty, p: 0 };
  e.mode = 'flying';
  updateHud();
  ding(440, 0.06);
}

function resolveThrow() {
  const e = state.encounter;
  const dog = dogBox();
  const hit = Math.abs(e.fly.tx - dog.cx) < dog.w * 0.42;
  const token = e.token;
  const later = (ms, fn) => setTimeout(() => { if (state.encounter && state.encounter.token === token) fn(); }, ms);

  if (!hit) {
    e.mode = 'wait';
    e.misses += 1;
    setMsg('沒丟到～再試一次！（狗狗會左右晃，看準時機）');
    if (e.data.startle) { say('（嚇一跳！）'); $('enc-dog').classList.add('shake'); }
    later(900, () => { $('enc-dog').classList.remove('shake'); resetBall(); });
    ding(300, 0.06);
    return;
  }

  // 丟中了！
  placeBall(dog.cx, dog.cy + dog.h * 0.35, 0.5);
  if (e.thrown === 'snack' && e.data.noSnack) {
    e.mode = 'wait';
    state.snacks += 1; // 零食還你
    $('enc-dog').classList.add('shake');
    say('🙅');
    setMsg(`💡 ${e.data.name}不能吃零食喔！零食還給你，用球陪牠玩吧～`);
    later(1500, () => { $('enc-dog').classList.remove('shake'); e.item = 'ball'; resetBall(); });
    return;
  }

  let bonus = 0, word = '不錯！';
  if (e.ring < 0.55) { bonus = 0.3; word = '太棒了！'; }
  else if (e.ring < 0.8) { bonus = 0.15; word = '很好！'; }
  const chance = Math.min(0.95, e.data.chance + bonus + (e.thrown === 'snack' ? 0.25 : 0) + e.misses * 0.08);
  const success = Math.random() < chance;
  const ticks = success ? 3 : 1 + Math.floor(Math.random() * 3);

  e.mode = 'think';
  setMsg(`${word} ${e.data.name}在考慮要不要跟你當朋友…`);
  floatEnc(dog.cx, dog.cy - dog.h * 0.6, word === '太棒了！' ? '🌟' : '⭐');
  $('enc-dog').classList.add('think');
  $('enc-ball').style.visibility = 'hidden';
  for (let i = 1; i <= ticks; i++) later(i * 650, () => { say('…'.repeat(i)); ding(500 + i * 80, 0.06); });

  later(ticks * 650 + 400, () => {
    $('enc-dog').classList.remove('think');
    if (success) befriend(e);
    else {
      e.misses += 1;
      say(pick(['汪！還想再玩～', '（搖尾巴）再一次！', '嗷嗚～']));
      setMsg('差一點點！再丟一次看看～');
      later(900, resetBall);
    }
  });
}

function befriend(e) {
  e.mode = 'done';
  const d = e.data;
  if (!dex[d.id]) dex[d.id] = { n: 0, first: new Date().toLocaleDateString('zh-TW') };
  dex[d.id].n += 1;
  saveDex(dex);
  if (!state.friends.includes(d.id)) state.friends.push(d.id);
  $('enc-dog').classList.add('happy');
  say('汪汪！❤️');
  setMsg(`🎉 和${d.name}成為好朋友了！`);
  const dog = dogBox();
  for (let i = 0; i < 5; i++) setTimeout(() => floatEnc(dog.cx + rand(-60, 60), dog.cy - rand(20, 90), pick(['❤️', '💕', '✨'])), i * 120);
  [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => ding(f, 0.1), i * 110));
  setTimeout(() => showFriendCard(d), 1300);
}

function showFriendCard(d) {
  const lv = dexCount(d.id);
  $('f-photo').src = photoOf(d.id);
  $('f-photo').className = 'f-photo' + (d.angel ? ' angel' : '');
  $('f-title').textContent = lv === 1 ? `新朋友：${d.name}！` : `和${d.name}更要好了！`;
  $('f-level').textContent = '友好度 ' + '❤️'.repeat(friendLevel(d.id));
  $('f-fact').textContent = '📋 志工小知識：' + d.fact;
  $('friend').classList.remove('hidden');
}

function endEncounter() {
  if (state && state.encounter) state.encounter.token = null;
  state.encounter = null;
  enc.classList.add('hidden');
  $('enc-ball').style.visibility = 'visible';
  lastFrame = performance.now();
}

function floatEnc(x, y, text) {
  const el = document.createElement('div');
  el.className = 'float';
  el.textContent = text;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  enc.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

function floatWorld(x, y, text) {
  const el = document.createElement('div');
  el.className = 'float';
  el.textContent = text;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  world.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

// ===== 提示訊息 =====
function toast(text, ms = 3000) {
  const box = $('toasts');
  if (box.children.length >= 2) box.firstChild.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = text;
  box.appendChild(el);
  setTimeout(() => el.remove(), ms);
}
// 同一種提示，一小段時間內只出現一次
function toastOnce(key, text, cooldown = 4000) {
  const now = performance.now();
  if (state.toastAt[key] && now - state.toastAt[key] < cooldown) return;
  state.toastAt[key] = now;
  toast(text);
}
// 小知識：每次散步每則只出現一次
function tip(key, text) {
  if (state.tipsShown.has(key)) return;
  state.tipsShown.add(key);
  toast('💡 小知識：' + text, 4500);
}

// ===== 聲音 =====
let audioCtx = null;
function ding(freq, vol) {
  if (!soundOn) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain(), t0 = audioCtx.currentTime;
    o.type = 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.3);
    o.connect(g).connect(audioCtx.destination);
    o.start(t0); o.stop(t0 + 0.32);
  } catch (err) { /* 不支援聲音就算了 */ }
}

// ===== 圖鑑 =====
function openDex() {
  if (state && state.running) state.paused = true;
  const available = new Set(DOGS.map((d) => d.id));
  let met = 0;
  $('dex-grid').innerHTML = ALL_DOGS.map((d, i) => {
    const no = String(i + 1).padStart(2, '0');
    if (!available.has(d.id)) {
      return `<button class="dex-cell locked" data-id="${d.id}"><img src="${photoOf(d.id)}" alt=""><b>No.${no}</b>🔒 即將登場</button>`;
    }
    const lv = dexCount(d.id);
    if (!lv) return `<button class="dex-cell unknown" data-id="${d.id}"><img src="${photoOf(d.id)}" alt=""><b>No.${no} ？？？</b>還沒遇到</button>`;
    met += 1;
    const angel = DOGS.find((x) => x.id === d.id).angel;
    return `<button class="dex-cell${angel ? ' angel' : ''}" data-id="${d.id}"><img src="${photoOf(d.id)}" alt="${d.name}"><b>No.${no} ${angel ? '👼 ' : ''}${d.name}</b><span class="lv">${'❤️'.repeat(Math.min(friendLevel(d.id), 5))}</span></button>`;
  }).join('');
  $('dex-grid').querySelectorAll('.dex-cell').forEach((cell) => {
    cell.addEventListener('click', () => openDexInfo(cell.dataset.id));
  });
  $('dex-count').textContent = `（${met} / ${ALL_DOGS.length}）`;
  $('dex').classList.remove('hidden');
}

// 圖鑑：點一隻狗狗，看牠的詳細資料
function openDexInfo(id) {
  const i = ALL_DOGS.findIndex((d) => d.id === id);
  const base = ALL_DOGS[i];
  const d = DOGS.find((x) => x.id === id);
  const lv = dexCount(id);
  const photo = $('di-photo');
  photo.src = photoOf(id);
  photo.className = 'f-photo' + (!d ? ' locked' : !lv ? ' unknown' : d.angel ? ' angel' : '');
  $('di-no').textContent = 'No.' + String(i + 1).padStart(2, '0');

  let body;
  if (!d) {
    $('di-name').textContent = base.name;
    body = `<p class="di-status">🔒 即將登場</p><p class="tiny">${base.name}還在準備中，之後的版本就會在校園裡出現囉！</p>`;
  } else if (!lv) {
    $('di-name').textContent = '？？？';
    body = `<p class="di-status">還沒遇到</p><p class="tiny">這隻狗狗就在成功校區裡，到處晃晃找找看吧！</p>`;
  } else {
    $('di-name').textContent = (d.angel ? '👼 ' : '') + d.name;
    const level = friendLevel(id);
    body = `
      <p class="f-level">友好度 ${'❤️'.repeat(level)}${'🤍'.repeat(Math.max(0, 5 - level))}</p>
      <div class="di-tags">${(TAGS[id] || []).map((t) => `<span>${t}</span>`).join('')}</div>
      <table class="di-table">
        <tr><th>交朋友次數</th><td>${lv} 次</td></tr>
        ${dex[id].love ? `<tr><th>在中途互動</th><td>${dex[id].love} 次</td></tr>` : ''}
        ${dex[id].first ? `<tr><th>第一次相遇</th><td>${dex[id].first}</td></tr>` : ''}
        <tr><th>個性</th><td>${d.chance >= 0.6 ? '🟢 很親人' : d.chance >= 0.5 ? '🟡 有點害羞' : '🔴 很有個性'}</td></tr>
      </table>
      <p class="f-fact">📋 志工小知識：${d.fact}</p>`;
  }
  $('di-body').innerHTML = body;
  $('dex').classList.add('hidden');
  $('dexinfo').classList.remove('hidden');
}

function closeModal(id) {
  $(id).classList.add('hidden');
  const anyOpen = ['howto', 'dex', 'dexinfo', 'friend'].some((m) => !$(m).classList.contains('hidden'));
  if (state && state.running && !anyOpen) { state.paused = false; lastFrame = performance.now(); }
}

// ===== 結束散步 =====
function endWalk() {
  if (!state || !state.running) return;
  if (state.shelter) closeShelter();
  state.running = false;
  if (state.encounter) endEncounter();
  const n = state.friends.length;
  let title;
  if (n === 0) title = '🌱 今天先熟悉環境，下次一定交得到朋友！';
  else if (n <= 2) title = '🐾 交到朋友了！狗狗們很開心～';
  else if (n <= 4) title = '⭐ 狗狗人氣王！';
  else title = '🏆 成大狗狗大師！';
  $('r-title').textContent = title;
  const steps = Math.round(state.dist / 6);
  const met = DOGS.filter((d) => dexCount(d.id)).length;
  $('r-summary').textContent = `走了 ${steps} 步・回收了 ${state.recycled} 個骨頭／廚餘・圖鑑進度 ${met} / ${ALL_DOGS.length}`;
  $('r-dogs').innerHTML = n
    ? state.friends.map((id) => {
        const d = DOGS.find((x) => x.id === id);
        return `<figure class="${d.angel ? 'angel' : ''}"><img src="${photoOf(id)}" alt="${d.name}">${d.angel ? '👼 ' : ''}${d.name}</figure>`;
      }).join('')
    : '<p class="r-empty">這次還沒交到朋友，再出去晃晃吧！</p>';
  showScreen('result');
}

// ===== 按鈕與鍵盤 =====
$('btn-start').addEventListener('click', startWalk);
$('btn-again').addEventListener('click', startWalk);
$('btn-home').addEventListener('click', () => showScreen('start'));
$('btn-howto').addEventListener('click', () => $('howto').classList.remove('hidden'));
$('btn-pause').addEventListener('click', () => { if (state) state.paused = true; $('howto').classList.remove('hidden'); });
$('btn-close-howto').addEventListener('click', () => closeModal('howto'));
$('btn-dex').addEventListener('click', openDex);
$('btn-dex-start').addEventListener('click', openDex);
$('btn-dex-result').addEventListener('click', openDex);
$('btn-close-dex').addEventListener('click', () => closeModal('dex'));
$('btn-close-dexinfo').addEventListener('click', () => { $('dexinfo').classList.add('hidden'); openDex(); });
$('btn-close-friend').addEventListener('click', () => { closeModal('friend'); endEncounter(); });
$('btn-end').addEventListener('click', endWalk);
$('item-ball').addEventListener('click', () => chooseItem('ball'));
$('item-snack').addEventListener('click', () => chooseItem('snack'));
$('enc-leave').addEventListener('click', () => {
  const e = state && state.encounter;
  if (!e || e.mode === 'think' || e.mode === 'done') return;
  toast(`${e.data.name}跑去別的地方玩了～`);
  endEncounter();
});
$('sh-exit').addEventListener('click', closeShelter);
$('sh-close').addEventListener('click', () => {
  const sh = state && state.shelter;
  if (sh && sh.sel) { sh.sel.el.classList.remove('sel'); sh.sel = null; }
  $('sh-panel').classList.add('hidden');
});
$('shelter').addEventListener('pointerdown', (e) => {   // 點地板空白處：收起選單
  if (e.target.closest('.sdog, .sh-panel, .sh-top')) return;
  $('sh-close').click();
});

const MOVE_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'];
document.addEventListener('keydown', (ev) => {
  if (!state || !state.running) return;
  const k = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key;
  if (MOVE_KEYS.includes(k)) { state.keys.add(k); ev.preventDefault(); }
});
document.addEventListener('keyup', (ev) => {
  if (!state) return;
  const k = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key;
  state.keys.delete(k);
});
window.addEventListener('blur', () => { if (state) state.keys.clear(); });
document.addEventListener('visibilitychange', () => {
  if (document.hidden && state && state.running && !state.paused) {
    state.paused = true;
    $('howto').classList.remove('hidden');
  }
});

buildStartScreen();
