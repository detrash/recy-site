import ContactForm from '@modules/home/components/ContactForm';
import CTA from '@modules/home/components/CTA';
import FeatureBlocks from '@modules/home/components/FeatureBlocks';
import FeatureHome from '@modules/home/components/FeatureHome';
import HeroHome from '@modules/home/components/HeroHome';
import Testimonials from '@modules/home/components/Testimonials';
import { getHomePageQuery, HomePageData } from '@modules/home/graphql/queries';
import {
  contactFormSchema,
  ContactFormSchema,
  INITIAL_FORM_VALUES,
} from '@modules/home/utils/YupSchema';
import { homeApolloClient } from '@shared/lib/apollo';
import { Formik } from 'formik';
import { GetStaticProps } from 'next';

type HomePageProps = {
  messages: HomePageData;
};

const Home: React.FC<HomePageProps> = ({ messages }) => {
  const handleSubmitContactForm = (formData: ContactFormSchema) => {
    console.log(formData);
  };

  return (
    <main className="flex-grow">
      <HeroHome messages={messages} />
      <FeatureHome messages={messages} />
      <FeatureBlocks messages={messages} />
      <Testimonials messages={messages} />
      <CTA messages={messages} />
      <Formik
        initialValues={INITIAL_FORM_VALUES}
        validationSchema={contactFormSchema}
        onSubmit={handleSubmitContactForm}
      >
        {(formikProps) => <ContactForm {...formikProps} />}
      </Formik>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { data } = await homeApolloClient.query({
    query: getHomePageQuery,
    variables: {
      locale,
    },
  });

  if (data) {
    return {
      props: {
        messages: {
          ...data.homePages[0]?.homePageJSON,
          ...(await import(`@modules/home/i18n/${locale}.json`)).default,
          homeImages: data.homePages[0]?.homeImages,
        },
      },
      revalidate: 60 * 60 * 24, // 1 day
    };
  }

  return {
    props: {},
  };
};

export default Home;
