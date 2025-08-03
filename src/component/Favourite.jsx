import React, { Component, useState, useEffect } from 'react'
import Pagination from './Pagination'
import image from './scrolling-down.png'
import img from './scrolling-up.png'
import { Link } from 'react-router-dom'

function Favourite() {

  let [favData, setFavData] = useState([])
  let [searchQuery , setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const favouriteData = localStorage.getItem("locate");
    try {
      const parsedData = JSON.parse(favouriteData) || [];
      setFavData(parsedData);
      // console.log(favData)
      // console.log(parsedData); // Log parsed data to check its structure
    } catch (error) {
      console.error("Error parsing data from localStorage:", error);
      setFavData([]); // Set to an empty array if there's a parsing error
    }
  }, []);

  //////////// genre/////////
  let  filterGenreToCrime =()=>{
    let result = favData.filter((item)=>{
      if(item.genres.includes("Crime")){
        return true
      }

    })
    setFavData(result)
    
  } 
  let  filterGenreToDrama =()=>{
    let result = favData.filter((item)=>{
      if(item.genres.join()=="Drama"){
      return true;
      }
    })
    setFavData(result)
  } 
  let  filterGenreToComedy =()=>{
    let result = favData.filter((item)=>{
      if(item.genres[0]=="Comedy"){
      return true;
      }
    })
    setFavData(result)
  } 
  
 
  console.log(favData)
  
 
 
 
  // console.log(favData)
  // this functioon is for deleleteing 
  let removeFav = (id) => {
    let found = false;
    let filterFav = favData.filter((ele) => {

      if (ele.id == id && !found) {
        found = true;
        return false
      }
      return true;
    })
    favData = filterFav
    setFavData(favData)
    localStorage.setItem("locate", JSON.stringify(favData))
  }
   // come to search part
 
   let filterFavData = favData.filter((movie)=>movie.name.toLowerCase().includes(searchQuery.toLowerCase()))
 

    //  paggination logic
    const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = filterFavData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterFavData.length / itemsPerPage);
  

  // Handling next and previous buttons
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <>
      <div className='mt-4 flex space-x-2 justify-center'>
        <button className='py-1 px-2  bg-blue-400 rounded-lg
    text-lg font-boldtext-white '   >All Genres</button>

      
        <button className='py-1 px-2  bg-gray-400 rounded-lg
       text-lg font-boldtext-white hover:bg-blue-400'
       onClick={()=>filterGenreToCrime()}
       >Crime</button>
         
         <button className='py-1 px-2  bg-gray-400 rounded-lg
       text-lg font-boldtext-white hover:bg-blue-400' onClick={()=>filterGenreToDrama()}  >Drama</button>

<button className='py-1 px-2  bg-gray-400 rounded-lg
       text-lg font-boldtext-white hover:bg-blue-400' onClick={()=>filterGenreToComedy()}>Comedy</button>
      </div>

      {/* Searching part  */}

      <div className='mt-4 flex justify-center space-x-2 text-center'>
        <input type="text" placeholder='Search'
          className='border-2 py-1 px-2 text-center '
          value={searchQuery}
          onChange={(e)=> setSearchQuery(e.target.value)}
        />
        <input type="number" className='border-2 py-1 px-2 text-center '
        
        />
      </div>
      {/* table>>>>>>>>>> */}
      <div className=" overflow-x-visible rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50 ">
            <tr className=' space-x-2'>
              <th scope="col" className="px-6 py-4 font-bold text-gray-900 ">Name</th>


              <th scope="col" className="px-6 py-4 font-bold text-gray-900 ">
                <div className='flex space-x-1'>
                  <img src={img} className='w-6' alt="" />
                  <div>Rating</div>

                  <img className='w-6' src={image} alt="error" />
                </div>
              </th>


              <th scope="col" className="px-6 py-4 font-bold text-gray-900">
                <div className='flex space-x-1'>
                  <img src={img} className='w-6' alt="" />
                  <div>Popularity</div>

                  <img className='w-6' src={image} alt="error" />
                </div>
              </th>
              <th scope="col" className="px-6 py-4 font-bold text-gray-900">Genre</th>
              <th scope="col" className="px-6 py-4 font-bold text-gray-900">Remove</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {
              searchQuery ? (
                filterFavData.map((movie , index) => {
                  // console.log(movie.genres)
                  const movieName = movie.name || "Unknown Title";
                  const movieImage =  movie.image && movie.image.medium ? movie.image.medium : "path/to/placeholder-image.jpg"; // Placeholder image
                  const rating = movie.rating.average || "2.4"; // Assuming there's a rating
                  const popularity = movie.averageRuntime || "7.3"; // Assuming there's popularity
                  const genre = movie.genres?.[0] || "Unknown Genre"; // Assuming genres is an array
                  // console.log(movie.genres)
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <th className="flex items-center gap-3 px-6 py-4 font-normal text-gray-900 mr-8">
                        <img
                          className="md:h-[100px]  md:w-[160px] rounded-xl object-cover object-center"
                          src={movieImage}
                          alt={movieName}
                        />
                        <div className="font-medium text-gray-700">{movieName}</div>
                      </th>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold">{rating}</span>
                      </td>
                      <td className="px-6 py-4">{popularity}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                          {genre}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex gap-4 text-red-600 cursor-pointer"
                          onClick={() => { removeFav(movie.id) }}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  );
                })
    
              ):(
                favData.map((movie , index) => {
                  const movieName = movie.name || "Unknown Title";
                  const movieImage =  movie.image && movie.image.medium ? movie.image.medium : "path/to/placeholder-image.jpg"; // Placeholder image
                  const rating = movie.rating.average || "2.4"; // Assuming there's a rating
                  const popularity = movie.averageRuntime || "7.3"; // Assuming there's popularity
                  const genre = movie.genres?.[0] || "Unknown Genre"; // Assuming genres is an array
                  // console.log(movie.genres)
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <th className="flex items-center gap-3 px-6 py-4 font-normal text-gray-900 mr-8">
                        <img
                          className="md:h-[100px]  md:w-[160px] rounded-xl object-cover object-center"
                          src={movieImage}
                          alt={movieName}
                        />
                        <div className="font-medium text-gray-700">{movieName}</div>
                      </th>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold">{rating}</span>
                      </td>
                      <td className="px-6 py-4">{popularity}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                          {genre}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex gap-4 text-red-600 cursor-pointer"
                          onClick={() => { removeFav(movie.id) }}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  );
                })
    
              )
            }
           

          </tbody>
        </table>
      </div>

      <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
      ></Pagination>
    </>
  )
}

// components for tables

export default Favourite