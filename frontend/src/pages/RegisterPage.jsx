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
    
    // Password validation
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
      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      setError(res.error || "Registration failed");
    }
  }

  return (
    <div className="min-vh-100 d-flex auth-page">
      {/* Left Side - Register Form */}
      <div className="col-lg-8 col-md-7 d-flex align-items-center justify-content-center p-4 p-lg-5">
        <div className="w-100" style={{ maxWidth: "450px" }}>
          {/* Brand */}
          <div className="text-center mb-5">
            <h1 className="display-6 fw-bold text-primary mb-2">
              <i className="bi bi-shield-lock me-2"></i>
              User Management
            </h1>
            <p className="text-muted">Join our community</p>
          </div>

          {/* Register Form */}
          <div className="card border-0 shadow-lg auth-card">
            <div className="card-body p-4 p-lg-5">
              <h2 className="h3 fw-bold text-dark mb-4">Create Your Account</h2>
              
              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark mb-2">
                    <i className="bi bi-person me-2 text-primary"></i>
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

                {/* Email Field */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark mb-2">
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

                {/* Password Field */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark mb-2">
                    <i className="bi bi-lock me-2 text-primary"></i>
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

                {/* Confirm Password Field */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark mb-2">
                    <i className="bi bi-lock-fill me-2 text-primary"></i>
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

                {/* Terms and Conditions */}
                <div className="mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="terms" required />
                    <label className="form-check-label text-muted" htmlFor="terms">
                      I agree to the <a href="#" className="text-primary text-decoration-none">Terms of Service</a> and <a href="#" className="text-primary text-decoration-none">Privacy Policy</a>
                    </label>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setError("")}
                    ></button>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
                    <i className="bi bi-check-circle me-2"></i>
                    {success}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setSuccess("")}
                    ></button>
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  className="btn btn-primary btn-lg w-100 mb-4" 
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

              {/* Links */}
              <div className="text-center">
                <a href="/login" className="text-decoration-none text-primary fw-semibold">
                  <i className="bi bi-arrow-left me-1"></i>
                  Already have an account? Sign in
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-muted small">
              © 2024 User Management System. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative Background */}
      <div className="col-lg-4 col-md-5 d-none d-md-flex align-items-center justify-content-center position-relative overflow-hidden auth-sidebar">
        <div className="position-absolute w-100 h-100" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          opacity: 0.9
        }}></div>
        
        {/* Decorative Elements */}
        <div className="position-relative text-center text-white">
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