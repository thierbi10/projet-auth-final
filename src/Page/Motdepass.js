import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useRef } from 'react'
import { auth } from '../firebase';
import { toast } from 'react-toastify';

export default function Motdepass() {
    const emailRef = useRef();
    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
      };
      toast.success('vous allez recevoir un email afin de  changer votre mot de pass')
      const motDePassHandler = () => {
        const email = emailRef.current.value;
        if (email)
          forgotPassword(email).then(() => {
          
            emailRef.current.value = "";
          });
      };
    return (
        <div class="login-page">
            <div class="form">
                <form  class="login-form">
                    <input type="email" placeholder="Email" required ref={emailRef} />

                    <button onClick={motDePassHandler}>Envoyer</button>

                </form>
            </div>
        </div>
    )
}
