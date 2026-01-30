import { useEffect, useRef } from "react";
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
  {
    title: "Co-Founder — ZTown",
    body: "Co-founded a fast-commerce fashion startup delivering clothing within 60 minutes. Leading product vision, UI/UX design, and digital infrastructure while building the tech foundation for rapid local deliveries.",
    date: "Jan 2026 - Present",
    side: "left",
    attachment: "https://www.ztown.club/"
  },
  {
    title: "President — ACM BMU Student Chapter",
    body: "Leading the official ACM student chapter, managing technical events, hackathons, and workshops. Overseeing creative and technical teams while building a strong developer ecosystem on campus.",
    date: "August 2025 - Present",
    side: "right",
    attachment: null
  },
  {
    title: "Full Stack Intern — Coding Blocks",
    body: "Worked on real-world web applications using modern full-stack technologies. Contributed to frontend UI, backend logic, and API integration while following production-level practices.",
    date: "June 2025 - July 2025",
    side: "left",
    attachment: null
  },
  {
    title: "Creative & Design Team Member",
    body: "Part of the creative team for major tech and college events, contributing to branding, merchandise design, and digital assets. Created posters, UI concepts, and visual identity for events and hackathons.",
    date: "Aug 2022 - Dec 2022",
    side: "right",
    attachment: null
  },
]


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

      // Temporarily show all cards to get accurate positions
      cardRefs.current.forEach((card) => {
        const cardContent = card?.querySelector(".card-content");
        if (cardContent) {
          gsap.set(cardContent, { opacity: 1, scale: 1, y: 0 });
        }
      });

      // Calculate path after cards are visible
      setTimeout(() => {
        const section = sectionRef.current.getBoundingClientRect();
        const points = [];

        // START BELOW PRESENT (no overlap)
        const start = startMarkerRef.current?.getBoundingClientRect();
        if (start) {
          points.push({
            x: start.left + start.width / 2 - section.left,
            y: start.top + start.height / 2 - section.top,
          });
        }

        // THROUGH EXPERIENCE CARDS - get marker positions
        cardRefs.current.forEach((card) => {
          if (!card) return;
          
          const marker = card.querySelector(".marker");
          if (!marker) return;

          const r = marker.getBoundingClientRect();
          const centerX = r.left + r.width / 2 - section.left;
          const centerY = r.top + r.height / 2 - section.top;
          
          points.push({ x: centerX, y: centerY });
        });

        // END AT 2023
        const end = endRef.current?.getBoundingClientRect();
        if (end) {
          points.push({
            x: end.left + end.width / 2 - section.left,
            y: end.top + end.height / 2 - section.top,
          });
        }

        const pathData = catmullRomToBezier(points);
        svgPath.setAttribute("d", pathData);

        // Now hide cards again for animation
        cardRefs.current.forEach((card) => {
          const cardContent = card?.querySelector(".card-content");
          if (cardContent) {
            gsap.set(cardContent, { opacity: 0, scale: 0.95, y: 20 });
          }
        });

        // Main timeline for dot movement
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 0.5,
          },
        }).to(dot, {
          ease: "none",
          motionPath: {
            path: svgPath,
            align: svgPath,
            alignOrigin: [0.5, 0.5],
          },
        });

        // Animate each card when dot reaches it
        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          
          const cardContent = card.querySelector(".card-content");
          if (!cardContent) return;

          // Calculate the scroll position when dot reaches this card
          const totalCards = cardRefs.current.length;
          const progressPerCard = 1 / (totalCards + 1); // +1 for start and end points
          const cardProgress = (index + 1) * progressPerCard;

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 0.5,
            onUpdate: (self) => {
              // Trigger animation slightly before the dot reaches the card
              if (self.progress >= cardProgress - 0.08 && self.progress < cardProgress + 0.02) {
                gsap.to(cardContent, {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.2,
                  ease: "power4.out",
                  overwrite: true,
                });
              }
            },
          });
        });
      }, 50);
    };

    createTimeline();
    
    // Add a slight delay before adding resize listener to prevent immediate recalculation
    let resizeTimeout;
    const resizeHandler = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(createTimeline, 150);
    };
    
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      clearTimeout(resizeTimeout);
    };
  }, [experiences]);

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
            <div className="card-content relative w-[600px] bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">{exp.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-600 font-semibold">{exp.date}</p>
                </div>
                <div className="h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent"></div>
                <p className="text-base leading-relaxed text-gray-700">{exp.body}</p>
                {exp.attachment && (
                  <a 
                    href={exp.attachment} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:gap-3"
                  >
                    View Attachment
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                )}
              </div>

              <div
                className={`marker absolute top-1/2 -translate-y-1/2
                  w-10 h-10 rounded-full bg-white border-4 border-black flex items-center justify-center shadow-lg
                  ${exp.side === "left" ? "-right-12" : "-left-12"}
                `}
              >
                <div className="inner-dot w-4 h-4 bg-black rounded-full"></div>
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
