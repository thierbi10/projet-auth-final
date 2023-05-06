import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Private from './Page/Private/Private';
import PrivateHome from './Page/Private/PrivateHome/PrivateHome';
import Connexion from './Composants/Auth/Connexion/Connexion';
import Motdepass from './Page/Motdepass';
import Inscription from './Composants/Auth/Inscription/Inscription';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Connexion />} />
        {/* <Route path="/private" element={<Private />} /> */}
        <Route path="/inscription" element={<Inscription />} />
         <Route path='/mot-de-pass' element={<Motdepass />} />
         <Route path="/private" element={<Private />}>
          <Route path="/private/private-home" element={<PrivateHome />} />
        </Route>
      </Routes>
        <ToastContainer />
    </div>
  );
}

export default App;
