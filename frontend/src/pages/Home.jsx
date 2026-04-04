import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";



function Home() {
  // USER PART
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // POST PART
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postError, setPostError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/posts");

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        console.log("Fetched posts:", data);
        setPosts(data);
      } catch (error) {
        setPostError(error.message);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div >
      

      <div className="home-content">
        <h1 className="hometxt">Home</h1>
      </div>

      <div className="posts-section">
        <h2 className="section-title"> Blog Posts</h2>

        {loadingPosts && <p>Loading posts...</p>}

        {postError && <p>{postError}</p>}

        {!loadingPosts && !postError && posts.length === 0 && (
          <p>No posts found.</p>
        )}

        <div className="post-list">
          {posts.map((post) => (
            <div className="post-card" key={post._id}>
              <img
                src={post.image || "/images/default.jpg"}
                alt={post.title}
                className="post-image"
              />

              <div className="post-content-box">
                <p className="post-category">{post.category}</p>

                <h3 className="post-title">{post.title}</h3>

                <p className="post-description">{post.description}</p>

                <p className="post-author">By {post.author}</p>

                <Link to={`/post/${post._id}`} className="read-more-btn">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;