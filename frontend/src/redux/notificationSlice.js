import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    unreadCount: 0,
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
    markOneRead: (state, action) => {
      const id = action.payload;
      const notif = state.notifications.find((n) => n._id === id);
      if (notif && !notif.isRead) {
        notif.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllReadLocal: (state) => {
      state.notifications.forEach((n) => (n.isRead = true));
      state.unreadCount = 0;
    },
    removeNotification: (state, action) => {
      const id = action.payload;
      const notif = state.notifications.find((n) => n._id === id);
      if (notif && !notif.isRead) state.unreadCount = Math.max(0, state.unreadCount - 1);
      state.notifications = state.notifications.filter((n) => n._id !== id);
    },
  },
});

export const {
  setNotifications,
  setUnreadCount,
  markOneRead,
  markAllReadLocal,
  removeNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;