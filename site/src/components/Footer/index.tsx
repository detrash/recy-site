import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

const Footer: React.FC = () => {
  const { locale, locales, pathname, asPath } = useRouter();
  const translate = useTranslations("footer");

  const otherLocation = useMemo(() => {
    if (locales && locale) {
      return locales.filter((location) => location !== locale)[0];
    }
    return "";
  }, [locale, locales]);

  return (
    <footer>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-4 border-t border-gray-200 md:flex md:items-center md:justify-between md:py-8">
          <div className="mr-4 text-sm text-gray-600">
            ©2024 DETRASH |{" "}
            <a className="text-primary" href="mailto:phil@detrashtoken.com">
              phil@detrashtoken.com
            </a>{" "}
            | Bahia, Brazil | +5571982640517 |{" "}
            <Link href="/privacy-policy">
              <a className="text-sm text-primary">
                {translate("privacyPolicy")}
              </a>
            </Link>
          </div>

          <div>
            <span> </span>
            <Link href={pathname} as={asPath} locale={otherLocation}>
              <a className="text-sm text-primary">{translate("language")}</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
