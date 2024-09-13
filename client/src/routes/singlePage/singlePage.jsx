import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  // Function to handle redirect to Google Form
  const handleRegister = () => {
    if (post.googleform) {
      window.open(post.googleform, "_blank"); // Opens in a new tab
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="pin" />
                  <span>{post.address}</span>
                </div>
                {post.googleform && (
                  <button className="registerButton" onClick={handleRegister}>
                    Register / Know More
                  </button>
                )}
                <div className="price">Rs {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt={post.user.username} />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail?.desc || ""),
              }}
            ></div>
            <div className="mapContainer">
              <Map items={[post]} />
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        {/* Optional features section */}
      </div>
    </div>
  );
}

export default SinglePage;
