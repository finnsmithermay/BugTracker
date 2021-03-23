import axios from 'axios';
import {setAlert} from './alert';
import{
    GET_PROJECTS,
    GET_PROJECT,
    REMOVE_PROJECT,
    PROJECT_ERROR,
    ADD_PROJECT,
    DELETE_PROJECT,
    ADD_MEMBER
}from './types';

//get projects 
export const getProjects = () => async dispatch => {
    try{
        const res = await axios.get('/api/project');

        dispatch({
            type: GET_PROJECTS,
            payload: res.data
        });
    }catch (err){
        dispatch({
            type: PROJECT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
        }
    };
    //Delete project 
    export const deleteProject = id => async dispatch => {

        
        try{
            await axios.delete(`/api/project/${id}`);
    
            dispatch({
                type: DELETE_PROJECT,
                payload:  id
            });
    
            dispatch(setAlert('Project Removed', 'success'));
    
        }catch (err){
            dispatch({
                type: PROJECT_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
              });
            }
        };



//get projects by id 
export const getProject = id => async dispatch => {
    try{
        const res = await axios.get(`/api/project/${id}`);

        dispatch({
            type: GET_PROJECT,
            payload: res.data
        });
    }catch (err){
        dispatch({
            type: PROJECT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
        }
    };


//add project
export const addProject = formData => async dispatch => {

    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    try{
       const res = await axios.post(`/api/project/`, formData, config);

        dispatch({
            type: ADD_PROJECT,
            payload:  res.data
        });

        dispatch(setAlert('Project Created', 'success'));

    }catch (err){
        dispatch({
            type: PROJECT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
        }
    };

            //add member 
    export const addMember = (pId, id) => async dispatch => {

        const config = {
                headers: {
                    'Content-Type' : 'application/json'
                }
            };
            try{
                const res = await axios.post(`/api/project/members/${pId}`, id, config);
        

                dispatch({
                    type: ADD_MEMBER,
                    payload:  res.data
                });
        
                dispatch(setAlert('member added', 'success'));
        
            }catch (err){
                dispatch({
                    type: PROJECT_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status }
                    });
                }
            };