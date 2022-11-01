import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getPageTranslations = (translations: string[] = []) => {
  return async ({ locale }: GetStaticPropsContext) => ({
    props: {
      ...(await serverSideTranslations(locale ?? 'en', translations)),
    },
  });
};
