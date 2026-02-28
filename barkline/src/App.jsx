import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Menu, MapPin, ThermometerSnowflake, Activity, Car, Sparkles, Check, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ---------------------------------------------------------
// 1. NAVBAR - "The Floating Island"
// ---------------------------------------------------------
const Navbar = () => {
  const navRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 'top -50',
      end: 99999,
      toggleClass: { className: 'scrolled', targets: navRef.current },
    });
  });

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl rounded-[3rem] px-6 py-4 transition-all duration-500 flex items-center justify-between text-background border border-transparent
                 [&.scrolled]:bg-background/80 [&.scrolled]:backdrop-blur-xl [&.scrolled]:text-primary [&.scrolled]:border-primary/10 [&.scrolled]:shadow-lg"
    >
      <div className="font-sans font-bold tracking-tighter text-xl">BARKLINE</div>
      <div className="hidden md:flex items-center space-x-8 font-mono text-sm">
        <a href="#features" className="hover:text-accent transition-colors">Features</a>
        <a href="#philosophy" className="hover:text-accent transition-colors">Philosophy</a>
        <a href="#protocol" className="hover:text-accent transition-colors">Protocol</a>
      </div>
      <button className="group relative overflow-hidden rounded-full bg-accent px-6 py-2.5 text-primary text-sm font-semibold transition-transform hover:scale-[1.03] duration-300" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
        <span className="relative z-10 flex items-center gap-2">Book a Ride <ArrowRight size={16} /></span>
        <span className="absolute inset-0 z-0 translate-y-full bg-background transition-transform duration-300 group-hover:translate-y-0"></span>
      </button>
    </nav>
  );
};

// ---------------------------------------------------------
// 2. HERO - "The Opening Shot"
// ---------------------------------------------------------
const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo('.hero-text-1', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.08, delay: 0.2 })
      .fromTo('.hero-text-2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.8')
      .fromTo('.hero-cta', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.8');
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full bg-primary flex items-end px-6 pb-24 md:px-16 md:pb-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Car Interior"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-start text-background">
        <h1 className="flex flex-col mb-6">
          <span className="hero-text-1 font-sans font-bold text-3xl md:text-5xl lg:text-6xl tracking-tighter uppercase mb-2">Canine luxury meets</span>
          <span className="hero-text-2 font-drama italic text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.85] text-accent pr-10">Precision.</span>
        </h1>
        <p className="hero-text-1 font-mono text-background/80 max-w-md text-sm md:text-base mb-10 leading-relaxed border-l border-accent/30 pl-4 py-1">
          On-demand chauffeur service for dogs with places to be.
        </p>
        <button className="hero-cta group relative overflow-hidden rounded-full bg-accent px-8 py-4 text-primary text-base font-semibold transition-transform hover:scale-[1.03]" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
          <span className="relative z-10 flex items-center gap-2">Book a Ride <ArrowRight size={18} /></span>
          <span className="absolute inset-0 z-0 translate-y-full bg-background transition-transform duration-300 group-hover:translate-y-0"></span>
        </button>
      </div>
    </section>
  );
};

// ---------------------------------------------------------
// 3. FEATURES -> Shuffler Card
// ---------------------------------------------------------
const ShufflerCard = () => {
  const [cards, setCards] = useState([
    { id: 1, label: 'GPS Telemetry', icon: <MapPin size={16} />, val: 'ACTIVE' },
    { id: 2, label: 'Cabin Temp', icon: <ThermometerSnowflake size={16} />, val: '68°F' },
    { id: 3, label: 'Heartbeat Sync', icon: <Activity size={16} />, val: 'NORMAL' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 w-full flex items-center justify-center pt-8">
      {cards.map((c, i) => {
        const isTop = i === 2;
        return (
          <div
            key={c.id}
            className="absolute w-3/4 bg-primary text-background p-4 rounded-3xl border border-white/10 shadow-xl flex items-center justify-between transition-all duration-700"
            style={{
              transform: `translateY(${i * -15}px) scale(${1 - (2 - i) * 0.05})`,
              opacity: isTop ? 1 : 0.6 + i * 0.15,
              zIndex: i,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div className="flex items-center gap-3 font-sans font-medium text-sm">
              <div className="p-2 bg-accent/20 text-accent rounded-full">{c.icon}</div>
              {c.label}
            </div>
            <div className="font-mono text-xs text-accent">{c.val}</div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------
// 3. FEATURES -> Typewriter Card
// ---------------------------------------------------------
const TypewriterCard = () => {
  const copy = "Initializing vet-approved driver protocol...\nVerifying canine behavioral training...\nMatching temperament profile...\nDriver secured: Arthur (100% 5-star rating).";
  const [text, setText] = useState('');

  useEffect(() => {
    let index = 0;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const timer = setInterval(() => {
          if (index < copy.length) {
            setText(copy.substring(0, index + 1));
            index++;
          } else {
            clearInterval(timer);
          }
        }, 50);
        return () => clearInterval(timer);
      }
    });

    const el = document.getElementById('typewriter-trigger');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="typewriter-trigger" className="h-64 w-full bg-primary text-background rounded-3xl p-6 border border-white/10 relative shadow-xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
        <div className="font-mono text-xs uppercase text-white/50">System Logs</div>
        <div className="flex items-center gap-2 font-mono text-xs text-accent">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div> Live Feed
        </div>
      </div>
      <div className="font-mono text-sm leading-relaxed whitespace-pre-line text-white/80">
        {text}<span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse"></span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// 3. FEATURES -> Scheduler Card
// ---------------------------------------------------------
const SchedulerCard = () => {
  const gridRef = useRef(null);

  useGSAP(() => {
    // A timeline that loops a cursor clicking interaction
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    tl.set('.anim-cursor', { x: 50, y: 150, opacity: 0 })
      .to('.anim-cursor', { opacity: 1, duration: 0.3 })
      .to('.anim-cursor', { x: 120, y: 50, duration: 1, ease: 'power2.inOut' })
      .to('.anim-cursor', { scale: 0.8, duration: 0.1 })
      .to('.anim-cell-target', { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 0.1 }, '<')
      .to('.anim-cursor', { scale: 1, duration: 0.1 })
      .to('.anim-cursor', { x: 220, y: 120, duration: 1, ease: 'power2.inOut', delay: 0.5 })
      .to('.anim-cursor', { scale: 0.8, duration: 0.1 })
      .to('.anim-btn-target', { scale: 0.95, duration: 0.1 }, '<')
      .to('.anim-cursor', { scale: 1, duration: 0.1 })
      .to('.anim-btn-target', { scale: 1, backgroundColor: '#FAF8F5', color: '#0D0D12', duration: 0.1 }, '<')
      .to('.anim-cursor', { opacity: 0, duration: 0.3, delay: 0.5 })
      .to('.anim-cell-target', { backgroundColor: 'transparent', color: '#FAF8F5', duration: 0.5 })
      .to('.anim-btn-target', { backgroundColor: 'transparent', color: '#C9A84C', duration: 0.5 }, '<');

  }, { scope: gridRef });

  return (
    <div ref={gridRef} className="h-64 w-full bg-primary text-background rounded-3xl p-6 border border-white/10 relative shadow-xl overflow-hidden flex flex-col justify-between">
      <div>
        <div className="font-mono text-xs uppercase text-white/50 mb-4">Climate & Treat Protocol</div>
        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center font-mono text-xs text-white/40 pb-2">{day}</div>
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className={`aspect-square rounded-md border border-white/10 flex items-center justify-center text-xs font-mono transition-colors ${i === 9 ? 'anim-cell-target' : ''}`}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
        <div className="font-mono text-[10px] text-white/40">Vehicle climate: 68°F</div>
        <div className="anim-btn-target text-xs font-sans font-bold text-accent border border-accent rounded-full px-3 py-1">Save</div>
      </div>

      {/* Fake cursor SVG */}
      <svg className="anim-cursor absolute z-20 w-6 h-6 drop-shadow-md pointer-events-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 3.21V20.8C5.5 21.46 6.3 21.8 6.78 21.34L11.51 16.79H18.73C19.4 16.79 19.74 15.98 19.26 15.51L6.96 3.01C6.54 2.58 5.5 2.88 5.5 3.21Z" fill="white" stroke="#0D0D12" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

const Features = () => {
  return (
    <section id="features" className="py-32 px-6 md:px-16 bg-background text-primary">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="font-sans font-bold tracking-tighter text-4xl md:text-5xl mb-4">Functional Artifacts.</h2>
          <p className="font-drama italic text-dark text-2xl max-w-2xl text-primary/70">Engineered for the discerning canine passenger.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="flex flex-col group">
            <div className="bg-background border border-primary/10 rounded-[2.5rem] p-2 mb-6 shadow-sm hover:shadow-md transition-shadow group-hover:-translate-y-1 duration-300">
              <ShufflerCard />
            </div>
            <h3 className="font-sans font-bold tracking-tight text-xl mb-2 px-2">Real-time tail-level tracking</h3>
            <p className="font-mono text-sm text-primary/60 px-2 leading-relaxed">Continuous telemetry mapping ensuring absolute visibility from pickup to drop-off.</p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col group">
            <div className="bg-background border border-primary/10 rounded-[2.5rem] p-2 mb-6 shadow-sm hover:shadow-md transition-shadow group-hover:-translate-y-1 duration-300">
              <TypewriterCard />
            </div>
            <h3 className="font-sans font-bold tracking-tight text-xl mb-2 px-2">Vetted canine chauffeurs</h3>
            <p className="font-mono text-sm text-primary/60 px-2 leading-relaxed">Elite drivers, rigorously trained in canine behavioral etiquette and emergency protocols.</p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col group">
            <div className="bg-background border border-primary/10 rounded-[2.5rem] p-2 mb-6 shadow-sm hover:shadow-md transition-shadow group-hover:-translate-y-1 duration-300">
              <SchedulerCard />
            </div>
            <h3 className="font-sans font-bold tracking-tight text-xl mb-2 px-2">Climate & Treat Protocol</h3>
            <p className="font-mono text-sm text-primary/60 px-2 leading-relaxed">Precision-controlled cabin environments paired with bespoke en-route refreshments.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------
// 4. PHILOSOPHY - "The Manifesto"
// ---------------------------------------------------------
const Philosophy = () => {
  const philRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.phil-line-1', { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: philRef.current, start: 'top 70%' }
    });

    gsap.fromTo('.phil-line-2', { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1.5, ease: 'power3.out',
      scrollTrigger: { trigger: philRef.current, start: 'top 50%' }
    });
  }, { scope: philRef });

  return (
    <section id="philosophy" ref={philRef} className="relative py-40 px-6 md:px-16 bg-dark text-background overflow-hidden flex items-center h-[80vh]">
      {/* Parallaxing Texture */}
      <div className="absolute inset-0 z-0 opacity-10" data-speed="0.8">
        <img
          src="https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=2000&auto=format&fit=crop"
          alt="Dark marble texture"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="phil-line-1 font-sans font-medium text-lg md:text-xl text-white/50 mb-8 border-l border-white/20 pl-6">
          Most pet transit focuses on: basic relocation.
        </div>
        <div className="phil-line-2 font-drama italic text-5xl md:text-7xl lg:text-8xl leading-[1.1]">
          We focus on: <br />
          <span className="text-accent underline decoration-1 decoration-accent/50 underline-offset-8">Uncompromised</span> canine prestige.
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------
// 5. PROTOCOL - "Sticky Stacking Archive"
// ---------------------------------------------------------

// Helper for Step animations inside cards
const StepVisual1 = () => {
  useGSAP(() => {
    gsap.to('.gear-rotate', { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
  });
  return (
    <div className="absolute top-10 right-10 text-white/5 flex items-center justify-center pointer-events-none">
      <svg className="gear-rotate w-[400px] h-[400px]" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 0 A50 50 0 1 1 49.9 0" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 8" />
        <path d="M50 15 A35 35 0 1 1 49.9 15" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M50 30 A20 20 0 1 1 49.9 30" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 4" />
      </svg>
    </div>
  )
}

const StepVisual2 = () => {
  useGSAP(() => {
    gsap.fromTo('.laser-line', { y: -200 }, { y: 400, duration: 3, repeat: -1, ease: 'linear', yoyo: true });
  });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="w-full h-full relative" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        <div className="laser-line absolute w-full h-[2px] bg-accent shadow-[0_0_15px_rgba(201,168,76,1)]"></div>
      </div>
    </div>
  )
}

const StepVisual3 = () => {
  useGSAP(() => {
    gsap.to('.ekg-path', { strokeDashoffset: 0, duration: 2, repeat: -1, ease: 'linear' });
  });
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
      <svg className="w-full h-64" viewBox="0 0 500 100">
        <path className="ekg-path" d="M0 50 L200 50 L220 20 L240 90 L260 10 L280 70 L300 50 L500 50" fill="none" stroke="#C9A84C" strokeWidth="4" strokeDasharray="600" strokeDashoffset="600" />
      </svg>
    </div>
  )
}

const ProtocolSection = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const cards = cardsRef.current;

    // Default setup
    gsap.set(cards, { position: 'absolute', top: 0, left: 0, right: 0, height: '100vh' });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${cards.length * 100}%`,
      pin: true,
      scrub: true,
      animation: gsap.timeline()
        .to(cards[0], { scale: 0.9, y: -50, opacity: 0.5, filter: 'blur(10px)' }, 0)
        .from(cards[1], { yPercent: 100 }, 0)

        .to(cards[1], { scale: 0.9, y: -50, opacity: 0.5, filter: 'blur(10px)' }, 1)
        .from(cards[2], { yPercent: 100 }, 1)
    });
  }, { scope: containerRef });

  const steps = [
    { title: "Schedule", desc: "Secure their vehicle and coordinate pickup protocols via our encrypted client portal.", Vis: StepVisual1, no: "01" },
    { title: "Transit", desc: "Real-time telemetry and a climate-controlled journey ensure utmost physiological comfort.", Vis: StepVisual2, no: "02" },
    { title: "Arrive", desc: "Door-to-door escort to their final destination, finalizing the Barkline guarantee.", Vis: StepVisual3, no: "03" }
  ];

  return (
    <section id="protocol" ref={containerRef} className="relative h-screen w-full bg-primary overflow-hidden">
      {steps.map((s, i) => (
        <div
          key={i}
          ref={el => cardsRef.current[i] = el}
          className="w-full h-full bg-primary text-background flex items-center px-6 md:px-16"
          style={{ zIndex: i + 1, borderTop: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
        >
          <s.Vis />
          <div className="relative z-10 max-w-3xl">
            <div className="font-mono text-accent text-lg mb-4 opacity-80">[PHASE {s.no}]</div>
            <h2 className="font-sans font-bold text-5xl md:text-7xl tracking-tighter mb-6 uppercase">{s.title}</h2>
            <p className="font-drama italic text-2xl md:text-4xl text-white/80 max-w-xl">{s.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

// ---------------------------------------------------------
// 6. MEMBERSHIP - Pricing
// ---------------------------------------------------------
const Pricing = () => {
  return (
    <section className="py-32 px-6 md:px-16 bg-background text-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 flex flex-col items-center">
          <h2 className="font-sans font-bold tracking-tighter text-4xl md:text-5xl mb-4">Membership Tiers.</h2>
          <p className="font-mono text-primary/60 max-w-md text-sm">Select the service tier that aligns with your canine's transit requirements.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Tier 1 */}
          <div className="bg-white rounded-[2rem] p-8 border border-primary/10 shadow-sm flex flex-col">
            <div className="font-mono text-xs uppercase text-primary/50 mb-4">Essential</div>
            <div className="font-sans font-bold text-3xl mb-2">Standard Cab</div>
            <div className="font-drama italic text-xl mb-8">Ad hoc transit</div>
            <div className="flex-1 space-y-4 mb-10">
              {['Vetted Chauffeur', 'Basic Route Tracking', 'Water Service'].map((f, i) => (
                <div key={i} className="flex gap-3 text-sm font-sans items-center text-primary/80">
                  <Check size={16} className="text-accent" /> {f}
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-full border border-primary/20 font-sans font-semibold text-sm hover:bg-primary hover:text-white transition-colors">Select Tier</button>
          </div>

          {/* Tier 2 - Performance (Pop) */}
          <div className="bg-primary text-background rounded-[2.5rem] p-10 shadow-xl border border-accent/30 flex flex-col transform md:scale-105 z-10 relative">
            <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-accent text-primary px-4 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">Most Requested</div>
            <div className="font-mono text-xs uppercase text-accent mb-4">Performance</div>
            <div className="font-sans font-bold text-4xl mb-2">Premium Suite</div>
            <div className="font-drama italic text-xl text-white/70 mb-8">Priority scheduling</div>
            <div className="flex-1 space-y-4 mb-10">
              {['Vetted Chauffeur', 'Real-time Telemetry', 'Climate Control', 'Bespoke Treat Protocol'].map((f, i) => (
                <div key={i} className="flex gap-3 text-sm font-sans items-center text-white/90">
                  <Check size={16} className="text-accent" /> {f}
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-full bg-accent text-primary font-sans font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">Book a Ride <ArrowRight size={16} /></button>
          </div>

          {/* Tier 3 */}
          <div className="bg-white rounded-[2rem] p-8 border border-primary/10 shadow-sm flex flex-col">
            <div className="font-mono text-xs uppercase text-primary/50 mb-4">Enterprise</div>
            <div className="font-sans font-bold text-3xl mb-2">Fleet Access</div>
            <div className="font-drama italic text-xl mb-8">Unlimited priority</div>
            <div className="flex-1 space-y-4 mb-10">
              {['Dedicated Chauffeur', 'Full Suite Suite', 'Veterinary Escort', 'Waitlist Priority'].map((f, i) => (
                <div key={i} className="flex gap-3 text-sm font-sans items-center text-primary/80">
                  <Check size={16} className="text-accent" /> {f}
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-full border border-primary/20 font-sans font-semibold text-sm hover:bg-primary hover:text-white transition-colors">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------
// 7. FOOTER
// ---------------------------------------------------------
const Footer = () => {
  return (
    <footer className="bg-primary text-background rounded-t-[4rem] px-6 py-20 md:px-16 mt-[-4rem] relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between mb-20 gap-10">
        <div className="max-w-md">
          <div className="font-sans font-bold tracking-tighter text-3xl mb-6">BARKLINE</div>
          <p className="font-drama italic text-white/60 text-xl leading-relaxed mb-8">
            Eradicating the friction of canine transit through precision protocols and uncompromised luxury.
          </p>
          <div className="flex items-center gap-2 font-mono text-xs border border-white/10 w-max px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> System Operational
          </div>
        </div>

        <div className="flex gap-16 font-sans text-sm">
          <div className="flex flex-col gap-4">
            <div className="font-mono text-white/50 text-xs mb-2 uppercase">Platform</div>
            <a href="#" className="hover:text-accent transition-colors">Features</a>
            <a href="#" className="hover:text-accent transition-colors">Protocol</a>
            <a href="#" className="hover:text-accent transition-colors">Membership</a>
            <a href="#" className="hover:text-accent transition-colors">Chauffeurs</a>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-mono text-white/50 text-xs mb-2 uppercase">Company</div>
            <a href="#" className="hover:text-accent transition-colors">Manifesto</a>
            <a href="#" className="hover:text-accent transition-colors">Careers</a>
            <a href="#" className="hover:text-accent transition-colors">Press</a>
            <a href="#" className="hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 font-mono text-xs text-white/40">
        <div>© {new Date().getFullYear()} Barkline Operations LLC. All rights reserved.</div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Legal</a>
        </div>
      </div>
    </footer>
  );
};

// ---------------------------------------------------------
// MAIN APP
// ---------------------------------------------------------
function App() {
  return (
    <div className="relative font-sans text-primary selection:bg-accent/30 selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <ProtocolSection />
      <Pricing />
      <Footer />
    </div>
  );
}

export default App;
