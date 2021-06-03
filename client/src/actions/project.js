import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROJECTS,
  GET_PROJECT,
  REMOVE_PROJECT,
  PROJECT_ERROR,
  ADD_PROJECT,
  DELETE_PROJECT,
  ADD_MEMBER,
  REMOVE_MEMBER,
  CLEAR_MEMBERS,
  GET_MEMBERS,
  GET_TICKETS,
  ADD_TICKET,
  REMOVE_TICKET,
  EDIT_TICKET,
  GET_TICKET,
  ADD_TICKET_COMMENT,
  REMOVE_TICKET_COMMENT,
} from "./types";

//get projects
export const getProjects = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/project");

    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: "error getProjects", status: "error getProjects" },
    });
  }
};
//Delete project
export const deleteProject = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/project/${id}`);

    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    });

    dispatch(setAlert("Project Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get projects by id
export const getProject = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/project/${id}`);

    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get projects by id
export const getTicket = (id, tickId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/project/tickets/${id}/${tickId}`);

    dispatch({
      type: GET_TICKET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: "nope" },
    });
  }
};

//add project
export const addProject = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/project/`, formData, config);

    dispatch({
      type: ADD_PROJECT,
      payload: res.data,
    });

    dispatch(setAlert("Project Created", "success"));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add member
export const addMember = (pId, data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/project/members/${pId}`, data, config);

    dispatch({
      type: ADD_MEMBER,
      payload: res.data,
    });

    dispatch(setAlert("member added", "success"));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//remove member
export const removeMember = (pId, memberId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/project/members/${pId}/${memberId}`);

    dispatch({
      type: REMOVE_MEMBER,
      payload: memberId,
    });

    dispatch(setAlert("member removed", "success"));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get all members
export const getMembers = () => async (dispatch) => {
  //Brad says this should revent the flashing of the past users profile?
  dispatch({ type: CLEAR_MEMBERS });

  try {
    const res = await axios.get("/api/project/members");
    dispatch({
      type: GET_MEMBERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getTickets = () => async (dispatch) => {
  dispatch({ type: CLEAR_MEMBERS });

  try {
    const res = await axios.get("/api/project/tickets");
    dispatch({
      type: GET_TICKETS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addTicket = (pId, data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/project/tickets/${pId}`, data, config);

    dispatch({
      type: ADD_TICKET,
      payload: res.data,
    });

    dispatch(setAlert("ticket added", "success"));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//remove ticket
export const removeTicket = (pId, ticketId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/project/tickets/${pId}/${ticketId}`);

    dispatch({
      type: REMOVE_TICKET,
      payload: ticketId,
    });

    dispatch(setAlert("Ticket removed", "success"));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editTicket = (pId, ticketId, data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `/api/project/tickets/${pId}/${ticketId}`,
      data,
      config
    );

    dispatch({
      type: EDIT_TICKET,
      payload: res.data,
    });

    dispatch(setAlert("ticket updated", "success"));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editProject = (pId, data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(`/api/project/${pId}`, data, config);
    dispatch(setAlert("Project updated", "success"));

    dispatch({
      // type: EDIT_PROJECT,
      payload: res.data,
    });

    dispatch(setAlert("Project updated", "success"));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      // payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//addComment
export const addComment = (postId, ticketId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/project/tickets/comment/${postId}/${ticketId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_TICKET_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert("Comment added", "success"));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// remove Comment
export const deleteTicketComment =
  (projectID, ticketID, commentId) => async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/project/tickets/comment/${projectID}/${ticketID}/${commentId}`
      );

      dispatch({
        type: REMOVE_TICKET_COMMENT,
        payload: commentId,
      });

      dispatch(setAlert("Comment removed", "success"));
    } catch (err) {
      console.log("deleteTicketComment error");
      dispatch({
        type: PROJECT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
