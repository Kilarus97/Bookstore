import React, { useState, useEffect } from "react";
import "../../styles/register.scss";
import * as authService from "../../service/auth.services.jsx";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const valid =
      username.trim().length > 2 &&
      password.length >= 8 &&
      password === confirmPassword &&
      email.trim().length > 5 &&
      firstName.trim().length > 1 &&
      lastName.trim().length > 1;

    setIsValid(valid);
    setFeedback(
      valid
        ? "Podaci su validni. Možete nastaviti."
        : "Molimo vas da ispravno popunite sva polja."
    );
  }, [username, password, confirmPassword, email, firstName, lastName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    const payload = {
      userName: username,
      password,
      email,
      name: firstName,
      surname: lastName,
    };

    try {
      await authService.createUser(payload);
      alert("Registracija uspešna! Možete se prijaviti.");
      navigate("/login");
    } catch (error) {
      const backendErrors = error?.response?.data;
      if (Array.isArray(backendErrors)) {
        const messages = backendErrors.map(
          (err) =>
            err.description ||
            err.message ||
            "Greška u registraciji."
        );
        setErrors(messages);
      } else {
        setErrors([error.message || "Došlo je do greške."]);
      }
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div id="loadingSpinner" className="spinner"></div>;

  return (
    <form className="formaDodaj" onSubmit={handleSubmit}>
      <section className="form-section">
        <h2>👤 Lični podaci</h2>
        <input
          type="text"
          placeholder="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email adresa"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ime"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Prezime"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </section>

      <section className="form-section">
        <h2>🔒 Bezbednost</h2>
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Potvrdi lozinku"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </section>

      <section className="form-section">
        <button type="submit" disabled={!isValid}>
          Registruj se
        </button>
      </section>

      <div
        style={{
          marginTop: "1rem",
          fontWeight: "bold",
          color: isValid ? "green" : "red",
        }}
      >
        {feedback}
      </div>

      {errors.length > 0 && (
        <div style={{ marginTop: "1rem", color: "red", fontWeight: "bold" }}>
          <h4>Greške:</h4>
          <ul>
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
