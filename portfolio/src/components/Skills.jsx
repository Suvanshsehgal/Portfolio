import { useState } from "react";
import { Code, Server, Cloud, Database } from "lucide-react";
import Chart from "react-apexcharts";

function Skills() {
  const [activeTab, setActiveTab] = useState("FRONTEND");

  const skillsData = {
    FRONTEND: {
      category: "Frontend",
      title: "DEVELOPMENT",
      description:
        "Building responsive and interactive user interfaces with modern frameworks and best practices",
      average: 85,
      skills: [
        { name: "React", value: 90 },
        { name: "JavaScript", value: 85 },
        { name: "CSS/Tailwind", value: 88 },
        { name: "TypeScript", value: 80 },
        { name: "Next.js", value: 82 },
      ],
      icon: <Code className="w-6 h-6" />,
    },

    BACKEND: {
      category: "Backend",
      title: "DEVELOPMENT",
      description:
        "Creating robust server-side applications with scalable architecture and efficient database management",
      average: 78,
      skills: [
        { name: "Node.js", value: 82 },
        { name: "Python", value: 75 },
        { name: "Express", value: 80 },
        { name: "REST APIs", value: 85 },
        { name: "GraphQL", value: 70 },
      ],
      icon: <Server className="w-6 h-6" />,
    },

    CLOUD: {
      category: "Cloud",
      title: "SERVICES",
      description:
        "Deploying and managing applications on cloud platforms with DevOps practices and CI/CD pipelines",
      average: 72,
      skills: [
        { name: "AWS", value: 75 },
        { name: "Docker", value: 78 },
        { name: "Kubernetes", value: 65 },
        { name: "CI/CD", value: 80 },
        { name: "Azure", value: 62 },
      ],
      icon: <Cloud className="w-6 h-6" />,
    },

    DATABASE: {
      category: "Database",
      title: "MANAGEMENT",
      description:
        "Designing and optimizing database schemas with both SQL and NoSQL solutions for data persistence",
      average: 80,
      skills: [
        { name: "MongoDB", value: 85 },
        { name: "PostgreSQL", value: 82 },
        { name: "MySQL", value: 78 },
        { name: "Redis", value: 75 },
        { name: "Firebase", value: 80 },
      ],
      icon: <Database className="w-6 h-6" />,
    },
  };

  const currentSkill = skillsData[activeTab];

  // Apex Chart Config
const chartConfig = {
  series: [
    {
      name: "Skill Level",
      data: currentSkill.skills.map((s) => s.value),
    },
  ],

  chart: {
    type: "bar",
    height: 300,
    background: "#EEF0F4",
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 400,
    },
  },

  colors: ["#9b9b9b"],

  states: {
    normal: { filter: { type: "none" } },
    hover: { filter: { type: "darken", value: 0.8 } },
    active: { filter: { type: "darken", value: 0.9 } },
  },

  fill: { opacity: 0.9 },

  plotOptions: {
    bar: {
      columnWidth: "45%",
      borderRadius: 2,
      borderRadiusApplication: "end",

      // Required for moving labels
      dataLabels: {
        position: "top",
      },
    },
  },

  // ✅ TEXT ABOVE BAR (not touching)
  dataLabels: {
    enabled: true,
    formatter: (val) => `${val}%`,
      offsetY: -20,
    style: {
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "Aceh",
      colors: ["#000000ff"],
    },
  },

  xaxis: {
    categories: currentSkill.skills.map((s) => s.name),
    axisBorder: { show: true, color: "#000000", height: 2 },
    axisTicks: { show: false },
    labels: {
      style: {
        colors: "#000000",
        fontSize: "12px",
        fontWeight: 500,
      },
    },
  },

  yaxis: {
    min: 0,
    max: 100,
    tickAmount: 4,
    labels: {
      style: {
        colors: "#000000",
        fontSize: "12px",
        fontWeight: 500,
      },
    },
  },

  grid: {
    show: true,
    borderColor: "#C9CCD1",
    strokeDashArray: 0,
    yaxis: { lines: { show: true } },
    xaxis: { lines: { show: false } },
  },

  tooltip: { theme: "dark" },
};





  return (
    <div
      className="min-h-screen py-16 px-4"
      style={{ fontFamily: "Aceh, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl  text-center mb-12 text-gray-900 font-media-sans tracking-wider">
          Skills and Expertise 
        </h2>

        <div className="rounded-2xl shadow-xl border-4 border-gray-900 p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* LEFT SECTION */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-gray-600">{currentSkill.icon}</div>
                <p className="text-gray-500 text-sm font-medium">
                  {currentSkill.category}
                </p>
              </div>

              <h3 className="text-5xl font-extrabold text-gray-900 mb-6">
                {currentSkill.title}
              </h3>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {currentSkill.description}
              </p>

              <div>
                <p className="text-gray-700 font-semibold mb-2">Average</p>
                <p className="text-7xl font-extrabold text-gray-900">
                  {currentSkill.average}%
                </p>
              </div>
            </div>

            {/* RIGHT SECTION — APEX BAR CHART */}
            <div className="w-full">
              <Chart
                options={chartConfig}
                series={chartConfig.series}
                type="bar"
                height={300}
              />
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-8 flex-wrap">
          {Object.keys(skillsData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-2xl transition-all ${
                activeTab === tab
                  ? "text-gray-900 font-extrabold scale-110"
                  : "text-gray-400 font-semibold hover:text-gray-700 hover:scale-105"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;
