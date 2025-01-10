import React, { useEffect, useState } from 'react'
import {handleFavourteMovies} from '../../function/AddmovieToFavourite';
import { toast } from 'react-toastify';

export default function MovieList() {

  const [movies, setMovies]         = useState([]);
  const [loading, setLoading]       = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [FavMovie, setFavMovie]     = useState([]);
  const [search, setSearch]         = useState('');
  useEffect(()=>{
    
    console.log('useEffect call');
    setLoading(false);
    GetMovies();
    handleFavMovieState();
  },[]);


  const handleFavMovieState = () =>{
    console.log('handleFavMovieState call');
    if(localStorage.getItem('FavouriteMovie')){
      let data =  JSON.parse(localStorage.getItem('FavouriteMovie'));
      setFavMovie(data);
    }
  }
  const handlepage = (action) =>{
    console.log('handlepage Function call '+action);
    if(action=='Next'){
      setPageNumber(pageNumber+1);
    }else if(action === 'Previous' ){
      setPageNumber(pageNumber-1);
    }
    GetMovies();
  }

  const GetMovies = async() =>{
    setLoading(false);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?page=${pageNumber}&api_key=4386492ef1543992adb4d2af9679d7ec  `);
      const data = await response.json();
      console.log(data.status_code);
      if(data.status_code){
        toast.error(data.status_message);
      }else{
        setMovies(data.results);
      }
      setLoading(true);
    } catch (error) {
      toast.error("Enable to Fetch Movie list !")
      console.warn('Error :'+error);
    }
  }

  const addToFavourites = (id) =>{
    console.log('addToFavourites function call '+ id);
    const movie = movies.find((item)=> item.id == id);

    const TempArry = {
      id            : movie.id,
      title         : movie.title,
      overview      : movie.overview,
      release_date  : movie.release_date
    };

    const result = handleFavourteMovies(TempArry,false,id);
    handleFavMovieState();

    if(result === 'Added'){
      toast.success("Movies Added to Favorite list!")
    }else if(result === 'Removed'){
      toast.error("Movies Remove to Favorite list!")
    }
  } 
  const handleInputSearch = (e) =>{
    const value = e.target.value;
    setSearch(value);
  }

  const searchHandle = () =>{
    GetMovies();
    console.log('searchHandle call '+search);
    let data = [];
    const value = search;
    data = movies.filter((mov)=>{
      let title = mov.title.toLowerCase();
      if(title.includes(value.toLowerCase())){
        return true;
      }else{
        return false;
      }
    })
    
    console.log(data)
    if(search.length === 0){
      GetMovies();
    }else{
      setMovies(data);
    }
    
  }


  return (
    <>
      <div className='p-3'>
        <h2 className='text-center mt-3'>List of Movies</h2>
        
       
        <div className='m-3 '>
          <div className='d-flex flex-row-reverse mb-3'>
            <div className="d-flex w-30" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={handleInputSearch}/>
              <button className="btn btn-outline-success"  onClick={searchHandle}>Search</button>
            </div> 
          </div>
          {
            !loading? "Loading...": 
            <><table className="table  table-bordered">
            <thead className='table-primary'>
              <tr>
                <th colSpan="col">#</th>
                <th colSpan="col">Title</th>
                <th colSpan="col">Release Year</th>
                <th colSpan="col">Overview </th>
                <th colSpan="col">Action </th>
              </tr>
            </thead>
            <tbody>
              { movies ? movies.map((item,intex)=>{
                const isFavorite = FavMovie.length !== 0 ? FavMovie.some((fav) => fav.id === item.id) :'';
                return(
                  <tr key={item.id}>
                    <th colSpan="row">{(intex+1)+(20+((pageNumber-1)*20))-20}</th>
                    <td>{item.title}</td>
                    <td>{item.release_date.slice(0,4)}</td>
                    <td>{item.overview.length >= 100 ? item.overview.slice(0,100)+'...' :item.overview}</td>
                    <td>
                      <button className='btn btn-primary' onClick={()=>addToFavourites(item.id)} >
                      {isFavorite ? (
                        <i className="fa-solid fa-bookmark"></i>
                      ) : (
                        <i className="fa-regular fa-bookmark"></i>
                      )}
                      </button>
                    </td>
                  </tr>
                )
              }):(<tr>
                  <td colSpan='5'>No Data Found</td>
                </tr>)}
            </tbody>
          </table></>
          }
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={()=>{handlepage('Previous')}} disabled={pageNumber <=1 } >Previous</button>
            <button className="btn btn-primary"  onClick={()=>{handlepage('Next')}} disabled={pageNumber >=500 } >Next</button>
          </div>
        </div>
      </div>
      
    </>
  )
}
