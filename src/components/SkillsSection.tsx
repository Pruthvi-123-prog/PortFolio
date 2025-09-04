'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiDjango,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiAndroid,
  SiKotlin,
  SiGit,
  SiFramer,
  SiGreensock,
} from 'react-icons/si'
import { FaBug, FaShieldAlt, FaTools } from 'react-icons/fa'

interface Skill {
  name: string
  category: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const skills: Skill[] = [
  // Frontend Development
  { name: "React.js", category: "Frontend", icon: SiReact },
  { name: "Next.js", category: "Frontend", icon: SiNextdotjs },
  { name: "TypeScript", category: "Frontend", icon: SiTypescript },
  { name: "JavaScript", category: "Frontend", icon: SiJavascript },
  { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss },
  { name: "HTML/CSS", category: "Frontend", icon: SiHtml5 },

  // Backend Development
  { name: "Node.js", category: "Backend", icon: SiNodedotjs },
  { name: "Express.js", category: "Backend", icon: SiExpress },
  { name: "Python", category: "Backend", icon: SiPython },
  { name: "Django", category: "Backend", icon: SiDjango },

  // Database
  { name: "MongoDB", category: "Database", icon: SiMongodb },
  { name: "MySQL", category: "Database", icon: SiMysql },
  { name: "SQL", category: "Database", icon: SiPostgresql },

  // Mobile Development
  { name: "Android (Java)", category: "Mobile", icon: SiAndroid },
  { name: "Kotlin", category: "Mobile", icon: SiKotlin },

  // Cybersecurity
  { name: "Penetration Testing", category: "Security", icon: FaShieldAlt },
  { name: "Vulnerability Assessment", category: "Security", icon: FaShieldAlt },
  { name: "Bug Bounty", category: "Security", icon: FaBug },

  // Tools & Others
  { name: "Git/GitHub", category: "Tools", icon: SiGit },
  { name: "VS Code", category: "Tools", icon: FaTools },
  { name: "Framer Motion", category: "Tools", icon: SiFramer },
  { name: "GSAP", category: "Tools", icon: SiGreensock },
]

const categories = [
  { name: "Frontend", icon: SiReact },
  { name: "Backend", icon: SiNodedotjs },
  { name: "Database", icon: SiMongodb },
  { name: "Mobile", icon: SiAndroid },
  { name: "Security", icon: FaShieldAlt },
  { name: "Tools", icon: SiGit },
]

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 }) // Adjusted amount for better mobile visibility

  return (
    <section id="skills" className="py-16 px-4 sm:px-8 md:px-16 lg:px-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl z-0" />
      </div>

      <div className="container mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across various domains
          </p>
        </motion.div>

        {/* Skills Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {categories.map((category) => {
            const categorySkills = skills.filter((skill) => skill.category === category.name)

            return (
              <div key={category.name} className="mb-8">
                <h3 className="text-lg font-semibold text-center mb-4">
                  {category.name}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {categorySkills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.1 }}
                      className="glass-effect p-4 rounded-xl text-center group hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex justify-center mb-2">
                        <skill.icon className="w-10 h-10 text-accent" />
                      </div>

                      <h4 className="font-semibold text-text group-hover:text-accent transition-colors duration-300 text-sm">
                        {skill.name}
                      </h4>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
