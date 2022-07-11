import ContactForm from '@src/components/ContactForm';
import CTA from '@src/components/CTA';
import FeatureBlocks from '@src/components/FeatureBlocks';
import FeatureHome from '@src/components/FeatureHome';
import HeroHome from '@src/components/HeroHome';
import Testimonials from '@src/components/Testimonials';
import { getHomePageQuery, HomePageData } from '@src/graphql/queries';
import { apolloClient } from '@src/lib/apollo';
import {
  contactFormSchema,
  ContactFormSchema,
  INITIAL_FORM_VALUES,
} from '@src/utils/YupSchema';
import { Formik } from 'formik';
import { GetStaticProps } from 'next';

type HomePageProps = {
  pageItems: HomePageData;
};

const Home: React.FC<HomePageProps> = ({ pageItems }) => {
  const handleSubmitContactForm = (formData: ContactFormSchema) => {
    console.log(formData);
  };

  return (
    <main className="flex-grow">
      <HeroHome pageItems={pageItems} />
      <FeatureHome pageItems={pageItems} />
      <FeatureBlocks pageItems={pageItems} />
      <Testimonials pageItems={pageItems} />
      <CTA pageItems={pageItems} />
      <Formik
        initialValues={INITIAL_FORM_VALUES}
        validationSchema={contactFormSchema}
        onSubmit={handleSubmitContactForm}
      >
        {(formikProps) => (
          <ContactForm pageItems={pageItems} {...formikProps} />
        )}
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
        pageItems: data.homePages[0]?.homePageJSON,
      },
      revalidate: 60 * 60 * 24, // 1 day
    };
  }

  return {
    props: {},
  };
};

export default Home;
