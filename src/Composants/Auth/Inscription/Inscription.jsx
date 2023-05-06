import React, { useRef } from "react";
import "./Inscription.css";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
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
      inscription(email, password)
        // .then((userCredential) => {
        //   // Signed in
        //   const user = userCredential.user;
        //   setDoc(doc(db, "users", user.uid), {
        //     displayName: name,
        //     email: email,
        //     userInsAt: Timestamp.fromDate(new Date()),
        //   });
        //   toast.success("inscription reussi");
        //   navigate("/");
        //   // ...
        // })
        // .catch((error) => {
        //   console.log(error);
        //   const errorCode = error.code;
        //   console.log(errorCode);
        //   if (errorCode === "auth/email-already-in-use") {
        //     toast.error("Utilisateur existant !");
        //   } else if (errorCode === "auth/weak-password") {
        //     toast.warning(
        //       "Mot de passe faible, utlisez minimum 6 caractères !"
        //     );
        //   } else if (errorCode === "email-already-in-use") {
        //     toast.warning("Email déjà utiliser !");
        //   } else if (errorCode === "auth/invalid-email") {
        //     toast.error("Adresse Email non valide !");
        //   }
        // });
    }
    console.log(email);
    console.log(name);
    console.log(password);
  };
  return (
    <div class="login-page">
      <div class="form">
        <form onSubmit={onSubmit} className="login-form">
          <input type="text" required placeholder="nom d'utilisateur" ref={nameRef} />
          <input type="email" placeholder="Email" required ref={emailRef} />
          <input type="password" placeholder="mot de pass"  required ref={psdRef} />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}
