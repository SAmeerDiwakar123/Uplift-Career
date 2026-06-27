import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { ORDER_API_END_POINT } from "@/utils/constant";

const useRazorpay = (courseId, setIsEnrolled) => {
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Razorpay script load karo
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleBuyNow = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      setPaymentLoading(true);

      // Step 1: Order banao
      const res = await axios.post(
        `${ORDER_API_END_POINT}/${courseId}/create-order`,
        {},
        { withCredentials: true }
      );

      const { order, key, course: courseInfo } = res.data;

      // Step 2: Razorpay open karo
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Uplift Career",
        description: courseInfo.name,
        order_id: order.id,

        handler: async (response) => {
          try {
            // Step 3: Verify karo
            const verifyRes = await axios.post(
              `${ORDER_API_END_POINT}/${courseId}/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            if (verifyRes.data.success) {
              setIsEnrolled(true); // parent ko batao
              toast.success("Enrolled successfully! 🎉");
            }
          } catch {
            toast.error("Payment verification failed");
          }
        },

        prefill: {
          name: user?.fullname,
          email: user?.email,
        },

        theme: { color: "#534AB7" },

        modal: {
          ondismiss: () => toast.info("Payment cancelled"),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setPaymentLoading(false);
    }
  };

  return { handleBuyNow, paymentLoading };
};

export default useRazorpay;