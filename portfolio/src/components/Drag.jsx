import { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'

// Import local SVG icons
import reactIcon from '../assets/react-icon.svg'
import jsIcon from '../assets/js-icon.svg'
import nodeIcon from '../assets/node-icon.svg'
import mongoIcon from '../assets/mongo.svg'
import figmaIcon from '../assets/Figma.svg'
import gitIcon from '../assets/git-original.svg'
import tailwindIcon from '../assets/tailwindcss-original.svg'
import pythonIcon from '../assets/python-original.svg'
import blenderIcon from '../assets/blender-original.svg'
import canvaIcon from '../assets/canva-original.svg'
import expoIcon from '../assets/expo-original.svg'
import illustratorIcon from '../assets/illustrator-original.svg'
import notionIcon from '../assets/notion-original.svg'
import photoshopIcon from '../assets/photoshop-original.svg'

const toolsData = [
  { id: 1, name: 'React', icon: reactIcon, color: '#FFFFFF' },
  { id: 2, name: 'JavaScript', icon: jsIcon, color: 'rgba(247, 223, 30, 1)' },
  { id: 3, name: 'Node.js', icon: nodeIcon, color: '#FFFFFF' },
  { id: 4, name: 'MongoDB', icon: mongoIcon, color: '#FFFFFF' },
  { id: 5, name: 'Figma', icon: figmaIcon, color: '#FFFFFF' },
  { id: 6, name: 'Git', icon: gitIcon, color: '#FFFFFF' },
  { id: 7, name: 'Tailwind', icon: tailwindIcon, color: '#FFFFFF' },
  { id: 8, name: 'Python', icon: pythonIcon, color: '#FFFFFF' },
  { id: 9, name: 'Blender', icon: blenderIcon, color: '#FFFFFF' },
  { id: 10, name: 'Canva', icon: canvaIcon, color: '#FFFFFF' },
  { id: 11, name: 'Expo', icon: expoIcon, color: '#FFFFFF' },
  { id: 12, name: 'Illustrator', icon: illustratorIcon, color: '#330000' },
  { id: 13, name: 'Notion', icon: notionIcon, color: '#000000' },
  { id: 14, name: 'Photoshop', icon: photoshopIcon, color: '#001E36' },
]

function Drag() {
  const sceneRef = useRef(null)
  const engineRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 500 })
  const isDraggingRef = useRef(false)
  const imagesRef = useRef({})

  useEffect(() => {
    const updateDimensions = () => {
      if (sceneRef.current) {
        const width = sceneRef.current.offsetWidth
        setDimensions({ width, height: 500 })
      }
    }

    // Pre-load images to prevent flickering on canvas
    toolsData.forEach(tool => {
      const img = new Image()
      img.src = tool.icon
      imagesRef.current[tool.id] = img
    })

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (!sceneRef.current || dimensions.width === 0) return

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter

    const engine = Engine.create()
    engine.gravity.y = 0.8 // Slightly reduced gravity
    engineRef.current = engine

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: dimensions.width,
        height: dimensions.height,
        wireframes: false,
        background: 'transparent',
      },
    })

    const getBubbleRadius = () => {
      if (dimensions.width < 640) return 50
      if (dimensions.width < 1024) return 60
      return 65
    }

    const radius = getBubbleRadius()
    const wallThickness = 50
    
    const walls = [
      Bodies.rectangle(dimensions.width / 2, -wallThickness / 2, dimensions.width, wallThickness, { isStatic: true, render: { visible: false } }),
      // Visible floor line
      Bodies.rectangle(dimensions.width / 2, dimensions.height + wallThickness / 2, dimensions.width, wallThickness, { 
        isStatic: true, 
        render: { fillStyle: '#e5e5e5' } 
      }),
      Bodies.rectangle(-wallThickness / 2, dimensions.height / 2, wallThickness, dimensions.height, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(dimensions.width + wallThickness / 2, dimensions.height / 2, wallThickness, dimensions.height, { isStatic: true, render: { visible: false } }),
    ]

    const bubbles = toolsData.map((tool, index) => {
      const x = (dimensions.width / (toolsData.length + 1)) * (index + 1)
      const y = 80 + Math.random() * 80

      return Bodies.circle(x, y, radius, {
        restitution: 0.2,
        friction: 0.01,
        frictionAir: 0.02,
        density: 0.002,
        render: { visible: false },
        plugin: { toolData: tool, floatOffset: Math.random() * Math.PI * 2 },
      })
    })

    Composite.add(engine.world, [...walls, ...bubbles])

    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    })

    Composite.add(engine.world, mouseConstraint)
    render.mouse = mouse

    // Handle dragging state for scroll handling
    Events.on(mouseConstraint, 'startdrag', () => {
      isDraggingRef.current = true
      render.canvas.style.cursor = 'grabbing'
    })

    Events.on(mouseConstraint, 'enddrag', () => {
      isDraggingRef.current = false
      render.canvas.style.cursor = 'grab'
    })

    // Idle float animation
    let animationFrame = 0
    const applyFloatAnimation = () => {
      animationFrame++
      bubbles.forEach((bubble) => {
        if (!isDraggingRef.current || mouseConstraint.body !== bubble) {
          const floatY = Math.sin(animationFrame * 0.02 + bubble.plugin.floatOffset) * 0.5
          Matter.Body.setVelocity(bubble, {
            x: bubble.velocity.x,
            y: bubble.velocity.y + floatY * 0.01
          })
        }
      })
    }

    Events.on(engine, 'beforeUpdate', applyFloatAnimation)

    // Custom drawing loop
    Events.on(render, 'afterRender', () => {
      const context = render.context
      bubbles.forEach((bubble) => {
        const { x, y } = bubble.position
        const tool = bubble.plugin.toolData
        const img = imagesRef.current[tool.id]

        // Draw Bubble with custom color
        context.beginPath()
        context.arc(x, y, radius, 0, 2 * Math.PI)
        context.fillStyle = tool.color || '#ffffff' // Use tool color or default white
        context.fill()
        context.strokeStyle = '#e5e5e5'
        context.lineWidth = 2
        context.stroke()

        // Draw Icon at 70% of diameter
        if (img && img.complete) {
          const iconSize = radius * 1.4
          context.drawImage(img, x - iconSize / 2, y - iconSize / 2, iconSize, iconSize)
        }
      })
    })

    const runner = Runner.create()
    Runner.run(runner, engine)
    Render.run(render)

    return () => {
      Render.stop(render)
      Runner.stop(runner)
      Engine.clear(engine)
      render.canvas.remove()
    }
  }, [dimensions])

  return (
    <section className="relative w-full py-16 px-6 flex flex-col items-center justify-center">
      <div className="w-full mx-auto">
        {/* Physics Container with embedded heading */}
        <div 
          ref={sceneRef}
          className="relative w-full h-[500px] overflow-hidden border-b border-gray-300"
        >
          {/* Heading overlay - positioned absolutely within physics container */}
          <div className="absolute top-8 left-0 right-0 z-10 text-center pointer-events-none">
            <p className="text-[#ff4d2d] text-sm font-aceh tracking-widest uppercase mb-3">
              CLICK & DRAG
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-media-sans  text-black">
              The tools I use to <br />design, build, and innovate.
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Drag