import React, { useRef } from "react";
import { Outlet,  Navigate,useLocation } from "react-router-dom";
import { useAuth } from "../../Composants/Auth/Context/AutContext";
import   PrivateHome from '../../Page/Private/PrivateHome/PrivateHome'
export default function Private() {
  const { currentUser } =  useAuth()
  console.log("PRIVATE", currentUser);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div >
      <Outlet/>
 
    </div>
  );
}
