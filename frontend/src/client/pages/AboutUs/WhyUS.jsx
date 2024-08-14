import React from "react";
import AnimatedSection from "../../components/AnimatedSection";
import "./WhyUS.css";
import companyLogo from "../../images/Synergy_logo.png";

const WhyUs = () => {
  return (
    <section className="why-us">
      <AnimatedSection animationType="slideInFromLeft">
        <div className="content">
          <h2>
            Why
            <br />
            <strong className="highlight">SYNERGY?</strong>
          </h2>
          <p>
            We are committed to providing exceptional services and solutions to
            our clients. Our expertise in mechanical, electrical, and plumbing
            (MEP) systems ensures that we deliver innovative, safe, and
            energy-efficient solutions that meet our clients' needs. We strive
            for excellence in everything we do, and our goal is to be recognized
            as the leading provider of MEP services.
          </p>
        </div>
      </AnimatedSection>
      <div className="logo-container-why">
        <img src={companyLogo} alt="Company Logo" className="half-logo" />
      </div>
    </section>
  );
};

export default WhyUs;
