import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { ArrowLeft, Clock, Users, Star, BookOpen, Play, Lock, CheckCircle } from 'lucide-react';
import { COURSE_API_END_POINT, ORDER_API_END_POINT } from '@/utils/constant';


const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Course fetch karo
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
        console.error(error);
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // Razorpay payment handler
  const handleBuyNow = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate('/login');
      return;
    }

    try {
      setPaymentLoading(true);

      // Step 1: Order create karo
      const res = await axios.post(
        `${ORDER_API_END_POINT}/${id}/create-order`,
        {},
        { withCredentials: true }
      );

      const { order, key, course: courseInfo } = res.data;

      // Step 2: Razorpay checkout kholo
      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Uplift Career",
        description: courseInfo.name,
        order_id: order.id,
        handler: async function (response) {
          try {
            // Step 3: Payment verify karo
            const verifyRes = await axios.post(
              `${ORDER_API_END_POINT}/${id}/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            if (verifyRes.data.success) {
              setIsEnrolled(true);
              toast.success("Payment successful! Enrolled in course 🎉");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: user?.fullname || user?.name || "User",
          email: user?.email || "",
        },
        theme: { color: "#534AB7" },
        modal: {
          ondismiss: function() {
            toast.info("Payment cancelled");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Course not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 pb-20 sm:pb-8">
      <div className="max-w-5xl mx-auto px-3 sm:px-4">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 hover:text-indigo-600 mb-4 sm:mb-6"
        >
          <ArrowLeft size={15} /> Back to Courses
        </button>

        <div className="grid lg:grid-cols-3 gap-3 sm:gap-6">

          {/* Left Section */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-6">

            {/* Main Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6">

              {/* Badge + Level */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{ background: '#EEEDFE', color: '#534AB7' }}>
                  {course.category}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                  {course.level}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-base sm:text-2xl font-bold mb-2">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                {course.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Star size={13} className="text-yellow-500 fill-yellow-500" />
                  {course.rating || 0} rating
                </span>
                <span className="flex items-center gap-1">
                  <Users size={13} />
                  {course.enrolledStudents?.length || 0} students
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={13} />
                  {course.lessons?.length || 0} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  Valid for {course.validityYears} year
                </span>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-2 pt-3 border-t">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                  {course.instructor?.fullname?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-xs font-medium">{course.instructor?.fullname || 'Unknown'}</p>
                  <p className="text-[10px] text-gray-500">Instructor</p>
                </div>
              </div>
            </div>

            {/* What you'll learn */}
            {course.syllabus?.length > 0 && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6">
                <h2 className="text-sm sm:text-lg font-bold mb-3">
                  What you'll learn
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {course.syllabus.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                      <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lessons */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6">
              <h2 className="text-sm sm:text-lg font-bold mb-3">
                Course content
              </h2>
              <div className="space-y-2">
                {course.lessons?.map((lesson, i) => (
                  <div
                    key={lesson._id || i}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                        style={{ background: lesson.isFreePreview ? '#EEEDFE' : '#f3f4f6', color: lesson.isFreePreview ? '#534AB7' : '#9ca3af' }}>
                        {lesson.isFreePreview
                          ? <Play size={12} />
                          : isEnrolled ? <Play size={12} /> : <Lock size={12} />
                        }
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-800">
                          {i + 1}. {lesson.title}
                        </p>
                        {lesson.duration && (
                          <p className="text-[10px] text-gray-400">{lesson.duration}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {lesson.isFreePreview && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ background: '#E1F5EE', color: '#0F6E56' }}>
                          Free preview
                        </span>
                      )}
                      {(lesson.isFreePreview || isEnrolled) && lesson.videoUrl && (
                        <a
                          href={lesson.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] sm:text-xs text-indigo-600 hover:underline"
                        >
                          Watch
                        </a>
                      )}
                      {!lesson.isFreePreview && !isEnrolled && (
                        <Lock size={14} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-3 sm:space-y-4">

            {/* Price Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6 sticky top-20">

              {/* Thumbnail */}
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-36 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="w-full h-36 rounded-lg mb-4 items-center justify-center text-5xl hidden"
                style={{ background: '#EEEDFE' }}>
                📚
              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ₹{course.price?.toLocaleString() || 0}
                </span>
              </div>

              {/* CTA Button */}
              {isEnrolled ? (
                <button
                  className="w-full py-2.5 sm:py-3 rounded-xl text-sm font-semibold text-white bg-green-600 cursor-not-allowed flex items-center justify-center gap-2"
                  disabled
                >
                  <CheckCircle size={16} /> Already Enrolled
                </button>
              ) : (
                <button
                  onClick={handleBuyNow}
                  disabled={paymentLoading}
                  className="w-full py-2.5 sm:py-3 rounded-xl text-sm font-semibold text-white transition"
                  style={{ background: paymentLoading ? '#9ca3af' : '#534AB7' }}
                >
                  {paymentLoading ? "Processing..." : `Buy Now — ₹${course.price?.toLocaleString() || 0}`}
                </button>
              )}

              {/* Features */}
              <div className="mt-4 space-y-2 border-t pt-4">
                <p className="text-xs font-medium text-gray-700 mb-2">This course includes:</p>
                {[
                  [`${course.lessons?.length || 0} video lessons`, <Play size={13} />],
                  [`Valid for ${course.validityYears || 1} year`, <Clock size={13} />],
                  ['Certificate of completion', <CheckCircle size={13} />],
                  ['Full lifetime access', <BookOpen size={13} />],
                ].map(([text, icon]) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="text-gray-400">{icon}</span>
                    {text}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;