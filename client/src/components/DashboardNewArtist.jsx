import React, {useEffect, useRef, useState} from 'react'
import {getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject} from 'firebase/storage';
import {motion} from "framer-motion";
import {BiCloudUpload} from "react-icons/bi";
import {MdDelete} from "react-icons/md";
import {storage} from "../config/firebase.config";
import {useStateValue} from "../context/StateProvider";
import {getAllArtists, saveNewArtist} from "../api";
import {actionType} from "../context/reducer";
import {IoMusicalNote} from "react-icons/io5";
import Filterbuttons from './Filterbuttons';
import {filters, filtersLanguage} from "../utils/supportfunctions";

const DashboardNewArtist = () => {
    const [{allArtists, filterTerm, artistFilter, languageFilter, alertType}, dispath] = useStateValue();
    const [isImageLoading, setisImageLoading] = useState(false);
    const [isAudioLoading, setisAudioLoading] = useState(false);
    const [artistName, setartistName] = useState("");
    const [artistImageCover, setartistImageCover] = useState(null);
    const [artistUploadingProgress, setartistUploadingProgress] = useState(0);
    const [isArtistUploading, setisArtistUploading] = useState(false);
    const [albumImageCover, setalbumImageCover] = useState(null);
    const [facebook, setfacebook] = useState("");
    const [instagarm, setinstagarm] = useState("");
    useEffect(() => {
        if(!allArtists){
            getAllArtists().then(data => {
              dispath({
                type : actionType.SET_ALL_ARTISTS,
                allArtists : data.artist,
              })
            });
        }
    }, []);

    const deleteFileObject = (url, isImage) => {
      if(isImage) {
        setisImageLoading(true);
        setisArtistUploading(true);
      }
      const deleteRef = ref(storage,url);
      deleteObject(deleteRef).then(() => {
        setartistImageCover(null);
        setisImageLoading(false);
        setisArtistUploading(false);
      });
    };

    const saveArtist = () => {
      if(!artistImageCover || !artistName || !facebook || !instagarm){

      }
      else{
        setisArtistUploading(true);
        const data ={
          name : artistName,
          imageURL : artistImageCover,
          facebook : `www.facebook.com/${facebook}`,
          instagram : `www.instagram.com/${instagarm}`,
        };

        saveNewArtist(data).then(res => {
          getAllArtists().then((data) => {
            dispath({
              type: actionType.SET_ALL_ARTISTS,
              allArtists: data.artist,
            });
          });
        });

        setisArtistUploading(false);
        setartistImageCover(null);
        setartistName("");
        setfacebook("");
        setinstagarm("");
      }
    };

  return (
    <div className='flex flex-col items-center justify p-4 border border-gray-500 gap-3 rounded'>
    <p className='text-xl font-semibold text-headingColor'>THÊM CA SĨ</p>
    <input type="text" placeholder='Nhập tên ca sĩ...' className='w-880 p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-500'
    value={artistName} onChange={(e) => setartistName(e.target.value)} />

    <div className='flex items-center rounded-md p-3 border border-gray-500 w-880'>
        <p className='text-base font-semibold text-gray-400'>www.facebook.com/</p>
        <input type="text" placeholder='' className='w-full text-base font-semibold text-textColor outline-none bg-transparent' value={facebook} onChange={(e) => setfacebook(e.target.value)}/>
    </div>

    <div className='flex items-center rounded-md p-3 border border-gray-500 w-880'>
        <p className='text-base font-semibold text-gray-400'>www.instagram.com/</p>
        <input type="text" placeholder='' className='w-full text-base font-semibold text-textColor outline-none bg-transparent' value={instagarm} onChange={(e) => setinstagarm(e.target.value)}/>
    </div>

    <div className='bg-card backdrop-blur-md w-full h-300 rounded-md border border-gray-500 cursor-pointer'>
      {isArtistUploading && <FileLoader progress={artistUploadingProgress} />}
      {!isArtistUploading && (
        <>{!artistImageCover ? (<FileUploader updateState ={setartistImageCover} setProgress ={setartistUploadingProgress} 
            isLoading={setisArtistUploading} isImage={true}/>
            )  : (<div className='relative w-full h-full overflow-hidden rounded-md'>
              <img src={artistImageCover} className='w-full h-full object-cover' alt="" />
              <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
              onClick={() => deleteFileObject(artistImageCover, true)}>
                <MdDelete className='text-white'/>
              </button>
            </div>)}</>
      )}
    </div>

    <div className='flex items-center justify-center w-60 cursor-pointer p-4'>
        {isArtistUploading ? (
          <DisabledButton />
        ) : (
          <motion.button whileTap={{scale : 0.5}} className="px-8 py-2 w-full rounded-md text-white bg-red-600 hover:shadow-lg"
          onClick={saveArtist}>
            LƯU CA SĨ
          </motion.button>
        )}
    </div>   
</div>
);
};

export const DisabledButton = () => {
return (
<button disabled type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 
dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center'>
  <svg role="status" className='inline w-4 h-4 mr-3 text-white animate-spin' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 
      50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="#E5E7EB"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 
      1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 
      51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentColor"
    />
  </svg>
  Đang tải...
</button>
);
};

export const FileLoader = ({progress}) => {
return (
<div className='w-full h-full flex flex-col items-center justify-center'>
  <p className='text-xl font-semibold text-textColor'>
    {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
  </p>
  <div className='w-20 h-20 min-w-[40px] bg-red-600 animate-ping rounded-full flex items-center justify-center relative'>
    <div className='absolute inset-0 rounded-full bg-red-600 blur-xl'></div>
  </div>
</div>
)
};

export const FileUploader = ({updateState, setProgress, isLoading, isImage}) => {
const[{alertType}, dispath] = useStateValue();
const uploadFile = (e) => {
isLoading(true);
const uploadedFile = e.target.files[0];
const storageRef = ref(storage, `${isImage ? "Images" : "Audio"}/${Date.now()}-${uploadedFile.name}`);
const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
uploadTask.on("state_changed", (snapshot) => {
  setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
},
  (error) => {
    console.log(error)
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      updateState(downloadURL);
      isLoading(false);
    })
  }
);
};
return (
<label>
  <div className='flex flex-col items-center justify-center h-full'>
    <div className='flex flex-col justify-center items-center cursor-pointer'>
      <p className='font-bold text-2xl'>
        <BiCloudUpload/>
      </p>
      <p className='text-lg'>Nhấn để tải {isImage ? "ảnh" : "nhạc"} lên</p>
    </div>
  </div>
  <input type="file" name='upload-flie'  accept={`${isImage ? "image/*" : "audio/*"}`} className={"w-0 h-0"}
          onChange={uploadFile}/>
</label>
)
};

export default DashboardNewArtist