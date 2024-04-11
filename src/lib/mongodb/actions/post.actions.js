'use server'

import { connectToDatabase } from "@/lib"
import Post from "../models/post.model"
import User from "../models/user.model"
import { revalidatePath } from "next/cache"
import { handleError } from "@/lib/utils"

export const createPost = async ({ post, creatorId, path }) => {
  try {
    await connectToDatabase()

    const creator = await User.findById(creatorId)

    if (!creator) throw new Error('Creator not found')

    const newPost = await Post.create({
      ...post,
      creator: creatorId
    })

    if (typeof path === "string") revalidatePath(path)
    else path.forEach((path) => revalidatePath(path))

    return JSON.parse(JSON.stringify(newPost._doc))
  } catch (err) {
    handleError(err)
  }
}

export const updatePost = async ({post, userId, path}) => {
  try {
    await connectToDatabase()

    const postToUpdate = await Post.findById(post._id)

    if (!postToUpdate || postToUpdate.creator.toHexString() !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: post._id },
      {
        ...post,
        $set: {
          updatedAt: new Date(),
        },
      },
      {
      new: true, // return the new value after updating it
    })

    if (!updatedPost) throw new Error('Post update failed')

    if (typeof path === "string") revalidatePath(path);
    else path.forEach((path) => revalidatePath(path));
    
    return JSON.parse(JSON.stringify(updatedPost._doc))
  } catch (error) {
    handleError(error)
  }
}

export const getPostById = async (id) => {
  try {
    await connectToDatabase()

    const post = await Post.findById(id).populate('creator')

    if (!post) throw new Error('Post not found')

    return JSON.parse(JSON.stringify(post._doc))
  } catch (err) {
    handleError(err)
  }
}

export const deletePost = async (id) => {
  try {
    await connectToDatabase()

    const deletedPost = await Post.findByIdAndDelete(id)

    if (!deletedPost) throw new Error('Post not found')

    return JSON.parse(JSON.stringify(deletedPost._doc))
  } catch (err) {
    handleError(err)
  }
}

export const getAllPosts = async ({
  page = 1,
  limit = 10,
}) => {
  try {
    await connectToDatabase()

    const startIndex = (page - 1) * limit;
    const totalPosts = await Post.countDocuments({});

    const posts = await Post.find()
      .skip(startIndex)
      .limit(limit)
      .sort([['createdAt', 'desc']])
      .populate('creator', ['name', 'username', 'profileImage', '_id']);

    return {
      posts,
      totalPosts,
    };
  } catch (err) {
    handleError(err)
  }
};

export const getSavedPostsByUserId = async ({ userId }) => {
  try {
    await connectToDatabase()

    return User.findOne({ _id: userId }).populate('savedPosts')  
      .then((user) => { return user?._doc.savedPosts.populate('creator', ['name', 'username', 'profileImage', '_id']) || [] })
  } catch (error) {
    handleError(error)
  }
}

export const getPostsByUserId = async ({ userId }) => {
  try {
    await connectToDatabase()

    return User.findOne({ _id: userId }).populate('posts')
      .then((user) => { return user?._doc.posts.populate('creator', ['name', 'username', 'profileImage', '_id']) || [] })
  } catch (error) {
    handleError(error)
  }
}
