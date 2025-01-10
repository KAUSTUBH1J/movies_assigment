
// Function is use to Add and remove the movies from Favourite and also for the Manually add movie
export  function handleFavourteMovies (movie, Manually = false , id ) {
    let result = '';
    //Set it's manually Added or not
    if(Manually){
        movie.release_date  = movie.release_year;
        movie.Manually      = true; 
    }else{
        movie.Manually      = false; 
    }
    

    // Set Unique id for every 
    let localData =  JSON.parse(localStorage.getItem('FavouriteMovie'));

    movie.unique_id = 1;
    if(localStorage.getItem('FavouriteMovie')){
        
        if(!(localData.length === 0)){
            let max = 0;
            for (let i = 0; i < localData.length; i++) {
                if (localData[i].unique_id > max) {
                    max = localData[i].unique_id;
                }
            }
            movie.unique_id = max+1;
        }
    
    }

    // Favourite Movie Add and Remove 
    if(localStorage.getItem('FavouriteMovie')){

        let localData =  JSON.parse(localStorage.getItem('FavouriteMovie'));
        
        if(localData.some((fav)=> fav.id === id && fav.Manually === false)){
            localData = localData.filter(mov => mov.id !== id );
            result = 'Removed';
        }else{
            localData.push(movie);
            result = 'Added';
        }
        localStorage.setItem('FavouriteMovie', JSON.stringify(localData));

    }else{
        localStorage.setItem('FavouriteMovie', JSON.stringify([movie]));
    }
    return result;

}


export function RemoveFavourteMovies (unique_id) {
    console.log('RemoveFavourteMovies call '+unique_id);
    
    if(localStorage.getItem('FavouriteMovie')){

        let localData =  JSON.parse(localStorage.getItem('FavouriteMovie'));
        
        if(localData.some((fav)=> fav.unique_id === unique_id )){
            localData = localData.filter(mov => mov.unique_id !== unique_id );
        }
        localStorage.setItem('FavouriteMovie', JSON.stringify(localData));

    }
}
