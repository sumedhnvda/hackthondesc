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
        <h1>Discover Your Cultural Guru & Experience Heritage Events!</h1>
        <p>The Samskruti app offers a unique platform for users to connect with skilled experts in various cultural domains. 
    Whether you're looking to learn a traditional dance form, master a craft, immerse yourself in the culinary arts of a region, 
    or explore local cultural events and join them.
            </p>
            
        </div>
        </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}
export default HomePage;
