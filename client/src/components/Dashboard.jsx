import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Header from './Header'
import {IoHome} from "react-icons/io5"
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'
import DashboardHome from './DashboardHome'
import DashboardUsers from './DashboardUsers'
import DashboardSongs from './DashboardSongs'
import DashboardArtist from './DashboardArtist'
import DashboardAlbums from './DashboardAlbums'
import DashboardNewSong from './DashboardNewSong'
import Alert from './Alert'
import { useStateValue } from '../context/StateProvider'
import { DashboardNewAlbum, DashboardNewArtist, NewSongUser } from '.'

const Dashboard = () => {
  const [{alertType}, dispath] = useStateValue();
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-gray-200'>
        <Header />

        <div className='w-[60%] my-2 p-4 flex items-center justify-evenly'>
          <NavLink to={"/dashboard/home"} className={({isActive}) =>
            isActive ? isActiveStyles : isNotActiveStyles
            }><IoHome className='text-2xl text-textColor' />
          </NavLink>
          <NavLink to={"/dashboard/user"} className={({isActive}) =>
            isActive ? isActiveStyles : isNotActiveStyles
            }>Người dùng
          </NavLink>
          <NavLink to={"/dashboard/songs"} className={({isActive}) =>
            isActive ? isActiveStyles : isNotActiveStyles
            }>Bài hát
          </NavLink>
          <NavLink to={"/dashboard/artist"} className={({isActive}) =>
            isActive ? isActiveStyles : isNotActiveStyles
            }>Ca sĩ
          </NavLink>
          <NavLink to={"/dashboard/albums"} className={({isActive}) =>
            isActive ? isActiveStyles : isNotActiveStyles
            }>Albums
          </NavLink>
        </div>

        <hr />

        <div className='my-4 w-full p-4'>
          <Routes>
            <Route path='/home' element={<DashboardHome />}/>
            <Route path='/user' element={<DashboardUsers />}/>
            <Route path='/songs' element={<DashboardSongs />}/>
            <Route path='/artist' element={<DashboardArtist />}/>
            <Route path='/albums' element={<DashboardAlbums />}/>
            <Route path='/newSong' element={<DashboardNewSong />}/>
            <Route path='/newArtist' element={<DashboardNewArtist />}/>
            <Route path='/newAlbum' element={<DashboardNewAlbum />}/>
          </Routes>
        </div>

        {alertType && (
          <Alert type={"danger"}/>
        )}
    </div>
  );
};

export default Dashboard;