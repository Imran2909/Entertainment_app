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
    let arr = [<PiSquaresFourFill />, <TbMovie />, <PiTelevisionFill />, <FaBookmark />]
    let links = ["/", "/movies", "/tvseries", "/bookmark"]
    const theme = useSelector((store) => store.theme)
    const avatar = useSelector((store) => store.avatar)
    const dispatch = useDispatch()

    const toggleTheme = () => {
        console.log(theme);
        dispatch(toggleThemeAction())
    }

    return (
        <div>
            <div className={styles.container} >

                <div className={styles.top} >
                    <NavLink to={"/"} className={styles.logo} > <BiSolidMovie /> </NavLink>
                </div>


                <div className={styles.mid} >
                    <div className={styles.icons} >
                        {
                            arr.map((el, ind) => {
                                return (
                                    <NavLink key={ind} className={({ isActive }) => isActive ? styles.activeNavlink : styles.nonActive}
                                        to={`${links[ind]}`} > {el} </NavLink>
                                )
                            })
                        }
                    </div>
                </div>


                <div className={styles.bottom} >
                    <div onClick={toggleTheme} className={theme === "light" ? styles.lightTheme : styles.darkTheme} >
                        {
                            theme === "light" ? <IoSunny /> : <IoMoonSharp />
                        }
                    </div>
                    <div className={styles.avatar} >
                        <img src={avatar} alt="No" />
                    </div>
                </div>

            </div>


            <div>
                <Allroutes />
            </div>

        </div>
    )
}

export default Sidebar


