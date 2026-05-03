import React, {useState} from "react";
import JobContext from "../Context/JobContext";
import {Link, useNavigate } from "react-router-dom";
const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  
  
  const navigate = useNavigate();

   const handleSearch = () => {
     navigate(`/all/jobs?keyword=${keyword}&location=${location}`);
  };
 
  const Categories = [
    { name: "IT & Tech", value: "it-tech", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600", color: "#4361ee" },
    { name: "Creative Design", value: "creative-design", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600", color: "#f72585" },
    { name: "Marketing", value: "marketing", img: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=600", color: "#4cc9f0" },
    { name: "Finance", value: "finance", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600", color: "#7209b7" }
  ];

  return (
    <div className="page-wrapper fade-in">
      <div className="decorative-orb orb-1"></div>
      <div className="decorative-orb orb-2"></div>
      <section className="hero-grand-section d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7 text-start">
              <div className="badge-glow mb-3">🚀 India's #1 Premium Job Portal</div>
              <h1 className="hero-title mb-3">
                Elevate Your <br />
                <span>Professional Journey</span>
              </h1>
              <p className="hero-subtitle mb-5">
                Connect with 500+ top-tier tech startups and Fortune 500 companies. 
                Your dream career is just one click away.
              </p>
              
              <div className="grand-search-container">
                <div className="search-glass-wrapper d-flex align-items-center shadow-lg">
                  <div className="search-input-group flex-grow-1">
                    <input className="form-control"
                     placeholder="Job Title or Skill" 
                     value={keyword}
                     onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>
                  <div className="v-divider"></div>
                  <div className="search-input-group flex-grow-1">
                    <input className="form-control"
                     placeholder="Location"
                    value={location}
                     onChange={(e) => setLocation(e.target.value)}
                     />
                  </div>
                  <button className="btn btn-aurora ms-2" onClick={handleSearch}>Search Jobs</button>
                </div>
              </div>

              <div className="mt-5 stats-row d-flex gap-5">
                <div className="stat-item"><h4>500k+</h4><p>Active Jobs</p></div>
                <div className="stat-item mx-4"><h4>12k+</h4><p>Companies</p></div>
                <div className="stat-item"><h4>98%</h4><p>Success Rate</p></div>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-block">
              <div className="hero-visual-wrapper position-relative text-center">
                {/* Main Feature Card */}
                <div className="main-glass-card shadow-elite fade-in">
                  <div className="d-flex align-items-center mb-3">
                    <div className="pulse-icon me-3">🚀</div>
                    <h5 className="fw-bold mb-0 text-white">Premium Hiring</h5>
                  </div>
                  <div className="progress mb-2" style={{height: '8px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)'}}>
                    <div className="progress-bar" style={{width: '75%', background: 'var(--grad)'}}></div>
                  </div>
                  <small className="text-white fw-bold">95% Success Rate this week</small>
                </div>
                <div className="floating-badge shadow-lg" style={{top: '10%', right: '-10%'}}>
                  <span className="me-2">🔥</span> 200+ Hired Today
                </div>
                <div className="floating-badge shadow-lg" style={{bottom: '15%', left: '-5%'}}>
                  <span className="me-2">💼</span> High Salary Roles
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-100">
        <div className="section-header text-center mb-5  text-maroon">
           <h2 className="display-5 fw-bold ">Explore Trending Domains</h2>
           <p className="text-muted">Find the specialized role that fits your talent perfectly</p>
        </div>
        <div className="category-grid">
          {Categories.map((category, i) => (
            <div className="category-aurora-card" key={i} style={{'--card-color': category.color}}>
              <img src={category.img} alt={category.name} className="cat-bg-img" />
              <div className="cat-content">
                <h4 className="fw-bold">{category.name}</h4>
                <Link to={`/all/jobs?category=${category.value}`} className="btn-explore" >Explore</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;