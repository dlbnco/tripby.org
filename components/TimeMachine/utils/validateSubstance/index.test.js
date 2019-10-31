import validateSubstance from '.';
import methoxetamine from './methoxetamine.mock';
import datura from './datura.mock';
import methamphetamine from './methamphetamine.mock';

describe('substance validator', () => {
  test('should allow substances with total duration and units', () => {
    const methoxetamineResult = validateSubstance(methoxetamine);
    expect(methoxetamineResult).toEqual(['insufflated', 'oral']);
    const methamphetamineResult = validateSubstance(methamphetamine);
    expect(methamphetamineResult).toEqual(['oral']);
  });
  test('should not allow substances with no total duration', () => {
    const result = validateSubstance(datura);
    expect(result).toBe(false);
  });
});
