// import React, { useEffect, useState } from 'react';
// import styles from './forms.module.css';
// import { BiSolidMovie } from "react-icons/bi";
// import { Link, useNavigate } from 'react-router-dom';
// import { Navigate, useLocation } from 'react-router-dom'
// import { useDispatch } from 'react-redux';
// import { login } from '../redux/action';
// import Alert from "../components/Alert"

// function Login() {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const location = useLocation()
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const [showAlert, setShowAlert] = useState(true);

//     useEffect(() => {
//         setShowAlert(false)
//     }, [])

//     const handleLogin = () => {
//         const userData = {
//             email, password
//         };
//         dispatch(login(userData)).then(() => {
//             navigate(location.state)
//         })
//     }

//     return (
//         <div>
//             <div className={styles.main} >
//                 <div className={styles.box} >
//                     <div className={styles.top} >
//                         <BiSolidMovie />
//                     </div>
//                     <div className={styles.mid1} >
//                         <div className={styles.title} >
//                             Log In
//                         </div>
//                         <div className={styles.form} >
//                             <form action="" onSubmit={(e) => e.preventDefault()} >
//                                 <input type="text" placeholder='Email address' onChange={(e) => setEmail(e.target.value)} value={email} required /> <br /><br />
//                                 <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} required /><br /><br />
//                                 {/* <input type="text" placeholder='Confirm password' required /><br /><br /> */}
//                                 <button onClick={handleLogin} > Log In </button>
//                             </form>
//                         </div>
//                     </div>
//                     <div className={styles.bottom1}  >
//                         <p > Dont have a account ?  <Link to="/signup"> create account </Link> </p>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Login






import React, { useEffect, useState } from 'react';
import styles from './forms.module.css';
import { BiSolidMovie } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, oauthLogin } from '../redux/action';
import Alert from "../components/Alert";
import { useToast } from '@chakra-ui/react'


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const toast = useToast()


    useEffect(() => {
        // setShowAlert(true);
    }, []);


    const handleLogin = () => {
        const userData = { email, password };
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
                // Handle login failure, e.g., show an error message
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
        dispatch(oauthLogin())
        window.location.href = "https://entertainment-backend-w68b.onrender.com/auth/google/callback";
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
                                    type="text"
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
                                <button onClick={handleLogin}>Log In</button>

                                <div className={styles.oauth} >
                                    <span className={styles.gImg} >
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB1oG9GOtnAuqAzA8iBgPP68Ry22JnGVEnnQ&s" alt="" />
                                    </span>
                                    <span className={styles.google} onClick={handleOath} >Login with Google</span>
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
