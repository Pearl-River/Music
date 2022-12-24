import React from 'react'
import {useStateValue} from "../context/StateProvider"
import { useEffect } from 'react'
import { getAllAlbums } from '../api'
import {actionType} from "../context/reducer"
import SongCard from './SongCard'

const DashboardAlbums = () => {
  const [{allAlbums}, dispath] = useStateValue();
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
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      <div className='relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md'>
        <div className='absolute top-4 left-4'>
          <p className='text-xl font-bold'>
            <span className='text-sm font-semibold text-textColor'>Count: </span>
            {allAlbums?.length}
          </p>
        </div>

        <AlbumContainer data={allAlbums}/>
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