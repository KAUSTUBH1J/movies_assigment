
// Function is use to Add and remove the movies from Favourite
export function handleFavourteMovies (movie, id, Manually = false ) {
    console.log(Manually);
    if(localStorage.getItem('FavouriteMovie')){

      let localData =  JSON.parse(localStorage.getItem('FavouriteMovie'));
      
      if(localData.some((fav)=>fav.id === id)){
        localData = localData.filter(mov => mov.id !== id);
      }else{
        localData.push(movie);
      }
      localStorage.setItem('FavouriteMovie', JSON.stringify(localData));
    //   setFavMovie(localData);

    }else{
      localStorage.setItem('FavouriteMovie', JSON.stringify([movie]));
    //   setFavMovie([movie]);
    }
}