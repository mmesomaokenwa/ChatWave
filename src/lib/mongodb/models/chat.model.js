import { Schema, model, models } from "mongoose";

const chatSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  roomId: {
    type: String,
    required: true
  }
})

const Chat = models.Chat || model('Chat', chatSchema);
export default Chat;