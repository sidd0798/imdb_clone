
// import image from './image.jpg'
// import "./Banner.css"
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Oval} from "react-loader-spinner"
function Banner() {
  let [bannerMovies, setBannerMovies] = useState([]);
  let [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    (function () {
      axios.get('https://api.tvmaze.com/search/shows?q=girls')
        .then((res) => {
          setBannerMovies(res.data);
          
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex(prevIndex =>
        prevIndex === bannerMovies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [bannerMovies]);

  const currentBanner = bannerMovies[currentBannerIndex];

  
  return (
    <>
      {/* <img src={image} alt=""  />
   <div className="banner-head
      
   ">
   <div className="
   bg-gray-900
   text-white
   text-xl
   font-bold 
   py-10
   bg-opacity-40
    text-center
   ">
     M3GAN
   </div>

   </div> */}
     {
        bannerMovies.length === 0 ? 
        <div className='flex justify-center'>
           <Oval
        height="80"
        width="80"
        radius="9"
        color="gray"
        ariaLabel="loading"
      
      /> 
        </div>
       :
          <div
            className='bg-banner h-[60vh] md:h-[80vh] bg-center bg-cover relative'
            style={{
              backgroundImage: `url(${currentBanner.show.image && currentBanner.show.image.original ? currentBanner.show.image.original : ''})`
            }}
          >
            <div className='text-xl text-white bg-gray-900 bg-opacity-60 p-4 text-center w-full font-bold absolute bottom-0'>
              {currentBanner.show.name}
            </div>
          </div>
      }
  </>
  )
}

export default Banner
