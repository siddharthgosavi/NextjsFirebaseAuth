import { auth } from "@/utils/firebase";
import axios from "axios";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ImageGrid from "./ImageGrid";
import Pagination from "./Pagination";
import Spinner from "./Spinner";

const API_KEY = "RqO6DsUMI0GwmCuNpOuN8VZhFK9ET3yy";
const API_URL = "https://api.giphy.com/v1/gifs/search";

const SearchComponent = () => {
  const [searchResults, setSearchResults] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResultsData, setSearchResultsData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const router = useRouter();

  const handleSearchSubmit = async event => {
    event.preventDefault();
    setSearchResults(true);
    setSpinner(true);

    try {
      const endpoint = `${API_URL}?api_key=${API_KEY}&q=${searchKeyword}&limit=10&offset=0&rating=g&lang=en`;
      const response = await axios.get(endpoint);
      setSearchResultsData(response.data.data);
      setTotalItems(response.pagination.count);
    } catch (error) {
      console.error(error);
    }
    setSpinner(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleClickNext = () => {
    if (currentPage < totalItems) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleClickPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  useEffect(() => {
    if(searchResultsData.length > 0){

      const temp = searchResultsData.slice((currentPage - 1) * 3, currentPage * 3);
      setCurrentItems(temp);
    }

  }, [searchResultsData , currentPage]);

  useEffect(()=>{
    
    searchResultsData.length > 0 && setTotalItems(Math.ceil(searchResultsData.length / 3))
  },[searchResultsData])

  return (
    <div className={`flex overflow-hidden flex-col  items-center w-full h-[100vh] text-xl font-medium leading-tight bg-gray-200 max-md:px-5 px-[72px] py-[72px]`}>
      <button onClick={handleLogout} className={`absolute top-0 right-0 p-2 m-4 rounded-md shadow-lg bg-red-500 text-white hover:bg-white hover:text-red-500 `}>
        Logout
      </button>
      <div className={`flex w-[1136px] overflow-hidden flex-col justify-stretch items-center p-6 bg-white rounded-t-[20px] ${searchResults ? "" : " rounded-b-[20px]"}`}>
        <form onSubmit={handleSearchSubmit} className={`flex w-full lg:flex-row flex-col overflow-hidden gap-4 items-center ${searchResults ? "" : " max-md:max-w-full "}`}>
          <div className="flex overflow-hidden flex-row gap-2.5 items-start self-stretch p-6 my-auto text-black rounded-xl bg-slate-100 min-w-[240px] max-md:px-5 w-full">
            <svg loading="lazy" className="object-contain shrink-0 w-6 aspect-[0.96]" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M16.5484 9.80256C16.5484 13.5677 13.5073 16.6051 9.7742 16.6051C6.04113 16.6051 3.00003 13.5677 3.00003 9.80256C3.00003 6.0374 6.04113 3 9.7742 3C13.5073 3 16.5484 6.0374 16.5484 9.80256ZM15.014 18.079C13.4996 19.0453 11.7021 19.6051 9.7742 19.6051C4.37607 19.6051 3.05176e-05 15.2164 3.05176e-05 9.80256C3.05176e-05 4.38876 4.37607 0 9.7742 0C15.1723 0 19.5484 4.38876 19.5484 9.80256C19.5484 12.1971 18.6922 14.3912 17.2702 16.0936L23.4844 22.3511L21.3704 24.4797L15.014 18.079Z" fill="black" />
            </svg>
            <label htmlFor="searchInput" className="sr-only">
              Article name or keywords
            </label>
            <input type="text" id="searchInput" className="w-full bg-inherit border-none outline-none" placeholder="Article name or keywords..." aria-label="Article name or keywords" value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} />
          </div>
          <button type="submit" className="overflow-hidden gap-2.5 self-stretch p-6 my-auto text-white whitespace-nowrap bg-black rounded-xl max-md:px-5">
            Search
          </button>
        </form>
      </div>
      <div className={`bg-white mx-6 rounded-b-[20px] px-6 h-[90%] ${searchResults ? "w-[1136px]" : "hidden"}`}>
        {spinner && (
          <div className="flex h-full items-center justify-center ">
            <Spinner />
          </div>
        )}
        {searchResultsData && searchResultsData.length > 0 ? (
          <div className="mt-[10px]">
            <ImageGrid currentItems={currentItems} />
            
            <Pagination handleClickNext={handleClickNext} handleClickPrevious={handleClickPrevious} currentPage={currentPage} totalPages={totalItems} setCurrentPage={setCurrentPage} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
