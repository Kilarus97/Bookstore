import React, { useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { jwtDecode } from "jwt-decode";

const GoogleLogin = () => {
  const buttonRef = useRef(null);
  const { login } = useContext(AuthContext);

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
        console.log("Decoded Google user:", decoded);
        login(idToken);
      },
    });

    if (buttonRef.current) {
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
      });
    }
  }, [login]);

  return <div ref={buttonRef}></div>;
};

export default GoogleLogin;
