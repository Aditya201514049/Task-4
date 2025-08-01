import { useState, useEffect } from "react";
import { register } from "../api";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/home";
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    const res = await register(name, email, password);
    setLoading(false);
    if (res.message) {
      setSuccess("Registration successful! Redirecting to login...");
      
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      setError(res.error || "Registration failed");
    }
  }

  return (
    <div className="min-vh-100 d-flex auth-page">
             
       <div className="col-lg-8 col-md-7 d-flex align-items-center justify-content-center p-1 p-lg-2">
         <div className="w-100" style={{ maxWidth: "360px" }}>
                     
           <div className="text-center mb-2">
             <h1 className="h4 fw-bold text-primary mb-1">
               <i className="bi bi-shield-lock me-2"></i>
               User Management
             </h1>
             <p className="text-muted small">Join our community</p>
           </div>

                    
           <div className="card border-0 shadow-lg auth-card">
             <div className="card-body p-2 p-lg-3">
               <h2 className="h6 fw-bold text-dark mb-2">Create Your Account</h2>
              
      <form onSubmit={handleSubmit}>
                                                                   {/* Name Field */}
                 <div className="mb-1">
                   <label className="form-label fw-semibold text-dark mb-1 small">
                     <i className="bi bi-person me-1 text-primary"></i>
                     Full Name
                   </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
                      placeholder="Enter your full name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                    <i className="bi bi-person position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                  </div>
                </div>

                                                                   
                 <div className="mb-1">
                   <label className="form-label fw-semibold text-dark mb-1 small">
                     <i className="bi bi-envelope me-1 text-primary"></i>
                     E-mail
                   </label>
                  <div className="position-relative">
                    <input
                      type="email"
                      className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
                      placeholder="test@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <i className="bi bi-envelope position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                  </div>
                </div>

                                                                  
                 <div className="mb-1">
                   <label className="form-label fw-semibold text-dark mb-1 small">
                     <i className="bi bi-lock me-1 text-primary"></i>
                     Password
                   </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-3 text-muted p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                                           <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                   </button>
                 </div>
               </div>

                                                                   
                 <div className="mb-1">
                   <label className="form-label fw-semibold text-dark mb-1 small">
                     <i className="bi bi-lock-fill me-1 text-primary"></i>
                     Confirm Password
                   </label>
                  <div className="position-relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-3 text-muted p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                </div>

                                                  
                 <div className="mb-1">
                   <div className="form-check">
                     <input className="form-check-input" type="checkbox" id="terms" required />
                     <label className="form-check-label text-muted small" htmlFor="terms">
                       I agree to the <a href="#" className="text-primary text-decoration-none">Terms of Service</a> and <a href="#" className="text-primary text-decoration-none">Privacy Policy</a>
                     </label>
                   </div>
                 </div>

                                 
                 {error && (
                   <div className="alert alert-danger alert-dismissible fade show mb-1" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setError("")}
                    ></button>
                  </div>
                )}

                                
                 {success && (
                   <div className="alert alert-success alert-dismissible fade show mb-1" role="alert">
                    <i className="bi bi-check-circle me-2"></i>
                    {success}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setSuccess("")}
                    ></button>
                  </div>
                )}

                                
                 <button 
                   className="btn btn-primary w-100 mb-1"  
                  disabled={loading}
                  type="submit"
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-plus me-2"></i>
                      Create Account
                    </>
                  )}
                </button>
              </form>

              
              <div className="text-center">
                <a href="/login" className="text-decoration-none text-primary fw-semibold">
                  <i className="bi bi-arrow-left me-1"></i>
                  Already have an account? Sign in
                </a>
              </div>
            </div>
          </div>

                     
        </div>
      </div>

     
      <div className="col-lg-4 col-md-5 d-none d-md-flex align-items-center justify-content-center position-relative overflow-hidden auth-sidebar">
        <div className="position-absolute w-100 h-100" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          opacity: 0.9
        }}></div>
        
                
         <div className="position-relative text-center text-white px-3">
           <div className="mb-4">
             <i className="bi bi-people" style={{ fontSize: '4rem', opacity: 0.8 }}></i>
           </div>
           <h3 className="fw-bold mb-3">Join Our Community!</h3>
           <p className="mb-0 opacity-75">
             Create your account and start managing users with our powerful platform
           </p>
         </div>


      </div>
    </div>
  );
}

export default RegisterPage;