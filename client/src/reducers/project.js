import {
    GET_PROJECTS,
    GET_PROJECT,
    REMOVE_PROJECT,
    PROJECT_ERROR,
    ADD_PROJECT,
    DELETE_PROJECT,
    REMOVE_MEMBER,
    ADD_MEMBER
} from '../actions/types';


const initialState = {
    projects:[],
    project: null,
    loading: true,
    error:{},
};

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_PROJECTS:
            return {
                ...state, 
                projects: payload,
                loading: false
            };

            case GET_PROJECT:
            return {
                ...state, 
                project: payload,
                loading: false
            };

        case ADD_PROJECT:
            return{
                ...state,
                projects: [payload, ...state.projects],
                loading: false
            };
            case DELETE_PROJECT:
                return{
                    ...state,
                    projects: state.projects.filter(project => project._id !== payload),
                    loading: false
                };
                case ADD_MEMBER:
                    return{
                        ...state,
                        post:{...state.project, members: payload},
                        loading: false
    
                    }
                case REMOVE_MEMBER:
                     return{
                            ...state,
                            project: {
                                ...state.project,
                                members: state.project.members.filter(member => member._id !== payload),
                                loading: false
        
                            }
                        }
        
        
        case PROJECT_ERROR:
            return {
                ...state, 
                error: payload,
                loading: false
            };
     

            default:
               return state;

    }
} 