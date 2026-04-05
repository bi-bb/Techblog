import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this post?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5001/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const totalPosts = posts.length;
  const totalCategories = new Set(posts.map((post) => post.category)).size;
  const latestPosts = posts.slice(0, 5);

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-logo">Penguin Admin</div>

        <nav className="admin-menu">
          <a href="/admin/dashboard" className="admin-menu-item active">
            Dashboard
          </a>
          <a href="/admin/posts" className="admin-menu-item">
            Manage Posts
          </a>
          <a href="/home" className="admin-menu-item">
            View Site
          </a>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1 className="admin-page-title">Dashboard</h1>
            <p className="admin-page-subtitle">
              Manage your blog content and monitor post activity.
            </p>
          </div>

          <Link to="/admin/posts/create" className="create-post-btn">
            + Create Post
          </Link>
        </div>

        <div className="admin-cards">
          <div className="admin-card">
            <p className="admin-card-label">Total Posts</p>
            <h2>{totalPosts}</h2>
          </div>

          <div className="admin-card">
            <p className="admin-card-label">Categories</p>
            <h2>{totalCategories}</h2>
          </div>

          <div className="admin-card">
            <p className="admin-card-label">Recent Posts</p>
            <h2>{posts[0]?.title ? "1 New" : "0"}</h2>
          </div>
        </div>

        <div className="admin-table-card">
          <div className="admin-table-header">
            <h2>Recent Posts</h2>
            <Link to="/admin/posts" className="view-all-link">
              View All
            </Link>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {latestPosts.length > 0 ? (
                  latestPosts.map((post) => (
                    <tr key={post._id}>
                      <td>{post.title}</td>
                      <td>{post.category}</td>
                      <td>{post.author}</td>
                      <td>
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td>
                        <div className="table-actions">
                          <Link
                            to={`/admin/posts/edit/${post._id}`}
                            className="edit-btn"
                          >
                            Edit
                          </Link>

                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(post._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-row">
                      No posts available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;