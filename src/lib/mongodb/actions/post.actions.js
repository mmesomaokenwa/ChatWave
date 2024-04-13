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

    creator.posts.push(newPost?._id);
    await creator.save();

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

export const getAllPosts = async () => {
  try {
    await connectToDatabase()

    const posts = await Post.find()
      .sort({ createdAt: 'desc' })
      .populate('creator', ['name', 'username', 'profileImage', '_id']);
    return posts?.map((p) => JSON.parse(JSON.stringify(p._doc)));
  } catch (err) {
    handleError(err)
  }
}

export const getInfiniteScrollPosts = async ({
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
    console.error(err);
    throw new Error(err);
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

export const likePost = async ({ postId, userId, liked, path }) => {
  try {
    await connectToDatabase()
    
    let likedPost;

    if (liked) {
      likedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $addToSet: { likes: userId } },
        { new: true }
      )
    } else {
      likedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } },
        { new: true }
      )
    }

    if (!likedPost) throw new Error('Post not found')

    if (typeof path === "string") revalidatePath(path)
    else path.forEach((path) => revalidatePath(path))

    return JSON.parse(JSON.stringify(likedPost))
  } catch (error) {
    handleError(error)
  }
}

export const savePost = async ({ postId, userId, path }) => {
  try {
    await connectToDatabase()

    const savedPost = await Post.findOne({ _id: postId })
    const user = await User.findOne({ _id: userId })

    if (!savedPost || !user) throw new Error("Post or user not found");

    console.log(user.savedPosts.includes(postId));
    console.log(savedPost.saves.includes(userId));

    if (user.savedPosts.includes(postId)) {
      user.savedPosts = user.savedPosts.filter((id) => id.toString() !== postId.toString())
    } else {
      user.savedPosts.push(postId)
    }

    if (!savedPost.saves.includes(userId)) {
      savedPost.saves.push(userId)
    } else {
      savedPost.saves = savedPost.saves.filter((id) => id.toString() !== userId.toString())
    }
    await Promise.all([user.save(), savedPost.save()])

    if (typeof path === "string") revalidatePath(path)
    else path.map((p) => revalidatePath(p))

    return { 
      user: JSON.parse(JSON.stringify(user._doc)), 
      post: JSON.parse(JSON.stringify(savedPost._doc))
     }
  } catch (error) {
    handleError(error)
  }
}

export const commentPost = async ({ postId, userId, comment, path }) => {
  try {
    await connectToDatabase()

    const commentedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $addToSet: { comments: { comment, user: userId } } },
      { new: true }
    )

    if (!commentedPost) throw new Error('Post not found')

    if (typeof path === "string") revalidatePath(path)
    else path.forEach((path) => revalidatePath(path))

    return JSON.parse(JSON.stringify(commentedPost.comments[commentedPost.comments.length - 1]))
  } catch (error) {
    handleError(error)
  }
}