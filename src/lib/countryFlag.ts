const countryFlags: Record<string, string> = {
  Singapore: '🇸🇬',
  Malaysia: '🇲🇾',
  Vietnam: '🇻🇳',
  Indonesia: '🇮🇩',
  Thailand: '🇹🇭',
};

/** Looks up the flag emoji for a country name; falls back to an empty string when unmapped. */
export function getCountryFlag(country: string): string {
  return countryFlags[country] ?? '';
}
