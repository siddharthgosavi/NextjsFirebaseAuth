import React, { useEffect } from "react";

function Pagination({ handleClickNext, handleClickPrevious, currentPage, totalPages, setCurrentPage }) {
  useEffect(() => {
    console.log("currentPage", "totalPages");
    console.log(currentPage, totalPages);
  }, [currentPage, totalPages, setCurrentPage]);
  return (
    <nav className="flex flex-row justify-center w-full text-sm font-semibold leading-none whitespace-nowrap text-neutral-800 mt-[348px]" aria-label="Pagination">
      <div className="flex z-10 gap-5 justify-between items-center my-auto mr-0">
        <button onClick={handleClickPrevious} disabled={currentPage === 1} className="self-stretch my-auto w-[68px]  h-[45px] hover:bg-pink-200 hover:border-b-2 hover:border-pink-500">
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)} className={`self-stretch p-2 my-auto w-8 h-[45px] hover:bg-pink-200 hover:border-b-2 hover:border-pink-500 ${currentPage === index + 1 ? " bg-pink-200 border-b-2 border-pink-500" : ""}`}>
            {index + 1}
          </button>
        ))}

        <button onClick={handleClickNext} disabled={currentPage === totalPages} className="self-stretch my-auto w-[49px] h-[45px] hover:bg-pink-200 hover:border-b-2 hover:border-pink-500">
          Next
        </button>
      </div>
    </nav>
  );
}

export default Pagination;
