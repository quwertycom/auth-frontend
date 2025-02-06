export const getPasswordStrength = (password: string): number => {
  if (!password) {
    return 0; // Level 0: Empty
  }

  const criteria = {
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    length: password.length >= 8,
    specialChar: /[^A-Za-z0-9]/.test(password),
  };

  const minCriteriaMet =
    (criteria.lowercase ? 1 : 0) +
    (criteria.uppercase ? 1 : 0) +
    (criteria.number ? 1 : 0) +
    (criteria.length ? 1 : 0);

  const meetsMinRequirements = minCriteriaMet === 4;

  if (!meetsMinRequirements) {
    if (minCriteriaMet <= 1) return 1; // Level 1: Very Weak (1 or less criteria) - assuming level 1 is needed
    if (minCriteriaMet <= 3) return 2; // Level 2: Weak (2 or 3 criteria)
  }

  if (meetsMinRequirements) {
    // Level 3: Minimum requirements met
    const meetsLengthSecureRequirement = password.length >= 12;
    const meetsSymbolRequirement = criteria.specialChar;
    const isMediumLengthWithSymbol = password.length >= 8 && password.length <= 11 && meetsSymbolRequirement;
    const isLongLengthWithoutSymbol = password.length >= 12 && !meetsSymbolRequirement;


    if (isLongLengthWithoutSymbol || isMediumLengthWithSymbol) {
      return 4; // Level 4: Secure password level 1
    } else if (meetsLengthSecureRequirement && meetsSymbolRequirement) {
      return 5; // Level 5: Secure password level 2 (Very Strong)
    } else {
      return 3; // Level 3: Minimum requirements only (Correct Password)
    }
  }

  return 0; // Default to level 0 if none of the above conditions are met (should not happen in normal flow)
};

export default getPasswordStrength; 