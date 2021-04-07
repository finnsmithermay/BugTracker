// import React,{useState} from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux';
// import {addProject} from '../../actions/project';


// const ProjectForm = ({ addProject }) => {
//      const [text, setText] = useState('');

//     return (
//         <div class="post-form">
//         <div class="bg-primary p">
//           <h3>Create project</h3>
//         </div>
//         <form class="form my-1" onSubmit={e => {
//             e.preventDefault();
//             addProject({text});
//             setText('');
//         }}>
//           <textarea
//             name="text"
//             cols="30"
//             rows="5"
//             placeholder="Create a project"
//             value={text}
//             onChange={e => setText(e.target.value)}
//             required
//           ></textarea>
//           <input type="submit" class="btn btn-dark my-1" value="Submit" />
//         </form>
//       </div>

//     )
// }

// ProjectForm.propTypes = {

// }

// export default connect(null, {addProject})(ProjectForm)
