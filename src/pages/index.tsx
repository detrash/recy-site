import FeaturesBlocks from '../components/FeatureBlocks';
import FeaturesHome from '../components/FeaturesHome';
import HeroHome from '../components/HeroHome';
import Testimonials from '../components/Testimonials';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <main className="flex-grow">
        <HeroHome />
        <FeaturesHome />
        <FeaturesBlocks />
        <Testimonials />
      </main>
    </div>
  );
};

export default Home;
