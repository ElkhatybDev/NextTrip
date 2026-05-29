import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, Star, ThumbsUp } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { getExperiencePostById } from "../../data/travelExperienceContent";
import "./ExperienceDetails.css";

export default function ExperienceDetails() {
  const { id } = useParams();
  const experience = getExperiencePostById(id);

  if (!experience) {
    return (
      <div className="experience-details-page">
        <Navbar />
        <main className="site-shell experience-details-empty">
          <h1>Experience not found</h1>
          <p>This travel story may have been removed or the link is incorrect.</p>
          <Link to="/experience">Back to experiences</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="experience-details-page">
      <Navbar />

      <main>
        <section className="experience-details-hero">
          <img src={experience.image} alt={experience.tripTitle} />
          <div className="experience-details-overlay" />
          <div className="site-shell experience-details-hero-content">
            <Link to="/experience" className="experience-back-link">
              <ArrowLeft size={16} />
              Back to experiences
            </Link>
            <p className="experience-details-eyebrow">{experience.location}</p>
            <h1>{experience.tripTitle}</h1>
            <div className="experience-author-row">
              <img src={experience.avatar} alt={experience.user} />
              <div>
                <strong>{experience.user}</strong>
                <span>{experience.verified ? "Verified Traveler" : "Traveler"}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="site-shell experience-details-body">
          <article className="experience-story-card">
            <p className="experience-details-eyebrow">Traveler story</p>
            <h2>What made this journey memorable</h2>
            <p>{experience.text}</p>
          </article>

          <aside className="experience-summary-card">
            <div>
              <ThumbsUp size={20} />
              <span>{experience.likes} likes</span>
            </div>
            <div>
              <MessageCircle size={20} />
              <span>{experience.comments.length} comments</span>
            </div>
            <div>
              <Star size={20} />
              <span>{experience.verified ? "Verified post" : "Community post"}</span>
            </div>
          </aside>
        </section>

        <section className="site-shell experience-comments-section">
          <h2>Traveler comments</h2>
          <div className="experience-comments-grid">
            {experience.comments.map((comment) => (
              <div key={comment.id} className="experience-comment-card">
                <strong>{comment.user}</strong>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
