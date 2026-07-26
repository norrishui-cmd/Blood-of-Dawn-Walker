const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://bloodofdawnwalker.cc";
const DATE = "2026-07-26";
const ADS = `<meta name="google-adsense-account" content="ca-pub-9505220977121599" />
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9505220977121599" crossorigin="anonymous"></script>`;

const languageOptions = [
  ["", "en", "English"],
  ["de", "de", "Deutsch"],
  ["es", "es-ES", "Español (España)"],
  ["fr", "fr", "Français"],
  ["it", "it", "Italiano"],
  ["pl", "pl", "Polski"],
  ["zh-hans", "zh-Hans", "简体中文"],
  ["zh-hant", "zh-Hant", "繁體中文"],
  ["ja", "ja", "日本語"],
  ["ko", "ko", "한국어"],
  ["cs", "cs", "Čeština"],
  ["hu", "hu", "Magyar"],
  ["pt-br", "pt-BR", "Português (Brasil)"],
  ["es-419", "es-419", "Español (Latinoamérica)"],
  ["tr", "tr", "Türkçe"],
];

const equivalentLocales = [
  ["", "en"],
  ["de", "de"],
  ["es", "es-ES"],
  ["fr", "fr"],
  ["it", "it"],
  ["pl", "pl"],
  ["zh-hans", "zh-Hans"],
  ["zh-hant", "zh-Hant"],
  ["ja", "ja"],
  ["ko", "ko"],
  ["pt-br", "pt-BR"],
];

const routes = [
  "release-date",
  "30-days",
  "day-night-system",
  "combat",
  "blood-hunger",
  "characters",
  "vale-sangora",
  "system-requirements",
];

const sources = {
  release: ["Bandai Namco — official release information", "https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-will-launch-september-3-rebel-wolves-revealed-key-details"],
  time: ["PlayStation Blog — time-driven quest system", "https://blog.playstation.com/2026/07/07/the-blood-of-dawnwalker-unique-time-driven-quest-system-and-player-choice-detailed/"],
  preview: ["Xbox Wire — official hands-on preview", "https://news.xbox.com/en-us/2026/07/07/the-blood-of-dawnwalker-hands-on-preview/"],
  world: ["Xbox Wire — building Vale Sangora", "https://news.xbox.com/en-us/2026/04/30/the-blood-of-dawnwalker-world/"],
  characters: ["Bandai Namco — official Dawnwalker news", "https://en.bandainamcoent.eu/dawnwalker/news"],
  specs: ["Bandai Namco — editions and PC requirements", "https://en.bandainamcoent.eu/dawnwalker/the-blood-of-dawnwalker/shop-now"],
};

const locales = {
  "zh-hans": {
    htmlLang: "zh-Hans",
    locale: "zh_CN",
    label: "简体中文",
    siteTitle: "《The Blood of Dawnwalker》简体中文攻略与维基",
    siteDescription: "经过来源核验的《The Blood of Dawnwalker》简体中文攻略，覆盖发售日期、30天系统、昼夜形态、战斗、角色、世界与PC配置。",
    nav: ["发售", "30天", "战斗", "角色"],
    ui: {
      verified: "已核验答案",
      quick: "快速答案",
      confirmed: "官方已确认的信息",
      player: "这对玩家意味着什么",
      boundary: "尚未确认与核验边界",
      related: "相关攻略",
      sources: "官方来源",
      faq: "常见问题",
      home: "简体中文首页",
      all: "查看完整主题",
      sourceBacked: "来源可追溯",
      updated: "核验日期：2026年7月26日",
      methodology: "本站只把能够直接回答玩家问题、并可由官方或第一方资料验证的页面放入站点地图。发售前无法确认的数值、路线结果和性能结论不会被写成既定事实；游戏上线后，页面只会根据可复现测试和正式补丁说明更新。",
      notPlaceholder: "本页不是等待发售的占位模板。它现在已经回答标题所对应的问题，同时明确列出哪些细节仍需要最终版本测试，从而避免把推测包装成攻略。",
    },
    home: {
      eyebrow: "2026年9月3日发售 · 已确认压盘",
      intro: "面向玩家的简体中文资料库：把官方确认内容、试玩信息与尚待最终版本验证的细节明确分开。",
      available: "已上线的简体中文核心攻略",
      availableCopy: "8个主题页与英语版使用相同的视觉组件、信息层级和响应式布局，并提供直接答案、核验边界、FAQ与相关入口。",
      genre: "类型",
      platforms: "平台",
      developer: "开发商",
      release: "发售",
      facts: "发售前最值得确认的三件事",
      card1: ["时间系统", "探索不会自动消耗期限", "30天并非现实时间倒计时。只有带有沙漏提示的重大行动、部分对话和学习行为才会推进时间。"],
      card2: ["双形态", "白天为人，夜晚为吸血鬼", "人类形态侧重剑术与符文法术；吸血鬼形态获得利爪、吸血和超自然移动能力。"],
      card3: ["PC配置", "最低需要16GB内存与SSD", "官方最低显卡为GTX 1060或RX 580，并要求Windows 10、DirectX 12和60GB SSD空间。"],
    },
    pages: {
      "release-date": {
        title: "《The Blood of Dawnwalker》发售日期与平台",
        description: "确认2026年9月3日发售、PC/PS5/Xbox Series平台、压盘状态，以及预载和解锁时间尚未公布的边界。",
        quick: "《The Blood of Dawnwalker》官方全球发售日为2026年9月3日，登陆PC、PlayStation 5和Xbox Series X|S。游戏已于7月15日宣布压盘，但各地区精确解锁时间、预载日期和首日补丁大小仍未公布。",
        facts: ["开发商为Rebel Wolves，发行商为Bandai Namco Entertainment。", "目前公开平台仅包含PC、PS5和Xbox Series X|S，没有已确认的PS4、Xbox One或Switch版本。", "Steam在部分时区可能显示9月2日，这通常来自商店时区换算，不代表官方全球日期改变。"],
        player: "购买前应先核对地区、平台和版本内容，不要把商店倒计时自动换算出的日期当作全球统一解锁时刻。压盘意味着主版本已准备进入生产流程，但不等于不会有首日更新。",
        boundary: "官方尚未给出每个时区的解锁表、预载窗口、最终下载容量、首日补丁内容或实体版到货节奏。本页不会提前猜测这些信息。",
        faqQ: "游戏究竟是哪一天发售？",
        faqA: "官方全球日期是2026年9月3日；个别数字商店可能因时区显示9月2日。",
        source: "release",
      },
      "30-days": {
        title: "30天期限系统如何运作",
        description: "解释30个昼夜为何不是现实倒计时、哪些行动会消耗时间，以及期限结束并非自动Game Over。",
        quick: "Coen拥有30个游戏内白天与30个夜晚去尝试拯救家人，但时间不会在自由探索时持续流逝。只有部分关键行动会消耗时间，界面会在玩家确认前以沙漏图标显示成本。",
        facts: ["普通探索、阅读和观察环境不会自动推进期限。", "任务、重要对话、技能学习或其他有意义的承诺可能消耗一个或多个时间单位。", "期限结束并非简单的自动Game Over，而是触发与玩家选择和完成情况相关的后果。"],
        player: "玩家应把时间视作叙事资源，而不是要求速通的秒表。接到任务时先查看沙漏成本，再判断它是否符合当前角色、阵营或家庭路线；无需因为在地图上绕路而焦虑。",
        boundary: "每个任务的精确时间成本、可跳过内容、最终后果矩阵和最优路线都需要零售版实测。发售前无法据此制作可靠的全任务时间表。",
        faqQ: "自由探索会浪费30天期限吗？",
        faqA: "不会。官方说明普通探索不持续消耗时间，只有明确标注的重大行动才会推进时段。",
        source: "time",
      },
      "day-night-system": {
        title: "昼夜系统：人类与吸血鬼形态",
        description: "说明Coen白天为人类、夜晚转为吸血鬼，两种形态在战斗、移动、法术与任务路线上的差异。",
        quick: "昼夜不是单纯的光照变化。白天Coen保持人类形态，使用剑术与符文法术；夜晚他转为吸血鬼，获得利爪、吸血、力量和超自然移动能力，因此同一地点可能出现不同进入方式和战斗解法。",
        facts: ["人类形态可使用武器和通过刻画符文施放hex法术。", "吸血鬼形态拥有Clawride、Shadowstep等特殊移动能力，并受到血液饥饿影响。", "部分活动只在特定时段开放，选择白天或夜晚处理任务可能改变可用工具与风险。"],
        player: "规划路线时应先判断目标需要社交、剑术、法术还是垂直移动。无法从正面进入的位置，夜间能力可能提供另一条路径；但血液饥饿与敌对反应也可能提高风险。",
        boundary: "完整的时段限制、能力解锁顺序、昼夜转换规则和全部任务差异尚未公开。页面不会把试玩中展示的少数例子扩展成完整路线表。",
        faqQ: "玩家能否随时切换人类与吸血鬼形态？",
        faqA: "目前确认形态与昼夜绑定；官方尚未说明玩家能否在任何地点自由切换。",
        source: "preview",
      },
      "combat": {
        title: "战斗系统：方向攻击、格挡与招架",
        description: "解释实时四方向战斗、耐力格挡、方向招架、Omni-Block、激活充能，以及人类和吸血鬼战斗差异。",
        quick: "战斗采用实时四方向攻击与防御。玩家要读取敌人的方向提示，选择攻击或防守方向；持续格挡会消耗耐力，而正确方向和时机的招架更有效率。能力则通过战斗中积累的激活充能释放。",
        facts: ["四个方向同时用于玩家攻击和识别敌方来袭。", "普通格挡是较安全的选择但会消耗耐力；方向招架需要更准确的输入与时机。", "可选的Omni-Block降低方向操作压力，但不是自动招架，也不会让角色无敌。"],
        player: "初次面对敌人时先用普通格挡学习动作，再逐步尝试方向招架保存耐力。人类形态侧重剑与hex，吸血鬼形态改变攻击节奏和移动方式，因此不能假定一套输入适用于所有时段。",
        boundary: "精确帧数、伤害公式、耐力数值、难度倍率和最强技能组合都需要正式版重复测试。官方把它定义为叙事动作RPG，而非官方Soulslike标签。",
        faqQ: "战斗是回合制的吗？",
        faqA: "不是。它是实时动作战斗，并使用四方向攻击与防御提示。",
        source: "preview",
      },
      "blood-hunger": {
        title: "血液饥饿、吸血与失控风险",
        description: "解释吸血鬼形态的饥饿如何影响对话、吸血选择和Coen失控的风险，以及为何动物可能成为较安全来源。",
        quick: "Coen的吸血鬼形态需要管理血液饥饿。饥饿会影响可用对话与行为；在临界状态下，玩家可能失去对Coen的完整控制，因此吸血对象既是资源选择，也是叙事与道德选择。",
        facts: ["吸血可以补充需求，但对象可能是动物、敌人或重要NPC。", "官方试玩提到动物可以作为避免伤害关键人物的替代来源。", "过度饥饿可能改变场景与控制结果，而不是只减少一条数值。"],
        player: "进入重要对话或人口密集区域前，应先检查饥饿状态并保留安全的补充方案。杀死或伤害具名NPC可能永久移除服务、关系或任务内容，因此不能只按即时战斗收益判断。",
        boundary: "具体阈值、每类目标提供的血量、技能影响和所有失控结果尚未公布。发售后需要在同一难度与状态下重复测试。",
        faqQ: "Coen必须吸食人类吗？",
        faqA: "目前资料显示不必只吸食人类；动物可作为替代来源，但完整规则仍需正式版验证。",
        source: "preview",
      },
      "characters": {
        title: "已确认角色与关系",
        description: "无剧透梳理Coen、家人、Brencis、Vrakhiri与已公开盟友，明确官方背景与尚未确认结局之间的区别。",
        quick: "主角Coen是一名在1347年Vale Sangora生活的年轻人，在被转化为Dawnwalker后必须设法拯救家人。主要冲突围绕吸血鬼领主Brencis及其Vrakhiri统治展开，官方也公开了Anca、Bakir、Xanthe、Ambrus等人物。",
        facts: ["Coen的家庭期限推动主线，但家人并非单一任务物件，每人都有背景与反应。", "Brencis以古罗马元老身份和吸血鬼统治者形象出现，其部下来自不同时代与文化。", "Anca是Laslea的草药师，并与Coen的法术学习和个人关系有关。"],
        player: "阅读人物页时应区分已公开的传记、试玩中实际出现的关系和玩家推测。选择可能改变人物存活、服务、联盟与后续任务，因此发售前不应把任何角色标成必死或固定同伴。",
        boundary: "官方没有公开完整同伴名单、全部恋爱路线、忠诚任务、可击杀角色清单或结局存活矩阵。本页只收录可验证身份与关系。",
        faqQ: "Coen是完全的吸血鬼吗？",
        faqA: "他是Dawnwalker：白天为人类、夜晚具有吸血鬼形态和能力的特殊存在。",
        source: "characters",
      },
      "vale-sangora": {
        title: "Vale Sangora世界、地点与生态",
        description: "介绍1347年喀尔巴阡山谷Vale Sangora、Svartrau、Howling Keep、Shrike’s Crag及动态天气与社会结构。",
        quick: "Vale Sangora是游戏的开放世界舞台，一座受黑死病、封建压力和Vrakhiri统治影响的14世纪喀尔巴阡山谷。已公开地点包括村庄Laslea、城市Svartrau、Howling Keep和Shrike’s Crag等。",
        facts: ["世界包含聚落、荒野、沼泽、山地、遗迹和吸血鬼控制区域。", "天气与雾不仅营造氛围，也可能改变能见度和移动风险。", "NPC会继续自己的行动，具名人物死亡可能让商店、锻造或任务线消失。"],
        player: "地图攻略应把地点与时段、进入方式、相关NPC和世界状态连接起来，而不是只列坐标。白天与夜晚能力不同，同一地点可能需要不同路线；某些选择也会永久改变可用服务。",
        boundary: "完整地图尺寸、所有快速旅行点、收集物坐标、敌人刷新和区域等级尚未公布。发售前不会生成虚构地图数据库。",
        faqQ: "Vale Sangora是真实地点吗？",
        faqA: "它是受中欧与喀尔巴阡历史文化启发的虚构山谷，并非现实中的单一地点。",
        source: "world",
      },
      "system-requirements": {
        title: "PC系统配置要求",
        description: "整理官方最低与推荐PC配置，并解释16GB内存、60GB SSD、GTX 1060/RX 580与RTX 4060/RX 7600 XT档位。",
        quick: "最低配置要求Windows 10、DirectX 12、Core i5-11400F或Ryzen 7 2700X、16GB内存、GTX 1060或RX 580，以及60GB SSD。推荐档位为Core i7-11700K或Ryzen 7 5700X，搭配RTX 4060、RX 7600 XT或Intel Arc B580。",
        facts: ["最低和推荐档位都列出16GB内存与60GB SSD。", "官方表格未说明对应分辨率、画质预设、帧率或是否开启光线追踪。", "显卡名称代表官方档位，不等于同档三款显卡在所有场景完全同速。"],
        player: "先把配置表当作兼容性基线，再等待包含驱动版本、分辨率、预设、升频方式与复杂场景低帧表现的正式测试。升级电脑时还要考虑电源、主板、散热和整机平衡。",
        boundary: "最终下载大小、首日补丁、官方性能目标、Steam Deck状态、超宽屏与光追细节尚未完整公布。本页不会把硬件名称换算成未经测试的FPS承诺。",
        faqQ: "游戏是否强制使用SSD？",
        faqA: "是。官方最低与推荐配置都明确列出60GB SSD空间。",
        source: "specs",
      },
    },
  },
};

locales["zh-hant"] = JSON.parse(JSON.stringify(locales["zh-hans"]));
Object.assign(locales["zh-hant"], {
  htmlLang: "zh-Hant",
  locale: "zh_TW",
  label: "繁體中文",
  siteTitle: "《The Blood of Dawnwalker》繁體中文攻略與維基",
  siteDescription: "經過來源核驗的《The Blood of Dawnwalker》繁體中文攻略，涵蓋發售日期、30天系統、晝夜形態、戰鬥、角色、世界與PC配備。",
  nav: ["發售", "30天", "戰鬥", "角色"],
});

function toTraditional(value) {
  const pairs = [
    ["简体中文", "繁體中文"], ["经过", "經過"], ["核验", "核驗"], ["攻略", "攻略"], ["发售", "發售"],
    ["日期", "日期"], ["覆盖", "涵蓋"], ["系统", "系統"], ["昼夜", "晝夜"], ["战斗", "戰鬥"],
    ["角色", "角色"], ["世界", "世界"], ["配置", "配備"], ["页面", "頁面"], ["确认", "確認"],
    ["信息", "資訊"], ["游戏", "遊戲"], ["玩家", "玩家"], ["时间", "時間"], ["地图", "地圖"],
    ["开放", "開放"], ["对话", "對話"], ["学习", "學習"], ["行动", "行動"], ["推进", "推進"],
    ["发售前", "發售前"], ["发售后", "發售後"], ["来源", "來源"], ["问题", "問題"], ["常见", "常見"],
    ["官方", "官方"], ["说明", "說明"], ["无法", "無法"], ["最终", "最終"], ["数值", "數值"],
    ["路线", "路線"], ["测试", "測試"], ["详细", "詳細"], ["显卡", "顯示卡"], ["内存", "記憶體"],
    ["开发商", "開發商"], ["平台", "平台"], ["选择", "選擇"], ["移动", "移動"], ["能力", "能力"],
    ["吸血鬼", "吸血鬼"], ["人类", "人類"], ["攻击", "攻擊"], ["防御", "防禦"], ["耐力", "耐力"],
    ["伤害", "傷害"], ["人物", "人物"], ["关系", "關係"], ["城市", "城市"], ["环境", "環境"],
    ["区域", "區域"], ["完整", "完整"], ["内容", "內容"], ["资料", "資料"], ["已经", "已經"],
    ["上线", "上線"], ["响应式", "響應式"], ["布局", "版面"], ["进入", "進入"], ["阅读", "閱讀"],
    ["显示", "顯示"], ["商店", "商店"], ["压力", "壓力"], ["与", "與"], ["为", "為"],
    ["并", "並"], ["这", "這"], ["个", "個"], ["从", "從"], ["后", "後"], ["还", "還"],
    ["会", "會"], ["应", "應"], ["时", "時"], ["里", "裡"], ["没", "沒"], ["实", "實"],
  ];
  let output = value;
  for (const [from, to] of pairs) output = output.split(from).join(to);
  return output;
}

for (const key of ["siteTitle", "siteDescription"]) locales["zh-hant"][key] = toTraditional(locales["zh-hant"][key]);
for (const [key, value] of Object.entries(locales["zh-hant"].ui)) locales["zh-hant"].ui[key] = toTraditional(value);
for (const [key, value] of Object.entries(locales["zh-hant"].home)) {
  locales["zh-hant"].home[key] = Array.isArray(value) ? value.map(toTraditional) : toTraditional(value);
}
for (const page of Object.values(locales["zh-hant"].pages)) {
  for (const key of Object.keys(page)) {
    if (key === "source") continue;
    page[key] = Array.isArray(page[key]) ? page[key].map(toTraditional) : toTraditional(page[key]);
  }
}

locales.ko = {
  htmlLang: "ko",
  locale: "ko_KR",
  label: "한국어",
  siteTitle: "The Blood of Dawnwalker 한국어 공략 위키",
  siteDescription: "출시일, 30일 시간 시스템, 인간과 뱀파이어 형태, 전투, 캐릭터, 세계와 PC 요구 사양을 공식 자료로 검증한 한국어 공략입니다.",
  nav: ["출시", "30일", "전투", "캐릭터"],
  ui: {
    verified: "검증된 답변", quick: "빠른 답변", confirmed: "공식 확인 정보", player: "플레이어에게 중요한 점",
    boundary: "확인되지 않은 내용과 검증 범위", related: "관련 공략", sources: "공식 출처", faq: "자주 묻는 질문",
    home: "한국어 홈", all: "전체 주제 보기", sourceBacked: "출처 확인 완료", updated: "검증일: 2026년 7월 26일",
    methodology: "이 사이트는 플레이어의 질문에 직접 답하고 공식 또는 퍼스트파티 자료로 확인할 수 있는 페이지만 사이트맵에 포함합니다. 출시 전에 알 수 없는 수치, 분기 결과와 성능 수치는 사실처럼 작성하지 않습니다. 출시 후에는 반복 가능한 테스트와 공식 패치 노트가 있을 때만 내용을 갱신합니다.",
    notPlaceholder: "이 페이지는 출시를 기다리는 빈 템플릿이 아닙니다. 제목의 질문에 지금 답할 수 있는 사실을 제공하고, 최종 빌드에서 확인해야 하는 부분을 따로 표시해 추측을 공략처럼 보이지 않게 합니다.",
  },
  home: {
    eyebrow: "2026년 9월 3일 출시 · 골드행 확정", intro: "공식 발표, 퍼스트파티 프리뷰와 최종 빌드에서 확인할 부분을 명확히 나눈 한국어 플레이어 데이터베이스입니다.",
    available: "현재 제공되는 한국어 핵심 공략", availableCopy: "8개 주제 페이지가 영어판과 같은 시각 요소, 정보 계층, 반응형 레이아웃을 사용하며 빠른 답변, 검증 범위, FAQ와 관련 링크를 제공합니다.",
    genre: "장르", platforms: "플랫폼", developer: "개발사", release: "출시",
    facts: "출시 전에 알아둘 세 가지", card1: ["시간 시스템", "탐험은 제한 시간을 소모하지 않음", "30일은 실시간 카운트다운이 아닙니다. 모래시계로 표시되는 중요한 행동, 일부 대화와 학습만 시간을 진행시킵니다."],
    card2: ["이중 형태", "낮에는 인간, 밤에는 뱀파이어", "인간 형태는 검술과 룬 주술을 사용하고, 뱀파이어 형태는 발톱, 흡혈과 초자연적 이동 능력을 얻습니다."],
    card3: ["PC 사양", "최소 16GB RAM과 SSD", "공식 최소 GPU는 GTX 1060 또는 RX 580이며 Windows 10, DirectX 12와 60GB SSD가 필요합니다."],
  },
  pages: {
    "release-date": {
      title: "The Blood of Dawnwalker 출시일과 플랫폼", description: "2026년 9월 3일 출시, PC·PS5·Xbox Series 플랫폼, 골드행 상태와 아직 공개되지 않은 사전 다운로드 및 잠금 해제 시간을 정리합니다.",
      quick: "The Blood of Dawnwalker의 공식 글로벌 출시일은 2026년 9월 3일이며 PC, PlayStation 5, Xbox Series X|S로 나옵니다. 7월 15일 골드행이 발표됐지만 지역별 정확한 잠금 해제 시각, 사전 다운로드 일정과 첫날 패치 용량은 아직 공개되지 않았습니다.",
      facts: ["개발사는 Rebel Wolves, 퍼블리셔는 Bandai Namco Entertainment입니다.", "현재 확인된 플랫폼에는 PS4, Xbox One 또는 Nintendo Switch가 포함되지 않습니다.", "일부 시간대의 Steam이 9월 2일을 표시할 수 있지만 이는 상점 시간대 변환일 수 있으며 공식 글로벌 날짜 변경을 뜻하지 않습니다."],
      player: "구매하기 전에 지역, 플랫폼과 에디션 구성을 확인해야 합니다. 상점 카운트다운에서 자동 변환된 날짜를 전 세계 공통 잠금 해제 시각으로 보지 마십시오. 골드행은 본편 빌드가 생산 단계에 들어갔다는 뜻이며 첫날 업데이트가 없다는 뜻은 아닙니다.",
      boundary: "공식 지역별 잠금 해제 표, 사전 다운로드 창, 최종 다운로드 용량, 첫날 패치 내용과 패키지 배송 일정은 발표되지 않았습니다. 이 페이지는 그 값을 추측하지 않습니다.",
      faqQ: "정확한 출시일은 언제인가요?", faqA: "공식 글로벌 날짜는 2026년 9월 3일이며 일부 상점은 시간대 때문에 9월 2일을 표시할 수 있습니다.", source: "release",
    },
    "30-days": {
      title: "30일 제한 시간 시스템 설명", description: "30일과 30밤이 실시간 타이머가 아닌 이유, 시간을 쓰는 행동과 기한 종료가 자동 게임 오버가 아닌 이유를 설명합니다.",
      quick: "Coen은 가족을 구하기 위해 게임 속 30일과 30밤을 갖지만 자유 탐험 중에는 시간이 계속 흐르지 않습니다. 일부 중요한 행동만 시간을 소비하며 확정 전에 모래시계 아이콘으로 비용이 표시됩니다.",
      facts: ["일반 탐험, 독서와 환경 관찰은 제한 시간을 자동으로 진행시키지 않습니다.", "퀘스트, 중요한 대화, 기술 학습과 의미 있는 약속은 하나 이상의 시간 단위를 쓸 수 있습니다.", "기한 종료는 단순한 자동 게임 오버가 아니라 플레이어의 선택과 완료 상태에 따른 결과를 만듭니다."],
      player: "시간을 속도전 타이머가 아니라 내러티브 자원으로 다루십시오. 행동을 확정하기 전에 모래시계 비용을 보고 현재의 가족, 인물 또는 세력 목표에 맞는지 판단하면 됩니다. 지도에서 길을 잃었다고 해서 기한이 자동 소모되지는 않습니다.",
      boundary: "모든 퀘스트의 정확한 비용, 건너뛸 수 있는 콘텐츠, 전체 결과표와 최적 루트는 출시 빌드 테스트가 필요합니다. 출시 전에는 믿을 만한 전체 일정표를 만들 수 없습니다.",
      faqQ: "자유 탐험도 30일을 소비하나요?", faqA: "아니요. 공식 설명에 따르면 일반 탐험은 시간을 흐르게 하지 않고 명시된 중요한 행동만 시간대를 진행시킵니다.", source: "time",
    },
    "day-night-system": {
      title: "낮과 밤: 인간·뱀파이어 형태 시스템", description: "낮의 인간 Coen과 밤의 뱀파이어 Coen이 전투, 이동, 주술과 퀘스트 접근에서 어떻게 달라지는지 설명합니다.",
      quick: "낮과 밤은 조명만 바뀌는 시스템이 아닙니다. 낮에는 Coen이 인간으로 검술과 룬 주술을 사용하고, 밤에는 뱀파이어가 되어 발톱, 흡혈, 힘과 초자연적 이동 능력을 얻습니다. 같은 장소도 형태에 따라 다른 길과 해법을 가질 수 있습니다.",
      facts: ["인간 형태는 무기와 몸에 룬을 새겨 쓰는 hex 주술을 사용할 수 있습니다.", "뱀파이어 형태는 Clawride와 Shadowstep 같은 이동 능력을 가지며 혈액 허기의 영향을 받습니다.", "일부 활동은 특정 시간대에만 열리고 낮과 밤 중 언제 처리하는지에 따라 도구와 위험이 달라질 수 있습니다."],
      player: "목표가 대화, 검술, 주술 또는 수직 이동 중 무엇을 요구하는지 먼저 판단하십시오. 정면으로 들어갈 수 없는 장소는 밤의 이동 능력이 다른 길을 열 수 있지만 허기와 적대 반응은 위험을 높일 수 있습니다.",
      boundary: "전체 시간대 제한, 능력 해금 순서, 변신 규칙과 모든 퀘스트 차이는 공개되지 않았습니다. 몇 가지 프리뷰 예시를 완전한 루트 표로 확대하지 않습니다.",
      faqQ: "인간과 뱀파이어 형태를 언제든 바꿀 수 있나요?", faqA: "현재는 형태가 낮과 밤에 연결된 것으로 확인됐으며 어디서나 자유롭게 바꿀 수 있는지는 발표되지 않았습니다.", source: "preview",
    },
    "combat": {
      title: "방향 공격·방어·패링 전투 시스템", description: "실시간 4방향 전투, 스태미나 방어, 방향 패링, Omni-Block, 활성화 충전과 두 형태의 차이를 설명합니다.",
      quick: "전투는 실시간 4방향 공격과 방어를 사용합니다. 적의 방향 표시를 읽고 공격 또는 방어 방향을 선택해야 합니다. 계속 막으면 스태미나가 들지만 올바른 방향과 타이밍의 패링은 더 효율적이며, 강한 능력은 전투 중 모은 활성화 충전을 사용합니다.",
      facts: ["네 방향은 플레이어 공격과 적 공격 판독 모두에 사용됩니다.", "일반 방어는 안전하지만 스태미나를 소비하고 방향 패링은 더 정확한 입력과 타이밍을 요구합니다.", "선택형 Omni-Block은 방향 조작 부담을 낮추지만 자동 패링이나 무적 기능이 아닙니다."],
      player: "새 적을 만났을 때는 일반 방어로 패턴을 먼저 익힌 뒤 방향 패링으로 스태미나를 아끼는 편이 안전합니다. 인간은 검과 hex에, 뱀파이어는 발톱과 이동에 무게가 있으므로 한 가지 입력 전략이 모든 시간대에 통한다고 가정하지 마십시오.",
      boundary: "정확한 프레임, 피해 공식, 스태미나 수치, 난이도 배율과 최강 조합은 정식 버전 반복 테스트가 필요합니다. 개발사는 이를 내러티브 액션 RPG로 소개하며 공식 Soulslike로 규정하지 않았습니다.",
      faqQ: "전투가 턴제인가요?", faqA: "아니요. 네 방향의 공격과 방어 표시를 사용하는 실시간 액션 전투입니다.", source: "preview",
    },
    "blood-hunger": {
      title: "혈액 허기, 흡혈과 통제 상실 위험", description: "뱀파이어 형태의 허기가 대화와 흡혈 선택에 미치는 영향, Coen이 통제를 잃을 위험과 동물이라는 대안을 설명합니다.",
      quick: "Coen의 뱀파이어 형태는 혈액 허기를 관리해야 합니다. 허기는 가능한 대화와 행동에 영향을 주며 위험 수준에서는 Coen을 완전히 통제하지 못할 수 있습니다. 따라서 누구에게서 피를 얻는지는 자원 선택이면서 내러티브와 도덕 선택입니다.",
      facts: ["동물, 적 또는 중요한 NPC에게서 피를 얻는 선택이 존재할 수 있습니다.", "공식 프리뷰는 중요한 사람을 해치지 않기 위한 대체 공급원으로 동물을 언급합니다.", "심한 허기는 단순 수치 감소가 아니라 장면과 통제 결과를 바꿀 수 있습니다."],
      player: "중요한 대화나 인구가 많은 곳에 들어가기 전에 허기 상태와 안전한 공급원을 확인하십시오. 이름 있는 NPC를 죽이거나 다치게 하면 서비스, 관계 또는 퀘스트가 사라질 수 있으므로 즉시 전투 보상만 보고 결정해서는 안 됩니다.",
      boundary: "정확한 임계값, 대상별 회복량, 스킬 효과와 모든 통제 상실 결과는 공개되지 않았습니다. 출시 후 같은 난이도와 상태에서 반복 검증해야 합니다.",
      faqQ: "Coen은 반드시 사람의 피를 마셔야 하나요?", faqA: "현재 자료상 사람만이 유일한 공급원은 아니며 동물이 대안이 될 수 있지만 전체 규칙은 정식 버전 확인이 필요합니다.", source: "preview",
    },
    "characters": {
      title: "공식 확인 캐릭터와 관계", description: "Coen과 가족, Brencis, Vrakhiri와 공개된 동맹 인물을 스포일러 없이 정리하고 전기와 미확인 결말을 구분합니다.",
      quick: "주인공 Coen은 1347년 Vale Sangora의 청년으로 Dawnwalker가 된 뒤 가족을 구해야 합니다. 핵심 갈등은 뱀파이어 군주 Brencis와 Vrakhiri 지배를 중심으로 하며 Anca, Bakir, Xanthe, Ambrus 같은 인물도 공식 공개됐습니다.",
      facts: ["가족의 제한 시간이 주 서사를 움직이지만 가족 구성원마다 별도 배경과 반응이 있습니다.", "Brencis는 고대 로마 원로원 출신 뱀파이어 지배자로 소개되며 부하들은 서로 다른 시대와 문화에서 왔습니다.", "Anca는 Laslea의 약초사이며 Coen의 주술 학습과 개인 관계에 연결됩니다."],
      player: "공식 전기, 프리뷰에서 실제로 본 관계와 팬의 추측을 구분해야 합니다. 선택은 생존, 서비스, 동맹과 후속 퀘스트를 바꿀 수 있으므로 출시 전에 누구를 필수 사망 또는 고정 동료로 단정할 수 없습니다.",
      boundary: "전체 동료, 로맨스, 충성 퀘스트, 살해 가능한 인물과 엔딩 생존표는 공개되지 않았습니다. 이 페이지에는 검증 가능한 신원과 관계만 포함합니다.",
      faqQ: "Coen은 완전한 뱀파이어인가요?", faqA: "Coen은 Dawnwalker로 낮에는 인간이고 밤에는 뱀파이어 형태와 능력을 지닌 특별한 존재입니다.", source: "characters",
    },
    "vale-sangora": {
      title: "Vale Sangora 세계, 지역과 생태", description: "1347년 카르파티아 계곡 Vale Sangora, Svartrau, Howling Keep, Shrike’s Crag, 동적 날씨와 사회 구조를 소개합니다.",
      quick: "Vale Sangora는 흑사병, 봉건 압력과 Vrakhiri 지배의 영향을 받은 14세기 카르파티아 계곡이며 게임의 오픈 월드 무대입니다. Laslea, 도시 Svartrau, Howling Keep와 Shrike’s Crag 등이 공식 공개됐습니다.",
      facts: ["세계에는 정착지, 황야, 습지, 산악, 유적과 뱀파이어 통제 지역이 있습니다.", "날씨와 안개는 분위기뿐 아니라 가시성과 이동 위험을 바꿀 수 있습니다.", "NPC는 독립적으로 행동하며 이름 있는 인물의 죽음은 상점, 대장간 또는 퀘스트를 없앨 수 있습니다."],
      player: "지도 공략은 좌표 목록만 만들지 말고 장소를 시간대, 진입 능력, 관련 NPC와 세계 상태에 연결해야 합니다. 낮과 밤의 능력이 다르고 선택이 서비스를 영구 변경할 수 있기 때문입니다.",
      boundary: "전체 지도 크기, 빠른 이동 지점, 수집품 좌표, 적 리스폰과 지역 레벨은 공개되지 않았습니다. 출시 전에는 가짜 지도 데이터베이스를 만들지 않습니다.",
      faqQ: "Vale Sangora는 실제 장소인가요?", faqA: "중부 유럽과 카르파티아 역사·문화에서 영감을 얻은 가상의 계곡이며 현실의 한 장소는 아닙니다.", source: "world",
    },
    "system-requirements": {
      title: "PC 시스템 요구 사양", description: "공식 최소·권장 사양과 16GB RAM, 60GB SSD, GTX 1060/RX 580 및 RTX 4060/RX 7600 XT 등급을 정리합니다.",
      quick: "최소 사양은 Windows 10, DirectX 12, Core i5-11400F 또는 Ryzen 7 2700X, 16GB RAM, GTX 1060 또는 RX 580, 60GB SSD입니다. 권장은 Core i7-11700K 또는 Ryzen 7 5700X와 RTX 4060, RX 7600 XT 또는 Intel Arc B580입니다.",
      facts: ["최소와 권장 모두 16GB RAM과 60GB SSD를 요구합니다.", "공식 표는 해상도, 그래픽 프리셋, 프레임 레이트 또는 레이 트레이싱 여부를 밝히지 않습니다.", "GPU 이름은 공식 등급을 뜻하지만 세 모델이 모든 장면에서 같은 속도라는 의미는 아닙니다."],
      player: "사양표를 호환성 기준으로 보고 드라이버, 해상도, 프리셋, 업스케일링과 복잡한 장면의 하위 프레임을 포함한 출시 벤치마크를 기다리십시오. 업그레이드는 전원, 메인보드, 냉각과 전체 시스템 균형도 고려해야 합니다.",
      boundary: "최종 다운로드, 첫날 패치, 공식 성능 목표, Steam Deck 상태, 울트라와이드와 레이 트레이싱 정보는 완전히 공개되지 않았습니다. 테스트 없이 GPU 이름을 FPS 약속으로 바꾸지 않습니다.",
      faqQ: "SSD가 반드시 필요한가요?", faqA: "예. 공식 최소 및 권장 사양 모두 60GB SSD 저장 공간을 명시합니다.", source: "specs",
    },
  },
};

locales["pt-br"] = {
  htmlLang: "pt-BR",
  locale: "pt_BR",
  label: "Português (Brasil)",
  siteTitle: "The Blood of Dawnwalker — Guia e Wiki em Português",
  siteDescription: "Guias em português, verificados em fontes oficiais, sobre lançamento, sistema de 30 dias, formas humana e vampírica, combate, personagens, mundo e requisitos de PC.",
  nav: ["Lançamento", "30 dias", "Combate", "Personagens"],
  ui: {
    verified: "Resposta verificada", quick: "Resposta rápida", confirmed: "O que está confirmado", player: "O que isso muda para o jogador",
    boundary: "Limites da verificação", related: "Guias relacionados", sources: "Fontes oficiais", faq: "Pergunta frequente",
    home: "Início em português", all: "Abrir guia completo", sourceBacked: "Com fonte", updated: "Verificado em 26 de julho de 2026",
    methodology: "O site só coloca no sitemap páginas que respondem diretamente à busca e podem ser verificadas em material oficial ou de primeira parte. Números, resultados de rotas e promessas de desempenho que ainda dependem da versão final não são apresentados como fatos. Depois do lançamento, as páginas serão atualizadas apenas com testes reproduzíveis e notas oficiais de atualização.",
    notPlaceholder: "Esta não é uma página vazia esperando o lançamento. Ela já responde à pergunta do título e separa os detalhes que ainda exigem testes na versão final, evitando transformar especulação em guia.",
  },
  home: {
    eyebrow: "Lançamento em 3 de setembro de 2026 · Jogo finalizado para produção", intro: "Uma base em português que separa anúncios oficiais, informações de prévias e detalhes que ainda precisam ser confirmados na versão final.",
    available: "Guias essenciais disponíveis em português", availableCopy: "Oito páginas usam os mesmos componentes visuais, hierarquia de informação e layout responsivo da versão em inglês, com resposta direta, limites, FAQ e links relacionados.",
    genre: "Gênero", platforms: "Plataformas", developer: "Desenvolvedora", release: "Lançamento",
    facts: "Três fatos importantes antes do lançamento", card1: ["Sistema de tempo", "Explorar não gasta o prazo", "Os 30 dias não são uma contagem regressiva em tempo real. Apenas ações importantes marcadas com ampulhetas, certas conversas e aprendizados avançam o tempo."],
    card2: ["Duas formas", "Humano de dia, vampiro à noite", "A forma humana usa espada e hexes com runas; a forma vampírica ganha garras, alimentação de sangue e movimento sobrenatural."],
    card3: ["PC", "Mínimo de 16 GB e SSD", "A GPU mínima oficial é GTX 1060 ou RX 580, com Windows 10, DirectX 12 e 60 GB em SSD."],
  },
  pages: {
    "release-date": {
      title: "Data de lançamento e plataformas", description: "Confirma o lançamento em 3 de setembro de 2026 para PC, PS5 e Xbox Series, o estado gold e o que ainda não foi divulgado sobre pré-carregamento.",
      quick: "The Blood of Dawnwalker será lançado mundialmente em 3 de setembro de 2026 para PC, PlayStation 5 e Xbox Series X|S. O estúdio anunciou o estado gold em 15 de julho, mas o horário exato por região, o pré-carregamento e o tamanho da atualização do primeiro dia ainda não foram publicados.",
      facts: ["O jogo é desenvolvido pela Rebel Wolves e publicado pela Bandai Namco Entertainment.", "Não há versões confirmadas para PS4, Xbox One ou Nintendo Switch.", "A Steam pode mostrar 2 de setembro em alguns fusos; isso pode ser conversão de horário da loja e não uma mudança da data global."],
      player: "Antes da compra, confira região, plataforma e conteúdo da edição. Não trate a data convertida por uma contagem regressiva da loja como horário global oficial. O estado gold indica que a versão principal entrou em produção, mas não exclui uma atualização de lançamento.",
      boundary: "Ainda não existe tabela oficial de desbloqueio por fuso, janela de pré-carregamento, tamanho final do download, conteúdo do patch inicial ou cronograma de entrega física. A página não inventa esses dados.",
      faqQ: "Qual é a data oficial de lançamento?", faqA: "A data global anunciada é 3 de setembro de 2026; algumas lojas podem exibir 2 de setembro por causa do fuso horário.", source: "release",
    },
    "30-days": {
      title: "Como funciona o limite de 30 dias", description: "Explica por que os 30 dias e 30 noites não são um cronômetro real, quais ações gastam tempo e por que o fim do prazo não é Game Over automático.",
      quick: "Coen tem 30 dias e 30 noites dentro do jogo para tentar salvar sua família, mas o tempo não corre continuamente durante a exploração. Apenas ações importantes gastam unidades de tempo, com o custo mostrado por ícones de ampulheta antes da confirmação.",
      facts: ["Explorar, ler e observar o ambiente não avançam automaticamente o prazo.", "Missões, diálogos importantes, aprendizado de habilidades e outros compromissos podem gastar uma ou mais unidades.", "O fim do prazo não causa apenas um Game Over automático; ele produz consequências ligadas às escolhas e ao que foi concluído."],
      player: "Trate o tempo como recurso narrativo, não como cronômetro de speedrun. Veja o custo em ampulhetas antes de aceitar uma ação e decida se ela atende à rota de família, personagem ou facção. Não é preciso correr pelo mapa por medo de gastar o prazo.",
      boundary: "Os custos de todas as missões, conteúdo perdível, matriz de consequências e rota ótima exigem testes do jogo final. Uma agenda completa antes do lançamento não seria confiável.",
      faqQ: "Explorar livremente consome os 30 dias?", faqA: "Não. Segundo a explicação oficial, a exploração comum não avança o tempo; apenas ações importantes claramente marcadas gastam períodos.", source: "time",
    },
    "day-night-system": {
      title: "Dia e noite: formas humana e vampírica", description: "Mostra como Coen humano de dia e vampiro à noite mudam combate, movimento, magia e formas de abordar missões.",
      quick: "Dia e noite não são apenas iluminação. De dia, Coen permanece humano e usa espada e hexes gravados por runas; à noite, vira vampiro e ganha garras, alimentação, força e movimento sobrenatural. O mesmo local pode ter entradas e soluções diferentes conforme a forma.",
      facts: ["A forma humana usa armas e hexes criados com runas marcadas no corpo.", "A forma vampírica possui movimentos como Clawride e Shadowstep e é afetada pela fome de sangue.", "Algumas atividades só aparecem em períodos específicos, mudando ferramentas e riscos disponíveis."],
      player: "Antes de escolher o horário, avalie se o objetivo exige conversa, espada, magia ou mobilidade vertical. Uma área fechada pela frente pode ter rota noturna, mas a fome e a reação hostil também podem elevar o risco.",
      boundary: "Todas as restrições de horário, ordem de desbloqueio, regras de transformação e diferenças de missões ainda não foram publicadas. Exemplos de prévia não formam uma rota completa.",
      faqQ: "É possível trocar de forma a qualquer momento?", faqA: "As formas estão confirmadas como ligadas ao dia e à noite; não foi anunciado se a troca pode ser feita livremente em qualquer lugar.", source: "preview",
    },
    "combat": {
      title: "Combate direcional, bloqueio e aparo", description: "Explica combate em tempo real com quatro direções, defesa com vigor, aparo, Omni-Block, cargas de ativação e diferenças entre formas.",
      quick: "O combate usa ataques e defesas em quatro direções. O jogador lê o indicador do inimigo e escolhe a direção de golpe ou proteção. Segurar o bloqueio gasta vigor, enquanto aparar na direção e no momento corretos é mais eficiente. Habilidades fortes usam cargas obtidas em combate.",
      facts: ["As quatro direções orientam tanto os golpes do jogador quanto a leitura de ataques inimigos.", "Bloquear é a alternativa segura, mas consome vigor; o aparo direcional exige entrada e tempo mais precisos.", "O Omni-Block opcional reduz a exigência direcional, mas não é aparo automático nem invencibilidade."],
      player: "Contra um inimigo novo, bloqueie primeiro para aprender a animação e depois use aparos para conservar vigor. A forma humana enfatiza espada e hexes; a vampírica muda o ritmo com garras e mobilidade, então uma única estratégia não serve para todos os períodos.",
      boundary: "Janelas exatas, fórmulas de dano, custos de vigor, multiplicadores de dificuldade e melhores combinações precisam de testes repetidos. O jogo é divulgado como RPG de ação narrativo, não como Soulslike oficial.",
      faqQ: "O combate é por turnos?", faqA: "Não. É combate de ação em tempo real com indicadores direcionais para ataque e defesa.", source: "preview",
    },
    "blood-hunger": {
      title: "Fome de sangue, alimentação e perda de controle", description: "Explica como a fome da forma vampírica afeta diálogos e alimentação, o risco de Coen perder o controle e a alternativa de usar animais.",
      quick: "A forma vampírica de Coen precisa administrar fome de sangue. A fome afeta opções de diálogo e comportamento; em estado crítico, o jogador pode perder controle total do personagem. Escolher de quem se alimentar é uma decisão de recurso, narrativa e moral.",
      facts: ["Animais, inimigos e NPCs importantes podem representar fontes com consequências diferentes.", "A prévia oficial cita animais como alternativa para evitar ferir pessoas importantes.", "Fome extrema pode mudar cenas e controle, não apenas reduzir uma barra."],
      player: "Antes de conversas ou áreas cheias de habitantes, verifique a fome e mantenha uma fonte segura. Ferir ou matar um NPC nomeado pode remover serviços, relações e missões, então o benefício imediato de combate não deve ser a única medida.",
      boundary: "Limiares, quantidade fornecida por cada alvo, efeitos de habilidades e todos os resultados de perda de controle não foram publicados. Eles precisam ser repetidos na mesma dificuldade depois do lançamento.",
      faqQ: "Coen precisa beber sangue humano?", faqA: "O material atual indica que animais podem ser uma alternativa, mas as regras completas ainda dependem do jogo final.", source: "preview",
    },
    "characters": {
      title: "Personagens e relações confirmadas", description: "Apresenta Coen, sua família, Brencis, os Vrakhiri e aliados divulgados, separando biografia oficial de finais ainda desconhecidos.",
      quick: "Coen é um jovem de Vale Sangora em 1347 que precisa salvar a família depois de se tornar um Dawnwalker. O conflito principal envolve o senhor vampiro Brencis e o domínio Vrakhiri; Anca, Bakir, Xanthe e Ambrus também foram revelados oficialmente.",
      facts: ["O prazo da família move a história, mas cada membro possui antecedentes e reações próprios.", "Brencis é apresentado como antigo senador romano e governante vampiro; seus seguidores vêm de diferentes séculos e culturas.", "Anca é a herbalista de Laslea e se relaciona ao aprendizado mágico e à história pessoal de Coen."],
      player: "Separe biografias publicadas, relações vistas em prévias e teorias de fãs. Escolhas podem alterar sobrevivência, serviços, alianças e missões; ninguém deve ser marcado como morte obrigatória ou companheiro fixo antes de testes.",
      boundary: "A lista completa de companheiros, romances, missões de lealdade, personagens elimináveis e sobreviventes por final não foi divulgada. A página registra apenas identidades e relações verificáveis.",
      faqQ: "Coen é um vampiro completo?", faqA: "Ele é um Dawnwalker: humano durante o dia e dotado de forma e poderes vampíricos à noite.", source: "characters",
    },
    "vale-sangora": {
      title: "Vale Sangora: mundo, locais e ecologia", description: "Apresenta o vale dos Cárpatos em 1347, Svartrau, Howling Keep, Shrike’s Crag, clima dinâmico e estrutura social.",
      quick: "Vale Sangora é o mundo aberto do jogo, um vale fictício dos Cárpatos do século XIV afetado pela Peste Negra, pressão feudal e domínio dos Vrakhiri. Laslea, a cidade de Svartrau, Howling Keep e Shrike’s Crag estão entre os locais divulgados.",
      facts: ["O mundo reúne povoações, áreas selvagens, pântanos, montanhas, ruínas e territórios vampíricos.", "Clima e neblina podem alterar visibilidade e risco de deslocamento, não apenas a atmosfera.", "NPCs agem por conta própria; a morte de uma pessoa nomeada pode remover loja, forja ou missão."],
      player: "Um guia de mapa útil deve relacionar cada lugar a horário, método de entrada, NPCs e estado do mundo, e não apenas listar coordenadas. Habilidades mudam entre dia e noite e escolhas podem remover serviços permanentemente.",
      boundary: "Tamanho completo do mapa, pontos de viagem rápida, coordenadas de colecionáveis, reaparecimento de inimigos e níveis regionais não foram publicados. O site não criará um banco fictício.",
      faqQ: "Vale Sangora é um lugar real?", faqA: "É um vale fictício inspirado na história e cultura da Europa Central e dos Cárpatos, não um único local real.", source: "world",
    },
    "system-requirements": {
      title: "Requisitos de sistema para PC", description: "Organiza requisitos mínimos e recomendados, 16 GB, SSD de 60 GB, GTX 1060/RX 580 e RTX 4060/RX 7600 XT.",
      quick: "O mínimo exige Windows 10, DirectX 12, Core i5-11400F ou Ryzen 7 2700X, 16 GB de RAM, GTX 1060 ou RX 580 e SSD de 60 GB. O recomendado usa Core i7-11700K ou Ryzen 7 5700X com RTX 4060, RX 7600 XT ou Intel Arc B580.",
      facts: ["Mínimo e recomendado listam 16 GB de RAM e SSD de 60 GB.", "A tabela não informa resolução, preset, taxa de quadros ou ray tracing de cada nível.", "Os nomes de GPU definem níveis oficiais, mas não garantem desempenho idêntico em todas as cenas."],
      player: "Use a tabela como base de compatibilidade e espere benchmarks com driver, resolução, preset, upscaling e mínimos em áreas pesadas. Ao atualizar o PC, considere fonte, placa-mãe, refrigeração e equilíbrio do sistema.",
      boundary: "Download final, patch inicial, metas oficiais de desempenho, Steam Deck, ultrawide e ray tracing não foram detalhados. A página não converte o nome de uma peça em promessa de FPS.",
      faqQ: "O SSD é obrigatório?", faqA: "Sim. As configurações mínima e recomendada indicam 60 GB de armazenamento em SSD.", source: "specs",
    },
  },
};

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function routeUrl(locale, route = "") {
  const prefix = locale ? `/${locale}` : "";
  return `${SITE}${prefix}/${route ? `${route}/` : ""}`;
}

function dropdown(locale, route = "") {
  const current = locales[locale]?.label || "English";
  const direct = new Set(equivalentLocales.map(([code]) => code));
  const links = languageOptions.map(([code, lang, label]) => {
    const href = route && direct.has(code) ? routeUrl(code, route) : routeUrl(code);
    return `<a href="${href}" lang="${lang}"${code === locale ? ' aria-current="page"' : ""}>${label}</a>`;
  }).join("");
  return `<!-- LANG-DROPDOWN:START --><details class="language-menu"><summary aria-label="Select language">🌐 ${current}</summary><div class="language-options">${links}</div></details><!-- LANG-DROPDOWN:END -->`;
}

function alternates(route = "") {
  return `${equivalentLocales.map(([code, lang]) => `<link rel="alternate" hreflang="${lang}" href="${routeUrl(code, route)}" />`).join("")}<link rel="alternate" hreflang="x-default" href="${routeUrl("", route)}" />`;
}

function nav(locale, route = "") {
  const data = locales[locale];
  return `<header class="site-header">
    <a class="brand" href="../"><span class="brand-mark">BD</span><span><strong>The Blood of Dawnwalker</strong><small>${data.label} Guide &amp; Wiki</small></span></a>
    <nav aria-label="Main navigation"><a href="../release-date/">${data.nav[0]}</a><a href="../30-days/">${data.nav[1]}</a><a href="../combat/">${data.nav[2]}</a><a href="../characters/">${data.nav[3]}</a>${dropdown(locale, route)}</nav>
  </header>`;
}

function pageHtml(locale, route, page) {
  const data = locales[locale];
  const source = sources[page.source];
  const related = routes.filter((item) => item !== route).map((item) => data.pages[item]);
  const canonical = routeUrl(locale, route);
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage", name: page.title, description: page.description, url: canonical,
        inLanguage: data.htmlLang, dateModified: DATE,
        isPartOf: { "@type": "WebSite", name: data.siteTitle, url: routeUrl(locale) },
        breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: data.ui.home, item: routeUrl(locale) },
          { "@type": "ListItem", position: 2, name: page.title, item: canonical },
        ] },
      },
      {
        "@type": "FAQPage", mainEntity: [
          { "@type": "Question", name: page.faqQ, acceptedAnswer: { "@type": "Answer", text: page.faqA } },
          { "@type": "Question", name: data.ui.boundary, acceptedAnswer: { "@type": "Answer", text: page.boundary } },
        ],
      },
    ],
  }).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="${data.htmlLang}">
<head>
  ${ADS}
  <meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(page.title)} | ${esc(data.siteTitle)}</title>
  <meta name="description" content="${esc(page.description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${canonical}" />${alternates(route)}
  <meta property="og:type" content="article" /><meta property="og:site_name" content="${esc(data.siteTitle)}" />
  <meta property="og:title" content="${esc(page.title)}" /><meta property="og:description" content="${esc(page.description)}" />
  <meta property="og:url" content="${canonical}" /><meta property="og:locale" content="${data.locale}" />
  <link rel="stylesheet" href="../../styles.css" />
  <script type="application/ld+json">${schema}</script>
</head>
<body>
  ${nav(locale, route)}
  <main class="article-main">
    <section class="article-hero"><div><p class="eyebrow">${data.ui.verified}</p><h1>${esc(page.title)}</h1><p class="hero-copy">${esc(page.description)}</p><div class="article-meta"><span class="tag confirmed">${data.ui.updated}</span><span class="tag confirmed">${data.ui.sourceBacked}</span></div></div></section>
    <div class="article-body">
      <article class="article-content">
        <section class="verification-box"><h2>${data.ui.quick}</h2><p>${esc(page.quick)}</p><p>${esc(data.ui.notPlaceholder)}</p></section>
        <section><h2>${data.ui.confirmed}</h2><ul>${page.facts.map((fact) => `<li>${esc(fact)}</li>`).join("")}</ul><p>${esc(page.quick)}</p></section>
        <section><h2>${data.ui.player}</h2><p>${esc(page.player)}</p><p>${esc(data.ui.methodology)}</p></section>
        <section><h2>${data.ui.boundary}</h2><p>${esc(page.boundary)}</p><p>${esc(data.ui.notPlaceholder)}</p></section>
        <section><h2>${data.ui.related}</h2><div class="related-grid">${related.map((item) => `<a href="../${routes.find((key) => data.pages[key] === item)}/"><strong>${esc(item.title)}</strong><span>${esc(item.description)}</span></a>`).join("")}</div></section>
        <section><h2>${data.ui.sources}</h2><ul><li><a href="${source[1]}" target="_blank" rel="noreferrer">${esc(source[0])}</a></li><li><a href="${SITE}/sources/">Source methodology</a></li></ul></section>
        <section id="page-faq"><h2>${data.ui.faq}</h2><dl class="faq-list"><div><dt>${esc(page.faqQ)}</dt><dd>${esc(page.faqA)}</dd></div><div><dt>${data.ui.boundary}</dt><dd>${esc(page.boundary)}</dd></div></dl></section>
      </article>
      <aside class="article-aside"><h2>${data.ui.quick}</h2><p>${esc(page.quick)}</p><a href="../">${data.ui.home}</a>${related.slice(0, 4).map((item) => `<a href="../${routes.find((key) => data.pages[key] === item)}/">${esc(item.title)}</a>`).join("")}</aside>
    </div>
  </main>
  <footer class="site-footer"><p>${esc(data.siteTitle)} · ${data.ui.updated}</p><a href="${SITE}/sources/">${data.ui.sources}</a></footer>
</body>
</html>`;
}

function homeHtml(locale) {
  const data = locales[locale];
  const canonical = routeUrl(locale);
  const cards = routes.map((route) => [route, data.pages[route]]);
  const schema = JSON.stringify({
    "@context": "https://schema.org", "@type": "WebSite", name: data.siteTitle, url: canonical,
    inLanguage: data.htmlLang, description: data.siteDescription, dateModified: DATE,
  }).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="${data.htmlLang}">
<head>
  ${ADS}
  <meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(data.siteTitle)}</title><meta name="description" content="${esc(data.siteDescription)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" /><link rel="canonical" href="${canonical}" />
  ${languageOptions.map(([code, lang]) => `<link rel="alternate" hreflang="${lang}" href="${routeUrl(code)}" />`).join("")}<link rel="alternate" hreflang="x-default" href="${SITE}/" />
  <meta property="og:type" content="website" /><meta property="og:title" content="${esc(data.siteTitle)}" /><meta property="og:description" content="${esc(data.siteDescription)}" /><meta property="og:url" content="${canonical}" /><meta property="og:locale" content="${data.locale}" />
  <link rel="stylesheet" href="../styles.css" /><script type="application/ld+json">${schema}</script>
</head>
<body>
  <header class="site-header"><a class="brand" href="#top"><span class="brand-mark">BD</span><span><strong>The Blood of Dawnwalker</strong><small>${data.label} Guide &amp; Wiki</small></span></a>
  <nav aria-label="Main navigation"><a href="./release-date/">${data.nav[0]}</a><a href="./30-days/">${data.nav[1]}</a><a href="./combat/">${data.nav[2]}</a><a href="./characters/">${data.nav[3]}</a>${dropdown(locale)}</nav></header>
  <main id="top">
    <section class="hero" aria-labelledby="hero-title"><div class="hero-media" role="img" aria-label="The Blood of Dawnwalker"></div><div class="hero-overlay"></div>
      <div class="hero-content"><p class="eyebrow">${data.home.eyebrow}</p><h1 id="hero-title">The Blood of Dawnwalker</h1><p class="hero-copy">${esc(data.home.intro)}</p>
        <div class="hero-actions"><a class="button primary" href="./release-date/">${data.nav[0]}</a><a class="button secondary" href="./30-days/">${data.nav[1]}</a></div>
        <dl class="fact-strip"><div><dt>${data.home.genre}</dt><dd>Open-world action RPG</dd></div><div><dt>${data.home.platforms}</dt><dd>PC / PS5 / Xbox Series X|S</dd></div><div><dt>${data.home.developer}</dt><dd>Rebel Wolves</dd></div><div><dt>${data.home.release}</dt><dd>3 September 2026</dd></div></dl>
      </div>
    </section>
    <section class="research band"><div class="section-heading"><p class="eyebrow">${data.ui.verified}</p><h2>${data.home.facts}</h2><p>${esc(data.ui.methodology)}</p></div>
      <div class="insight-grid">${[data.home.card1, data.home.card2, data.home.card3].map((card) => `<article><span class="tag confirmed">${card[0]}</span><h3>${card[1]}</h3><p>${card[2]}</p></article>`).join("")}<article><span class="tag confirmed">${data.ui.sourceBacked}</span><h3>${data.home.available}</h3><p>${data.home.availableCopy}</p></article></div>
    </section>
    <section class="section-block"><div class="section-heading"><p class="eyebrow">${data.ui.updated}</p><h2>${data.home.available}</h2><p>${data.home.availableCopy}</p></div>
      <div class="guide-grid">${cards.map(([route, page]) => `<article class="guide-card ready" data-category="guide"><div class="card-top"><span class="status ready">${data.ui.sourceBacked}</span></div><h3><a href="./${route}/">${esc(page.title)}</a></h3><p>${esc(page.description)}</p><a class="button secondary" href="./${route}/">${data.ui.all}</a></article>`).join("")}</div>
    </section>
  </main>
  <footer class="site-footer"><p>${esc(data.siteTitle)}</p><a href="${SITE}/sources/">${data.ui.sources}</a></footer>
</body>
</html>`;
}

for (const [locale, data] of Object.entries(locales)) {
  const home = path.join(ROOT, locale);
  fs.mkdirSync(home, { recursive: true });
  fs.writeFileSync(path.join(home, "index.html"), homeHtml(locale));
  for (const route of routes) {
    const dir = path.join(home, route);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), pageHtml(locale, route, data.pages[route]));
  }
}

function replaceAlternates(html, route) {
  const block = alternates(route);
  const pattern = /(?:<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>\s*)+/g;
  const candidates = [...html.matchAll(pattern)];
  if (!candidates.length) return html;
  const first = candidates[0];
  return html.slice(0, first.index) + block + html.slice(first.index + first[0].length);
}

function replaceDropdown(html, locale, route) {
  const block = dropdown(locale, route);
  return html.replace(/<!-- LANG-DROPDOWN:START -->[\s\S]*?<!-- LANG-DROPDOWN:END -->/, block);
}

for (const route of routes) {
  for (const [locale] of equivalentLocales) {
    if (locales[locale]) continue;
    const file = locale ? path.join(ROOT, locale, route, "index.html") : path.join(ROOT, route, "index.html");
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, "utf8");
    html = replaceAlternates(html, route);
    html = replaceDropdown(html, locale, route);
    fs.writeFileSync(file, html);
  }
}

function readSitemap(name) {
  const file = path.join(ROOT, name);
  if (!fs.existsSync(file)) return [];
  return [...fs.readFileSync(file, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function writeSitemap(name, urls) {
  const unique = [...new Set(urls)].sort();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique.map((url) => `  <url><loc>${url}</loc><lastmod>${DATE}</lastmod></url>`).join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(ROOT, name), xml);
  return unique;
}

for (const locale of Object.keys(locales)) {
  const name = `sitemap-${locale}.xml`;
  const urls = readSitemap(name);
  urls.push(routeUrl(locale));
  for (const route of routes) urls.push(routeUrl(locale, route));
  writeSitemap(name, urls);
}

const allLanguageSitemaps = languageOptions.map(([code]) => code ? `sitemap-${code}.xml` : "sitemap-en.xml");
const allUrls = allLanguageSitemaps.flatMap(readSitemap);
writeSitemap("sitemap.xml", allUrls);
fs.writeFileSync(path.join(ROOT, "sitemap-index.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allLanguageSitemaps.map((name) => `  <sitemap><loc>${SITE}/${name}</loc><lastmod>${DATE}</lastmod></sitemap>`).join("\n")}\n</sitemapindex>\n`);

const roadmapFile = path.join(ROOT, "URL_ROADMAP_TO_1000.json");
const roadmap = JSON.parse(fs.readFileSync(roadmapFile, "utf8"));
roadmap.currentRound = 16;
roadmap.currentIndexableUrls = allUrls.length;
roadmap.remainingToTarget = roadmap.targetIndexableUrls - allUrls.length;
roadmap.phases[0].status = `completed and extended to ${allUrls.length} total indexable URLs`;
fs.writeFileSync(roadmapFile, JSON.stringify(roadmap, null, 2) + "\n");

fs.writeFileSync(path.join(ROOT, "ROUND_16_URL_MANIFEST.json"), JSON.stringify({
  generatedAt: DATE,
  round: 16,
  locales: Object.keys(locales),
  routes,
  newLocalizedPages: Object.keys(locales).length * routes.length,
  upgradedLocalizedHomes: Object.keys(locales).length,
  sitemapUrls: allUrls.length,
  remainingTo1000: 1000 - allUrls.length,
}, null, 2) + "\n");

console.log(JSON.stringify({
  locales: Object.keys(locales),
  routesPerLocale: routes.length,
  newLocalizedPages: Object.keys(locales).length * routes.length,
  sitemapUrls: allUrls.length,
}, null, 2));
