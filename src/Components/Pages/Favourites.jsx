import React,{useEffect, useState} from 'react'
import AddMovieModel from '../Components/AddMovieModel';
import {RemoveFavourteMovies} from '../../function/AddmovieToFavourite'
import { toast } from 'react-toastify';

export default function Favourites() {
    const [loading, setLoading]     = useState(false);
    const [movies, setMovies]       = useState([]);
    const [showModel, setShowModel] = useState(false);
    const [isEdit, setIsEdit]       = useState(false);
    const [data, setData]           = useState({
      unique_id     : '',
      title         : '',
      release_year  : '',
      overview      : ''
    });


    useEffect(()=>{
      setFavHandle();
    },[]);

    const setFavHandle = ()=>{
      if(localStorage.getItem('FavouriteMovie')){
        let data =  JSON.parse(localStorage.getItem('FavouriteMovie'));
        setMovies(data);
        setLoading(true);   
      }
    }

    const ShowModel = () =>{
      
      setShowModel(true);
    }
    
    const hideModel = () =>{
      setShowModel(false);
      setFavHandle();
    }

    const HandleRemove  = (unique_id) =>{
      const response = RemoveFavourteMovies(unique_id);
      response.code === 200 ? toast.warn(response.message) : toast.error(response.message);
      setFavHandle();
    }
    

    const HandleEdit = (unique_id) =>{

      if(localStorage.getItem('FavouriteMovie')){

        let editData =  JSON.parse(localStorage.getItem('FavouriteMovie'));
        editData = editData.find((mov)=>mov.unique_id === unique_id);
        setIsEdit(true);
        setData({
          unique_id     : editData.unique_id,
          title         : editData.title,
          release_year  : editData.release_year.slice(0,4),
          overview      : editData.overview.slice(0,255),
        });
        ShowModel();
      }
    }
    

    return (
    <>
      <div className='p-3'>

        <h2 className='text-center mt-3'>List of Movies</h2>
        <AddMovieModel showModel={showModel} isEditMode={isEdit} data={data} hideModel={hideModel}/>
        
        <div className='m-3 '>
          <div className='d-flex flex-row-reverse mb-3'>
            <button className='btn btn-primary' onClick={()=>{setIsEdit(false);ShowModel();}}>Add Movie</button>
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
                
                return(
                  <tr key={item.unique_id}>
                    <th colSpan="row">{intex+1}</th>
                    <td>{item.title} </td>
                    <td>{item.release_year.slice(0,4)}</td>
                    <td>{item.overview.length >= 100 ? item.overview.slice(0,100)+'...' :item.overview}</td>
                    <td className='d-flex'>
                      <button className='btn btn-primary m-1' style={{'padding': '2px 8px'}} onClick={()=>HandleEdit(item.unique_id)} > 
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                      <button className='btn btn-danger m-1'  style={{'padding': '2px 8px'}}   onClick={()=>HandleRemove(item.unique_id)}> 
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table></>
          }
          
        </div>
      </div>
      
    </>
    )
}
