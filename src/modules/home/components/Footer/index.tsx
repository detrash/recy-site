import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

const Footer: React.FC = () => {
  const { locale, locales, pathname, asPath } = useRouter();
  const translate = useTranslations('footer');

  const otherLocation = useMemo(() => {
    if (locales && locale) {
      return locales.filter((location) => location !== locale)[0];
    }
    return '';
  }, [locale, locales]);

  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">
          <div className="text-sm text-gray-600 mr-4">
            ©2021 DETRASH |{' '}
            <a className="text-primary" href="mailto:phil@detrashtoken.com">
              phil@detrashtoken.com
            </a>{' '}
            | Bahia, Brazil | +5571982640517
          </div>

          <div>
            <span> </span>
            <Link href={pathname} as={asPath} locale={otherLocation}>
              <a className="text-primary text-sm">{translate('language')}</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
