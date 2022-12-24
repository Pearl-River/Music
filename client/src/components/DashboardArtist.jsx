import React from 'react'
import {useStateValue} from "../context/StateProvider"
import { useEffect } from 'react'
import { getAllArtists } from '../api'
import {actionType} from "../context/reducer"
import SongCard from './SongCard'

const DashboardArtist = () => {
  const [{allArtists}, dispath] = useStateValue();
  useEffect(() => {
    if(!allArtists){
      getAllArtists().then((data) => {
        dispath({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist
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
            {allArtists?.length}
          </p>
        </div>

        <ArtistContainer data={allArtists}/>
      </div>
    </div>
  );
};

export const ArtistContainer = ({data}) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      {data && data.map((song, i) => <SongCard key={song._id} data={song} index={i} type = "artist"/>)}
    </div>
  )
}

export default DashboardArtist