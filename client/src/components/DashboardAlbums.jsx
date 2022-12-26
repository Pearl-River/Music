import React, { useState } from 'react'
import {useStateValue} from "../context/StateProvider"
import { useEffect } from 'react'
import { getAllAlbums } from '../api'
import {actionType} from "../context/reducer"
import SongCard from './SongCard'
import { NavLink } from 'react-router-dom'
import { BsFillCloudArrowUpFill } from 'react-icons/bs'

const DashboardAlbums = () => {
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
    <div className='w-full p-4 flex items-center justify-center flex-col border border-gray-900'>
      <div className='w-full flex justify-center items-center gap-20'>
        <NavLink to={"/dashboard/newAlbum"} className='bg-white flex items-center justify-center px-4 py-3 border rounded-md border-gray-900 hover:border-gray-500 hover:shadow-md cursor-pointer'>
        <p className='flex items-center justify-center w-full'><b>Tải lên Album</b>&nbsp;<BsFillCloudArrowUpFill/></p>
        </NavLink>
        <input type="text" className={`bg-white w-52 px-4 py-2 border ${isFoucs ? "border-gray-500 shadow-md" : "border-gray-900"} 
        rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`} 
        placeholder='Tìm kiếm Album...' value={songFilter} onChange={(e) => setSongFilter(e.target.value)}
        onBlur={() => {setisFoucs(false)}} onFocus={() => setisFoucs(true)}/>
      </div>

      <div className='relative w-full my-4 p-4 py-16 border border-gray-900 rounded-md'>
        <div className='absolute top-4 left-4'>
          <p className='text-xl font-bold'>
            <span className='text-sm font-semibold text-black'>Số lượng: </span>
            {allAlbums?.length}
          </p>
        </div>

        <div className='w-[1780px] h-auto flex items-center justify-evenly gap-4 flex-wrap p-4 px-4'>
          <AlbumContainer data={allAlbums}/>
        </div>

      </div>
    </div>
  );
};

export const AlbumContainer = ({data}) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      {data && data.map((song, i) => <SongCard key={song._id} data={song} index={i} type = "album"/>)}
    </div>
  )
}

export default DashboardAlbums