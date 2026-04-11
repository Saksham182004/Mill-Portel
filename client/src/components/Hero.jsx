import ImageSection from "./ImageSection";
import AboutSection from "./AboutSection";
import HomeCarousal from "./HomeCarousal";

const Hero = () => {
  return (
    <section
      style={{
        display: "flex",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      <AboutSection />
    </section>
  );
};

export default Hero;
