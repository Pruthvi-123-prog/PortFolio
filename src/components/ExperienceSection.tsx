'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin, Award, BookOpen, Code, Trophy, Target } from 'lucide-react'

interface TimelineItem {
  id: number
  type: 'education' | 'achievement' | 'project' | 'certification'
  date: string
  title: string
  subtitle: string
  description: string
  location: string
  highlights: string[]
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: 'education',
    date: '2022 - 2026',
    title: 'B.E in Computer Science Engineering',
    subtitle: 'Sri Devi Institute of Technology',
    description: 'Currently pursuing my undergraduate degree with a focus on software engineering, cybersecurity, and emerging technologies.',
    location: 'Mangalore, Karnataka',
    highlights: ['CGPA: 8.65', 'Active in tech communities', 'Consistent academic performance'],
    icon: BookOpen
  },
  {
    id: 2,
    type: 'achievement',
    date: 'April 2025',
    title: 'Winner - Code Breakers Challenge',
    subtitle: 'YENIXA 2.0 National Intercollegiate Fest',
    description: 'Secured 1st/2nd place in the Code Breakers Challenge, demonstrating exceptional problem-solving and programming skills.',
    location: 'Yenepoya Institute',
    highlights: ['National level competition', '100+ participants', 'Problem solving excellence'],
    icon: Trophy
  },
  {
    id: 3,
    type: 'project',
    date: 'April 2025',
    title: 'Project Exhibition - Crime Analysis System',
    subtitle: 'I2CONECCT-2025',
    description: 'Presented comprehensive crime analysis platform featuring interactive maps and real-time data visualization.',
    location: 'MITE Moodbidri',
    highlights: ['IEEE supported event', 'Live demonstration', 'Positive feedback from experts'],
    icon: Code
  },
  {
    id: 4,
    type: 'achievement',
    date: 'May 2025',
    title: 'HackSummit 2025 Participant',
    subtitle: 'P.A. College of Engineering',
    description: 'Participated in intensive hackathon focusing on innovative solutions and rapid prototyping.',
    location: 'Mangalore, Karnataka',
    highlights: ['24-hour hackathon', 'Team collaboration', 'Innovation in tech solutions'],
    icon: Code
  },
  {
    id: 5,
    type: 'certification',
    date: '2024',
    title: 'REST API & DB Integration Workshop',
    subtitle: 'IEEE Bangalore Section & CodeZyng',
    description: 'Successfully completed comprehensive workshop on REST API development and database integration using Node.js and Express.',
    location: 'Sahyadri College of Engineering',
    highlights: ['IEEE certified', 'Hands-on experience', 'Industry best practices'],
    icon: Award
  },
  {
    id: 6,
    type: 'education',
    date: '2020 - 2022',
    title: 'Pre-University Education (PCMB)',
    subtitle: 'Govt PU College Thirthahalli',
    description: 'Completed pre-university education with Physics, Chemistry, Mathematics, and Biology with excellent academic performance.',
    location: 'Thirthahalli, Karnataka',
    highlights: ['83% aggregate', 'Strong foundation in sciences', 'Leadership roles in college'],
    icon: BookOpen
  },
  {
    id: 7,
    type: 'education',
    date: '2017 - 2020',
    title: 'Secondary Education (Class 10th)',
    subtitle: 'Dr. U R Ananthamurthy Govt High School',
    description: 'Completed secondary education with outstanding academic performance, laying strong foundation for technical studies.',
    location: 'Thirthahalli, Karnataka',
    highlights: ['92% aggregate', 'Academic excellence', 'Active in school activities'],
    icon: BookOpen
  }
]

export default function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'bg-primary-500/20 text-primary-500 border-primary-500/30'
      case 'achievement':
        return 'bg-accent/20 text-accent border-accent/30'
      case 'project':
        return 'bg-accent/20 text-accent border-accent/30'
      case 'certification':
        return 'bg-primary-500/20 text-primary-500 border-primary-500/30'
      default:
        return 'bg-neutral-400/20 text-neutral-400 border-neutral-400/30'
    }
  }

  // const getTypeIcon = (type: string) => {
  //   switch (type) {
  //     case 'education':
  //       return GraduationCap
  //     case 'achievement':
  //       return Trophy
  //     case 'project':
  //       return Code
  //     case 'certification':
  //       return Award
  //     default:
  //       return Calendar
  //   }
  // }

  return (
    <section id="experience-section" className="py-20 bg-background relative overflow-visible w-full block">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Experience & Timeline
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            My academic journey, achievements, and key milestones that shaped my technical expertise
          </p>
        </motion.div>

        {/* Timeline Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: 'Years of Study', value: '8+', icon: BookOpen },
            { label: 'Achievements', value: '5+', icon: Trophy },
            { label: 'Projects', value: '8+', icon: Code },
            { label: 'Current CGPA', value: '8.65', icon: Target }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="glass-effect p-6 rounded-xl text-center group hover:bg-accent/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-accent mb-1 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-primary-500 to-accent transform -translate-x-px" />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:gap-8`}
              >
                {/* Timeline Node - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 w-4 h-4 bg-accent rounded-full transform -translate-x-2 z-10">
                  <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 md:ml-0 ${index % 2 === 0 ? '' : 'md:mr-0'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-effect p-6 rounded-xl group hover:bg-accent/5 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${getTypeColor(item.type)} rounded-lg border flex items-center justify-center`}>
                          <item.icon size={20} />
                        </div>
                        <div>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full mb-2 ${
                            item.type === 'education' ? 'bg-primary-500/20 text-primary-500' :
                            item.type === 'achievement' ? 'bg-accent/20 text-accent' :
                            item.type === 'project' ? 'bg-accent/20 text-accent' :
                            'bg-accent/20 text-accent'
                          }`}>
                            {item.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-accent text-sm mb-1">
                          <Calendar size={14} />
                          {item.date}
                        </div>
                        <div className="flex items-center gap-1 text-text-muted text-sm">
                          <MapPin size={14} />
                          {item.location}
                        </div>
                      </div>
                    </div>

                    {/* Title and Subtitle */}
                    <h3 className="text-xl font-bold text-text mb-2 group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-accent font-semibold mb-3">
                      {item.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-text-muted mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-text">Key Highlights:</h4>
                      <ul className="space-y-1">
                        {item.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-text-muted">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-text-muted mb-6">
            Interested in my academic journey or want to know more about my projects?
          </p>
          <a
            href="/PRUTHVI SUVARNA RESUME.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-background font-semibold rounded-lg hover:bg-accent-dark transition-all duration-300 hover:scale-105"
          >
            <BookOpen size={18} />
            Download Full Resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}
