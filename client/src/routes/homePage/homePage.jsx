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
            <h1 className="title">Find your Cultural Guru & Master the Skills</h1>
        <p>The Samskruti app provides a unique platform for users to connect with skilled experts in various cultural domains. 
            Whether you're looking to learn a traditional dance form, master a craft, or immerse yourself in the culinary arts of a region, 
            Samskruti makes it easy to find the right mentors.
            </p>
            <SearchBar></SearchBar>
        </div>
        </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}
export default HomePage;
