"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  // Blink cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  // Simulate loading and typing effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 1500)

    const typingTimer = setTimeout(() => {
      setTypingComplete(true)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearTimeout(typingTimer)
    }
  }, [])

  const handleBackToHome = () => {
    router.push("/")
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key == "Enter") {
        handleBackToHome()
      }
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }

  }, [router])

  return (
    <div className="min-h-screen bg-black text-amber-400 p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        {!loaded ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center">
              <p>Loading PROFILE.SYS...</p>
              <div className="mt-4 flex space-x-1">
                <div className={`h-4 w-4 bg-amber-400 ${cursorVisible ? "opacity-100" : "opacity-0"}`}></div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="text-center text-green-500 mb-6">
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight">ABOUT.EXE</h1>
              <div className="text-xs md:text-sm mt-1">v1.0.0 - MOHAMED ATTIG PROFILE</div>
            </div>

            {/* Name and Title */}
            <div className="dos-box mb-6 text-cyan-400">
              <div className="dos-box-title">PROFILE</div>
              <div className="dos-box-content">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold">MOHAMED ATTIG</div>
                  <div className="text-sm md:text-base">FULL STACK DEVELOPER</div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="dos-box mb-4">
              <div className="dos-box-title">CONTACT</div>
              <div className="dos-box-content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <span className="text-green-400">&gt; EMAIL:</span> attigmohammed@gmail.com
                  </div>
                  <div>
                    <span className="text-green-400">&gt; LINKEDIN:</span> www.linkedin.com/in/mohamed-attig
                  </div>
                  <div>
                    <span className="text-green-400">&gt; LOCATION:</span> Sousse, Tunisia
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="dos-box mb-4">
              <div className="dos-box-title">SKILLS</div>
              <div className="dos-box-content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <span className="text-green-400">&gt; FRONTEND:</span> React.js, NextJs
                  </div>
                  <div>
                    <span className="text-green-400">&gt; BACKEND:</span> Node.js, NestJS, Django, FastAPI
                  </div>
                  <div>
                    <span className="text-green-400">&gt; AI/ML:</span> OpenAI API, LLMs, LangChain
                  </div>
                  <div>
                    <span className="text-green-400">&gt; DEVOPS:</span> Docker, Microservices, Github Actions
                  </div>
                  <div>
                    <span className="text-green-400">&gt; LANGUAGES:</span> JavaScript, TypeScript, Python
                  </div>
                  <div>
                    <span className="text-green-400">&gt; HUMAN:</span> Arabic (Native), English (Professional), French (Professional)
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="dos-box mb-4">
              <div className="dos-box-title">SUMMARY</div>
              <div className="dos-box-content">
                <p>
                  Experienced Full Stack Developer with expertise in NextJs/React, Django, FastAPI Proven track record in
                  delivering scalable web applications and AI-powered solutions for international clients. Skilled in
                  collaborating with cross-functional teams to create innovative, user-focused platforms.
                </p>
              </div>
            </div>

            {/* Experience */}
            <div className="dos-box mb-4">
              <div className="dos-box-title">EXPERIENCE</div>
              <div className="dos-box-content">
                <div className="mb-3">
                  <div className="text-green-400 font-bold">&gt; DRAGONFLY (June 2024 - Present)</div>
                  <div className="ml-4">Full Stack Developer</div>
                  <div className="ml-4 text-sm">
                    Building a collaborative, multi-LLM platform with API-first approach
                  </div>
                  <div className="ml-4 text-sm">Worked with Next.js, FastAPI and LangChain</div>
                </div>

                <div className="mb-3">
                  <div className="text-green-400 font-bold">&gt; QUICKTEXT (September 2023 - June 2024)</div>
                  <div className="ml-4">Full Stack Developer</div>
                  <div className="ml-4 text-sm">Developed chatbots with Nest.js & Microsoft Bot Framework</div>
                  <div className="ml-4 text-sm">Worked with FastAPI and LangChain</div>
                </div>

                <div className="mb-3">
                  <div className="text-green-400 font-bold">&gt; UBIAI (January 2023 - September 2023)</div>
                  <div className="ml-4">Full Stack Developer</div>
                  <div className="ml-4 text-sm">Maintained React.Js app and Django/Prefect, FastAPI microservices</div>
                  <div className="ml-4 text-sm">Implemented feature for executing code from the front-end</div>
                </div>

                <div className="mb-3">
                  <div className="text-green-400 font-bold">&gt; SATORIPOP (January 2023 - June 2023)</div>
                  <div className="ml-4">Full Stack Developer Intern</div>
                  <div className="ml-4 text-sm">
                    Built Notification Center CRM with NestJs, React, Redis, and Docker
                  </div>
                </div>

                <div>
                  <div className="text-green-400 font-bold">&gt; SASTEC GROUP (December 2021 - August 2022)</div>
                  <div className="ml-4">Full Stack Developer</div>
                  <div className="ml-4 text-sm">
                    Developed with ExpressJS, Django, React, and IoT integration
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="dos-box mb-6">
              <div className="dos-box-title">EDUCATION</div>
              <div className="dos-box-content">
                <div className="mb-2">
                  <div className="text-green-400 font-bold">&gt; ISITCOM SOUSSE (October 2020 - June 2023)</div>
                  <div className="ml-4">Bachelor's degree, Computer Science</div>
                </div>

                <div>
                  <div className="text-green-400 font-bold">&gt; LYCÉE DES JEUNES FILLES (2015 - 2020)</div>
                  <div className="ml-4">Baccalauréat</div>
                </div>
              </div>
            </div>

            {/* Command Prompt */}
            <div className="mt-6 text-gray-300">
              {typingComplete ? (
                <div className="flex items-center">
                  <span>C:\\ABOUT&gt; </span>
                  <button
                    onClick={handleBackToHome}
                    className="ml-2 text-green-400 hover:text-green-300 focus:outline-none"
                  >
                    cd ..
                  </button>
                  <span className={`h-4 w-2 bg-gray-300 ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"}`}></span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>C:\\ABOUT&gt; type PROFILE.TXT</span>
                  <span className={`h-4 w-2 bg-gray-300 ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"}`}></span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

