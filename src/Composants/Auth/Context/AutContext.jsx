import React, { useContext, useState, useEffect, createContext } from "react";
import {  auth, db } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Créer un contexte pour stocker les informations d'authentification
//   const AuthContext = React.createContext();

// Hook personnalisé pour utiliser le contexte d'authentification
// export function useAuth() {
//   return useContext(AuthContext);
// }

export const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

// Composant pour gérer l'authentification et stocker les informations
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Fonction pour créer un compte utilisateur
  //   function signup(email, password) {
  //     return auth.createUserWithEmailAndPassword(email, password);
  //   }
  const inscription = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() =>
        updateProfile(auth.currentUser, {
          displayName: name,
        })
      )
      .then(() => {
        if (name !== undefined) {
          setDoc(doc(db, "users", currentUser.uid), {
            displayName: name,
            email: email,
            userInsAt: Timestamp.fromDate(new Date()),
          });
        }
        toast.success("Inscription réussie !");
        navigate("/");
      })
      .catch((error) => {
        console.log("Erreur lors de l'inscription :", error);
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode === "auth/email-already-in-use") {
          toast.error("L'adresse e-mail est déjà utilisée !");
        } else if (errorCode === "auth/weak-password") {
          toast.warning(
            "Le mot de passe est trop faible, utilisez au moins 6 caractères !"
          );
        } else if (errorCode === "auth/invalid-email") {
          toast.error("L'adresse e-mail n'est pas valide !");
        } else {
          toast.error("Une erreur s'est produite lors de l'inscription !");
        }
      });
  };
  
  // Fonction pour se connecter à un compte utilisateur
  //   function login(email, password) {
  //     return auth.signInWithEmailAndPassword(email, password);
  //   }
  const connexion = (email, password) => {
    // signInWithEmailAndPassword(auth, email, password);
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigate("/private/private-home");
          const user = userCredential.user;
          console.log('user'+user);
          toast.success("connexion reussi !");
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode === "auth/user-not-found") {
            toast.error("Utilisateur n'existe pas !");
          } else if (errorCode === "auth/weak-password") {
            toast.warning(
              "Mot de passe faible, utlisez minimum 6 caractères !"
            );
          } else if (errorCode === "email-already-in-use") {
            toast.warning("Email déjà utiliser !");
          } else if (errorCode === "auth/invalid-email") {
            toast.error("Adresse Email non valide !");
          }
        })
  };
  // Fonction pour se déconnecter d'un compte utilisateur

  const deconnection = () => {
    signOut(auth);
  };

  // Fonction pour réinitialiser le mot de passe d'un compte utilisateur
  const motDePassOublier = (email) => {
   sendPasswordResetEmail(auth, email)
   .then(() => {
 
   }).catch((err) => {
    
   });
  };

  // Effet pour écouter les changements de l'état d'authentification
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);
      console.log(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Objet contenant les fonctions d'authentification et l'utilisateur connecté
  const value = {
    currentUser,
    inscription,
    connexion,
    deconnection,
    motDePassOublier,
  };

  return (
    // Fournir le contexte aux composants enfants
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
