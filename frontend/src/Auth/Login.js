import React, { useState } from "react";
import "./auth";
import "./auth.css";
export default function AuthUI() {
  const [activeTab, setActiveTab] = useState("login");

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const togglePass = (id) => {
    const input = document.getElementById(id);
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const checkStrength = (value) => {
    const bars = ["s1", "s2", "s3", "s4"];
    let strength = 0;

    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^A-Za-z0-9]/.test(value)) strength++;

    bars.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) {
        el.style.background =
          i < strength ? "green" : "var(--color-border-tertiary)";
      }
    });

    const label = document.getElementById("strength-label");
    if (label) {
      const texts = ["Weak", "Fair", "Good", "Strong"];
      label.innerText = strength ? texts[strength - 1] : "";
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => switchTab("login")}
          >
            Sign in
          </button>
          <button
            className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => switchTab("register")}
          >
            Create account
          </button>
        </div>

        <div className="auth-body">
          {/* LOGIN */}
          {activeTab === "login" && (
            <div className="auth-panel active">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="you@example.com" />
              </div>

              <div className="mb-3">
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ marginBottom: "5px" }}
                >
                  <label className="form-label" style={{ margin: 0 }}>
                    Password
                  </label>
                  <a href="#" className="link-muted">
                    Forgot password?
                  </a>
                </div>

                <input
                  type="password"
                  id="login-pass"
                  className="form-control"
                  placeholder="••••••••"
                />
               
              </div>

              <div
                className="mb-4 d-flex align-items-center"
                style={{ gap: 8 }}
              >
                <input
                  type="checkbox"
                  id="remember"
                  style={{ width: 14, height: 14, cursor: "pointer" }}
                />
                <label htmlFor="remember">Remember me</label>
              </div>

              <button className="btn-primary-custom">Sign in</button>
            </div>
          )}

          {/* REGISTER */}
          {activeTab === "register" && (
            <div className="auth-panel active">
              <div className="row">
                <div className="col mb-3">
                  <label className="form-label">First name</label>
                  <input type="text" className="form-control" />
                </div>

                <div className="col mb-3">
                  <label className="form-label">Last name</label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  id="reg-pass"
                  className="form-control"
                  onChange={(e) => checkStrength(e.target.value)}
                />

                <div
                  id="strength-bar"
                  style={{ display: "flex", gap: 4, marginTop: 6 }}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      id={`s${i}`}
                      style={{
                        height: 3,
                        flex: 1,
                        borderRadius: 4,
                        background: "var(--color-border-tertiary)",
                      }}
                    />
                  ))}
                </div>

                <p
                  id="strength-label"
                  style={{
                    fontSize: 11,
                    color: "var(--color-text-tertiary)",
                    marginTop: 4,
                  }}
                ></p>
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm password</label>
                <input type="password" className="form-control" />
              </div>

              <div
                className="mb-4 d-flex align-items-center"
                style={{ gap: 8 }}
              >
                <input
                  type="checkbox"
                  id="terms"
                  style={{ width: 14, height: 14, cursor: "pointer" }}
                />
                <label htmlFor="terms">
                  I agree to Terms and Privacy Policy
                </label>
              </div>

              <button className="btn-primary-custom">
                Create account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}