import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="homePage">
      
      <div className="textContainer">
        <div className="wrapper">
        <SearchBar></SearchBar>
        <h1>Uncover Hidden Gems with Local Experts in Karavali!</h1>
<p>Tourzy connects you with local guides who reveal the best-kept secrets of Karavali. Whether you're eager to explore serene beaches, 
discover historical landmarks, or experience authentic cultural traditions, our platform helps you avoid overcrowded spots and dive deep into the true essence of the region.</p>

            
        </div>
        </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}
export default HomePage;
