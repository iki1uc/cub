export const Move = {

  // Orbit mathematisch bewegen
  shiftOrbit(value) {
    const drift = trackKernelDrift(value);
    Aufzug.setSharedValue("orbitIndex", value);
    return {
      value,
      drift,
      depth: axiomDepth(value),
      zone: axiomZone(value)
    };
  },

  // Axiom physikalisch bewegen
  shiftAxiom(axiom) {
    return {
      axiom,
      class: classifyAxiom(axiom),
      depth: axiomDepth(axiom),
      zone: axiomZone(axiom)
    };
  },

  // Etage bewegen
  moveToFloor(id) {
    Aufzug.navigate(id);
    return { moved: true, target: id };
  },

  // Vollständige Kernel-Bewegung
  kernelMotion(value, axiom) {
    return trackAll(value, axiom, value % 3, value % 9, value % 27);
  }
};
