import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { CheckCircle } from 'phosphor-react';
import { APP_NAV_LINKS } from 'src/utils/navLinks';

const DoneForm: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col flex-1">
      <section className="flex flex-col flex-1 justify-center items-center gap-4">
        <CheckCircle className="w-40 h-40 text-success" weight="fill" />
        <h2 className="text-2xl font-bold">{t('submit:done_title')}</h2>
        <h3 className="text-lg">{t('submit:done_message')}</h3>
      </section>
      <div className="flex items-end justify-center">
        <Link href={APP_NAV_LINKS.APP}>
          <button className="btn btn-primary text-white no-animation w-full sm:w-auto">
            {t('submit:go_to_dashboard')}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoneForm;
