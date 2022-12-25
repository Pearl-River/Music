import React, { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { Album, Artist, Dashboard, Home, Login, Music, MusicPlayer, NewAlbumUser, NewSongUser, UserProfile } from './components'
import { app } from './config/firebase.config'
import { getAuth } from 'firebase/auth'
import {AnimatePresence} from 'framer-motion'
import { getAllSongs, validateUser } from './api'
import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'
import {motion} from "framer-motion"
import NewArtistUser from './components/NewArtistUser'
import AlbumUser from './components/AlbumUser'

const App = () => {

    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();
    const [{user, isSongPlaying, songIndex, allSongs}, dispatch] = useStateValue();

    const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true")

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if(userCred){
                userCred.getIdToken().then((token) => {
                    // console.log(token)
                    validateUser(token).then((data) => {
                        dispatch({
                            type: actionType.SET_USER,
                            user: data
                        });
                    });
                });
            } else{
                setAuth(false);
                window.localStorage.setItem("auth", "false");
                dispatch({
                    type: actionType.SET_USER,
                    user: null
                })
                navigate("/login")
            }
        })
    }, []);

  useEffect(() => {
    if (!allSongs && user) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
    }
  }, []);

  return (
    <AnimatePresence >
        <div className='h-auto min-w-[680px] bg-primary flex justify-center items-center'>
        <Routes>
            <Route path='/login' element={<Login setAuth = {setAuth} />} />
            <Route path='/*' element={<Home />} />
            <Route path='/dashboard/*' element={<Dashboard />} />
            <Route path='/userProfile' element={<UserProfile />} />
            <Route path='/musics' element={<Music />} />
            <Route path='/artists' element={<Artist />} />
            <Route path='/albums' element={<Album />} />
            <Route path='/newSongUser' element={<NewSongUser />} />
            <Route path='/newArtistUser' element={<NewArtistUser />} />
            <Route path='/newAlbumUser' element={<AlbumUser />} />
        </Routes>

        {isSongPlaying && (
            <motion.div initial={{opacity : 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl
            backdrop-blur-md flex items-center justify-center`}>
                <MusicPlayer />
            </motion.div>
        )}
    </div>

    </AnimatePresence>
  )
}

export default App