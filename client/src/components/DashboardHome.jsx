import React from 'react'
import { useEffect } from 'react'
import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from '../api'
import { useStateValue } from '../context/StateProvider'
import {actionType} from "../context/reducer"
import { FaUser } from 'react-icons/fa'
import {GiLoveSong} from "react-icons/gi"
import {RiUserStarFill} from "react-icons/ri"
import {GiMusicalNotes} from "react-icons/gi"
import { bgColors } from '../utils/styles'

export const DashboardCard = ({icon, name, count}) => {
  const bg_Color = bgColors[parseInt(Math.random() * bgColors.length)];
  return (
    <div style={{background: `${bg_Color}`}} className='p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-blue-400'>
      {icon}
      <p className='text-xl text-textColor font-semibold'>{name}</p>
      <p className='text-xl text-textColor'>{count}</p>
    </div>
  )
}

const DashboardHome = () => {
  const [{allUsers, allSongs, allArtists, allAlbums}, dispatch] = useStateValue();

  useEffect(() => {
    if(!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data
        })
      })
    }

    if(!allArtists){
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist
        })
      })
    }

    if(!allAlbums){
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album
        })
      })
    }

    if(!allSongs){
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.songs
        })
      })
    }
  }, []);
  return (
    <div className='w-full p-6 flex items-center justify-evenly flex-wrap'>
      <DashboardCard icon={<FaUser className='text-3xl text-textColor' />} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0} />
      <DashboardCard icon={<GiLoveSong className='text-3xl text-textColor'/>} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0}/>
      <DashboardCard icon={<RiUserStarFill className='text-3xl text-textColor'/>} name={"Artists"} count={allArtists?.length > 0 ? allArtists?.length : 0}/>
      <DashboardCard icon={<GiMusicalNotes className='text-3xl text-textColor'/>} name={"Albums"} count={allAlbums?.length > 0 ? allAlbums?.length : 0}/>
    </div>
  )
}

export default DashboardHome