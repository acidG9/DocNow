import React from "react";
import API from "../Utils/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isRegistered, setIsRegistered] = React.useState(true);
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const showToast = (message, success = true) => {
    const toast = document.createElement("div");
    toast.className = `toast ${success ? "success" : "error"}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const [rFormData, setRFormData] = React.useState({
    username: "",
    password: "",
    role: "patient",
  });

  const [lFormData, setLFormData] = React.useState({
    username: "",
    password: "",
    role: "patient",
  });

  function toggle() {
    setIsRegistered(!isRegistered);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegistered) {
        const res = await API.post("/auth/login", lFormData);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", lFormData.role);
        localStorage.setItem("id", res.data.user._id);
        navigate(
          lFormData.role === "doctor" ? "/doctor/home" : "/patient/home"
        );
      } else {
        await API.post("/auth/register", rFormData);
        const res = await API.post("/auth/login", {
          username: rFormData.username,
          password: rFormData.password,
          role: rFormData.role,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", rFormData.role);
        localStorage.setItem("id", res.data.user._id);
        navigate(
          rFormData.role === "doctor" ? "/doctor/home" : "/patient/home"
        );
      }
    } catch (err) {
      showToast(err.response?.data?.msg, false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="content-wrapper">
        <div className="form-container">
          <div className="medical-icon icon-heart">❤️</div>
          <div className="medical-icon icon-plus">➕</div>

          <div className="form-header">
            <h2>{isRegistered ? "Welcome Back!" : "Create Account"}</h2>
            <p>
              {isRegistered
                ? "Login to access your healthcare portal"
                : "Join our secure healthcare network"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={isRegistered ? lFormData.username : rFormData.username}
                onChange={(e) =>
                  isRegistered
                    ? setLFormData({ ...lFormData, username: e.target.value })
                    : setRFormData({ ...rFormData, username: e.target.value })
                }
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={showPass ? "text" : "password"}
                  value={isRegistered ? lFormData.password : rFormData.password}
                  onChange={(e) =>
                    isRegistered
                      ? setLFormData({ ...lFormData, password: e.target.value })
                      : setRFormData({ ...rFormData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? (
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fill="currentColor"
                        d="M12 9a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0 9.821 9.821 0 0 0-17.64 0z"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fill="currentColor"
                        d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22 21 20.73 3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label>Role</label>
              <select
                value={isRegistered ? lFormData.role : rFormData.role}
                onChange={(e) =>
                  isRegistered
                    ? setLFormData({ ...lFormData, role: e.target.value })
                    : setRFormData({ ...rFormData, role: e.target.value })
                }
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <span className="spinner" />
              ) : isRegistered ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>

            <p className="toggle-text">
              {isRegistered
                ? "Don't have an account?"
                : "Already have an account?"}
              <button type="button" onClick={toggle} className="toggle-link">
                {isRegistered ? " Register" : " Login"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
