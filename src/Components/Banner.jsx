import React, { Suspense } from "react";
import bannerImg from "../assets/banner4.png";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { GrAmazon } from "react-icons/gr";
import { FaApple } from "react-icons/fa";
import BannerLeft from "./BannerLeft";
import Jobs from "./Jobs/Jobs";
import SeekerSteps from "../Layouts/SeekerSteps/SeekerSteps";


const ringAnimation = (duration, direction = 1) => ({
  initial: { rotate: 0 },
  animate: { rotate: 360 * direction },
  transition: {
    repeat: Infinity,
    duration: duration,
    ease: "linear",
  },
});



const Banner = () => {
  const jobsPromise=fetch('http://localhost:3000/jobs').then(res=>res.json())
  return (


<section>

    <section className="min-h-screen overflow-hidden mb-48 flex items-center">

      <div className="flex flex-col lg:flex-row-reverse items-center justify-between w-full">

        <div className="relative mt-10 w-full lg:w-1/2 flex items-center justify-center">

          <motion.div
            {...ringAnimation(30, 1)}
            className="absolute w-[90vw] max-w-[650px] aspect-square rounded-full border border-blue-200 border-dashed opacity-40 flex items-start justify-center"
          >
            <div className="absolute -top-6 bg-white rounded-full p-1 shadow">
              <FaApple size={30} className="sm:size-[40px]" color="green" />
            </div>
          </motion.div>

         
          <motion.div
            {...ringAnimation(22, -1)}
            className="absolute w-[75vw] max-w-[550px] aspect-square rounded-full border border-blue-300 border-dashed opacity-60 flex items-start justify-center"
          >
            <div className="absolute -top-5 bg-white rounded-full p-1 shadow">
              <GrAmazon size={30} className="sm:size-[40px]" color="blue" />
            </div>
          </motion.div>

         
          <motion.div
            {...ringAnimation(15, 1)}
            className="absolute w-[60vw] max-w-[450px] aspect-square rounded-full border-2 border-blue-400 border-dashed flex items-start justify-center"
          >
            <div className="absolute -top-4 bg-white rounded-full p-1 shadow">
              <FcGoogle size={30} className="sm:size-[40px]" />
            </div>
          </motion.div>

        
          <div className="absolute w-[65vw] max-w-[400px] aspect-square bg-blue-400/20 blur-3xl rounded-full"></div>

          
          <motion.img
            src={bannerImg}
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[70vw] max-w-[380px] rounded-full relative z-10 shadow-2xl"
          />
        </div>

       
        <div className="w-full lg:w-7/12 text-center lg:text-left  lg:px-16">
          <BannerLeft />
        </div>

      </div>

      








    </section>

    
      {/* search korar por outpu ei section a dekhabe */ }

      <section >

        <div className="mx-">

          <SeekerSteps></SeekerSteps>

        </div>

        <Suspense fallback={'loading.......'}>
          <Jobs jobsPromise={jobsPromise}></Jobs>
        </Suspense>

      </section>

</section>

  );
};

export default Banner;