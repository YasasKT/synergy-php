import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BlogImage from "../../images/Blog-image.png";
import "./BlogDetailed.css";
import { API_BASE_URL } from "./../../../network/config";

const BlogDetailed = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch blog details from the backend
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  /* const blog = {
        id,
        title: "Title of the Blog",
        date: "Some date",
        content: "Detailed content of the blog...",
        image: BlogImage,
    }; */

  return (
    <div className="blog-detailed">
      <Header />
      <section className="blog-detailed-section">
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-detailed-image"
        />
        <div className="blog-detailed-content">
          <h1>{blog.title}</h1>
          <p>{blog.date}</p>
          <p>{blog.content}</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogDetailed;
