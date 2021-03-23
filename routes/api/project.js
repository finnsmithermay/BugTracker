const express = require('express');
const router = express.Router();
const {check, validationResult, body} = require('express-validator/check');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Project = require('../../models/Project');

//@route   Post api/posts
//@des     Test route 
//@access  Private
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()

]],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }


    try {
        const user = await User.findById(req.user.id).select('-password');

      const newProject = new Project({
          text: req.body.text,
          name: user.name,
          user: req.user.id,
          startDate: req.body.startDate,
          endDate: req.body.endDate,

          projectName: req.body.projectName
      });

      const project = await newProject.save();
      //send as reponse
      res.json(project);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error here');
    }
    
});

router.get('/', auth, async (req, res)=>{
    try {

        const projects = await Project.find().sort({date: -1});
        
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route   get api/posts/:id
//@des     get post by ID
//@access  Private

router.get('/:id', auth, async (req, res)=>{
    try {

        //this will get all the posts and return them 
        //in order of newest first, {date: 1} would get oldest first
        const project = await Project.findById(req.params.id);
        
    if(!project){
        return res.status(404).json({msg: 'project not found'});
    }

        res.json(project);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'project not found'});
        }
        res.status(500).send('Server Error');
    }
});


//@route   DELETE api/posts/:id
//@des     Delete a post
//@access  Private

router.delete('/:id', auth, async (req, res)=>{
    try {

        //this will get all the posts and return them 
        //in order of newest first, {date: 1} would get oldest first
        const post = await Project.findById(req.params.id);
        
        //check is post exists
        if(!post){
            return res.status(404).json({msg: 'project not found'});
        }

        //check user matches the post user
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized'});
        }

        await post.remove();
        res.json({msg: 'project removed'});

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'project not found'});
        }
        res.status(500).send('Server Error here');
    }
});



router.post('/members/:id', [auth, [
    check('user', 'Text is required').not().isEmpty()

]],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }


    try {
        //const user = await User.findById(req.user.id).select('-password');
        const project = await Project.findById(req.params.id);


      const newMember = {
          
          user: req.body.user
      };

      project.members.unshift(newMember);

       await project.save();
      //send as reponse
      res.json(project.members);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
});


module.exports = router;