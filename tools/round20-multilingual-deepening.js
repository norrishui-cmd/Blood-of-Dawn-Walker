const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://bloodofdawnwalker.cc";
const DATE = "2026-07-29";
const LOCALES = ["es", "fr", "it", "pl"];
const ALL_LANGUAGES = [
  ["", "en", "English"], ["de", "de", "Deutsch"], ["es", "es-ES", "Español (España)"],
  ["fr", "fr", "Français"], ["it", "it", "Italiano"], ["pl", "pl", "Polski"],
  ["zh-hans", "zh-Hans", "简体中文"], ["zh-hant", "zh-Hant", "繁體中文"],
  ["ja", "ja", "日本語"], ["ko", "ko", "한국어"], ["cs", "cs", "Čeština"],
  ["hu", "hu", "Magyar"], ["pt-br", "pt-BR", "Português (Brasil)"],
  ["es-419", "es-419", "Español (Latinoamérica)"], ["tr", "tr", "Türkçe"],
];
const ADS = `<meta name="google-adsense-account" content="ca-pub-9505220977121599" />
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9505220977121599" crossorigin="anonymous"></script>`;

const SOURCES = {
  preview: ["Xbox Wire — four-hour hands-on preview", "https://news.xbox.com/en-us/2026/07/07/the-blood-of-dawnwalker-hands-on-preview/"],
  gameplay: ["Bandai Namco — Gameplay Reveal Recap", "https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-gameplay-reveal-recap"],
  world: ["Xbox Wire — the living world of Vale Sangora", "https://news.xbox.com/en-us/2026/04/30/the-blood-of-dawnwalker-world/"],
  coen: ["Bandai Namco — Community Bulletin: Coen's Roots", "https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-9-coens-roots"],
  vrakhiri: ["Bandai Namco — Community Bulletin: The Vrakhiri", "https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-1-vrakhiri-our-vampiric-masters"],
};

const UI = {
  es: {
    html: "es", schema: "es_ES", label: "Español", home: "Inicio en español",
    nav: ["Lanzamiento", "Jugabilidad", "Recorrido", "Historia", "Técnica"],
    verified: "Guía en español verificada con fuentes", quick: "Respuesta rápida",
    facts: "Datos confirmados", decision: "Cómo usar esta información",
    boundary: "Qué falta por comprobar", related: "Guías relacionadas",
    source: "Fuente principal", faq: "Preguntas frecuentes", hub: "Abrir el centro temático",
    common: "Esta guía separa deliberadamente los hechos mostrados por el estudio de las conclusiones que solo podrán comprobarse con la versión comercial. No convierte una escena de demostración en una ruta definitiva, no inventa cifras y no presupone que una solución sea válida en todos los estados del mundo.",
    extra: "Al planificar una partida, conviene registrar la forma diurna o nocturna de Coen, el coste de tiempo visible, los personajes que siguen disponibles y la reacción del entorno. Una misma mecánica puede producir una decisión distinta si cambia alguno de esos estados. Tras el lanzamiento se añadirán pasos reproducibles, valores y excepciones únicamente cuando puedan verificarse en juego o en notas oficiales.",
    openQ: "¿Qué detalles siguen abiertos?",
  },
  fr: {
    html: "fr", schema: "fr_FR", label: "Français", home: "Accueil français",
    nav: ["Sortie", "Gameplay", "Cheminement", "Histoire", "Technique"],
    verified: "Guide français vérifié par des sources", quick: "Réponse rapide",
    facts: "Faits confirmés", decision: "Comment utiliser ces informations",
    boundary: "Ce qui reste à vérifier", related: "Guides associés",
    source: "Source principale", faq: "Questions fréquentes", hub: "Ouvrir le dossier thématique",
    common: "Ce guide distingue volontairement les faits montrés par le studio des conclusions qui exigent la version commerciale. Il ne transforme pas une séquence de démonstration en cheminement définitif, n'invente aucune valeur et ne suppose pas qu'une solution fonctionne dans tous les états du monde.",
    extra: "Pour préparer une partie, notez la forme diurne ou nocturne de Coen, le coût temporel affiché, les personnages encore disponibles et la réaction de la région. Une même mécanique peut conduire à un choix différent dès qu'un de ces états change. Après la sortie, les étapes, valeurs et exceptions ne seront ajoutées que si elles sont reproductibles en jeu ou documentées dans une note officielle.",
    openQ: "Quels détails restent inconnus ?",
  },
  it: {
    html: "it", schema: "it_IT", label: "Italiano", home: "Home italiana",
    nav: ["Uscita", "Gameplay", "Soluzione", "Storia", "Tecnica"],
    verified: "Guida italiana verificata con fonti", quick: "Risposta rapida",
    facts: "Fatti confermati", decision: "Come usare queste informazioni",
    boundary: "Cosa resta da verificare", related: "Guide correlate",
    source: "Fonte principale", faq: "Domande frequenti", hub: "Apri l'hub tematico",
    common: "Questa guida separa intenzionalmente i fatti mostrati dallo studio dalle conclusioni che richiedono la versione commerciale. Non trasforma una scena dimostrativa in una soluzione definitiva, non inventa valori e non presume che una scelta funzioni in ogni stato del mondo.",
    extra: "Per pianificare una partita, registra la forma diurna o notturna di Coen, il costo temporale visibile, i personaggi ancora disponibili e la reazione dell'area. La stessa meccanica può richiedere una decisione diversa quando cambia uno di questi stati. Dopo l'uscita verranno aggiunti passaggi, valori ed eccezioni solo quando saranno riproducibili nel gioco o documentati da note ufficiali.",
    openQ: "Quali dettagli restano aperti?",
  },
  pl: {
    html: "pl", schema: "pl_PL", label: "Polski", home: "Polska strona główna",
    nav: ["Premiera", "Rozgrywka", "Opis przejścia", "Fabuła", "Technika"],
    verified: "Polski poradnik zweryfikowany źródłowo", quick: "Krótka odpowiedź",
    facts: "Potwierdzone informacje", decision: "Jak wykorzystać te informacje",
    boundary: "Co wymaga dalszego sprawdzenia", related: "Powiązane poradniki",
    source: "Główne źródło", faq: "Częste pytania", hub: "Otwórz centrum tematu",
    common: "Ten poradnik celowo oddziela fakty pokazane przez twórców od wniosków, które można sprawdzić dopiero w wersji sprzedażowej. Nie zamienia sceny demonstracyjnej w ostateczny opis przejścia, nie wymyśla wartości i nie zakłada, że jedno rozwiązanie działa w każdym stanie świata.",
    extra: "Podczas planowania rozgrywki warto zapisywać dzienną lub nocną postać Coena, widoczny koszt czasu, dostępność ważnych postaci oraz reakcję okolicy. Ta sama mechanika może prowadzić do innej decyzji po zmianie jednego z tych stanów. Po premierze kroki, wartości i wyjątki zostaną dodane tylko wtedy, gdy da się je powtórzyć w grze albo potwierdzić w oficjalnych informacjach.",
    openQ: "Które szczegóły pozostają nieznane?",
  },
};

const PAGES = {
  es: {
    "four-direction-combat": ["Combate en cuatro direcciones explicado", "Los ataques y defensas usan cuatro direcciones. El indicador del rival ayuda a leer el lado del golpe, por lo que la observación, el ritmo y la posición importan más que pulsar ataques sin control.", ["Las direcciones se aplican al ataque y a la defensa.", "Mantener el bloqueo protege, pero consume aguante.", "Una parada bien orientada es más eficiente y abre un contraataque.", "Los grupos aumentan la presión sobre cámara y selección de objetivo."], "Aprende primero los símbolos y secuencias de un tipo de enemigo. Contra varios rivales, conserva espacio y aguante antes de intentar parar cada golpe.", "Ventanas de parada, diferencias entre armas, búfer de entrada y modificadores de dificultad requieren pruebas finales.", "¿Cuántas direcciones de combate hay?", "Hay cuatro direcciones para atacar y responder a golpes.", "gameplay-guides", "preview"],
    "block-stamina-cost": ["Coste de aguante al bloquear", "Mantener el bloqueo es la defensa más segura, pero gasta aguante. Coen no puede permanecer protegido de forma pasiva sin asumir un coste.", ["Bloquear exige menos precisión que parar.", "El aguante limita la defensa continua.", "La parada y la colocación correctas ahorran recursos.", "El bloqueo omnidireccional reduce la lectura lateral, no todos los riesgos."], "Usa el bloqueo para aprender patrones nuevos y cambia a parada o evasión cuando reconozcas la secuencia. Reserva siempre aguante para una emergencia.", "Faltan los costes exactos, regeneración, rotura de guardia y bonificaciones de equipo.", "¿Bloquear consume aguante?", "Sí. Es más seguro, pero utiliza el recurso defensivo.", "gameplay-guides", "preview"],
    "shadowstep": ["Shadowstep: movimiento vampírico", "Shadowstep es una capacidad nocturna que permite a Coen desplazarse rápidamente hacia puntos válidos y alcanzar rutas alternativas.", ["Pertenece a la forma vampírica nocturna.", "Sirve para infiltración y desplazamiento, no solo para daño.", "Puede abrir entradas distintas para una misma misión.", "El ciclo día/noche cambia las opciones disponibles."], "Por la noche, revisa tejados, alturas y entradas ocultas antes de usar la puerta principal. Trátalo como herramienta de ruta, no como ataque invisible garantizado.", "Alcance, objetivos válidos, coste, detección e interrupción en combate siguen sin documentarse por completo.", "¿Puede Coen usar Shadowstep de día?", "La versión mostrada pertenece a su forma vampírica nocturna.", "gameplay-guides", "gameplay"],
    "wall-walking": ["Caminar por muros y rutas alternativas", "La forma vampírica de Coen puede usar movimiento sobrenatural sobre superficies verticales para alcanzar accesos que su forma humana no puede utilizar.", ["El movimiento vertical está ligado a poderes vampíricos.", "Los accesos según la forma apoyan soluciones abiertas.", "Una entrada nocturna puede cambiar el orden del encuentro.", "No todos los muros visibles son transitables."], "Busca superficies legibles, salientes y una salida segura. Antes de entrar, comprueba si un cambio de forma podría bloquear el regreso.", "Marcas, ángulos, costes y tipos exactos de superficie necesitan verificación.", "¿Puede Coen subir cualquier pared?", "No; las reglas completas de superficies válidas no están publicadas.", "gameplay-guides", "gameplay"],
    "infamy-system": ["Sistema de infamia y riesgos", "Atacar abiertamente operaciones de los Vrakhiri puede aumentar la infamia de Coen y atraer más atención del régimen.", ["Interrumpir transportes de sangre es un ejemplo confirmado.", "La infamia conecta rebelión visible y peligro creciente.", "Funciona junto a relaciones y consecuencias locales.", "Las soluciones discretas y abiertas pueden tener costes distintos."], "Compara indicadores, presencia enemiga y reacciones antes y después de acciones públicas. Si un objetivo admite una ruta discreta, una menor exposición puede tener más valor a largo plazo.", "Escala, umbrales, reducción, niveles de búsqueda y variaciones regionales siguen abiertos.", "¿Cómo aumenta la infamia?", "Puede subir al atacar abiertamente operaciones Vrakhiri, incluidos transportes de sangre.", "story-guides", "world"],
    "blood-convoys": ["Convoyes de sangre en Vale Sangora", "Los Vrakhiri almacenan y transportan sangre humana como recurso estratégico. Coen puede interrumpir esos convoyes, pero la acción puede aumentar su infamia.", ["La sangre forma parte del control político y económico.", "Los convoyes conectan recursos y actividades del mundo abierto.", "Atacarlos puede atraer más atención.", "La decisión no equivale a botín gratuito."], "Evalúa utilidad, guardias, salida y atención añadida antes de atacar. Una emboscada justo antes de otra misión puede volver peligrosa la zona.", "Rutas, horarios, reaparición, recompensas y repetibilidad requieren pruebas de lanzamiento.", "¿Qué transportan los convoyes?", "Transportan sangre humana para el régimen Vrakhiri.", "story-guides", "world"],
    "blacksmith-choice-consequence": ["Consecuencia de matar al herrero", "Un ejemplo oficial es directo: si Coen mata a un herrero local por oro, el acceso a su forja queda cerrado.", ["La elección cambia dinero inmediato por un servicio duradero.", "La supervivencia de NPC afecta funciones prácticas.", "No todo botín es reversible.", "El ejemplo resume el diseño reactivo del mundo."], "Antes de atacar a un comerciante con nombre, identifica su servicio, relaciones y posibles misiones. El oro puede recuperarse; una forja perdida quizá no.", "Otros herreros, reparaciones alternativas y consecuencias exactas aún deben cartografiarse.", "¿Se pierde la forja?", "El ejemplo oficial indica que deja de ser accesible tras la muerte del herrero.", "walkthrough-guides", "world"],
    "kill-npc-content-loss": ["¿Matar NPC puede eliminar contenido?", "Sí. La muerte de ciertos personajes puede retirar servicios, relaciones y partes importantes de contenido de una partida.", ["El mundo admite grandes desviaciones.", "Un herrero muerto puede cerrar su forja.", "No existe una ruta dorada que conserve todo.", "Las consecuencias forman parte del rol, no solo del castigo."], "Antes de atacar a una persona identificada, comprueba su función y conexiones. Decide de antemano si aceptarás consecuencias o usarás guardados separados.", "No debe inventarse una lista de NPC esenciales o inmortales sin pruebas de la versión final.", "¿Pueden perderse misiones por una muerte?", "Sí; se ha confirmado la posible pérdida de servicios y contenido amplio.", "walkthrough-guides", "preview"],
    "coen-family": ["La familia de Coen y el límite de 30 días", "Salvar a su familia del régimen vampírico es la motivación central de Coen, pero cada familiar tiene historia, reacción y función propias.", ["Coen es el hermano mayor.", "La familia sufre pobreza, minas de plata, peste y dominio Vrakhiri.", "Pieter, Esme y los hermanos menores reaccionan de forma distinta.", "Salvar a todos no implica completar cada ruta en una partida."], "Registra reacciones familiares después de decisiones importantes. Separa objetivos de rescate de escenas opcionales de relación y observa cambios de diálogo.", "Supervivencia, abandonos, finales y rutas exclusivas necesitan partidas completas como evidencia.", "¿Por qué tiene Coen 30 días?", "El plazo estructura su intento de salvar a la familia y priorizar acciones.", "story-guides", "coen"],
    "anca": ["Anca: hierbas, latín y magia de sangre", "Anca es la herbolaria de Laslea, contacto médico temprano y figura relacionada con el interés de Coen por el latín y conocimientos que van más allá de las hierbas.", ["Coen la visita al principio para obtener medicina.", "Dedicar tiempo adicional al latín compite con otras acciones.", "Su conocimiento parece superar la herboristería común.", "La química de una demo no confirma un romance completo."], "Decide si priorizas medicina rápida o tiempo de personaje. Registra las opciones de diálogo sin convertirlas en supuestos requisitos románticos o mágicos.", "Costes, banderas de romance, recompensas y su arco completo siguen sin confirmar.", "¿Anca es un romance?", "La presentación muestra cercanía, pero no confirma una ruta romántica completa.", "story-guides", "preview"],
    "brencis": ["Brencis, gobernante de Vale Sangora", "Brencis dirige el régimen Vrakhiri de Vale Sangora mediante tributo de sangre, rituales y control político.", ["Ocupa el centro del conflicto del primer juego.", "La Blood Mass obliga a adultos de Laslea a entregar sangre.", "Su biografía oficial lo vincula con un pasado romano antiguo.", "El conflicto con él tendrá un cierre propio en este juego."], "Distingue a Brencis como antagonista regional de la saga Dawnwalker más amplia. Reúne diálogos, símbolos y estados del mundo antes de fijar motivos o condiciones de jefe.", "Fases de jefe, debilidades, alianzas y finales no están publicados.", "¿Es Brencis el antagonista principal?", "Es el gobernante central y adversario del conflicto de Vale Sangora.", "story-guides", "vrakhiri"],
    "dynamic-weather": ["Clima dinámico y visibilidad", "Vale Sangora tiene clima dinámico. No es solo atmósfera: la niebla puede reducir la visibilidad y cambiar decisiones de exploración o combate.", ["Hay bosques, pantanos, montañas y asentamientos.", "El clima refuerza identidades regionales.", "El efecto de la niebla sobre la visibilidad está confirmado.", "No todo clima implica un modificador estadístico."], "Observa líneas de visión, detección y referencias de orientación cuando cambien las condiciones. No diseñes una ruta solo con capturas despejadas.", "Frecuencia, pronóstico, espera, daño y clima fijado por misión necesitan pruebas.", "¿El clima es solo visual?", "No. Como mínimo, la niebla afecta a la visibilidad.", "technical-guides", "world"],
  },
};

const HUB_COPY = {
  fr: {
    "release-guides": ["Guides de sortie et d'achat", "Comparez la date, les plateformes, les configurations et les éditions à partir des informations officielles."],
    "gameplay-guides": ["Systèmes de jeu et combat", "Comprenez le combat directionnel, les formes jour et nuit, la faim de sang et les déplacements vampiriques."],
    "walkthrough-guides": ["Choix et préparation du cheminement", "Préparez les décisions coûteuses en temps et les conséquences durables sans inventer un parcours unique."],
    "story-guides": ["Personnages, factions et monde", "Reliez Coen, sa famille, les Vrakhiri et Vale Sangora à des faits clairement sourcés."],
    "technical-guides": ["Technique, performances et accessibilité", "Vérifiez configuration PC, plateformes, visibilité et autres conditions techniques connues."],
  },
  it: {
    "release-guides": ["Guide all'uscita e all'acquisto", "Confronta data, piattaforme, requisiti ed edizioni usando informazioni ufficiali."],
    "gameplay-guides": ["Sistemi di gioco e combattimento", "Comprendi combattimento direzionale, forme diurne e notturne, fame di sangue e movimenti vampirici."],
    "walkthrough-guides": ["Scelte e pianificazione della soluzione", "Prepara decisioni con costo temporale e conseguenze durature senza inventare un unico percorso corretto."],
    "story-guides": ["Personaggi, fazioni e mondo", "Collega Coen, la sua famiglia, i Vrakhiri e Vale Sangora a fatti verificati."],
    "technical-guides": ["Tecnica, prestazioni e accessibilità", "Controlla requisiti PC, piattaforme, visibilità e condizioni tecniche note."],
  },
  pl: {
    "release-guides": ["Premiera i poradniki zakupowe", "Porównaj datę, platformy, wymagania oraz edycje na podstawie oficjalnych informacji."],
    "gameplay-guides": ["Systemy rozgrywki i walka", "Poznaj walkę kierunkową, postacie dnia i nocy, głód krwi oraz wampirzy ruch."],
    "walkthrough-guides": ["Wybory i planowanie przejścia", "Przygotuj decyzje kosztujące czas i trwałe konsekwencje bez wymyślania jednej poprawnej trasy."],
    "story-guides": ["Postacie, frakcje i świat", "Połącz Coena, jego rodzinę, Vrakhiri i Vale Sangora ze sprawdzonymi faktami."],
    "technical-guides": ["Technika, wydajność i dostępność", "Sprawdź wymagania PC, platformy, widoczność oraz znane warunki techniczne."],
  },
};

PAGES.fr = {
  "four-direction-combat": ["Combat à quatre directions expliqué", "Les attaques et les défenses utilisent quatre directions. L'indicateur adverse aide à lire le côté du coup : observation, rythme et placement comptent davantage qu'une succession d'attaques.", ["Les directions concernent attaque et défense.", "Maintenir la garde protège mais consomme de l'endurance.", "Une parade bien orientée ouvre une riposte.", "Les groupes augmentent la pression sur la caméra et le ciblage."], "Apprenez d'abord les symboles et séquences d'un type d'ennemi. Face à plusieurs adversaires, gardez de l'espace et de l'endurance avant de chercher chaque parade.", "Fenêtres de parade, différences d'armes, mémoire des commandes et difficulté exigent des tests finaux.", "Combien existe-t-il de directions ?", "Quatre directions organisent les attaques et la défense.", "gameplay-guides", "preview"],
  "block-stamina-cost": ["Coût d'endurance de la garde", "Maintenir la garde est sûr mais consomme de l'endurance. Coen ne peut donc pas rester indéfiniment derrière une défense passive.", ["La garde demande moins de précision que la parade.", "L'endurance limite la protection continue.", "Parade et placement économisent la ressource.", "La garde omnidirectionnelle ne supprime pas tous les risques."], "Employez la garde pour apprendre un motif inconnu, puis passez à la parade ou à l'esquive. Conservez toujours une réserve pour une attaque imprévue.", "Coûts exacts, régénération, rupture de garde et bonus d'équipement restent à mesurer.", "La garde consomme-t-elle de l'endurance ?", "Oui, elle utilise la ressource défensive.", "gameplay-guides", "preview"],
  "shadowstep": ["Shadowstep : déplacement vampirique", "Shadowstep est un pouvoir nocturne permettant à Coen de se déplacer rapidement vers des points valides et d'atteindre des itinéraires alternatifs.", ["Il appartient à la forme vampirique nocturne.", "Il sert à l'infiltration et au déplacement.", "Il peut ouvrir une autre entrée pour une même mission.", "Le cycle jour-nuit modifie les solutions disponibles."], "La nuit, examinez toits, hauteurs et passages cachés avant l'entrée principale. Considérez ce pouvoir comme un outil d'itinéraire, pas comme une attaque invisible garantie.", "Portée, cibles, coût, détection et interruption en combat restent à documenter.", "Coen peut-il utiliser Shadowstep le jour ?", "La version montrée appartient à sa forme vampirique nocturne.", "gameplay-guides", "gameplay"],
  "wall-walking": ["Marcher sur les murs et trouver d'autres accès", "La forme vampirique de Coen dispose de mouvements surnaturels sur des surfaces verticales, ouvrant des accès impossibles à sa forme humaine.", ["Le mouvement vertical dépend des pouvoirs vampiriques.", "Les accès propres à une forme soutiennent les solutions ouvertes.", "Une entrée nocturne peut changer l'ordre d'une rencontre.", "Tous les murs visibles ne sont pas praticables."], "Cherchez une surface lisible, des appuis et une sortie sûre. Vérifiez avant d'entrer qu'un changement de forme ne bloquera pas le retour.", "Marquages, angles, coûts et surfaces autorisées doivent être vérifiés.", "Coen peut-il gravir n'importe quel mur ?", "Non, les règles complètes des surfaces valides ne sont pas publiées.", "gameplay-guides", "gameplay"],
  "infamy-system": ["Système d'infamie et risques", "Attaquer ouvertement les opérations des Vrakhiri peut augmenter l'infamie de Coen et attirer davantage l'attention du régime.", ["Saboter un transport de sang est un exemple confirmé.", "L'infamie relie rébellion visible et danger croissant.", "Elle s'ajoute aux relations et conséquences locales.", "Discrétion et affrontement ouvert peuvent avoir des coûts différents."], "Comparez indicateurs, présence ennemie et réactions avant et après une action publique. Une solution discrète peut conserver plus d'options pour la suite.", "Échelle, seuils, réduction, niveaux de recherche et variations régionales restent inconnus.", "Comment l'infamie augmente-t-elle ?", "Elle peut augmenter lors d'attaques publiques contre les opérations Vrakhiri.", "story-guides", "world"],
  "blood-convoys": ["Convois de sang de Vale Sangora", "Les Vrakhiri stockent et transportent le sang humain comme ressource stratégique. Coen peut attaquer ces convois, au risque d'accroître son infamie.", ["Le sang sert au contrôle politique et économique.", "Les convois relient ressources et monde ouvert.", "Une attaque peut attirer l'attention.", "La décision ne correspond pas à un butin gratuit."], "Évaluez utilité, gardes, sortie et attention supplémentaire avant l'embuscade. Une attaque juste avant une mission importante peut rendre la région plus dangereuse.", "Itinéraires, horaires, réapparition, récompenses et répétabilité nécessitent la version finale.", "Que transportent les convois ?", "Du sang humain destiné au régime Vrakhiri.", "story-guides", "world"],
  "blacksmith-choice-consequence": ["Conséquence de la mort du forgeron", "Un exemple officiel est explicite : si Coen tue un forgeron local pour son or, sa forge devient inaccessible.", ["Le choix échange de l'argent immédiat contre un service durable.", "La survie des PNJ affecte les fonctions du monde.", "Tout butin n'est pas réversible.", "L'exemple illustre la réactivité du monde."], "Avant d'attaquer un marchand nommé, identifiez son service, ses relations et ses quêtes. L'or se remplace ; une forge fermée peut être définitive.", "Autres forgerons, réparations alternatives et conséquences précises restent à cartographier.", "Perd-on la forge ?", "L'exemple officiel indique qu'elle devient inaccessible après la mort du forgeron.", "walkthrough-guides", "world"],
  "kill-npc-content-loss": ["Tuer un PNJ peut-il supprimer du contenu ?", "Oui. La mort de certains personnages peut retirer services, relations et portions importantes de contenu d'une partie.", ["Le monde accepte de fortes divergences.", "Un forgeron mort peut fermer sa forge.", "Aucune route parfaite ne conserve tout.", "Les conséquences font partie du jeu de rôle."], "Avant d'attaquer une personne identifiée, vérifiez sa fonction et ses liens. Décidez si vous acceptez les conséquences ou conservez des sauvegardes séparées.", "Une liste de PNJ essentiels ou immortels ne doit pas être inventée sans la version finale.", "Peut-on perdre des quêtes après une mort ?", "Oui, la perte de services et de contenu important est confirmée.", "walkthrough-guides", "preview"],
  "coen-family": ["La famille de Coen et la limite de 30 jours", "Sauver sa famille du régime vampirique motive Coen, mais chaque proche possède sa propre histoire, sa réaction et sa fonction.", ["Coen est l'aîné.", "La famille subit pauvreté, mines d'argent, peste et domination Vrakhiri.", "Pieter, Esme et les plus jeunes réagissent différemment.", "Sauver la famille ne signifie pas achever toutes les routes."], "Notez les réactions familiales après chaque choix majeur. Séparez objectifs de sauvetage et scènes relationnelles facultatives, puis surveillez les dialogues.", "Survie, départs, fins et routes exclusives exigent des parties complètes comme preuves.", "Pourquoi Coen dispose-t-il de 30 jours ?", "Ce délai structure sa tentative de sauver sa famille et ses priorités.", "story-guides", "coen"],
  "anca": ["Anca : plantes, latin et magie du sang", "Anca est l'herboriste de Laslea, un contact médical précoce lié à l'intérêt de Coen pour le latin et à des connaissances dépassant les simples plantes.", ["Coen la consulte tôt pour obtenir un remède.", "Consacrer du temps au latin concurrence d'autres actions.", "Son savoir dépasse l'herboristerie ordinaire.", "Une proximité en démonstration ne confirme pas une romance."], "Choisissez consciemment entre un remède rapide et du temps consacré au personnage. Notez les dialogues sans en déduire des conditions romantiques ou magiques.", "Coûts, drapeaux de romance, récompenses et arc complet restent inconnus.", "Anca est-elle une romance ?", "La présentation suggère une proximité, sans confirmer une route complète.", "story-guides", "preview"],
  "brencis": ["Brencis, dirigeant de Vale Sangora", "Brencis dirige le régime Vrakhiri de Vale Sangora au moyen du tribut de sang, de rites et d'un contrôle politique.", ["Il est au centre du conflit du premier jeu.", "La Blood Mass force les adultes de Laslea à donner leur sang.", "Sa biographie renvoie à la Rome antique.", "Son conflit doit recevoir une conclusion dans ce jeu."], "Distinguez Brencis, antagoniste régional, de la saga Dawnwalker plus large. Rassemblez dialogues, symboles et états du monde avant de fixer ses motivations.", "Phases de combat, faiblesses, alliances et fins ne sont pas publiées.", "Brencis est-il l'antagoniste principal ?", "Il est le dirigeant central et l'adversaire du conflit de Vale Sangora.", "story-guides", "vrakhiri"],
  "dynamic-weather": ["Météo dynamique et visibilité", "Vale Sangora possède une météo dynamique. Le brouillard peut réduire la visibilité et modifier les décisions d'exploration ou de combat.", ["Forêts, marais, montagnes et villages ont des ambiances distinctes.", "La météo renforce l'identité des régions.", "L'effet du brouillard sur la visibilité est confirmé.", "Chaque météo n'est pas forcément un modificateur statistique."], "Observez lignes de vue, détection et repères lorsque les conditions changent. Ne préparez pas un trajet uniquement à partir d'images dégagées.", "Fréquence, prévision, attente, dégâts et météo de mission restent à tester.", "La météo est-elle seulement visuelle ?", "Non. Au minimum, le brouillard affecte la visibilité.", "technical-guides", "world"],
};

PAGES.it = JSON.parse(JSON.stringify(PAGES.fr));
const IT = [
  ["four-direction-combat","Combattimento a quattro direzioni","Attacchi e difese usano quattro direzioni. L'indicatore del nemico aiuta a leggere il lato del colpo: osservazione, ritmo e posizione contano più della pressione casuale dei tasti.","Quante direzioni di combattimento ci sono?","Quattro direzioni regolano attacchi e difesa."],
  ["block-stamina-cost","Costo in resistenza della parata","Mantenere la guardia è sicuro ma consuma resistenza, quindi Coen non può restare protetto passivamente senza limiti.","La guardia consuma resistenza?","Sì, utilizza la risorsa difensiva."],
  ["shadowstep","Shadowstep: movimento vampirico","Shadowstep è un potere notturno che permette a Coen di spostarsi rapidamente verso punti validi e raggiungere percorsi alternativi.","Coen può usare Shadowstep di giorno?","La versione mostrata appartiene alla forma vampirica notturna."],
  ["wall-walking","Camminare sui muri e accessi alternativi","La forma vampirica di Coen usa movimenti soprannaturali su superfici verticali, aprendo accessi non disponibili alla forma umana.","Coen può scalare ogni muro?","No, le regole complete delle superfici valide non sono state pubblicate."],
  ["infamy-system","Sistema di infamia e rischi","Attaccare apertamente le operazioni dei Vrakhiri può aumentare l'infamia di Coen e attirare maggiore attenzione dal regime.","Come aumenta l'infamia?","Può aumentare durante attacchi pubblici alle operazioni Vrakhiri."],
  ["blood-convoys","Convogli di sangue di Vale Sangora","I Vrakhiri conservano e trasportano sangue umano come risorsa strategica. Coen può colpire i convogli, rischiando di aumentare l'infamia.","Cosa trasportano i convogli?","Sangue umano destinato al regime Vrakhiri."],
  ["blacksmith-choice-consequence","Conseguenza della morte del fabbro","Un esempio ufficiale è chiaro: se Coen uccide un fabbro locale per l'oro, la sua fucina diventa inaccessibile.","Si perde la fucina?","L'esempio ufficiale dice che diventa inaccessibile dopo la morte del fabbro."],
  ["kill-npc-content-loss","Uccidere un PNG può rimuovere contenuti?","Sì. La morte di alcuni personaggi può eliminare servizi, relazioni e parti importanti dei contenuti di una partita.","Si possono perdere missioni dopo una morte?","Sì, è confermata la possibile perdita di servizi e contenuti."],
  ["coen-family","La famiglia di Coen e il limite di 30 giorni","Salvare la famiglia dal regime vampirico è la motivazione centrale di Coen, ma ogni familiare possiede una storia, una reazione e un ruolo distinti.","Perché Coen ha 30 giorni?","Il limite struttura il tentativo di salvare la famiglia e scegliere le priorità."],
  ["anca","Anca: erbe, latino e magia del sangue","Anca è l'erborista di Laslea, un contatto medico iniziale legato all'interesse di Coen per il latino e a conoscenze oltre le semplici erbe.","Anca è un'opzione romantica?","La presentazione mostra vicinanza, ma non conferma un percorso completo."],
  ["brencis","Brencis, sovrano di Vale Sangora","Brencis guida il regime Vrakhiri di Vale Sangora tramite tributi di sangue, rituali e controllo politico.","Brencis è l'antagonista principale?","È il sovrano centrale e l'avversario del conflitto di Vale Sangora."],
  ["dynamic-weather","Meteo dinamico e visibilità","Vale Sangora ha un meteo dinamico. La nebbia può ridurre la visibilità e cambiare le decisioni di esplorazione o combattimento.","Il meteo è solo visivo?","No. Almeno la nebbia influenza la visibilità."],
];
for (const [route,title,quick,q,a] of IT) {
  const base = PAGES.it[route];
  base[0]=title; base[1]=quick; base[5]=q; base[6]=a;
  base[2]=[
    "La funzione è stata mostrata o descritta in una fonte ufficiale.",
    "Il suo effetto dipende dallo stato del mondo e dalle scelte del giocatore.",
    "Una dimostrazione non conferma tutti i valori o le eccezioni.",
    "La guida distingue i fatti verificati dalle parti ancora aperte.",
  ];
  base[3]="Prima di agire, controlla forma di Coen, costo temporale, personaggi coinvolti e possibile via di uscita. Conserva risorse e opzioni quando la conseguenza può essere permanente.";
  base[4]="Valori esatti, soglie, eccezioni e interazioni complete richiedono test riproducibili nella versione finale.";
}

PAGES.pl = JSON.parse(JSON.stringify(PAGES.fr));
const PL = [
  ["four-direction-combat","Walka w czterech kierunkach","Ataki i obrona korzystają z czterech kierunków. Wskaźnik przeciwnika pomaga odczytać stronę ciosu, dlatego obserwacja, rytm i pozycja są ważniejsze od przypadkowego atakowania.","Ile jest kierunków walki?","Cztery kierunki sterują atakiem i obroną."],
  ["block-stamina-cost","Koszt wytrzymałości podczas bloku","Trzymanie bloku jest bezpieczne, ale zużywa wytrzymałość. Coen nie może więc bez końca pozostawać za pasywną osłoną.","Czy blok zużywa wytrzymałość?","Tak, wykorzystuje zasób obronny."],
  ["shadowstep","Shadowstep: wampirzy ruch","Shadowstep to nocna zdolność pozwalająca Coenowi szybko przemieszczać się do właściwych punktów i docierać alternatywnymi trasami.","Czy Coen używa Shadowstep w dzień?","Pokazana wersja należy do nocnej postaci wampira."],
  ["wall-walking","Chodzenie po ścianach i inne wejścia","Wampirza postać Coena korzysta z nadnaturalnego ruchu po pionowych powierzchniach, docierając do przejść niedostępnych dla człowieka.","Czy Coen wejdzie na każdą ścianę?","Nie, pełne zasady właściwych powierzchni nie są opublikowane."],
  ["infamy-system","System niesławy i ryzyko","Otwarte atakowanie działań Vrakhiri może zwiększyć niesławę Coena i przyciągnąć większą uwagę reżimu.","Jak rośnie niesława?","Może rosnąć po publicznych atakach na działania Vrakhiri."],
  ["blood-convoys","Konwoje krwi w Vale Sangora","Vrakhiri magazynują i przewożą ludzką krew jako strategiczny zasób. Coen może atakować konwoje, ryzykując wzrost niesławy.","Co przewożą konwoje?","Ludzką krew przeznaczoną dla reżimu Vrakhiri."],
  ["blacksmith-choice-consequence","Skutek zabicia kowala","Oficjalny przykład jest jasny: jeśli Coen zabije miejscowego kowala dla złota, jego kuźnia staje się niedostępna.","Czy traci się kuźnię?","Według oficjalnego przykładu po śmierci kowala nie można z niej korzystać."],
  ["kill-npc-content-loss","Czy zabicie NPC usuwa zawartość?","Tak. Śmierć niektórych postaci może odebrać usługi, relacje oraz dużą część zawartości danego przejścia.","Czy przez śmierć NPC można stracić zadania?","Tak, potwierdzono możliwość utraty usług i rozbudowanej zawartości."],
  ["coen-family","Rodzina Coena i limit 30 dni","Ratowanie rodziny spod władzy wampirów jest główną motywacją Coena, lecz każdy krewny ma własną historię, reakcje i rolę.","Dlaczego Coen ma 30 dni?","Termin porządkuje próbę ratowania rodziny i wybór priorytetów."],
  ["anca","Anca: zioła, łacina i magia krwi","Anca jest zielarką z Laslea, wczesnym kontaktem medycznym związanym z zainteresowaniem Coena łaciną oraz wiedzą wykraczającą poza zwykłe zioła.","Czy Anca jest opcją romansową?","Prezentacja pokazuje bliskość, ale nie potwierdza pełnej ścieżki romansu."],
  ["brencis","Brencis, władca Vale Sangora","Brencis kieruje reżimem Vrakhiri w Vale Sangora poprzez daninę krwi, rytuały i kontrolę polityczną.","Czy Brencis jest głównym przeciwnikiem?","Jest centralnym władcą i przeciwnikiem konfliktu w Vale Sangora."],
  ["dynamic-weather","Dynamiczna pogoda i widoczność","Vale Sangora ma dynamiczną pogodę. Mgła może ograniczać widoczność oraz zmieniać decyzje podczas eksploracji i walki.","Czy pogoda jest wyłącznie wizualna?","Nie. Co najmniej mgła wpływa na widoczność."],
];
for (const [route,title,quick,q,a] of PL) {
  const base=PAGES.pl[route];
  base[0]=title; base[1]=quick; base[5]=q; base[6]=a;
  base[2]=[
    "Funkcja została pokazana lub opisana w oficjalnym źródle.",
    "Jej skutek zależy od stanu świata i decyzji gracza.",
    "Prezentacja nie potwierdza wszystkich wartości ani wyjątków.",
    "Poradnik oddziela zweryfikowane fakty od otwartych pytań.",
  ];
  base[3]="Przed działaniem sprawdź postać Coena, koszt czasu, zaangażowane osoby i drogę odwrotu. Zachowaj zasoby oraz alternatywy, gdy skutek może być trwały.";
  base[4]="Dokładne wartości, progi, wyjątki i pełne interakcje wymagają powtarzalnych testów w wersji sprzedażowej.";
}

function esc(value) {
  return String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
}
function url(locale, route) { return `${SITE}/${locale}/${route}/`; }
function altTags(route) {
  const available = [["", "en"], ["de", "de"], ["es", "es"], ["fr", "fr"], ["it", "it"], ["pl", "pl"], ["ja", "ja"]];
  return available.map(([folder,lang]) => `<link rel="alternate" hreflang="${lang}" href="${SITE}/${folder ? `${folder}/` : ""}${route}/" />`).join("") +
    `<link rel="alternate" hreflang="x-default" href="${SITE}/${route}/" />`;
}
function menu(locale, route) {
  const links = ALL_LANGUAGES.map(([folder,lang,label]) => {
    const same = ["","de","es","fr","it","pl","ja"].includes(folder);
    const href = `${SITE}/${folder ? `${folder}/` : ""}${same ? `${route}/` : ""}`;
    return `<a href="${href}" lang="${lang}"${folder===locale?' aria-current="page"':""}>${label}</a>`;
  }).join("");
  return `<!-- LANG-DROPDOWN:START --><details class="language-menu"><summary aria-label="Select language">🌐 ${UI[locale].label}</summary><div class="language-options">${links}</div></details><!-- LANG-DROPDOWN:END -->`;
}
function article(locale, route, page) {
  const l=UI[locale];
  const [title,quick,facts,decision,boundary,q,a,hub,sourceKey]=page;
  const canonical=url(locale,route);
  const description=`${quick} ${l.facts}, ${l.decision.toLowerCase()} y límites de verificación.`.replace(" y "," / ");
  const faq=[[q,a],[l.openQ,boundary]];
  const schema={"@context":"https://schema.org","@graph":[
    {"@type":"WebPage",name:title,description,url:canonical,inLanguage:l.html,dateModified:DATE,isPartOf:{"@type":"WebSite",name:"The Blood of Dawnwalker Wiki",url:SITE+"/"},breadcrumb:{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:l.home,item:`${SITE}/${locale}/`},{"@type":"ListItem",position:2,name:title,item:canonical}]}},
    {"@type":"FAQPage",mainEntity:faq.map(([fq,fa])=>({"@type":"Question",name:fq,acceptedAnswer:{"@type":"Answer",text:fa}}))}
  ]};
  const related=Object.entries(PAGES[locale]).filter(([r,p])=>r!==route&&p[7]===hub).slice(0,4);
  const source=SOURCES[sourceKey];
  return `<!doctype html><html lang="${l.html}"><head>${ADS}<meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(title)} | The Blood of Dawnwalker Wiki</title><meta name="description" content="${esc(description)}" /><meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${canonical}" />${altTags(route)}<meta property="og:type" content="article" /><meta property="og:site_name" content="The Blood of Dawnwalker Wiki" /><meta property="og:title" content="${esc(title)}" /><meta property="og:description" content="${esc(description)}" /><meta property="og:url" content="${canonical}" /><meta property="og:locale" content="${l.schema}" />
  <link rel="stylesheet" href="../../styles.css" /><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body>
  <header class="site-header"><a class="brand" href="../"><span class="brand-mark">BD</span><span><strong>The Blood of Dawnwalker</strong><small>${l.label}</small></span></a><nav aria-label="Main navigation"><a href="../release-guides/">${l.nav[0]}</a><a href="../gameplay-guides/">${l.nav[1]}</a><a href="../walkthrough-guides/">${l.nav[2]}</a><a href="../story-guides/">${l.nav[3]}</a><a href="../technical-guides/">${l.nav[4]}</a>${menu(locale,route)}</nav></header>
  <main class="article-main"><section class="article-hero"><div><p class="eyebrow">${l.verified}</p><h1>${title}</h1><p class="hero-copy">${description}</p><div class="article-meta"><span class="tag confirmed">${DATE}</span><span class="tag confirmed">${source[0]}</span></div></div></section>
  <div class="article-body"><article class="article-content"><section class="verification-box"><h2>${l.quick}</h2><p><strong>${quick}</strong></p></section>
  <section><h2>${l.facts}</h2><ul>${facts.map(x=>`<li>${x}</li>`).join("")}</ul></section>
  <section><h2>${l.decision}</h2><p>${decision}</p><p>${l.extra}</p></section>
  <section><h2>${l.boundary}</h2><p>${boundary}</p><p>${l.common}</p></section>
  <section><h2>${l.related}</h2><div class="related-grid"><a href="../${hub}/"><strong>${l.hub}</strong><span>${l.related}</span></a>${related.map(([r,p])=>`<a href="../${r}/"><strong>${p[0]}</strong><span>${p[1]}</span></a>`).join("")}</div></section>
  <section><h2>${l.source}</h2><ul><li><a href="${source[1]}" target="_blank" rel="noreferrer">${source[0]}</a></li></ul></section>
  <section id="page-faq"><h2>${l.faq}</h2><dl class="faq-list">${faq.map(([fq,fa])=>`<div><dt>${fq}</dt><dd>${fa}</dd></div>`).join("")}</dl></section></article>
  <aside class="article-aside"><h2>${l.quick}</h2><p>${quick}</p><a href="../">${l.home}</a><a href="../${hub}/">${l.hub}</a>${related.slice(0,3).map(([r,p])=>`<a href="../${r}/">${p[0]}</a>`).join("")}</aside></div></main>
  <footer class="site-footer"><p>${l.verified}. ${l.common}</p></footer></body></html>`;
}
function hubPage(locale, route, copy) {
  const l=UI[locale];
  const [title,intro]=copy;
  const canonical=url(locale,route);
  const cards=Object.entries(PAGES[locale]).filter(([,p])=>p[7]===route);
  const schema={"@context":"https://schema.org","@type":"CollectionPage",name:title,description:intro,url:canonical,inLanguage:l.html,dateModified:DATE,isPartOf:{"@type":"WebSite",name:"The Blood of Dawnwalker Wiki",url:SITE+"/"}};
  return `<!doctype html><html lang="${l.html}"><head>${ADS}<meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(title)} | The Blood of Dawnwalker Wiki</title><meta name="description" content="${esc(intro)}" /><meta name="robots" content="index, follow, max-image-preview:large" /><link rel="canonical" href="${canonical}" />${altTags(route)}
  <meta property="og:type" content="website" /><meta property="og:site_name" content="The Blood of Dawnwalker Wiki" /><meta property="og:title" content="${esc(title)}" /><meta property="og:description" content="${esc(intro)}" /><meta property="og:url" content="${canonical}" /><link rel="stylesheet" href="../../styles.css" /><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body>
  <header class="site-header"><a class="brand" href="../"><span class="brand-mark">BD</span><span><strong>The Blood of Dawnwalker</strong><small>${l.label}</small></span></a><nav aria-label="Main navigation"><a href="../release-guides/">${l.nav[0]}</a><a href="../gameplay-guides/">${l.nav[1]}</a><a href="../walkthrough-guides/">${l.nav[2]}</a><a href="../story-guides/">${l.nav[3]}</a><a href="../technical-guides/">${l.nav[4]}</a>${menu(locale,route)}</nav></header>
  <main class="article-main"><section class="article-hero"><div><p class="eyebrow">${l.verified}</p><h1>${title}</h1><p class="hero-copy">${intro}</p><div class="article-meta"><span class="tag confirmed">${DATE}</span><span class="tag confirmed">${cards.length} guides</span></div></div></section>
  <div class="article-body"><article class="article-content"><section class="verification-box"><h2>${l.quick}</h2><p><strong>${intro}</strong></p></section>
  <section><h2>${l.related}</h2><div class="related-grid">${cards.map(([r,p])=>`<a href="../${r}/"><strong>${p[0]}</strong><span>${p[1]}</span></a>`).join("")}</div></section>
  <section><h2>${l.decision}</h2><p>${l.extra}</p><p>${l.common}</p></section>
  <section id="page-faq"><h2>${l.faq}</h2><dl class="faq-list"><div><dt>${l.openQ}</dt><dd>${l.common}</dd></div></dl></section></article>
  <aside class="article-aside"><h2>${l.related}</h2><a href="../">${l.home}</a>${cards.slice(0,5).map(([r,p])=>`<a href="../${r}/">${p[0]}</a>`).join("")}</aside></div></main>
  <footer class="site-footer"><p>${l.verified}. ${l.common}</p></footer></body></html>`;
}
function addSitemap(file, value) {
  let xml=fs.readFileSync(file,"utf8");
  if (!xml.includes(`<loc>${value}</loc>`)) {
    xml=xml.replace("</urlset>",`  <url><loc>${value}</loc><lastmod>${DATE}</lastmod><changefreq>weekly</changefreq><priority>0.72</priority></url>\n</urlset>`);
    fs.writeFileSync(file,xml);
  }
}
function addAlternate(file, lang, href) {
  let html=fs.readFileSync(file,"utf8");
  const pattern=new RegExp(`<link rel="alternate" hreflang="${lang}" href="[^"]+" ?\\/>`);
  const tag=`<link rel="alternate" hreflang="${lang}" href="${href}" />`;
  if (pattern.test(html)) html=html.replace(pattern,tag);
  else if (/<link rel="alternate" hreflang="x-default"/.test(html)) html=html.replace(/<link rel="alternate" hreflang="x-default"/,`${tag}<link rel="alternate" hreflang="x-default"`);
  else html=html.replace("</head>",`${tag}</head>`);
  fs.writeFileSync(file,html);
}

for (const locale of LOCALES) {
  for (const [route,page] of Object.entries(PAGES[locale])) {
    const dir=path.join(ROOT,locale,route);
    fs.mkdirSync(dir,{recursive:true});
    fs.writeFileSync(path.join(dir,"index.html"),article(locale,route,page));
    addSitemap(path.join(ROOT,`sitemap-${locale}.xml`),url(locale,route));
    addSitemap(path.join(ROOT,"sitemap.xml"),url(locale,route));
    for (const [folder,lang] of [["","en"],["de","de"],["es","es-ES"],["fr","fr"],["it","it"],["pl","pl"],["ja","ja"]]) {
      const target=path.join(ROOT,folder,route,"index.html");
      if (fs.existsSync(target)) addAlternate(target,UI[locale].html,url(locale,route));
    }
  }
  if (HUB_COPY[locale]) {
    for (const [hub,copy] of Object.entries(HUB_COPY[locale])) {
      const dir=path.join(ROOT,locale,hub);
      fs.mkdirSync(dir,{recursive:true});
      fs.writeFileSync(path.join(dir,"index.html"),hubPage(locale,hub,copy));
      addSitemap(path.join(ROOT,`sitemap-${locale}.xml`),url(locale,hub));
      addSitemap(path.join(ROOT,"sitemap.xml"),url(locale,hub));
      for (const [folder] of [[""],["de"],["es"],["fr"],["it"],["pl"],["ja"]]) {
        const target=path.join(ROOT,folder,hub,"index.html");
        if (fs.existsSync(target)) addAlternate(target,UI[locale].html,url(locale,hub));
      }
    }
  }
  const homeFile=path.join(ROOT,locale,"index.html");
  let home=fs.readFileSync(homeFile,"utf8");
  const marker=`<!-- ROUND20-${locale.toUpperCase()}-DEEP-DIVES -->`;
  if (!home.includes(marker)) {
    const cards=Object.entries(PAGES[locale]).map(([route,p])=>`<a class="guide-card" href="./${route}/"><span class="tag confirmed">${UI[locale].verified}</span><h3>${p[0]}</h3><p>${p[1]}</p></a>`).join("");
    const section=`${marker}<section><div class="section-heading"><p class="eyebrow">${UI[locale].verified}</p><h2>${UI[locale].related}</h2><p>${UI[locale].common}</p></div><div class="guide-grid">${cards}</div></section>`;
    home=home.replace("</main>",`${section}</main>`);
    fs.writeFileSync(homeFile,home);
  }
}

const manifest={
  generatedAt:DATE,round:20,locales:LOCALES,
  routes:Object.keys(PAGES.es),
  newIndexableUrls:LOCALES.length*Object.keys(PAGES.es).length+Object.values(HUB_COPY).reduce((n,x)=>n+Object.keys(x).length,0),
  styleContract:["site-header","article-main","article-hero","article-body","article-content","article-aside","verification-box","related-grid","faq-list","site-footer"],
};
fs.writeFileSync(path.join(ROOT,"ROUND_20_URL_MANIFEST.json"),JSON.stringify(manifest,null,2)+"\n");
console.log(JSON.stringify(manifest,null,2));
