// hooks/useGetCourseById.js
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { COURSE_API_END_POINT } from "@/utils/constant";

const useGetCourseById = (id, setIsEnrolled) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${COURSE_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setCourse(res.data.course);
          setIsEnrolled(res.data.isEnrolled);
        }
      } catch (error) {
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  return { course, loading };
};

export default useGetCourseById;