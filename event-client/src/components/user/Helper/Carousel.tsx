import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  {
    src: "/images/events/ALBS3.jpg",
    title: "Event 1",
    subtitle: "Experience the thrill",
  },
  {
    src: "/images/events/YOASOBI_2025.webp",
    title: "Event 2",
    subtitle: "Join the future of music",
  },
  {
    src: "/images/events/ALBS3.jpg",
    title: "Event 3",
    subtitle: "Unleash the energy",
  },
  {
    src: "/images/events/YOASOBI_2025.webp",
    title: "Event 4",
    subtitle: "Live. Loud. Legendary.",
  },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="relative h-[80vh] w-full flex-shrink-0">
            {/* Background Image */}
            <img
              src={image.src}
              className="absolute top-0 left-0 h-[80vh] w-full object-cover"
            />

            {/* Dark Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
              <motion.h1
                key={currentSlide}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-4xl font-extrabold tracking-widest drop-shadow-lg md:text-6xl"
              >
                {image.title}
              </motion.h1>
              <motion.p
                key={`subtitle-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                className="mt-4 text-lg font-medium tracking-wide drop-shadow-md md:text-2xl"
              >
                {image.subtitle}
              </motion.p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
