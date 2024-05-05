'use server'

import { connectToDatabase } from "@/lib"
import User from "../models/user.model"
import { handleError } from "@/lib/utils"
import { hash, compare } from 'bcrypt'
import { revalidatePath } from "next/cache"
import { createNotification } from "./notification.action"


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

    if (typeof path === "string") revalidatePath(path);
    else path.forEach((path) => revalidatePath(path));

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

    if (typeof path === "string") revalidatePath(path)
    else path.forEach((path) => revalidatePath(path))

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