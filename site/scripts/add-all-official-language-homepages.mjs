import { mkdir, readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(".");
const domain = "https://bloodofdawnwalker.cc";
const modified = "2026-07-25";

const locales = [
  {
    code: "fr", lang: "fr", label: "Français", locale: "fr_FR",
    title: "The Blood of Dawnwalker – Guide et wiki français",
    desc: "Guide français de The Blood of Dawnwalker : sortie, plateformes, système des 30 jours, cycle humain-vampire, combat et langues officielles.",
    heading: "Guide français de The Blood of Dawnwalker",
    intro: "The Blood of Dawnwalker sort le 3 septembre 2026 sur PC, PlayStation 5 et Xbox Series X|S. Cette page rassemble les informations officielles essentielles avant la sortie et sert de point d’entrée à la future section française du wiki.",
    releaseH: "Sortie et plateformes confirmées",
    releaseP: "Le jeu est un action-RPG solo en monde ouvert développé par Rebel Wolves et édité par Bandai Namco Entertainment. Aucune version PS4, Xbox One ou Nintendo Switch n’a été annoncée. Le studio a confirmé que le jeu était passé gold ; une mise à jour du premier jour reste néanmoins possible.",
    gameH: "Ce qui distingue le jeu",
    gameP: "Coen est humain le jour et vampire la nuit. Les deux formes disposent de combats, de pouvoirs et de voies d’exploration différents. La campagne impose une limite narrative de 30 jours et 30 nuits, mais l’exploration libre ne fait pas avancer un compte à rebours en temps réel : seules certaines actions importantes consomment du temps.",
    languageH: "Prise en charge du français",
    languageP: "Le français fait partie des six langues proposant l’interface, les sous-titres et un doublage intégral. Cette page ne suppose pas que tous les guides anglais sont déjà traduits : les prochains contenus français ne seront publiés que lorsqu’ils apporteront une réponse complète et vérifiée.",
    linksH: "Guides disponibles maintenant", links: [["Guide anglais complet", "/"], ["Guide allemand", "/de/"], ["Guide espagnol", "/es/"]],
  },
  {
    code: "it", lang: "it", label: "Italiano", locale: "it_IT",
    title: "The Blood of Dawnwalker – Guida e wiki in italiano",
    desc: "Guida italiana a The Blood of Dawnwalker con uscita, piattaforme, limite di 30 giorni, ciclo umano-vampiro, combattimento e lingue.",
    heading: "Guida italiana a The Blood of Dawnwalker",
    intro: "The Blood of Dawnwalker uscirà il 3 settembre 2026 su PC, PlayStation 5 e Xbox Series X|S. Questa pagina riunisce le informazioni ufficiali principali e costituisce il punto di partenza della sezione italiana del wiki.",
    releaseH: "Data di uscita e piattaforme",
    releaseP: "Il titolo è un action RPG open world per giocatore singolo, sviluppato da Rebel Wolves e pubblicato da Bandai Namco Entertainment. Non sono state annunciate versioni per PS4, Xbox One o Nintendo Switch. Il gioco ha raggiunto la fase gold, anche se resta possibile una patch al day one.",
    gameH: "Le meccaniche centrali",
    gameP: "Coen è umano durante il giorno e vampiro di notte. Le due forme cambiano abilità, combattimento e percorsi di esplorazione. La storia ruota attorno a 30 giorni e 30 notti, ma non esiste un timer continuo: esplorare non consuma tempo, mentre alcune missioni, decisioni e abilità mostrano un costo temporale prima della conferma.",
    languageH: "Supporto della lingua italiana",
    languageP: "L’italiano è una delle sei lingue con interfaccia, sottotitoli e doppiaggio completo. I futuri articoli italiani saranno pubblicati solo quando potranno offrire risposte verificabili, evitando traduzioni automatiche di pagine incomplete o speculative.",
    linksH: "Guide già disponibili", links: [["Wiki completo in inglese", "/"], ["Guida tedesca", "/de/"], ["Guida spagnola", "/es/"]],
  },
  {
    code: "pl", lang: "pl", label: "Polski", locale: "pl_PL",
    title: "The Blood of Dawnwalker – Polski poradnik i wiki",
    desc: "Polski poradnik do The Blood of Dawnwalker: premiera, platformy, limit 30 dni, cykl człowiek-wampir, walka i oficjalne języki.",
    heading: "Polski poradnik do The Blood of Dawnwalker",
    intro: "The Blood of Dawnwalker zadebiutuje 3 września 2026 roku na PC, PlayStation 5 oraz Xbox Series X|S. Ta strona zbiera najważniejsze potwierdzone informacje i otwiera polską część wiki poświęconą grze studia Rebel Wolves.",
    releaseH: "Premiera i potwierdzone platformy",
    releaseP: "Gra jest jednoosobowym RPG akcji z otwartym światem, wydawanym przez Bandai Namco Entertainment. Nie zapowiedziano wersji na PS4, Xbox One ani Nintendo Switch. Produkcja osiągnęła status gold, co oznacza gotowość wersji premierowej do certyfikacji i tłoczenia, choć aktualizacja pierwszego dnia nadal jest możliwa.",
    gameH: "Najważniejsze mechaniki",
    gameP: "Coen jest człowiekiem za dnia i wampirem nocą, a każda forma ma inne zdolności bojowe i możliwości eksploracji. Fabuła daje 30 dni i 30 nocy na próbę uratowania rodziny. Nie jest to jednak licznik działający w czasie rzeczywistym: swobodne zwiedzanie nie zużywa czasu, robią to wybrane zadania, decyzje i nauka umiejętności.",
    languageH: "Pełna polska wersja językowa",
    languageP: "Polski jest jednym z sześciu języków obejmujących interfejs, napisy i pełny dubbing. Kolejne polskie poradniki pojawią się dopiero wtedy, gdy można je oprzeć na oficjalnych materiałach lub sprawdzonych danych z finalnej wersji gry.",
    linksH: "Dostępne sekcje", links: [["Pełne wiki po angielsku", "/"], ["Poradnik niemiecki", "/de/"], ["Poradnik hiszpański", "/es/"]],
  },
  {
    code: "zh-hans", lang: "zh-Hans", label: "简体中文", locale: "zh_CN",
    title: "《The Blood of Dawnwalker》简体中文攻略与维基",
    desc: "《The Blood of Dawnwalker》简体中文攻略入口，涵盖发售日期、平台、30天系统、昼夜形态、战斗与官方语言支持。",
    heading: "《The Blood of Dawnwalker》简体中文攻略",
    intro: "《The Blood of Dawnwalker》将于2026年9月3日登陆 PC、PlayStation 5 和 Xbox Series X|S。本页汇总发售前已经由官方确认的核心信息，并作为简体中文攻略区的入口。",
    releaseH: "发售时间与平台",
    releaseP: "本作是 Rebel Wolves 开发、Bandai Namco Entertainment 发行的单人开放世界动作角色扮演游戏。目前没有公布 PS4、Xbox One 或 Nintendo Switch 版本。游戏已经进入压盘阶段，但首日补丁、预载时间与全球解锁时刻仍需等待官方进一步说明。",
    gameH: "核心玩法特点",
    gameP: "主角 Coen 白天是人类，夜晚会变成吸血鬼，两种形态拥有不同的战斗能力、魔法与探索路线。剧情以30个昼夜为期限，但并非持续倒计时；自由探索不会自动消耗时间，只有部分任务、对话选择和技能学习会在确认前显示时间成本。",
    languageH: "简体中文支持情况",
    languageP: "Steam 官方页面显示简体中文支持界面和字幕，但不包含完整中文配音。本站不会把尚未翻译或缺少答案的英文占位页批量复制过来；后续中文页面会在具备完整、可验证信息时逐步上线。",
    linksH: "现有完整内容", links: [["英文完整维基", "/"], ["德语攻略", "/de/"], ["西班牙语攻略", "/es/"]],
  },
  {
    code: "zh-hant", lang: "zh-Hant", label: "繁體中文", locale: "zh_TW",
    title: "《The Blood of Dawnwalker》繁體中文攻略與 Wiki",
    desc: "《The Blood of Dawnwalker》繁體中文攻略入口，整理發售日期、平台、30天系統、晝夜形態、戰鬥及語言支援。",
    heading: "《The Blood of Dawnwalker》繁體中文攻略",
    intro: "《The Blood of Dawnwalker》預定於2026年9月3日登上 PC、PlayStation 5 與 Xbox Series X|S。本頁整理官方已確認的重點資訊，並作為繁體中文攻略區的起點。",
    releaseH: "上市日期與平台",
    releaseP: "本作是 Rebel Wolves 開發、Bandai Namco Entertainment 發行的單人開放世界動作角色扮演遊戲。目前未公布 PS4、Xbox One 或 Nintendo Switch 版本。遊戲已達到 gold 階段，但首日更新、預載及各地區解鎖時間仍待官方確認。",
    gameH: "遊戲的核心特色",
    gameP: "主角 Coen 白天是人類，夜晚則化身吸血鬼，兩種形態擁有不同的戰鬥、魔法與探索方式。故事設定30個晝夜的期限，但不是持續運作的即時計時器；自由探索不會消耗時間，只有特定任務、選擇與技能學習會產生明示的時間成本。",
    languageH: "繁體中文支援",
    languageP: "Steam 官方頁面列出繁體中文介面與字幕，但沒有完整中文語音。後續繁體中文內容只會在能提供完整、可驗證答案時發布，不會把資訊不足的英文頁面機械式翻譯。",
    linksH: "目前可用內容", links: [["英文完整 Wiki", "/"], ["德文攻略", "/de/"], ["西班牙文攻略", "/es/"]],
  },
  {
    code: "ja", lang: "ja", label: "日本語", locale: "ja_JP",
    title: "The Blood of Dawnwalker 日本語攻略・Wiki",
    desc: "The Blood of Dawnwalkerの日本語攻略入口。発売日、対応機種、30日システム、人間と吸血鬼、戦闘、公式対応言語を整理。",
    heading: "The Blood of Dawnwalker 日本語攻略",
    intro: "『The Blood of Dawnwalker』は2026年9月3日にPC、PlayStation 5、Xbox Series X|Sで発売予定です。このページでは、発売前に公式確認できる重要情報をまとめ、日本語攻略セクションの入口とします。",
    releaseH: "発売日と対応プラットフォーム",
    releaseP: "本作はRebel Wolvesが開発し、Bandai Namco Entertainmentが発売するシングルプレイヤー向けオープンワールド・アクションRPGです。PS4、Xbox One、Nintendo Switch版は発表されていません。ゴールド到達は確認済みですが、事前ロードや地域別の解禁時刻は未発表です。",
    gameH: "ゲームプレイの特徴",
    gameP: "主人公Coenは昼には人間、夜には吸血鬼となり、戦闘能力や魔法、探索ルートが変化します。物語には30日と30夜の期限がありますが、常時進行するリアルタイム制限ではありません。自由探索では時間を消費せず、一部のクエストや選択、スキル習得だけが明示された時間コストを持ちます。",
    languageH: "日本語対応",
    languageP: "Steamの公式表記では日本語のインターフェースと字幕に対応し、フル音声には対応していません。日本語ページは、公式情報または発売後の検証によって十分な回答を提供できるテーマから順次追加します。",
    linksH: "現在利用できるガイド", links: [["英語版Wiki", "/"], ["ドイツ語ガイド", "/de/"], ["スペイン語ガイド", "/es/"]],
  },
  {
    code: "ko", lang: "ko", label: "한국어", locale: "ko_KR",
    title: "The Blood of Dawnwalker 한국어 공략 및 위키",
    desc: "The Blood of Dawnwalker 한국어 공략 시작 페이지. 출시일, 플랫폼, 30일 시스템, 인간과 뱀파이어, 전투와 언어 지원 정리.",
    heading: "The Blood of Dawnwalker 한국어 공략",
    intro: "The Blood of Dawnwalker는 2026년 9월 3일 PC, PlayStation 5, Xbox Series X|S로 출시될 예정입니다. 이 페이지는 공식적으로 확인된 핵심 정보를 정리하고 한국어 공략 섹션의 출발점 역할을 합니다.",
    releaseH: "출시일과 지원 플랫폼",
    releaseP: "Rebel Wolves가 개발하고 Bandai Namco Entertainment가 퍼블리싱하는 싱글 플레이 오픈 월드 액션 RPG입니다. PS4, Xbox One, Nintendo Switch 버전은 발표되지 않았습니다. 골드 단계 도달은 확인됐지만 사전 다운로드와 지역별 정확한 해제 시간은 아직 공개되지 않았습니다.",
    gameH: "핵심 게임 시스템",
    gameP: "주인공 Coen은 낮에는 인간, 밤에는 뱀파이어가 되어 전투 능력과 마법, 탐험 경로가 달라집니다. 이야기는 30일과 30밤의 기한을 사용하지만 실시간으로 계속 줄어드는 타이머는 아닙니다. 자유 탐험은 시간을 소모하지 않으며 일부 퀘스트, 선택지, 기술 학습만 명시된 시간 비용을 사용합니다.",
    languageH: "한국어 지원",
    languageP: "Steam 공식 페이지는 한국어 인터페이스와 자막을 지원한다고 표시하며 전체 한국어 음성은 포함하지 않습니다. 한국어 문서는 공식 자료나 출시 후 검증으로 완전한 답변을 제공할 수 있을 때만 추가합니다.",
    linksH: "현재 이용 가능한 콘텐츠", links: [["영어 전체 위키", "/"], ["독일어 가이드", "/de/"], ["스페인어 가이드", "/es/"]],
  },
  {
    code: "cs", lang: "cs", label: "Čeština", locale: "cs_CZ",
    title: "The Blood of Dawnwalker – Český průvodce a wiki",
    desc: "Český průvodce hrou The Blood of Dawnwalker: datum vydání, platformy, systém 30 dnů, člověk a upír, souboje a jazyky.",
    heading: "Český průvodce hrou The Blood of Dawnwalker",
    intro: "The Blood of Dawnwalker vyjde 3. září 2026 pro PC, PlayStation 5 a Xbox Series X|S. Tato stránka shrnuje hlavní oficiálně potvrzené informace a otevírá českou část wiki.",
    releaseH: "Vydání a potvrzené platformy",
    releaseP: "Jde o akční RPG pro jednoho hráče v otevřeném světě, které vyvíjí Rebel Wolves a vydává Bandai Namco Entertainment. Verze pro PS4, Xbox One ani Nintendo Switch nebyly oznámeny. Hra dosáhla fáze gold, ale předběžné stahování a přesné regionální časy odemčení zatím potvrzeny nejsou.",
    gameH: "Hlavní herní systémy",
    gameP: "Coen je ve dne člověkem a v noci upírem. Obě podoby mění bojové schopnosti, magii i možnosti pohybu. Příběh pracuje s limitem 30 dnů a nocí, nejde však o nepřetržitý časovač. Volný průzkum čas nespotřebovává; cenu mají pouze vybrané úkoly, rozhodnutí a učení schopností.",
    languageH: "Podpora češtiny",
    languageP: "Oficiální stránka na Steamu uvádí české rozhraní a titulky, nikoli kompletní český dabing. Další české stránky vzniknou jen pro témata, u nichž lze nabídnout úplnou odpověď založenou na oficiálních nebo ověřených údajích.",
    linksH: "Dostupné průvodce", links: [["Kompletní anglická wiki", "/"], ["Německý průvodce", "/de/"], ["Španělský průvodce", "/es/"]],
  },
  {
    code: "hu", lang: "hu", label: "Magyar", locale: "hu_HU",
    title: "The Blood of Dawnwalker – Magyar útmutató és wiki",
    desc: "Magyar The Blood of Dawnwalker útmutató a megjelenésről, platformokról, a 30 napos rendszerről, harcról és nyelvi támogatásról.",
    heading: "The Blood of Dawnwalker magyar útmutató",
    intro: "A The Blood of Dawnwalker 2026. szeptember 3-án jelenik meg PC-re, PlayStation 5-re és Xbox Series X|S-re. Ez az oldal összefoglalja a hivatalosan megerősített alapinformációkat, és a magyar wiki kezdőpontja.",
    releaseH: "Megjelenés és platformok",
    releaseP: "A Rebel Wolves fejlesztésében és a Bandai Namco Entertainment kiadásában készülő játék egy egyjátékos, nyílt világú akció-RPG. PS4-, Xbox One- vagy Nintendo Switch-verziót nem jelentettek be. A játék elérte a gold állapotot, de az előtöltés és a régiós feloldási időpontok még nem ismertek.",
    gameH: "A játékmenet alapjai",
    gameP: "Coen nappal ember, éjjel pedig vámpír, ezért a harci képességei, mágiája és bejárható útvonalai is változnak. A történet 30 napos és 30 éjszakás határidőt használ, de ez nem folyamatos valós idejű visszaszámlálás. A szabad felfedezés nem fogyaszt időt; csak bizonyos küldetések, döntések és képességtanulások járnak előre jelzett költséggel.",
    languageH: "Magyar nyelvi támogatás",
    languageP: "A Steam hivatalos adatlapja magyar kezelőfelületet és feliratot jelez, teljes magyar szinkront nem. További magyar oldalak csak akkor kerülnek indexelésre, ha teljes és ellenőrizhető választ tudnak adni.",
    linksH: "Jelenleg elérhető útmutatók", links: [["Teljes angol wiki", "/"], ["Német útmutató", "/de/"], ["Spanyol útmutató", "/es/"]],
  },
  {
    code: "pt-br", lang: "pt-BR", label: "Português (Brasil)", locale: "pt_BR",
    title: "The Blood of Dawnwalker – Guia e wiki em português",
    desc: "Guia brasileiro de The Blood of Dawnwalker: lançamento, plataformas, sistema de 30 dias, formas humana e vampira, combate e idiomas.",
    heading: "Guia de The Blood of Dawnwalker em português",
    intro: "The Blood of Dawnwalker será lançado em 3 de setembro de 2026 para PC, PlayStation 5 e Xbox Series X|S. Esta página reúne as principais informações oficiais e inicia a seção em português brasileiro do wiki.",
    releaseH: "Lançamento e plataformas",
    releaseP: "O jogo é um RPG de ação em mundo aberto para um jogador, desenvolvido pela Rebel Wolves e publicado pela Bandai Namco Entertainment. Não há versões anunciadas para PS4, Xbox One ou Nintendo Switch. O projeto já alcançou o estágio gold, embora preload, horários regionais e uma possível atualização de primeiro dia ainda dependam de confirmação.",
    gameH: "Sistemas principais",
    gameP: "Coen é humano durante o dia e vampiro à noite, com habilidades de combate, magia e caminhos de exploração diferentes. A história trabalha com um limite de 30 dias e noites, mas não usa uma contagem regressiva contínua. Explorar livremente não consome tempo; apenas certas missões, escolhas e aprendizados exibem um custo antes da confirmação.",
    languageH: "Suporte ao português brasileiro",
    languageP: "A página oficial da Steam lista interface e legendas em português do Brasil, sem dublagem completa. Novos guias em português serão publicados apenas quando houver uma resposta completa sustentada por fontes oficiais ou testes da versão final.",
    linksH: "Guias disponíveis", links: [["Wiki completo em inglês", "/"], ["Guia em alemão", "/de/"], ["Guia em espanhol", "/es/"]],
  },
  {
    code: "es-419", lang: "es-419", label: "Español (Latinoamérica)", locale: "es_419",
    title: "The Blood of Dawnwalker – Guía en español latino",
    desc: "Guía latinoamericana de The Blood of Dawnwalker con lanzamiento, plataformas, sistema de 30 días, combate, vampiros e idiomas oficiales.",
    heading: "Guía latinoamericana de The Blood of Dawnwalker",
    intro: "The Blood of Dawnwalker se estrena el 3 de septiembre de 2026 en PC, PlayStation 5 y Xbox Series X|S. Esta página reúne la información oficial esencial y funciona como entrada a la sección de español latinoamericano.",
    releaseH: "Fecha de estreno y plataformas",
    releaseP: "Es un RPG de acción de mundo abierto para un jugador, desarrollado por Rebel Wolves y publicado por Bandai Namco Entertainment. No se anunciaron versiones para PS4, Xbox One ni Nintendo Switch. El juego ya alcanzó el estado gold, pero la precarga y los horarios exactos de desbloqueo regional todavía no están confirmados.",
    gameH: "Sistemas principales",
    gameP: "Coen es humano durante el día y vampiro por la noche, por lo que cambian sus habilidades de combate, magia y exploración. La historia plantea un límite de 30 días y noches, pero no es una cuenta regresiva permanente en tiempo real. Explorar libremente no consume tiempo; algunas misiones, decisiones y habilidades muestran un costo antes de ejecutarse.",
    languageH: "Compatibilidad con español latino",
    languageP: "Steam confirma interfaz y subtítulos en español latinoamericano, pero no audio completo. El español de España sí cuenta con doblaje y se mantiene como una versión regional separada en `/es/`. Las próximas páginas latinas solo se publicarán con respuestas completas y verificables.",
    linksH: "Contenido disponible", links: [["Wiki completo en inglés", "/"], ["Español de España", "/es/"], ["Guía en alemán", "/de/"]],
  },
  {
    code: "tr", lang: "tr", label: "Türkçe", locale: "tr_TR",
    title: "The Blood of Dawnwalker – Türkçe rehber ve wiki",
    desc: "The Blood of Dawnwalker Türkçe rehberi: çıkış tarihi, platformlar, 30 günlük sistem, insan-vampir döngüsü, savaş ve dil desteği.",
    heading: "The Blood of Dawnwalker Türkçe rehberi",
    intro: "The Blood of Dawnwalker, 3 Eylül 2026 tarihinde PC, PlayStation 5 ve Xbox Series X|S için çıkacak. Bu sayfa doğrulanmış temel bilgileri bir araya getirir ve Türkçe wiki bölümünün başlangıç noktasıdır.",
    releaseH: "Çıkış tarihi ve platformlar",
    releaseP: "Rebel Wolves tarafından geliştirilen ve Bandai Namco Entertainment tarafından yayımlanan oyun, tek oyunculu açık dünya aksiyon RPG’sidir. PS4, Xbox One veya Nintendo Switch sürümü duyurulmadı. Oyun gold aşamasına ulaştı; ancak ön yükleme ve bölgesel açılış saatleri henüz açıklanmadı.",
    gameH: "Temel oynanış sistemleri",
    gameP: "Coen gündüz insan, gece ise vampirdir; bu iki biçim savaş yeteneklerini, büyüyü ve keşif rotalarını değiştirir. Hikâye 30 gün ve gece sınırı kullanır, fakat sürekli işleyen gerçek zamanlı bir geri sayım değildir. Serbest keşif zaman tüketmez; yalnızca belirli görevler, seçimler ve yetenek öğrenimleri önceden gösterilen bir zaman bedeline sahiptir.",
    languageH: "Türkçe dil desteği",
    languageP: "Steam’in resmi sayfası Türkçe arayüz ve altyazı desteğini doğrular, ancak tam Türkçe seslendirme bulunmaz. Yeni Türkçe rehberler yalnızca resmi bilgiler veya çıkış sürümünde doğrulanmış veriler tam bir yanıt sağlayabildiğinde yayımlanacaktır.",
    linksH: "Mevcut rehberler", links: [["Tam İngilizce wiki", "/"], ["Almanca rehber", "/de/"], ["İspanyolca rehber", "/es/"]],
  },
];

const existing = [
  { code: "en", lang: "en", label: "English" },
  { code: "de", lang: "de", label: "Deutsch" },
  { code: "es", lang: "es-ES", label: "Español (España)" },
];
const all = [...existing, ...locales];

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

function alternates() {
  return [...all.map(({ code, lang }) =>
    `<link rel="alternate" hreflang="${lang}" href="${domain}/${code === "en" ? "" : `${code}/`}" />`
  ), `<link rel="alternate" hreflang="x-default" href="${domain}/" />`].join("");
}

function dropdown(current) {
  const links = all.map(({ code, lang, label }) =>
    `<a href="${domain}/${code === "en" ? "" : `${code}/`}" lang="${lang}"${code === current ? ' aria-current="page"' : ""}>${escapeHtml(label)}</a>`
  ).join("");
  const label = all.find((item) => item.code === current)?.label ?? "English";
  return `<!-- LANG-DROPDOWN:START --><details class="language-menu"><summary aria-label="Select language">🌐 ${escapeHtml(label)}</summary><div class="language-options">${links}</div></details><!-- LANG-DROPDOWN:END -->`;
}

function schemaFor(page) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.desc,
    url: `${domain}/${page.code}/`,
    inLanguage: page.lang,
    dateModified: modified,
    isPartOf: { "@type": "WebSite", name: "Blood of Dawnwalker Wiki", url: domain },
  }).replaceAll("<", "\\u003c");
}

function home(page) {
  const related = page.links.map(([label, href]) =>
    `<a href="${domain}${href}"><strong>${escapeHtml(label)}</strong><span>Blood of Dawnwalker</span></a>`
  ).join("");
  return `<!doctype html>
<html lang="${page.lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="google-adsense-account" content="ca-pub-9505220977121599" />
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9505220977121599" crossorigin="anonymous"></script>
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.desc)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${domain}/${page.code}/" />
  ${alternates()}
  <meta property="og:title" content="${escapeHtml(page.title)}" />
  <meta property="og:description" content="${escapeHtml(page.desc)}" />
  <meta property="og:url" content="${domain}/${page.code}/" />
  <meta property="og:locale" content="${page.locale}" />
  <link rel="stylesheet" href="../styles.css" />
  <script type="application/ld+json">${schemaFor(page)}</script>
</head>
<body>
  <header class="site-header">
    <a class="brand" href="./"><span class="brand-mark">BD</span><span><strong>Blood of Dawnwalker</strong><small>${escapeHtml(page.label)}</small></span></a>
    <nav><a href="${domain}/release-guides/">Release</a><a href="${domain}/gameplay-guides/">Gameplay</a><a href="${domain}/faq/">FAQ</a>${dropdown(page.code)}</nav>
  </header>
  <main class="article-main">
    <section class="article-hero"><div><p class="eyebrow">Official-language overview · ${modified}</p><h1>${escapeHtml(page.heading)}</h1><p class="hero-copy">${escapeHtml(page.intro)}</p></div></section>
    <article class="article-content">
      <h2>${escapeHtml(page.releaseH)}</h2><p>${escapeHtml(page.releaseP)}</p>
      <h2>${escapeHtml(page.gameH)}</h2><p>${escapeHtml(page.gameP)}</p>
      <h2>${escapeHtml(page.languageH)}</h2><p>${escapeHtml(page.languageP)}</p>
      <h2>${escapeHtml(page.linksH)}</h2><div class="related-grid">${related}</div>
      <h2>Official sources</h2>
      <ul><li><a href="https://store.steampowered.com/app/3751260/The_Blood_of_Dawnwalker/">Steam language and platform listing</a></li><li><a href="https://en.bandainamcoent.eu/dawnwalker/the-blood-of-dawnwalker">Bandai Namco official game page</a></li></ul>
    </article>
  </main>
</body>
</html>`;
}

async function walk(dir) {
  const output = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) output.push(...await walk(full));
    else output.push(full);
  }
  return output;
}

for (const page of locales) {
  const dir = path.join(root, page.code);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), home(page));
}

for (const file of (await walk(root)).filter((file) => file.endsWith(".html"))) {
  let html = await readFile(file, "utf8");
  const relative = path.relative(root, file).split(path.sep);
  const top = relative.length > 1 ? relative[0] : "en";
  const current = all.some(({ code }) => code === top) ? top : "en";
  if (/<!-- LANG-DROPDOWN:START -->[\s\S]*?<!-- LANG-DROPDOWN:END -->/.test(html)) {
    html = html.replace(/<!-- LANG-DROPDOWN:START -->[\s\S]*?<!-- LANG-DROPDOWN:END -->/g, dropdown(current));
  } else if (/<nav(?:\s[^>]*)?>[\s\S]*?<\/nav>/.test(html)) {
    html = html.replace(/(<nav(?:\s[^>]*)?>[\s\S]*?)(<\/nav>)/, `$1${dropdown(current)}$2`);
  }
  if (["index.html", "de/index.html", "es/index.html"].includes(path.relative(root, file).replaceAll("\\", "/"))) {
    html = html.replace(/(?:<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>\s*)+/g, alternates());
  }
  await writeFile(file, html);
}

const sitemapFiles = [];
for (const page of locales) {
  const filename = `sitemap-${page.code}.xml`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${domain}/${page.code}/</loc><lastmod>${modified}</lastmod></url>\n</urlset>\n`;
  await writeFile(path.join(root, filename), xml);
  sitemapFiles.push(filename);
}

const indexNames = all.map(({ code }) => `sitemap-${code}.xml`);
await writeFile(path.join(root, "sitemap-index.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexNames.map((name) => `  <sitemap><loc>${domain}/${name}</loc><lastmod>${modified}</lastmod></sitemap>`).join("\n")}
</sitemapindex>
`);

const primarySitemaps = await Promise.all(["en", "de", "es"].map((code) => readFile(path.join(root, `sitemap-${code}.xml`), "utf8")));
const primaryUrls = primarySitemaps.flatMap((xml) => [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)].map((match) => match[0]));
const localeUrls = locales.map(({ code }) => `<url><loc>${domain}/${code}/</loc><lastmod>${modified}</lastmod></url>`);
await writeFile(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...primaryUrls, ...localeUrls].join("\n")}
</urlset>
`);

const report = `# Official Language Coverage Report

Date: ${modified}

- Official languages verified on Steam: 15
- Existing site languages: English, German, Spanish (Spain)
- Newly added official-language homepages: ${locales.length}
- Total represented official languages: ${all.length}
- Full-audio languages: English, French, Italian, German, Spanish (Spain), Polish
- Interface/subtitle-only languages: Simplified Chinese, Traditional Chinese, Japanese, Korean, Czech, Hungarian, Portuguese (Brazil), Spanish (Latin America), Turkish
- New pages are localized landing pages, not mass-produced translations of incomplete English routes.
- Every new page has a unique title, description, H1, canonical, WebPage schema, official sources, AdSense configuration and homepage-level hreflang.
- The global navigation language dropdown now exposes all 15 official languages.
`;
await writeFile(path.join(root, "OFFICIAL_LANGUAGE_COVERAGE_REPORT.md"), report);

console.log(`Added ${locales.length} official-language homepages and updated ${indexNames.length} language sitemaps.`);
