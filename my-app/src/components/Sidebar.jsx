import React, { useEffect, useState } from 'react'
import styles from "./sidebar.module.css"
import { NavLink } from 'react-router-dom'
import Allroutes from './Allroutes'
import { BiSolidMovie } from "react-icons/bi";
import { PiSquaresFourFill } from "react-icons/pi";
import { TbMovie } from "react-icons/tb";
import { PiTelevisionFill } from "react-icons/pi";
import { FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { IoSunny } from "react-icons/io5";
import { toggleThemeAction } from '../redux/action';
import { IoMoonSharp } from "react-icons/io5";

function Sidebar() {
    const theme = useSelector((store) => store.theme)
    const avatar = useSelector((store) => store.avatar)
    const dispatch = useDispatch()

    const toggleTheme = () => {
        console.log(theme);
        dispatch(toggleThemeAction())
    }

    return (
        <div>
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
                        <div onClick={toggleTheme} className={theme === "light" ? styles.lightTheme : styles.darkTheme} >
                            {
                                theme === "light" ? <IoSunny /> : <IoMoonSharp />
                            }
                        </div>
                        <div className={styles.avatar}  >
                            <NavLink to={'/signup'} >
                                <img src={avatar} alt="No" />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar


