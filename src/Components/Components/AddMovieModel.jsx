import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { handleFavourteMovies } from '../../function/AddmovieToFavourite';
import { toast } from 'react-toastify';

export default function AddmovieModel(props) {

  const initialValues = {
    title         : '',
    release_year  : '',
    overview      : ''
  };

  const onSubmit = values =>{
    handleFavourteMovies(values,true);
    toast.success("Movies Added to Favorite list!");
    handleHidePopUp();
  };

  const date = new Date();
  const currentYear  = date.getFullYear();
  const validationSchema = Yup.object({
    title         : Yup.string().required('Title is required').max(100),
    release_year  : Yup.number('Release Year must be in Number format').required('Release Year is required').positive("Year Must be a positive number").max(currentYear,`Release Year must be less than or equal to ${currentYear}`),
    overview      : Yup.string().required('Overview is required').max(255)
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })
  
  const handleHidePopUp = () =>{
    formik.resetForm();
    props.hideModel();
  }

  return (
    <>
      {props.showModel ? (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{background: '#57575782'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h5 className="modal-title">Modal Title</h5>
                <button type="button" className="close btn btn-outline-danger" onClick={handleHidePopUp} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className=''>

                  <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input type="text" className="form-control" id="title" name='title' onBlur={formik.handleBlur} value={formik.values.title} onChange={formik.handleChange}/>
                      {formik.touched.title && formik.errors.title ? (<span className='text-danger'>{formik.errors.title}</span>):null}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="release_year" className="form-label">Release Year</label>
                      <input type="text" className="form-control" id="release_year" name='release_year' onBlur={formik.handleBlur} value={formik.values.release_year} onChange={formik.handleChange} />
                      {formik.touched.release_year && formik.errors.release_year ? (<span className='text-danger'>{formik.errors.release_year}</span>): null}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Overview" className="form-label">Overview</label>
                      <textarea className="form-control" id="Overview" rows="3"  name='overview' onBlur={formik.handleBlur}  value={formik.values.overview} onChange={formik.handleChange}></textarea>
                      {formik.touched.overview && formik.errors.overview ? (<span className='text-danger'>{formik.errors.overview}</span>): null}
                    </div>
                    <div className="mb-3">
                      <button className='btn btn-primary' type='submit'>Submit</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>):null}
    </>
  )
}
