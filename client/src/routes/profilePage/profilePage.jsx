import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profilePage">
      <div className="profile-details">
        <div className="profile-card">
          <div className="profile-header">
            <h1>User Information</h1>
            <Link to="/profile/update" className="update-profile-btn">
              <button className="button">Update Profile</button>
            </Link>
          </div>
          <div className="profile-body">
            <div className="profile-avatar">
              <span className="label"></span>
              <img
                src={currentUser.avatar || "noavatar.jpg"}
                alt="User Avatar"
                className="avatar"
              />
            </div>
            <div className="profile-info">
              <div className="info-item">
                <span className="label">Username:</span>
                <b>{currentUser.username}</b>
              </div>
              <div className="info-item">
                <span className="label">Email:</span>
                <b>{currentUser.email}</b>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="title">
          <h1>My List</h1><br />
          <Link to="/add" className="create-new-post">
            <button className="button">Create New Post</button>
          </Link>
        </div>
        <br />
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <List posts={postResponse.data.userPosts} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ProfilePage;
