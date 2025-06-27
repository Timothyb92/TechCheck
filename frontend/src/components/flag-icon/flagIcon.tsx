const getCountryCodeFromLocale = (locale: string): string => {
  const map: Record<string, string> = {
    id: 'id', // Indonesian
    da: 'dk', // Danish
    de: 'de', // German
    'en-GB': 'gb', // English (UK)
    'en-US': 'us', // English (US)
    'es-ES': 'es', // Spanish (Spain)
    'es-419': 'mx', // Spanish (LATAM) – Mexico as a general LATAM flag
    fr: 'fr', // French
    hr: 'hr', // Croatian
    it: 'it', // Italian
    lt: 'lt', // Lithuanian
    hu: 'hu', // Hungarian
    nl: 'nl', // Dutch
    no: 'no', // Norwegian
    pl: 'pl', // Polish
    'pt-BR': 'br', // Portuguese (Brazil)
    ro: 'ro', // Romanian
    fi: 'fi', // Finnish
    'sv-SE': 'se', // Swedish
    vi: 'vn', // Vietnamese
    tr: 'tr', // Turkish
    cs: 'cz', // Czech
    el: 'gr', // Greek
    bg: 'bg', // Bulgarian
    ru: 'ru', // Russian
    uk: 'ua', // Ukrainian
    hi: 'in', // Hindi (India)
    th: 'th', // Thai
    'zh-CN': 'cn', // Chinese (Simplified)
    ja: 'jp', // Japanese
    'zh-TW': 'tw', // Chinese (Traditional)
    ko: 'kr', // Korean
  };

  return map[locale] || 'xx'; // fallback to unknown
};

export const FlagIcon = ({
  locale,
  className = '',
}: {
  locale: string;
  className?: string;
}) => {
  return (
    <div
      className={`fi fi-${getCountryCodeFromLocale(locale)} ${className}`}
    ></div>
  );
};
