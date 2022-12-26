import React, { useEffect, useState } from "react";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import Filter from "./Filter";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import 'react-slideshow-image/dist/styles.css'

const Music = () => {
  const [{searchTerm, isSongPlaying, songIndex, allSongs, artistFilter, filterTerm}, dispath ] = useStateValue();
  const [filteredSongs, setFilteredSongs] = useState(null);

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispath({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(searchTerm) ||
          data.name.toLowerCase().includes(searchTerm) ||
          data.name.toUpperCase().includes(searchTerm) ||
          data.artist.toUpperCase().includes(searchTerm) ||
          data.artist.includes(artistFilter) ||
          data.category.toLowerCase() === filterTerm
          );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [searchTerm]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-gray-200">
      <Header />
      <SearchBar />
      
      {searchTerm.length > 0 && (
        <p className="my-4 text-base text-textColor">
          Tìm kiếm cho :
          <span className="text-xl text-cartBg font-semibold">
            {searchTerm}
          </span>
        </p>
      )}
        <div className="pb-16"></div>
      <div className="w-[1370px] h-auto flex items-center justify-evenly gap-4 flex-wrap p-4 px-4">
        <HomeSongContainer musics={filteredSongs ? filteredSongs : allSongs} />
      </div>
    </div>
  );
};

export const HomeSongContainer = ({ musics }) => {
  const [{ isSongPlaying, songIndex, allSongs }, dispatch] = useStateValue();

  const addSongToContext = (index) => {
    if(!isSongPlaying) {
      dispatch({
          type: actionType.SET_ISSONG_PLAYING,
          isSongPlaying: true,
      });
  }

  if(songIndex !== index){
      dispatch({
          type: actionType.SET_SONG_INDEX,
          songIndex: index,
      });
  }

  if (!allSongs) {
    getAllSongs().then((data) => {
      dispatch({
        type: actionType.SET_ALL_SONGS,
        allSongs: data.song,
      });
    });
  }
  };
  return (
    <>
      {musics?.map((data, index) => (
        <motion.div
          key={data._id}
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
          onClick={() => addSongToContext(index)}>
          <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={data.imageURL}
              alt=""
              className=" w-full h-full rounded-lg object-cover"
            />
          </div>

          <p className="text-base text-headingColor font-semibold my-2">
            {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
            <span className="block text-sm text-gray-400 my-1">
              {data.artist}
            </span>
          </p>
        </motion.div>
      ))}
    </>
  );
};

export default Music