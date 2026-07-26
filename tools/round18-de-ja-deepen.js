const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://bloodofdawnwalker.cc";
const DATE = "2026-07-26";
const ADS = `<meta name="google-adsense-account" content="ca-pub-9505220977121599" />
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9505220977121599" crossorigin="anonymous"></script>`;

const languages = [
  ["", "en", "English"], ["de", "de", "Deutsch"], ["es", "es-ES", "Español (España)"],
  ["fr", "fr", "Français"], ["it", "it", "Italiano"], ["pl", "pl", "Polski"],
  ["zh-hans", "zh-Hans", "简体中文"], ["zh-hant", "zh-Hant", "繁體中文"],
  ["ja", "ja", "日本語"], ["ko", "ko", "한국어"], ["cs", "cs", "Čeština"],
  ["hu", "hu", "Magyar"], ["pt-br", "pt-BR", "Português (Brasil)"],
  ["es-419", "es-419", "Español (Latinoamérica)"], ["tr", "tr", "Türkçe"],
];

const sources = {
  combat: ["Bandai Namco — Gameplay Reveal Recap", "https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-gameplay-reveal-recap"],
  preview: ["Xbox Wire — Four-hour hands-on preview", "https://news.xbox.com/en-us/2026/07/07/the-blood-of-dawnwalker-hands-on-preview/"],
  time: ["PlayStation Blog — Time-driven quest system", "https://blog.playstation.com/2026/07/07/the-blood-of-dawnwalker-unique-time-driven-quest-system-and-player-choice-detailed/"],
  news: ["Bandai Namco — Official Dawnwalker news", "https://en.bandainamcoent.eu/dawnwalker/news"],
  editions: ["Bandai Namco — Editions and PC requirements", "https://en.bandainamcoent.eu/dawnwalker/the-blood-of-dawnwalker/shop-now"],
};

const content = {
  de: {
    htmlLang: "de", schemaLocale: "de_DE", label: "Deutsch", home: "Deutsche Startseite",
    ui: {
      quick: "Kurzantwort", facts: "Was offiziell bestätigt ist", use: "Bedeutung für Spieler",
      boundary: "Prüfgrenze", sources: "Primärquellen", related: "Passende deutsche Guides",
      faq: "Häufige Fragen", verified: "Quellengeprüfter Guide", updated: "Geprüft am 26. Juli 2026",
    },
    commonBoundary: "Die öffentlich gezeigten Fassungen stammen aus Vorschauen und Entwicklungs-Builds. Exakte Werte, vollständige Fundorte, endgültige Balance und alle Konsequenzen werden deshalb erst ergänzt, wenn sie in der veröffentlichten Version reproduzierbar geprüft oder in offiziellen Patch Notes dokumentiert sind.",
    pages: {
      "activation-charges": {
        title: "Aktivierungsladungen: Aufbau und Einsatz im Kampf",
        desc: "So funktionieren Aktivierungsladungen als Ressource für Fähigkeiten, welche Aktionen sie aufbauen und welche Zahlen noch nicht bestätigt sind.",
        quick: "Aktivierungsladungen sind die Ressource für aktive Fähigkeiten. Coen baut sie durch erfolgreiche Kampfaktionen auf und gibt sie für stärkere Techniken aus; dadurch gehören Timing und Ressourcenplanung zum Richtungskampf.",
        facts: ["Angriffe und andere erfolgreiche Kampfhandlungen können Ladungen erzeugen.", "Aktive Fähigkeiten verbrauchen die angesammelte Ressource statt jederzeit kostenlos verfügbar zu sein.", "Das System gilt für den Echtzeitkampf und ergänzt Angriffsrichtung, Verteidigung und Ausdauer.", "Offizielle Aufnahmen bestätigen die Grundfunktion, aber keine endgültige Ladungsrate je Waffe."],
        use: "Spare Ladungen nicht automatisch bis zum Kampfende. Gegen gefährliche Gegner kann eine früh eingesetzte Fähigkeit das Tempo kontrollieren; gegen schwache Ziele ist es sinnvoller, die Ressource für die nächste Begegnung aufzubauen. Beobachte außerdem, ob unterschiedliche Waffen oder Trefferarten den Aufbau verändern.",
        boundary: "Maximum, Verfall, Kosten einzelner Skills und mögliche Boni der drei Fähigkeitsbäume sind noch nicht vollständig veröffentlicht. Zahlen aus Vorschauvideos sind keine belastbare Balancing-Tabelle.",
        faq: [["Wofür werden Aktivierungsladungen genutzt?", "Für aktive Kampffähigkeiten, die nach dem Aufbau der Ressource ausgelöst werden."], ["Verfallen Ladungen außerhalb des Kampfes?", "Dazu gibt es noch keine bestätigte Regel für die finale Version."]], source: "combat", hub: "gameplay-guides",
      },
      "parry": {
        title: "Parieren: Richtung, Timing und Unterschied zum Blocken",
        desc: "Der deutsche Guide erklärt Richtungspare, normales Blocken, Omni-Block und warum finale Parierfenster erst nach Release messbar sind.",
        quick: "Eine Parade verlangt, dass Coen die Angriffsrichtung liest und im passenden Moment in derselben Richtung verteidigt. Sie ist präziser als dauerhaftes Blocken und soll Ressourcen sparen beziehungsweise ein Gegenangriffsfenster schaffen.",
        facts: ["Gegnerische Angriffe zeigen eine Richtung an, auf die der Spieler reagieren kann.", "Normales Blocken ist sicherer, verbraucht aber die für die Verteidigung relevante Ressource.", "Eine korrekte Richtungsparade belohnt präzise Eingabe und Timing.", "Omni-Block reduziert den Richtungsaufwand, ist aber weder automatische Parade noch Unverwundbarkeit."],
        use: "Lerne neue Gegner zunächst mit sicherem Blocken und wechsle erst nach erkennbarem Animationsrhythmus zur Parade. Übe nicht nur die Zeit, sondern auch die Richtung: Ein perfekt getimter Knopfdruck hilft nicht, wenn die Abwehrseite falsch gewählt ist. Gegen Gruppen bleibt Positionierung genauso wichtig wie Reaktion.",
        boundary: "Das genaue Eingabefenster, Folgen einer perfekten Parade, Schwierigkeitsmodifikatoren und Unterschiede zwischen Waffen müssen im Retail-Build gemessen werden.",
        faq: [["Ist Parieren dasselbe wie Blocken?", "Nein. Blocken ist die sicherere Dauerdeckung; Parieren verlangt Richtung und Timing."], ["Pariert Omni-Block automatisch?", "Nein. Die Option reduziert Richtungsanforderungen, garantiert aber keine perfekte Parade."]], source: "preview", hub: "gameplay-guides",
      },
      "three-skill-trees": {
        title: "Die drei Fähigkeitsbäume von Coen erklärt",
        desc: "Überblick über Schwertkampf, Hex-Magie und Vampirfähigkeiten sowie die sichere Planung vor Veröffentlichung aller Skills.",
        quick: "Coens Fortschritt verteilt sich auf drei klar unterscheidbare Bereiche: menschlicher Schwertkampf, durch Runen erzeugte Hex-Magie und vampirische Kräfte. Die Zweige unterstützen verschiedene Lösungen, statt nur denselben Schaden anders zu benennen.",
        facts: ["Menschliche Kampftechniken orientieren sich an bewaffnetem Nahkampf und Richtungseingaben.", "Hexes werden über in die Haut geritzte Runen mit Coens Blut gewirkt.", "Vampirfähigkeiten umfassen übernatürliche Bewegung, Klauen, Beißen und körperliche Kraft.", "Tag und Nacht bestimmen, welche Form und damit welche Werkzeuge verfügbar sind."],
        use: "Plane Builds nach Problemsituationen: Duell und Verteidigung, Kontrolle oder Zugang zu schwer erreichbaren Orten. Da Aufgaben mehrere Lösungen zulassen, kann ein Bewegungs- oder Dialogvorteil wertvoller sein als ein kleiner Schadensbonus. Verteile Punkte erst dann strikt, wenn Respec-Regeln bekannt sind.",
        boundary: "Vollständige Skillnamen, Voraussetzungen, Kosten, Maximalstufen und Zurücksetzen der Punkte sind nicht komplett veröffentlicht. Deshalb enthält der Guide noch keine erfundene Meta-Tierlist.",
        faq: [["Welche drei Skillrichtungen gibt es?", "Schwertkampf, Hex-Magie und vampirische Fähigkeiten."], ["Ist ein vollständiger Build vor Release planbar?", "Nein, weil Skillkosten, Voraussetzungen und Respec-Regeln noch fehlen."]], source: "combat", hub: "gameplay-guides",
      },
      "fast-travel": {
        title: "Schnellreise und sichere Routenplanung",
        desc: "Was über Schnellreise in Vale Sangora bestätigt ist und wie Tageszeit, Fähigkeiten und Zeitkosten bei der Routenwahl zusammenhängen.",
        quick: "Vale Sangora unterstützt Reisen zwischen wichtigen Bereichen, doch die vollständigen Schnellreisepunkte und Freischaltregeln sind noch nicht dokumentiert. Normale Erkundung verbraucht den 30-Tage-Zeitraum nicht automatisch.",
        facts: ["Freie Erkundung lässt die erzählerische Frist nicht in Echtzeit ablaufen.", "Zeit wird durch klar markierte bedeutende Aktionen mit Sanduhrkosten verbraucht.", "Tag- und Nachtform verändern Bewegungsoptionen und mögliche Zugänge.", "Bekannte Orte umfassen Laslea, Svartrau, Howling Keep und Shrike’s Crag."],
        use: "Wähle eine Route nach Form und Ziel, nicht nur nach Luftlinie. Bei Nacht können Shadowstep oder Clawride einen alternativen Zugang ermöglichen; tagsüber sind soziale Situationen und menschliche Werkzeuge anders gelagert. Prüfe vor einer Verpflichtung immer das Sanduhrsymbol.",
        boundary: "Anzahl, Position, Freischaltung und Einschränkungen aller Schnellreisepunkte sind noch offen. Eine vollständige Karte ohne Release-Test wäre spekulativ.",
        faq: [["Verbraucht Herumlaufen die 30 Tage?", "Nein. Gewöhnliche Erkundung lässt die Frist nicht kontinuierlich sinken."], ["Sind alle Schnellreisepunkte bekannt?", "Nein, die vollständige Karte und Freischaltlogik wurden nicht veröffentlicht."]], source: "time", hub: "walkthrough-guides",
      },
      "no-main-side-quest-split": {
        title: "Warum es keine starre Haupt- und Nebenquest-Trennung gibt",
        desc: "Das Questmodell verbindet Aufträge, Beziehungen und Weltfolgen, statt Inhalte sauber in Haupt- und Nebenquests zu sortieren.",
        quick: "Rebel Wolves beschreibt die Aufgaben nicht als klassische Liste aus Pflicht-Hauptquest und belanglosen Nebenquests. Handlungen konkurrieren um Coens begrenzte Zeit und können Personen, Fraktionen, Dienste und spätere Möglichkeiten verändern.",
        facts: ["Bedeutende Aktionen zeigen ihre Zeitkosten vor der Bestätigung.", "Eine Aufgabe kann übersprungen oder aufgegeben werden, ohne automatisch ein Game Over auszulösen.", "NPCs handeln weiter, und ihr Tod kann Händler, Handwerker oder Questinhalte entfernen.", "Das Ende des Zeitraums wertet die getroffenen Entscheidungen aus, statt nur eine Stoppuhr zu beenden."],
        use: "Behandle jede Aufgabe als Investition in eine gewünschte Weltentwicklung. Prüfe Auftraggeber, mögliche Folgen und Zeitkosten, bevor du zusagst. Für einen zweiten Durchgang ist es sinnvoller, andere Prioritäten zu setzen, als zwanghaft dieselbe Checkliste schneller abzuarbeiten.",
        boundary: "Die komplette Questmatrix, alle Sperren und Endvarianten bleiben bis zum Release unbekannt. Einzelne Preview-Beispiele beweisen nicht jede mögliche Verzweigung.",
        faq: [["Gibt es unwichtige Nebenquests?", "Die Entwickler vermeiden bewusst eine starre Trennung; auch optionale Aufgaben können Weltfolgen haben."], ["Muss jede Aufgabe in einem Durchgang erledigt werden?", "Nein. Das System ist auf Prioritäten und ausgelassene Inhalte ausgelegt."]], source: "time", hub: "walkthrough-guides",
      },
      "enemy-types": {
        title: "Bestätigte Gegnertypen und Bedrohungen",
        desc: "Überblick über Menschen, Vrakhiri, Kreaturen und folkloristische Monster ohne erfundene Boss- oder Schwächenlisten.",
        quick: "Coen kämpft nicht nur gegen gewöhnliche Menschen oder Vampire. Offizielle Materialien zeigen bewaffnete Gegner, Mitglieder der Vrakhiri und übernatürliche Kreaturen, die von mitteleuropäischer Folklore inspiriert sind.",
        facts: ["Die Vrakhiri vereinen Vampire aus verschiedenen Zeiten und kulturellen Hintergründen.", "Menschliche Kämpfer nutzen Richtungskampf und unterschiedliche Waffen.", "Folkloristische Monster erweitern die Gefahr jenseits des politischen Konflikts.", "Tageszeit, Gelände und Coens Form verändern die verfügbaren Antworten auf eine Begegnung."],
        use: "Identifiziere zuerst Reichweite, Angriffsrhythmus und Gruppenzusammensetzung. Gegen Menschen kann Waffenlesen im Vordergrund stehen; übernatürliche Gegner könnten stärker nach Fähigkeit, Form oder Umgebung verlangen. Verlasse dich nicht auf eine universelle Schwäche, bevor sie reproduzierbar getestet ist.",
        boundary: "Ein vollständiges Bestiarium, Resistenzen, Drops, Respawn-Regeln und Bossklassifizierung sind noch nicht verfügbar. Der Guide nennt nur offiziell gezeigte Kategorien.",
        faq: [["Kämpft Coen nur gegen Vampire?", "Nein. Gezeigt wurden Menschen, Vrakhiri und weitere folkloristische Kreaturen."], ["Sind Schwächen und Drops schon bekannt?", "Nein, belastbare Tabellen erfordern Tests der veröffentlichten Version."]], source: "preview", hub: "gameplay-guides",
      },
      "hands-on-preview": {
        title: "Vier-Stunden-Preview: bestätigte Systeme und Grenzen",
        desc: "Was der offizielle Xbox-Hands-on-Bericht tatsächlich über Kampf, Aufgaben, Hunger, Weltreaktion und den 30-Tage-Rahmen bestätigt.",
        quick: "Der vierstündige Hands-on-Bericht bestätigt, dass Kampf, Blutdurst, zeitgebundene Entscheidungen und Weltreaktionen praktisch zusammenspielen. Er ist eine starke Quelle für Grundmechaniken, aber kein Beleg für vollständigen Umfang oder finale Balance.",
        facts: ["Die Demo erlaubte einen zusammenhängenden Blick auf frühe Aufgaben und Systemwechsel.", "Sanduhrkosten werden vor bedeutenden Handlungen sichtbar gemacht.", "Bluthunger kann Dialoge und Kontrolle beeinflussen.", "Tötungen und andere Entscheidungen können Personen und Dienste dauerhaft aus der Welt entfernen."],
        use: "Nutze Preview-Informationen, um Kauf- und Spielstilfragen zu beantworten, nicht um eine vollständige Lösung vorzutäuschen. Besonders belastbar sind beobachtete Interaktionen; weniger belastbar sind allgemeine Schlüsse über Spielzeit, Endgame oder technische Leistung.",
        boundary: "Vier Stunden reichen nicht für Umfang, alle Regionen, Enden, Build-Meta oder stabile Performancewerte. Änderungen bis zum Retail-Build bleiben möglich.",
        faq: [["Ist der Hands-on-Bericht ein Test der Vollversion?", "Nein. Er beschreibt rund vier Stunden einer Vorabfassung."], ["Welche Systeme wurden praktisch gesehen?", "Unter anderem Richtungskampf, Zeitkosten, Bluthunger und dauerhafte Weltreaktionen."]], source: "preview", hub: "updates-guides",
      },
      "demo": {
        title: "Demo-Status: Gibt es eine öffentliche Testversion?",
        desc: "Aktueller offizieller Stand zu öffentlicher Demo, zeitlich begrenzter Testversion und möglicher Fortschrittsübernahme.",
        quick: "Bis zum geprüften Stand ist keine allgemein verfügbare öffentliche Demo für PC, PS5 oder Xbox Series angekündigt. Medien- und Präsentations-Builds sind keine frei herunterladbare Spielerdemo.",
        facts: ["Offizielle Hands-ons wurden für Presse und Veranstaltungen bereitgestellt.", "Eine Medienvorschau belegt keine Veröffentlichung derselben Version für alle Spieler.", "Für das Hauptspiel ist der 3. September 2026 bestätigt.", "Fortschrittsübernahme kann erst zugesichert werden, wenn eine konkrete Demo mit Regeln angekündigt wird."],
        use: "Verlasse dich bei Downloads ausschließlich auf offizielle Store- oder Publisher-Seiten. Drittanbieter, die vor einer Ankündigung angebliche Demo-Dateien anbieten, sind kein vertrauenswürdiger Zugang. Prüfe bei einer späteren Demo Plattform, Enddatum und Save-Transfer separat.",
        boundary: "Downloadgröße, Startzeit, Inhaltsgrenze und Save-Transfer einer hypothetischen Demo sind nicht bestätigt. Die Seite wird nicht so tun, als existiere bereits ein Produkt.",
        faq: [["Kann ich aktuell eine öffentliche Demo herunterladen?", "Nach dem geprüften offiziellen Stand wurde keine allgemeine Demo angekündigt."], ["Wird ein Demo-Spielstand übernommen?", "Dazu gibt es ohne bestätigte öffentliche Demo keine offizielle Regel."]], source: "news", hub: "release-guides",
      },
      "beta-status": {
        title: "Beta-Status, Einladungen und Betrugswarnung",
        desc: "Offizieller Stand zu Closed Beta, Open Beta, Registrierung und angeblichen Zugangsschlüsseln für The Blood of Dawnwalker.",
        quick: "Eine öffentliche Open Beta oder allgemein zugängliche Closed-Beta-Anmeldung ist derzeit nicht offiziell bestätigt. Vorschauzugang für Medien darf nicht mit einem Community-Test verwechselt werden.",
        facts: ["Offizielle Neuigkeiten erscheinen über Bandai Namco, Rebel Wolves und verifizierte Store-Seiten.", "Ein Presse-Build bedeutet nicht, dass Einladungen an Spieler verschickt werden.", "Es gibt keine belastbare Grundlage für gekaufte Beta-Keys aus inoffiziellen Shops.", "Persönliche Daten sollten nicht auf Seiten eingegeben werden, die eine nicht angekündigte Beta versprechen."],
        use: "Kontrolliere Domain, Absender und verlinkte Store-Seite, bevor du dich registrierst. Echte Testbedingungen nennen Plattform, Region, Laufzeit, Vertraulichkeit und Supportweg. Ein Countdown oder angeblich begrenzter Keybestand ersetzt keine offizielle Ankündigung.",
        boundary: "Ob später ein technischer Test oder eine Beta erscheint, ist offen. Termine, Regionen und Auswahlkriterien dürfen deshalb nicht vorweggenommen werden.",
        faq: [["Gibt es eine offene Beta?", "Derzeit ist keine öffentliche Open Beta offiziell bestätigt."], ["Sind Beta-Keys von Drittanbietern sicher?", "Ohne offizielle Testankündigung sollten solche Angebote nicht als legitim gelten."]], source: "news", hub: "release-guides",
      },
      "father-florin": {
        title: "Florin: Coens Vater und die Familienfrist",
        desc: "Quellengeprüftes Profil von Florin, seiner Rolle in Coens Familie und der Grenze zwischen bestätigtem Hintergrund und möglichen Ausgängen.",
        quick: "Florin ist Coens Vater und Teil der Familie, deren Schicksal den 30-Tage-Rahmen antreibt. Seine Bedeutung liegt nicht nur in einem Rettungsmarker: Familienmitglieder besitzen eigene Hintergründe, Reaktionen und mögliche Konsequenzen.",
        facts: ["Coens Familie steht im Zentrum des anfänglichen Konflikts.", "Die Frist gibt Coen Zeit, Prioritäten zu setzen, statt jede Aufgabe automatisch abzuschließen.", "Beziehungen und Weltzustand reagieren auf Entscheidungen.", "Offizielle Informationen legen keinen einzigen garantierten Ausgang für Florin fest."],
        use: "Lies Charakterseiten spoilerarm und trenne Ausgangslage von Ergebnis. Wenn die Vollversion erscheint, sollte ein Florin-Walkthrough Voraussetzungen, Zeitkosten, Wahlpunkte und Folgen getrennt dokumentieren, statt eine Entscheidung als objektiv richtig zu verkaufen.",
        boundary: "Überleben, Tod, Rettungsweg und Endvarianten Florins werden hier vor Release nicht behauptet. Solche Angaben benötigen reproduzierbare Questpfade.",
        faq: [["Wer ist Florin?", "Florin ist Coens Vater und ein Mitglied der bedrohten Familie."], ["Ist sein Schicksal bereits festgelegt?", "Nein, ein vollständiger und garantierter Ausgang wurde nicht offiziell offengelegt."]], source: "news", hub: "story-guides",
      },
      "skender-dragosti": {
        title: "Skender Dragosti: bestätigtes Charakterprofil",
        desc: "Hintergrund, Einordnung und offene Beziehungs- beziehungsweise Questfragen zu Skender Dragosti ohne erfundene Story-Spoiler.",
        quick: "Skender Dragosti gehört zu den offiziell vorgestellten Figuren von Vale Sangora. Der sichere Stand umfasst seine bestätigte Einordnung; Loyalität, mögliche Begleiterrolle und endgültiges Schicksal dürfen daraus nicht abgeleitet werden.",
        facts: ["Skender wird in offiziellen Charakter- und Community-Materialien genannt.", "Figuren in Vale Sangora können mit Fraktionen, Orten und Coens Entscheidungen verbunden sein.", "Das reaktive Weltdesign erlaubt, dass Beziehungen und Dienste durch Handlungen verändert werden.", "Eine veröffentlichte Biografie ist kein Beleg für alle späteren Questausgänge."],
        use: "Nutze das Profil als spoilerarmen Ausgangspunkt. Nach Release sollten Begegnungsort, Voraussetzungen, zeitliche Kosten, Dialogoptionen und Konsequenzen getrennt erfasst werden. So bleibt erkennbar, welche Information Charakterwissen und welche ein konkreter Walkthrough ist.",
        boundary: "Romanze, Rekrutierung, Tod, Belohnungen und Endzustand sind nicht vollständig bestätigt. Der Guide erfindet keine vermeintlich optimale Dialogfolge.",
        faq: [["Ist Skender ein bestätigter Charakter?", "Ja, er wurde in offiziellen Materialien vorgestellt."], ["Kann Skender rekrutiert oder romantisch gebunden werden?", "Dafür gibt es noch keine vollständig bestätigten Regeln."]], source: "news", hub: "story-guides",
      },
      "xanthe-fight-outcomes": {
        title: "Xanthe-Begegnung: Kampf, Entscheidungen und offene Folgen",
        desc: "Was über Xanthe und mögliche Konfliktlösungen bestätigt ist, ohne einen Vorschauweg zur vollständigen Ergebnis-Matrix zu erklären.",
        quick: "Xanthe ist eine bestätigte Figur im Umfeld der Vrakhiri. Gezeigte Konflikte demonstrieren, dass Begegnungen durch Kampf und Entscheidungen geprägt werden können; sämtliche Ausgänge sind jedoch nicht öffentlich kartiert.",
        facts: ["Xanthe ist mit der vampirischen Machtstruktur von Vale Sangora verbunden.", "Kampf und Dialog sind Teil eines reaktiven Systems.", "Das Ausschalten einer benannten Figur kann spätere Inhalte verändern.", "Ein in einer Preview gezeigter Ausgang ist nur eine Möglichkeit, keine vollständige Lösung."],
        use: "Erstelle vor einer wichtigen Begegnung einen separaten Spielstand, wenn das Spiel dies zulässt, und achte auf Zeitkosten sowie Beziehungen. Nach Release sollte ein Ergebnis-Guide jede Variante mit identischem Ausgangszustand prüfen, damit Ursache und Korrelation nicht verwechselt werden.",
        boundary: "Alle friedlichen, tödlichen oder fraktionsbezogenen Ergebnisse, Belohnungen und späteren Rückwirkungen sind noch nicht vollständig bestätigt.",
        faq: [["Muss Xanthe bekämpft werden?", "Die vollständigen Lösungswege sind noch nicht bestätigt; veröffentlichte Szenen zeigen nicht jede Option."], ["Kann die Begegnung spätere Inhalte sperren?", "Das reaktive System macht Folgen plausibel, die genaue Matrix muss aber in der Vollversion geprüft werden."]], source: "preview", hub: "story-guides",
      },
      "bows-and-crossbows": {
        title: "Bögen und Armbrüste: bestätigter Fernkampfstatus",
        desc: "Welche Fernkampfwaffen gezeigt oder erwähnt wurden und warum Reichweite, Munition und Build-Wert noch getestet werden müssen.",
        quick: "Bögen und Armbrüste gehören zum mittelalterlichen Waffenrahmen von Vale Sangora, doch der Schwerpunkt der gezeigten Kämpfe liegt auf Richtungskampf, Hexes und vampirischen Fähigkeiten. Eine vollständige Fernkampf-Meta ist nicht bestätigt.",
        facts: ["Das Setting unterstützt bewaffnete menschliche Gegner und mehrere Waffengattungen.", "Coens Kernsysteme verbinden Nahkampf, Magie und Vampirkräfte.", "Fernkampf kann Positionierung oder Eröffnung verändern, ohne automatisch ein eigenständiger Haupt-Build zu sein.", "Munitionsökonomie und genaue Bedienung sind noch nicht vollständig dokumentiert."],
        use: "Bewerte Bögen oder Armbrüste später nach Reichweite, Nachladezeit, Munitionszugang und Wechselgeschwindigkeit. Ein Fernkampftreffer ist besonders nützlich, wenn er Gruppen trennt oder einen sicheren Einstieg schafft; reiner Schaden pro Treffer reicht für die Einordnung nicht aus.",
        boundary: "Waffenliste, Crafting, Munitionstypen, Skalierung, Zielhilfe und Plattformsteuerung benötigen Tests der Vollversion.",
        faq: [["Gibt es Fernkampfwaffen?", "Das mittelalterliche Arsenal umfasst Fernkampfoptionen, aber die vollständigen Systeme sind noch nicht dokumentiert."], ["Ist ein reiner Bogen-Build bestätigt?", "Nein, dafür fehlen Skill- und Ausrüstungsdaten der finalen Version."]], source: "combat", hub: "gameplay-guides",
      },
      "unarmed-combat": {
        title: "Unbewaffneter Kampf und vampirische Klauen",
        desc: "Unterschied zwischen menschlichem unbewaffnetem Kampf und den natürlichen Waffen der Vampirform, inklusive offener Build-Fragen.",
        quick: "Coens Vampirform kämpft mit Klauen, Biss und übernatürlicher Kraft, was nicht einfach mit menschlichem Faustkampf gleichzusetzen ist. Ob ein dauerhaft waffenloser Menschen-Build tragfähig ist, wurde nicht bestätigt.",
        facts: ["Nachts erhält Coen vampirische Angriffe und stärkere Mobilität.", "Klauen und Beißen sind Teil der übernatürlichen Form.", "Tagsüber stützt sich Coen stärker auf Waffen und Hex-Magie.", "Bluthunger beeinflusst vampirische Entscheidungen und kann dadurch den Kampfkontext verändern."],
        use: "Behandle Klauen als eigenes Form-Kit mit anderer Reichweite, Bewegung und Ressourcennutzung. Vergleiche nach Release nicht nur Schaden, sondern auch Unterbrechung, Heilung, Zugang zu Zielen und Risiko durch Hunger. Faustangriffe des Menschen müssen separat geprüft werden.",
        boundary: "Komplette Komboabfolgen, Skalierung, Ausrüstungssynergien und die Machbarkeit eines waffenlosen Runs sind offen.",
        faq: [["Sind Klauen dasselbe wie Faustkampf?", "Nein. Klauen gehören zu Coens Vampirform und ihren übernatürlichen Fähigkeiten."], ["Ist ein waffenloser Build bestätigt?", "Noch nicht; dafür fehlen vollständige Skills und Balancingdaten."]], source: "preview", hub: "gameplay-guides",
      },
      "sangoran-wayfarers-armor": {
        title: "Sangoran-Wayfarers-Rüstung: Edition und Inhalt",
        desc: "Wo die Sangoran-Wayfarers-Rüstung enthalten ist, was kosmetisch beziehungsweise spielerisch bestätigt ist und was Käufer prüfen sollten.",
        quick: "Die Sangoran-Wayfarers-Rüstung wird in offiziellen Editionsmaterialien als zusätzlicher Inhalt geführt. Käufer sollten die konkrete Edition und Plattformbeschreibung prüfen, statt aus dem Namen unveröffentlichte Werte oder Exklusivität abzuleiten.",
        facts: ["Der Inhalt wird in der offiziellen Editionsübersicht genannt.", "Digitale Zusatzinhalte können je nach Standard-, Deluxe- oder Collector-Angebot unterschiedlich gebündelt sein.", "Ein Rüstungsname bestätigt weder Endgame-Stärke noch einzigartige Set-Boni.", "Regionale Händler können physische Beigaben anders darstellen als der digitale Inhalt."],
        use: "Vergleiche vor dem Kauf die offizielle Inhaltsliste der eigenen Plattform. Entscheidend sind enthaltene Lizenz, mögliche Vorbestellbedingungen und regionale Verfügbarkeit. Kaufe keine teurere Edition allein wegen vermuteter Werte, solange die tatsächlichen Stats nicht veröffentlicht sind.",
        boundary: "Rüstungswerte, Upgradepfad, kosmetische Varianten und spätere Einzelverfügbarkeit sind nicht vollständig bestätigt.",
        faq: [["Ist die Wayfarers-Rüstung in jeder Edition enthalten?", "Das hängt von der offiziellen Editionsbeschreibung ab; prüfe die konkrete Plattform und Region."], ["Ist sie stärker als normale Rüstung?", "Dafür sind keine belastbaren finalen Werte veröffentlicht."]], source: "editions", hub: "release-guides",
      },
      "camera-combat-improvements": {
        title: "Kamera- und Kampfverbesserungen vor Release",
        desc: "Welche Verbesserungen Entwickler und Vorschauen an Kamera, Lesbarkeit und Kampfgefühl erkennen lassen und welche Optionen noch offen sind.",
        quick: "Das Kampf- und Kameragefühl wurde während der Entwicklung weiter verfeinert. Aktuelle Vorschauen zeigen besser lesbare Richtungshinweise und Optionen wie Omni-Block, doch eine vollständige Liste aller Kamera- und Barrierefreiheitsoptionen liegt noch nicht vor.",
        facts: ["Richtungshinweise müssen in schnellen Begegnungen klar lesbar sein.", "Omni-Block bietet eine optionale Vereinfachung der Richtungsverteidigung.", "Kameraabstand und Zielverfolgung beeinflussen Kämpfe gegen Gruppen besonders stark.", "Preview-Eindrücke können Verbesserungen zeigen, ersetzen aber keine Plattformtests."],
        use: "Prüfe zum Release Kameraempfindlichkeit, automatische Zentrierung, Motion Blur, Zielwechsel und Sichtfeld getrennt. Für eine faire Bewertung sollten Controller und Maus/Tastatur sowie enge Innenräume und offene Gruppenkämpfe getestet werden.",
        boundary: "Finale Menüpunkte, FOV-Bereich, Lock-on-Regeln, Ultrawide-Verhalten und plattformspezifische Unterschiede sind noch nicht vollständig dokumentiert.",
        faq: [["Gibt es Omni-Block als Hilfe?", "Ja, die Option reduziert die Richtungsanforderung beim Blocken, ohne automatisch zu parieren."], ["Sind alle Kameraoptionen bekannt?", "Nein, die vollständige Retail-Liste muss noch geprüft werden."]], source: "preview", hub: "technical-guides",
      },
    },
  },
};

content.ja = {
  htmlLang: "ja", schemaLocale: "ja_JP", label: "日本語", home: "日本語トップ",
  ui: {
    quick: "要点", facts: "公式に確認されている情報", use: "プレイヤーにとって重要な点",
    boundary: "検証範囲", sources: "一次情報", related: "関連する日本語ガイド",
    faq: "よくある質問", verified: "出典確認済みガイド", updated: "2026年7月26日確認",
  },
  commonBoundary: "公開されている映像や試遊記事には開発中ビルドの情報が含まれます。正確な数値、全ロケーション、最終バランス、すべての分岐結果は、製品版で再現できるか、公式パッチノートで確認できた時点で追加します。",
  pages: {
    "activation-charges": {
      title: "Activation Chargeの獲得・使用方法",
      desc: "戦闘中にActivation Chargeを蓄積し、アビリティに使う仕組みと、まだ未確定の数値を整理します。",
      quick: "Activation Chargeはアクティブアビリティを発動するための戦闘リソースです。攻撃などの戦闘行動で蓄積し、強力な技に消費するため、方向攻撃だけでなくリソースを使う順番も重要になります。",
      facts: ["攻撃や成功した戦闘行動によってチャージが増えることが確認されています。", "アクティブアビリティは常時無料ではなく、蓄積したチャージを使用します。", "方向攻撃、防御、スタミナ管理と並行して扱うリアルタイム戦闘の要素です。", "武器ごとの獲得量や最大値は最終版の表として公開されていません。"],
      use: "弱い敵にすべてのチャージを使わず、危険な敵の行動を止めたい場面や形勢を変えたい場面に残す判断が必要です。一方で、抱えたまま戦闘が終わるより、早めの能力使用で被害を減らす方が有利な場合もあります。製品版では武器、攻撃種別、スキルによる獲得効率を同じ条件で比較してください。",
      boundary: "最大保持数、戦闘外での減少、各アビリティの消費量、スキルツリーによる補正は未確定です。プレビュー映像のUI数値を最終バランスとして扱いません。",
      faq: [["Activation Chargeは何に使いますか？", "戦闘中のアクティブアビリティを発動するために使います。"], ["戦闘後も保持できますか？", "製品版での保持・減少ルールはまだ公式に確定していません。"]], source: "combat", hub: "gameplay-guides",
    },
    "parry": {
      title: "パリィの方向・タイミングとガードとの違い",
      desc: "方向パリィ、通常ガード、Omni-Blockの役割と、製品版で検証すべき受付時間を解説します。",
      quick: "パリィでは敵の攻撃方向を読み、対応する方向へ適切なタイミングで防御します。押し続ける通常ガードより入力精度が必要ですが、防御リソースを節約し、反撃の機会を作る役割があります。",
      facts: ["敵の攻撃には方向を読み取るための表示があります。", "通常ガードは比較的安全ですが、防御に関わるリソースを消費します。", "方向とタイミングを合わせたパリィは、より精密な防御手段です。", "Omni-Blockは方向入力を簡略化しますが、自動パリィや無敵化ではありません。"],
      use: "初見の敵にはまずガードを使い、攻撃モーションと連続攻撃の終点を覚えてからパリィへ移行すると安全です。タイミングだけでなく方向も一致させる必要があります。複数戦では画面外の敵や位置取りが重要なので、単体相手のパリィ成功率だけでビルドを評価しないでください。",
      boundary: "パリィ受付フレーム、成功時の有利時間、難易度による補正、武器差は製品版での計測が必要です。",
      faq: [["パリィとガードは同じですか？", "いいえ。ガードは安全寄り、パリィは方向とタイミングを合わせる精密な防御です。"], ["Omni-Blockで自動パリィできますか？", "できません。方向操作を軽減しますが、完璧なパリィを保証しません。"]], source: "preview", hub: "gameplay-guides",
    },
    "three-skill-trees": {
      title: "3つのスキルツリー：剣・Hex・吸血鬼能力",
      desc: "Coenの人間剣術、血のルーンを使うHex、夜の吸血鬼能力という3系統を整理します。",
      quick: "Coenの成長は、人間としての剣術、血で刻むルーンによるHex魔法、吸血鬼の超自然能力という3系統に分かれます。同じダメージ強化の色違いではなく、戦闘、移動、問題解決の選択肢を変える設計です。",
      facts: ["人間の剣術は方向入力を使う武器戦闘と結びついています。", "HexはCoenが皮膚に刻んだルーンと血を用いる魔法です。", "吸血鬼系には爪、噛みつき、怪力、特殊移動が含まれます。", "昼と夜で人間形態と吸血鬼形態が変わり、利用できる手段も変化します。"],
      use: "ビルドは最大ダメージだけでなく、解決したい状況から逆算してください。正面戦闘、制御、探索経路、会話前の安全確保では価値の高い能力が異なります。振り直し条件が不明な段階では、発売前の仮Tier表だけを根拠にポイント配分を固定しない方が安全です。",
      boundary: "全スキル名、前提条件、ポイントコスト、最大ランク、リスペック方法は未公開部分があります。存在しない完成ビルドを作らず、正式データ公開後に更新します。",
      faq: [["3つの系統は何ですか？", "人間の剣術、Hex魔法、吸血鬼能力です。"], ["発売前に最強ビルドを決められますか？", "いいえ。全スキル、コスト、振り直し条件がまだ揃っていません。"]], source: "combat", hub: "gameplay-guides",
    },
    "fast-travel": {
      title: "ファストトラベルと時間を無駄にしない移動",
      desc: "Vale Sangoraの移動、30日制限、昼夜能力を組み合わせた安全なルート判断を解説します。",
      quick: "Vale Sangoraには重要地点を行き来する手段がありますが、すべてのファストトラベル地点と解放条件はまだ公開されていません。通常の探索で30日制限がリアルタイムに減り続けることはありません。",
      facts: ["自由探索や地図上の移動だけでは物語上の期限は継続消費されません。", "時間を進める重要行動には、決定前に砂時計アイコンとコストが表示されます。", "昼の人間形態と夜の吸血鬼形態では移動能力と侵入経路が異なります。", "Laslea、Svartrau、Howling Keep、Shrike’s Cragなどの地点が公開されています。"],
      use: "最短距離だけでなく、現在の形態と目的に合わせて経路を選びます。夜はShadowstepやClawrideが別ルートを開く可能性があり、昼は人間として行動する利点があります。クエストや訓練を確定する前に砂時計コストを確認し、単なる移動と期限を進める行動を区別してください。",
      boundary: "ファストトラベル地点の数、座標、解放条件、戦闘中や特定状態での制限は未確定です。製品版前に完全マップを作成しません。",
      faq: [["歩き回るだけで30日が減りますか？", "いいえ。通常探索では期限が継続的に減りません。"], ["全ファストトラベル地点は判明していますか？", "まだ完全な配置と解放条件は公開されていません。"]], source: "time", hub: "walkthrough-guides",
    },
    "no-main-side-quest-split": {
      title: "メイン・サイドを固定しないクエスト構造",
      desc: "すべての依頼が時間、人物、勢力、世界状態に関わるため、単純な主・副分類では説明できない理由を整理します。",
      quick: "本作は必須メインクエストと価値の低いサイドクエストを機械的に分ける設計ではありません。限られた時間をどこに使うかが人物、サービス、勢力、後の選択肢へ影響します。",
      facts: ["重要行動は確定前に時間コストを表示します。", "すべての依頼を達成しなくても、直ちにGame Overになるわけではありません。", "NPCは自分の行動を続け、死亡すれば商人、職人、依頼が失われる場合があります。", "期限終了時には、単なるタイムアップではなく、それまでの選択に応じた結果が生じます。"],
      use: "依頼を経験値チェックリストとしてではなく、望む世界状態への投資として考えてください。依頼主、関係する人物、砂時計コストを確認し、同じ周回ですべてを回収しようとしないことが重要です。2周目では速度だけを上げるより、別の優先順位を試す方が設計意図に合います。",
      boundary: "完全なクエスト一覧、排他条件、時間コスト、エンディング分岐は未公開です。試遊で見えた一例を全ルートの法則として扱いません。",
      faq: [["サイドクエストは無視してよい内容ですか？", "単純な副次要素ではなく、世界や人物に影響する可能性があります。"], ["1周ですべて完了できますか？", "本作は優先順位と未達成の内容を前提にした設計です。"]], source: "time", hub: "walkthrough-guides",
    },
    "enemy-types": {
      title: "確認済みの敵タイプと脅威",
      desc: "人間、Vrakhiri、民間伝承に基づく怪物を、未確認の弱点やドロップを作らず整理します。",
      quick: "敵は人間兵士や吸血鬼だけではありません。公式資料では、異なる時代から集まったVrakhiri、武装した人間、中央ヨーロッパの民間伝承に着想を得た超自然的な怪物が確認されています。",
      facts: ["Vrakhiriは異なる時代と文化背景を持つ吸血鬼集団です。", "人間の敵は武器と方向攻撃を使う戦闘の対象になります。", "政治的対立とは別に、民間伝承由来の怪物がVale Sangoraに存在します。", "昼夜、地形、Coenの形態によって同じ遭遇への対応方法が変わります。"],
      use: "まず敵の射程、攻撃方向、連続動作、集団構成を確認します。人間相手には武器モーションの読み、怪物相手には能力や地形の使い方が重要になる可能性があります。公式データや再現テストなしに、銀や火などの一般的な吸血鬼弱点を本作の確定仕様として持ち込まないでください。",
      boundary: "完全なBestiary、属性耐性、ドロップ、再出現、ボス分類は未公開です。ここでは確認済みの敵カテゴリーだけを扱います。",
      faq: [["敵は吸血鬼だけですか？", "いいえ。人間、Vrakhiri、民間伝承由来の怪物が確認されています。"], ["弱点とドロップは判明していますか？", "完全な表は製品版の再現テストが必要です。"]], source: "preview", hub: "gameplay-guides",
    },
    "hands-on-preview": {
      title: "4時間試遊で確認されたシステム",
      desc: "Xbox Wireの公式試遊記事から、戦闘、時間、血への飢え、世界反応について確認できる範囲を整理します。",
      quick: "約4時間の試遊では、方向戦闘、血への飢え、時間コスト付きの決断、永続的な世界反応が別々ではなく連動していることが確認されました。ただし、全体ボリュームや最終バランスを判断できる完成版レビューではありません。",
      facts: ["序盤のまとまったクエストとシステム切り替えが実際にプレイされました。", "時間を消費する決断では砂時計コストを事前に確認できます。", "飢えは会話選択やCoenを制御できる範囲に影響します。", "人物を殺すなどの選択は、サービスや後続コンテンツを世界から消す可能性があります。"],
      use: "試遊情報は、購入前にゲームの基本構造を理解する材料として使えます。実際に観察された操作やUIは信頼度が高い一方、プレイ時間、エンドゲーム、全エリア、長期的な技術性能まで一般化できません。プレビューの感想と再現可能な仕様を分けて読んでください。",
      boundary: "4時間では全クエスト、全エンディング、ビルド環境、安定したフレームレートを評価できません。製品版までに調整される可能性があります。",
      faq: [["完成版のレビューですか？", "いいえ。約4時間の開発中ビルドを扱った試遊記事です。"], ["何が実際に確認されましたか？", "方向戦闘、時間コスト、飢え、永続的な世界反応などです。"]], source: "preview", hub: "updates-guides",
    },
    "demo": {
      title: "体験版はある？ 公開Demoの最新状況",
      desc: "PC、PS5、Xbox Series向け一般公開Demoと、セーブデータ引き継ぎに関する公式状況を確認します。",
      quick: "確認時点で、PC、PS5、Xbox Series向けに誰でも入手できる一般公開Demoは正式発表されていません。メディアやイベント向け試遊ビルドは、ストアで配信されるプレイヤー向け体験版とは別です。",
      facts: ["報道関係者やイベント向けのハンズオンは実施されています。", "メディア用ビルドが存在しても、同じ内容が一般配信されるとは限りません。", "本編の発売日は2026年9月3日です。", "Demoが発表されるまでは、セーブ引き継ぎやプレイ範囲も確定できません。"],
      use: "ダウンロードは公式ストア、Bandai Namco、Rebel Wolvesの案内だけを利用してください。発表前にDemoファイルを配布すると主張する非公式サイトは安全な入手先ではありません。将来Demoが出た場合も、対象機種、終了日、地域、セーブ移行を個別に確認する必要があります。",
      boundary: "仮のDemoについて容量、開始時刻、収録範囲、セーブ引き継ぎを推測しません。正式発表がない状態を、存在する製品のように表現しません。",
      faq: [["現在Demoをダウンロードできますか？", "確認済みの公式情報では、一般公開Demoは発表されていません。"], ["Demoのセーブを本編へ引き継げますか？", "Demo自体が未発表のため、公式ルールもありません。"]], source: "news", hub: "release-guides",
    },
    "beta-status": {
      title: "Betaテスト、招待、偽キーの注意点",
      desc: "Open Beta、Closed Beta、登録ページ、非公式アクセスキーに関する現在の公式状況を整理します。",
      quick: "一般参加できるOpen Betaや、広く募集するClosed Beta登録は正式発表されていません。メディア向けプレビュー参加をコミュニティ向けBetaと混同しないでください。",
      facts: ["公式発表はBandai Namco、Rebel Wolves、認証済みストアから行われます。", "プレス向けビルドは一般プレイヤーへの招待開始を意味しません。", "非公式ショップのBetaキーを正当化する公式情報はありません。", "未発表テストを約束するページへ個人情報を入力するべきではありません。"],
      use: "登録前にドメイン、送信者、リンク先ストアを確認してください。本物のテスト案内なら、対象機種、地域、期間、NDA、サポート窓口が明示されます。残りキー数やカウントダウン表示だけでは公式性を証明できません。",
      boundary: "今後テクニカルテストやBetaが行われる可能性は否定できませんが、日程、地域、抽選条件を先回りして書きません。",
      faq: [["Open Betaはありますか？", "現時点で一般公開Open Betaは正式発表されていません。"], ["非公式Betaキーは安全ですか？", "公式テスト発表がない限り、正規アクセスとして扱わないでください。"]], source: "news", hub: "release-guides",
    },
    "father-florin": {
      title: "Florin：Coenの父と家族を巡る期限",
      desc: "Coenの父Florinの確認済みプロフィールと、救出結果を発売前に断定できない理由を整理します。",
      quick: "FlorinはCoenの父であり、30日という物語上の期限につながる家族の一人です。家族は単なる救出マーカーではなく、それぞれの背景、反応、選択の結果を持つ人物として扱われます。",
      facts: ["Coenの家族は物語開始時の主要な動機です。", "30日制限は、すべてを自動達成するのではなく優先順位を選ぶ枠組みです。", "人間関係と世界状態はプレイヤーの行動に反応します。", "Florinについて一つだけの確定した最終結果は公開されていません。"],
      use: "キャラクタープロフィールでは、物語開始時に確認できる関係と、ルートの結果を分けて読んでください。発売後の攻略では、必要条件、時間コスト、選択肢、結果を別々に記録し、一つの答えだけを正解として押し付けないことが重要です。",
      boundary: "Florinの生死、救出手順、必要クエスト、エンディング別の状態は発売前に断定しません。再現できるルート検証が必要です。",
      faq: [["Florinは誰ですか？", "Coenの父で、危機にある家族の一人です。"], ["Florinの運命は確定していますか？", "完全な結果や救出ルートは公式に公開されていません。"]], source: "news", hub: "story-guides",
    },
    "skender-dragosti": {
      title: "Skender Dragosti：確認済み人物プロフィール",
      desc: "Skender Dragostiの公式情報と、仲間、恋愛、クエスト結果について未確認の範囲を分けて解説します。",
      quick: "Skender DragostiはVale Sangoraに登場することが公式に紹介された人物です。確認できる人物設定から、仲間加入、恋愛、忠誠、最終的な生死までを推測することはできません。",
      facts: ["Skenderは公式の人物・Community情報で紹介されています。", "Vale Sangoraの人物は地域、勢力、Coenの選択と関わる可能性があります。", "反応する世界では、行動によって関係や利用できるサービスが変わります。", "人物紹介は、すべてのクエスト結果を公開するものではありません。"],
      use: "このページはネタバレを抑えた入口として使います。発売後は初回遭遇地点、前提条件、時間コスト、会話、結果を分けて記録することで、人物設定と攻略手順を混同せずに済みます。未確認の会話順を最適解として広めないでください。",
      boundary: "恋愛、加入、死亡、報酬、エンディング時の状態は完全には確認されていません。",
      faq: [["Skenderは公式キャラクターですか？", "はい。公式資料で紹介されています。"], ["仲間や恋愛対象になりますか？", "その条件と結果はまだ完全に確認されていません。"]], source: "news", hub: "story-guides",
    },
    "xanthe-fight-outcomes": {
      title: "Xanthe戦：選択肢と結果の検証範囲",
      desc: "VrakhiriのXantheとの対立について、公開済みの戦闘例と未公開の完全分岐を区別します。",
      quick: "XantheはVrakhiriの権力構造に関わる確認済み人物です。公開された対立場面は戦闘と選択が結びつくことを示しますが、平和的解決を含むすべての結果が判明しているわけではありません。",
      facts: ["XantheはVale Sangoraを支配する吸血鬼勢力と関係します。", "戦闘と会話は反応する世界システムの一部です。", "名前のある人物を排除すると、後のコンテンツが変化する可能性があります。", "プレビューで見えた一結果は、完全な分岐表ではありません。"],
      use: "重要な遭遇前には、ゲーム仕様が許すなら別セーブを作り、時間コストと関係変化も記録してください。発売後に結果を比較する際は、同じ事前状態から各選択を検証しなければ、別の過去行動による差をXanthe戦の結果と誤認する可能性があります。",
      boundary: "非戦闘解決、死亡、勢力変化、報酬、後続クエストへの影響を含む完全な結果表は未確認です。",
      faq: [["Xantheとは必ず戦いますか？", "公開場面だけでは全解決方法を確定できません。"], ["後のクエストに影響しますか？", "反応する世界では影響し得ますが、完全な分岐は製品版での検証が必要です。"]], source: "preview", hub: "story-guides",
    },
    "bows-and-crossbows": {
      title: "弓・クロスボウと遠距離戦闘",
      desc: "中世武器としての遠距離選択肢と、弾薬、照準、専用ビルドについて未確認の点を整理します。",
      quick: "Vale Sangoraの中世武器には遠距離の選択肢がありますが、公開戦闘の中心は方向近接、Hex、吸血鬼能力です。弓やクロスボウだけで構成する完成ビルドはまだ確認されていません。",
      facts: ["人間の敵とCoenは複数の武器手段を持ちます。", "戦闘の中核は近接、魔法、吸血鬼能力を組み合わせる設計です。", "遠距離攻撃は敵を分ける、戦闘を始める、位置を有利にする役割を持つ可能性があります。", "弾薬経済と正確な操作方法は完全には公開されていません。"],
      use: "製品版では射程、装填時間、弾薬入手、武器切替、照準補助を同じ条件で比較してください。一発の表示ダメージだけでなく、安全に敵集団を分断できるか、近接へ移るまでの隙、屋内での扱いやすさも評価に含める必要があります。",
      boundary: "全武器一覧、クラフト、弾種、能力補正、プラットフォーム別照準設定は製品版の検証が必要です。",
      faq: [["遠距離武器はありますか？", "中世の遠距離選択肢は示されていますが、完全な武器システムは未公開です。"], ["弓だけのビルドは可能ですか？", "全スキルと装備データがないため、まだ確定できません。"]], source: "combat", hub: "gameplay-guides",
    },
    "unarmed-combat": {
      title: "素手戦闘と吸血鬼の爪の違い",
      desc: "人間の素手攻撃と、夜の吸血鬼形態で使う爪・噛みつき・怪力を区別して解説します。",
      quick: "吸血鬼形態のCoenは爪、噛みつき、超自然的な力で戦います。これは人間形態の通常の素手攻撃と同じシステムとは限らず、人間の完全な武器なしビルドが成立するかは未確認です。",
      facts: ["夜のCoenは吸血鬼固有の攻撃と機動力を得ます。", "爪と噛みつきは超自然形態の能力として扱われます。", "昼の人間形態では武器とHexが戦闘の中心になります。", "血への飢えは吸血行動と制御リスクに関係します。"],
      use: "爪は射程、移動、回復、リソースが異なる独自の形態キットとして評価してください。製品版では単純なダメージだけでなく、敵の中断、接近能力、吸血への移行、飢えのリスクも比較します。人間の拳攻撃が存在しても、吸血鬼の爪ビルドと同一視しないでください。",
      boundary: "全コンボ、能力補正、装備相乗効果、人間形態の武器なし攻略の実用性は未確定です。",
      faq: [["爪は素手攻撃と同じですか？", "いいえ。爪は夜の吸血鬼形態に属する超自然能力です。"], ["武器なしビルドはできますか？", "全スキルと最終バランスが不明なため、まだ確定できません。"]], source: "preview", hub: "gameplay-guides",
    },
    "sangoran-wayfarers-armor": {
      title: "Sangoran Wayfarers Armorの入手条件",
      desc: "公式エディション情報にあるWayfarers Armorと、性能・単品販売について未確定の点を確認します。",
      quick: "Sangoran Wayfarers Armorは公式のエディション内容に記載された追加コンテンツです。どの版と地域で含まれるかを購入ページで確認し、名前だけから最強性能や永久限定を推測しないでください。",
      facts: ["公式エディション比較に追加コンテンツとして掲載されています。", "Standard、Deluxe、Collector関連の同梱物は購入する商品ごとに異なります。", "装備名だけでは能力値、セット効果、終盤性能は分かりません。", "物理特典とゲーム内デジタルアイテムは地域販売ページで別表記になる場合があります。"],
      use: "購入前に自分の機種と地域の公式商品説明を確認してください。重要なのは利用権、予約条件、地域制限であり、未公開の強さではありません。性能が不明な段階で、この装備だけを理由に高額版を選ぶべきではありません。",
      boundary: "防御値、強化経路、外見バリエーション、後日の単品販売は完全に確定していません。",
      faq: [["すべての版に含まれますか？", "版、機種、地域ごとの公式内容一覧を確認する必要があります。"], ["通常装備より強いですか？", "比較できる最終能力値はまだ公開されていません。"]], source: "editions", hub: "release-guides",
    },
    "camera-combat-improvements": {
      title: "カメラ・戦闘表示の改善と設定",
      desc: "方向表示、Omni-Block、カメラ追従、複数戦の見やすさについて、確認済みと未公開の設定を分けます。",
      quick: "開発中に戦闘の見やすさと操作感は調整されてきました。現在のプレビューでは方向表示やOmni-Blockの補助が確認できますが、カメラとアクセシビリティ設定の完全な一覧は未公開です。",
      facts: ["高速戦闘では敵の攻撃方向を読み取れる表示が必要です。", "Omni-Blockは方向防御の操作負担を下げる任意オプションです。", "カメラ距離とターゲット追従は複数敵との戦闘に大きく影響します。", "プレビューの改善印象だけでは、全機種の操作性を保証できません。"],
      use: "発売後はカメラ感度、自動中央戻し、モーションブラー、ターゲット切替、視野角を別々に確認してください。コントローラーとキーボード・マウス、狭い屋内と開けた複数戦を同じ設定で試すと、問題が入力機器かカメラ挙動かを切り分けやすくなります。",
      boundary: "最終メニュー、FOV範囲、ロックオン規則、ウルトラワイド、機種別差は完全には公開されていません。",
      faq: [["Omni-Blockはありますか？", "はい。方向ガードを簡略化しますが、自動パリィではありません。"], ["全カメラ設定は判明していますか？", "いいえ。製品版メニューでの確認が必要です。"]], source: "preview", hub: "technical-guides",
    },
  },
};

const hubs = {
  ja: {
    "gameplay-guides": ["ゲームプレイ攻略", "方向戦闘、スキル、敵、武器、吸血鬼能力を、確認済み情報と製品版での検証項目に分けて整理します。"],
    "walkthrough-guides": ["進行・時間管理ガイド", "30日制限、移動、クエスト選択を組み合わせ、一本道ではない攻略判断を支援します。"],
    "story-guides": ["人物・ストーリーガイド", "人物の公式設定と、まだ確認されていない生死・恋愛・分岐結果を明確に区別します。"],
    "release-guides": ["発売・エディションガイド", "発売日、Demo・Beta状況、PC要件、購入版の違いを公式情報で確認します。"],
    "technical-guides": ["PC・操作・技術ガイド", "PC要件、カメラ、入力、発売後に検証すべきパフォーマンス項目を整理します。"],
    "updates-guides": ["最新情報・プレビュー", "公式ニュースと試遊記事から確認できる内容を、推測や未発表情報と分離します。"],
  },
};

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function routeUrl(locale, route) {
  return `${SITE}/${locale}/${route}/`;
}

function languageMenu(locale, route) {
  const links = languages.map(([folder, lang, label]) => {
    const sameTopic = folder === "" || folder === "de" || folder === "ja";
    const href = folder === ""
      ? `${SITE}/${sameTopic ? `${route}/` : ""}`
      : `${SITE}/${folder}/${sameTopic ? `${route}/` : ""}`;
    return `<a href="${href}" lang="${lang}"${folder === locale ? ' aria-current="page"' : ""}>${label}</a>`;
  }).join("");
  return `<!-- LANG-DROPDOWN:START --><details class="language-menu"><summary aria-label="Sprache wählen">🌐 ${content[locale].label}</summary><div class="language-options">${links}</div></details><!-- LANG-DROPDOWN:END -->`;
}

function alternates(route) {
  return [
    `<link rel="alternate" hreflang="en" href="${SITE}/${route}/" />`,
    `<link rel="alternate" hreflang="de" href="${SITE}/de/${route}/" />`,
    `<link rel="alternate" hreflang="ja" href="${SITE}/ja/${route}/" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE}/${route}/" />`,
  ].join("");
}

function article(locale, route, page) {
  const l = content[locale];
  const url = routeUrl(locale, route);
  const source = sources[page.source];
  const faqSchema = page.faq.map(([q, a]) => ({"@type": "Question", name: q, acceptedAnswer: {"@type": "Answer", text: a}}));
  const schema = {
    "@context": "https://schema.org", "@graph": [
      {"@type": "WebPage", name: page.title, description: page.desc, url, inLanguage: l.htmlLang, dateModified: DATE,
        isPartOf: {"@type": "WebSite", name: "The Blood of Dawnwalker Wiki", url: `${SITE}/`},
        breadcrumb: {"@type": "BreadcrumbList", itemListElement: [
          {"@type": "ListItem", position: 1, name: l.home, item: `${SITE}/${locale}/`},
          {"@type": "ListItem", position: 2, name: page.title, item: url},
        ]}},
      {"@type": "FAQPage", mainEntity: faqSchema},
    ],
  };
  const related = Object.entries(l.pages).filter(([key, p]) => key !== route && p.hub === page.hub).slice(0, 4);
  return `<!doctype html>
<html lang="${l.htmlLang}">
<head>
  ${ADS}
  <meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(page.title)} | The Blood of Dawnwalker Wiki</title>
  <meta name="description" content="${esc(page.desc)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${url}" />${alternates(route)}
  <meta property="og:type" content="article" /><meta property="og:site_name" content="The Blood of Dawnwalker Wiki" />
  <meta property="og:title" content="${esc(page.title)}" /><meta property="og:description" content="${esc(page.desc)}" />
  <meta property="og:url" content="${url}" /><meta property="og:locale" content="${l.schemaLocale}" />
  <link rel="stylesheet" href="../../styles.css" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <header class="site-header"><a class="brand" href="../"><span class="brand-mark">BD</span><span><strong>The Blood of Dawnwalker</strong><small>${l.label}</small></span></a>
    <nav aria-label="Main navigation"><a href="../release-guides/">${locale === "de" ? "Release" : "発売"}</a><a href="../gameplay-guides/">${locale === "de" ? "Gameplay" : "システム"}</a><a href="../story-guides/">${locale === "de" ? "Story" : "人物"}</a><a href="../technical-guides/">${locale === "de" ? "Technik" : "技術"}</a>${languageMenu(locale, route)}</nav>
  </header>
  <main class="article-main">
    <section class="article-hero"><div><p class="eyebrow">${l.ui.verified}</p><h1>${page.title}</h1><p class="hero-copy">${page.desc}</p><div class="article-meta"><span class="tag confirmed">${l.ui.updated}</span><span class="tag confirmed">${source[0]}</span></div></div></section>
    <div class="article-body"><article class="article-content">
      <section class="verification-box"><h2>${l.ui.quick}</h2><p><strong>${page.quick}</strong></p></section>
      <section><h2>${l.ui.facts}</h2><ul>${page.facts.map((item) => `<li>${item}</li>`).join("")}</ul></section>
      <section><h2>${l.ui.use}</h2><p>${page.use}</p><p>${locale === "de"
        ? "Ordne die Information immer in Coens Tagesform, den aktuellen Weltzustand und die sichtbaren Zeitkosten ein. Ein isolierter Mechanikwert erklärt noch nicht, welche Lösung für eine bestimmte Aufgabe sinnvoll ist."
        : "情報はCoenの昼夜形態、現在の世界状態、表示される時間コストと組み合わせて判断してください。一つの数値だけでは、特定のクエストでどの解決策が有効かを説明できません。"}</p></section>
      <section><h2>${l.ui.boundary}</h2><p>${page.boundary}</p><p>${l.commonBoundary}</p></section>
      <section><h2>${l.ui.related}</h2><div class="related-grid"><a href="../${page.hub}/"><strong>${locale === "de" ? "Zum Themen-Hub" : "テーマ一覧"}</strong><span>${locale === "de" ? "Alle geprüften Guides dieser Kategorie." : "同じカテゴリーの確認済みガイド。"}</span></a>${related.map(([key, p]) => `<a href="../${key}/"><strong>${p.title}</strong><span>${p.desc}</span></a>`).join("")}</div></section>
      <section><h2>${l.ui.sources}</h2><ul><li><a href="${source[1]}" target="_blank" rel="noreferrer">${source[0]}</a></li></ul></section>
      <section id="page-faq"><h2>${l.ui.faq}</h2><dl class="faq-list">${page.faq.map(([q, a]) => `<div><dt>${q}</dt><dd>${a}</dd></div>`).join("")}</dl></section>
    </article><aside class="article-aside"><h2>${l.ui.quick}</h2><p>${page.quick}</p><a href="../">${l.home}</a><a href="../${page.hub}/">${locale === "de" ? "Themenübersicht" : "テーマ一覧"}</a>${related.slice(0, 3).map(([key, p]) => `<a href="../${key}/">${p.title}</a>`).join("")}</aside></div>
  </main>
  <footer class="site-footer"><p>${locale === "de" ? "Unabhängiger, inoffizieller Guide. Bestätigte Fakten sind belegt; offene Details klar markiert." : "独立・非公式攻略サイト。確認済み情報には出典を付け、未確定事項を明確に区別します。"}</p></footer>
</body></html>`;
}

function hubPage(locale, route, title, description) {
  const l = content[locale];
  const cards = Object.entries(l.pages).filter(([, p]) => p.hub === route);
  const url = `${SITE}/${locale}/${route}/`;
  return `<!doctype html><html lang="${l.htmlLang}"><head>${ADS}
  <meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title} | The Blood of Dawnwalker Wiki</title><meta name="description" content="${description}" />
  <meta name="robots" content="index, follow, max-image-preview:large" /><link rel="canonical" href="${url}" />
  <link rel="alternate" hreflang="${l.htmlLang}" href="${url}" /><link rel="alternate" hreflang="x-default" href="${SITE}/${route}/" />
  <link rel="stylesheet" href="../../styles.css" /><script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"CollectionPage",name:title,description,url,inLanguage:l.htmlLang,dateModified:DATE})}</script></head>
  <body><header class="site-header"><a class="brand" href="../"><span class="brand-mark">BD</span><span><strong>The Blood of Dawnwalker</strong><small>${l.label}</small></span></a><nav aria-label="Main navigation"><a href="../release-guides/">${locale === "de" ? "Release" : "発売"}</a><a href="../gameplay-guides/">${locale === "de" ? "Gameplay" : "システム"}</a><a href="../story-guides/">${locale === "de" ? "Story" : "人物"}</a><a href="../technical-guides/">${locale === "de" ? "Technik" : "技術"}</a>${languageMenu(locale, route)}</nav></header>
  <main><section class="hero"><div class="hero-media"></div><div class="hero-overlay"></div><div class="hero-content"><p class="eyebrow">${l.ui.verified}</p><h1>${title}</h1><p>${description}</p><div class="hero-actions"><a class="btn primary" href="#guides">${locale === "de" ? "Guides ansehen" : "ガイドを見る"}</a><a class="btn secondary" href="../">${l.home}</a></div></div></section>
  <section class="fact-strip"><div><strong>${cards.length}</strong><span>${locale === "de" ? "vertiefte Seiten" : "詳細ページ"}</span></div><div><strong>100%</strong><span>${locale === "de" ? "quellengeprüft" : "出典確認"}</span></div><div><strong>2026-07-26</strong><span>${locale === "de" ? "letzte Prüfung" : "最終確認"}</span></div></section>
  <section class="research band"><div class="section-heading"><p class="eyebrow">${locale === "de" ? "Informationsgrenze" : "情報の境界"}</p><h2>${locale === "de" ? "Bestätigt, nicht erfunden" : "確認済み情報を優先"}</h2><p>${l.commonBoundary}</p></div></section>
  <section id="guides"><div class="section-heading"><p class="eyebrow">${locale === "de" ? "Guide-Cluster" : "ガイド集"}</p><h2>${title}</h2></div><div class="guide-grid">${cards.map(([key, p]) => `<a class="guide-card" href="../${key}/"><span class="tag confirmed">${l.ui.verified}</span><h3>${p.title}</h3><p>${p.desc}</p><span class="card-link">${locale === "de" ? "Guide öffnen →" : "詳しく見る →"}</span></a>`).join("")}</div></section></main>
  <footer class="site-footer"><p>${locale === "de" ? "Unabhängiger, inoffizieller Guide." : "独立・非公式攻略サイト。"}</p></footer></body></html>`;
}

function ensureAlternate(file, lang, href) {
  let html = fs.readFileSync(file, "utf8");
  if (new RegExp(`hreflang=["']${lang}["']`).test(html)) return;
  const tag = `<link rel="alternate" hreflang="${lang}" href="${href}" />`;
  if (/<link rel="alternate" hreflang="x-default"/.test(html)) html = html.replace(/<link rel="alternate" hreflang="x-default"/, `${tag}<link rel="alternate" hreflang="x-default"`);
  else html = html.replace("</head>", `${tag}</head>`);
  fs.writeFileSync(file, html);
}

function addSitemapUrl(file, url) {
  let xml = fs.readFileSync(file, "utf8");
  if (xml.includes(`<loc>${url}</loc>`)) return;
  const entry = `  <url><loc>${url}</loc><lastmod>${DATE}</lastmod><changefreq>weekly</changefreq><priority>0.72</priority></url>\n`;
  xml = xml.replace("</urlset>", `${entry}</urlset>`);
  fs.writeFileSync(file, xml);
}

for (const locale of ["de", "ja"]) {
  for (const [route, page] of Object.entries(content[locale].pages)) {
    const dir = path.join(ROOT, locale, route);
    fs.mkdirSync(dir, {recursive: true});
    fs.writeFileSync(path.join(dir, "index.html"), article(locale, route, page));
    addSitemapUrl(path.join(ROOT, `sitemap-${locale}.xml`), routeUrl(locale, route));
    addSitemapUrl(path.join(ROOT, "sitemap.xml"), routeUrl(locale, route));
    const enFile = path.join(ROOT, route, "index.html");
    ensureAlternate(enFile, locale, routeUrl(locale, route));
  }
}

for (const [route, [title, description]] of Object.entries(hubs.ja)) {
  const dir = path.join(ROOT, "ja", route);
  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(path.join(dir, "index.html"), hubPage("ja", route, title, description));
  addSitemapUrl(path.join(ROOT, "sitemap-ja.xml"), `${SITE}/ja/${route}/`);
  addSitemapUrl(path.join(ROOT, "sitemap.xml"), `${SITE}/ja/${route}/`);
}

for (const locale of ["de", "ja"]) {
  const homeFile = path.join(ROOT, locale, "index.html");
  let home = fs.readFileSync(homeFile, "utf8");
  const marker = `<!-- ROUND18-${locale.toUpperCase()}-DEEP-DIVES -->`;
  if (!home.includes(marker)) {
    const cards = Object.entries(content[locale].pages).map(([route, p]) => `<a class="guide-card" href="./${route}/"><span class="tag confirmed">${content[locale].ui.verified}</span><h3>${p.title}</h3><p>${p.desc}</p></a>`).join("");
    const section = `${marker}<section><div class="section-heading"><p class="eyebrow">${locale === "de" ? "Vertiefte Übersetzung" : "日本語コンテンツ拡張"}</p><h2>${locale === "de" ? "Neue und vollständig überarbeitete Guides" : "追加された詳細攻略"}</h2><p>${locale === "de" ? "Diese Seiten nutzen dieselben Artikelkomponenten wie die englische Fassung und bieten eigenständige deutsche Antworten." : "英語版と同じ記事構成を使い、タイトルだけでなく本文・FAQ・検証範囲まで日本語化しています。"}</p></div><div class="guide-grid">${cards}</div></section>`;
    home = home.replace("</main>", `${section}</main>`);
    fs.writeFileSync(homeFile, home);
  }
}

console.log(JSON.stringify({
  round: 18,
  locales: ["de", "ja"],
  upgradedGermanPages: Object.keys(content.de.pages).filter((route) => route !== "parry").length,
  newGermanPages: 1,
  newJapaneseDetailPages: Object.keys(content.ja.pages).length,
  newJapaneseHubs: Object.keys(hubs.ja).length,
}, null, 2));
