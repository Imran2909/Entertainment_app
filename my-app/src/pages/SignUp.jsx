import React, { useState } from 'react';
import styles from './forms.module.css';
import { BiSolidMovie } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { oauthLogin, signup } from '../redux/action';
import { useDispatch } from 'react-redux';
import { useToast } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'

function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [resetPassword, setResetPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const [spinner, setSpinner] = useState(false)

    const handleSignup = (e) => {
        e.preventDefault()
        const userData = { email, password, resetPassword };
        if (email === "" || password === "" || resetPassword === "") {
            toast({
                title: `  Please fill all the details`,
                status: 'warning',
                duration: 4000,
                position: 'top',
                isClosable: true,
            })
        }
        else if (password !== resetPassword) {
            toast({
                title: `Passwords should be same `,
                status: 'warning',
                duration: 4000,
                position: 'top',
                isClosable: true,
            })
        }
        else {
            setSpinner(true)
            dispatch(signup(userData)).then((success) => {
                if (success) {
                    toast({
                        title: `SignUp success`,
                        status: 'success',
                        duration: 4000,
                        position: 'top',
                        isClosable: true,
                    })
                    navigate("/login");
                } else {
                    console.log("Signup failed, staying on login page");
                }
            });
        }
    };

    const handleOath = () => {
        window.location.href = "https://entertainment-backend-1.onrender.com/auth/google/callback";
        dispatch(oauthLogin())
    }


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
                                <input type="email" placeholder='Email address' value={email} onChange={(e) => { setEmail(e.target.value) }} required /> <br /><br />
                                <input type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} required /><br /><br />
                                <input type="password" placeholder='Confirm password' value={resetPassword} onChange={(e) => { setResetPassword(e.target.value) }} required /><br /><br />
                                <button onClick={handleSignup} >{
                                        spinner && spinner ? 
                                        <Spinner size="md" style={{ marginTop: "8px" }} /> :
                                        "Create an account"
                                    } </button>
                            </form>

                            <div className={styles.oauth} >
                                <span className={styles.gImg} >
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB1oG9GOtnAuqAzA8iBgPP68Ry22JnGVEnnQ&s" alt="" />
                                </span>
                                <span className={styles.google} onClick={handleOath} >
                                    SignUp with Google
                                    </span>
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
