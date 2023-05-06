import React from 'react'
import './Acceuil.css'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { CiLogout } from 'react-icons/ci';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { useAuth } from '../Composants/Auth/Context/AutContext'



export default function Acceil() {
    const { deconnection } = useAuth()
    const navigate = useNavigate()
    const handelDeconnect = () => {
        deconnection();
        navigate('/')
        toast.success('deconnexion reussi !')
    }
    return (
        <div className='body1'>

            < Navbar >
                <Container>
                    <Navbar.Brand className='nav'>StartUps</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Link className='link'>Home</Link>
                            <Link className='link'>Feature</Link>
                            <Link className='link'>Team</Link>
                            <Link className='link'>Contact</Link>
                            <Button onClick={handelDeconnect} className='btn1'> <CiLogout className='icon' />Decoonect</Button>

                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
            <div className='container-text '>
                <p> We Are Introducing</p>
                <h3>Startup Landing Page Pack</h3>
                <p className='center'> <AiOutlinePlayCircle className='icon2 center' /></p>
                <div className='center'>  <Button className='btn2 center'> Learn More</Button></div>
            </div>
        </div>
    )
}
