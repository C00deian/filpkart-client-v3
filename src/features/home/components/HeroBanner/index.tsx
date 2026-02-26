import { useState, useEffect } from "react";
import image1 from "@/assets/images/flipkart-crausael/bb812ccfd8f9281e.png";
import image2 from "@/assets/images/flipkart-crausael/2.png";
import image3 from "@/assets/images/flipkart-crausael/3.png";
import image4 from "@/assets/images/flipkart-crausael/4.png";
import image5 from "@/assets/images/flipkart-crausael/5.png";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const SLIDES = [
  {
    title: "Alpine Lake",
    image: image1,
  },
  {
    title: "Misty Valley",
    image: image2,
  },
  {
    title: "Snow Peaks",
    image: image3,
  },
  {
    title: "Desert Light",
    image: image4,
  },
  {
    title: "Blue Ridge",
    image: image5,
  },
];

const getSlideOffset = (
  index: number,
  activeIndex: number,
  total: number,
): number => {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
};

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((c) => (c + 1) % SLIDES.length),
      4000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-5 rounded-[20px] bg-[#ececef] px-1 py-8 sm:px-4 sm:py-10">
      <div className="relative mx-auto max-w-[980px]">
        <div className="relative h-[210px] sm:h-[300px]">
          {SLIDES.map((slide, index) => {
            const offset = getSlideOffset(index, currentSlide, SLIDES.length);
            const absOffset = Math.abs(offset);
            if (absOffset > 2) return null;

            const isActive = offset === 0;
            const baseWidth = isActive
              ? "min(100%, 640px)"
              : absOffset === 1
                ? "min(90%, 580px)"
                : "min(80%, 540px)";
            const scale = isActive ? 1 : absOffset === 1 ? 0.86 : 0.78;
            const opacity = isActive ? 1 : absOffset === 1 ? 0.72 : 0.38;
            const overlayOpacity = isActive ? 0 : absOffset === 1 ? 0.18 : 0.3;
            const translateX =
              offset === -2
                ? "calc(-1 * clamp(165px, 36vw, 360px))"
                : offset === -1
                  ? "calc(-1 * clamp(92px, 21vw, 210px))"
                  : offset === 1
                    ? "clamp(92px, 21vw, 210px)"
                    : offset === 2
                      ? "clamp(165px, 36vw, 360px)"
                      : "0px";

            return (
              <article
                key={slide.title}
                className="absolute left-1/2 top-1/2 overflow-hidden rounded-[20px] shadow-[0_20px_45px_rgba(15,23,42,0.18)] transition-all duration-700 ease-out"
                style={{
                  width: baseWidth,
                  aspectRatio: "16 / 7",
                  zIndex: 50 - absOffset,
                  opacity,
                  transform: `translate(-50%, -50%) translateX(${translateX}) scale(${scale})`,
                }}
                aria-hidden={!isActive}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-slate-900 transition-opacity duration-700"
                  style={{ opacity: overlayOpacity }}
                />
              </article>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-center gap-5">
          <button
            onClick={() =>
              setCurrentSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)
            }
            className="flex h-7 w-7 items-center justify-center rounded-full text-[18px] text-[#8f939b] transition hover:bg-white/60 hover:text-[#636a75]"
            aria-label="Previous slide"
          >
          <ChevronLeftIcon />
          </button>

          <div className="flex items-center gap-2">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${currentSlide === index ? "bg-[#6c6cff] scale-110" : "bg-[#cdced3] hover:bg-[#b9bac1]"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((s) => (s + 1) % SLIDES.length)}
            className="flex h-7 w-7 items-center justify-center rounded-full text-[18px] text-[#8f939b] transition hover:bg-white/60 hover:text-[#636a75]"
            aria-label="Next slide"
          >
         <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
export default HeroBanner;
