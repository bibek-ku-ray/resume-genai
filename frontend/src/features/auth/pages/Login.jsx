import { Link, useNavigate } from "react-router";
import "../../auth/auth.form.scss";
import { useAuth } from "../hook/useAuth";
import { useState } from "react";

const Login = () => {
  const { handleLogin, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  
  async function handleFormSubmit(e) {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/")
  }

  if (loading) {
    return (
      <main>
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <form className="" onSubmit={handleFormSubmit}>
          <h2>Login</h2>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="button primary-button">Login</button>
        </form>
        <p>
          Don't have an account? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
