const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({

  

  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
  },
  avatar: {
    type: String
  },
  //not required so you can add them later
  members: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
    
    }
  ],
  projectName: {
    type: String,
    required: true


  },

  startDate: {
    type: Date,
  },
  endDate: {
    type: Date
  },

  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  tickets: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('project', ProjectSchema); 