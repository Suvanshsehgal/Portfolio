import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Experience = () => {
  const sectionRef = useRef(null);
  const dotRef = useRef(null);
  const cardRefs = useRef([]);
  const pathRef = useRef(null);
  const presentRef = useRef(null);
  const startMarkerRef = useRef(null);
  const endRef = useRef(null);

  const experiences = [
    { title: "Experience One", desc: "Lorem ipsum", side: "left" },
    { title: "Experience Two", desc: "Lorem ipsum", side: "right" },
    { title: "Experience Three", desc: "Lorem ipsum", side: "left" },
  ];

  const catmullRomToBezier = (points) => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x},${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1] || p1;
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;

      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }

    return d;
  };

  useEffect(() => {
    const createTimeline = () => {
      ScrollTrigger.killAll();

      const dot = dotRef.current;
      const svgPath = pathRef.current;

      if (!dot || !svgPath) return;

      const section = sectionRef.current.getBoundingClientRect();
      const points = [];

      // START BELOW PRESENT (no overlap)
      const start = startMarkerRef.current.getBoundingClientRect();
      points.push({
        x: start.left + start.width / 2 - section.left,
        y: start.top + start.height / 2 - section.top,
      });

      // THROUGH EXPERIENCE CARDS
      cardRefs.current.forEach((card) => {
        const marker = card?.querySelector(".marker");
        if (!marker) return;

        const r = marker.getBoundingClientRect();
        points.push({
          x: r.left + r.width / 2 - section.left,
          y: r.top + r.height / 2 - section.top,
        });
      });

      // END AT 2023
      const end = endRef.current.getBoundingClientRect();
      points.push({
        x: end.left + end.width / 2 - section.left,
        y: end.top + end.height / 2 - section.top,
      });

      const pathData = catmullRomToBezier(points);
      svgPath.setAttribute("d", pathData);

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "+=1600",
          scrub: 1,
        },
      }).to(dot, {
        ease: "none",
        motionPath: {
          path: svgPath,
          align: svgPath,
          alignOrigin: [0.5, 0.5],
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
      className="relative min-h-screen px-10 py-24"
    >
      <h1 className="text-6xl font-black tracking-wide mb-20 text-center">
        EXPERIENCE
      </h1>

      {/* Curved Dotted Path */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <path
          ref={pathRef}
          fill="none"
          stroke="#000"
          strokeWidth="4"
          strokeDasharray="10 12"
          strokeLinecap="round"
        />
      </svg>

      {/* Moving Dot */}
      <div
        ref={dotRef}
        className="absolute w-8 h-8 bg-black border-[7px] border-white rounded-full shadow-xl z-30"
        style={{ transformOrigin: "50% 50%" }}
      />

      {/* PRESENT */}
      <div className="relative flex justify-center mb-28">
        <div
          ref={presentRef}
          className="bg-white shadow-xl border border-gray-300 px-10 py-6 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-center">Present</h2>
        </div>

        {/* START MARKER BELOW PRESENT */}
        <div
          ref={startMarkerRef}
          className="absolute top-full mt-6 w-6 h-6 rounded-full bg-transparent"
        ></div>
      </div>

      {/* EXPERIENCE CARDS */}
      <div className="flex flex-col gap-32">
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
                <p className="text-sm leading-relaxed">{exp.desc}</p>
              </div>

              <div
                className={`marker absolute top-1/2 -translate-y-1/2
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

      {/* END 2023 */}
      <div className="relative flex justify-center mt-32">
        <div
          ref={endRef}
          className="text-3xl font-bold text-black"
        >
          2023
        </div>
      </div>
    </div>
  );
};

export default Experience;
