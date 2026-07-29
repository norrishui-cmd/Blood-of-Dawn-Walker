const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://bloodofdawnwalker.cc";
const DATE = "2026-07-29";

const sources = {
  xbox: "https://news.xbox.com/en-us/2026/07/07/the-blood-of-dawnwalker-hands-on-preview/",
  ps: "https://blog.playstation.com/2026/07/07/the-blood-of-dawnwalker-unique-time-driven-quest-system-and-player-choice-detailed/",
  gameplay: "https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-gameplay-reveal-recap",
  people: "https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-8-forging-connections",
  roots: "https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-9-coens-roots",
  world: "https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-6-creating-world",
};

const news = [
  ["gameplay-guides","rats-confirmed-blood-source",sources.xbox,
    "Ratten und kleine Säugetiere dienen als Blutquelle","Vampir-Coen kann seinen Blutvorrat mit Ratten und anderen kleinen Säugetieren auffüllen.","Die Vorschau bestätigt damit eine unauffällige Alternative zum Angriff auf Menschen. Sie nennt jedoch keine festen Blutwerte oder Respawn-Regeln.",
    "ネズミや小型哺乳類から血を補給できる","吸血鬼状態のCoenは、ネズミや他の小型哺乳類から血を補給できます。","人間を襲わずに血を確保する低リスクの選択肢が確認されました。ただし回復量や再出現条件は公開されていません。"],
  ["gameplay-guides","feeding-animation-has-no-immunity",sources.xbox,
    "Beim Blutsaugen ist Coen nicht unverwundbar","Während der Bissanimation können Gegner Coen weiter verletzen und sogar töten.","Sicheres Fressen erfordert Abstand, Sichtkontrolle und ein isoliertes Ziel. Die Beobachtung stammt aus der Vorschau und ist keine Zusage unveränderlicher Schadenswerte.",
    "吸血中もCoenは無敵にならない","噛みつきの動作中でも敵の攻撃を受け、倒される可能性があります。","安全に吸血するには対象を孤立させ、周囲の敵と視線を確認する必要があります。製品版のダメージ値まで確定した情報ではありません。"],
  ["gameplay-guides","human-blood-magic-skill-tree",sources.xbox,
    "Menschlicher Coen erhält einen Blutmagie-Fähigkeitsbaum","Anca bringt Coen Blutmagie bei, die Ermittlung, Fortbewegung und direkten Schaden unterstützt.","Der Fähigkeitsbaum erweitert die menschliche Form und ist nicht mit Coens nächtlichen Vampirkräften gleichzusetzen. Einzelne Freischaltkosten bleiben offen.",
    "人間状態のCoenにも血の魔法スキルツリーがある","Ancaから学ぶ血の魔法は、調査、移動、直接攻撃に利用できます。","昼の人間形態を拡張する系統であり、夜の吸血鬼能力とは別です。個々のスキル条件や必要ポイントはまだ未公開です。"],
  ["gameplay-guides","compel-soul-dead-investigation",sources.gameplay,
    "Compel Soul kann Tote nach Geheimnissen befragen","Compel Soul ist ein bestätigter Nichtkampfzauber, mit dem Coen Informationen aus Leichen gewinnen kann.","Die Fähigkeit eröffnet Ermittlungswege, garantiert aber nicht, dass jeder Tote befragt werden kann. Questbedingungen und gültige Ziele müssen im Spiel geprüft werden.",
    "Compel Soulで死者から情報を得られる","Compel Soulは、遺体から秘密や手掛かりを得るための非戦闘魔法です。","すべての遺体が対象になるとは発表されていません。使用可能な人物やクエスト条件は製品版で確認する必要があります。"],
  ["walkthrough-guides","fishing-quest-spends-time",sources.xbox,
    "Der Angelausflug mit Coens Geschwistern kostet Zeit","Die Annahme des Ausflugs und das spätere Auslegen der Leinen verbrauchen Abschnitte des Prolog-Tages.","Die Familienaktivität ist deshalb eine echte Terminentscheidung und kein kostenloses Nebengespräch. Wie viele Einheiten jede spätere Variante kostet, ist nicht vollständig veröffentlicht.",
    "兄弟との釣りは時間を消費する","川へ行く誘いを受け、釣り糸を設置する行動はプロローグの時間を進めます。","家族イベントは無料の会話ではなく、同じ日に行える他の行動と競合します。各分岐の正確な消費量は未公開です。"],
  ["walkthrough-guides","anca-latin-lesson-spends-time",sources.xbox,
    "Ancas Lateinstunde verbraucht Prolog-Zeit","Wer für Ancas optionale Lektion bleibt, setzt einen Teil des begrenzten ersten Tages ein.","Die Szene kann Beziehung und Wissen vertiefen, konkurriert aber mit Familien-, Dorf- und Rebellionsfäden vor der festen Blutmesse.",
    "Ancaのラテン語授業はプロローグ時間を使う","任意のラテン語授業に残ると、限られた初日の時間が進みます。","関係や知識を深める可能性がある一方、固定時刻に始まるBlood Massまでに行える家族、村、反乱関連の行動が減ります。"],
  ["walkthrough-guides","stolen-tapestry-weaver-route",sources.ps,
    "Der gestohlene Wandteppich führt zu einem Weber-Rettungsweg","Die Suche nach einem gestohlenen Vrakhiri-Wandteppich ist eine bestätigte Aktivität, mit der Coen dem Weber helfen kann.","Sie gehört zu mehreren konkurrierenden Aufgaben des ersten Tages. Ein vollständiger Lösungsweg oder garantierte Langzeitfolgen wurden noch nicht veröffentlicht.",
    "盗まれたタペストリーから織工を救うルートに進める","Vrakhiriのタペストリーを探す行動は、織工を助ける初日の選択肢として公式に示されています。","他の行動と時間を取り合うルートです。完全な手順や長期的な結果はまだ公開されていません。"],
  ["walkthrough-guides","midnight-mass-reacts-to-choices",sources.xbox,
    "Die Mitternachtsmesse reagiert auf frühere Entscheidungen","Die Blutmesse findet zu einer festen Zeit statt, kann aber je nach Tagesverlauf in mehreren Varianten ablaufen.","Spieler können Kontext und Reaktionen verändern, nicht jedoch jede zugrunde liegende Katastrophe verhindern. Damit verbindet der Prolog Terminplanung mit erzählerischer Konsequenz.",
    "深夜のBlood Massはそれまでの選択で変化する","Blood Massは固定時刻に始まりますが、初日の過ごし方によって展開や反応が変わります。","状況を変えることはできても、すべての悪い出来事を防げるわけではありません。時間管理と物語結果が結び付く例です。"],
  ["story-guides","marat-rebellion-leader",sources.people,
    "Marat führt den Widerstand gegen die Vrakhiri","Marat ist ein mutiger und charismatischer Anführer, der Coen wegen möglicher Verräter zunächst misstraut.","Vertrauen muss verdient werden; die genauen Questprüfungen und Folgen einer Allianz sind noch nicht veröffentlicht. Die Figur ist kein automatisch verfügbarer Begleiter.",
    "MaratはVrakhiriに抵抗する反乱の指導者","Maratは勇敢で人を引き付けるリーダーですが、裏切りを警戒し、最初からCoenを信用しません。","信頼は行動で得る必要があります。具体的なクエスト条件や同盟後の結果、常時同行するかどうかは未公開です。"],
  ["story-guides","lacra-vengeance-agenda",sources.people,
    "Lacra verfolgt aus Rache eine eigene Agenda","Lacra ist eine geheimnisvolle Figur, deren Vergangenheit und Absichten sich abhängig von Coens Handlungen öffnen können.","Sie ist nicht bloß ein Questmarker: Vertrauen, Einfluss und Entscheidungen bestimmen, welche Informationen zugänglich werden. Eine vollständige Romanzen- oder Endmatrix ist nicht bestätigt.",
    "Lacraは復讐に動かされ独自の目的を持つ","Lacraは謎の多い人物で、Coenの行動によって過去や意図の一部が明かされる可能性があります。","単なる依頼人ではなく、信頼と選択が情報や経路を変えます。恋愛条件やエンディング分岐の一覧は確認されていません。"],
  ["story-guides","yanna-cares-for-siblings",sources.roots,
    "Yanna hält Coens jüngere Geschwister zusammen","Yanna ist das zweitälteste jüngere Geschwister und übernimmt Verantwortung für Mirto und Lunka, wenn Coen und Pieter fehlen.","Ihr Profil erklärt die familiären Einsätze der 30-Tage-Frist. Konkrete Rettungsbedingungen oder mögliche Todesausgänge werden daraus nicht abgeleitet.",
    "Yannaは年下の兄弟を支える世話役","YannaはCoenの下の兄弟では二番目に年長で、CoenとPieterが不在の間にMirtoとLunkaの面倒を見ます。","30日間の目的に家族としての重みを与える人物です。救出条件や死亡分岐まで確定した情報ではありません。"],
  ["story-guides","mirto-family-pressure",sources.roots,
    "Mirto wird durch den Zerfall der Familie unruhig","Der früher ruhige Mirto verändert sich, während Krankheit, Angst und Abwesenheit die Familie belasten.","Yanna versucht sein Verhalten als Phase zu verstehen. Das Profil bestätigt emotionale Ausgangslage, aber keine erfundenen Questbelohnungen oder Enden.",
    "Mirtoは家族の崩壊の中で落ち着きを失う","以前は物静かだったMirtoは、病気や恐怖、家族の不在が重なるにつれて不安定になります。","Yannaは一時的な変化だと考えようとします。人物の初期状況は確認できますが、クエスト報酬や結末は未公開です。"],
  ["technical-guides","combat-not-animation-locked",sources.gameplay,
    "Das Kampfsystem ist nicht animationsgebunden","Angriffe lassen sich schnell neu ausrichten, und Coen kann in raschen Wechseln von Offensive zu Defensive übergehen.","Die Aussage erklärt die grundsätzliche Reaktionsfähigkeit, nicht jedes Abbruchfenster. Eingabepuffer, Waffenunterschiede und Schwierigkeitseinflüsse benötigen Retail-Tests.",
    "戦闘はアニメーション固定ではない","攻撃方向を素早く変え、攻撃から防御へ反応的に移行できる設計です。","基本的な操作思想を示す情報であり、すべてのキャンセル受付を保証するものではありません。入力猶予や武器差は製品版で検証します。"],
  ["technical-guides","map-visible-from-start",sources.gameplay,
    "Die gesamte Weltkarte ist von Anfang an sichtbar","Spieler sehen die Geografie sofort, müssen Aktivitäten und deren Inhalte jedoch weiterhin entdecken.","Eine sichtbare Karte ist daher keine vollständig aufgedeckte Checkliste. Hinweise, Erkundung und das Betreten neuer Gebiete bleiben für die Detailfreigabe wichtig.",
    "世界地図全体は最初から表示される","地形の全体像は開始時から見えますが、活動内容や詳細は探索して発見する必要があります。","地図が見えることと、全マーカーが判明していることは別です。手掛かりや現地探索、新地域への進入が必要です。"],
  ["technical-guides","activity-markers-reveal-without-details",sources.gameplay,
    "Neue Gebiete zeigen Aktivitätsmarker ohne Spoiler","Beim Betreten einer Region erscheinen mögliche Aktivitätsorte, doch ihre genaue Bedeutung bleibt zunächst verborgen.","Das System unterstützt Planung, ohne jede Begegnung vorwegzunehmen. Lokale Hinweise oder direkte Erkundung liefern die fehlenden Informationen.",
    "新地域では内容を伏せた活動マーカーが現れる","地域に入ると活動の候補地点は表示されますが、何が起きる場所かまでは明かされません。","移動計画を助けながら発見を残す仕組みです。住民の情報、手掛かり、現地への移動で詳細を確認します。"],
  ["technical-guides","southern-regions-harder",sources.gameplay,
    "Weiter südlich werden die Regionen allgemein schwieriger","Offizielle Erkundungsinformationen nennen den Süden als grobes Signal für steigende Herausforderung.","Jede Region besitzt dennoch einen eigenen Mindest- und Höchstbereich, der beim ersten Betreten festgelegt wird. Die Himmelsrichtung ersetzt deshalb keine konkrete Vorbereitung.",
    "南へ進むほど地域の難度は概ね上がる","公式の探索説明では、南方ほど危険度が高くなる傾向が示されています。","各地域には固有の最低・最高範囲があり、初回進入時に難度が決まります。方角だけで装備や準備を省けるわけではありません。"],
  ["updates-guides","bulletin-6-world-weather",sources.world,
    "Bulletin 6 bestätigt dynamisches Wetter und eingeschränkte Sicht","Der Weltaufbau-Bericht bestätigt wechselndes Wetter und nennt Nebel als Beispiel für schlechtere Sicht.","Wetter ist damit mehr als Dekoration, doch genaue Häufigkeit, Schadenseffekte oder feste Spawn-Änderungen sind nicht bestätigt.",
    "Bulletin #6で動的天候と霧による視界低下を確認","世界構築の記事は天候が動的に変わり、霧で見通しが悪くなることを明記しています。","天候は景観だけではありませんが、発生頻度、ダメージ、敵出現への固定効果までは発表されていません。"],
  ["updates-guides","bulletin-8-marat-lacra-anca",sources.people,
    "Bulletin 8 erklärt die Beziehungsrollen von Marat, Lacra und Anca","Der Bericht zeigt, wie Vertrauen, Einfluss und Entscheidungen neue Wege oder verborgene Wahrheiten öffnen können.","Die drei Figuren stehen für unterschiedliche Bindungen und Interessen. Das Bulletin liefert jedoch keine vollständige Liste aller Beziehungen oder Romanzen.",
    "Bulletin #8がMarat、Lacra、Ancaの関係性を解説","信頼、影響、選択によって新しい道や隠された真実が開くことを示しています。","三人は異なる利害と結び付きを持ちますが、全人物の関係一覧や恋愛条件を公開した記事ではありません。"],
  ["updates-guides","bulletin-9-family-profiles",sources.roots,
    "Bulletin 9 erweitert die Profile von Coens Familie","Der Familienbericht stellt Pieter, Yanna, Mirto, Lunka sowie den sich verschlechternden Zustand der Eltern genauer vor.","Er erklärt Motivation und Ausgangslage, ohne spätere Questausgänge vorwegzunehmen. Vampirblut als Heilmittel wird ebenfalls eingeordnet.",
    "Bulletin #9がCoenの家族プロフィールを拡充","Pieter、Yanna、Mirto、Lunkaと、悪化していく両親の状態が詳しく紹介されました。","家族を救う動機と初期状況を示す記事で、後のクエスト結果を明かすものではありません。吸血鬼の血による治療も説明されます。"],
  ["updates-guides","july-preview-four-hours",sources.xbox,
    "Xbox Wire veröffentlicht vierstündigen Prolog-Hands-on","Der kontrollierte Termin liefert Beobachtungen zu Zeitkosten, Heilung, Fähigkeiten und reaktiver Erzählung.","Die Vorschau ist eine wertvolle Primärbeobachtung, aber keine öffentliche Demo und kein vollständiger Test der Release-Version. Tuningwerte können sich ändern.",
    "Xbox Wireが約4時間のプロローグ試遊を公開","時間コスト、回復、スキル、選択への物語反応について実際のプレイ情報が追加されました。","価値の高い一次観察ですが、一般公開Demoでも製品版レビューでもありません。数値調整が変わる可能性は残ります。"],
];

const faq = [
  ["gameplay-guides","can-coen-feed-on-rats",sources.xbox,
    "Kann Vampir-Coen Ratten fressen?","Ja. Ratten und andere kleine Säugetiere können seinen Blutvorrat auffüllen.","Sie bieten eine diskretere Blutquelle als Menschen; feste Wiederherstellungswerte sind noch nicht veröffentlicht.",
    "吸血鬼状態のCoenはネズミから吸血できる？","はい。ネズミや他の小型哺乳類から血を補給できます。","人間より目立ちにくい血源ですが、正確な回復量はまだ公開されていません。"],
  ["gameplay-guides","is-coen-invulnerable-while-feeding",sources.xbox,
    "Ist Coen während des Blutsaugens unverwundbar?","Nein. Gegner können ihn während der Bissanimation verletzen oder töten.","Vor dem Fressen sollten Ziel, Sichtlinien und nahe Gegner geprüft werden.",
    "吸血中のCoenは無敵？","いいえ。噛みつきの動作中も敵からダメージを受け、倒される可能性があります。","対象を孤立させ、視線と周囲の敵を確認してから吸血する必要があります。"],
  ["gameplay-guides","does-food-heal-vampire-coen",sources.xbox,
    "Heilt normales Essen Vampir-Coen?","Nein. Nach der Verwandlung heilt die Vampirform mit Blut statt mit gewöhnlicher Nahrung.","Das unterscheidet ihre Ressourcenplanung klar von der menschlichen Form.",
    "普通の食料で吸血鬼状態のCoenを回復できる？","いいえ。変化後の吸血鬼形態は食料ではなく血で回復します。","昼の人間形態とは回復資源の考え方が異なります。"],
  ["gameplay-guides","can-human-coen-learn-blood-magic",sources.xbox,
    "Kann der menschliche Coen Blutmagie lernen?","Ja. Anca bringt ihm Blutmagie mit einem eigenen Fähigkeitsbaum bei.","Die Anwendungen umfassen Ermittlung, Fortbewegung und Kampf, nicht nur direkten Schaden.",
    "人間状態のCoenも血の魔法を学べる？","はい。Ancaから独立したスキルツリーを持つ血の魔法を学びます。","直接攻撃だけでなく、調査や移動にも使えます。"],
  ["gameplay-guides","can-compel-soul-question-the-dead",sources.gameplay,
    "Kann Compel Soul Tote befragen?","Ja. Der Zauber kann Informationen oder Geheimnisse aus Toten gewinnen.","Welche Leichen und Questzustände gültig sind, muss situationsabhängig geprüft werden.",
    "Compel Soulで死者に質問できる？","はい。死者から情報や秘密を引き出す調査魔法です。","対象にできる遺体やクエスト状態は状況ごとに確認が必要です。"],
  ["gameplay-guides","does-feeding-alert-nearby-enemies",sources.xbox,
    "Reagieren nahe Gegner auf Coens Blutsaugen?","Ja, das kann passieren. In der Vorschau griffen Verbündete eines Wachmanns während des Bisses an.","Die Beobachtung zeigt, dass Isolation und Positionierung wichtiger sind als der Beginn der Animation.",
    "近くの敵はCoenの吸血に反応する？","反応する場合があります。試遊では衛兵の仲間が噛みつき中に攻撃しました。","動作を開始しても安全は保証されないため、孤立と位置取りが重要です。"],
  ["gameplay-guides","when-does-region-difficulty-lock",sources.gameplay,
    "Wann wird die Schwierigkeit einer Region festgelegt?","Beim ersten Betreten wird sie innerhalb des zulässigen Bereichs festgesetzt und bleibt danach bestehen.","Bereits besuchte Regionen skalieren dadurch nicht unbegrenzt weiter.",
    "地域の難度はいつ固定される？","初めて入った時点で許容範囲内の難度が決まり、その後は維持されます。","訪問済み地域が永続的に再スケーリングする仕組みではありません。"],
  ["walkthrough-guides","does-accepting-the-fishing-trip-spend-time",sources.xbox,
    "Kostet die Annahme des Angelausflugs Zeit?","Ja. Bereits die Annahme bewegt den Prolog-Zeitplan weiter.","Das spätere Auslegen der Leinen kann einen weiteren Zeitabschnitt verbrauchen.",
    "釣りの誘いを受けるだけで時間を使う？","はい。誘いを受けた時点でプロローグの時間が進みます。","その後に釣り糸を設置すると、さらに時間を消費する場合があります。"],
  ["walkthrough-guides","does-the-latin-lesson-use-time",sources.xbox,
    "Verbraucht Ancas Lateinstunde Zeit?","Ja. Die optionale Lektion beansprucht einen Teil des begrenzten ersten Tages.","Sie konkurriert mit anderen Aktivitäten vor der fest terminierten Blutmesse.",
    "Ancaのラテン語授業は時間を消費する？","はい。任意の授業は限られた初日の時間を使います。","固定時刻のBlood Massまでに行える他の活動と競合します。"],
  ["walkthrough-guides","can-coen-help-find-a-lost-pig",sources.xbox,
    "Kann Coen bei der Suche nach einem verlorenen Schwein helfen?","Ja. Das vermisste Schwein gehört zu den bestätigten Aktivitäten des ersten Tages.","Die anschließende Entscheidung kann spätere Dialogreaktionen verändern.",
    "Coenは迷子の豚探しを手伝える？","はい。初日に選べる公式確認済みの活動です。","その後の判断によって、同日の会話反応が変化する可能性があります。"],
  ["walkthrough-guides","can-coen-save-the-weaver",sources.ps,
    "Kann Coen den Weber im Prolog retten?","Ja. Die Suche nach dem gestohlenen Vrakhiri-Wandteppich eröffnet einen bestätigten Rettungsweg.","Da Zeit begrenzt ist, besitzt diese Hilfe Opportunitätskosten.",
    "Coenはプロローグで織工を救える？","はい。盗まれたVrakhiriのタペストリーを探すことで救出ルートに進めます。","時間が限られているため、他の行動を諦める可能性があります。"],
  ["walkthrough-guides","does-the-midnight-mass-change-with-choices",sources.xbox,
    "Ändert sich die Mitternachtsmesse durch frühere Entscheidungen?","Ja. Sie kann je nach Nutzung des ersten Tages unterschiedlich ablaufen.","Der Termin bleibt fest, aber Kontext und Reaktionen können variieren.",
    "深夜のBlood Massはそれまでの選択で変わる？","はい。初日の過ごし方によって展開が複数に変化します。","開始時刻は固定でも、状況や人物の反応が異なります。"],
  ["story-guides","who-is-marat",sources.people,
    "Wer ist Marat in The Blood of Dawnwalker?","Marat ist der mutige und charismatische Anführer einer Rebellion gegen die Vrakhiri.","Aus Angst vor Verrat verlangt er, dass Coen seinen Wert beweist.",
    "The Blood of DawnwalkerのMaratとは？","Vrakhiriに抵抗する反乱の、勇敢で人を引き付ける指導者です。","裏切りを警戒しており、Coenは価値を証明して信頼を得る必要があります。"],
  ["story-guides","who-is-lacra",sources.people,
    "Wer ist Lacra in The Blood of Dawnwalker?","Lacra ist eine geheimnisvolle, von Rache getriebene Frau mit eigener Agenda.","Coens Handlungen können Teile ihrer Vergangenheit und Absichten zugänglich machen.",
    "The Blood of DawnwalkerのLacraとは？","復讐に動かされ、独自の目的を持つ謎の女性です。","Coenの行動によって、過去や意図の一部が明らかになる可能性があります。"],
  ["story-guides","who-is-pieter",sources.roots,
    "Wer ist Pieter in Coens Familie?","Pieter ist eines von Coens älteren Geschwistern und kann gemeinsam mit Coen außer Haus sein.","Das Familienprofil ordnet ihn über Yanna, Mirto und Lunka ein.",
    "Coenの家族にいるPieterとは？","Coenの兄弟の一人で、Coenと共に家を離れていることがある年長組です。","家族構成ではYanna、Mirto、Lunkaより上に位置します。"],
  ["story-guides","who-is-yanna",sources.roots,
    "Wer ist Yanna in The Blood of Dawnwalker?","Yanna ist Coens zweitältestes jüngeres Geschwister und kümmert sich entschlossen um Mirto und Lunka.","Sie übernimmt Verantwortung, wenn Coen und Pieter abwesend sind.",
    "The Blood of DawnwalkerのYannaとは？","Coenより年下の兄弟では二番目に年長で、MirtoとLunkaを支える世話役です。","CoenとPieterが不在のときに責任を引き受けます。"],
  ["story-guides","who-is-mirto",sources.roots,
    "Wer ist Mirto in Coens Familie?","Mirto ist ein jüngeres Geschwister, das durch den Zerfall des Haushalts zunehmend unruhig wird.","Yanna hofft, dass sein verändertes Verhalten nur eine Phase ist.",
    "Coenの家族にいるMirtoとは？","家族の崩壊が進む中で落ち着きを失っていく、Coenの年下の兄弟です。","Yannaはその変化が一時的なものだと考えようとしています。"],
  ["technical-guides","is-dawnwalker-combat-animation-locked",sources.gameplay,
    "Ist der Kampf in Dawnwalker animationsgebunden?","Nein. Laut offizieller Übersicht ist das System schnell und nicht animationsgebunden.","Angriffe können neu ausgerichtet und Übergänge zwischen Angriff und Verteidigung reaktiv ausgeführt werden.",
    "Dawnwalkerの戦闘はアニメーション固定？","いいえ。公式説明では高速で、アニメーション固定ではない戦闘です。","攻撃方向を変え、攻撃と防御を反応的に切り替えられます。"],
  ["technical-guides","is-the-entire-map-visible-at-the-start",sources.gameplay,
    "Ist die gesamte Weltkarte von Anfang an sichtbar?","Ja. Die Geografie ist sofort sichtbar, Aktivitäten müssen aber weiterhin entdeckt werden.","Kartensichtbarkeit bedeutet nicht, dass alle Inhalte automatisch markiert sind.",
    "世界地図全体は最初から見える？","はい。地形は最初から表示されますが、活動内容は探索で発見する必要があります。","地図が見えることと、全コンテンツが自動表示されることは同じではありません。"],
  ["technical-guides","are-southern-regions-more-difficult",sources.gameplay,
    "Sind südliche Regionen allgemein schwieriger?","Ja. Die Herausforderung steigt laut offizieller Erkundungsbeschreibung tendenziell weiter südlich.","Einzelne Regionen besitzen dennoch eigene Mindest- und Höchstbereiche.",
    "南の地域ほど難しい？","はい。公式の探索説明では、南へ進むほど難度が上がる傾向があります。","ただし各地域には固有の最低・最高難度範囲があります。"],
];

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
function ads() {
  return '<meta name="google-adsense-account" content="ca-pub-9505220977121599" /><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9505220977121599" crossorigin="anonymous"></script>';
}
function write(file, html) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}
function sitemapUrls(file) {
  return [...fs.readFileSync(file, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}
function renderSitemap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(urls)].sort().map((url) => `  <url><loc>${url}</loc><lastmod>${DATE}</lastmod></url>`).join("\n")}\n</urlset>\n`;
}
function localizedMenu(locale, type, slug) {
  const isDe = locale === "de";
  const base = "../../../";
  const English = type === "news" ? `${SITE}/news/${slug}/` : `${SITE}/faq/${slug}/`;
  return `<header class="site-header"><a class="brand" href="../../"><span class="brand-mark">BD</span><span><strong>The Blood of Dawnwalker</strong><small>${isDe ? "Deutsch" : "日本語"}</small></span></a><nav aria-label="Main navigation"><a href="../../release-guides/">${isDe ? "Release" : "発売"}</a><a href="../../gameplay-guides/">${isDe ? "Gameplay" : "システム"}</a><a href="../../walkthrough-guides/">${isDe ? "Walkthrough" : "進行"}</a><a href="../../story-guides/">${isDe ? "Story" : "人物"}</a><a href="../../technical-guides/">${isDe ? "Technik" : "技術"}</a><a href="../../faq/">${isDe ? "FAQ" : "FAQ"}</a><!-- LANG-DROPDOWN:START --><details class="language-menu"><summary aria-label="Select language">🌐 ${isDe ? "Deutsch" : "日本語"}</summary><div class="language-options"><a href="${English}" lang="en">English</a><a href="${SITE}/de/${type}/${slug}/" lang="de"${isDe ? ' aria-current="page"' : ""}>Deutsch</a><a href="${SITE}/es/" lang="es-ES">Español (España)</a><a href="${SITE}/fr/" lang="fr">Français</a><a href="${SITE}/it/" lang="it">Italiano</a><a href="${SITE}/pl/" lang="pl">Polski</a><a href="${SITE}/zh-hans/" lang="zh-Hans">简体中文</a><a href="${SITE}/zh-hant/" lang="zh-Hant">繁體中文</a><a href="${SITE}/ja/${type}/${slug}/" lang="ja"${!isDe ? ' aria-current="page"' : ""}>日本語</a><a href="${SITE}/ko/" lang="ko">한국어</a><a href="${SITE}/cs/" lang="cs">Čeština</a><a href="${SITE}/hu/" lang="hu">Magyar</a><a href="${SITE}/pt-br/" lang="pt-BR">Português (Brasil)</a><a href="${SITE}/es-419/" lang="es-419">Español (Latinoamérica)</a><a href="${SITE}/tr/" lang="tr">Türkçe</a></div></details><!-- LANG-DROPDOWN:END --></nav></header>`;
}
function alternates(type, slug) {
  const en = `${SITE}/${type}/${slug}/`;
  return `<link rel="alternate" hreflang="en" href="${en}" /><link rel="alternate" hreflang="de" href="${SITE}/de/${type}/${slug}/" /><link rel="alternate" hreflang="ja" href="${SITE}/ja/${type}/${slug}/" /><link rel="alternate" hreflang="x-default" href="${en}" />`;
}
function localeLabels(locale) {
  if (locale === "de") return {
    locale: "de_DE", checked: "Quellengeprüft · 29. Juli 2026", direct: "Direkte Antwort",
    facts: "Was die Quelle bestätigt", meaning: "Bedeutung für Spieler",
    boundary: "Bestätigt und noch offen", source: "Primärquelle und Einordnung",
    related: "Verwandte deutsche Inhalte", faq: "Häufige Fragen",
    home: "Deutsche Startseite", hub: "Themenübersicht", news: "Deutsche News",
    footer: "Unabhängiger, inoffizieller Guide. Bestätigte Fakten sind belegt; offene Details klar markiert.",
  };
  return {
    locale: "ja_JP", checked: "出典確認済み · 2026年7月29日", direct: "要点",
    facts: "一次情報で確認できること", meaning: "プレイヤーへの意味",
    boundary: "確認済み情報と未公開範囲", source: "一次情報と位置付け",
    related: "関連する日本語コンテンツ", faq: "よくある質問",
    home: "日本語トップ", hub: "テーマ一覧", news: "日本語ニュース",
    footer: "独立・非公式攻略サイト。確認済み情報には出典を付け、未確定事項を明確に区別します。",
  };
}
function newsHtml(locale, item) {
  const [hub, slug, source, deTitle, deAnswer, deDetail, jaTitle, jaAnswer, jaDetail] = item;
  const isDe = locale === "de";
  const title = isDe ? deTitle : jaTitle, answer = isDe ? deAnswer : jaAnswer, detail = isDe ? deDetail : jaDetail;
  const labels = localeLabels(locale);
  const url = `${SITE}/${locale}/news/${slug}/`;
  const description = `${answer} ${detail}`;
  const schema = {"@context":"https://schema.org","@graph":[
    {"@type":"NewsArticle",headline:title,description,datePublished:DATE,dateModified:DATE,mainEntityOfPage:url,inLanguage:locale,author:{"@type":"Organization",name:"The Blood of Dawnwalker Wiki"},publisher:{"@type":"Organization",name:"The Blood of Dawnwalker Wiki"},about:{"@type":"VideoGame",name:"The Blood of Dawnwalker"}},
    {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem",position:1,name:labels.home,item:`${SITE}/${locale}/`},{"@type":"ListItem",position:2,name:labels.news,item:`${SITE}/${locale}/news/`},{"@type":"ListItem",position:3,name:title,item:url}]}
  ]};
  const body = isDe
    ? `<section><h2>${labels.facts}</h2><p>${esc(answer)} ${esc(detail)}</p><p>Diese Meldung isoliert einen klar belegten Punkt aus dem offiziellen Material. Sie trennt die veröffentlichte Aussage von Schlussfolgerungen, die erst mit der Verkaufsversion reproduzierbar geprüft werden können. Dadurch beantwortet die Seite eine konkrete Suchfrage, ohne aus einer Vorschau einen vollständigen Lösungsweg zu konstruieren.</p></section><section><h2>${labels.meaning}</h2><p>Für die Planung bedeutet das: Spieler sollten diesen bestätigten Punkt in ihre Entscheidung einbeziehen, gleichzeitig aber Tagesform, aktuellen Weltzustand, betroffene Figuren und sichtbare Zeitkosten prüfen. Die Information hilft bei einer konkreten Route, Ressource oder Gesprächsentscheidung; sie ersetzt keine Prüfung der jeweiligen Questlage.</p><p>Wer mehrere Wege vergleicht, sollte außerdem berücksichtigen, ob die Handlung dauerhaft Inhalte entfernt, eine Beziehung verändert oder lediglich einen späteren Besuch verschiebt. Genau diese Trennung macht die Meldung langfristig nützlich.</p></section><section><h2>${labels.boundary}</h2><p>${esc(detail)} Nicht veröffentlicht sind darüber hinaus vollständige Zahlen, alle Ausnahmen, spätere Patch-Änderungen und jede mögliche Konsequenzkette. Diese Seite ergänzt solche Details erst, wenn sie in der Release-Version reproduzierbar oder in offiziellen Patch Notes dokumentiert sind.</p></section>`
    : `<section><h2>${labels.facts}</h2><p>${esc(answer)} ${esc(detail)}</p><p>このニュースは、公式資料の中から一つの明確な事実を切り出して整理しています。公開情報と、製品版で再現確認が必要な推測を分けることで、検索された疑問に直接答えつつ、試遊情報を完成済みウォークスルーとして扱わない構成です。</p></section><section><h2>${labels.meaning}</h2><p>攻略計画では、この確認済み情報だけで結論を出さず、Coenの昼夜形態、現在の世界状態、関係する人物、画面に表示される時間コストも同時に確認します。ルート、資源、会話の判断には役立ちますが、個別クエストの進行条件を自動的に保証する情報ではありません。</p><p>複数の選択肢を比べる場合は、行動が恒久的にコンテンツを失わせるのか、関係を変えるのか、後回しにするだけなのかも区別します。この観点を加えることで、発売後も更新可能な実用ページになります。</p></section><section><h2>${labels.boundary}</h2><p>${esc(detail)} さらに、完全な数値、すべての例外、将来のパッチ変更、全分岐の結果は公開されていません。製品版で同条件を再現できる情報、または公式パッチノートに記載された変更だけを後から追加します。</p></section>`;
  return `<!doctype html><html lang="${locale}"><head>${ads()}<meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>${esc(title)} | The Blood of Dawnwalker Wiki</title><meta name="description" content="${esc(description)}" /><meta name="robots" content="index, follow, max-image-preview:large" /><link rel="canonical" href="${url}" />${alternates("news", slug)}<meta property="og:type" content="article" /><meta property="og:title" content="${esc(title)}" /><meta property="og:description" content="${esc(description)}" /><meta property="og:url" content="${url}" /><meta property="og:locale" content="${labels.locale}" /><script type="application/ld+json">${JSON.stringify(schema)}</script><link rel="stylesheet" href="../../../styles.css" /></head><body>${localizedMenu(locale, "news", slug)}<main class="article-main"><section class="article-hero"><div><p class="eyebrow">${labels.checked}</p><h1>${esc(title)}</h1><p class="hero-copy">${esc(answer)}</p><div class="article-meta"><span class="tag confirmed">${labels.direct}</span><span class="tag">NewsArticle</span></div></div></section><div class="article-body"><article class="article-content"><section class="verification-box"><h2>${labels.direct}</h2><p><strong>${esc(answer)}</strong> ${esc(detail)}</p></section>${body}<section><h2>${labels.source}</h2><p><a href="${source}" target="_blank" rel="noreferrer">${isDe ? "Offizielle Primärquelle öffnen" : "公式一次情報を開く"}</a></p></section><section id="page-faq"><h2>${labels.faq}</h2><dl class="faq-list"><div><dt>${esc(title)}</dt><dd>${esc(answer)} ${esc(detail)}</dd></div><div><dt>${isDe ? "Sind alle Detailwerte bestätigt?" : "すべての詳細数値は確定済み？"}</dt><dd>${isDe ? "Nein. Nur die ausdrücklich genannte Kernaussage ist bestätigt; offene Zahlen und Ausnahmen werden erst nach reproduzierbarer Prüfung ergänzt." : "いいえ。公式に明記された要点だけが確認済みで、数値や例外は再現検証後に追加します。"}</dd></div></dl></section><section><h2>${labels.related}</h2><div class="related-grid"><a href="../../${hub}/"><strong>${labels.hub}</strong><span>${isDe ? "Alle geprüften Seiten dieses Themenbereichs." : "同じテーマの確認済みページ一覧。"}</span></a><a href="../"><strong>${labels.news}</strong><span>${isDe ? "Alle lokalisierten Meldungen." : "日本語化されたニュース一覧。"}</span></a><a href="../../faq/"><strong>FAQ</strong><span>${isDe ? "Direkte Antworten nach Themen." : "テーマ別の直接回答。"}</span></a></div></section></article><aside class="article-aside"><h2>${labels.direct}</h2><p>${esc(answer)}</p><a href="../../">${labels.home}</a><a href="../../${hub}/">${labels.hub}</a><a href="../">${labels.news}</a></aside></div></main><footer class="site-footer"><p>${labels.footer}</p></footer></body></html>`;
}
function faqHtml(locale, item) {
  const [hub, slug, source, deQ, deA, deDetail, jaQ, jaA, jaDetail] = item;
  const isDe = locale === "de";
  const q = isDe ? deQ : jaQ, answer = isDe ? deA : jaA, detail = isDe ? deDetail : jaDetail;
  const labels = localeLabels(locale);
  const url = `${SITE}/${locale}/faq/${slug}/`;
  const description = `${answer} ${detail}`;
  const schema = {"@context":"https://schema.org","@graph":[
    {"@type":"FAQPage",url,inLanguage:locale,mainEntity:[{"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:description}}]},
    {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem",position:1,name:labels.home,item:`${SITE}/${locale}/`},{"@type":"ListItem",position:2,name:"FAQ",item:`${SITE}/${locale}/faq/`},{"@type":"ListItem",position:3,name:q,item:url}]}
  ]};
  const body = isDe
    ? `<section><h2>Beleg und Kontext</h2><p>${esc(answer)} ${esc(detail)}</p><p>Die Antwort beruht auf dem verlinkten offiziellen Publisher-, Plattform- oder Vorschau-Material. Sie hält fest, was die Quelle direkt zeigt oder beschreibt, und verwandelt eine einzelne Beobachtung nicht in eine allgemeingültige Release-Regel. Damit bleibt die Seite für genau diese Frage zuständig und überschneidet sich nicht unnötig mit dem breiteren Themen-Hub.</p></section><section><h2>Praktische Konsequenz</h2><p>Spieler können den bestätigten Punkt für ihre Planung nutzen, sollten jedoch zusätzlich Coens Tagesform, den aktuellen Questzustand, betroffene Figuren und sichtbare Zeitkosten kontrollieren. Besonders bei unwiderruflichen Entscheidungen ist ein separater Spielstand sinnvoll, bis alle Bedingungen der Verkaufsversion reproduzierbar geprüft wurden.</p><p>${esc(detail)} Diese Einordnung verhindert, dass eine nützliche Direktantwort mit erfundenen Zahlen, Fundorten oder vollständigen Ergebnislisten aufgebläht wird.</p></section><section><h2>Grenze der Antwort</h2><p>Die Quelle bestätigt die Kernaussage, nicht automatisch jede Ausnahme, jeden Schwierigkeitswert oder jede spätere Patch-Änderung. Weiterführende Details werden erst ergänzt, wenn sie in der Release-Version reproduzierbar oder in offiziellen Patch Notes dokumentiert sind.</p></section>`
    : `<section><h2>根拠と文脈</h2><p>${esc(answer)} ${esc(detail)}</p><p>回答は、リンク先の公式パブリッシャー、プラットフォーム、または試遊資料に基づきます。資料が直接示した内容と、製品版で確認が必要な推測を区別し、一つの観察を全場面に共通する発売版ルールとして扱いません。このページは一つの検索意図に集中し、より広い説明はテーマHubに分けています。</p></section><section><h2>攻略上の使い方</h2><p>確認済みの要点は計画に利用できますが、Coenの昼夜形態、現在のクエスト状態、関係する人物、表示される時間コストも同時に確認します。取り消せない可能性がある判断では、製品版の条件が再現確認されるまで別セーブを残すのが安全です。</p><p>${esc(detail)} この区別により、直接回答を保ちながら、未確認の数値、場所、完全な結果一覧を作りません。</p></section><section><h2>回答の範囲</h2><p>一次情報が確認するのは中心となる答えです。すべての例外、難度別の値、将来のパッチ変更まで確定したわけではありません。製品版で再現できる情報、または公式パッチノートに明記された変更だけを追加します。</p></section>`;
  return `<!doctype html><html lang="${locale}"><head>${ads()}<meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>${esc(q)} | The Blood of Dawnwalker FAQ</title><meta name="description" content="${esc(description)}" /><meta name="robots" content="index, follow, max-image-preview:large" /><link rel="canonical" href="${url}" />${alternates("faq", slug)}<meta property="og:type" content="article" /><meta property="og:title" content="${esc(q)}" /><meta property="og:description" content="${esc(description)}" /><meta property="og:url" content="${url}" /><meta property="og:locale" content="${labels.locale}" /><script type="application/ld+json">${JSON.stringify(schema)}</script><link rel="stylesheet" href="../../../styles.css" /></head><body>${localizedMenu(locale, "faq", slug)}<main class="article-main"><section class="article-hero"><div><p class="eyebrow">${labels.checked}</p><h1>${esc(q)}</h1><p class="hero-copy">${esc(answer)}</p><div class="article-meta"><span class="tag confirmed">${labels.direct}</span><span class="tag">FAQPage</span></div></div></section><div class="article-body"><article class="article-content"><section class="verification-box"><h2>${labels.direct}</h2><p><strong>${esc(answer)}</strong> ${esc(detail)}</p></section>${body}<section><h2>${labels.source}</h2><p><a href="${source}" target="_blank" rel="noreferrer">${isDe ? "Offizielle Primärquelle öffnen" : "公式一次情報を開く"}</a></p></section><section id="page-faq"><h2>${labels.faq}</h2><dl class="faq-list"><div><dt>${esc(q)}</dt><dd>${esc(answer)} ${esc(detail)}</dd></div></dl></section><section><h2>${labels.related}</h2><div class="related-grid"><a href="../../${hub}/"><strong>${labels.hub}</strong><span>${isDe ? "Alle geprüften Seiten dieses Themenbereichs." : "同じテーマの確認済みページ一覧。"}</span></a><a href="../"><strong>FAQ</strong><span>${isDe ? "Alle lokalisierten Direktantworten." : "日本語の直接回答一覧。"}</span></a><a href="../../news/"><strong>${labels.news}</strong><span>${isDe ? "Quellengeprüfte neue Meldungen." : "出典確認済みの最新情報。"}</span></a></div></section></article><aside class="article-aside"><h2>${labels.direct}</h2><p>${esc(answer)}</p><a href="../../">${labels.home}</a><a href="../../${hub}/">${labels.hub}</a><a href="../">FAQ</a></aside></div></main><footer class="site-footer"><p>${labels.footer}</p></footer></body></html>`;
}
function addOrReplaceSection(file, marker, section) {
  let html = fs.readFileSync(file, "utf8");
  const regex = new RegExp(`<!-- ${marker}:START -->[\\s\\S]*?<!-- ${marker}:END -->`, "g");
  const wrapped = `<!-- ${marker}:START -->${section}<!-- ${marker}:END -->`;
  html = regex.test(html) ? html.replace(regex, wrapped) : html.replace("</main>", `${wrapped}</main>`);
  fs.writeFileSync(file, html);
}
function reciprocalEnglish(type, slug) {
  const file = path.join(ROOT, type, slug, "index.html");
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/<link rel="alternate" hreflang="(?:de|ja|x-default)"[^>]*\/>/g, "");
  const marker = `<link rel="canonical" href="${SITE}/${type}/${slug}/" />`;
  const additions = `${marker}<link rel="alternate" hreflang="en" href="${SITE}/${type}/${slug}/" /><link rel="alternate" hreflang="de" href="${SITE}/de/${type}/${slug}/" /><link rel="alternate" hreflang="ja" href="${SITE}/ja/${type}/${slug}/" /><link rel="alternate" hreflang="x-default" href="${SITE}/${type}/${slug}/" />`;
  html = html.replace(marker, additions);
  fs.writeFileSync(file, html);
}
function indexPage(locale, type, items) {
  const isDe = locale === "de";
  const title = type === "news" ? (isDe ? "The Blood of Dawnwalker News auf Deutsch" : "The Blood of Dawnwalker 日本語ニュース") : (isDe ? "The Blood of Dawnwalker FAQ auf Deutsch" : "The Blood of Dawnwalker 日本語FAQ");
  const intro = type === "news"
    ? (isDe ? "Zwanzig quellengeprüfte Meldungen zu Spielsystemen, Prolog-Entscheidungen, Figuren, Technik und offiziellen Entwickler-Updates." : "ゲームシステム、プロローグの選択、人物、技術、公式更新を扱う出典確認済みニュース20件。")
    : (isDe ? "Direkte, quellengeprüfte Antworten zu Spielsystemen, Entscheidungen, Figuren und Technik." : "ゲームシステム、選択、人物、技術に関する出典確認済みの直接回答。");
  const cards = items.map((item) => {
    const slug = item[1];
    const label = isDe ? item[3] : item[6];
    const summary = isDe ? item[4] : item[7];
    return `<a class="guide-card" href="./${slug}/"><span class="tag confirmed">${isDe ? "Quellengeprüft" : "出典確認済み"}</span><h3>${esc(label)}</h3><p>${esc(summary)}</p><span class="card-link">${isDe ? "Öffnen →" : "詳しく見る →"}</span></a>`;
  }).join("");
  const url = `${SITE}/${locale}/${type}/`;
  return `<!doctype html><html lang="${locale}"><head>${ads()}<meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>${esc(title)}</title><meta name="description" content="${esc(intro)}" /><meta name="robots" content="index, follow, max-image-preview:large" /><link rel="canonical" href="${url}" /><link rel="stylesheet" href="../../styles.css" /></head><body><header class="site-header"><a class="brand" href="../"><span class="brand-mark">BD</span><span><strong>The Blood of Dawnwalker</strong><small>${isDe ? "Deutsch" : "日本語"}</small></span></a><nav><a href="../release-guides/">${isDe ? "Release" : "発売"}</a><a href="../gameplay-guides/">${isDe ? "Gameplay" : "システム"}</a><a href="../walkthrough-guides/">${isDe ? "Walkthrough" : "進行"}</a><a href="../story-guides/">${isDe ? "Story" : "人物"}</a><a href="../technical-guides/">${isDe ? "Technik" : "技術"}</a><a href="../faq/">FAQ</a><!-- LANG-DROPDOWN:START --><details class="language-menu"><summary aria-label="Select language">🌐 ${isDe ? "Deutsch" : "日本語"}</summary><div class="language-options"><a href="${SITE}/${type}/" lang="en">English</a><a href="${SITE}/de/${type}/" lang="de"${isDe ? ' aria-current="page"' : ""}>Deutsch</a><a href="${SITE}/ja/${type}/" lang="ja"${!isDe ? ' aria-current="page"' : ""}>日本語</a></div></details><!-- LANG-DROPDOWN:END --></nav></header><main class="article-main"><section class="article-hero"><div><p class="eyebrow">${isDe ? "Deutsch · Quellengeprüft" : "日本語 · 出典確認済み"}</p><h1>${esc(title)}</h1><p class="hero-copy">${esc(intro)}</p></div></section><section class="article-content"><div class="guide-grid">${cards}</div></section></main><footer class="site-footer"><p>${localeLabels(locale).footer}</p></footer></body></html>`;
}

for (const locale of ["de", "ja"]) {
  for (const item of news) {
    write(path.join(ROOT, locale, "news", item[1], "index.html"), newsHtml(locale, item));
    reciprocalEnglish("news", item[1]);
  }
  for (const item of faq) {
    write(path.join(ROOT, locale, "faq", item[1], "index.html"), faqHtml(locale, item));
    reciprocalEnglish("faq", item[1]);
  }
  write(path.join(ROOT, locale, "news", "index.html"), indexPage(locale, "news", news));
  if (locale === "ja") write(path.join(ROOT, locale, "faq", "index.html"), indexPage(locale, "faq", faq));

  const newsCards = news.map((item) => `<a class="guide-card" href="./news/${item[1]}/"><span class="tag confirmed">${locale === "de" ? "Neue deutsche Meldung" : "日本語ニュース"}</span><h3>${esc(locale === "de" ? item[3] : item[6])}</h3><p>${esc(locale === "de" ? item[4] : item[7])}</p></a>`).join("");
  const faqCards = faq.map((item) => `<a class="guide-card" href="./faq/${item[1]}/"><span class="tag confirmed">FAQ</span><h3>${esc(locale === "de" ? item[3] : item[6])}</h3><p>${esc(locale === "de" ? item[4] : item[7])}</p></a>`).join("");
  addOrReplaceSection(path.join(ROOT, locale, "index.html"), `ROUND22-${locale.toUpperCase()}-NEWS-FAQ`,
    `<section><div class="section-heading"><p class="eyebrow">${locale === "de" ? "Lokalisierung Runde 22" : "日本語拡張 第22弾"}</p><h2>${locale === "de" ? "Neue News und direkte FAQ-Antworten" : "新しいニュースとFAQ直接回答"}</h2><p>${locale === "de" ? "Englische Primärquellen, vollständig lokalisierte Antworten und dieselben responsiven Komponenten wie die englische Fassung." : "英語の一次情報を基に、本文、回答、出典、関連導線まで日本語化し、英語版と同じレスポンシブ構成を使用します。"}</p></div><div class="guide-grid">${newsCards}${faqCards}</div></section>`);

  const newsUrls = news.map((item) => `${SITE}/${locale}/news/${item[1]}/`);
  const faqUrls = faq.map((item) => `${SITE}/${locale}/faq/${item[1]}/`);
  const hubUrls = locale === "ja" ? [`${SITE}/ja/news/`, `${SITE}/ja/faq/`] : [`${SITE}/de/news/`];
  fs.writeFileSync(path.join(ROOT, `sitemap-${locale}.xml`), renderSitemap([...sitemapUrls(path.join(ROOT, `sitemap-${locale}.xml`)), ...hubUrls, ...newsUrls, ...faqUrls]));
}

const allUrls = [];
for (const file of fs.readdirSync(ROOT).filter((name) => /^sitemap-(en|de|es|fr|it|pl|zh-hans|zh-hant|ja|ko|cs|hu|pt-br|es-419|tr)\.xml$/.test(name))) {
  allUrls.push(...sitemapUrls(path.join(ROOT, file)));
}
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), renderSitemap(allUrls));

const report = `# Round 22 German and Japanese News/FAQ Expansion

- Date: ${DATE}
- German: 20 localized NewsArticle pages, 20 localized FAQ pages, 1 localized News hub.
- Japanese: 20 localized NewsArticle pages, 20 localized FAQ pages, 1 localized News hub and 1 new FAQ hub.
- Net new indexable URLs: 83.
- All localized leaves reuse the English article hero, verification box, two-column body, sidebar, FAQ, related-card and responsive CSS contract.
- English, German and Japanese equivalents use reciprocal hreflang.
- Primary evidence: Bandai Namco, PlayStation Blog and Xbox Wire.
`;
fs.writeFileSync(path.join(ROOT, "ROUND_22_DE_JA_EXPANSION_REPORT.md"), report);
console.log(JSON.stringify({newsPerLocale: news.length, faqPerLocale: faq.length, hubUrls: 3, netNewUrls: news.length * 2 + faq.length * 2 + 3}, null, 2));
