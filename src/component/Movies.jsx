import React, { useEffect, useState } from 'react'
// import image from './image.jpg'
import { Oval } from "react-loader-spinner"

import axios from 'axios'
import Pagination from './Pagination';
function Movies() {
 
  let [movies, setMovies] = useState([])
  let [pageNum, setPage] = useState(1)
  let [hovered, setHovered]=useState("")
  let [favourite , setFavourite] = useState([])
   favourite =JSON.parse(localStorage.getItem("locate"))||[];
  useEffect(() => {
    (function () {
      axios.get('https://api.tvmaze.com/search/shows?q=girls')
        .then((res) => {
          setMovies(res.data);

        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, [pageNum]);


 
  const onPrev = () => {
    if (pageNum > 1) {
      setPage(pageNum - 1)
    }
  }
  const onNext = () => {
    if (pageNum >= 1) {
      setPage(pageNum + 1)
    }
     

  }

  // emoji show and hide>>>>>>>>>>>>>>
   let showEmoji=(id)=>{
       setHovered(id)
   }
  let hideEmoji=()=>{
    setHovered("")
  }
// <<<<<<<<<<<<<<<<<<<<<<<<<Add to the localStorage>>>>>>>>>>>>>>>>>>>>
  let addEmoji =(id)=>{
    let newFav = [...favourite ,  id]
 
    setFavourite(newFav)

    localStorage.setItem("locate", JSON.stringify(newFav))
  }

  // <<<<<<<<<<remove item from the localStorage>>>>>>>
  let removeEmoji =(id)=>{
   let filterFav = favourite.filter((ele)=>{
    return ele.show.id!=id
   })
   setFavourite(filterFav)
   localStorage.setItem("locate", JSON.stringify(filterFav))
  }
  return (
      

    <>



      <div className="mt-8">
        <div className="mb-8 font-bold text-2xl text-center">Trending Movies</div>
        <div className='flex flex-wrap justify-center '>
          {movies.length === 0 ? (
            <div>
              <Oval
                height="80"
                width="80"
                radius="9"
                color="gray"
                ariaLabel="loading"

              />
            </div >
          )

            :
            (
              movies.map((item) => {
                // console.log(item.show.id)
                return (

                  <div
                   onMouseOver={
                    ()=>{showEmoji(item.show.id)}
                   }
                   onMouseLeave={
                    ()=>{hideEmoji(item.show.id)}
                   }
                    key={item.show.id}

                    className='bg-center bg-cover w-[160px] h-[30vh] m-4  md:h-[40vh] md:w-100 rounded-md hover:scale-110 duration-300 relative ' style={{
                      backgroundImage: `url(${item.show.image && item.show.image.medium ? item.show.image.medium : 'https://via.placeholder.com/160x240'})`
                    }}
                  >
                    <div className='
                       p-2
                       bg-gray-900
                        absolute right-1 top-2
                        rounded-xl

                    '
                    style={{
                      display:hovered===item.show.id ? 'block' : 'none'
                    }}
                    >
                    {
      favourite.includes(item.show.id)==false? (<div className='text-2xl'
        onClick={()=>{addEmoji(item.show)}}
      >
      😍
    </div>):(<div className='text-2xl'
     onClick={()=>{removeEmoji(item.show.id)}}
    >
      ❌
    </div>)
                    }
                    
                    </div>
                  
                    <div
                      className='font-bold text-white
                             bg-gray-900 bg-opacity-60
                             p-2
                             text-center
                             w-full absolute 
                             bottom-0 
                             rounded-b-md'
                    >{item.show.name}</div>
                  </div>)

              })
            )



          }

        </div>
        <Pagination
          pageNum={pageNum}
          onPrev={onPrev}
          onNext={onNext}

        ></Pagination>
      </div >



    </>

  )
}


export default Movies