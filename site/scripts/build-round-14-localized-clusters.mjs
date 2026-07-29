import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = "https://bloodofdawnwalker.cc";
const date = "2026-07-25";

const languages = {
  fr: {
    name: "Français", lang: "fr", locale: "fr_FR",
    ui: {
      verified: "Vérifié le 25 juillet 2026", source: "Réponse vérifiée",
      facts: "Faits confirmés", use: "Ce que cela change pour le joueur",
      boundary: "Limites de vérification", related: "Guides associés",
      sources: "Sources officielles", faq: "Question fréquente",
      home: "Accueil français", guide: "Guide & Wiki",
      answer: "Réponse rapide",
      scopeNote: "Les faits publiés sont séparés des détails qui nécessitent encore la version finale.",
      homeEyebrow: "Sortie le 3 septembre 2026 · Version gold confirmée",
      homeHero: "Réponses vérifiées sur la sortie, le système des 30 jours, les formes humaine et vampirique, le combat, les personnages, le monde et la configuration PC.",
      knowledgeTitle: "Guides français disponibles", knowledgeIntro: "Huit guides complets reprennent la structure visuelle du site anglais et distinguent les faits officiels des détails à tester après la sortie.",
      navRelease: "Sortie", navTime: "30 jours", navCombat: "Combat", navCharacters: "Personnages",
      genre: "Genre", platforms: "Plateformes", developer: "Développeur", release: "Sortie"
    }
  },
  it: {
    name: "Italiano", lang: "it", locale: "it_IT",
    ui: {
      verified: "Verificato il 25 luglio 2026", source: "Risposta verificata",
      facts: "Fatti confermati", use: "Cosa cambia per il giocatore",
      boundary: "Limiti della verifica", related: "Guide correlate",
      sources: "Fonti ufficiali", faq: "Domanda frequente",
      home: "Home italiana", guide: "Guida & Wiki",
      answer: "Risposta rapida",
      scopeNote: "I fatti pubblicati sono separati dai dettagli che richiedono ancora la versione finale.",
      homeEyebrow: "Uscita 3 settembre 2026 · Stato gold confermato",
      homeHero: "Risposte verificate su lancio, sistema dei 30 giorni, forme umana e vampirica, combattimento, personaggi, mondo e requisiti PC.",
      knowledgeTitle: "Guide italiane disponibili", knowledgeIntro: "Otto guide complete usano la stessa struttura visiva del sito inglese e separano i fatti ufficiali dai dettagli da testare dopo il lancio.",
      navRelease: "Uscita", navTime: "30 giorni", navCombat: "Combattimento", navCharacters: "Personaggi",
      genre: "Genere", platforms: "Piattaforme", developer: "Sviluppatore", release: "Uscita"
    }
  },
  pl: {
    name: "Polski", lang: "pl", locale: "pl_PL",
    ui: {
      verified: "Zweryfikowano 25 lipca 2026", source: "Zweryfikowana odpowiedź",
      facts: "Potwierdzone informacje", use: "Znaczenie dla gracza",
      boundary: "Granice weryfikacji", related: "Powiązane poradniki",
      sources: "Oficjalne źródła", faq: "Częste pytanie",
      home: "Polska strona główna", guide: "Poradnik & Wiki",
      answer: "Krótka odpowiedź",
      scopeNote: "Opublikowane fakty są oddzielone od szczegółów wymagających weryfikacji w wersji finalnej.",
      homeEyebrow: "Premiera 3 września 2026 · Potwierdzony status gold",
      homeHero: "Zweryfikowane odpowiedzi o premierze, systemie 30 dni, ludzkiej i wampirzej formie, walce, postaciach, świecie oraz wymaganiach PC.",
      knowledgeTitle: "Dostępne polskie poradniki", knowledgeIntro: "Osiem pełnych poradników wykorzystuje układ angielskiej strony i oddziela oficjalne fakty od elementów wymagających testów po premierze.",
      navRelease: "Premiera", navTime: "30 dni", navCombat: "Walka", navCharacters: "Postacie",
      genre: "Gatunek", platforms: "Platformy", developer: "Producent", release: "Premiera"
    }
  },
  ja: {
    name: "日本語", lang: "ja", locale: "ja_JP",
    ui: {
      verified: "2026年7月25日確認", source: "検証済みの回答",
      facts: "公式に確認された情報", use: "プレイヤーへの影響",
      boundary: "検証範囲", related: "関連ガイド",
      sources: "公式情報源", faq: "よくある質問",
      home: "日本語トップ", guide: "攻略 Wiki",
      answer: "要点",
      scopeNote: "公開済みの事実と、製品版で確認が必要な詳細を明確に分けています。",
      homeEyebrow: "2026年9月3日発売 · ゴールド到達済み",
      homeHero: "発売情報、30日制、昼夜の形態、戦闘、人物、世界、PC要件を、公式情報と未検証部分に分けて解説します。",
      knowledgeTitle: "日本語ガイド", knowledgeIntro: "8本の詳細ガイドは英語版と同じビジュアル構造を使用し、公式事実と発売後に確認すべき内容を区別しています。",
      navRelease: "発売", navTime: "30日制", navCombat: "戦闘", navCharacters: "人物",
      genre: "ジャンル", platforms: "対応機種", developer: "開発", release: "発売日"
    }
  }
};

const topics = {
  "release-date": {
    source: "https://en.bandainamcoent.eu/dawnwalker/the-blood-of-dawnwalker",
    sourceLabel: "Bandai Namco — official game page",
    fr: {
      title: "Date de sortie de The Blood of Dawnwalker",
      hero: "Date, plateformes et état de production confirmés, sans confondre le jour de sortie avec une heure de déblocage encore non publiée.",
      direct: "The Blood of Dawnwalker sort le 3 septembre 2026 sur PC, PlayStation 5 et Xbox Series X|S. Rebel Wolves a annoncé que le jeu était passé gold : la version destinée à la fabrication est terminée, même si un patch de lancement reste possible.",
      facts: "Bandai Namco présente le jeu comme un action-RPG solo en monde ouvert. Les versions PS4, Xbox One et Nintendo Switch ne sont pas annoncées. La date est commune aux trois plateformes confirmées ; la fiche Xbox ajoute Xbox Play Anywhere et le cloud.",
      use: "Pour préparer l’achat, vérifiez d’abord la plateforme et l’édition, puis les exigences PC si nécessaire. Une date de sortie ne garantit ni préchargement ni accès anticipé. Ces informations doivent venir de la boutique utilisée par le joueur.",
      boundary: "L’heure mondiale de déblocage, les éventuelles différences régionales et la taille finale du patch du premier jour ne sont pas encore confirmées. Cette page ne transforme pas une estimation de boutique en annonce officielle.",
      faqQ: "Quand sort The Blood of Dawnwalker ?", faqA: "Le jeu sort le 3 septembre 2026 sur PC, PS5 et Xbox Series X|S."
    },
    it: {
      title: "Data di uscita di The Blood of Dawnwalker",
      hero: "Data, piattaforme e stato della produzione confermati, distinguendo il giorno di lancio dall’orario di sblocco non ancora pubblicato.",
      direct: "The Blood of Dawnwalker uscirà il 3 settembre 2026 su PC, PlayStation 5 e Xbox Series X|S. Rebel Wolves ha comunicato che il gioco è entrato in fase gold: la build destinata alla produzione è completa, anche se resta possibile una patch del day one.",
      facts: "Bandai Namco descrive il titolo come action RPG open world per giocatore singolo. Non sono annunciate versioni PS4, Xbox One o Nintendo Switch. La pagina Xbox conferma inoltre Xbox Play Anywhere e la disponibilità tramite cloud.",
      use: "Prima dell’acquisto conviene controllare piattaforma, edizione e requisiti PC. La sola data non conferma pre-caricamento o accesso anticipato: questi dettagli devono comparire sul negozio ufficiale scelto dal giocatore.",
      boundary: "L’orario globale di sblocco, eventuali differenze regionali e le dimensioni finali della patch di lancio non sono ancora confermati. Una stima automatica dello store non viene trattata come annuncio ufficiale.",
      faqQ: "Quando esce The Blood of Dawnwalker?", faqA: "Il lancio è fissato al 3 settembre 2026 su PC, PS5 e Xbox Series X|S."
    },
    pl: {
      title: "Data premiery The Blood of Dawnwalker",
      hero: "Potwierdzona data, platformy i stan produkcji, bez mylenia dnia premiery z nieogłoszoną godziną odblokowania.",
      direct: "The Blood of Dawnwalker zadebiutuje 3 września 2026 roku na PC, PlayStation 5 oraz Xbox Series X|S. Rebel Wolves ogłosiło uzyskanie statusu gold, czyli ukończenie wersji produkcyjnej; nadal możliwa jest aktualizacja pierwszego dnia.",
      facts: "Bandai Namco określa grę jako jednoosobowe RPG akcji w otwartym świecie. Nie zapowiedziano wersji na PS4, Xbox One ani Nintendo Switch. Oficjalna karta Xbox potwierdza także Xbox Play Anywhere i grę w chmurze.",
      use: "Przed zakupem należy sprawdzić platformę, zawartość edycji i wymagania PC. Sama data nie oznacza potwierdzonego preloadu ani wcześniejszego dostępu — takie informacje muszą pochodzić z oficjalnego sklepu.",
      boundary: "Globalna godzina odblokowania, ewentualne różnice regionalne i rozmiar aktualizacji premierowej nie zostały jeszcze podane. Automatyczny licznik sklepu nie jest traktowany jako oficjalny komunikat.",
      faqQ: "Kiedy odbędzie się premiera The Blood of Dawnwalker?", faqA: "Premiera nastąpi 3 września 2026 roku na PC, PS5 i Xbox Series X|S."
    },
    ja: {
      title: "The Blood of Dawnwalker 発売日ガイド",
      hero: "公式に確認された発売日、対応機種、開発状況を整理し、未発表の解禁時刻とは明確に区別します。",
      direct: "The Blood of Dawnwalker は2026年9月3日にPC、PlayStation 5、Xbox Series X|S向けに発売されます。Rebel Wolvesはゴールド到達を発表しており、製造用ビルドは完成していますが、発売日アップデートが行われる可能性は残ります。",
      facts: "Bandai Namcoは本作をシングルプレイのオープンワールド・アクションRPGとして案内しています。PS4、Xbox One、Nintendo Switch版は発表されていません。Xbox版はPlay Anywhereとクラウド対応も公式に示されています。",
      use: "購入前には機種、エディション内容、PC要件を個別に確認してください。発売日だけでは事前ダウンロードや早期アクセスは確定しません。利用する公式ストアの表示が判断基準です。",
      boundary: "世界各地域の正確な解禁時刻、地域差、初日パッチ容量は未発表です。ストアの自動カウントダウンを公式発表として扱いません。",
      faqQ: "The Blood of Dawnwalker の発売日は？", faqA: "2026年9月3日にPC、PS5、Xbox Series X|Sで発売されます。"
    }
  },
  "30-days": {
    source: "https://blog.playstation.com/2026/07/07/the-blood-of-dawnwalker-unique-time-driven-quest-system-and-player-choice-detailed/",
    sourceLabel: "PlayStation Blog — official time-system feature",
    fr: {
      title: "La limite de 30 jours expliquée", hero: "Comment fonctionne la ressource temporelle, quelles actions la consomment et pourquoi explorer n’active pas un compte à rebours en temps réel.",
      direct: "Coen dispose de 30 jours et 30 nuits en jeu pour tenter de sauver sa famille. Il ne s’agit pas d’une minuterie réelle : le temps avance lorsque le joueur accepte certaines actions narratives clairement signalées.",
      facts: "Des étapes de quête, certaines décisions de dialogue et l’apprentissage de capacités peuvent coûter du temps. Se déplacer, explorer et réfléchir ne font pas continuellement avancer l’horloge. Le coût est indiqué avant l’engagement, ce qui permet de traiter le temps comme une ressource.",
      use: "Le bon réflexe n’est pas de courir partout, mais de comparer la valeur d’une action avec son coût temporel. Préparer Coen, recruter des alliés et obtenir des informations peut rendre l’affrontement final plus sûr, tandis qu’une route directe économise du temps mais augmente le risque.",
      boundary: "Atteindre le jour 30 ne provoque pas un game over automatique : l’histoire continue avec des conséquences. Les résultats précis pour la famille, les fins et la quantité exacte de contenu réalisable attendent encore la version finale.",
      faqQ: "L’exploration consomme-t-elle les 30 jours ?", faqA: "Non. L’exploration ordinaire ne fait pas avancer l’horloge ; seules certaines actions importantes et signalées coûtent du temps."
    },
    it: {
      title: "Il limite di 30 giorni spiegato", hero: "Come funziona la risorsa tempo, quali azioni la consumano e perché l’esplorazione non avvia un conto alla rovescia in tempo reale.",
      direct: "Coen ha 30 giorni e 30 notti di gioco per tentare di salvare la famiglia. Non è un timer reale: il tempo avanza quando il giocatore conferma determinate azioni narrative chiaramente segnalate.",
      facts: "Fasi di missione, alcune scelte di dialogo e l’apprendimento di abilità possono avere un costo temporale. Camminare, esplorare e valutare una decisione non consumano continuamente l’orologio. Il costo viene mostrato prima della conferma.",
      use: "La strategia corretta non è correre, ma confrontare il valore di un’azione con il tempo richiesto. Preparazione, alleati e informazioni possono rendere più sicuro lo scontro finale; una strada diretta risparmia tempo ma aumenta il rischio.",
      boundary: "Arrivare al giorno 30 non causa un game over automatico: la storia procede con conseguenze. Gli esiti precisi per la famiglia, i finali e la quantità esatta di contenuti completabili richiedono ancora la versione finale.",
      faqQ: "Esplorare consuma i 30 giorni?", faqA: "No. L’esplorazione normale non fa avanzare l’orologio; solo alcune azioni importanti e segnalate consumano tempo."
    },
    pl: {
      title: "Limit 30 dni — jak działa czas", hero: "Wyjaśnienie zasobu czasu, czynności zużywających go i powodów, dla których eksploracja nie uruchamia zegara w czasie rzeczywistym.",
      direct: "Coen ma 30 dni i 30 nocy w świecie gry, aby spróbować uratować rodzinę. Nie jest to licznik czasu rzeczywistego: czas przesuwa się po zatwierdzeniu wyraźnie oznaczonych, ważnych działań fabularnych.",
      facts: "Koszt mogą mieć etapy zadań, niektóre decyzje dialogowe i nauka zdolności. Chodzenie, eksploracja i zastanawianie się nad wyborem nie zużywają czasu bez przerwy. Gra pokazuje koszt przed potwierdzeniem.",
      use: "Nie trzeba pędzić przez świat; trzeba porównywać korzyść z działania z jego kosztem. Zdobycie sojuszników, mocy i informacji może ułatwić finał, natomiast szybka droga oszczędza czas kosztem większego ryzyka.",
      boundary: "Dzień 30 nie oznacza automatycznego końca gry — fabuła trwa dalej i uwzględnia konsekwencje. Dokładne losy rodziny, zakończenia i odsetek możliwej zawartości wymagają sprawdzenia w wersji premierowej.",
      faqQ: "Czy eksploracja zużywa limit 30 dni?", faqA: "Nie. Zwykła eksploracja nie przesuwa zegara; czas kosztują tylko wybrane, oznaczone działania."
    },
    ja: {
      title: "30日制限と時間システム解説", hero: "時間がどの行動で消費されるのか、探索中にリアルタイムで減らない理由を公式情報に基づいて説明します。",
      direct: "Coenには家族を救うためのゲーム内30日と30夜があります。ただしリアルタイムのカウントダウンではなく、明示された重要な物語行動を確定したときに時間が進みます。",
      facts: "一部のクエスト段階、会話選択、能力習得には時間コストがあります。移動、通常探索、選択を考えている時間は継続的に消費されません。確定前にコストが表示され、時間を資源として管理できます。",
      use: "急いで走り回る必要はありません。行動の価値と時間コストを比較することが重要です。仲間、能力、情報を集めれば最終局面に備えられますが、直行ルートは時間を節約する代わりに危険が増します。",
      boundary: "30日目に到達しても即ゲームオーバーではなく、結果を伴って物語が進みます。家族の具体的な運命、エンディング条件、1周で消化できる割合は製品版での確認が必要です。",
      faqQ: "探索だけで30日の時間は減りますか？", faqA: "いいえ。通常探索では進まず、表示された一部の重要行動だけが時間を消費します。"
    }
  },
  "day-night-system": {
    source: "https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-gameplay-reveal-recap",
    sourceLabel: "Bandai Namco — official gameplay recap",
    fr: {
      title: "Système jour et nuit : humain ou vampire", hero: "Deux boucles de jeu reliées : Coen humain utilise l’épée et les hexes, tandis que Coen vampire obtient mobilité et pouvoirs surnaturels.",
      direct: "Le jour et la nuit ne sont pas un simple changement visuel. Le jour, Coen combat comme un humain et grave des runes pour utiliser des hexes. La nuit, sa forme vampirique possède griffes, morsure, force et déplacements surnaturels.",
      facts: "Compel Soul permet notamment d’interroger les morts. Les marques magiques humaines disparaissent lorsque la régénération vampirique soigne le corps, ce qui justifie des outils distincts. La faim de sang devient aussi un risque narratif pendant la boucle nocturne.",
      use: "Une même situation peut offrir un accès, une information ou une solution différente selon la forme. Cela ne signifie pas que chaque quête existe en deux versions complètes : il faut choisir le moment en fonction des capacités nécessaires.",
      boundary: "L’interface finale pour attendre, se reposer ou changer de période n’est pas entièrement documentée. Il ne faut donc pas supposer que le passage jour-nuit est gratuit ou disponible au milieu de chaque objectif.",
      faqQ: "Que change la nuit ?", faqA: "Coen devient vampire et gagne griffes, morsure, mobilité surnaturelle et pouvoirs différents de ses outils humains."
    },
    it: {
      title: "Sistema giorno e notte: umano o vampiro", hero: "Due cicli collegati: Coen umano usa spada e sortilegi, mentre il vampiro ottiene mobilità e poteri soprannaturali.",
      direct: "Giorno e notte non sono soltanto un cambiamento visivo. Di giorno Coen combatte da umano e incide rune per usare sortilegi. Di notte la forma vampirica dispone di artigli, morso, forza e movimento soprannaturale.",
      facts: "Compel Soul può interrogare i morti. I segni magici umani scompaiono quando la rigenerazione vampirica guarisce il corpo, spiegando strumenti separati. Anche la fame di sangue diventa un rischio narrativo nella fase notturna.",
      use: "La stessa situazione può offrire accesso, informazioni o soluzioni diverse a seconda della forma. Non significa che ogni missione abbia due versioni complete: bisogna scegliere il momento in base alle capacità richieste.",
      boundary: "L’interfaccia finale per aspettare, riposare o cambiare periodo non è stata documentata completamente. Non va quindi presunto che il passaggio giorno-notte sia gratuito o possibile durante ogni obiettivo.",
      faqQ: "Cosa cambia di notte?", faqA: "Coen diventa vampiro e ottiene artigli, morso, movimento soprannaturale e poteri diversi dagli strumenti umani."
    },
    pl: {
      title: "System dnia i nocy: człowiek oraz wampir", hero: "Dwie połączone pętle rozgrywki: ludzki Coen używa miecza i klątw, a wampir zyskuje nadnaturalny ruch i moce.",
      direct: "Dzień i noc nie są wyłącznie zmianą wyglądu. Za dnia Coen walczy jako człowiek i wycina runy, aby używać klątw. Nocą jego wampirza postać otrzymuje pazury, ugryzienie, siłę i nadnaturalną mobilność.",
      facts: "Compel Soul pozwala rozmawiać ze zmarłymi. Ludzkie znaki magii znikają, gdy regeneracja wampira leczy ciało, co uzasadnia dwa zestawy narzędzi. Głód krwi staje się również zagrożeniem fabularnym nocą.",
      use: "Ta sama sytuacja może mieć inne dojście, informacje lub rozwiązanie zależnie od formy. Nie dowodzi to, że każde zadanie ma dwie pełne wersje — porę warto wybrać pod kątem potrzebnych zdolności.",
      boundary: "Końcowy interfejs czekania, odpoczynku i zmiany pory nie został w pełni pokazany. Nie należy zakładać, że zmiana dnia i nocy jest darmowa albo dostępna podczas każdego celu.",
      faqQ: "Co zmienia się nocą?", faqA: "Coen staje się wampirem i zyskuje pazury, ugryzienie, nadnaturalny ruch oraz inne moce."
    },
    ja: {
      title: "昼夜システム：人間と吸血鬼", hero: "人間のCoenは剣と呪術を使い、夜の吸血鬼Coenは超自然的な移動と能力を得る、二つのゲームループを解説します。",
      direct: "昼夜は見た目だけの変化ではありません。昼は人間として剣で戦い、身体にルーンを刻んで呪術を使います。夜は吸血鬼となり、爪、噛みつき、怪力、超自然的な移動能力を利用できます。",
      facts: "Compel Soulは死者から情報を得る能力です。人間時に刻んだ魔術の傷は吸血鬼の再生で治るため、二つの形態には異なる道具があります。夜は血への飢えも物語上のリスクになります。",
      use: "同じ状況でも形態によって侵入経路、情報、解決方法が変わる可能性があります。ただし全クエストに完全な昼版と夜版があるとは限らず、必要な能力で時間帯を選びます。",
      boundary: "待機、休息、時間帯変更の最終操作はまだ完全に公開されていません。どの目標中でも無料で切り替えられるとは断定できません。",
      faqQ: "夜になると何が変わりますか？", faqA: "Coenが吸血鬼となり、爪、噛みつき、超自然的移動、人間時とは異なる能力を使えます。"
    }
  },
  combat: {
    source: "https://news.xbox.com/en-us/2026/07/07/the-blood-of-dawnwalker-hands-on-preview/",
    sourceLabel: "Xbox Wire — official hands-on preview",
    fr: {
      title: "Le système de combat expliqué", hero: "Attaques directionnelles, blocage, parade, Omni-Block, charges d’activation et différences entre humain et vampire.",
      direct: "Le combat est en temps réel et directionnel. Le joueur lit l’attaque ennemie, choisit l’orientation de sa frappe ou de sa défense, bloque, pare, esquive et utilise des charges d’activation pour déclencher des capacités plus puissantes.",
      facts: "Le combat humain s’inspire de techniques d’épée médiévales. Répéter toujours la même direction rend Coen prévisible. L’Omni-Block est une aide optionnelle qui réduit la demande directionnelle, sans devenir une parade automatique ni rendre invulnérable.",
      use: "Les charges récompensent un échange réussi et alimentent les actions fortes. La forme humaine combine épée et hexes ; la forme vampirique change le rythme avec griffes, morsure, puissance physique et mobilité. Le bon outil dépend donc aussi de l’heure.",
      boundary: "Les fenêtres exactes de parade, les coûts d’endurance et l’équilibre de difficulté exigent encore des tests sur la version finale. Rebel Wolves présente le jeu comme un action-RPG narratif, pas comme un Soulslike officiel.",
      faqQ: "Le combat est-il au tour par tour ?", faqA: "Non. Il s’agit d’un combat d’action en temps réel avec attaques et défenses directionnelles."
    },
    it: {
      title: "Il sistema di combattimento spiegato", hero: "Attacchi direzionali, blocco, parata, Omni-Block, cariche di attivazione e differenze fra umano e vampiro.",
      direct: "Il combattimento è in tempo reale e direzionale. Il giocatore legge l’attacco nemico, sceglie la direzione del colpo o della difesa, blocca, para, schiva e usa cariche di attivazione per abilità più potenti.",
      facts: "Il combattimento umano si ispira a tecniche di spada medievali. Ripetere sempre la stessa direzione rende Coen prevedibile. Omni-Block è un aiuto opzionale che riduce la richiesta direzionale, ma non è una parata automatica e non rende invulnerabili.",
      use: "Le cariche premiano gli scambi riusciti e alimentano le azioni forti. La forma umana combina spada e sortilegi; quella vampirica cambia ritmo con artigli, morso, forza e mobilità. Lo strumento migliore dipende quindi anche dall’ora.",
      boundary: "Finestre precise di parata, costi di stamina e bilanciamento della difficoltà richiedono test sulla versione finale. Rebel Wolves presenta il gioco come action RPG narrativo, non come Soulslike ufficiale.",
      faqQ: "Il combattimento è a turni?", faqA: "No. È combattimento d’azione in tempo reale con attacchi e difese direzionali."
    },
    pl: {
      title: "System walki — pełne wyjaśnienie", hero: "Kierunkowe ataki, blok, parowanie, Omni-Block, ładunki aktywacji oraz różnice między człowiekiem i wampirem.",
      direct: "Walka odbywa się w czasie rzeczywistym i wykorzystuje kierunki. Gracz odczytuje atak przeciwnika, wybiera stronę uderzenia lub obrony, blokuje, paruje, wykonuje unik i zużywa ładunki aktywacji na silniejsze zdolności.",
      facts: "Ludzki styl czerpie ze średniowiecznych technik miecza. Powtarzanie jednego kierunku czyni Coena przewidywalnym. Omni-Block jest opcjonalnym ułatwieniem, które ogranicza wymóg kierunkowy, ale nie zapewnia automatycznego parowania ani nietykalności.",
      use: "Ładunki nagradzają udaną wymianę i zasilają mocne akcje. Człowiek łączy miecz z klątwami; wampir zmienia rytm dzięki pazurom, ugryzieniu, sile i mobilności. Wybór narzędzia zależy również od pory.",
      boundary: "Dokładne okna parowania, koszty wytrzymałości i balans trudności wymagają testów wersji premierowej. Rebel Wolves określa grę jako narracyjne RPG akcji, a nie oficjalny Soulslike.",
      faqQ: "Czy walka jest turowa?", faqA: "Nie. To walka akcji w czasie rzeczywistym z kierunkowymi atakami i obroną."
    },
    ja: {
      title: "戦闘システム完全解説", hero: "方向攻撃、ガード、パリィ、Omni-Block、Activation Charge、人間と吸血鬼の戦い方を整理します。",
      direct: "戦闘はリアルタイムの方向入力方式です。敵の攻撃方向を読み、攻撃や防御の向きを選び、ガード、パリィ、回避を行い、Activation Chargeを強力な能力に使用します。",
      facts: "人間時の剣術は中世の技法を参考にしています。同じ方向を繰り返すとCoenの動きが読まれやすくなります。Omni-Blockは方向入力を軽減する任意の補助で、自動パリィや無敵ではありません。",
      use: "成功した攻防でチャージを得て強い行動につなげます。人間は剣と呪術、吸血鬼は爪、噛みつき、怪力、機動力を使うため、時間帯によって戦闘のリズムも変わります。",
      boundary: "正確なパリィ受付時間、スタミナ消費、難易度バランスは製品版での確認が必要です。公式ジャンルは物語重視のアクションRPGであり、Soulslikeとは発表されていません。",
      faqQ: "戦闘はターン制ですか？", faqA: "いいえ。方向攻撃と方向防御を使うリアルタイムアクション戦闘です。"
    }
  },
  "blood-hunger": {
    source: "https://news.xbox.com/en-us/2026/07/07/the-blood-of-dawnwalker-hands-on-preview/",
    sourceLabel: "Xbox Wire — official hands-on preview",
    fr: {
      title: "La faim de sang expliquée", hero: "Comment la faim influence les dialogues, l’alimentation et le risque de perdre le contrôle de Coen.",
      direct: "La faim de sang est une ressource de la forme vampirique et un risque narratif. Coen peut se nourrir de créatures ou de personnes ; laisser la jauge se vider peut supprimer les réponses normales et pousser le personnage vers une option de prédation.",
      facts: "Le compte rendu officiel Xbox décrit la possibilité de récupérer du sang sur des rats, mais l’animation de nutrition expose Coen aux interruptions. Se nourrir n’est donc pas seulement un soin instantané : le lieu, les ennemis proches et la cible comptent.",
      use: "Avant un dialogue important, il est prudent de vérifier la faim afin de conserver les choix souhaités. En combat, il faut créer un espace sûr avant de se nourrir. Les cibles humaines peuvent aussi avoir une valeur narrative ou économique.",
      boundary: "Les valeurs numériques, la vitesse exacte de diminution et toutes les conséquences sur les PNJ ne sont pas publiées. Cette page décrit le fonctionnement confirmé sans inventer une route d’alimentation optimale avant la sortie.",
      faqQ: "Que se passe-t-il si la faim tombe à zéro ?", faqA: "Les choix de dialogue normaux peuvent disparaître et Coen peut être poussé à se nourrir de la personne présente."
    },
    it: {
      title: "La fame di sangue spiegata", hero: "Come la fame influenza dialoghi, nutrimento e rischio di perdere il controllo di Coen.",
      direct: "La fame di sangue è una risorsa della forma vampirica e un rischio narrativo. Coen può nutrirsi di creature o persone; lasciare vuota la barra può rimuovere risposte normali e spingerlo verso un’opzione predatoria.",
      facts: "L’anteprima ufficiale Xbox descrive il recupero di sangue dai ratti, ma l’animazione del nutrimento espone Coen alle interruzioni. Non è quindi una cura istantanea senza rischio: contano posizione, nemici vicini e bersaglio.",
      use: "Prima di un dialogo importante conviene controllare la fame per conservare le scelte desiderate. In combattimento bisogna creare spazio prima di nutrirsi. Un bersaglio umano può inoltre avere valore narrativo o economico.",
      boundary: "Valori numerici, velocità precisa di consumo e tutte le conseguenze sugli NPC non sono pubblicati. La pagina spiega il sistema confermato senza inventare una rotta ottimale prima del lancio.",
      faqQ: "Cosa accade quando la fame arriva a zero?", faqA: "Le normali risposte di dialogo possono sparire e Coen può essere spinto a nutrirsi della persona presente."
    },
    pl: {
      title: "Głód krwi — zasady i konsekwencje", hero: "Wpływ głodu na dialogi, odżywianie i ryzyko utraty kontroli nad Coenem.",
      direct: "Głód krwi jest zasobem wampirzej postaci i zagrożeniem fabularnym. Coen może żywić się stworzeniami lub ludźmi; opróżnienie paska może usunąć zwykłe odpowiedzi i skierować go ku drapieżnej opcji.",
      facts: "Oficjalna relacja Xbox opisuje odzyskiwanie krwi ze szczurów, lecz animacja karmienia naraża Coena na przerwanie. Nie jest to więc bezpieczne natychmiastowe leczenie — znaczenie mają miejsce, pobliscy wrogowie i wybrany cel.",
      use: "Przed ważną rozmową warto sprawdzić głód, aby zachować planowane wybory. W walce trzeba najpierw stworzyć bezpieczną przestrzeń. Człowiek będący celem może mieć znaczenie fabularne lub gospodarcze.",
      boundary: "Nie opublikowano wartości liczbowych, dokładnego tempa spadku ani wszystkich konsekwencji dla NPC. Opisujemy potwierdzony system bez wymyślania optymalnej trasy karmienia przed premierą.",
      faqQ: "Co się dzieje, gdy głód spada do zera?", faqA: "Zwykłe odpowiedzi dialogowe mogą zniknąć, a Coen może zostać zmuszony do żywienia się obecną osobą."
    },
    ja: {
      title: "血への飢えシステム解説", hero: "飢えが会話選択、吸血、Coenの制御喪失リスクにどう影響するかを説明します。",
      direct: "血への飢えは吸血鬼形態の資源であり、物語上の危険でもあります。Coenは生物や人間から血を得られますが、ゲージを空にすると通常の会話選択肢が消え、相手を襲う方向へ追い込まれる可能性があります。",
      facts: "Xboxの公式体験記事ではネズミから血を回復できる一方、吸血動作中は妨害を受ける危険が示されています。安全な即時回復ではなく、場所、周囲の敵、対象の選択が重要です。",
      use: "重要な会話前には飢えを確認し、望む選択肢を残す必要があります。戦闘中は先に安全な間合いを作ります。人間の対象は物語や地域経済に関わる可能性もあります。",
      boundary: "数値、正確な減少速度、全NPCへの影響は未公開です。発売前に最適な吸血ルートを作り上げず、確認済みの仕組みだけを説明します。",
      faqQ: "飢えがゼロになるとどうなりますか？", faqA: "通常の会話選択肢が消え、その場の人物から吸血する行動へ追い込まれる可能性があります。"
    }
  },
  characters: {
    source: "https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-8-forging-connections",
    sourceLabel: "Bandai Namco — official character bulletin",
    fr: {
      title: "Personnages confirmés de The Blood of Dawnwalker", hero: "Guide sans spoiler de Coen, sa famille, Brencis et les principaux Vrakhiri présentés officiellement.",
      direct: "Coen est un jeune homme transformé en Dawnwalker, humain le jour et vampire la nuit. Son objectif initial est de sauver sa famille, mais le joueur peut former des alliances, rejoindre une révolution, poursuivre le pouvoir ou prendre une autre voie.",
      facts: "La famille comprend Pieter, Esme, Yanna, Mirto, Lunka et d’autres proches comme Anca. Brencis dirige les Vrakhiri avec Xanthe, Ambrus et Bakir. Marat mène la rébellion, tandis que Lacra poursuit un objectif de vengeance qui lui est propre.",
      use: "Les profils servent à relier une personne à ses lieux, factions et quêtes sans révéler des résultats encore inconnus. Avant la sortie, il faut distinguer une biographie officielle d’un guide de choix ou d’une romance testé.",
      boundary: "Les conditions de recrutement, relations, morts possibles et conséquences finales ne sont pas toutes publiées. Aucune issue n’est présentée comme certaine tant qu’une source primaire ou la version finale ne la confirme.",
      faqQ: "Qui est le héros principal ?", faqA: "Coen est le protagoniste, un Dawnwalker humain le jour et vampire la nuit."
    },
    it: {
      title: "Personaggi confermati di The Blood of Dawnwalker", hero: "Guida senza spoiler a Coen, alla sua famiglia, a Brencis e ai principali Vrakhiri presentati ufficialmente.",
      direct: "Coen è un giovane trasformato in Dawnwalker, umano di giorno e vampiro di notte. L’obiettivo iniziale è salvare la famiglia, ma il giocatore può creare alleanze, sostenere la rivoluzione, cercare potere o scegliere un’altra strada.",
      facts: "La famiglia comprende Pieter, Esme, Yanna, Mirto, Lunka e persone vicine come Anca. Brencis guida i Vrakhiri con Xanthe, Ambrus e Bakir. Marat dirige la ribellione, mentre Lacra segue un proprio progetto di vendetta.",
      use: "I profili collegano una persona a luoghi, fazioni e missioni senza inventare esiti. Prima del lancio bisogna separare una biografia ufficiale da una guida testata a scelte, relazioni o romance.",
      boundary: "Condizioni di reclutamento, relazioni, morti possibili e conseguenze finali non sono tutte pubblicate. Nessun esito viene presentato come certo senza una fonte primaria o una verifica sulla versione finale.",
      faqQ: "Chi è il protagonista?", faqA: "Coen è il protagonista, un Dawnwalker umano di giorno e vampiro di notte."
    },
    pl: {
      title: "Potwierdzone postacie The Blood of Dawnwalker", hero: "Bezspoilerowy przewodnik po Coenie, jego rodzinie, Brencisie i najważniejszych oficjalnie ujawnionych Vrakhiri.",
      direct: "Coen jest młodym mężczyzną przemienionym w Dawnwalkera — człowieka za dnia i wampira nocą. Początkowo chce uratować rodzinę, lecz gracz może budować sojusze, wesprzeć rewolucję, szukać władzy albo wybrać inną drogę.",
      facts: "Rodzina obejmuje Pietera, Esme, Yannę, Mirto i Lunkę, a bliską osobą jest Anca. Brencis przewodzi Vrakhiri wraz z Xanthe, Ambrusem i Bakirem. Marat kieruje rebelią, a Lacra realizuje własny plan zemsty.",
      use: "Profile łączą osobę z miejscami, frakcjami i zadaniami bez wymyślania rezultatów. Przed premierą trzeba oddzielić oficjalną biografię od przetestowanego poradnika wyborów, relacji lub romansów.",
      boundary: "Warunki rekrutacji, relacje, możliwe śmierci i finałowe konsekwencje nie zostały w pełni ujawnione. Żaden wynik nie jest przedstawiany jako pewny bez źródła pierwotnego albo testu wersji finalnej.",
      faqQ: "Kto jest głównym bohaterem?", faqA: "Coen to protagonista i Dawnwalker: człowiek za dnia, a wampir nocą."
    },
    ja: {
      title: "登場人物・キャラクターガイド", hero: "Coenと家族、Brencis、公式に紹介された主要Vrakhiriをネタバレを抑えて整理します。",
      direct: "Coenは昼は人間、夜は吸血鬼となるDawnwalkerです。最初の目的は家族を救うことですが、同盟を結ぶ、革命に協力する、力を求める、別の道を選ぶなど、プレイヤーの方針で物語が変わります。",
      facts: "家族にはPieter、Esme、Yanna、Mirto、Lunkaがおり、Ancaも重要な関係者です。BrencisはXanthe、Ambrus、BakirらVrakhiriを率います。Maratは反乱側、Lacraは独自の復讐を追います。",
      use: "人物ページは場所、勢力、クエストとの関係を整理します。発売前は公式プロフィールと、実際に検証された選択・関係・ロマンス攻略を区別することが重要です。",
      boundary: "加入条件、関係の変化、生死、最終結果はすべて公開されていません。一次情報または製品版で確認できるまで、特定の結末を確定情報として扱いません。",
      faqQ: "主人公は誰ですか？", faqA: "主人公はCoenです。昼は人間、夜は吸血鬼となるDawnwalkerです。"
    }
  },
  "vale-sangora": {
    source: "https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-5-secrets-of-vale-sangora",
    sourceLabel: "Bandai Namco — official Vale Sangora bulletin",
    fr: {
      title: "Vale Sangora : monde et lieux", hero: "Guide vérifié de la vallée des Carpates, de Svartrau, de Howling Keep, de Shrike’s Crag et de ses biomes.",
      direct: "Vale Sangora est une vallée fictive des Carpates inspirée de paysages et cultures d’Europe centrale et orientale. Sa capitale Svartrau s’est enrichie grâce à l’argent et cache sous ses rues des caves, cryptes, ruines et passages utilisés par les voleurs.",
      facts: "Les lieux confirmés comprennent Howling Keep dans les bois de Tantari et Shrike’s Crag, ancienne carrière marquée par un massacre. Le monde contient aussi forêts anciennes, marais, mines, grottes, montagnes, villages et ruines de civilisations disparues.",
      use: "La forme humaine et la forme vampirique peuvent ouvrir des routes différentes, notamment sur les toits ou les murs. L’exploration ordinaire ne consomme pas continuellement les 30 jours, mais l’accès peut dépendre d’une quête, d’un pouvoir ou de l’heure.",
      boundary: "Les limites exactes de la carte, le nombre de régions, les coordonnées et le réseau complet de voyage rapide ne sont pas publiés. Les légendes officielles sont présentées comme du lore, pas comme des conditions de quête inventées.",
      faqQ: "Vale Sangora existe-t-elle réellement ?", faqA: "Non. C’est une vallée fictive des Carpates inspirée de cultures et paysages d’Europe centrale et orientale."
    },
    it: {
      title: "Vale Sangora: mondo e luoghi", hero: "Guida verificata alla valle dei Carpazi, Svartrau, Howling Keep, Shrike’s Crag e ai suoi biomi.",
      direct: "Vale Sangora è una valle immaginaria dei Carpazi ispirata a paesaggi e culture dell’Europa centrale e orientale. La capitale Svartrau è diventata ricca con l’argento e nasconde sotto le strade cantine, cripte, rovine e passaggi usati dai ladri.",
      facts: "I luoghi confermati includono Howling Keep nei boschi Tantari e Shrike’s Crag, una vecchia cava segnata da un massacro. Il mondo comprende anche foreste primordiali, paludi, miniere, grotte, montagne, villaggi e rovine perdute.",
      use: "La forma umana e quella vampirica possono aprire percorsi diversi, per esempio su tetti e pareti. L’esplorazione normale non consuma continuamente i 30 giorni, ma l’accesso può dipendere da missione, potere o ora.",
      boundary: "Confini esatti della mappa, numero di regioni, coordinate e rete completa di viaggio rapido non sono pubblicati. Le leggende ufficiali sono trattate come lore, non come condizioni di missione inventate.",
      faqQ: "Vale Sangora è un luogo reale?", faqA: "No. È una valle immaginaria dei Carpazi ispirata a paesaggi e culture dell’Europa centrale e orientale."
    },
    pl: {
      title: "Vale Sangora — świat i lokacje", hero: "Zweryfikowany przewodnik po karpackiej dolinie, Svartrau, Howling Keep, Shrike’s Crag i biomach.",
      direct: "Vale Sangora jest fikcyjną doliną w Karpatach inspirowaną krajobrazami i kulturami Europy Środkowej oraz Wschodniej. Stolica Svartrau wzbogaciła się na srebrze, a pod ulicami kryje piwnice, krypty, ruiny i przejścia złodziei.",
      facts: "Potwierdzone miejsca to Howling Keep w lasach Tantari oraz Shrike’s Crag, dawny kamieniołom naznaczony masakrą. Świat obejmuje również pierwotne lasy, bagna, kopalnie, jaskinie, góry, wsie i ruiny zaginionych cywilizacji.",
      use: "Postać ludzka i wampirza mogą otwierać różne drogi, między innymi po dachach i ścianach. Zwykła eksploracja nie zużywa stale limitu 30 dni, ale dostęp może zależeć od zadania, mocy lub pory.",
      boundary: "Nie podano dokładnych granic mapy, liczby regionów, współrzędnych ani pełnej sieci szybkiej podróży. Oficjalne legendy opisujemy jako lore, nie jako wymyślone warunki zadań.",
      faqQ: "Czy Vale Sangora jest prawdziwym miejscem?", faqA: "Nie. To fikcyjna dolina Karpat inspirowana kulturami i krajobrazami Europy Środkowej i Wschodniej."
    },
    ja: {
      title: "Vale Sangora 世界・ロケーションガイド", hero: "カルパチア山脈の谷、Svartrau、Howling Keep、Shrike’s Crag、各バイオームを公式情報で整理します。",
      direct: "Vale Sangoraは中欧・東欧の文化と景観を参考にした、カルパチア山脈の架空の谷です。首都Svartrauは銀で栄え、地下には盗賊が使う地下室、洞窟、納骨堂、古代遺跡が広がります。",
      facts: "Tantari WoodsのHowling Keep、虐殺の歴史を持つ古い採石場Shrike’s Cragが確認されています。原生林、沼地、鉱山、洞窟、山道、集落、失われた文明の遺跡もあります。",
      use: "人間形態と吸血鬼形態では、屋根や壁など使える経路が変わります。通常探索は30日の時間を継続消費しませんが、クエスト、能力、時間帯によってアクセスが変わる可能性があります。",
      boundary: "正確なマップ境界、地域数、座標、ファストトラベル網は未公開です。公式の伝承は世界設定として扱い、未確認のクエスト条件には置き換えません。",
      faqQ: "Vale Sangoraは実在しますか？", faqA: "いいえ。中欧・東欧の文化と景観に着想を得た架空のカルパチア地方です。"
    }
  },
  "system-requirements": {
    source: "https://store.steampowered.com/app/3751260/The_Blood_of_Dawnwalker/",
    sourceLabel: "Steam — official system requirements",
    fr: {
      title: "Configuration PC requise", hero: "Configuration minimale et recommandée mise à jour, avec une lecture prudente des performances encore non testées.",
      direct: "La configuration minimale demande Windows 10 et DirectX 12, un Core i5-11400F ou Ryzen 7 2700X, 16 Go de RAM, une GTX 1060 ou RX 580 et 60 Go sur SSD.",
      facts: "La configuration recommandée indique un Core i7-11700K ou Ryzen 7 5700X, 16 Go de RAM et une RTX 4060, RX 7600 XT ou Intel Arc B580, toujours avec 60 Go sur SSD. Cette liste remplace l’ancien tableau publié avant l’optimisation de juin.",
      use: "Un PC proche du minimum devrait attendre des tests réels avant achat ; une machine proche du recommandé doit encore vérifier la résolution et le nombre d’images visés. Même au-dessus, compilation des shaders, pilotes et patch du premier jour peuvent influencer l’expérience.",
      boundary: "Les préréglages détaillés, DLSS/FSR/XeSS, ray tracing, HDR, ultra-large et Steam Deck ne sont pas tous confirmés. Une recommandation de réglages précis attend des mesures sur la version finale.",
      faqQ: "Un SSD est-il obligatoire ?", faqA: "Oui. Les exigences officielles indiquent 60 Go d’espace sur SSD pour le minimum comme pour le recommandé."
    },
    it: {
      title: "Requisiti di sistema PC", hero: "Requisiti minimi e consigliati aggiornati, con una lettura prudente delle prestazioni non ancora testate.",
      direct: "I requisiti minimi indicano Windows 10 e DirectX 12, Core i5-11400F o Ryzen 7 2700X, 16 GB di RAM, GTX 1060 o RX 580 e 60 GB su SSD.",
      facts: "I consigliati richiedono Core i7-11700K o Ryzen 7 5700X, 16 GB di RAM e RTX 4060, RX 7600 XT o Intel Arc B580, sempre con 60 GB su SSD. La lista sostituisce la vecchia tabella precedente all’ottimizzazione di giugno.",
      use: "Un PC vicino al minimo dovrebbe attendere prove reali prima dell’acquisto; vicino ai consigliati bisogna ancora controllare risoluzione e frame rate obiettivo. Anche hardware superiore può risentire di shader, driver e patch del day one.",
      boundary: "Preset dettagliati, DLSS/FSR/XeSS, ray tracing, HDR, ultrawide e Steam Deck non sono tutti confermati. I consigli precisi sulle impostazioni richiedono misure sulla versione finale.",
      faqQ: "È obbligatorio un SSD?", faqA: "Sì. I requisiti ufficiali indicano 60 GB su SSD sia per il minimo sia per il consigliato."
    },
    pl: {
      title: "Wymagania sprzętowe PC", hero: "Zaktualizowane wymagania minimalne i zalecane oraz ostrożna interpretacja nieprzetestowanej jeszcze wydajności.",
      direct: "Minimum to Windows 10 z DirectX 12, Core i5-11400F lub Ryzen 7 2700X, 16 GB RAM, GTX 1060 lub RX 580 oraz 60 GB miejsca na SSD.",
      facts: "Zalecane wymagania obejmują Core i7-11700K lub Ryzen 7 5700X, 16 GB RAM i RTX 4060, RX 7600 XT albo Intel Arc B580, również z 60 GB na SSD. Lista zastępuje starszą tabelę sprzed czerwcowej optymalizacji.",
      use: "Przy sprzęcie bliskim minimum warto poczekać na realne testy; przy zalecanym nadal trzeba sprawdzić docelową rozdzielczość i klatki. Nawet mocniejszy komputer może odczuć kompilację shaderów, sterowniki i łatkę premierową.",
      boundary: "Szczegółowe presety, DLSS/FSR/XeSS, ray tracing, HDR, ultrawide i Steam Deck nie są w całości potwierdzone. Dokładne ustawienia wymagają pomiarów na wersji finalnej.",
      faqQ: "Czy SSD jest wymagany?", faqA: "Tak. Oficjalne wymagania podają 60 GB na SSD zarówno dla minimum, jak i konfiguracji zalecanej."
    },
    ja: {
      title: "PC版システム要件", hero: "更新された最低・推奨スペックと、未検証の実動作を安全に判断する方法をまとめます。",
      direct: "最低要件はWindows 10、DirectX 12、Core i5-11400FまたはRyzen 7 2700X、16GB RAM、GTX 1060またはRX 580、SSD空き容量60GBです。",
      facts: "推奨はCore i7-11700KまたはRyzen 7 5700X、16GB RAM、RTX 4060、RX 7600 XT、Intel Arc B580のいずれかで、SSD 60GBが必要です。これは6月の最適化後に更新された公式要件です。",
      use: "最低付近のPCは購入前に実機検証を待つのが安全です。推奨付近でも対象解像度とフレームレートを確認してください。上位PCでもシェーダー生成、ドライバー、初日パッチの影響はあり得ます。",
      boundary: "詳細プリセット、DLSS/FSR/XeSS、レイトレーシング、HDR、ウルトラワイド、Steam Deck対応はすべて確定していません。具体的な設定推奨は製品版の測定後に追加します。",
      faqQ: "SSDは必須ですか？", faqA: "はい。最低・推奨の両方でSSDに60GBの空き容量が必要です。"
    }
  }
};

const allLanguageOptions = [
  ["en", "English", ""], ["de", "Deutsch", "de"], ["es-ES", "Español (España)", "es"],
  ["fr", "Français", "fr"], ["it", "Italiano", "it"], ["pl", "Polski", "pl"],
  ["zh-Hans", "简体中文", "zh-hans"], ["zh-Hant", "繁體中文", "zh-hant"],
  ["ja", "日本語", "ja"], ["ko", "한국어", "ko"], ["cs", "Čeština", "cs"],
  ["hu", "Magyar", "hu"], ["pt-BR", "Português (Brasil)", "pt-br"],
  ["es-419", "Español (Latinoamérica)", "es-419"], ["tr", "Türkçe", "tr"]
];

const activeLocales = ["", "de", "es", "fr", "it", "pl", "ja"];
const topicSlugs = Object.keys(topics);

function esc(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function alternates(slug) {
  const links = activeLocales.map((locale) => {
    const hreflang = locale === "" ? "en" : locale === "es" ? "es-ES" : locale;
    const url = locale ? `${base}/${locale}/${slug}/` : `${base}/${slug}/`;
    return `<link rel="alternate" hreflang="${hreflang}" href="${url}" />`;
  });
  links.push(`<link rel="alternate" hreflang="x-default" href="${base}/${slug}/" />`);
  return links.join("");
}

function languageMenu(currentLocale, slug) {
  const current = currentLocale ? languages[currentLocale]?.name ?? currentLocale : "English";
  const options = allLanguageOptions.map(([code, label, dir]) => {
    const hasMatchingPage = activeLocales.includes(dir);
    const matchingTarget = slug
      ? (dir ? `${base}/${dir}/${slug}/` : `${base}/${slug}/`)
      : (dir ? `${base}/${dir}/` : `${base}/`);
    const target = hasMatchingPage
      ? matchingTarget
      : (dir ? `${base}/${dir}/` : `${base}/`);
    const selected = (currentLocale === dir || (!currentLocale && !dir)) ? ` aria-current="page"` : "";
    return `<a href="${target}" lang="${code}"${selected}>${label}</a>`;
  }).join("");
  return `<!-- LANG-DROPDOWN:START --><details class="language-menu"><summary aria-label="Select language">🌐 ${current}</summary><div class="language-options">${options}</div></details><!-- LANG-DROPDOWN:END -->`;
}

function jsonLd(locale, slug, page) {
  const lang = languages[locale].lang;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.hero,
    url: `${base}/${locale}/${slug}/`,
    inLanguage: lang,
    dateModified: date,
    isPartOf: {"@type": "WebSite", name: "The Blood of Dawnwalker Wiki", url: `${base}/`},
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {"@type": "ListItem", position: 1, name: languages[locale].ui.home, item: `${base}/${locale}/`},
        {"@type": "ListItem", position: 2, name: page.title, item: `${base}/${locale}/${slug}/`}
      ]
    }
  });
}

function faqLd(locale, slug, page) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `${base}/${locale}/${slug}/`,
    inLanguage: languages[locale].lang,
    mainEntity: [{
      "@type": "Question",
      name: page.faqQ,
      acceptedAnswer: {"@type": "Answer", text: page.faqA}
    }]
  });
}

function renderPage(locale, slug, topic, page) {
  const l = languages[locale];
  const cards = topicSlugs.filter((s) => s !== slug).map((s) => {
    const p = topics[s][locale];
    return `<a href="../${s}/"><strong>${p.title}</strong><span>${p.hero}</span></a>`;
  }).join("");
  return `<!doctype html>
<html lang="${l.lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="google-adsense-account" content="ca-pub-9505220977121599" />
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9505220977121599" crossorigin="anonymous"></script>
  <title>${page.title} | The Blood of Dawnwalker Wiki</title>
  <meta name="description" content="${esc(page.hero)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${base}/${locale}/${slug}/" />
  ${alternates(slug)}
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="The Blood of Dawnwalker Wiki" />
  <meta property="og:title" content="${esc(page.title)}" />
  <meta property="og:description" content="${esc(page.hero)}" />
  <meta property="og:url" content="${base}/${locale}/${slug}/" />
  <meta property="og:locale" content="${l.locale}" />
  <link rel="stylesheet" href="../../styles.css" />
  <script type="application/ld+json">${jsonLd(locale, slug, page)}</script>
  <script type="application/ld+json" data-seo-faq="true">${faqLd(locale, slug, page)}</script>
</head>
<body>
  <header class="site-header">
    <a class="brand" href="../"><span class="brand-mark">BD</span><span><strong>The Blood of Dawnwalker</strong><small>${esc(l.ui.guide)}</small></span></a>
    <nav aria-label="Main navigation"><a href="../release-date/">${l.ui.navRelease}</a><a href="../30-days/">${l.ui.navTime}</a><a href="../combat/">${l.ui.navCombat}</a><a href="../characters/">${l.ui.navCharacters}</a>${languageMenu(locale, slug)}</nav>
  </header>
  <main class="article-main">
    <section class="article-hero"><div><p class="eyebrow">${l.ui.source}</p><h1>${page.title}</h1><p class="hero-copy">${page.hero}</p><div class="article-meta"><span class="tag confirmed">${l.ui.verified}</span><span class="tag confirmed">${l.ui.facts}</span></div></div></section>
    <div class="article-body">
      <article class="article-content">
        <section class="verification-box"><h2>${l.ui.answer}</h2><p>${page.direct}</p><p>${l.ui.scopeNote}</p></section>
        <section><h2>${l.ui.facts}</h2><p>${page.facts}</p></section>
        <section><h2>${l.ui.use}</h2><p>${page.use}</p></section>
        <section><h2>${l.ui.boundary}</h2><p>${page.boundary}</p></section>
        <section><h2>${l.ui.related}</h2><div class="related-grid">${cards}</div></section>
        <section><h2>${l.ui.sources}</h2><ul><li><a href="${topic.source}" target="_blank" rel="noreferrer">${topic.sourceLabel}</a></li><li><a href="${base}/sources/">${l.ui.source}</a></li></ul></section>
        <section id="page-faq"><h2>${l.ui.faq}</h2><dl class="faq-list"><div><dt>${page.faqQ}</dt><dd>${page.faqA}</dd></div></dl></section>
      </article>
      <aside class="article-aside"><h2>${l.ui.answer}</h2><p>${page.direct}</p><a href="../">${l.ui.home}</a>${topicSlugs.filter((s) => s !== slug).slice(0, 4).map((s) => `<a href="../${s}/">${topics[s][locale].title}</a>`).join("")}</aside>
    </div>
  </main>
</body>
</html>
`;
}

function homepageAlternates() {
  const tags = allLanguageOptions.map(([code, , dir]) => {
    const url = dir ? `${base}/${dir}/` : `${base}/`;
    return `<link rel="alternate" hreflang="${code}" href="${url}" />`;
  });
  tags.push(`<link rel="alternate" hreflang="x-default" href="${base}/" />`);
  return tags.join("");
}

function renderHome(locale) {
  const l = languages[locale];
  const cards = topicSlugs.map((slug) => {
    const page = topics[slug][locale];
    return `<article class="guide-card ready" data-category="guide"><div class="card-top"><span class="status ready">${l.ui.facts}</span></div><h3><a href="./${slug}/">${page.title}</a></h3><p>${page.hero}</p><a class="button secondary" href="./${slug}/">${l.ui.answer}</a></article>`;
  }).join("");
  const description = l.ui.homeHero;
  const ld = JSON.stringify({
    "@context": "https://schema.org", "@type": "WebSite",
    name: `The Blood of Dawnwalker Wiki — ${l.name}`, url: `${base}/${locale}/`,
    inLanguage: l.lang, description, dateModified: date
  });
  return `<!doctype html>
<html lang="${l.lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="google-adsense-account" content="ca-pub-9505220977121599" />
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9505220977121599" crossorigin="anonymous"></script>
  <title>The Blood of Dawnwalker — ${l.ui.guide} ${l.name}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${base}/${locale}/" />
  ${homepageAlternates()}
  <meta property="og:title" content="The Blood of Dawnwalker — ${esc(l.ui.guide)} ${l.name}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${base}/${locale}/" />
  <meta property="og:locale" content="${l.locale}" />
  <link rel="stylesheet" href="../styles.css" />
  <script type="application/ld+json">${ld}</script>
</head>
<body>
  <header class="site-header">
    <a class="brand" href="#top"><span class="brand-mark">BD</span><span><strong>The Blood of Dawnwalker</strong><small>${esc(l.ui.guide)}</small></span></a>
    <nav aria-label="Main navigation"><a href="./release-date/">${l.ui.navRelease}</a><a href="./30-days/">${l.ui.navTime}</a><a href="./combat/">${l.ui.navCombat}</a><a href="./characters/">${l.ui.navCharacters}</a>${languageMenu(locale, "")}</nav>
  </header>
  <main id="top">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-media" role="img" aria-label="The Blood of Dawnwalker"></div><div class="hero-overlay"></div>
      <div class="hero-content"><p class="eyebrow">${l.ui.homeEyebrow}</p><h1 id="hero-title">The Blood of Dawnwalker</h1><p class="hero-copy">${l.ui.homeHero}</p>
        <div class="hero-actions"><a class="button primary" href="./release-date/">${l.ui.navRelease}</a><a class="button secondary" href="./30-days/">${l.ui.navTime}</a></div>
        <dl class="fact-strip"><div><dt>${l.ui.genre}</dt><dd>Open-world action RPG</dd></div><div><dt>${l.ui.platforms}</dt><dd>PC / PS5 / Xbox Series X|S</dd></div><div><dt>${l.ui.developer}</dt><dd>Rebel Wolves</dd></div><div><dt>${l.ui.release}</dt><dd>3 September 2026</dd></div></dl>
      </div>
    </section>
    <section class="research band"><div class="section-heading"><p class="eyebrow">${l.ui.source}</p><h2>${l.ui.knowledgeTitle}</h2><p>${l.ui.knowledgeIntro}</p></div>
      <div class="insight-grid"><article><span class="tag confirmed">30 Days</span><h3>${topics["30-days"][locale].title}</h3><p>${topics["30-days"][locale].direct}</p></article><article><span class="tag confirmed">Day / Night</span><h3>${topics["day-night-system"][locale].title}</h3><p>${topics["day-night-system"][locale].direct}</p></article><article><span class="tag confirmed">Combat</span><h3>${topics.combat[locale].title}</h3><p>${topics.combat[locale].direct}</p></article><article><span class="tag confirmed">PC</span><h3>${topics["system-requirements"][locale].title}</h3><p>${topics["system-requirements"][locale].direct}</p></article></div>
    </section>
    <section class="section-block"><div class="section-heading"><p class="eyebrow">${l.ui.verified}</p><h2>${l.ui.knowledgeTitle}</h2><p>${l.ui.knowledgeIntro}</p></div><div class="guide-grid">${cards}</div></section>
  </main>
  <footer class="site-footer"><p>The Blood of Dawnwalker Wiki · ${l.name}</p><a href="${base}/sources/">${l.ui.sources}</a></footer>
</body>
</html>
`;
}

function replaceAlternatesAndMenu(file, slug, locale) {
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/(?:<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>\s*)+/g, alternates(slug));
  html = html.replace(/<!-- LANG-DROPDOWN:START -->[\s\S]*?<!-- LANG-DROPDOWN:END -->/g, languageMenu(locale, slug));
  fs.writeFileSync(file, html);
}

for (const [locale] of Object.entries(languages)) {
  for (const [slug, topic] of Object.entries(topics)) {
    const dir = path.join(root, locale, slug);
    fs.mkdirSync(dir, {recursive: true});
    fs.writeFileSync(path.join(dir, "index.html"), renderPage(locale, slug, topic, topic[locale]));
  }
}

for (const locale of ["", "de", "es"]) {
  for (const slug of topicSlugs) {
    const file = path.join(root, locale, slug, "index.html");
    if (fs.existsSync(file)) replaceAlternatesAndMenu(file, slug, locale);
  }
}

for (const locale of Object.keys(languages)) {
  const home = path.join(root, locale, "index.html");
  fs.writeFileSync(home, renderHome(locale));
}

function sitemapUrls(file) {
  const xml = fs.readFileSync(file, "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function writeSitemap(file, urls) {
  const unique = [...new Set(urls)].sort();
  const rows = unique.map((url) => `  <url><loc>${url}</loc><lastmod>${date}</lastmod></url>`).join("\n");
  fs.writeFileSync(file, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`);
}

for (const locale of Object.keys(languages)) {
  const file = path.join(root, `sitemap-${locale}.xml`);
  const urls = sitemapUrls(file);
  for (const slug of topicSlugs) urls.push(`${base}/${locale}/${slug}/`);
  writeSitemap(file, urls);
}

const globalSitemap = path.join(root, "sitemap.xml");
const globalUrls = sitemapUrls(globalSitemap);
for (const locale of Object.keys(languages)) {
  for (const slug of topicSlugs) globalUrls.push(`${base}/${locale}/${slug}/`);
}
writeSitemap(globalSitemap, globalUrls);

const manifest = {
  generatedAt: date,
  round: 14,
  focus: "Localized cluster depth with English-style parity",
  locales: Object.keys(languages),
  routesPerLocale: topicSlugs,
  addedIndexableUrls: Object.keys(languages).length * topicSlugs.length,
  styleContract: {
    stylesheet: "/styles.css",
    requiredClasses: ["site-header", "article-main", "article-hero", "article-body", "article-content", "article-aside", "verification-box", "related-grid", "faq-list"],
    navigation: "Same responsive header and 15-language dropdown as English pages"
  },
  evidence: [...new Set(Object.values(topics).map((t) => t.source))]
};
fs.writeFileSync(path.join(root, "ROUND_14_URL_MANIFEST.json"), JSON.stringify(manifest, null, 2) + "\n");

console.log(JSON.stringify({created: manifest.addedIndexableUrls, locales: manifest.locales, routes: topicSlugs}, null, 2));
