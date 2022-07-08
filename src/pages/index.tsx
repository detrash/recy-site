import ContactForm from '@src/components/ContactForm';
import CTA from '@src/components/CTA';
import FeaturesBlocks from '@src/components/FeatureBlocks';
import FeaturesHome from '@src/components/FeaturesHome';
import HeroHome from '@src/components/HeroHome';
import Testimonials from '@src/components/Testimonials';
import {
  contactFormSchema,
  ContactFormSchema,
  INITIAL_FORM_VALUES,
} from '@src/utils/YupSchema';
import { Formik } from 'formik';

const Home: React.FC = () => {
  const handleSubmitContactForm = (formData: ContactFormSchema) => {
    console.log(formData);
  };

  return (
    <main className="flex-grow">
      <HeroHome />
      <FeaturesHome />
      <FeaturesBlocks />
      <Testimonials />
      <CTA />
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

export default Home;
