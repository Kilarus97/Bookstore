import React, { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { jwtDecode } from "jwt-decode";

const GoogleLogin = () => {
  const buttonRef = useRef(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.google) {
      console.error("Google script nije učitan");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: "417617350423-mqvt56d8v6brtpuhq7e9rvnem7i8u9gu.apps.googleusercontent.com",
      callback: (response) => {
        const idToken = response.credential;
        const decoded = jwtDecode(idToken);
        console.log("✅ Google user decoded:", decoded);

        login(idToken); // ⬅️ čuva token u context/localStorage
        navigate("/books"); // ⬅️ automatski preusmerenje
      },
    });

    if (buttonRef.current) {
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
      });
    }
  }, [login, navigate]);

  return <div ref={buttonRef}></div>;
};

export default GoogleLogin;
