import React from "react";
import { PlusIcon } from "./ExperienceIcons";

export default function CommunitySidebar({
  stats,
  composer,
  uploadedImageName,
  onComposerChange,
  onImageUpload,
  onPublish,
}) {
  return (
    <aside className="community-sidebar">
      <section className="community-card">
        <p className="section-badge">COMMUNITY OVERVIEW</p>
        <h2>Travelers Hub</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <p>POSTS</p>
            <h3>{stats.posts}</h3>
          </div>
          <div className="stat-box">
            <p>LIKES</p>
            <h3>{stats.likes}</h3>
          </div>
          <div className="stat-box stat-box-full">
            <p>COMMENTS</p>
            <h3>{stats.comments}</h3>
          </div>
        </div>
      </section>

      <section className="community-card">
        <div className="compose-head">
          <div className="compose-icon">
            <PlusIcon />
          </div>
          <div>
            <p className="section-badge">ADD EXPERIENCE</p>
            <h3>Create a new post</h3>
          </div>
        </div>
        <div className="composer-form">
          <input
            name="location"
            value={composer.location}
            onChange={onComposerChange}
            placeholder="Destination or city"
          />
          <input
            name="tripTitle"
            value={composer.tripTitle}
            onChange={onComposerChange}
            placeholder="Trip title"
          />
          <div className="upload-box">
            <label>Upload image</label>
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="upload-input"
            />
            <p className="upload-text">
              {uploadedImageName ? `Selected: ${uploadedImageName}` : "No image selected yet."}
            </p>
          </div>
          <textarea
            name="text"
            value={composer.text}
            onChange={onComposerChange}
            rows={6}
            placeholder="Share your travel experience..."
          />
          <button type="button" className="publish-btn" onClick={onPublish}>
            Publish Experience
          </button>
        </div>
      </section>
    </aside>
  );
}
