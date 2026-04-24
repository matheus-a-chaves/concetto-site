import "./App.css";
import ContactSection from "./sections/ContactSection/ContactSection";
import CoverageSection from "./sections/CoverageSection/CoverageSection";
import FeedbackSection from "./sections/FeedbackSection/FeedbackSection";
import FooterSection from "./sections/FooterSection/FooterSection";
import GallerySection from "./sections/GallerySection/GallerySection";
import HomeSection from "./sections/HomeSection/HomeSection";
import ProcessSection from "./sections/ProcessSection/ProcessSection";

function App() {
  return (
    <main className="page">
      <HomeSection />
      <GallerySection />
      <CoverageSection />
      <ProcessSection />
      <FeedbackSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}

export default App;
