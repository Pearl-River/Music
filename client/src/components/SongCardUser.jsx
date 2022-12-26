import React, { useState } from 'react'
import {motion} from "framer-motion"
import { IoTrash } from 'react-icons/io5';
import { deleteAlbumById, deleteArtistById, deleteSongById, getAllAlbums, getAllArtists, getAllSongs } from '../api';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { storage } from '../config/firebase.config';
import { deleteObject, ref } from 'firebase/storage';

const SongCardUser = ({data, index, type}) => {
    const [isDelete, setisDelete] = useState(false);
    const [{alertType, allArtists, allAlbums, allSongs, songIndex, isSongPlaying}, dispath] = useStateValue();
    const deleteData = (data) => {
            const deleteRef = ref(storage, data.imageURL);
            deleteObject(deleteRef).then(() => {});
            deleteSongById(data._id).then((res) => {
                if(res.data) {
                    getAllSongs().then((data) => {
                        console.log(data.song);
                        dispath({
                          type: actionType.SET_ALL_SONGS,
                          allSongs: data.song,
                        });
                      });
                }
            });
            deleteAlbumById(data._id).then((res) => {
                if(res.data) {
                    getAllAlbums().then((data) => {
                        dispath({
                          type: actionType.SET_ALL_ALBUMS,
                          allAlbums : data.album,
                        });
                      });
                }
            });
            deleteArtistById(data._id).then((res) => {
                if(res.data) {
                    getAllArtists().then((data) => {
                        dispath({
                          type: actionType.SET_ALL_ARTISTS,
                          allArtists: data.artist
                        });
                      });
                }
            });
    };

    const addToContext = () => {
        if(!isSongPlaying) {
            dispath({
                type: actionType.SET_ISSONG_PLAYING,
                isSongPlaying: true,
            });
        }

        if(songIndex !== index){
            dispath({
                type: actionType.SET_SONG_INDEX,
                songIndex: index,
            });
        }
    }
  return ( 
    <motion.div className='relative w-60 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center'
    onClick={type === "song" && addToContext}>
        <div className='w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden'>
            <motion.img whileHover={{scale: 1.05}} src={data.imageURL} className='w-full h-full rounded-lg object-cover'/>
        </div>

        <p className='text-base text-center text-headingColor font-semibold my-2'>
            {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}
            {data.artist && (
                <span className='block text-sm text-gray-400 my-1'>
                {data.artist.length > 25 ? `${data.artist.slice(0, 25)}....` : data.artist}</span>
            )}
        </p>

    </motion.div>
  );
};

export default SongCardUser;