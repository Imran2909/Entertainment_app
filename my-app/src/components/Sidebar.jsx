import React, { useEffect, useState } from 'react'
import styles from "./sidebar.module.css"
import { NavLink, useNavigate } from 'react-router-dom'
import Allroutes from './Allroutes'
import { BiSolidMovie } from "react-icons/bi";
import { PiSquaresFourFill } from "react-icons/pi";
import { TbMovie } from "react-icons/tb";
import { PiTelevisionFill } from "react-icons/pi";
import { FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { IoSunny } from "react-icons/io5";
import { logout, toggleThemeAction } from '../redux/action';
import { IoMoonSharp } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import Alert from './Alert';
import { useToast } from '@chakra-ui/react'

function Sidebar() {
    const theme = useSelector((store) => store.theme)
    const avatar = useSelector((store) => store.avatar)
    const dispatch = useDispatch()
    const auth = useSelector((store) => store.isAuth)
    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(false);
    const toast = useToast()

    const toggleTheme = () => {
        dispatch(toggleThemeAction())
    }

    const handleLogout = () => {
        toast({
            title: `Logout success`,
            status: 'info',
            duration: 4000,
            position: 'top',
            isClosable: true,
        })
        dispatch(logout())
        navigate("/")
    }

    return (
        <div>
            {showAlert && (
                <Alert
                    message="Log out success"
                    type="error" // can be 'info', 'success', 'warning', 'error'
                    onClose={() => setShowAlert(false)}
                />
            )}
            <div className={styles.box}>
                <div className={styles.container} >
                    <div className={styles.top} >
                        <NavLink to={"/"} className={styles.logo} > <BiSolidMovie style={{ color: "red" }} /> </NavLink>
                    </div>
                    <div className={styles.mid} >
                        <div className={styles.icons} >
                            <NavLink className={({ isActive }) => isActive ? styles.activeNavlink : styles.nonActive}
                                to={'/'} > <PiSquaresFourFill /> </NavLink>
                            <NavLink className={({ isActive }) => isActive ? styles.activeNavlink : styles.nonActive}
                                to={'/movies'} > <TbMovie /> </NavLink>
                            <NavLink className={({ isActive }) => isActive ? styles.activeNavlink : styles.nonActive}
                                to={'/tvseries'} > <PiTelevisionFill /> </NavLink>
                            <NavLink className={({ isActive }) => isActive ? styles.activeNavlink : styles.nonActive}
                                to={'/bookmark'} > <FaBookmark /> </NavLink>
                        </div>
                    </div>
                    <div className={styles.bottom} >
                        {auth ?
                            <div className={styles.logout} >
                                <RiLogoutBoxLine onClick={handleLogout} />
                            </div> :
                            <div className={styles.avatar}  >
                                <NavLink to={'/signup'} >
                                    <img src={avatar} alt="No" />
                                </NavLink>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar


