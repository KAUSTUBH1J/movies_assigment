import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage ,FormikProps} from 'formik';
import * as Yup from 'yup';
import { handleFavourteMovies, UpdateFavourteMovie } from '../../function/AddmovieToFavourite';
import { toast } from 'react-toastify';



export default function AddmovieModel({showModel, isEditMode, data, hideModel}) {
  
  const initialValues = isEditMode?data:{
    title         : '',
    release_year  : '',
    overview      : ''
  };
    
  const onSubmit = values =>{
    if(isEditMode){
      console.log(values);
      const respone = UpdateFavourteMovie(values.unique_id, values);
      respone.code === 200 ? toast.success(respone.message) : toast.error(respone.message); 

    }else{
      handleFavourteMovies(values,true);
      toast.success("Movies Added to Favorite list!");
    }
    handleHidePopUp();
  };

  const date = new Date();
  const currentYear  = date.getFullYear();
  const validationSchema = Yup.object({
    title         : Yup.string().required('Title is required').max(100),
    release_year  : Yup.number('Release Year must be in Number format').required('Release Year is required').positive("Year Must be a positive number").max(currentYear,`Release Year must be less than or equal to ${currentYear}`),
    overview      : Yup.string().required('Overview is required').max(255)
  });


  const handleHidePopUp = () =>{
    // formik.resetForm();
    hideModel();
  }  
  
  return (
    <>
      {showModel ? (
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
                <Formik className='' initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                  <Form>

                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <Field type="text" className="form-control" id="title" name='title'/>
                      <ErrorMessage name='title'>
                        {
                          ErrorMessage => <div className='text-danger'> {ErrorMessage}</div>
                        }
                      </ErrorMessage>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="Overview" className="form-label">Overview</label>
                      <Field name='overview'>
                        {
                          (props) =>{
                            // const {feild,  meta} = props;
                            const { field, form, label, meta } = props;
                            // console.log(props);
                            return(
                              <>
                                <textarea id='Overview' rows="3" className="form-control"  {...field}></textarea>
                                {meta.touched && meta.error ? <div className='text-danger'>{meta.error}</div>:null}
                              </>
                            )
                          }
                        }
                      </Field>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="release_year" className="form-label">Release Year</label>
                      <Field type="text" className="form-control" id="release_year" name='release_year' />  
                      <ErrorMessage name='release_year'>
                        {
                          ErrorMessage => <div className='text-danger'> {ErrorMessage}</div>
                        }
                      </ErrorMessage>
                    </div>
                    
                    <div className="mb-3">
                      <button className='btn btn-primary' type='submit'>Submit</button>
                    </div>
                  </Form>

                </Formik>
              </div>
            </div>
          </div>
        </div>):null}
    </>
  )
}
