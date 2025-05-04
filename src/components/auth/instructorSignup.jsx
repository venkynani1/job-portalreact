import axios from "axios";
import "./instructorsignup.css"; // Importing CSS for styling
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css"; // Importing Bootstrap Icons

function InstructorSignUp() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null); // For success/error feedback
  const navigate = useNavigate();

  const signUp = async ($e) => {
    $e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/api/instructor/add",
        {
          firstName,
          lastName,
          email,
          user: {
            username,
            password,
          },
        }
      );
      setMessage({
        type: "success",
        text: "Sign Up successful! Redirecting to login...",
      });
      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      setMessage({ type: "danger", text: "Sign Up failed. Please try again." });
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-sm-3"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <i className="bi bi-person-plus-fill me-2"></i>
                Register Instructor!
              </div>
              <div className="card-body">
                {message && (
                  <div className={`alert alert-${message.type}`} role="alert">
                    <i
                      className={`bi ${
                        message.type === "success"
                          ? "bi-check-circle-fill"
                          : "bi-exclamation-triangle-fill"
                      } me-2`}
                    ></i>
                    {message.text}
                  </div>
                )}
                <form className="row g-3" onSubmit={signUp}>
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      <i className="bi bi-person-fill me-1"></i>First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      <i className="bi bi-person-fill me-1"></i>Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="username" className="form-label">
                      <i className="bi bi-person-badge-fill me-1"></i>Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">
                      <i className="bi bi-lock-fill me-1"></i>Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="email" className="form-label">
                      <i className="bi bi-envelope-fill me-1"></i>Email-id
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="col-12 text-end">
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-box-arrow-in-right me-1"></i> Sign Up
                    </button>
                  </div>
                </form>
              </div>

              <div className="card-footer">
                <span>
                  <i className="bi bi-shield-lock-fill me-1"></i>
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy.
                </span>
                <br />
                <button className="btn-login" onClick={() => navigate("/")}>
                  <i className="bi bi-arrow-right-circle me-1"></i>Already have
                  an account? Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorSignUp;
