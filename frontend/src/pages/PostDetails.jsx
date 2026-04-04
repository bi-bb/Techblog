import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/PostDetails.css";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.name || "Guest";

  useEffect(() => {
    fetchPostDetail();
  }, [id]);

  const fetchPostDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5001/api/posts/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }

      const data = await response.json();
      setPost(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:5001/api/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            text: commentText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const data = await response.json();

      setPost((prev) => ({
        ...prev,
        comments: data.comments,
      }));

      setCommentText("");
    } catch (err) {
      alert(err.message);
    }
  };

  const startEditComment = (comment) => {
    setEditingCommentId(comment._id);
    setEditingText(comment.text);
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  const handleEditComment = async (commentId) => {
    if (!editingText.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:5001/api/posts/${id}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            text: editingText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update comment");
      }

      const data = await response.json();

      setPost((prev) => ({
        ...prev,
        comments: data.comments,
      }));

      setEditingCommentId(null);
      setEditingText("");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5001/api/posts/${id}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      const data = await response.json();

      setPost((prev) => ({
        ...prev,
        comments: data.comments,
      }));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="loading-text">{error}</p>;
  if (!post) return <p className="loading-text">Post not found</p>;

  return (
    <div className="post-details-page">
      <div className="post-details-container">
        <div className="post-hero">
          <div className="post-hero-text">
            <p className="post-detail-category">{post.category}</p>
            <h1 className="post-detail-title">{post.title}</h1>
            <p className="post-detail-description">{post.description}</p>

            <div className="post-meta">
              <span>By {post.author}</span>
              <span>•</span>
              <span>
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : "No date"}
              </span>
            </div>
          </div>

          <div className="post-hero-image-box">
            <img
              src={post.image}
              alt={post.title}
              className="detail-image"
            />
          </div>
        </div>

        <div className="post-body-card">
          <h2 className="section-title">Article</h2>
          <p className="post-detail-content">{post.content}</p>
        </div>

        <div className="post-tags-card">
          <h3 className="section-title">Tags</h3>
          <div className="tag-list">
            {post.tags?.map((tag, index) => (
              <span key={index} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="comments-card">
          <h2 className="section-title">Comments</h2>

          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <div className="comment-user-row">
              <span className="comment-user-label">Commenting as</span>
              <span className="comment-user-name">{userName}</span>
            </div>

            <textarea
              className="comment-textarea"
              placeholder="Write your comment here..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows="5"
            />

            <button type="submit" className="comment-submit-btn">
              Post Comment
            </button>
          </form>

          <div className="comments-list">
            {post.comments && post.comments.length > 0 ? (
              post.comments
                .slice()
                .reverse()
                .map((comment) => (
                  <div key={comment._id} className="comment-item">
                    <div className="comment-avatar">
                      {comment.userName?.charAt(0).toUpperCase()}
                    </div>

                    <div className="comment-content">
                      <div className="comment-header">
                        <div className="comment-header-left">
                          <span className="comment-name">{comment.userName}</span>
                          <span className="comment-date">
                            {comment.createdAt
                              ? new Date(comment.createdAt).toLocaleDateString()
                              : ""}
                          </span>
                        </div>

                        {comment.userName === userName && (
                          <div className="comment-actions">
                            <button
                              type="button"
                              className="comment-action-btn edit-btn"
                              onClick={() => startEditComment(comment)}
                            >
                             Edit
                            </button>

                            <button
                              type="button"
                              className="comment-action-btn delete-btn"
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>

                      {editingCommentId === comment._id ? (
                        <div className="edit-comment-box">
                          <textarea
                            className="edit-comment-textarea"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            rows="4"
                          />

                          <div className="edit-comment-actions">
                            <button
                              type="button"
                              className="save-edit-btn"
                              onClick={() => handleEditComment(comment._id)}
                            >
                              Save
                            </button>

                            <button
                              type="button"
                              className="cancel-edit-btn"
                              onClick={cancelEditComment}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="comment-text">{comment.text}</p>
                      )}
                    </div>
                  </div>
                ))
            ) : (
              <p className="no-comments-text">
                No comments yet. Be the first to comment.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;