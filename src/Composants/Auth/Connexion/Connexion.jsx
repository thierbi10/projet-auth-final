import React, { useRef, useState } from "react";
import { auth } from "../../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AutContext";

export default function Connexion() {
  const { connexion } =  useAuth();

  const emailRef = useRef();
  const psdRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelayedSignIn = () => {
    setIsLoading(true);
    const email = emailRef.current.value;
    const password = psdRef.current.value;
    setTimeout(() => {
      if (email && password) {
        const result = connexion(email, password);
        if (result) {
          result.finally(() => {
            setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      }
    }, 1000);
  };


  const onSubmit = (e) => {
    e.preventDefault();
    handleDelayedSignIn();
  };

  return (
    <div className="login-page">
      <div className="form">
        <form onSubmit={onSubmit} className="login-form">
          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="mot de pass" ref={psdRef} />
          <button disabled={isLoading}>
            {isLoading ? "Loading..." : "Se connecter"}
          </button>
          <p className="message">
            <Link to="mot-de-pass" className="pwd">
              mot de pass oubier?
            </Link>{" "}
            <Link to="inscription">Créer un compte</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
