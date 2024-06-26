'use server'

import { connectToDatabase, revalidate } from "@/lib"
import Chat from "../models/chat.model"
import { handleError } from "@/lib/utils"

export const createMessage = async ({ req, path }) => {
  try {
    await connectToDatabase()

    const newMessage = await Chat.create(req)

    if (!newMessage) throw new Error('Could not send message')

    const message = await Chat.findOne({ _id: newMessage._doc._id }).populate({
      path: 'sender receiver',
      select: 'name username profileImage'
    })

    revalidate(path)

    return JSON.parse(JSON.stringify(message._doc))
  } catch (err) {
    handleError(err)
  }
}

export const updateMessage = async (req) => {
  try {
    await connectToDatabase()

    let updatedMsg = await Chat.findOneAndUpdate({ _id: req._id }, req, {
      new: true, // return the new value after updating it
    })

    if (!updatedMsg) throw new Error('Could not update message')

    return JSON.parse(JSON.stringify(updatedMsg._doc))
  } catch (error) {
    handleError(error)
  }
}

export const deleteMessage = async ({ id, path }) => {
  try {
    await connectToDatabase();
    const result = await Chat.deleteOne({ _id: id });

    if (!result) throw new Error("Failed to delete message");

    revalidate(path)

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
};

export const getAllMessagesByUserID = async (id) => {
  try {
    await connectToDatabase()

    let messages = await Chat.find({ $or: [{ sender: id }, { receiver: id }] })
      .populate(["sender", "receiver"])
      .sort({ createdAt: -1 })    

    if (!messages) throw new Error('Messages not found')

    // arrange messages into groups by conversations
    const chatGroups = {}
    messages.forEach((message) => {
      const { sender, receiver } = message._doc
      let roomId;
      
      if (id === sender._id.toString()) {
        roomId = receiver._id.toString()
      } else {
        roomId = sender._id.toString()
      }
      if (!chatGroups[roomId]) {
        chatGroups[roomId] = []
      }
      chatGroups[roomId].push(message._doc)
    })

    // add isOwned property to each message indicating whether it was sent by the current user or not
    Object.values(chatGroups).map((group) => {
      group.forEach((message) => {
        if (message.sender._id.toString() === id) {
          message.isOwned = true
        } else {
          message.isOwned = false
        }
      })
    })

    return JSON.parse(JSON.stringify(chatGroups))
  } catch (error) {
    handleError(error)
  }
}

export const getMessagesByRoomId = async ({ roomId, userId }) => {
  try {
    await connectToDatabase()
    const result = await Chat.find({
      $or: [{
        $and: [
          { sender: userId },
          { receiver: roomId }
        ]
      }, {
        $and: [
          { sender: roomId },
          { receiver: userId }
        ]
    }] })
      .populate(["sender", "receiver"])
      .sort({ createdAt: -1 })
    
    if (!result) throw new Error('Messages not found')

    result.forEach((message) => {
      if (message._doc.sender._id.toString() === userId) {
        message._doc.isOwned = true
      } else {
        message._doc.isOwned = false
      }
    })

    return JSON.parse(JSON.stringify(result))
  } catch (err) {
    handleError(err)
  }
}

export const markAllMessagesRead = async ({ roomId, userId }) => {
  try {
    await connectToDatabase()

    const read = await Chat.updateMany({
      $and: [{sender: roomId}, {receiver: userId}]
    }, { isRead: true })
    
    return JSON.parse(JSON.stringify(read))
  } catch (error) {
    handleError(error)
  }
}