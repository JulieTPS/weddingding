import { useRef, useState, useCallback } from 'react'
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import './index.css'

const FEATURES = [
  { title: 'Ils approchent. Ça s\'ouvre.', body: 'Pas d\'app, pas de manipulation. Juste un geste naturel. Vos invités seront surpris, c\'est exactement l\'effet voulu.' },
  { title: 'Changez d\'avis à J-2.', body: 'Salle de dernière minute, horaire décalé. Mettez à jour en ligne, tout le monde voit la nouvelle version. Sans SMS collectif.' },
  { title: 'Les confirmations arrivent toutes seules.', body: 'RSVP intégré au site. Présents, régimes, besoins. Tout est là quand vous ouvrez votre tableau de bord.' },
  { title: 'Un objet qu\'on ne jette pas.', body: 'Papier coton 350g, dorure à chaud, sticker époxy. Des invités gardent encore la carte sur leur frigo deux ans après.' },
  { title: 'Même la grand-mère de 82 ans.', body: 'Si elle a un smartphone NFC, ça marche. Et on a prévu un QR code au dos pour les rares exceptions.' },
  { title: 'Livré avant que vous stressiez.', body: '5 jours ouvrés après validation. Chaque puce testée, chaque carte emballée à la main.' },
]

const ease = [0.22, 1, 0.36, 1]
const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease, delay },
})

/* ── VERSION G : Éditorial magazine — Vogue/i-D ────────────── */
function VersionG() {
  return (
    <section className="py-24 px-8 md:px-16" style={{ background: '#faf8f5' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-3" style={{ color: '#c8a86e' }}>G — Éditorial magazine ★ DA</p>
      <div className="max-w-4xl mx-auto">
        <div className="border-t border-[#2c2c2c] pt-8 mb-16">
          <motion.h2 {...fu()} className="font-serif leading-[0.92] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: '#2c2c2c' }}>
            Beau à regarder.<br />
            <em style={{ color: '#e8826a' }}>Magique à recevoir.</em>
          </motion.h2>
        </div>
        {FEATURES.map(({ title, body }, i) => (
          <motion.div key={i} {...fu(i * 0.05)}
            className="grid gap-16 pb-10 mb-10"
            style={{ gridTemplateColumns: '1fr 2fr', borderBottom: '1px solid #e8e4df' }}>
            <h3 className="font-serif text-[1.3rem] leading-[1.1] tracking-[-0.01em]" style={{ color: '#2c2c2c' }}>{title}</h3>
            <div className="flex gap-5 items-start">
              <span className="font-sans text-[0.5rem] tracking-[0.22em] shrink-0 pt-1" style={{ color: '#c8a86e' }}>0{i + 1}</span>
              <p className="font-sans font-light text-[0.88rem] leading-[1.8]" style={{ color: '#7a7a7a' }}>{body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ── VERSION H : Luxury brand — Cartier / Dior ─────────────── */
function VersionH() {
  return (
    <section className="py-28 px-8 md:px-16" style={{ background: '#fefcf9' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-3 text-center" style={{ color: '#c8a86e' }}>H — Luxury brand Cartier/Dior ★ DA</p>
      <div className="max-w-3xl mx-auto text-center mb-20">
        <motion.p {...fu()} className="font-sans text-[0.55rem] tracking-[0.3em] uppercase mb-5" style={{ color: '#c8a86e' }}>Ce qui change tout</motion.p>
        <motion.h2 {...fu(0.08)} className="font-serif leading-[1.05] tracking-[-0.02em] mb-8"
          style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', color: '#1a1915' }}>
          Beau à regarder.<br />
          <em style={{ color: '#e8826a' }}>Magique à recevoir.</em>
        </motion.h2>
        <motion.div {...fu(0.14)} className="w-8 h-px mx-auto" style={{ background: '#c8a86e' }} />
      </div>
      <div className="max-w-3xl mx-auto grid grid-cols-2 gap-x-20">
        {FEATURES.map(({ title, body }, i) => (
          <motion.div key={i} {...fu(i * 0.06)} className="pb-12 mb-12" style={{ borderBottom: '1px solid rgba(200,168,110,0.2)' }}>
            <p className="font-sans text-[0.5rem] tracking-[0.22em] uppercase mb-3" style={{ color: '#c8a86e' }}>0{i + 1}</p>
            <h3 className="font-serif text-[1.2rem] leading-[1.15] tracking-[-0.01em] mb-2.5" style={{ color: '#1a1915' }}>{title}</h3>
            <p className="font-sans font-light text-[0.82rem] leading-[1.85]" style={{ color: '#9a8e82' }}>{body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ── VERSION I : Cinéma immersif — parallax + reveal ──────── */
function VersionI() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={ref} className="py-28 px-8 md:px-16 overflow-hidden" style={{ background: '#0c0b09' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-3" style={{ color: 'rgba(200,168,110,0.5)' }}>I — Cinéma immersif parallax ★ DA</p>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-20 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <motion.h2 {...fu()} className="font-serif leading-[0.92] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#ede8de' }}>
            Beau à regarder.<br />
            <em style={{ color: '#e8826a' }}>Magique à recevoir.</em>
          </motion.h2>
          <motion.p {...fu(0.1)} className="font-sans font-light text-[0.78rem] leading-relaxed max-w-[200px] hidden md:block pb-1" style={{ color: 'rgba(237,232,222,0.3)' }}>
            Un faire-part qui crée le silence dans la pièce quand vos invités l'ouvrent.
          </motion.p>
        </div>
        <motion.div style={{ y }} className="grid grid-cols-1 md:grid-cols-3 gap-x-12">
          {FEATURES.map(({ title, body }, i) => (
            <motion.div key={i} {...fu(i * 0.07)}
              className="pb-12 mb-12 md:mb-0 md:pb-0"
              style={{ borderBottom: i < FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <p className="font-sans text-[0.5rem] tracking-[0.25em] uppercase mb-4" style={{ color: '#c8a86e' }}>0{i + 1}</p>
              <h3 className="font-serif text-[1.05rem] leading-[1.2] mb-3" style={{ color: '#ede8de' }}>{title}</h3>
              <p className="font-sans font-light text-[0.78rem] leading-[1.8]" style={{ color: 'rgba(237,232,222,0.35)' }}>{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── VERSION J : Stagger reveal cards crème ────────────────── */
function VersionJ() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-8 md:px-16" style={{ background: '#f5f0e8' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-3 text-center" style={{ color: '#c8a86e' }}>J — Stagger reveal crème ★ DA</p>
      <div className="max-w-3xl mx-auto text-center mb-16">
        <motion.p {...fu()} className="font-pacifico text-[1rem] mb-4" style={{ color: '#e8826a' }}>WeddingDing</motion.p>
        <motion.h2 {...fu(0.08)} className="font-serif leading-[1.08] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#2c2414' }}>
          Beau à regarder.<br />
          <em style={{ color: '#e8826a' }}>Magique à recevoir.</em>
        </motion.h2>
        <motion.div {...fu(0.14)} className="flex items-center gap-3 justify-center mt-6">
          <div className="h-px w-10" style={{ background: '#c8a86e' }} />
          <span className="font-sans text-[0.52rem] tracking-[0.22em] uppercase" style={{ color: '#c8a86e' }}>Tout ce qui change</span>
          <div className="h-px w-10" style={{ background: '#c8a86e' }} />
        </motion.div>
      </div>
      <div ref={ref} className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {FEATURES.map(({ title, body }, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease, delay: i * 0.08 }}
            className="flex flex-col gap-2.5 p-7 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(12px)', border: '1px solid rgba(200,168,110,0.18)' }}>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full shrink-0" style={{ background: '#e8826a' }} />
              <h3 className="font-serif text-[1rem] leading-[1.2]" style={{ color: '#2c2414' }}>{title}</h3>
            </div>
            <p className="font-sans font-light text-[0.8rem] leading-[1.8]" style={{ color: '#7a6e5e' }}>{body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ── VERSION K : Scroll-driven text reveal lines ──────────── */
function RevealLine({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.span
        className="block font-serif"
        initial={{ y: '105%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease, delay }}
        style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', color: '#2c2c2c', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
        {text}
      </motion.span>
    </div>
  )
}
function VersionK() {
  return (
    <section className="py-24 px-8 md:px-16" style={{ background: 'white' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-3" style={{ color: '#c8a86e' }}>K — Text reveal lines + hover cards ★ DA</p>
      <div className="max-w-5xl mx-auto">
        <div className="mb-20">
          <RevealLine text="Beau à regarder." />
          <RevealLine text="Magique à recevoir." delay={0.08} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: '#ece8e4' }}>
          {FEATURES.map(({ title, body }, i) => (
            <motion.div key={i} {...fu(i * 0.06)}
              whileHover={{ background: '#2c2c2c' }}
              transition={{ duration: 0.25 }}
              className="group p-8 flex flex-col gap-3"
              style={{ background: 'white' }}>
              <motion.span
                className="font-sans text-[0.52rem] tracking-[0.22em] uppercase"
                style={{ color: '#c8a86e' }}>
                0{i + 1}
              </motion.span>
              <motion.h3
                className="font-serif text-[1.1rem] leading-[1.15] group-hover:text-[#ede8de] transition-colors duration-300"
                style={{ color: '#2c2c2c' }}>
                {title}
              </motion.h3>
              <motion.p
                className="font-sans font-light text-[0.8rem] leading-[1.75] group-hover:text-[rgba(237,232,222,0.5)] transition-colors duration-300"
                style={{ color: '#9a9590' }}>
                {body}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── VERSION L : Titre I + glow cursor + tilt 3D + word reveal ─ */
function TiltCard({ title, body, index }: { title: string; body: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-60, 60], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-60, 60], [-8, 8]), { stiffness: 300, damping: 30 })
  const glowX = useSpring(useTransform(x, [-60, 60], [0, 100]), { stiffness: 200, damping: 25 })
  const glowY = useSpring(useTransform(y, [-60, 60], [0, 100]), { stiffness: 200, damping: 25 })

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }, [x, y])

  const onLeave = useCallback(() => {
    x.set(0); y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease, delay: index * 0.08 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className="relative flex flex-col gap-3 p-7 rounded-xl overflow-hidden cursor-default"
      whileHover={{ scale: 1.02 }}>

      {/* fond de base */}
      <div className="absolute inset-0 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />

      {/* glow qui suit le curseur */}
      <motion.div className="absolute inset-0 rounded-xl pointer-events-none" style={{
        background: useTransform([glowX, glowY], ([gx, gy]) =>
          `radial-gradient(160px circle at ${gx}% ${gy}%, rgba(232,130,106,0.18) 0%, transparent 70%)`
        )
      }} />

      <div className="relative z-10 flex flex-col gap-3">
        <p className="font-sans text-[0.5rem] tracking-[0.28em] uppercase" style={{ color: '#c8a86e' }}>0{index + 1}</p>
        <h3 className="font-serif text-[1.05rem] leading-[1.2]" style={{ color: '#ede8de' }}>{title}</h3>
        <p className="font-sans font-light text-[0.78rem] leading-[1.8]" style={{ color: 'rgba(237,232,222,0.38)' }}>{body}</p>
      </div>
    </motion.div>
  )
}

function VersionL() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current!.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }, [mouseX, mouseY])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  const words1 = 'Beau à regarder.'.split(' ')
  const words2 = 'Magique à recevoir.'.split(' ')

  return (
    <section ref={sectionRef} onMouseMove={onMouseMove}
      className="relative py-28 px-8 md:px-16 overflow-hidden"
      style={{ background: '#0c0b09', minHeight: '100vh' }}>

      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-3 relative z-10" style={{ color: 'rgba(200,168,110,0.5)' }}>
        L — Immersif ★ DA — glow cursor + tilt 3D + word reveal
      </p>

      {/* ambient glow cursor-tracked */}
      <motion.div className="absolute pointer-events-none" style={{
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,130,106,0.12) 0%, rgba(200,168,110,0.06) 40%, transparent 70%)',
        x: useTransform(smoothX, [0,1], ['-30%', '60%']),
        y: useTransform(smoothY, [0,1], ['-20%', '60%']),
        filter: 'blur(40px)',
      }} />

      {/* grain subtil */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '180px' }} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* titre avec word reveal + parallax */}
        <motion.div style={{ y: parallaxY }} className="mb-24 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-sans text-[0.55rem] tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(200,168,110,0.6)' }}>
            Ce qui change tout
          </motion.p>

          {/* ligne 1 */}
          <div className="overflow-hidden mb-1">
            <div className="flex flex-wrap gap-x-[0.28em]">
              {words1.map((w, i) => (
                <motion.span key={i} className="font-serif block"
                  style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', color: '#ede8de', lineHeight: 0.95, letterSpacing: '-0.03em' }}
                  initial={{ y: '110%', opacity: 0 }}
                  whileInView={{ y: '0%', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, ease, delay: 0.1 + i * 0.09 }}>
                  {w}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ligne 2 italic corail */}
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-x-[0.28em]">
              {words2.map((w, i) => (
                <motion.span key={i} className="font-serif block"
                  style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', color: '#e8826a', lineHeight: 0.95, letterSpacing: '-0.03em', fontStyle: 'italic' }}
                  initial={{ y: '110%', opacity: 0 }}
                  whileInView={{ y: '0%', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, ease, delay: 0.3 + i * 0.09 }}>
                  {w}
                </motion.span>
              ))}
            </div>
          </div>

          {/* accroche latérale */}
          <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans font-light text-[0.78rem] leading-relaxed mt-8 max-w-xs hidden md:block"
            style={{ color: 'rgba(237,232,222,0.28)' }}>
            Un faire-part qui crée le silence dans la pièce quand vos invités l'ouvrent.
          </motion.p>
        </motion.div>

        {/* feature cards tilt 3D */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map(({ title, body }, i) => (
            <TiltCard key={i} title={title} body={body} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default function DesignTest() {
  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <div className="sticky top-0 z-50 flex items-center gap-5 px-6 py-3 text-white flex-wrap"
        style={{ background: '#1a1915', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
        <span style={{ color: '#e8826a', fontWeight: 600 }}>DESIGN TEST</span>
        {['G','H','I','J','K'].map(l => (
          <a key={l} href={`#v${l}`} style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Ver. {l}</a>
        ))}
        <span style={{ color: '#e8826a', fontWeight: 700 }}>★ WOW :</span>
        <a href="#vL" style={{ color: '#e8826a', textDecoration: 'none', fontWeight: 700 }}>Ver. L</a>
        <a href="/" style={{ marginLeft: 'auto', color: '#e8826a', textDecoration: 'none' }}>← Site</a>
      </div>
      <div id="vG"><VersionG /></div>
      <div id="vH"><VersionH /></div>
      <div id="vI"><VersionI /></div>
      <div id="vJ"><VersionJ /></div>
      <div id="vK"><VersionK /></div>
      <div id="vL"><VersionL /></div>
    </div>
  )
}
