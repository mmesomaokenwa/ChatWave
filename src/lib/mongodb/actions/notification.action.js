'use server'

import { connectToDatabase } from "@/lib"
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