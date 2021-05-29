const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
  },
  avatar: {
    type: String,
  },
  //not required so you can add them later
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      name: {
        type: String,
        // required: true
      },
      status: {
        type: String,
      },
      skills: {
        type: [String],
      },
      id: {
        type: String,
      },
    },
  ],
  projectName: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },

  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  tickets: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
      },
      ticketName: {
        type: String,
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
      },
      priority: {
        type: String,
      },
      comments: [
        {
          user: {
            type: Schema.Types.ObjectId,
          },
          text: {
            type: String,
            required: true,
          },
          name: {
            type: String,
          },
          avatar: {
            type: String,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("project", ProjectSchema);
