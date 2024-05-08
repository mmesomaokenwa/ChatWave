'use server'

import { connectToDatabase } from "@/lib"
import Post from "../models/post.model"
import User from "../models/user.model"
import { revalidatePath } from "next/cache"
import { handleError } from "@/lib/utils"
import Notification from "../models/notification.model"
import { createNotification, getNotificationById } from "./notification.action"

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

    const post = await Post.findById(id)
      .populate('creator', ['name', 'username', 'profileImage', '_id'])
      .populate('likes', ['name', 'username', 'profileImage', '_id', 'followers', 'following'])
      .populate('comments.user', ['name', 'username', 'profileImage', '_id', 'followers', 'following']);

    if (!post) throw new Error('Post not found')

    const relatedPosts = await Post.find({
      tags: { $in: post._doc.tags || [] },
    }).populate("creator", ["name", "username", "profileImage", "_id"]);

    return JSON.parse(JSON.stringify({ post: post._doc, relatedPosts }));
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

export const getInfiniteHomePosts = async({
  page = 1,
  limit = 10
}) => {
  try {
    await connectToDatabase()

    const startIndex = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: "desc" })
      .skip(startIndex)
      .limit(limit)
      .populate("creator", ["name", "username", "profileImage", "_id"]);
    
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    handleError(error)
  }
}

export const getInfiniteScrollPosts = async ({
  page = 1,
  limit = 10,
  timeline = 'view all'
}) => {
  try {
    await connectToDatabase();

    let posts, startDate, endDate;
    const startIndex = (page - 1) * limit;

    switch (timeline) {
      case "today":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0); // Start of today
        endDate = new Date();
        endDate.setHours(23, 59, 59, 999); // End of today
        break;
      case "yesterday":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 1); // Yesterday
        startDate.setHours(0, 0, 0, 0); // Start of yesterday
        endDate = new Date();
        endDate.setDate(endDate.getDate() - 1); // Yesterday
        endDate.setHours(23, 59, 59, 999); // End of yesterday
        break;
      case "last week":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7); // 7 days ago
        startDate.setHours(0, 0, 0, 0); // Start of 7 days ago
        endDate = new Date();
        endDate.setHours(23, 59, 59, 999); // End of today
        break;
      case "last month":
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1); // 1 month ago
        startDate.setHours(0, 0, 0, 0); // Start of 1 month ago
        endDate = new Date();
        endDate.setHours(23, 59, 59, 999); // End of today
        break;
      case "last year":
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1); // 1 year ago
        startDate.setHours(0, 0, 0, 0); // Start of 1 year ago
        endDate = new Date();
        endDate.setHours(23, 59, 59, 999); // End of today
        break;
      default:
        break
    }

    if (timeline === 'view all') {
      posts = await Post.find()
        .sort({ createdAt: 'desc' })
        .skip(startIndex)
        .limit(limit)
        .populate('creator', ['name', 'username', 'profileImage', '_id']);
    } else {
      posts = await Post.find({ createdAt: { $gte: startDate, $lte: endDate} })
        .sort({ createdAt: 'desc' })
        .skip(startIndex)
        .limit(limit)
        .populate('creator', ['name', 'username', 'profileImage', '_id']);
    }

    return JSON.parse(JSON.stringify(posts))
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export const getSavedPostsByUserId = async ({ userId }) => {
  try {
    await connectToDatabase()

    const user = await User.findOne({ _id: userId })
      .populate('savedPosts')

    return JSON.parse(JSON.stringify(user?._doc?.savedPosts?.reverse()));
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

export const getPostsByTags = async ({ tagsArray }) => {
  try {
    await connectToDatabase()

    const relatedPosts = await Post.find({ tags: { $in: tagsArray || [] } })
      .populate('creator', ['name', 'username', 'profileImage', '_id'])

    return relatedPosts
  } catch (error) {
    handleError(error)
  }
}

export const likePost = async ({ postId, userId, creatorId, liked, path }) => {
  try {
    await connectToDatabase()
    
    let likedPost;
    let notification;

    if (liked) {
      [likedPost, notification] = await Promise.all([
        Post.findOneAndUpdate(
          { _id: postId },
          { $addToSet: { likes: userId } },
          { new: true }
        ),
        createNotification({
          sender: userId,
          receiver: creatorId,
          type: "likePost",
          post: postId,
        })
      ]);
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

    return JSON.parse(JSON.stringify({
      likedPost,
      notification
    }))
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

export const commentPost = async ({ postId, userId, creatorId, comment, path }) => {
  try {
    await connectToDatabase()

    const [commentedPost, notification] = await Promise.all([
      Post.findOneAndUpdate(
        { _id: postId },
        { $addToSet: { comments: { comment, user: userId } } },
        { new: true }
      ),
      createNotification({
        sender: userId,
        receiver: creatorId,
        type: "commentPost",
        post: postId,
        comment
      })
    ]);

    if (!commentedPost) throw new Error('Post not found')

    if (typeof path === "string") revalidatePath(path)
    else path.forEach((path) => revalidatePath(path))

    return JSON.parse(
      JSON.stringify({
        comment: commentedPost.comments[commentedPost.comments.length - 1],
        notification
      })
    );
  } catch (error) {
    handleError(error)
  }
}

export const searchForPosts = async ({ query, tab }) => {
  if (!query) return
  try {
    await connectToDatabase()

    let queriedPosts;
      
    if (tab === 'captions') {
      queriedPosts = await Post.find({ caption: { $regex: query, $options: "i" } }).sort({ createdAt: "desc" })
    } else if (tab === 'tags') {
      queriedPosts = await Post.find({ tags: { $in: query } }).sort({ createdAt: "desc" })
    } else if (tab === 'locations') {
      queriedPosts = await Post.find({ location: { $regex: query, $options: "i" } }).sort({ createdAt: "desc" })
    }

    return JSON.parse(JSON.stringify(queriedPosts))
  } catch (error) {
    handleError(error)
  }
}