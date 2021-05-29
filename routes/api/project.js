const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator/check");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Project = require("../../models/Project");

//@route   Post api/posts
//@des     Test route
//@access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newProject = new Project({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        startDate: req.body.startDate,
        endDate: req.body.endDate,

        projectName: req.body.projectName,
      });

      const project = await newProject.save();
      //send as reponse
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error here");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 });

    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route   get api/posts/:id
//@des     get post by ID
//@access  Private

router.get("/:id", auth, async (req, res) => {
  try {
    //this will get all the posts and return them
    //in order of newest first, {date: 1} would get oldest first
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "project not found" });
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "project not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route   DELETE api/posts/:id
//@des     Delete a post
//@access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    //this will get all the posts and return them
    //in order of newest first, {date: 1} would get oldest first
    const post = await Project.findById(req.params.id);

    //check is post exists
    if (!post) {
      return res.status(404).json({ msg: "project not found" });
    }

    //check user matches the post user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();
    res.json({ msg: "project removed" });

    // res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error here");
  }
});

router.post(
  "/members/:id",
  [auth, [check("user", "Text is required").not().isEmpty()]],
  async (req, res) => {
    try {
      //const user = await User.findById(req.user.id).select('-password');
      const project = await Project.findById(req.params.id);

      const newMember = {
        name: req.body.profile.user.name,
        id: req.body.profile.user._id,
        avatar: req.body.profile.user.avatar,
        status: req.body.profile.status,
      };

      project.members.unshift(newMember);

      await project.save();
      //send as reponse
      res.json(project.members);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route   DELETE api/posts/comment/:id/:comment_id
//@des     Delete comment
//@acce     private

router.delete("/members/:id/:member_id", auth, async (req, res) => {
  try {
    //get post by id
    const project = await Project.findById(req.params.id);

    //pull out comment from post
    const member = project.members.find(
      (member) => member.id === req.params.member_id
    );

    //make sure comment exists
    if (!member) {
      return res.status(404).json({ msg: "member does not exist" });
    }

    const removeIndex = project.members
      .map((member) => member.id.toString())
      .indexOf(member.id);

    project.members.splice(removeIndex, 1);
    await project.save();

    res.json(project.members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route   Post api/posts/comment/:id
//@des     comment on a post
//@access  Private
router.post(
  "/tickets/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const project = await Project.findById(req.params.id);

      const newTicket = {
        text: req.body.text,
        ticketName: req.body.name,
        name: user.name,
        date: req.body.date,
        user: req.user.id,
        status: req.body.status,
        priority: req.body.priority,
      };

      project.tickets.unshift(newTicket);

      await project.save();
      //send as reponse
      res.json(project.tickets);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

    //get the users wtthout returning the users password
  }
);

router.delete("/tickets/:id/:ticket_id", auth, async (req, res) => {
  try {
    //get post by id
    const project = await Project.findById(req.params.id);

    //pull out comment from post
    const ticket = project.tickets.find(
      (ticket) => ticket.id === req.params.ticket_id
    );

    //make sure comment exists
    if (!ticket) {
      return res.status(404).json({ msg: "Ticket does not exist" });
    }
    //make sure user deleting the comment is the user that made it
    // if(comment.user.toString() !== req.user.id){
    //     return res.status(401).json({msg: 'User not authorized'});
    // }
    const removeIndex = project.tickets
      .map((ticket) => ticket.user.toString())
      .indexOf(req.user.id);

    project.tickets.splice(removeIndex, 1);
    await project.save();

    res.json(project.tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error Delete ticket");
  }
});

router.get("/tickets/:id/:ticket_id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    const ticket = project.tickets.find(
      (ticket) => ticket.id === req.params.ticket_id
    );

    if (!ticket) {
      return res.status(404).json({ msg: "ticket not found" });
    }

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "project not found" });
    }
    res.status(500).send("Server Error");
  }
});

router.put("/tickets/:id/:ticket_id", auth, async (req, res) => {
  try {
    // destructure the request
    const { text, name, date, status, priority } = req.body;

    const tick = { text, name, date, status };
    if (text) tick.text = text;
    if (name) tick.name = name;
    if (date) tick.date = date;
    if (status) tick.status = status;
    if (priority) tick.priority = priority;

    //get post by id
    const project = await Project.findById(req.params.id);

    //pull out comment from post
    const ticket = project.tickets.find(
      (ticket) => ticket.id === req.params.ticket_id
    );
    const updateIndex = project.tickets
      .map((ticket) => ticket.id)
      .indexOf(req.params.ticket_id);

    //make sure comment exists
    console.log("*****************************");
    console.log(updateIndex);
    if (req.body.text) project.tickets[updateIndex].text = req.body.text;
    if (req.body.name) project.tickets[updateIndex].name = req.body.name;
    if (req.body.status) project.tickets[updateIndex].status = req.body.status;
    if (req.body.priority)
      project.tickets[updateIndex].priority = req.body.priority;

    await project.save();

    res.json(project.tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error edit ticket");
  }
});

//update project
router.put("/:id", auth, async (req, res) => {
  try {
    // destructure the request
    const { projectName, startDate, endDate, text } = req.body;

    const tick = { projectName, startDate, endDate, text };
    if (text) tick.text = text;
    if (projectName) tick.projectName = projectName;
    if (startDate) tick.startDate = startDate;
    if (endDate) tick.endDate = endDate;
    if (text) tick.text = text;

    const project = await Project.findById(req.params.id);

    if (req.body.projectName) project.projectName = req.body.projectName;
    if (req.body.startDate) project.startDate = req.body.startDate;
    if (req.body.endDate) project.endDate = req.body.endDate;
    if (req.body.text) project.text = req.body.text;

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    // res.status(500).send("Server Error edit project");
  }
});

//add comment to ticket
//@route   Post api/posts/comment/:id
//@des     comment on a post
//@access  Private
router.post(
  "/tickets/comment/:id/:ticket_id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const project = await Project.findById(req.params.id);
      const ticket = project.tickets.find(
        (ticket) => ticket.id === req.params.ticket_id
      );

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      ticket.comments.unshift(newComment);

      await project.save();
      //send as reponse
      res.json(ticket.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error, ticket comment");
    }

    //get the users wtthout returning the users password
  }
);

//get comments from ticket

//delete comment from ticket

module.exports = router;
