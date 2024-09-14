import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../images/Contactus.png";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import AnimatedSection from "../../components/AnimatedSection";
import "./ContactContent.css";
import { API_BASE_URL } from './../../../network/config';

const ContactContent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    success: false,
    error: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormStatus({ success: true, error: false });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setFormStatus({ success: false, error: true });
      }
      navigate("/confirmation");
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus({ success: false, error: true });
    }
  };

  const emailAddress = "info@synergyeng.biz";
  const mapLocationUrl = "https://maps.app.goo.gl/jFTYCHwoe5arQnGZ8";

  return (
    <section className="contact-us-section">
      <div className="contact-container">
        <div className="contact-left">
          <AnimatedSection animationType="slideInFromLeft">
            <h1>
              Get in Touch
              <br />
              With <span className="highlight">US</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animationType="slideInFromLeft" delay={500}>
            <h2>Let's Talk!</h2>
            <p>
              Get in touch with us using the enquiry form or contact information
              below.
            </p>
          </AnimatedSection>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <AnimatedSection animationType="fadeIn" delay={800}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </AnimatedSection>
              <AnimatedSection animationType="fadeIn" delay={1200}>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </AnimatedSection>
            </div>
            <AnimatedSection animationType="fadeIn" delay={1600}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </AnimatedSection>
            <AnimatedSection animationType="fadeIn" delay={2000}>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                value={formData.subject}
                onChange={handleChange}
              />
            </AnimatedSection>
            <AnimatedSection animationType="fadeIn" delay={2400}>
              <textarea
                name="message"
                placeholder="Message"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </AnimatedSection>
            <button type="submit">Submit</button>
            {formStatus.success && (
              <p className="success-message">Message sent successfully!</p>
            )}
            {formStatus.error && (
              <p className="error-message">
                Failed to send the message. Please try again.
              </p>
            )}
          </form>
        </div>
        <div className="contact-right">
            <AnimatedSection animationType="fadeIn" delay={400}>
            <img src={Image} alt="Contact Us" className="contact-image" />
            </AnimatedSection>
            <div className="contact-info">
              <div className="contact-info-item">
              <AnimatedSection animationType="fadeIn" delay={800}>
                <div className="icon">
                  <FaPhone size={35} />
                </div>
              </AnimatedSection>  
              <AnimatedSection animationType="slideInFromRight" delay={800}>
                <div className="contact-item-text">
                  <p className="contact-info-header">Phone</p>
                  <p className="contact-info-text">+94 112 156 815</p>
                </div>
                </AnimatedSection>
              </div>
              <div className="contact-info-item">
              <AnimatedSection animationType="fadeIn" delay={1200}>
                <div className="icon">
                  <MdEmail size={35} />
                </div>
                </AnimatedSection>
                <AnimatedSection animationType="slideInFromRight" delay={1200}>
                <div className="contact-item-text">
                  <p className="contact-info-header">Email</p>
                  <p className="contact-info-text">
                    <a href={`mailto:${emailAddress}`} className="email-link">
                      {emailAddress}
                    </a>
                  </p>
                </div>
                </AnimatedSection>
              </div>
              <div className="contact-info-item">
              <AnimatedSection animationType="fadeIn" delay={1600}>
                <div className="icon">
                  <FaMapMarkerAlt size={35} />
                </div>
                </AnimatedSection>
                <AnimatedSection animationType="slideInFromRight" delay={1600}>
                <div className="contact-item-text">
                  <p className="contact-info-header">Location</p>
                  <p className="contact-info-text">
                    <a
                      href={mapLocationUrl}
                      className="map-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      452 B Susilarama Road, Malabe, Sri Lanka
                    </a>
                  </p>
                </div>
                </AnimatedSection>
              </div>
            </div>
            <div className="follow-us">
              <AnimatedSection animationType="fadeIn" delay={2000}>
              <h3>Follow Us</h3>
              </AnimatedSection>
              <div className="social-icons">
                <AnimatedSection animationType="rotate" delay={2400}>
                <a href="https://web.facebook.com/synergypvtltd">
                  <FaFacebook size={35} />
                </a>
                </AnimatedSection>
                <AnimatedSection animationType="rotate" delay={2800}>
                <a href="https://www.linkedin.com/company/synergypvtltd/">
                  <FaLinkedin size={35} />
                </a>
                </AnimatedSection>
                <AnimatedSection animationType="rotate" delay={3200}>
                <a href="https://www.instagram.com/synergypvtltd">
                  <FaInstagram size={35} />
                </a>
                </AnimatedSection>
              </div>
            </div>
        </div>
      </div>
      <div className="map-container animate-on-load">
        <AnimatedSection animationType="zoomIn">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.888300732019!2d79.95935711140103!3d6.903959018594701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2572a454fd22f%3A0x58a6feabd0342671!2sSynergy%20Engineering%20(Pvt)%20Ltd!5e0!3m2!1sen!2slk!4v1717603168029!5m2!1sen!2slk"
            width="100%"
            height="600"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="company-location"
          ></iframe>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactContent;
