import React, { useState } from 'react'
import {useStateValue} from "../context/StateProvider"
import { useEffect } from 'react'
import { getAllAlbums } from '../api'
import {actionType} from "../context/reducer"
import SongCard from './SongCard'
import { NavLink } from 'react-router-dom'
import { BsFillCloudArrowUpFill } from 'react-icons/bs'
import SongCardUser from './SongCardUser'
import Header from './Header'

const Album = () => {
  const [songFilter, setSongFilter] = useState("");
  const [{allAlbums}, dispath] = useStateValue();
  const [isFoucs, setisFoucs] = useState(false);
  useEffect(() => {
    if(!allAlbums){
      getAllAlbums().then((data) => {
        dispath({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        })
      })
    }
  }, []);

  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <Header />
      <div className='w-full flex justify-center py-5 items-center gap-20 pt-12'>
        <NavLink to={"/newAlbumUser"} className='bg-white flex items-center justify-center px-4 py-3 border rounded-md border-gray-900 hover:border-gray-500 hover:shadow-md cursor-pointer'>
        <p className='flex items-center justify-center w-full'><b>Tải lên Album</b>&nbsp;<BsFillCloudArrowUpFill/></p>
        </NavLink>
      </div>

      <div className='relative w-full my-4 p-4 py-16 border border-gray-900 rounded-md'>
        <div className='absolute top-4 left-4'>
          <p className='text-xl font-bold'>
            <span className='text-sm font-semibold text-textColor'>Số lượng: </span>
            {allAlbums?.length}
          </p>
        </div>

          <div className='w-[1370px] h-auto flex items-center justify-evenly gap-4 flex-wrap p-4 px-4'>
            <AlbumContainer data={allAlbums}/>
          </div>
        
      </div>
    </div>
  );
};

export const AlbumContainer = ({data}) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      {data && data.map((song, i) => <SongCardUser key={song._id} data={song} index={i} type = "album"/>)}
    </div>
  )
}

export default Album