import React from 'react'
import { useState } from 'react'
function Pagination({ currentPage, totalPages, onNext, onPrev }) {
  
  return (
    <div className='flex justify-center
        my-4
    ' >
        <div className='border-2
        p-2
        border-r-0
        rounded-l-xl
        border-blue-400
        cursor-pointer
        '
        onClick={onPrev}
        disabled={currentPage === 1}
        >Previous</div>
        <div className='border-2
        border-blue-400
        p-2'>    Page {currentPage} of {totalPages}</div>
        <div className='border-2
        border-blue-400
        border-l-0
        rounded-r-xl
        p-2
         cursor-pointer
        '
        disabled={currentPage === totalPages}
        >Next</div>
    </div>
  )
}

export default Pagination