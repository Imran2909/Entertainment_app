import React, { useEffect, useState } from 'react';
import styles from './forms.module.css';
import { BiSolidMovie } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, oauthLogin } from '../redux/action';
import Alert from "../components/Alert";
import { useToast } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const toast = useToast()
    const [spinner, setSpinner] = useState(false)

    useEffect(() => {
        // setShowAlert(true);
    }, []);


    const handleLogin = () => {
        const userData = { email, password };
        if(email==="" || password===""){
            return  toast({
                title: `Please fill all the data`,
                status: 'error',
                duration: 4000,
                position: 'top',
                isClosable: true,
            })
        }
            setSpinner(true)
        dispatch(login(userData)).then((success) => {
            if (success) {
                toast({
                    title: `Login success`,
                    status: 'success',
                    duration: 4000,
                    position: 'top',
                    isClosable: true,
                })
                navigate(location.state || "/");
            } else {
                setSpinner(false)
                toast({
                    title: `Login failed, please try again`,
                    status: 'error',
                    duration: 4000,
                    position: 'top',
                    isClosable: true,
                })
            }
        });
    };


    const handleOath = () => {
        window.location.href = "https://entertainment-backend-1.onrender.com/auth/google/callback";
        dispatch(oauthLogin())
    }


    return (
        <div>
            {showAlert && (
                <Alert
                    message="Please authenticate to continue"
                    type="error"
                    onClose={() => setShowAlert(false)}
                />
            )}
            <div className={styles.main} >
                <div className={styles.box}>
                    <div className={styles.top}>
                        <BiSolidMovie />
                    </div>
                    <div className={styles.mid1}>
                        <div className={styles.title}>
                            Log In
                        </div>
                        <div className={styles.form}>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder='Email address'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                                <br /><br />
                                <input
                                    type="password"
                                    placeholder='Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                                <br /><br />
                                <button onClick={handleLogin}>
                                    {
                                        spinner && spinner ? 
                                        <Spinner size="md" style={{ marginTop: "8px" }} /> :
                                        "Log In"
                                    }
                                </button>

                                <div className={styles.oauth} >
                                    <span className={styles.gImg} >
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB1oG9GOtnAuqAzA8iBgPP68Ry22JnGVEnnQ&s" alt="" />
                                    </span>
                                    <span className={styles.google} onClick={handleOath} >
                                        Login with Google</span>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className={styles.bottom1}>
                        <p>Don't have an account? <Link to="/signup">Create account</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
