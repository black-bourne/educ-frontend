"use client"
import { useEffect, useState } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-20">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/img.png" alt="Asterias Logo" width={40} height={40} />
            <span className="text-xl font-bold text-[#4DB6AC]">Asterias Academy</span>
          </Link>
          <nav>
            <ul className="flex gap-4 items-center">
              <li>
                <a href="#about" className="text-[#1E3A8A] hover:text-[#4DB6AC]">
                  About
                </a>
              </li>
              <li>
                <a href="#programs" className="text-[#1E3A8A] hover:text-[#4DB6AC]">
                  Programs
                </a>
              </li>
              <li>
                <a href="#news" className="text-[#1E3A8A] hover:text-[#4DB6AC]">
                  News
                </a>
              </li>
              <li>
                <a href="#highlights" className="text-[#1E3A8A] hover:text-[#4DB6AC]">
                  Highlights
                </a>
              </li>
              <li>
                <Link
                  href="/login"
                  className="bg-[#4DB6AC] text-white px-4 py-2 rounded hover:bg-[#26A69A]"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen bg-gradient-to-b from-[#1E3A8A] via-[#3B0764] to-[#1E3A8A] overflow-hidden pt-16"
      >
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: { value: 'transparent' } },
            particles: {
              number: { value: 60 },
              color: { value: '#4DB6AC' },
              shape: { type: 'star' },
              move: { speed: 0.7 },
              size: { value: 2 },
            },
          }}
        />
        <div
          className="constellation-dot"
          style={{ top: mousePos.y - 10, left: mousePos.x - 10 }}
        ></div>
        <div
          className="constellation-dot"
          style={{ top: mousePos.y + 10, left: mousePos.x + 10 }}
        ></div>
        <div className="orb absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5"></div>
        <div className="wave absolute bottom-0 left-0 right-0 h-20 bg-[#4DB6AC] opacity-20"></div>
        <div className="wave absolute bottom-0 left-0 right-0 h-20 bg-[#4DB6AC] opacity-10 delay-200"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white z-10 bg-black bg-opacity-40">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-wide">
              Discover Excellence at Asterias Academy
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Empowering Teachers and Students for Tomorrow
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/login"
                className="bg-[#4DB6AC] text-white px-6 py-3 rounded-lg hover:bg-[#26A69A]"
              >
                Login
              </Link>
              <a
                href="#about"
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-[#4DB6AC]"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#1E3A8A]">
            About Asterias Academy
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Asterias Academy is a private institution dedicated to fostering a community of
            educators and learners. We provide innovative programs and exclusive opportunities
            to shape the future of education.
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 bg-[#F5F5F5]" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#1E3A8A]">
            Our Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="program-card bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-2">
                Research Opportunities
              </h3>
              <p className="text-gray-700">
                Engage in groundbreaking research projects with our faculty.
              </p>
            </div>
            <div className="program-card bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-2">School News Room</h3>
              <p className="text-gray-700">
                Stay informed with the latest updates and announcements.
              </p>
            </div>
            <div className="program-card bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-2">
                Interschool Challenges
              </h3>
              <p className="text-gray-700">
                Participate in competitions that inspire collaboration and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-16 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#1E3A8A]">Latest News</h2>
          <p className="text-gray-700">Latest News Coming Soon...</p>
        </div>
      </section>

      {/* Galactic Highlights Section */}
      <section id="highlights" className="py-16 bg-[#F5F5F5]" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#1E3A8A]">
            Galactic Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="highlight-card bg-[#1E3A8A] text-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">Stellar Research</h3>
              <p>Our faculty’s work shines bright in global journals.</p>
            </div>
            <div className="highlight-card bg-[#1E3A8A] text-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">Orbit of Innovation</h3>
              <p>Students lead with award-winning projects.</p>
            </div>
            <div className="highlight-card bg-[#1E3A8A] text-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">Cosmic Community</h3>
              <p>A network of brilliance connecting educators worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E3A8A] text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Asterias Academy. All rights reserved.</p>
          <div className="mt-2">
            <a href="/terms" className="text-gray-300 hover:text-[#4DB6AC] mx-2">
              Terms of Service
            </a>
            <a href="/privacy" className="text-gray-300 hover:text-[#4DB6AC] mx-2">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}