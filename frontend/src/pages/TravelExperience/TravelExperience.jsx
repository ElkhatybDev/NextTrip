import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { initialExperiencePosts } from "../../data/travelExperienceContent";
import CommunitySidebar from "./components/CommunitySidebar";
import ExperiencePostCard from "./components/ExperiencePostCard";
import "./TravelExperience.css";

const emptyComposer = {
  location: "",
  tripTitle: "",
  image: "",
  text: "",
};

export default function TravelExperience() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(initialExperiencePosts);
  const [commentInputs, setCommentInputs] = useState({});
  const [composer, setComposer] = useState(emptyComposer);
  const [uploadedImageName, setUploadedImageName] = useState("");
  const uploadedImageUrlsRef = useRef(new Set());

  useEffect(() => {
    const uploadedImageUrls = uploadedImageUrlsRef.current;

    return () => {
      uploadedImageUrls.forEach((imageUrl) => URL.revokeObjectURL(imageUrl));
      uploadedImageUrls.clear();
    };
  }, []);

  const communityStats = useMemo(
    () => ({
      posts: posts.length,
      likes: posts.reduce((sum, post) => sum + post.likes, 0),
      comments: posts.reduce((sum, post) => sum + post.comments.length, 0),
    }),
    [posts]
  );

  const toggleLike = (postId) => {
    setPosts((previousPosts) =>
      previousPosts.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        const liked = !post.liked;
        return { ...post, liked, likes: liked ? post.likes + 1 : post.likes - 1 };
      })
    );
  };

  const handleCommentInput = (postId, value) => {
    setCommentInputs((previousInputs) => ({ ...previousInputs, [postId]: value }));
  };

  const addComment = (postId) => {
    const text = (commentInputs[postId] || "").trim();
    if (!text) {
      return;
    }

    setPosts((previousPosts) =>
      previousPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: Date.now(), user: "You", verified: true, text },
              ],
            }
          : post
      )
    );
    setCommentInputs((previousInputs) => ({ ...previousInputs, [postId]: "" }));
  };

  const handleComposerChange = (event) => {
    const { name, value } = event.target;
    setComposer((previousComposer) => ({ ...previousComposer, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    uploadedImageUrlsRef.current.add(imageUrl);

    setComposer((previousComposer) => {
      if (
        previousComposer.image &&
        uploadedImageUrlsRef.current.has(previousComposer.image)
      ) {
        URL.revokeObjectURL(previousComposer.image);
        uploadedImageUrlsRef.current.delete(previousComposer.image);
      }

      return {
        ...previousComposer,
        image: imageUrl,
      };
    });
    setUploadedImageName(file.name);
  };

  const addPost = () => {
    if (!composer.tripTitle.trim() || !composer.text.trim()) {
      return;
    }

    setPosts((previousPosts) => [
      {
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
      },
      ...previousPosts,
    ]);
    setComposer(emptyComposer);
    setUploadedImageName("");
  };

  return (
    <div className="travel-page">
      <Navbar />
      <section className="community-hero">
        <div className="community-hero-overlay" />
        <div className="trip-container community-hero-content">
          <p className="community-badge">TRAVEL EXPERIENCE COMMUNITY</p>
          <h1>Share Your Journey</h1>
          <p>
            Travelers can post their experiences, receive likes and comments, and inspire
            others with real memories.
          </p>
        </div>
      </section>

      <main className="community-main">
        <div className="community-grid">
          <CommunitySidebar
            stats={communityStats}
            composer={composer}
            uploadedImageName={uploadedImageName}
            onComposerChange={handleComposerChange}
            onImageUpload={handleImageUpload}
            onPublish={addPost}
          />

          <section className="posts-list">
            {posts.map((post) => (
              <ExperiencePostCard
                key={post.id}
                post={post}
                commentValue={commentInputs[post.id] || ""}
                onToggleLike={toggleLike}
                onCommentChange={handleCommentInput}
                onAddComment={addComment}
                onOpenDetails={(postId) => navigate(`/experience/${postId}`)}
              />
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
