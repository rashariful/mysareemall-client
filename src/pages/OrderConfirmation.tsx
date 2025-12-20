"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const { state } = useLocation();
  console.log(state, "confirm order page")
  const navigate = useNavigate();

  // যদি direct access দেয়
  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null;

  const { name, total } = state;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl max-w-md w-full p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.5,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="mx-auto w-24 h-24 flex items-center justify-center bg-green-100 rounded-full mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-600 animate-bounce" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          ধন্যবাদ, {name}!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-gray-600 mb-6"
        >
          আপনার অর্ডার সফলভাবে নেওয়া হয়েছে। <br />
          {/* অর্ডার আইডি: <span className="font-semibold">{items[0].productName}</span> */}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="text-lg font-medium text-gray-800 mb-6"
        >
          মোট মূল্য: <span className="text-rose-600">{total}৳</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <Button
            onClick={() => navigate("/")}
            className="bg-rose-500 hover:bg-rose-600 text-white w-full py-3 rounded-xl text-lg font-bold shadow-lg"
          >
            হোম পেজে ফিরে যান
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;


// "use client";

// import { useEffect } from "react";
// import { motion } from "framer-motion";
// import { CheckCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/router";

// interface OrderConfirmationProps {
//   orderId: string;
//   customerName: string;
//   grandTotal: number;
// }

// const OrderConfirmation = ({ orderId, customerName, grandTotal }: OrderConfirmationProps) => {
//   const router = useRouter();

//   useEffect(() => {
//     // Optional: Redirect to home after 10 seconds
//     const timer = setTimeout(() => {
//       router.push("/");
//     }, 10000);
//     return () => clearTimeout(timer);
//   }, [router]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 50, scale: 0.8 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="bg-white shadow-2xl rounded-3xl max-w-md w-full p-8 text-center"
//       >
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
//           className="mx-auto w-24 h-24 flex items-center justify-center bg-green-100 rounded-full mb-6"
//         >
//           <CheckCircle className="w-12 h-12 text-green-600 animate-bounce" />
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1, duration: 0.5 }}
//           className="text-3xl font-bold text-gray-900 mb-2"
//         >
//           ধন্যবাদ, {customerName}!
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.2, duration: 0.5 }}
//           className="text-gray-600 mb-6"
//         >
//           আপনার অর্ডার সফলভাবে নেওয়া হয়েছে। <br />
//           অর্ডার আইডি: <span className="font-semibold">{orderId}</span>
//         </motion.p>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.4, duration: 0.5 }}
//           className="text-lg font-medium text-gray-800 mb-6"
//         >
//           মোট মূল্য: <span className="text-rose-600">{grandTotal}৳</span>
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.6, duration: 0.5 }}
//         >
//           <Button
//             onClick={() => router.push("/")}
//             className="bg-rose-500 hover:bg-rose-600 text-white w-full py-3 rounded-xl text-lg font-bold shadow-lg"
//           >
//             হোম পেজে ফিরে যান
//           </Button>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default OrderConfirmation;
