import { Schema, model, models } from "mongoose";

const notificationSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['likePost', 'commentPost', 'follow'],
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  seen: {
    type: Boolean,
    default: false
  }
})

const Notification = models.Notification || model('Notification', notificationSchema);

export default Notification