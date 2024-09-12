import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
          googleform: inputs.googleform,  // Include google form input
        },
        postDetail: {
          desc: value,
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
      setError("Failed to create post.");
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" required />
            </div>
            <div className="item">
              <label htmlFor="address">Phone Number</label>
              <input id="address" name="address" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="googleform">Google Form Link</label>
              <input
                id="googleform"
                name="googleform"
                type="url"
                placeholder="https://forms.gle/..."
                required
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="property">Type</label>
              <select name="property" required>
                <option value="Events">Events</option>
                <option value="Classes">Classes</option>
              </select>
            </div>
            <button className="sendButton" type="submit">Add</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dwx9xjt1w",
            uploadPreset: "samskruti",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
