import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  caption: {
    type: String,
  },
  media: [
    {
      type: {
        type: String,
        enum: ["image", "video"],
        default: "image",
      },
      url: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tags: {
    type: [String],
    default: [],
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  comments: {
    type: [
      {
        comment: {
          type: String,
        },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
  shares: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  saves: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  location: {
    type: String,
  },
});

const Post = models.Post || model('Post', postSchema);

export default Post;