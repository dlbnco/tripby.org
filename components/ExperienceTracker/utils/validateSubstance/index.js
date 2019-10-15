/**
 * Validates wether substance is eligible
 * for the time machine.
 *
 * @param {Object} substance
 * @returns {string[]|boolean} roas The list of valid roas; false if none is valid
 */
const validateSubstance = substance => {
  let roas = [];
  substance.roas.forEach(roa => {
    if (
      roa?.duration?.total?.units &&
      (roa?.duration?.total?.max || roa?.duration?.total?.min)
    ) {
      roas.push(roa.name);
    }
  });
  if (roas.length > 0) {
    return roas;
  }
  return false;
};

export default validateSubstance;
