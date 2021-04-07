import {
    GET_PROJECTS,
    GET_PROJECT,
    REMOVE_PROJECT,
    PROJECT_ERROR,
    ADD_PROJECT,
    DELETE_PROJECT,
    REMOVE_MEMBER,
    ADD_MEMBER,
    CLEAR_MEMBERS,
    GET_MEMBERS,
    GET_TICKETS,
    ADD_TICKET,
    REMOVE_TICKET,
    GET_TICKET,
    ADD_TICKET_COMMENT
} from '../actions/types';


const initialState = {
    projects:[],
    project: null,
    loading: true,
    tickets:[],
    ticket: null,
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

            case GET_TICKET:
                return {
                    ...state, 
                    ticket: payload,
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


            case ADD_TICKET:
                    return{
                        ...state,
                        ticket:{...state.project, tickets: payload},
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
            case REMOVE_TICKET:
                return{
                        ...state,
                        project: {
                            ...state.project,
                            tickets: state.project.tickets.filter(ticket => ticket._id !== payload),
                            loading: false
    
                        }
                    };

                    case ADD_TICKET_COMMENT:
                        return{
                            ...state,
                            ticket:{...state.ticket, comments: payload},
                            loading: false
        
                        }



            case CLEAR_MEMBERS:
                return{
                    ...state,
                    project: null,
                    members: [],
                    loading: false
                };
            case GET_MEMBERS:
                    return{
                        ...state,
                        members:payload,
                        loading: false
                    };

            case GET_TICKETS:
                return{
                    ...state,
                    tickets:payload,
                    loading: false
                };

                case GET_TICKET:
                    return{
                        ...state,
                        ticket:payload,
                        loading: false
                    };
    

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