import React from "react";
import { User } from "lucide-react";
import { CommentIcon, HeartIcon, VerifiedIcon } from "./ExperienceIcons";

export default function ExperiencePostCard({
  post,
  commentValue,
  onToggleLike,
  onCommentChange,
  onAddComment,
  onOpenDetails,
}) {
  return (
    <article className="post-card">
      <div className="post-card-inner">
        <div className="post-top">
          <div className="post-user">
            {post.avatar ? (
              <img
                src={post.avatar}
                alt={post.user}
                className="user-avatar"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="unknown-avatar" aria-hidden="true">
                <User size={16} />
              </div>
            )}
            <div>
              <div className="user-name-row">
                <h3>{post.user}</h3>
                {post.verified ? (
                  <div className="verified-badge">
                    <VerifiedIcon />
                    <span>Verified Traveler</span>
                  </div>
                ) : null}
              </div>
              <p className="user-meta">{post.location} | shared a real travel experience</p>
            </div>
          </div>
          <div className="post-label">POST</div>
        </div>

        <div className="post-media-box">
          {post.image ? (
            <img
              src={post.image}
              alt={post.tripTitle}
              className="post-image"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="post-placeholder">
              <div>
                <p>TRAVEL STORY</p>
                <h5>{post.tripTitle}</h5>
                <span>{post.location}</span>
              </div>
            </div>
          )}
          <div className="post-content">
            <h4>{post.tripTitle}</h4>
            <p>{post.text}</p>
            <button
              type="button"
              className="post-details-link"
              onClick={() => onOpenDetails(post.id)}
            >
              View experience details
            </button>
          </div>
        </div>

        <div className="post-actions">
          <button
            type="button"
            onClick={() => onToggleLike(post.id)}
            className={`like-btn ${post.liked ? "liked" : ""}`}
          >
            <HeartIcon filled={post.liked} />
            <span>{post.likes} Likes</span>
          </button>
          <div className="comments-count">
            <CommentIcon />
            <span>{post.comments.length} Comments</span>
          </div>
        </div>

        <div className="comments-box">
          <div className="comments-head">
            <h5>TRAVELER COMMENTS</h5>
            <span>{post.comments.length} replies</span>
          </div>
          <div className="comments-list">
            {post.comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-user-row">
                  <p>{comment.user}</p>
                  {comment.verified ? (
                    <div className="verified-badge small-badge">
                      <VerifiedIcon />
                      <span>Verified Traveler</span>
                    </div>
                  ) : null}
                </div>
                <span className="comment-text">{comment.text}</span>
              </div>
            ))}
          </div>
          <div className="comment-form">
            <input
              value={commentValue}
              onChange={(event) => onCommentChange(post.id, event.target.value)}
              placeholder="Write a comment..."
            />
            <button type="button" onClick={() => onAddComment(post.id)}>
              Comment
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
