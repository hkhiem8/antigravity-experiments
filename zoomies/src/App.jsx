import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Fingerprint, Mic, MapPin, Activity, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------
// A. NAVBAR
// ----------------------------------------------------------------------
const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
          targets: navRef.current,
          className: 'scrolled'
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 rounded-full px-6 py-3 flex items-center gap-8 text-white w-[90%] max-w-5xl
      [&.scrolled]:bg-background/80 [&.scrolled]:backdrop-blur-xl [&.scrolled]:text-textDark [&.scrolled]:border [&.scrolled]:border-textDark/10 [&.scrolled]:shadow-lg"
    >
      <div className="font-sans font-bold tracking-tight text-xl mr-auto">ZOOMIES</div>
      <div className="hidden md:flex items-center gap-6 font-mono text-sm uppercase tracking-widest">
        <a href="#features" className="link-lift hover:text-accent transition-colors">Features</a>
        <a href="#philosophy" className="link-lift hover:text-accent transition-colors">Philosophy</a>
        <a href="#protocol" className="link-lift hover:text-accent transition-colors">Protocol</a>
      </div>
      <button className="magnetic-btn bg-accent text-white px-5 py-2.5 rounded-full font-mono text-sm uppercase tracking-wider relative overflow-hidden group">
        <span className="relative z-10 flex items-center gap-2">
          Summon <ArrowRight size={16} />
        </span>
        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full"></span>
      </button>
    </nav>
  );
};

// ----------------------------------------------------------------------
// B. HERO
// ----------------------------------------------------------------------
const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden bg-primary flex items-end pb-24 md:pb-32">
      {/* Background Image & Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1614729939124-03290b040a45?q=80&w=2000&auto=format&fit=crop"
          alt="Neon bioluminescence"
          className="w-full h-full object-cover opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-8 lg:col-span-6 flex flex-col gap-6">
          <div className="hero-reveal text-accent font-mono text-sm uppercase tracking-widest flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            After-dark transport for dogs who don't walk.
          </div>

          <h1 className="flex flex-col gap-2">
            <span className="hero-reveal text-white font-sans font-bold text-5xl md:text-7xl leading-none tracking-tight">
              Transport beyond
            </span>
            <span className="hero-reveal text-accent font-serif italic text-7xl md:text-9xl leading-[0.8] pr-4">
              Instinct.
            </span>
          </h1>

          <div className="hero-reveal pt-4">
            <button className="magnetic-btn bg-white text-primary px-8 py-4 rounded-full font-sans font-semibold text-lg flex items-center gap-3 relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                Summon a Ride <ArrowRight size={20} />
              </span>
              <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full z-0"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------
// C. FEATURES (Interactive Functional Artifacts)
// ----------------------------------------------------------------------

// Card 1: Diagnostic Shuffler (Mood-reactive LED interiors)
const DiagnosticShufflerCard = () => {
  const [items, setItems] = useState([
    { id: 1, label: 'Calm Cyan', val: '450nm', bg: 'bg-cyan-500/20' },
    { id: 2, label: 'Alert Amber', val: '590nm', bg: 'bg-amber-500/20' },
    { id: 3, label: 'Restful Rose', val: '620nm', bg: 'bg-rose-500/20' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border border-textDark/10 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[380px] flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
      <div className="mb-auto">
        <h3 className="font-sans font-bold text-2xl flex items-center gap-3 mb-2">
          <Activity className="text-accent" /> Chroma-Cabin
        </h3>
        <p className="text-textDark/70 font-mono text-sm">Mood-reactive LED interiors.</p>
      </div>

      <div className="relative h-[200px] w-full flex items-end justify-center pb-4">
        {items.map((item, i) => {
          const isTop = i === 2;
          const scale = isTop ? 1 : i === 1 ? 0.9 : 0.8;
          const y = isTop ? 0 : i === 1 ? -20 : -40;
          const opacity = isTop ? 1 : i === 1 ? 0.6 : 0.3;

          return (
            <div
              key={item.id}
              className={`absolute w-full p-4 rounded-2xl border border-textDark/5 backdrop-blur-md flex justify-between items-center transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${item.bg}`}
              style={{ transform: `scale(${scale}) translateY(${y}px)`, opacity, zIndex: i }}
            >
              <span className="font-mono text-xs font-bold">{item.label}</span>
              <span className="font-mono text-xs opacity-60">{item.val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Card 2: Telemetry Typewriter (Bark-to-ride voice activation)
const TelemetryTypewriterCard = () => {
  const [text, setText] = useState('');
  const [cursorPhase, setCursorPhase] = useState(true);
  const fullText = " > INITIALIZING AUDIO RECEPTORS...\n > LISTENING FOR FREQUENCY 40Hz...\n > VOCAL PATTERN MATCHED: BARK_09\n > VEHICLE DISPATCHED.";

  useEffect(() => {
    let current = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        current += fullText.charAt(i);
        setText(current);
        i++;
      } else {
        setTimeout(() => { i = 0; current = ''; }, 4000);
      }
    }, 50);

    const cursorInt = setInterval(() => setCursorPhase(p => !p), 400);
    return () => { clearInterval(interval); clearInterval(cursorInt); };
  }, []);

  return (
    <div className="bg-textDark border border-textDark/10 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[380px] flex flex-col relative group hover:-translate-y-1 transition-transform duration-500">
      <div className="mb-auto">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-sans font-bold text-2xl text-white flex items-center gap-3">
            <Mic className="text-accent" /> Vocal-Summon
          </h3>
          <span className="flex items-center gap-2 bg-textDark border border-white/10 text-white/50 px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Live Feed
          </span>
        </div>
        <p className="text-white/60 font-mono text-sm">Bark-to-ride voice activation.</p>
      </div>

      <div className="bg-primary rounded-xl p-4 h-[180px] font-mono text-xs text-accent whitespace-pre-wrap overflow-hidden flex flex-col justify-end">
        <p className="leading-relaxed">
          {text}
          <span className={`inline-block w-2.5 h-3.5 bg-accent ml-1 -mb-0.5 ${cursorPhase ? 'opacity-100' : 'opacity-0'}`}></span>
        </p>
      </div>
    </div>
  );
};

// Card 3: Cursor Protocol Scheduler (Pawprint biometric authentication)
const CursorProtocolCard = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(-1);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 120 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let ctx;
    const animateCursor = () => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        tl.set({}, { onComplete: () => { setClicked(false); setActiveDay(-1); } })
          .to({ x: 50, y: 120 }, { x: 30 + Math.random() * 100, y: 30, duration: 1, ease: "power2.inOut", onUpdate: function () { setCursorPos(this.targets()[0]); } })
          .to({}, { duration: 0.1, onComplete: () => setClicked(true) })
          .to({}, { duration: 0.2, onComplete: () => { setClicked(false); setActiveDay(Math.floor(Math.random() * 7)); } })
          .to({ x: cursorPos.x, y: cursorPos.y }, { x: 200, y: 160, duration: 1, ease: "power2.inOut", onUpdate: function () { setCursorPos(this.targets()[0]); } })
          .to({}, { duration: 1 });
      });
    };
    animateCursor();
    return () => ctx?.revert();
  }, []);

  return (
    <div className="bg-white border border-textDark/10 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[380px] flex flex-col relative group hover:-translate-y-1 transition-transform duration-500">
      <div className="mb-auto">
        <h3 className="font-sans font-bold text-2xl flex items-center gap-3 mb-2">
          <Fingerprint className="text-accent" /> Bio-Verify
        </h3>
        <p className="text-textDark/70 font-mono text-sm">Pawprint biometric authentication.</p>
      </div>

      <div className="relative h-[180px] bg-background/50 rounded-xl p-4 border border-textDark/5 flex flex-col justify-center overflow-hidden">
        <div className="flex justify-between w-full px-2 mb-6">
          {days.map((day, i) => (
            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${activeDay === i ? 'bg-accent text-white scale-110' : 'bg-white text-textDark border border-textDark/10'}`}>
              {day}
            </div>
          ))}
        </div>

        <button className="mx-auto bg-textDark text-white px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors">
          Authenticate
        </button>

        {/* Animated SVG Cursor */}
        <div
          className="absolute z-10 w-6 h-6 text-black pointer-events-none transition-transform"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : 1})`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="2" className="drop-shadow-md">
            <path d="M5.5 3.21L17.5 15.21L13 16L17 22L14 23L10 17L5.5 21.5V3.21Z" />
          </svg>
        </div>

        {/* Fake Pawprint flash */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${activeDay !== -1 ? 'opacity-10' : 'opacity-0'}`}>
          <Fingerprint size={120} className="text-accent" />
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-32 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent mb-4">Core Capabilities</h2>
          <p className="font-sans font-bold text-4xl md:text-5xl tracking-tight max-w-2xl">
            Interactive functional artifacts designed for the nocturnal grid.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DiagnosticShufflerCard />
          <TelemetryTypewriterCard />
          <CursorProtocolCard />
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------
// D. PHILOSOPHY
// ----------------------------------------------------------------------
const Philosophy = () => {
  const lineRef1 = useRef(null);
  const lineRef2 = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef1.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from(lineRef2.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="relative py-40 bg-primary text-white overflow-hidden text-center flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0 opacity-20" data-speed="0.5">
        <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" alt="Texture" className="w-full h-full object-cover mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center gap-12">
        <p ref={lineRef1} className="font-mono text-lg md:text-xl text-white/50 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md">
          Most transport focuses on: moving from A to B.
        </p>

        <h2 ref={lineRef2} className="font-sans text-5xl md:text-8xl font-bold tracking-tight leading-none">
          We focus on: <br />
          <span className="font-serif italic text-accent font-normal mt-4 block">immersive canine experiences.</span>
        </h2>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------
// E. PROTOCOL - Stacking Archive
// ----------------------------------------------------------------------
const ProtocolCard = ({ step, title, desc, animGraphic, index }) => {
  return (
    <div className={`protocol-card relative w-full h-[100dvh] flex items-center justify-center sticky top-0 bg-background`} style={{ zIndex: index }}>
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        <div className="flex flex-col gap-6 order-2 md:order-1">
          <div className="font-mono text-5xl md:text-7xl font-bold text-accent/20">0{step}</div>
          <h2 className="font-sans font-bold text-4xl md:text-6xl tracking-tight">{title}</h2>
          <p className="font-mono text-lg text-textDark/60 max-w-md">{desc}</p>
        </div>

        <div className="order-1 md:order-2 h-[400px] w-full bg-white rounded-[3rem] border border-textDark/10 shadow-2xl flex items-center justify-center relative overflow-hidden">
          {animGraphic}
        </div>

      </div>
    </div>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Don't dim the last one

        gsap.to(card, {
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
          scale: 0.9,
          opacity: 0.5,
          filter: 'blur(20px)',
          ease: 'none',
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={containerRef} className="relative bg-background">

      <ProtocolCard
        step={1}
        index={1}
        title="Bio-Sync Verification"
        desc="Pawprint analysis confirms identity and initializes tailored cabin parameters."
        animGraphic={
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_10s_linear_infinite]">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#7B61FF" strokeWidth="1" strokeDasharray="10 5" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#7B61FF" strokeWidth="2" strokeDasharray="5 15" opacity="0.5" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="#0A0A14" strokeWidth="3" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Fingerprint size={32} className="text-secondary opacity-50" />
            </div>
          </div>
        }
      />

      <ProtocolCard
        step={2}
        index={2}
        title="Perimeter Scan"
        desc="Laser grid analyzes boarding safety and maps the optimal routing trajectory."
        animGraphic={
          <div className="relative w-full h-full p-8 flex flex-col justify-between">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                {Array.from({ length: 12 }).map((_, j) => (
                  <div key={j} className="w-2 h-2 rounded-full bg-textDark/10"></div>
                ))}
              </div>
            ))}
            <div className="absolute left-0 w-full h-1 bg-accent blur-[2px] animate-[bounce_3s_infinite_ease-in-out]"></div>
            <div className="absolute left-0 w-full h-0.5 bg-accent opacity-50 animate-[bounce_3s_infinite_ease-in-out]"></div>
          </div>
        }
      />

      <ProtocolCard
        step={3}
        index={3}
        title="Pulse Drive"
        desc="Mood-reactive LED frequencies synchronize with passenger telemetry."
        animGraphic={
          <div className="relative w-full h-full flex items-center justify-center bg-primary">
            <svg viewBox="0 0 400 100" className="w-[80%] stroke-accent" fill="none" strokeWidth="3" strokeLinecap="round">
              <path d="M0,50 L80,50 L100,10 L120,90 L140,50 L260,50 L280,20 L300,80 L320,50 L400,50"
                className="animate-[dash_2s_linear_infinite]"
                style={{ strokeDasharray: 800, strokeDashoffset: 800 }} />
            </svg>
            <style>{`
              @keyframes dash {
                to { stroke-dashoffset: 0; }
              }
            `}</style>
          </div>
        }
      />

    </section>
  );
};

// ----------------------------------------------------------------------
// F. GET STARTED
// ----------------------------------------------------------------------
const GetStarted = () => {
  return (
    <section className="py-40 bg-background relative z-10 text-center flex flex-col items-center">
      <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center mb-10 rotate-12">
        <Terminal size={32} className="text-white" />
      </div>
      <h2 className="font-sans font-bold text-5xl md:text-7xl tracking-tight mb-6">Initiate Sequence.</h2>
      <p className="font-mono text-textDark/60 max-w-md mx-auto mb-10">Access the nocturnal network. Summon your bespoke transport today.</p>

      <button className="magnetic-btn bg-primary text-white px-12 py-5 rounded-full font-sans font-bold text-xl flex items-center gap-4 relative overflow-hidden group shadow-2xl">
        <span className="relative z-10 flex items-center gap-4">
          Summon a Ride <ArrowRight size={24} />
        </span>
        <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full z-0"></span>
      </button>
    </section>
  );
};

// ----------------------------------------------------------------------
// G. FOOTER
// ----------------------------------------------------------------------
const Footer = () => {
  return (
    <footer className="bg-primary text-white rounded-t-[4rem] pt-24 pb-12 px-6 mt-[-4rem] relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        <div className="md:col-span-6 flex flex-col gap-6">
          <h2 className="font-sans font-bold text-4xl tracking-tight">ZOOMIES</h2>
          <p className="font-mono text-white/50 max-w-sm">After-dark transport for dogs who don't walk. Precision luxury for the nocturnal canine.</p>
        </div>

        <div className="md:col-span-3 flex flex-col gap-4 font-mono text-sm">
          <span className="text-white/30 uppercase tracking-widest mb-2">Navigation</span>
          <a href="#" className="hover:text-accent transition-colors">Features</a>
          <a href="#" className="hover:text-accent transition-colors">Philosophy</a>
          <a href="#" className="hover:text-accent transition-colors">Protocol</a>
        </div>

        <div className="md:col-span-3 flex flex-col gap-4 font-mono text-sm">
          <span className="text-white/30 uppercase tracking-widest mb-2">Legal</span>
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-accent transition-colors">Cookie Data</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-white/40">
        <p>&copy; 2026 ZOOMIES TRANSPORT. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-3 border border-white/10 px-4 py-2 rounded-full bg-white/5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
          SYSTEM OPERATIONAL
        </div>
      </div>
    </footer>
  );
};

// ----------------------------------------------------------------------
// APP ROOT
// ----------------------------------------------------------------------
function App() {
  return (
    <div className="relative w-full bg-background selection:bg-accent/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
}

export default App;
