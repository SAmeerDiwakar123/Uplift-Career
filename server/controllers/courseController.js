import { Course } from "../models/CourseModel.js";
import { Enrollment } from "../models/EnrolledModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js"; 



const createCourse = async (req, res) => {
  try {
    const { title, description, price, category, level } = req.body;

    if (!title || !description || !price || !category || !level) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const course = await Course.create({
      title,
      description,
      price,
      category,
      level,
      instructor: req.id,  // Teacher id 
    });
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });

  }
}


const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate("instructor", "fullname email").sort({ createdAt: -1 });

    return res.status(200).json({ success: true, courses })
  } catch (error) {
    console.log("Course here " + error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    })
  }
}

const getCourseById = async (req, res) => {
  try {
    const { id: courseId } = req.params;

    const course = await Course.findById(courseId).populate(
      "instructor",
      "fullname email"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    const userId = req.id;
    let isEnrolled = false;

    if (userId) {
      const enrollment = await Enrollment.findOne({
        user: userId,
        course: courseId,
        status: "active",
      });
      isEnrolled = !!enrollment;   //true/false
    }

    // for Free
    let lessons = course.lessons;
    if (!isEnrolled) {
      lessons = course.lessons.filter((lesson) => lesson.isFreePreview);
    }

    return res.status(200).json({
      success: true,
      course: {
        ...course._doc,
        lessons,
      },
      isEnrolled,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch course",
    });
  }
}

const updateCourse = async (req, res) => {
  try {
    const { id: courseId } = req.params;
    const { title, description, price, category, level, isPublished } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }
    if (course.instructor.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this course",
      });
    }

    if (title) course.title = title;
    if (description) course.description = description;
    if (price) course.price = title;
    if (category) course.category = category;
    if (level) course.level = level;
    if (isPublished !== undefined) course.isPublished = isPublished;

    await course.save();
    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update course",
    });
  }
}

const deleteCourse = async (req, res) => {
  try {
    const { id: courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this course",
      });
    }

    const enrolledCount = await Enrollment.countDocuments({
      course: courseId,
      status: "active",
    });

    if (enrolledCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete. ${enrolledCount} students are enrolled in this course.`,
      });
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
    });
  }
};

const addLesson = async (req, res) => {
  try {
    const { id: courseId } = req.params;
    const { title, duration, isFreePreview, order } = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    if (course.instructor.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Video file is required",
      });
    }
    const fileUri = getDataUri(req.file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "video",
    });
    const newLesson = {
      title,
      videoUrl: cloudResponse.secure_url,
      duration,
      order: order || course.lessons.length + 1,
      isFreePreview: isFreePreview == "true",
    }

    course.lessons.push(newLesson);
    await course.save();

    return res.status(201).json({
      success: true,
      message: "Lesson added successfully",
      lesson: newLesson,
      course,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to add lesson",
    });
  }
}

const updateLesson = async (req, res) => {
  try {
    const { id: courseId, lessonId } = req.params;
    const { title, duration, isFreePreview, } = req.body

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    if (course.instructor.toString() !== req.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const lesson = course.lessons.id(lessonId);

    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    if (title) lesson.title = title;
    if (duration) lesson.duration = duration;
    if (isFreePreview !== undefined) lesson.isFreePreview = isFreePreview === "true";


    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "video",
      });
    lesson.videoUrl = cloudResponse.secure_url;
  }

    await course.save();

  return res.status(200).json({
    success: true,
    message: "Lesson updated successfully",
    lesson,
  });

} catch (error) {
  console.log(error);
  return res.status(500).json({
    success: false,
    message: "Failed to update lesson",
  });
}
}

const deleteLesson = async (req, res) => {
  try {
    const { id: courseId, lessonId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    if (course.instructor.toString() !== req.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    // Lesson remove karo
    course.lessons = course.lessons.filter(
      (lesson) => lesson._id.toString() !== lessonId
    );

    await course.save();

    return res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete lesson",
    });
  }
};
export { createCourse, getAllCourse, getCourseById, updateCourse, deleteCourse, addLesson, updateLesson, deleteLesson };