import { Formik } from 'formik';
import ContactForm from '../components/ContactForm';
import CTA from '../components/CTA';
import FeaturesBlocks from '../components/FeatureBlocks';
import FeaturesHome from '../components/FeaturesHome';
import Footer from '../components/Footer';
import HeroHome from '../components/HeroHome';
import Testimonials from '../components/Testimonials';
import { ContactFormSchema, contactFormSchema } from '../utils/YupSchema';

const INITIAL_VALUES: ContactFormSchema = {
  name: '',
  emailAddress: '',
  message: '',
};

const Home: React.FC = () => {
  const handleSubmitContactForm = (formData: ContactFormSchema) => {
    console.log(formData);
  };

  return (
    <>
      <main className="flex-grow">
        <HeroHome />
        <FeaturesHome />
        <FeaturesBlocks />
        <Testimonials />
        <CTA />
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={contactFormSchema}
          onSubmit={handleSubmitContactForm}
        >
          {(formikProps) => <ContactForm {...formikProps} />}
        </Formik>
      </main>

      <Footer />
    </>
  );
};

export default Home;
