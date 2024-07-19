import React from 'react';
import styles from './forms.module.css';
import { BiSolidMovie } from "react-icons/bi";
import { Link } from 'react-router-dom';


function SignUp() {
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
                            <form action="">
                                <input type="text" placeholder='Email address' required /> <br /><br />
                                <input type="text" placeholder='Password' required /><br /><br />
                                <input type="text" placeholder='Confirm password' required /><br /><br />
                                <button> Create an account </button>
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
