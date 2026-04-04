import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../styles/AdminPostForm.css";

function AdminPostForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    author: "",
    image: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEditMode);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    if (user.role !== "admin") {
      navigate("/home");
      return;
    }

    if (isEditMode) {
      fetchPost();
    }
  }, [id, isEditMode, navigate]);

  const fetchPost = async () => {
    try {
      setPageLoading(true);

      const response = await fetch(`http://localhost:5001/api/posts/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch post");
      }

      setFormData({
        title: data.title || "",
        description: data.description || "",
        content: data.content || "",
        category: data.category || "",
        author: data.author || "",
        image: data.image || "",
        tags: data.tags ? data.tags.join(", ") : "",
      });

      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      };

      const url = isEditMode
        ? `http://localhost:5001/api/posts/${id}`
        : "http://localhost:5001/api/posts";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save post");
      }

      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <p className="admin-form-loading">Loading post data...</p>;
  }

  return (
    <div className="admin-form-page">
      <div className="admin-form-header">
        <div>
          <p className="admin-form-breadcrumb">
            <Link to="/admin/dashboard">Dashboard</Link>
            <span> / </span>
            <span>{isEditMode ? "Edit Post" : "Create Post"}</span>
          </p>
          <h1 className="admin-form-title">
            {isEditMode ? "Edit Post" : "Create New Post"}
          </h1>
          <p className="admin-form-subtitle">
            {isEditMode
              ? "Update your article details and keep your content fresh."
              : "Fill in the details below to publish a new article."}
          </p>
        </div>

        <Link to="/admin/dashboard" className="admin-back-btn">
          Back to Dashboard
        </Link>
      </div>

      {error && <p className="admin-form-error">{error}</p>}

      <div className="admin-form-card">
        <form onSubmit={handleSubmit} className="admin-post-form">
          <div className="admin-form-grid">
            <div className="admin-form-field admin-form-field-full">
              <label>Post Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter post title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-form-field admin-form-field-full">
              <label>Short Description</label>
              <textarea
                name="description"
                placeholder="Write a short description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="admin-form-field admin-form-field-full">
              <label>Post Content</label>
              <textarea
                name="content"
                placeholder="Write the full content here..."
                value={formData.content}
                onChange={handleChange}
                rows="10"
                required
              />
            </div>

            <div className="admin-form-field">
              <label>Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g. AI, UX/UI, Security"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-field">
              <label>Author</label>
              <input
                type="text"
                name="author"
                placeholder="Author name"
                value={formData.author}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-field">
              <label>Image Path</label>
              <input
                type="text"
                name="image"
                placeholder="/images/ml.jpg"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-field">
              <label>Tags</label>
              <input
                type="text"
                name="tags"
                placeholder="AI, Machine Learning, Beginner"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
          </div>

          {formData.image && (
            <div className="admin-image-preview-box">
              <p className="preview-title">Image Preview</p>
              <img
                src={formData.image}
                alt="Preview"
                className="admin-image-preview"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}

          <div className="admin-form-actions">
            <Link to="/admin/dashboard" className="admin-cancel-btn">
              Cancel
            </Link>

            <button type="submit" className="admin-save-btn" disabled={loading}>
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Publishing..."
                : isEditMode
                ? "Update Post"
                : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminPostForm;