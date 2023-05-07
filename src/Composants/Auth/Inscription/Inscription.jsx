import React, { useRef } from "react";
import "./Inscription.css";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../Context/AutContext";

export default function Inscription() {
  const { inscription } = useAuth();
  const emailRef = useRef();
  const nameRef = useRef();
  const psdRef = useRef();
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = psdRef.current.value;
    // createUserWithEmailAndPassword(auth, email, password)
    if (email && name && password) {
      inscription(email, password);
    }
  };
  return (
    <div class="login-page">
      <div class="form">
        <form onSubmit={onSubmit} className="login-form">
          <input
            type="text"
            required
            placeholder="nom d'utilisateur"
            ref={nameRef}
          />
          <input type="email" placeholder="Email" required ref={emailRef} />
          <input
            type="password"
            placeholder="mot de pass"
            required
            ref={psdRef}
          />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}
