import { Link } from "react-router-dom";
import "./card.scss";

function Card({ item }) {
  // Function to handle redirect to Google Form
  const handleRegister = () => {
    if (item.googleform) {
      window.open(item.googleform, "_blank"); // Opens in a new tab
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">Rs {item.price}</p>
      </div>
    </div>
  );
}

export default Card;
