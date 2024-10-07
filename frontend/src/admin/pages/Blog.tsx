import React, { useState } from "react";
import "../css/main.css";
import "../css/blogs.css";
import Header from "../components/Header";
import SearchBar from "../components/Search";
import SmallButton from "../components/SmallButton";
import { useNavigate } from "react-router-dom";

function Blogs() {
  const navigate = useNavigate();

  // Simulated blog data
  const [blogs, setBlogs] = useState([
    {
      id: "1",
      title: "How to Learn React",
      author: "John Doe",
      date: "2024-10-01",
      summary: "This blog explains the steps to learn React efficiently.",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    },
    {
      id: "2",
      title: "Understanding JavaScript Closures",
      author: "Jane Smith",
      date: "2024-09-25",
      summary: "A deep dive into JavaScript closures and their use cases.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      title: "CSS Grid vs Flexbox",
      author: "Emily Johnson",
      date: "2024-09-18",
      summary: "An article comparing CSS Grid and Flexbox for layout design.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "4",
      title: "Mastering TypeScript",
      author: "Michael Brown",
      date: "2024-09-10",
      summary: "Learn how to get started with TypeScript and its features.",
      imageUrl: "https://via.placeholder.com/150",
    },
    // Add more blogs as needed
  ]);

  const [query, setQuery] = useState("");

  const handleEditClick = (blogId: string) => {
    // Navigate to edit page with blog id
    navigate(`/admin/blogs/edit/${blogId}`);
  };

  const handleDeleteClick = (blogId: string) => {
    // Remove blog by id
    setBlogs(blogs.filter((blog) => blog.id !== blogId));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Filter blogs by title based on search query
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Header />
      <section id="section">
        <div className="flex">
          <SearchBar
            query={query}
            onSearchChange={handleSearchChange}
            placeholder="Search for Blog Title..."
          />
          <SmallButton to="/admin/blogs/add" />
        </div>

        <div className="blog-grid">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="blog-image"
                />
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-author">By {blog.author}</p>
                <p className="blog-date">{new Date(blog.date).toLocaleDateString()}</p>
                <p className="blog-summary">{blog.summary}</p>
                <div className="blog-actions">
                  <button
                    className="blog-btn"
                    onClick={() => handleEditClick(blog.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="blog-btn-del"
                    onClick={() => handleDeleteClick(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No blogs available.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Blogs;
