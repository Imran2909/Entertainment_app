import React, { useState } from 'react';
import styles from './forms.module.css';
import { BiSolidMovie } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../redux/action';
import { useDispatch } from 'react-redux';




function SignUp() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [resetPassword,setResetPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignup = (e) => {
        e.preventDefault()
        const userData = { email, password, resetPassword };
        dispatch(signup(userData)).then((success) => {
            if (success) {
                navigate("/login");
            } else {
                console.log("Signup failed, staying on login page");
            }
        });
    };


    return (
        <div>
            <div className={styles.main} >
                <div className={styles.box} >
                    <div className={styles.top} >
                        <BiSolidMovie />
                    </div>
                    <div className={styles.mid} >
                        <div className={styles.title} >
                            SignUp
                        </div>
                        <div className={styles.form} >
                            <form action=""  >
                                <input type="text" placeholder='Email address' value={email} onChange={(e)=>{setEmail(e.target.value)}} required /> <br /><br />
                                <input type="text" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required /><br /><br />
                                <input type="text" placeholder='Confirm password' value={resetPassword} onChange={(e)=>{setResetPassword(e.target.value)}} required /><br /><br />
                                <button onClick={handleSignup} > Create an account </button>
                            </form>

                            <div className={styles.oauth} >
                                <span className={styles.gImg} >
                                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB1oG9GOtnAuqAzA8iBgPP68Ry22JnGVEnnQ&s" alt="" />
                                </span>
                                 <span className={styles.google} >SignUp with Google</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottom} >
                        <p> Already have a account ?  <Link to="/login"> LogIn </Link> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
