import React, { useEffect, useState } from 'react'
import {handleFavourteMovies} from '../../function/AddmovieToFavourite';

export default function MovieList() {

  const [movies, setMovies]         = useState([]);
  const [loading, setLoading]       = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [FavMovie, setFavMovie]     = useState([]);
  
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
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?page=${pageNumber}&api_key=4386492ef1543992adb4d2af9679d7ec`);
      const data = await response.json();
      console.log(data);
      setMovies(data.results);
      setLoading(true);
    } catch (error) {
      console.warn('Error :'+error)
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

    handleFavourteMovies(TempArry,id);
    handleFavMovieState();
  } 

  // const handleFavourteMovies = (movie,id) => {
    
  //   if(localStorage.getItem('FavouriteMovie')){

  //     let localData =  JSON.parse(localStorage.getItem('FavouriteMovie'));
      
  //     if(localData.some((fav)=>fav.id === id)){
  //       localData = localData.filter(mov => mov.id !== id);
  //     }else{
  //       localData.push(movie);
  //     }
  //     localStorage.setItem('FavouriteMovie', JSON.stringify(localData));
  //     setFavMovie(localData);

  //   }else{
  //     localStorage.setItem('FavouriteMovie', JSON.stringify([movie]));
  //     setFavMovie([movie]);
  //   }
  // }

  return (
    <>
      <div className='p-3'>
        <h2 className='text-center mt-3'>List of Movies</h2>
        
       
        <div className='m-3 '>
          <div className='d-flex flex-row-reverse mb-3'>
            <form className="d-flex w-30" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> 
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
              { movies.map((item,intex)=>{
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
              })}
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
