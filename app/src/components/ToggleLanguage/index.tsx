import router, { useRouter } from "next/router";

const localesWithlabels: {
  [key: string]: string;
} = {
  en: "English",
  es: "Español",
  pt: "Português",
};

export const ToggleLanguage = () => {
  const { locale, locales } = useRouter();

  const handleToggleLanguage = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: newLocale });
  };
  return (
    <select
      className="select select-bordered  ml-auto"
      onChange={(e) => handleToggleLanguage(e.currentTarget.value)}
      defaultValue={locale}
    >
      {locales?.map((locale) => (
        <option key={locale} value={locale}>
          {localesWithlabels[locale]}
        </option>
      ))}
    </select>
  );
};
