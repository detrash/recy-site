import { Formik } from 'formik';
import { GetStaticProps } from 'next';
import ContactForm from 'src/components/ContactForm';
import CTA from 'src/components/CTA';
import FeatureBlocks from 'src/components/FeatureBlocks';
import FeatureHome from 'src/components/FeatureHome';
import HeroHome from 'src/components/HeroHome';
import Testimonials from 'src/components/Testimonials';
import { getHomePageQuery, HomePageData } from 'src/graphql/queries';
import { apolloClient } from 'src/lib/apollo';
import {
  ContactFormSchema,
  contactFormSchema,
  INITIAL_FORM_VALUES,
} from 'src/utils/YupSchema';

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
  const { data } = await apolloClient.query({
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
          ...(await import(`src/i18n/${locale}.json`)).default,
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
