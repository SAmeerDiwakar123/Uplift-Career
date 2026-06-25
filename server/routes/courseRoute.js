import express from "express"
import multer from "multer";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, getAllCourse, getCourseById, updateCourse, deleteCourse, addLesson, updateLesson, deleteLesson } from "../controllers/courseController.js"
import isTeacher from "../middlewares/isTeacher.js";

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/create").post(isAuthenticated, isTeacher, createCourse);
router.route("/get").get(getAllCourse);
router.route("/get/:id").get(getCourseById);
router.route("/update/:id").put(isAuthenticated, isTeacher, updateCourse);
router.route("/delete/:id").delete(isAuthenticated, isTeacher, deleteCourse);

// lesson
router.route("/:id/lessons").post(isAuthenticated, isTeacher, upload.single("video"), addLesson);
router.route("/:id/lessons/:lessonId").put(isAuthenticated, isTeacher, upload.single("video"), updateLesson);
router.route("/:id/lessons/:lessonId").delete(isAuthenticated, isTeacher, deleteLesson);

export default router;





// import express from "express"
// import multer from "multer";
// import isAuthenticated from "../middlewares/isAuthenticated.js  ";
// import { createCourse, getAllCourse, getCourseById, updateCourse, deleteCourse, addLesson, updateLesson, deleteLesson } from "../controllers/courseController.js"
// import isTeacher from "../middlewares/isTeacher.js";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });


// router.route("/create").post(isAuthenticated, isTeacher, createCourse);
// router.route("/get").get(getAllCourse);
// router.route("/get/:id").get(getCourseById);
// router.route("/update/:id").put(isAuthenticated, isTeacher, updateCourse);
// router.route("/delete/:id").delete(isAuthenticated, isTeacher, deleteCourse);
// //lesson
// router.route("/:id/lessons").post(isAuthenticated, isTeacher, upload.single("video"), addLesson)
// router.route("/:id/lessons/:lessonId").put(isAuthenticated, isTeacher, upload.single("video"), updateLesson);
// router.route("/:id/lessons/:lessonId").delete(isAuthenticated, isTeacher, deleteLesson);
// export default router