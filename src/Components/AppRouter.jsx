import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MovieList from './Pages/MovieList';
import Favourites from './Pages/Favourites';
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MovieList/>}  />
      <Route path="/FavouriteMovies" element={<Favourites/>}  />
    </Routes>
  )
}
