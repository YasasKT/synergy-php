import React, { useState } from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import blogImage from '../../images/Blog-image.png';
import './BlogGrid.css';

const BlogGrid = () => {

  const [showRecent, setShowRecent] = useState(true);

  const handleShowRecent = () => setShowRecent(true);
  const handleShowAll = () => setShowRecent(false);

  return (
    <section className="blog-grid-section">
      <AnimatedSection animationType="slideInFromBottom">
      <div className='blog-selection'>
            <span
            className={`blog-selection-text ${showRecent ? 'active' : ''}`}
            onClick={handleShowRecent}
            >
                Recent
            </span>
            <span 
            className={`blog-selection-text ${!showRecent ? 'active' : ''}`}
            onClick={handleShowAll}
            >
                All
            </span>
        </div>
      <div className="blogs-grid">
        <div className="blog-card">
          <img src={blogImage} alt="Blog" className="blog-card-image" />
          <div className="blog-card-content">
            <h2>Title of the Blog</h2>
            <p><strong>Date:</strong> Some date</p>
            <p>Summary of the blog</p>
            <button className="read-now-button">Read Now</button>
          </div>
        </div>
        <div className="blog-card">
          <img src={blogImage} alt="Blog" className="blog-card-image" />
          <div className="blog-card-content">
            <h2>Title of the Blog</h2>
            <p><strong>Date:</strong> Some date</p>
            <p>Summary of the blog</p>
            <button className="read-now-button">Read Now</button>
          </div>
        </div>
        <div className="blog-card">
          <img src={blogImage} alt="Blog" className="blog-card-image" />
          <div className="blog-card-content">
            <h2>Title of the Blog</h2>
            <p><strong>Date:</strong> Some date</p>
            <p>Summary of the blog</p>
            <button className="read-now-button">Read Now</button>
          </div>
        </div>
        <div className="blog-card">
          <img src={blogImage} alt="Blog" className="blog-card-image" />
          <div className="blog-card-content">
            <h2>Title of the Blog</h2>
            <p><strong>Date:</strong> Some date</p>
            <p>Summary of the blog</p>
            <button className="read-now-button">Read Now</button>
          </div>
        </div>
      </div>
      </AnimatedSection>
    </section>
  );
};

export default BlogGrid;
