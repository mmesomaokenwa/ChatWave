'use server'

import { connectToDatabase, revalidate } from "@/lib"
import Notification from "../models/notification.model"
import { handleError } from "@/lib/utils"

export const createNotification = async (data) => {
  try {
    await connectToDatabase()
    const notification = await Notification.create(data);
    return JSON.parse(JSON.stringify(notification));
  } catch (error) {
    handleError(error);
  }
}

export const getNotifications = async (userId) => {
  try {
    await connectToDatabase()
    const notifications = await Notification.find({ receiver: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'sender',
        select: 'name username profileImage followers _id'
      })
      .populate({
        path: 'post',
        select: 'caption media _id'
      })
    return JSON.parse(JSON.stringify(notifications));
  } catch (error) {
    handleError(error);
  }
}

export const deleteNotification = async (id) => {
  try {
    await connectToDatabase();
    const deletedNotification = await Notification.deleteOne({ _id: id });

    return JSON.parse(JSON.stringify(deletedNotification));
  } catch (error) {
    handleError(error);
  }
}

export const getNotificationById = async (id) => {
  try {
    await connectToDatabase();
    const notification = await Notification.findById(id)
      .populate({
      path: 'sender',
      select: 'username name profileImage'
      })
      .populate({
        path: 'post',
      })
    return JSON.parse(JSON.stringify(notification));
  } catch (error) {
    handleError(error);
  }
}

export const markAllNotificationsSeen = async (id) => {
  try {
    await connectToDatabase()

    const seen = await Notification.updateMany({ receiver: id }, { seen: true })

    return JSON.parse(JSON.stringify(seen))
  } catch (error) {
    handleError(error)
  }
}