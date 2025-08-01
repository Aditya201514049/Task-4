import { useState, useEffect } from "react";
import { login } from "../api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/home";
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await login(email, password);
    setLoading(false);
    if (res.token) {
      localStorage.setItem("token", res.token);
      
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }
      window.location.href = "/home";
    } else {
      setError(res.error || "Login failed");
    }
  }

  return (
    <div className="min-vh-100 d-flex auth-page">
             
       <div className="col-lg-8 col-md-7 d-flex align-items-center justify-content-center p-1 p-lg-2">
         <div className="w-100" style={{ maxWidth: "360px" }}>
           
           <div className="text-center mb-2">
            <h1 className="display-6 fw-bold text-primary mb-2">
              <i className="bi bi-shield-lock me-2"></i>
              User Management
            </h1>
            <p className="text-muted">Start your journey</p>
          </div>

                    
           <div className="card border-0 shadow-lg auth-card">
             <div className="card-body p-2 p-lg-3">
               <h2 className="h6 fw-bold text-dark mb-2">Sign In to Your Account</h2>
              
              <form onSubmit={handleSubmit}>
                                                  
                 <div className="mb-1">
                   <label className="form-label fw-semibold text-dark mb-1 small">
                    <i className="bi bi-envelope me-2 text-primary"></i>
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
                    <i className="bi bi-lock me-2 text-primary"></i>
                    Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
                      placeholder="Enter your password"
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
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label text-muted" htmlFor="rememberMe">
                      Remember me
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

                               
                 <button 
                   className="btn btn-primary w-100 mb-1"  
                  disabled={loading}
                  type="submit"
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Sign In
                    </>
                  )}
                </button>
              </form>

                            
               <div className="d-flex justify-content-between align-items-center mt-2">
                 <a href="/register" className="text-decoration-none text-primary fw-semibold">
                   <i className="bi bi-person-plus me-1"></i>
                   Don't have an account? Sign up
                 </a>
                 <a href="#" className="text-decoration-none text-primary fw-semibold">
                   Forgot password?
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
             <i className="bi bi-shield-check" style={{ fontSize: '4rem', opacity: 0.8 }}></i>
           </div>
           <h3 className="fw-bold mb-3">Welcome Back!</h3>
           <p className="mb-0 opacity-75">
             Access your user management dashboard with secure authentication
           </p>
         </div>


      </div>
    </div>
  );
}

export default LoginPage;