import React, { useState } from 'react'
import {NavLink} from "react-router-dom"
import {BsFillCloudArrowUpFill} from "react-icons/bs"
import { useEffect } from 'react'
import {useStateValue} from "../context/StateProvider"
import { getAllSongs } from '../api'
import {actionType} from "../context/reducer"
import SongCard from './SongCard'
import { motion } from "framer-motion";

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFoucs, setisFoucs] = useState(false);
  const [{allSongs}, dispath] = useStateValue();
  const [filteredSongs, setFilteredSongs] = useState(null);
  useEffect(() => {
    if(!allSongs) {
      getAllSongs().then((data) => {
        console.log(data.song);
        dispath({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (songFilter.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(songFilter) ||
          data.name.toLowerCase().includes(songFilter) ||
          data.name.toUpperCase().includes(songFilter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [songFilter]);
  return (
    <div className='w-full p-4 flex items-center justify-center flex-col border border-gray-900'>
      <div className='w-full flex justify-center items-center gap-20'>
        <NavLink to={"/dashboard/newSong"} className='bg-white flex items-center justify-center px-4 py-3 border rounded-md border-gray-900 hover:border-gray-500 hover:shadow-md cursor-pointer'>
        <p className='flex items-center justify-center w-full'><b>Tải lên Bài hát</b>&nbsp;<BsFillCloudArrowUpFill/></p>
        </NavLink>
        <input type="text" className={`bg-white w-52 px-4 py-2 border ${isFoucs ? "border-gray-500 shadow-md" : "border-gray-900"} 
        rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`} 
        placeholder='TÌm kiếm bài hát...' value={songFilter} onChange={(e) => setSongFilter(e.target.value)}
        onBlur={() => {setisFoucs(false)}} onFocus={() => setisFoucs(true)}/>
      
      {songFilter && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setSongFilter("");
              setFilteredSongs(null);
            }}>
          </motion.i>
        )}
      </div>

      <div className='relative w-full my-4 p-4 py-16 border border-gray-900 rounded-md'>
        <div className='absolute top-4 left-4'>
          <p className='text-xl font-bold'>
            <span className='text-sm font-semibold text-textColor'>Số lượng: </span>
            {filteredSongs ? filteredSongs?.length : allSongs?.length}
          </p>
        </div>

        <div className='w-[1780px] h-auto flex items-center justify-evenly gap-4 flex-wrap p-4 px-4'>
          <SongContainer data={filteredSongs ? filteredSongs : allSongs}/>
        </div>

      </div>
    </div>
  );
};

export const SongContainer = ({data}) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      {data && data.map((song, i) => <SongCard key={song._id} data={song} index={i}
      type = "song"/>)}
    </div>
  )
}

export default DashboardSongs