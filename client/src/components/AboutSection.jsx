import HomeCarousal from "./HomeCarousal";

const AboutSection = () => {
  return (
    <section className="container my-5">
      <div className="row align-items-center g-5">
        
        {/* Left: Image / Carousel */}
        <div className="col-md-6">
          <HomeCarousal />
        </div>

        {/* Right: About Content */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">
            About Our Flour Mill
          </h2>

          <p className="text-muted fs-6">
            We are a trusted flour mill committed to delivering high-quality
            milling services for farmers, retailers, and businesses. With
            modern machinery and skilled professionals, we ensure purity,
            consistency, and timely service.
          </p>

          <div className="mt-4">
            <p className="mb-2">
              <strong>Owner:</strong> Ravindra Sutar
            </p>
            <p className="mb-2">
              <strong>Location:</strong> Datta Colony Ajara , 416505
            </p>
            <p className="mb-2">
              <strong>Milling Services:</strong> Wheat Flour, Rice, Atta ,Dal
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
