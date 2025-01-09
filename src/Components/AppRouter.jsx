import React,{lazy, Suspense}from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import MovieList from './Pages/MovieList';
import Favourites from './Pages/Favourites';
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/MoviesList" element={<MovieList/>}  />
      <Route path="/FavouriteMovies" element={<Favourites/>}  />
    </Routes>
  )
}
