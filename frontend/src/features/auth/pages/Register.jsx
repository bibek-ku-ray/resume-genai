import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useState } from "react";

const Register = () => {

  const navigate = useNavigate()
  const { handleRegister, loading } = useAuth();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleFormSubmit(e) {
    e.preventDefault();
    await handleRegister({ username, email, password });
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
          <h2>Register</h2>
          <div className="input-group">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          <button className="button primary-button">Register</button>
        </form>
        <p>
          Already Register? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
