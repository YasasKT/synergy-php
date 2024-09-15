import React from 'react';
import { useParams } from 'react-router-dom';
import blogImage from '../../images/Blog-image.png';
import './BlogDetailed.css';

const BlogDetailed = () => {
  const { id } = useParams();

  // You can either fetch blog details dynamically by ID or use static content for demonstration
  const blogDetails = {
    title: `Title of the Blog ${id}`,
    date: 'Some date',
    content: `This is the detailed content of Blog ${id}. You can add as much content as needed here to explain your blog post.`
  };

  return (
    <div className="blog-detail-container">
      <img src={blogImage} alt="Blog" className="blog-detail-image" />
      <div className="blog-detail-content">
        <h1>{blogDetails.title}</h1>
        <p><strong>Date:</strong> {blogDetails.date}</p>
        <p>{blogDetails.content}</p>
      </div>
    </div>
  );
};

export default BlogDetailed;
