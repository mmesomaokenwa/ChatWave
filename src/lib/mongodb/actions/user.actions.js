'use server'

import { connectToDatabase, revalidate } from "@/lib"
import User from "../models/user.model"
import { handleError } from "@/lib/utils"
import { hash, compare } from 'bcrypt'
import { createNotification } from "./notification.action"
import Chat from "../models/chat.model"


export const createUser = async (user) => {
  try {
    await connectToDatabase()

    const emailAlreadyExists = await User.findOne({ email: user.email })

    if (emailAlreadyExists) throw new Error('Email already exists')

    const usernameAlreadyExists = await User.findOne({ username: user.username })
    
    if (usernameAlreadyExists) throw new Error('Username already exists')

    const hashedPassword = await hash(user.password, 10)

    const newUser = await User.create({
      ...user,
      password: hashedPassword
    });

    const { password, ...others } = newUser._doc
    
    return JSON.parse(JSON.stringify(others))
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const loginUser = async (user) => {
  try {
    await connectToDatabase()

    const foundUser = await User.findOne({ email: user.email })

    if(!foundUser) throw new Error('User not found')

    const isValid = await compare(user.password, foundUser.password)

    if (!isValid) throw new Error('Invalid password')

    const { password, ...others } = foundUser._doc

    return JSON.parse(JSON.stringify(others))
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateUser = async ({ user, path }) => {
  try {
    await connectToDatabase()

    const updatedUser = await User.findOneAndUpdate({ _id: user._id }, user, {
      new: true, // return the new value after updating it
    })

    if (!updatedUser) throw new Error('User update failed')

    const { password, ...others } = updatedUser._doc

    revalidate(path)

    return JSON.parse(JSON.stringify(others))
  } catch (error) {
    handleError(error)
  }
}

export const followUser = async ({ userId, currentUserId, isFollowed, path }) => {
  try {
    await connectToDatabase()

    let updatedUser;
    let currentUser;
    let notification;

    if (isFollowed) {
      [updatedUser, currentUser, notification] = await Promise.all([
        User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { followers: currentUserId } },
          { new: true }
        ),
        User.findOneAndUpdate(
          { _id: currentUserId },
          { $addToSet: { following: userId } },
          { new: true }
        ),
        createNotification({
          sender: currentUserId,
          receiver: userId,
          type: "follow",
        }),
      ]);
    } else {
      [updatedUser, currentUser] = await Promise.all([
        User.findOneAndUpdate(
        { _id: userId },
        { $pull: { followers: currentUserId } },
        { new: true }
        ),
        User.findOneAndUpdate(
          { _id: currentUserId },
          { $pull: { following: userId } },
          { new: true }
        )
      ])
    }

    if (!updatedUser) throw new Error('User not found')

    revalidate(path)

    return JSON.parse(JSON.stringify({
      updatedUser,
      currentUser,
      notification
    }))
  } catch (error) {
    handleError(error)
  }
}

// Get a single user by their ID. Private route.
export const getUserById = async (id) => {
  try {
    await connectToDatabase()

    const user = await User.findById(id).populate([
      "followers",
      "following",
      "posts",
      "savedPosts",
    ]);

    if (!user) throw new Error('User not found')

    const { password, ...others } = user._doc

    return JSON.parse(JSON.stringify(others))
  } catch (error) {
    handleError(error)
  }
}

export const searchForUsers = async (query) => {
  if (!query) return
  try {
    await connectToDatabase()

    const queriedUsers = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ]
    })

    if (!queriedUsers) throw new Error('User not found')

    return queriedUsers.map((u) => JSON.parse(JSON.stringify(u._doc)))
  } catch (error) {
    handleError(error)
  }
}

export const getMostMessagedUsers = async ({ userId, limit }) => {
  try {
    await connectToDatabase()
    // Get the current user's messages
    const messages = await Chat.find({ $or: [{ sender: userId }, { receiver: userId }] })
      .populate({
        path: 'sender receiver',
        select: 'name username profileImage _id'
      })

    if (!messages) throw new Error('Messages not found')

    // Group the messages
    const groupedMessages = {};
    messages.forEach(({ sender, receiver, message }) => {
      let room;

      if (userId === sender._id.toString()) {
        room = receiver;
      } else {
        room = sender;
      }
      if (!groupedMessages[room?._id]) {
        groupedMessages[room?._id] = {...room?._doc, messages: []};
      }
      groupedMessages[room?._id].messages.push(message);
    });

    // Sort the grouped messages by number of messages in descending order
    const sortedMessages = Object.entries(groupedMessages).sort((a, b) => b[1].messages?.length - a[1].messages?.length)
    // console.log({sortedMessages})

    // Return the top `limit` users
    return sortedMessages.slice(0, limit).map(([id, user]) => JSON.parse(JSON.stringify(user)))
  } catch (error) {
    handleError(error)
  }
}