export const AXIOMIAT = {

  // 1. Stammfamilie – klassische 9e
  family: ["AH", "HA", "ÄH", "HÄ"],

  // 2. Erweiterung – IX / XI / OI / IO
  extension: {
    nine: ["IX", "XI", "OI", "IO"],
    note: "9e‑Erweiterung. Richtungs‑Axiomatik."
  },

  // 3. Sonderzone – AIR / AIV (bewusst getrennt)
  special: {
    air: ["AIR"],
    aiv: ["AIV"],
    note: "Sonderaxiome. Nicht in der 9e‑Familie. Eigene Zone."
  },

  // 4. Zentrum
  center: "NC",

  // 5. Runtime‑Zone – aktive Module
  runtime: {
    ready: ["work.ready"],
    note: "Aktive Arbeitsmodule. Trigger‑Ebene."
  },

  // 6. Symbol‑Zone – alle 9‑Zeichen
  symbols: {
    nine: ["◉", "◎", "◆", "△", "▣"],
    note: "9‑Axiom‑Symbole. Matrix‑Zeichen. Zeit‑/Kanal‑/Transform‑Marker."
  },

  // 7. Meta
  note: "Stammform erweitert. IX/XI/OI/IO integriert. AIR/AIV gesondert. work.ready als Runtime‑Trigger. 9‑Symbole hinzugefügt."
};
