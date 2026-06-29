import { Notification } from "../models/NotificationModel.js";

// Get My Notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.id })
      .sort({ createdAt: -1 })
      .limit(20);

    const unreadCount = await Notification.countDocuments({
      user: req.id,
      isRead: false,
    });

    return res.status(200).json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};

// Mark as Read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { isRead: true });

    return res.status(200).json({
      success: true,
      message: "Marked as read",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};

// Mark All as Read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.id, isRead: false },
      { isRead: true }
    );

    return res.status(200).json({
      success: true,
      message: "All marked as read",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};

// Delete Notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};