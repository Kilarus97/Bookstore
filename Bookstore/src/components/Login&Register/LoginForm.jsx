import React, { useState, useEffect, useContext } from "react";
import "../../styles/register.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import * as authService from "../../service/auth.services.jsx";
import GoogleLogin from "./GoogleLogin.jsx";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

 

  useEffect(() => {
    const valid = username.trim().length > 2 && password.length >= 8;
    setIsValid(valid);
    setFeedback(
      valid
        ? "Podaci su validni. Možete se prijaviti."
        : "Molimo vas da unesete ispravno korisničko ime i lozinku."
    );
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const myToken = await authService.login({username, password});
      sessionStorage.setItem("token", myToken);
      login(myToken);
      alert(`Dobrodošao, ${username}!`);
      navigate("/home");
    } catch (error) {
      alert("Neispravno korisničko ime ili lozinka.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="formaLogin" onSubmit={handleSubmit}>
      <section className="form-section">
        <h2>🔐 Prijava</h2>
        <input
          type="text"
          name="username"
          placeholder="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </section>

      <section className="form-section">
        <button type="submit" disabled={!isValid}>
          Prijavi se
        </button>
      </section>

      <div>
      <h2>Prijavise pomocu Google Naloga</h2>
      <GoogleLogin />
      </div>

      <div
        id="form-feedback"
        style={{
          marginTop: "1rem",
          fontWeight: "bold",
          color: isValid ? "green" : "red",
        }}
      >
        {feedback}
      </div>
    </form>
  );
};

export default LoginForm;
