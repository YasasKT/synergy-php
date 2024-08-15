import React, { useEffect, useState } from "react";
import AnimatedSection from "../../components/AnimatedSection";
import "./HeroBlog.css";
import { Navigate, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./../../../network/config";

const BlogsPage = () => {
  const [latestBlog, setLatestBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the latest blog from the backend
    const fetchLatestBlog = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blogs/latest`);
        const data = await response.json();
        setLatestBlog(data);
      } catch (error) {
        console.error("Error fetching the latest blog:", error);
      }
    };

    fetchLatestBlog();
  }, []);

  const handleReadNow = () => {
    if (latestBlog) {
      Navigate(`/blog/${latestBlog.id}`);
    }
  };

  if (!latestBlog) {
    return <p>Loading...</p>;
  }

  return (
    <section className="blogs-hero-section">
      <AnimatedSection animationType="fadeIn">
        <div className="blogs-hero-content">
          <div className="blogs-hero-text">
            <h1>
              Our
              <br />
              <span className="highlight">BLOGS</span>
            </h1>
          </div>
          <div className="blog-card-hero">
            <h2 className="heroblog-header">{latestBlog.title}</h2>
            <p>
              <strong>Date:</strong> {latestBlog.date}
            </p>
            <p>{latestBlog.summary}</p>
            <button className="read-now-button-blog" onClick={handleReadNow}>
              Read Now
            </button>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection animationType="slideInFromLeft">
        <hr className="horizontal-line" />
      </AnimatedSection>
    </section>
  );
};

export default BlogsPage;
