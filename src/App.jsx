import React, { useEffect, useRef, useState } from 'react';
import {
  FaGithub, FaLinkedin, FaWhatsapp, FaInstagram, FaEnvelope,
  FaHtml5, FaCss3Alt, FaReact, FaLaravel, FaDownload, FaBars,
  FaTimes, FaMapMarkerAlt, FaGraduationCap, FaCode, FaArrowRight,
  FaChevronUp, FaBriefcase
} from 'react-icons/fa';
import { DiJavascript1, DiPhp, DiJava, DiPostgresql, DiMysql } from 'react-icons/di';
import { BsBootstrap } from 'react-icons/bs';
import fotoProfil from './assets/foto-rafif.png';

// ─────────────────────────────────────────────
// Hook: Intersection Observer
// ─────────────────────────────────────────────
function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─────────────────────────────────────────────
// Hook: Typing effect
// ─────────────────────────────────────────────
function useTyping(words, speed = 90, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2.5 : speed;
    const t = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) { setText(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }
        else setTimeout(() => setDeleting(true), pause);
      } else {
        if (charIdx > 0) { setText(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }
        else { setDeleting(false); setWordIdx(i => (i + 1) % words.length); }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return text;
}

// ─────────────────────────────────────────────
// Section reveal wrapper
// ─────────────────────────────────────────────
function Section({ children, className = '', delay = 0, id }) {
  const [ref, visible] = useReveal();
  return (
    <div
      id={id}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// Section heading
// ─────────────────────────────────────────────
function SectionHead({ num, title, sub }) {
  return (
    <div className="text-center mb-5 md:mb-8">
      <span className="block text-[10px] font-black tracking-[0.3em] mb-1" style={{ color: '#d4a017' }}>{num}</span>
      <h2 className="font-display text-xl sm:text-3xl font-bold text-white">{title}</h2>
      {sub && <p className="text-gray-500 text-xs mt-1.5">{sub}</p>}
      <div className="flex items-center justify-center gap-2 mt-3">
        <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, #d4a017)' }} />
        <div className="w-1 h-1 rounded-full" style={{ background: '#d4a017' }} />
        <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, #d4a017)' }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main App
// ─────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const typedText = useTyping(['Informatics Student', 'Tech Enthusiast', 'Web Developer']);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const skills = [
    { name: 'HTML',       icon: <FaHtml5 />,       color: '#f97316' },
    { name: 'CSS',        icon: <FaCss3Alt />,      color: '#3b82f6' },
    { name: 'Javascript', icon: <DiJavascript1 />,  color: '#facc15' },
    { name: 'PHP',        icon: <DiPhp />,          color: '#818cf8' },
    { name: 'React',      icon: <FaReact />,        color: '#22d3ee' },
    { name: 'Laravel',    icon: <FaLaravel />,      color: '#ef4444' },
    { name: 'Java',       icon: <DiJava />,         color: '#fb923c' },
    { name: 'MySQL',      icon: <DiMysql />,        color: '#60a5fa' },
    { name: 'PostgreSQL', icon: <DiPostgresql />,   color: '#7dd3fc' },
    { name: 'Bootstrap',  icon: <BsBootstrap />,    color: '#a855f7' },
  ];

  const education = [
    { school: 'SDN 163081 Tebing Tinggi',   info: null,                                    year: '2017',          highlight: false },
    { school: 'SMP Swasta F.Tandean Tebing Tinggi',        info: null,                year: '2020',          highlight: false },
    { school: 'SMKN 4 Tebing Tinggi',        info: 'Multimedia · Student Council President',year: '2023',          highlight: false },
    { school: 'Politeknik Negeri Medan',     info: 'Teknologi Rekayasa Perangkat Lunak',    year: '2023 – Present',highlight: true  },
  ];

  const contacts = [
    {
      icon: <FaWhatsapp />,
      label: 'Whatsapp',
      value: '0821-8806-1152',
      accent: '#22c55e', // Hijau
      // Gunakan wa.me untuk link WhatsApp langsung (tanpa angka 0 di depan, diganti kode negara 62)
      href: 'https://wa.me/6282188061152', 
    },
    {
      icon: <FaInstagram />,
      label: 'Instagram',
      value: '@mhd.rapippp',
      accent: '#ec4899', // Pink
      // Link langsung ke profil Instagram
      href: 'https://instagram.com/mhd.rapippp', 
    },
    {
      icon: <FaEnvelope />,
      label: 'E-Mail',
      value: 'rafifalfathan12@gmail.com',
      accent: '#f59e0b', // Kuning/Orange (kalau kamu mau merah bisa pakai #ef4444)
      href: 'mailto:rafifalfathan12@gmail.com',
    },
  ];

  const navLinks = [
    { label: 'Home',      href: '#home' },
    { label: 'About',     href: '#about' },
    { label: 'Skills',    href: '#skills' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact',   href: '#contact' },
  ];

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) {
      const offset = 64; // navbar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };
  const glass = 'bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)] rounded-2xl';

  return (
    <>
      {/* ── Global Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Clash+Display:wght@600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        html { scroll-behavior: smooth; }
        body { background: #080810; margin: 0; }

        .font-display { font-family: 'Clash Display', 'Syne', sans-serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        @keyframes twinkle     { 0%,100%{opacity:0;transform:scale(0.8)} 50%{opacity:.6;transform:scale(1.2)} }
        @keyframes floatY      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes spinSlow    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes gradShift   { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes slideDown   { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp      { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        .gold-text {
          background: linear-gradient(120deg, #d4a017, #f5c842, #b8952a, #e8c547);
          background-size: 300% 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradShift 4s ease infinite;
        }
        .gold-btn {
          background: linear-gradient(135deg, #b8952a, #d4a017, #f5c842);
          background-size: 200% 200%;
          animation: gradShift 3s ease infinite;
        }
        .gold-btn:active { transform: scale(0.97); }
        .cursor-blink { animation: blink 1s step-end infinite; }
        .react-spin   { animation: spinSlow 10s linear infinite; }

        .nav-link { position: relative; }
        .nav-link::after {
          content:''; position:absolute; bottom:-2px; left:0; right:0;
          height:1.5px; background:#d4a017;
          transform:scaleX(0); transition:transform .25s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after { transform:scaleX(1); }

        /* mobile menu slide */
        .mobile-menu { animation: slideDown .2s ease; }

        /* skill card */
        .skill-card { transition: transform .25s ease, box-shadow .25s ease; }
        .skill-card:active { transform: scale(0.95); }
        @media (hover:hover) {
          .skill-card:hover { transform: translateY(-6px); }
        }

        /* edu card hover */
        .edu-card { transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease; }
        @media (hover:hover) {
          .edu-card:hover {
            transform: translateY(-4px);
            border-color: rgba(212,160,23,.45) !important;
            box-shadow: 0 16px 36px rgba(184,149,42,.15);
          }
        }

        /* contact card */
        .contact-card { transition: transform .25s ease, box-shadow .25s ease; }
        .contact-card:active { transform: scale(0.98); }
        @media (hover:hover) {
          .contact-card:hover { transform: translateX(6px); }
        }

        .orb {
          position:absolute; border-radius:50%;
          filter:blur(90px); pointer-events:none; z-index:0;
        }

        /* photo gradient frame */
        .photo-frame {
          position:relative;
          border-radius: 24px;
          padding: 3px;
          background: linear-gradient(145deg, #f5c842, #b8952a, #3b2a08, #b8952a, #f5c842);
          background-size: 300% 300%;
          animation: gradShift 5s ease infinite;
          box-shadow:
            0 0 40px rgba(184,149,42,0.35),
            0 0 80px rgba(184,149,42,0.12);
        }
        .photo-inner {
          border-radius: 22px;
          overflow: hidden;
          background: linear-gradient(160deg, #1a1209 0%, #0f0b04 40%, #0a0810 100%);
        }

        /* timeline */
        .timeline-line {
          background: linear-gradient(to bottom, transparent 0%, #d4a017 30%, #d4a017 70%, transparent 100%);
        }
      `}</style>

      <div className="relative min-h-screen text-white font-body overflow-x-hidden" style={{ background: '#080810' }}>

        {/* ── Background Orbs ── */}
        <div className="orb" style={{ width:500, height:500, background:'rgba(184,149,42,0.10)', top:'-10%', left:'-20%' }} />
        <div className="orb" style={{ width:600, height:600, background:'rgba(30,58,138,0.10)', bottom:'5%', right:'-25%' }} />
        <div className="orb" style={{ width:300, height:300, background:'rgba(88,28,135,0.08)', top:'50%', left:'30%' }} />

        {/* ── Stars ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="absolute rounded-full bg-white" style={{
              left:`${Math.random()*100}%`, top:`${Math.random()*100}%`,
              width:`${Math.random()*1.8+0.4}px`, height:`${Math.random()*1.8+0.4}px`,
              animation:`twinkle ${Math.random()*3+2}s ${Math.random()*5}s ease-in-out infinite`,
            }} />
          ))}
        </div>

        {/* ══════════════════════════════════════
            NAVBAR
        ══════════════════════════════════════ */}
        <nav
          className="sticky top-0 z-50 transition-all duration-400"
          style={{
            background: scrolled ? 'rgba(8,8,16,0.88)' : 'transparent',
            backdropFilter: scrolled ? 'blur(18px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
            {/* Logo */}
            <div className="font-display text-lg sm:text-xl gold-text font-bold tracking-wide">
              mhd.rapippp();
            </div>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-7 text-[13px] text-gray-300">
              {navLinks.map(({ label, href }) => (
                <li
                  key={label}
                  className="nav-link cursor-pointer hover:text-white transition-colors pb-1"
                  onClick={() => scrollTo(href)}
                >{label}</li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <a href="#" className="text-xl text-gray-400 hover:text-amber-400 transition-all hover:scale-110">
                <FaGithub />
              </a>
              <button
                className="md:hidden p-1.5 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className={`mobile-menu md:hidden px-4 pb-4 border-t border-white/8 ${glass} mx-3 mb-2 rounded-xl`}>
              {navLinks.map(({ label, href }) => (
                <div
                  key={label}
                  className="py-3 px-1 text-gray-300 hover:text-amber-400 cursor-pointer transition-colors text-sm font-medium border-b border-white/5 last:border-0"
                  onClick={() => scrollTo(href)}
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </nav>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

          {/* ══════════════════════════════════════
              HERO
          ══════════════════════════════════════ */}
          <section id="home" className="min-h-0 flex flex-col items-center justify-center gap-5 pt-4 pb-8
                              md:min-h-[90vh] md:flex-row md:justify-between md:pt-0 md:gap-8">

            {/* ── Photo (top on mobile, right on desktop) ── */}
            <div
              className="flex-shrink-0 order-first md:order-last"
              style={{ animation: 'fadeUp .8s .1s ease both' }}
            >
              {/* Gradient frame — clean, no stars */}
              <div className="photo-frame" style={{ width: 'clamp(140px, 38vw, 220px)', height: 'clamp(175px, 47vw, 280px)' }}>
                <div className="photo-inner w-full h-full">
                  <img
                    src={fotoProfil}
                    alt="Muhammad Rafif Alfathan"
                    className="w-full h-full object-cover object-top"
                    style={{ display: 'block' }}
                  />
                </div>
              </div>

              {/* Open to Work badge */}
              <div
                className="mt-3 mx-auto flex items-center justify-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold text-black w-fit"
                style={{ background: 'linear-gradient(135deg, #d4a017, #f5c842)', boxShadow: '0 4px 16px rgba(184,149,42,.4)' }}
              >
                <FaBriefcase size={10} />
                Open to Work
              </div>
            </div>

            {/* ── Text ── */}
            <div
              className="flex-1 flex flex-col items-center text-center md:items-start md:text-left space-y-4"
              style={{ animation: 'fadeUp .8s ease both' }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-[1.5px]" style={{ background: '#d4a017' }} />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: '#d4a017' }}>
                  Hello World, i'm
                </span>
              </div>

              <h1 className="font-display font-bold leading-[1.05]" style={{ fontSize: 'clamp(2rem, 10vw, 3.8rem)' }}>
                Muhammad<br />
                <span className="gold-text">Rafif</span>{' '}Alfathan
              </h1>

              {/* Typing */}
              <div className="text-base sm:text-lg font-medium text-gray-300 h-7 flex items-center gap-1">
                <span>{typedText}</span>
                <span className="cursor-blink text-amber-400 font-light">|</span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Passionate about crafting elegant web experiences.
                Currently studying at Politeknik Negeri Medan.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-1">
                <button className="gold-btn flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-black transition-all hover:-translate-y-1 active:scale-95"
                  style={{ boxShadow: '0 8px 24px rgba(184,149,42,.35)' }}>
                  <FaDownload size={12} /> Download CV
                </button>
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold border border-white/15 text-gray-300 hover:border-amber-400/50 hover:text-amber-400 transition-all hover:-translate-y-1 active:scale-95"
                >
                  <FaLinkedin style={{ color: '#0A66C2' }} size={14} /> LinkedIn
                </a>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              ABOUT
          ══════════════════════════════════════ */}
          <Section id="about" className="mt-8 md:mt-20">
            <div className={`p-5 md:p-9 ${glass}`} style={{ borderLeft: '3px solid #d4a017' }}>
              <div className="flex flex-col md:flex-row gap-7">
                <div className="md:w-1/3">
                  <span className="text-[10px] font-black tracking-[0.25em]" style={{ color: '#d4a017' }}>01.</span>
                  <h2 className="font-display text-xl font-bold mt-0.5 text-white">About</h2>
                  <div className="mt-2 h-[2px] w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
                </div>
                <div className="md:w-2/3 space-y-4">
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Hi everyone! My name is{' '}
                    <span className="text-amber-400 font-semibold">Muhammad Rafif Alfathan</span>,
                    from Tebing Tinggi, North Sumatra. I am currently a student at{' '}
                    <span className="text-amber-400 font-semibold">Politeknik Negeri Medan</span>,
                    majoring in Computer Engineering and Informatics.
                    I really enjoy the process of learning and developing my skills in this field.
                  </p>

                  {/* Info chips */}
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {[
                      { icon: <FaGraduationCap size={13} />, text: 'Politeknik Negeri Medan' },
                      { icon: <FaMapMarkerAlt size={12} />, text: 'Tebing Tinggi, N. Sumatra' },
                      { icon: <FaCode size={12} />, text: 'Web Developer' },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-center gap-1.5 text-[12px] text-gray-400 bg-white/5 border border-white/8 rounded-full px-3 py-1.5">
                        <span style={{ color: '#d4a017' }}>{icon}</span>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* ══════════════════════════════════════
              SKILLS
          ══════════════════════════════════════ */}
          <Section id="skills" className="mt-8 md:mt-20">
            <SectionHead num="02." title={<>Skills <span className="text-gray-500 text-lg font-normal">(Learning)</span></>} />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {skills.map((s, i) => (
                <div
                  key={i}
                  className={`skill-card group flex flex-col items-center gap-2.5 py-5 px-3 ${glass} cursor-pointer`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = `0 16px 36px ${s.color}28, 0 0 0 1px ${s.color}30`}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
                >
                  <span
                    className="text-[2.2rem] transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6"
                    style={{ color: s.color, filter: `drop-shadow(0 0 8px ${s.color}60)` }}
                  >
                    {s.icon}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-400 group-hover:text-white transition-colors text-center leading-tight">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          {/* ══════════════════════════════════════
              PORTFOLIO
          ══════════════════════════════════════ */}
          <Section id="portfolio" className="mt-8 md:mt-20">
            <SectionHead
              num="03."
              title="Past Project Experience"
              sub="Explore the projects i've worked on so far"
            />

            <div
              className={`w-full py-10 md:py-16 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl ${glass}`}
              style={{ borderColor: 'rgba(212,160,23,.2)' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'rgba(212,160,23,.1)', border: '1px solid rgba(212,160,23,.25)' }}
              >
                <FaCode style={{ color: '#d4a017' }} size={18} />
              </div>
              <p className="font-bold text-sm" style={{ color: '#d4a017' }}>Coming Soon</p>
              <p className="text-xs text-gray-500 mt-1">Project-project terbaik segera hadir di sini.</p>
            </div>
          </Section>

          {/* ══════════════════════════════════════
              EDUCATION
          ══════════════════════════════════════ */}
          <Section id="education" className="mt-8 md:mt-20">
            <SectionHead num="04." title="Education & Experience" />

            <div className="relative">
              {/* Vertical timeline line */}
              <div
                className="timeline-line absolute top-0 bottom-0 w-px z-0"
                style={{ left: 14, /* mobile */ }}
              />
              <div
                className="timeline-line hidden md:block absolute top-0 bottom-0 w-px z-0"
                style={{ left: '50%', transform: 'translateX(-50%)' }}
              />

              <div className="space-y-5">
                {education.map((edu, i) => (
                  <div key={i} className={`relative flex pl-10 md:pl-0 ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                    {/* Dot — mobile */}
                    <div
                      className="md:hidden absolute left-[9px] top-5 w-3.5 h-3.5 rounded-full border-2 z-10"
                      style={{
                        background: edu.highlight ? '#d4a017' : '#080810',
                        borderColor: '#d4a017',
                        boxShadow: edu.highlight ? '0 0 10px rgba(212,160,23,.6)' : 'none',
                      }}
                    />
                    {/* Dot — desktop */}
                    <div
                      className="hidden md:block absolute left-1/2 top-5 w-4 h-4 rounded-full border-2 z-10"
                      style={{
                        transform: 'translateX(-50%)',
                        background: edu.highlight ? '#d4a017' : '#080810',
                        borderColor: '#d4a017',
                        boxShadow: edu.highlight ? '0 0 12px rgba(212,160,23,.6)' : 'none',
                      }}
                    />

                    <div
                      className={`edu-card ${glass} p-4 md:p-5 w-full md:w-5/12`}
                      style={{ borderColor: edu.highlight ? 'rgba(212,160,23,.3)' : undefined }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3
                            className={`font-display font-bold text-sm leading-snug ${edu.highlight ? 'text-amber-400' : 'text-white'}`}
                          >
                            {edu.school}
                          </h3>
                          {edu.info && (
                            <p className="text-gray-400 text-xs mt-1">{edu.info}</p>
                          )}
                        </div>
                        <span
                          className="flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap"
                          style={{
                            background: edu.highlight ? 'rgba(212,160,23,.15)' : 'rgba(255,255,255,.05)',
                            color: edu.highlight ? '#d4a017' : '#6b7280',
                          }}
                        >
                          {edu.year}
                        </span>
                      </div>
                      {edu.highlight && (
                        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold" style={{ color: '#d4a017' }}>
                          <FaGraduationCap size={10} />
                          <span>Current</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ══════════════════════════════════════
              CONTACT
          ══════════════════════════════════════ */}
          <Section id="contact" className="mt-8 md:mt-20 mb-12 md:mb-20">
            <SectionHead
              num="05."
              title="Let's Connect"
              sub="Feel free to reach out anytime!"
            />

            <div className={`max-w-lg mx-auto p-5 md:p-7 ${glass} space-y-3`}
              style={{ borderColor: 'rgba(212,160,23,.18)' }}>
              {contacts.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  className={`contact-card group flex items-center gap-4 p-4 rounded-xl border cursor-pointer no-underline
                             transition-all duration-300`}
                  style={{
                    borderColor: 'rgba(255,255,255,0.07)',
                    background: 'rgba(255,255,255,0.025)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${c.accent}50`;
                    e.currentTarget.style.background = `${c.accent}10`;
                    e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,.25)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${c.accent}18`, color: c.accent }}
                  >
                    {c.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-white text-sm">{c.label}</p>
                    <p className="text-gray-400 text-xs mt-0.5 truncate">{c.value}</p>
                  </div>
                  <FaArrowRight className="ml-auto text-gray-600 group-hover:text-gray-300 transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" size={13} />
                </a>
              ))}
            </div>
          </Section>
        </main>

        {/* ── Footer ── */}
        <footer className="relative z-10 text-center py-7 border-t border-white/5">
          <p className="text-gray-600 text-[11px]">
            © 2026{' '}
            <span style={{ color: '#d4a017' }}>Muhammad Rafif Alfathan</span>
            {' '}· Built with React 
          </p>
        </footer>

        {/* ── Scroll to top ── */}
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-5 right-4 w-9 h-9 rounded-full text-black font-bold text-sm z-50 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #b8952a, #f5c842)',
              boxShadow: '0 4px 18px rgba(184,149,42,.5)',
              animation: 'fadeUp .3s ease',
            }}
          >
            <FaChevronUp size={13} />
          </button>
        )}
      </div>
    </>
  );
}