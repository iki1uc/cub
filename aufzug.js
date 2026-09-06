const AXIOM_LIFT = {

  symbols: ["◉", "3", "9", "◎", "81", "◆", "△", "▣", "27", "3↺"],

  segments: {
    HY: ["◉", "3"],
    PE: ["9", "◎"],
    PER: ["81", "◆"],
    TRANS: ["△"],
    WARB: ["27"],
    KANAL: ["▣"],
    TMPalpha: ["3", "◎", "27"],
    TMPbeta: ["9", "81", "▣"],
    TMPgamma: ["◆", "756", "△"]
  },

  timing(value) {
    return {
      t3: value % 3,
      t9: value % 9,
      t81: value % 81,
      t27: value % 27,
      loop: value % 3 === 0 ? "3↺" : null
    };
  }
};
