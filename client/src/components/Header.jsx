import React from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import {Logo} from '../assets/img/index'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'
import {FaCrown} from 'react-icons/fa'
import { useStateValue } from '../context/StateProvider'
import { getAuth } from 'firebase/auth'
import { app } from '../config/firebase.config'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { BsFillCloudArrowUpFill } from 'react-icons/bs'

const Header = () => {
    const [{user}, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [isMenu, setisMenu] = useState(false);
    const logOut = () => {
        const firebaseAuth = getAuth(app);
        firebaseAuth.signOut().then(() => {
            window.localStorage.setItem("auth", "false");
        }).catch((e) => console.log(e));
        navigate("/login", {replace : true})
    }
  return (
    <header className='flex items-center p-4 md:py-2 md:px-6'>
        <NavLink to={"/home"}>
            <img src={Logo} alt="Logo" className='w-16'/>
        </NavLink>

        <ul className='flex items-center justify-center ml-7'>
            <li className='mx-5 text-lg'><NavLink to={'/home'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Trang chủ</NavLink></li>
            <li className='mx-5 text-lg'><NavLink to={'/musics'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Bài Hát</NavLink></li>
            <li className='mx-5 text-lg'><NavLink to={'/artists'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Ca sĩ</NavLink></li>
            <li className='mx-5 text-lg'><NavLink to={'/albums'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Albums</NavLink></li>
            <div className='flex justify-center items-center px-20'>
        <NavLink to={"/newSongUser"} className='flex items-center justify-center px-4 py-3 border rounded-md bg-red-400 border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer'>
        <p className='flex items-center justify-center w-full'><b>Tải lên Bài hát</b>&nbsp;<BsFillCloudArrowUpFill/></p>
        </NavLink>
      </div>
        </ul>

        <div onMouseEnter={() => setisMenu(true)} onMouseLeave={() => setisMenu(false)} className='flex items-center ml-auto cursor-pointer gap-2 relative'>
            <img src={user?.user?.imageURL} className='w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg' alt='avatar' referrerPolicy='no-referrer'/>
            <div className='flex flex-col'>
                <p className='text-textColor text-lg hover:text-headingColor font-semibold'>{user?.user?.name}</p>
                <p className='flex items-center gap-2 text-xs text-gray-500 font-normal'>Thành viên cao cấp <FaCrown className='text-sm-ml-1 text-yellow-500'/></p>
            </div>

            {isMenu && (
                <motion.div initial={{opacity : 0, y : 50}} animate = {{opacity : 1, y : 0}} exit={{opacity : 0, y : 50}} className='absolute z-10 flex flex-col p-3 top-12 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm'>
                <NavLink to={'/userProfile'}>
                    <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Hồ sơ</p>
                </NavLink>
                <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Sở thích của tôi</p>
                <hr />
                {user?.user?.role === "admin" &&(
                    <>
                    <NavLink to={"/dashboard/home"}>
                        <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Dashboard</p>
                    </NavLink>
                    <hr />
                    </>
                )}
                <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out' onClick={logOut}>Đăng xuất</p>
            </motion.div>
            )}
        </div>
    </header>
  )
}

export default Header