import Carousel from "react-bootstrap/Carousel";
import "./Carousal.css";

const HomeCarousel = () => {
  return (
    <div className="carousel-glow">
      <Carousel fade interval={3000}>
        
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://plus.unsplash.com/premium_photo-1661920615655-cf7c362a5109?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Flour mill machinery"
          />
          <Carousel.Caption>
            <h3>Modern Milling</h3>
            <p>Quality milling with modern machinery</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://plus.unsplash.com/premium_photo-1682144551791-e400fcae2a2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Wheat flour processing"
          />
          <Carousel.Caption>
            <h3>Pure & Hygienic</h3>
            <p>Clean processing with high safety standards</p>
          </Carousel.Caption>
        </Carousel.Item>

         <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/id/501796880/photo/flour-milling-plant.jpg?s=1024x1024&w=is&k=20&c=TWq2X3uMYDW_as-VC6CEAI2d0AlKgU-4q5vaI0sYvgo="
            alt="Wheat flour processing"
          />
          <Carousel.Caption>
            <h3>Best in your Town</h3>
            <p>Affordable</p>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    </div>
  );
};

export default HomeCarousel;



