import React, { useMemo, useState } from "react";
import "./TravelExperience.css";
import logo from "../../Assets/images/NextTrip logo.png";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="footer-icon" aria-hidden="true">
      <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4H16V5.5c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.3v2.5H9v2.8h2.3v7h2.2Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="footer-icon" aria-hidden="true">
      <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm9.45 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="footer-icon globe-stroke"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

function HeartIcon({ filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`action-icon ${filled ? "filled-heart" : "outline-heart"}`}
      aria-hidden="true"
    >
      <path d="M12 21s-6.7-4.35-9-8.28C1 9.4 2.46 5.9 6.3 5.35A5.2 5.2 0 0 1 12 8.06a5.2 5.2 0 0 1 5.7-2.71c3.84.55 5.3 4.05 3.3 7.37C18.7 16.65 12 21 12 21Z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="action-icon outline-heart" aria-hidden="true">
      <path d="M21 12a8.5 8.5 0 0 1-8.5 8.5 8.76 8.76 0 0 1-3.6-.76L3 21l1.3-5.38A8.45 8.45 0 0 1 3.5 12 8.5 8.5 0 1 1 21 12Z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="action-icon outline-heart" aria-hidden="true">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg viewBox="0 0 24 24" className="verified-icon" aria-hidden="true">
      <path d="M12 2.8l2.2 1.5 2.7-.1 1.4 2.3 2.3 1.4-.1 2.7 1.5 2.2-1.5 2.2.1 2.7-2.3 1.4-1.4 2.3-2.7-.1L12 21.2l-2.2-1.5-2.7.1-1.4-2.3-2.3-1.4.1-2.7-1.5-2.2 1.5-2.2-.1-2.7 2.3-1.4 1.4-2.3 2.7.1L12 2.8Zm-1.1 11.5 5-5-1.1-1.1-3.9 3.9-1.8-1.8-1.1 1.1 2.9 2.9Z" />
    </svg>
  );
}

function Header() {
  return (
    <header className="trip-header">
      <div className="trip-container trip-header-inner">
        <div className="home-logo">
              <img src={logo} alt="NextTrip" className="logo-img" />
            </div>

        <nav className="trip-nav">
          <a href="#">Explore</a>
          <a href="#">Deals</a>
          <a href="#">Agency</a>
          <a href="#">Support</a>
        </nav>

        <div className="trip-header-actions">
          <div className="trip-profile-icon">👤</div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="trip-footer">
      <div className="trip-container trip-footer-grid">
        <div>
             <div className="home-logo">
              <img src={logo} alt="NextTrip" className="logo-img" />
            </div>
        </div>

        <div>
          <h4>Site</h4>
          <div className="footer-links">
            <p>Experiences</p>
            <p>Offers</p>
            <p>About us</p>
            <p>Contact us</p>
          </div>
        </div>

        <div>
          <h4>Travels</h4>
          <div className="footer-links">
            <p>Individual</p>
            <p>Group</p>
            <p>Family</p>
            <p>Honeymoon</p>
          </div>
        </div>

        <div>
          <h4>Help</h4>
          <div className="footer-links">
            <p>Help center</p>
            <p>Privacy</p>
            <p>Terms and Condition</p>
            <p>FAQ</p>
          </div>
        </div>

        <div>
          <h4>Newsletter</h4>
          <p className="trip-footer-text trip-footer-text-wide">
            Subscribe to receive exclusive travel offers and discover amazing
            destinations around the world.
          </p>
          <div className="trip-newsletter">
            <input placeholder="Enter your email" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="trip-container trip-footer-bottom">
        <p>© 2026 NextTrip. All rights reserved.</p>
        <div>
          <p>Privacy policy</p>
          <p>Team service</p>
        </div>
      </div>
    </footer>
  );
}

const initialPosts = [
  {
    id: 1,
    user: "Salma El Alaoui",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    location: "Santorini, Greece",
    tripTitle: "Santorini Sunset Dream",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    text: "One of the best trips I ever had. The sunset view from the hotel was amazing and the whole experience felt peaceful and luxurious.",
    likes: 124,
    liked: false,
    comments: [
      { id: 11, user: "Yassine Idrissi", verified: true, text: "The view looks incredible." },
      { id: 12, user: "Imane Zahra", verified: false, text: "I want to book this one too!" },
    ],
  },
  {
    id: 2,
    user: "Yassine Idrissi",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    location: "Kyoto, Japan",
    tripTitle: "Kyoto Heritage Journey",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    text: "Kyoto was calm, elegant, and full of culture. The temples, streets, and traditional atmosphere made the trip unforgettable.",
    likes: 89,
    liked: true,
    comments: [
      { id: 21, user: "Nora Bennis", verified: true, text: "This post makes me want to visit Japan." },
    ],
  },
  {
    id: 3,
    user: "Nora Bennis",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    location: "Swiss Alps, Switzerland",
    tripTitle: "Swiss Alpine Escape",
    image:
      "https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=1200&q=80",
    text: "Everything felt premium, from the train ride to the mountain lodge. The scenery was unreal and the air was so fresh.",
    likes: 156,
    liked: false,
    comments: [
      { id: 31, user: "Salma El Alaoui", verified: true, text: "The mountains here are beautiful." },
      { id: 32, user: "Ayoub Chraibi", verified: false, text: "This looks like a dream trip." },
    ],
  },
];

export default function TravelExperience() {
  const [posts, setPosts] = useState(initialPosts);
  const [commentInputs, setCommentInputs] = useState({});
  const [composer, setComposer] = useState({
    location: "",
    tripTitle: "",
    image: "",
    text: "",
  });
  const [uploadedImageName, setUploadedImageName] = useState("");

  const totalLikes = useMemo(
    () => posts.reduce((sum, post) => sum + post.likes, 0),
    [posts]
  );

  const totalComments = useMemo(
    () => posts.reduce((sum, post) => sum + post.comments.length, 0),
    [posts]
  );

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        const liked = !post.liked;
        return {
          ...post,
          liked,
          likes: liked ? post.likes + 1 : post.likes - 1,
        };
      })
    );
  };

  const handleCommentInput = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const addComment = (postId) => {
    const text = (commentInputs[postId] || "").trim();
    if (!text) return;

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              user: "You",
              verified: true,
              text,
            },
          ],
        };
      })
    );

    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleComposerChange = (e) => {
    const { name, value } = e.target;
    setComposer((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setComposer((prev) => ({ ...prev, image: imageUrl }));
    setUploadedImageName(file.name);
  };

  const addPost = () => {
    if (!composer.tripTitle.trim() || !composer.text.trim()) {
      alert("Please fill at least the trip title and experience text.");
      return;
    }

    const newPost = {
      id: Date.now(),
      user: "Unknown Traveler",
      avatar: "",
      verified: false,
      location: composer.location || "Custom destination",
      tripTitle: composer.tripTitle,
      image: composer.image || "",
      text: composer.text,
      likes: 0,
      liked: false,
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    setComposer({
      location: "",
      tripTitle: "",
      image: "",
      text: "",
    });
    setUploadedImageName("");
  };

  return (
    <div className="travel-page">
      <Header />

      <section className="community-hero">
        <div className="community-hero-overlay" />
        <div className="trip-container community-hero-content">
          <p className="community-badge">TRAVEL EXPERIENCE COMMUNITY</p>
          <h1>Share Your Journey</h1>
          <p>
            Travelers can post their experiences, receive likes and comments,
            and inspire others with real memories.
          </p>
        </div>
      </section>

      <main className="community-main">
        <div className="community-grid">
          <aside className="community-sidebar">
            <section className="community-card">
              <p className="section-badge">COMMUNITY OVERVIEW</p>
              <h2>Travelers Hub</h2>

              <div className="stats-grid">
                <div className="stat-box">
                  <p>POSTS</p>
                  <h3>{posts.length}</h3>
                </div>

                <div className="stat-box">
                  <p>LIKES</p>
                  <h3>{totalLikes}</h3>
                </div>

                <div className="stat-box stat-box-full">
                  <p>COMMENTS</p>
                  <h3>{totalComments}</h3>
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
                  onChange={handleComposerChange}
                  placeholder="Destination or city"
                />

                <input
                  name="tripTitle"
                  value={composer.tripTitle}
                  onChange={handleComposerChange}
                  placeholder="Trip title"
                />

                <div className="upload-box">
                  <label>Upload image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="upload-input"
                  />
                  <p className="upload-text">
                    {uploadedImageName
                      ? `Selected: ${uploadedImageName}`
                      : "No image selected yet."}
                  </p>
                </div>

                <textarea
                  name="text"
                  value={composer.text}
                  onChange={handleComposerChange}
                  rows={6}
                  placeholder="Share your travel experience..."
                />

                <button type="button" className="publish-btn" onClick={addPost}>
                  Publish Experience
                </button>
              </div>
            </section>
          </aside>

          <section className="posts-list">
            {posts.map((post) => (
              <article key={post.id} className="post-card">
                <div className="post-card-inner">
                  <div className="post-top">
                    <div className="post-user">
                      {post.avatar ? (
                        <img
                          src={post.avatar}
                          alt={post.user}
                          className="user-avatar"
                        />
                      ) : (
                        <div className="unknown-avatar">👤</div>
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

                        <p className="user-meta">
                          {post.location} • shared a real travel experience
                        </p>
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
                    </div>
                  </div>

                  <div className="post-actions">
                    <button
                      type="button"
                      onClick={() => toggleLike(post.id)}
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
                        value={commentInputs[post.id] || ""}
                        onChange={(e) =>
                          handleCommentInput(post.id, e.target.value)
                        }
                        placeholder="Write a comment..."
                      />
                      <button
                        type="button"
                        onClick={() => addComment(post.id)}
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}