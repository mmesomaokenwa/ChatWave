import { Schema, model, models } from "mongoose"


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  bio: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  followers: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  following: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  posts: {
    type: [Schema.Types.ObjectId],
    ref: 'Post',
    default: []
  },
  savedPosts: {
    type: [Schema.Types.ObjectId],
    ref: 'Post',
    default: []
  }
})

const User = models.User || model('User', userSchema)

export default User