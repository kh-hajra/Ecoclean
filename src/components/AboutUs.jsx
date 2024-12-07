import React from "react";
import "../styles/AboutUs.css";
import MissionImage from '../assets/images/20973.jpg';  
import philo from '../assets/images/philo.svg'; 
import Footer from '../components/ui/Footer';
import BackButton from "./ui/BackButton";
const AboutUs = () => {
  const teamMembers = [
    { name: "John Doe", role: "CEO & Founder", img: "https://via.placeholder.com/150" },
    { name: "Jane Smith", role: "Marketing Head", img: "https://via.placeholder.com/150" },
    { name: "Michael Lee", role: "Operations Manager", img: "https://via.placeholder.com/150" },
    
  ];
  const services = [
    { name: 'Residential Cleaning', route: '/residential' },
    { name: 'Commercial Cleaning', route: '/commercial' },
    { name: 'Event Cleaning', route: '/event' },
    { name: 'Outdoor Cleaning', route: '/outdoor' },
  ];

  return (
    <div className="about-us-container">
      
      {/* Header Section */}
      <header className="hero-section">
      <BackButton to="/" /> 
      <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
        <h1 className="hero-heading">About EcoClean</h1>
        <p className="hero-subtext">
          Transforming spaces with eco-friendly cleaning solutions.
        </p>
        <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
      </header>

      {/* Team Section */}
      <section className="team-section">
        <h2 className="section-heading">Meet Our Team</h2>
        <p className="section-subheading">
          Our dedicated professionals work tirelessly to deliver the best services.
        </p>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.img} alt={member.name} className="member-img" />
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-heading">Our Mission</h2>
            <p>
              At EcoClean, we believe in making the world a cleaner and greener
              place. Our mission is to provide top-notch cleaning services while
              maintaining our commitment to sustainability.
            </p>
            <p>
              Our innovative and eco-friendly approach ensures that every
              service contributes positively to the environment.
            </p>
          </div>
          <div className="about-image">
            <img
              src={MissionImage}
              alt="Eco Mission"
              className="illustration-img"
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="philosophy-content">
          <img
            src={philo}
            alt="Philosophy"
            className="philosophy-img"
          />
          <div className="philosophy-text">
            <h2 className="section-heading">Our Philosophy</h2>
            <p>
              "EcoClean is driven by the principle of blending modern cleaning
              techniques with environmental care. We believe in achieving a
              cleaner tomorrow by acting responsibly today."
            </p>
          </div>
        </div>
      </section>
      <Footer services={services} />
    </div>
  );
};

export default AboutUs;
