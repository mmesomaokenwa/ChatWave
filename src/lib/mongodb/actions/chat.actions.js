'use server'

import { connectToDatabase } from "@/lib"
import Chat from "../models/chat.model"

export const createMessage = async (req) => {
  try {
    await connectToDatabase()

    const newMessage = await Chat.create(req)

    if (!newMessage) throw new Error('Could not send message')

    return JSON.parse(JSON.stringify(newMessage._doc))
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

export const deleteMessage = async (id) => {
  try {
    await connectToDatabase();
    const result = await Chat.deleteOne({ _id: id });

    if (!result) throw new Error("Failed to delete message");

    return JSON.parse(JSON.stringify(result._doc));
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

    // arrange messages into groups by roomId
    const chatGroups = {}
    messages.forEach((message) => {
      const { roomId } = message._doc
      if (!chatGroups[roomId]) {
        chatGroups[roomId] = []
      }
      chatGroups[roomId].push(message._doc)
    })

    // add isOwned property to each message indicating whether it was sent by the current user or not
    Object.values(chatGroups).map((group) => {
      group.forEach((message) => {
        if (message.sender._id === id) {
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

export const getMessagesByRoomId = async (roomId, userId) => {
  try {
    await connectToDatabase()
    const result = await Chat.find({ roomId })
      .populate(["sender", "receiver"])
      .sort({ createdAt: -1 })
    
    if (!result) throw new Error('Messages not found')

    result.forEach((message) => {
      if (message._doc.sender._id === userId) {
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