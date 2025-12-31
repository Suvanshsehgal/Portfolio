import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Experience = () => {
  const sectionRef = useRef(null);
  const dotRef = useRef(null);
  const cardRefs = useRef([]);

  const experiences = [
    {
      year: "Present",
      title: "Present",
      desc:
        "Lorem |psumLorem |psumLorem\nIpsumLorem |psumLorem\nIpsumLorem |psum",
      side: "left",
    },
    {
      year: "2023",
      title: "Senior Developer",
      desc: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      side: "right",
    },
    {
      year: "2022",
      title: "Full Stack Developer",
      desc: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      side: "left",
    },
    {
      year: "2020",
      title: "Junior Developer",
      desc: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      side: "right",
    },
  ];

  useEffect(() => {
    const createTimeline = () => {
      ScrollTrigger.killAll();

      const dot = dotRef.current;
      if (!dot) return;

      const dotRect = dot.getBoundingClientRect();
      const containers = cardRefs.current.filter(Boolean);

      const points = containers.map((card) => {
        const marker = card.querySelector(".marker");
        const r = marker.getBoundingClientRect();

        return {
          x: r.left + r.width / 2 - (dotRect.left + dotRect.width / 2),
          y: r.top + r.height / 2 - (dotRect.top + dotRect.height / 2),
        };
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "+=1100",   // 🔥 Faster
          scrub: 0.8,      // 🔥 Snappier
        },
      }).to(dot, {
        duration: 1,
        ease: "none",
        motionPath: {
          path: points,
          curviness: 1.4,
        },
      });
    };

    createTimeline();
    window.addEventListener("resize", createTimeline);
    return () => window.removeEventListener("resize", createTimeline);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-[#edf0f4] px-10 py-24"
    >
      <h1 className="text-6xl font-black tracking-wide mb-20">
        EXPERIENCE
      </h1>

      {/* ❌ Center Line Removed */}

      {/* Moving Dot */}
      <div
        ref={dotRef}
        className="absolute left-1/2 -translate-x-1/2 top-28 w-8 h-8 bg-black border-[7px] border-white rounded-full shadow-xl z-30"
      ></div>

      {/* Cards */}
      <div className="flex flex-col gap-24">
        {experiences.map((exp, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className={`relative flex w-full ${
              exp.side === "left" ? "justify-start" : "justify-end"
            }`}
          >
            <div className="relative w-[560px] bg-white p-6 rounded-xl shadow-xl border border-gray-300">
              <div className="bg-gray-300 rounded-xl p-5">
                <h2 className="text-xl font-bold mb-1">{exp.title}</h2>
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {exp.desc}
                </p>
              </div>

              <div
                className={`
                  marker absolute top-1/2 -translate-y-1/2
                  w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shadow
                  ${exp.side === "left" ? "-right-10" : "-left-10"}
                `}
              >
                <div className="w-4 h-4 bg-black rounded-full"></div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
