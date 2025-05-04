import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./login.css"; // Importing the external CSS file for custom styles

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    if (!username.trim()) {
      setUsernameMsg("Username cannot be blank");
      return;
    } else {
      setUsernameMsg("");
    }

    if (!password.trim()) {
      setPasswordMsg("Password cannot be blank");
      return;
    } else {
      setPasswordMsg("");
    }

    let body = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/token/generate",
        body
      );
      const token = response.data.token;
      localStorage.clear();
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      const resp = await axios.get(
        "http://localhost:8081/api/auth/user/details",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      switch (resp.data.role) {
        case "INSTRUCTOR":
          navigate("/dashboard");
          break;

        default:
          break;
      }
    } catch (error) {
      setUsernameMsg("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card shadow-lg">
        {/* Card Header */}
        <div className="card-header text-center">
          <h2 className="login-title">Login</h2>
        </div>

        {/* Card Body */}
        <div className="card-body">
          {/* Error Messages */}
          {usernameMsg && (
            <div className="alert alert-danger">{usernameMsg}</div>
          )}
          {passwordMsg && (
            <div className="alert alert-danger">{passwordMsg}</div>
          )}

          {/* Username Field */}
          <div className="mb-4">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameMsg("");
              }}
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordMsg("");
              }}
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button onClick={login} className="btn btn-primary w-100 login-btn">
            Login
          </button>
        </div>

        {/* Card Footer */}
        <div className="card-footer text-center">
          <p>
            Not an Instructor? <Link to="/auth/instructorsignup">Register</Link>
          </p>
          <p>
            <Link to="#">Reset Password</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
