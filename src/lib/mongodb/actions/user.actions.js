'use server'

import { connectToDatabase } from "@/lib"
import User from "../models/user.model"
import { handleError } from "@/lib/utils"
import { hash, compare } from 'bcrypt'


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

export const updateUser = async (user) => {
  try {
    await connectToDatabase()

    const updatedUser = await User.findOneAndUpdate({ _id: user._id }, user, {
      new: true, // return the new value after updating it
    })

    if (!updatedUser) throw new Error('User update failed')

    const { password, ...others } = updatedUser._doc

    return JSON.parse(JSON.stringify(others))
  } catch (error) {
    handleError(error)
  }
}

// Get a single user by their ID. Private route.
export const getUserById = async (id) => {
  try {
    await connectToDatabase()

    const user = await User.findById(id)

    if (!user) throw new Error('User not found')
    
    user.populate(["followers", "following", "posts", "savedPosts"]);

    return JSON.parse(JSON.stringify(user._doc))
  } catch (error) {
    handleError(error)
  }
}