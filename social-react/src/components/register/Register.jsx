import axios from 'axios';
import { useRef } from 'react';
import './register.css';
import {useHistory} from "react-router";
import {Link} from "react-router-dom"
export default function Register () {
    const username = useRef(); 
    const email = useRef(); 
    const password = useRef();     
    const passwordAgain = useRef();   
    const history = useHistory();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const handleClick = async (e)=>{
        e.preventDefault();
        if(password.current.value !== passwordAgain.current.value){
            passwordAgain.current.setCustomValidity("Password don't match") 
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try{
                await axios.post("/auth/register",user);
                history.push("/login")

            }catch(err){
                console.log(err)
            }
           
        }
    };

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">SmartBook</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on SmartBook.
                    <img src={PF+"login.png"} alt="" className="loginimage" />
                </span>

            </div>
            <div className="loginRight">
                <form className="loginVBox" onSubmit={handleClick}>
                    <input placeholder='Username' required ref={username} className="loginInput" />
                    <input placeholder='Email' type="email" required ref={email} className="loginInput" />
                    <input placeholder='Password' type="password" minLength="6" required ref={password} className="loginInput" />
                    <input placeholder='Passord Again' type="password" minLength="6" required ref={passwordAgain} className="loginInput" />
                    <button className='loginButton' type='submit'>Sign Up</button>
                    <Link to="/login">
                    <button className="loginRegisterButton">Log into Account</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
