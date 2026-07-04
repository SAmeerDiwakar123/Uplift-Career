import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setNotifications, setUnreadCount } from "@/redux/notificationSlice";
import { NOTIFICATION_API_END_POINT } from "@/utils/constant";

const useGetNotifications = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${NOTIFICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setNotifications(res.data.notifications));
          dispatch(setUnreadCount(res.data.unreadCount));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, []);
};

export default useGetNotifications;