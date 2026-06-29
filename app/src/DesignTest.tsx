import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, useAnimationFrame, animate } from 'framer-motion'
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

/* ── VERSION M : Editorial alternating rows — Aesop/Le Labo ─── */
function VersionM() {
  return (
    <section className="py-24 px-8 md:px-16" style={{ background: '#faf8f3' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-3" style={{ color: '#c8a86e' }}>M — Editorial alternating rows (Aesop / Le Labo)</p>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-16 pb-8" style={{ borderBottom: '2px solid #2c2c2c' }}>
          <motion.h2 {...fu()} className="font-serif leading-[0.95] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#2c2c2c' }}>
            Beau à regarder.<br /><em style={{ color: '#e8826a' }}>Magique à recevoir.</em>
          </motion.h2>
          <motion.p {...fu(0.1)} className="font-sans font-light text-[0.78rem] hidden md:block max-w-[180px] text-right pb-1" style={{ color: '#aaa' }}>
            Ce qui change tout pour votre mariage
          </motion.p>
        </div>
        {FEATURES.map(({ title, body }, i) => (
          <motion.div key={i} {...fu(i * 0.06)}
            className="grid items-start gap-8 md:gap-16 py-8"
            style={{ gridTemplateColumns: '2.5rem 1fr 1.8fr', borderBottom: '1px solid #ece8e4' }}>
            <span className="font-serif text-[2rem] leading-none" style={{ color: '#c8a86e', opacity: 0.5 }}>0{i + 1}</span>
            <h3 className="font-serif text-[1.25rem] leading-[1.15] tracking-[-0.01em] pt-1" style={{ color: '#2c2c2c' }}>{title}</h3>
            <p className="font-sans font-light text-[0.85rem] leading-[1.85]" style={{ color: '#7a7a7a' }}>{body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ── VERSION N : Accordion interactif — hôtel luxe ─────────── */
function VersionN() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-24 px-8 md:px-16" style={{ background: 'white' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-3" style={{ color: '#c8a86e' }}>N — Accordion interactif (hôtel luxe)</p>
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <motion.h2 {...fu()} className="font-serif leading-[1.05] tracking-[-0.025em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#2c2c2c' }}>
            Beau à regarder.<br /><em style={{ color: '#e8826a' }}>Magique à recevoir.</em>
          </motion.h2>
        </div>
        {FEATURES.map(({ title, body }, i) => (
          <div key={i} style={{ borderTop: '1px solid #ece8e4' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between py-6 text-left"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <div className="flex items-center gap-6">
                <span className="font-sans text-[0.52rem] tracking-[0.2em] shrink-0" style={{ color: '#c8a86e' }}>0{i + 1}</span>
                <span className="font-serif text-[1.1rem] leading-snug" style={{ color: '#2c2c2c' }}>{title}</span>
              </div>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="font-sans text-[1.4rem] shrink-0 ml-4"
                style={{ color: '#c8a86e', lineHeight: 1 }}>+</motion.span>
            </button>
            <motion.div
              initial={false}
              animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}>
              <p className="font-sans font-light text-[0.85rem] leading-[1.85] pb-7 pl-[3.25rem]" style={{ color: '#7a7a7a' }}>{body}</p>
            </motion.div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid #ece8e4' }} />
      </div>
    </section>
  )
}

/* ── VERSION O : Horizontal scroll carousel ─────────────────── */
function VersionO() {
  return (
    <section className="py-24" style={{ background: '#0c0b09', overflow: 'hidden' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-3 px-8 md:px-16" style={{ color: 'rgba(200,168,110,0.5)' }}>O — Horizontal scroll carousel</p>
      <div className="px-8 md:px-16 mb-14">
        <motion.h2 {...fu()} className="font-serif leading-[0.95] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#ede8de' }}>
          Beau à regarder.<br /><em style={{ color: '#e8826a' }}>Magique à recevoir.</em>
        </motion.h2>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-8 px-8 md:px-16"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        {FEATURES.map(({ title, body }, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
            className="shrink-0 flex flex-col justify-between rounded-2xl p-8"
            style={{
              width: 'clamp(280px, 38vw, 420px)',
              minHeight: 280,
              scrollSnapAlign: 'start',
              background: i === 0 ? '#e8826a' : 'rgba(255,255,255,0.04)',
              border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
            }}>
            <div>
              <p className="font-sans text-[0.5rem] tracking-[0.25em] uppercase mb-5"
                style={{ color: i === 0 ? 'rgba(255,255,255,0.6)' : '#c8a86e' }}>0{i + 1}</p>
              <h3 className="font-serif text-[1.2rem] leading-[1.2] mb-4"
                style={{ color: i === 0 ? 'white' : '#ede8de' }}>{title}</h3>
              <p className="font-sans font-light text-[0.8rem] leading-[1.8]"
                style={{ color: i === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(237,232,222,0.35)' }}>{body}</p>
            </div>
            <div className="mt-6 h-px" style={{ background: i === 0 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.06)' }} />
          </motion.div>
        ))}
      </div>
      <p className="text-center font-sans text-[0.6rem] tracking-[0.1em] mt-4" style={{ color: 'rgba(255,255,255,0.15)' }}>← faire défiler →</p>
    </section>
  )
}

/* ── VERSION P : Sticky scroll storytelling — Stripe/Linear ─── */
function VersionP() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  return (
    <section ref={ref} className="py-24 px-8 md:px-16" style={{ background: '#faf8f3' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-3" style={{ color: '#c8a86e' }}>P — Sticky scroll storytelling (Stripe / Linear)</p>
      <div className="max-w-5xl mx-auto flex gap-16 md:gap-24 items-start">
        {/* sticky left */}
        <div className="hidden md:block sticky top-28 w-[38%] shrink-0">
          <motion.p {...fu()} className="font-sans text-[0.52rem] tracking-[0.22em] uppercase mb-4" style={{ color: '#c8a86e' }}>Ce qui change tout</motion.p>
          <motion.h2 {...fu(0.06)} className="font-serif leading-[1.05] tracking-[-0.025em] mb-6"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#2c2c2c' }}>
            Beau à regarder.<br /><em style={{ color: '#e8826a' }}>Magique à recevoir.</em>
          </motion.h2>
          <div className="flex flex-col gap-2 mt-10">
            {FEATURES.map((_, i) => (
              <div key={i} onClick={() => setActive(i)} className="flex items-center gap-3 cursor-pointer"
                style={{ opacity: active === i ? 1 : 0.3, transition: 'opacity 0.3s' }}>
                <div className="w-4 h-px" style={{ background: active === i ? '#e8826a' : '#c8a86e', transition: 'background 0.3s' }} />
                <span className="font-sans text-[0.65rem] tracking-[0.1em]" style={{ color: '#2c2c2c' }}>0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
        {/* scrollable right */}
        <div className="flex flex-col gap-16 md:gap-24 flex-1">
          {FEATURES.map(({ title, body }, i) => (
            <motion.div key={i}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.5 }}
              {...fu(i * 0.05)}
              className="flex flex-col gap-3">
              <p className="font-sans text-[0.5rem] tracking-[0.22em] uppercase" style={{ color: '#c8a86e' }}>0{i + 1}</p>
              <h3 className="font-serif text-[1.4rem] leading-[1.15] tracking-[-0.01em]" style={{ color: '#2c2c2c' }}>{title}</h3>
              <div className="h-px w-8 my-2" style={{ background: '#c8a86e' }} />
              <p className="font-sans font-light text-[0.88rem] leading-[1.85]" style={{ color: '#7a7a7a' }}>{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── VERSION Q : Grille card centrale mise en avant ─────────── */
function VersionQ() {
  return (
    <section className="py-24 px-8 md:px-16" style={{ background: '#faf8f3' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-3 text-center" style={{ color: '#c8a86e' }}>Q — Grille card centrale mise en avant</p>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <motion.h2 {...fu()} className="font-serif leading-[1.05] tracking-[-0.025em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#2c2c2c' }}>
            Beau à regarder.<br /><em style={{ color: '#e8826a' }}>Magique à recevoir.</em>
          </motion.h2>
        </div>
        {/* 3 petites / grande corail + petite / pleine largeur */}
        <div className="grid grid-cols-3 gap-4">
          <div><BrandCard title={FEATURES[0].title} body={FEATURES[0].body} index={0} /></div>
          <div><BrandCard title={FEATURES[1].title} body={FEATURES[1].body} index={1} /></div>
          <div><BrandCard title={FEATURES[2].title} body={FEATURES[2].body} index={2} /></div>
          <div style={{ gridColumn: '1 / 3' }}>
            <BrandCard title={FEATURES[3].title} body={FEATURES[3].body} index={3} large coral
              style={{ boxShadow: '0 16px 48px rgba(232,130,106,0.22)' }} />
          </div>
          <div><BrandCard title={FEATURES[4].title} body={FEATURES[4].body} index={4} /></div>
          <div style={{ gridColumn: '1 / 4' }}>
            <BrandCard title={FEATURES[5].title} body={FEATURES[5].body} index={5} large />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══ Composant partagé : icône + paillettes + sweep + tilt ════ */
const ICONS = [
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M4.5 12.5C4.5 8.4 7.9 5 12 5s7.5 3.4 7.5 7.5"/><path d="M8 12.5c0-2.2 1.8-4 4-4s4 1.8 4 4"/><circle cx="12" cy="12.5" r="1.5" fill="white" stroke="none"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M12 20V8"/><path d="M12 8C12 8 15 4 19 5C16 6 13 10 13 13"/><path d="M12 13C12 13 9 11 7 7C6 4 8 2 10 3C9 6 11 10 12 13"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 12l9 5 9-5"/><path d="M8 8V6a4 4 0 018 0v2"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M12 21C12 21 3 15 3 9a5 5 0 0110-1 5 5 0 0110 1c0 6-9 12-9 12z"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M9 9h.01M15 9h.01"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M5 7l1.5-3h11L19 7"/><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M12 12v4M10 14h4"/></svg>,
]

const PAILLETTES = [
  { top: '-4%', left: '68%', size: 10, dur: '3.8s', rot: '12deg',  color: '#c8a86e', char: '✦' },
  { top: '72%', left: '82%', size: 8,  dur: '4.4s', rot: '-8deg',  color: '#e8826a', char: '✦' },
  { top: '82%', left: '6%',  size: 9,  dur: '5.1s', rot: '20deg',  color: '#fff',    char: '✧' },
  { top: '-2%', left: '14%', size: 7,  dur: '4.2s', rot: '-15deg', color: '#c8a86e', char: '✦' },
  { top: '42%', left: '98%', size: 7,  dur: '5.6s', rot: '5deg',   color: '#e8826a', char: '✧' },
  { top: '38%', left: '-4%', size: 6,  dur: '4.8s', rot: '-20deg', color: '#fff',    char: '✦' },
  { top: '20%', left: '90%', size: 6,  dur: '6.0s', rot: '30deg',  color: '#c8a86e', char: '✧' },
  { top: '60%', left: '-2%', size: 5,  dur: '3.5s', rot: '-5deg',  color: '#e8826a', char: '✦' },
]

function FeatureIcon({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className="shrink-0 relative flex items-center justify-center" style={{ width: 44, height: 44 }}>
      {PAILLETTES.map((s, j) => (
        <span key={j} className="paillette" style={{
          top: s.top, left: s.left, fontSize: s.size, color: s.color,
          '--r': s.rot,
          animationDuration: s.dur,
          animationDelay: `${index * 0.5 + j * 0.4}s`,
          textShadow: `0 0 3px ${s.color}`,
        } as React.CSSProperties}>{s.char}</span>
      ))}
      {inView && [0,1,2,3,4,5,6,7].map(j => (
        <div key={j} className="spark" style={{
          '--a': `${j * 45}deg`,
          background: j % 2 === 0 ? '#e8826a' : '#c8a86e',
          boxShadow: `0 0 5px ${j % 2 === 0 ? '#e8826a' : '#c8a86e'}`,
          animationDelay: `${j * 0.05 + index * 0.12}s`,
        } as React.CSSProperties} />
      ))}
      <div className="relative flex items-center justify-center rounded-full z-10" style={{ width: 36, height: 36, background: '#e8826a' }}>
        {ICONS[index]}
      </div>
    </div>
  )
}

interface BrandCardProps {
  title: string
  body: string
  index: number
  large?: boolean
  dark?: boolean
  coral?: boolean
  style?: React.CSSProperties
  className?: string
}

function BrandCard({ title, body, index, large = false, dark = false, coral = false, style = {}, className = '' }: BrandCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { once: true, margin: '-60px' })
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-50, 50], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mx, [-50, 50], [-6, 6]), { stiffness: 300, damping: 30 })
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect()
    mx.set(e.clientX - r.left - r.width / 2)
    my.set(e.clientY - r.top - r.height / 2)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  const bg = coral ? '#e8826a' : dark ? '#1a1915' : 'white'
  const border = coral ? 'none' : dark ? '1px solid rgba(200,168,110,0.2)' : '1px solid #ece8e4'
  const titleColor = coral || dark ? (dark ? '#c8a86e' : 'white') : '#2c2c2c'
  const bodyColor = coral ? 'rgba(255,255,255,0.72)' : dark ? 'rgba(237,232,222,0.45)' : '#9a9590'
  const tagColor = coral ? 'rgba(255,255,255,0.55)' : '#c8a86e'
  const sweepGrad = coral
    ? 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 60%, transparent 80%)'
    : 'linear-gradient(105deg, transparent 20%, rgba(200,168,110,0.12) 40%, rgba(240,210,140,0.22) 50%, rgba(200,168,110,0.12) 60%, transparent 80%)'

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900, ...style }}
      initial={{ opacity: 0, y: 36, scale: 0.95, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      whileHover="hover"
      variants={{ rest: {}, hover: { scale: 1.02, transition: { duration: 0.25 } } }}
      className={`relative flex gap-5 rounded-2xl overflow-hidden cursor-default h-full ${large ? 'flex-col p-8 md:p-10' : 'p-6 md:p-7'} ${className}`}>
      <div className="absolute inset-0 rounded-2xl" style={{ background: bg, border }} />
      {dark && <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full" style={{ background: 'linear-gradient(to bottom, #c8a86e, rgba(200,168,110,0.15))' }} />}
      <motion.span className="absolute inset-0 pointer-events-none"
        style={{ background: sweepGrad, x: '-140%' }}
        variants={{ rest: { x: '-140%' }, hover: { x: '140%', transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] } } }} />
      <div className="relative z-10 flex gap-4 w-full items-start">
        <FeatureIcon index={index} />
        <div className="flex flex-col gap-2">
          <p className="font-sans text-[0.5rem] tracking-[0.22em] uppercase" style={{ color: tagColor }}>0{index + 1}</p>
          <h3 className={large ? 'font-serif text-[1.3rem] leading-[1.15] tracking-[-0.01em]' : 'font-sans font-medium text-[0.92rem]'}
            style={{ color: titleColor }}>{title}</h3>
          <p className="font-sans font-light leading-[1.8]" style={{ fontSize: large ? '0.85rem' : '0.8rem', color: bodyColor }}>{body}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ── VERSION R : Featured top-left row-span-2, reste en mosaïque */
function VersionR() {
  return (
    <section className="py-24 px-8 md:px-16" style={{ background: '#faf8f3' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-10" style={{ color: '#c8a86e' }}>R — Featured top-left + mosaïque</p>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {FEATURES.map(({ title, body }, i) => (
          <div key={i} style={{ gridRow: i === 0 ? 'span 2' : undefined }}>
            <BrandCard title={title} body={body} index={i} large={i === 0} dark={i === 0} />
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── VERSION S : Bookends — 1ère et dernière cards larges corail */
function VersionS() {
  return (
    <section className="py-24 px-8 md:px-16" style={{ background: '#fefcf9' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-10 text-center" style={{ color: '#c8a86e' }}>S — Bookends (1ère + dernière larges)</p>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {FEATURES.map(({ title, body }, i) => (
          <div key={i} style={{ gridColumn: (i === 0 || i === 5) ? 'span 2 / span 2' : undefined }}>
            <BrandCard title={title} body={body} index={i} large={i === 0 || i === 5} coral={i === 0 || i === 5} />
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── VERSION T : Dark luxe — card noire or en row-span-2 ──────── */
function VersionT() {
  return (
    <section className="py-24 px-8 md:px-16" style={{ background: '#f5f0e8' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-10" style={{ color: '#c8a86e' }}>T — Dark luxe (card noire + or row-span-2)</p>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {FEATURES.map(({ title, body }, i) => (
          <div key={i} style={{ gridRow: i === 3 ? 'span 2' : undefined }}>
            <BrandCard title={title} body={body} index={i} large={i === 3} dark={i === 3} />
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── VERSION U : Card centrale col-span-2 + grand numéro déco ── */
function VersionU() {
  return (
    <section className="py-24 px-8 md:px-16" style={{ background: '#faf8f3' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-10 text-center" style={{ color: '#c8a86e' }}>U — Grand numéro décoratif (col-span-2)</p>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {FEATURES.map(({ title, body }, i) => {
          const isFeat = i === 1
          return (
            <div key={i} style={{ gridColumn: isFeat ? 'span 2 / span 2' : undefined, position: 'relative' }}>
              {isFeat && (
                <span className="absolute right-6 bottom-0 font-serif leading-none select-none pointer-events-none z-0"
                  style={{ fontSize: '9rem', color: 'rgba(232,130,106,0.06)', fontStyle: 'italic' }}>02</span>
              )}
              <BrandCard title={title} body={body} index={i} large={isFeat} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ── VERSION V : Hero card corail flottante, mini-grille dessous */
function VersionV() {
  return (
    <section className="py-24 px-8 md:px-16" style={{ background: '#faf8f3' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-10 text-center" style={{ color: '#c8a86e' }}>V — Hero card flottante + mini-grille</p>
      <div className="max-w-5xl mx-auto">
        <div className="mb-[-1.5rem] relative z-10 mx-auto max-w-2xl">
          <BrandCard title={FEATURES[0].title} body={FEATURES[0].body} index={0} large coral
            style={{ boxShadow: '0 32px 80px rgba(232,130,106,0.3)' }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 rounded-2xl overflow-hidden"
          style={{ background: 'white', border: '1px solid #ece8e4', padding: '2.5rem 1rem 1rem' }}>
          {FEATURES.slice(1).map(({ title, body }, i) => (
            <BrandCard key={i} title={title} body={body} index={i + 1}
              style={{ boxShadow: 'none' }} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── VERSION W : Carousel auto-défilement premium ───────────── */
function CarouselCard({ title, body, index, featured = false }: { title: string; body: string; index: number; featured?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-50, 50], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mx, [-50, 50], [-5, 5]), { stiffness: 300, damping: 30 })
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect()
    mx.set(e.clientX - r.left - r.width / 2)
    my.set(e.clientY - r.top - r.height / 2)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  const bg = featured ? '#e8826a' : 'rgba(255,255,255,0.04)'
  const border = featured ? 'none' : '1px solid rgba(255,255,255,0.08)'
  const sweepGrad = featured
    ? 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.12) 60%, transparent 80%)'
    : 'linear-gradient(105deg, transparent 20%, rgba(200,168,110,0.1) 40%, rgba(240,210,140,0.2) 50%, rgba(200,168,110,0.1) 60%, transparent 80%)'

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900, width: 'clamp(280px, 30vw, 360px)', flexShrink: 0 }}
      whileHover="hover"
      variants={{ rest: {}, hover: { scale: 1.03, transition: { duration: 0.25 } } }}
      className="relative flex flex-col gap-4 p-7 rounded-2xl overflow-hidden cursor-default mx-3">
      <div className="absolute inset-0 rounded-2xl" style={{ background: bg, border }} />
      {featured && <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: '0 20px 60px rgba(232,130,106,0.35)' }} />}
      <motion.span className="absolute inset-0 pointer-events-none"
        style={{ background: sweepGrad, x: '-140%' }}
        variants={{ rest: { x: '-140%' }, hover: { x: '140%', transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] } } }} />
      <div className="relative z-10 flex gap-4 items-start">
        <FeatureIcon index={index} />
        <div className="flex flex-col gap-2">
          <p className="font-sans text-[0.48rem] tracking-[0.22em] uppercase" style={{ color: featured ? 'rgba(255,255,255,0.55)' : '#c8a86e' }}>0{(index % 6) + 1}</p>
          <h3 className="font-serif text-[1.05rem] leading-[1.2]" style={{ color: featured ? 'white' : '#ede8de' }}>{title}</h3>
          <p className="font-sans font-light text-[0.78rem] leading-[1.8]" style={{ color: featured ? 'rgba(255,255,255,0.68)' : 'rgba(237,232,222,0.38)' }}>{body}</p>
        </div>
      </div>
    </motion.div>
  )
}

function VersionW() {
  const CARD_W = 372 // card width + gap (360 + 12)
  const TOTAL = CARD_W * FEATURES.length
  const x = useMotionValue(0)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  pausedRef.current = paused

  // auto-scroll lent
  useAnimationFrame((_, delta) => {
    if (pausedRef.current) return
    let next = x.get() - (delta / 1000) * 36 // 36px/s — lent et premium
    if (next <= -TOTAL) next += TOTAL
    x.set(next)
  })

  const jump = (dir: 1 | -1) => {
    const current = x.get()
    let target = current + dir * -CARD_W
    if (target <= -TOTAL) target += TOTAL
    if (target > 0) target -= TOTAL
    animate(x, target, { type: 'spring', stiffness: 180, damping: 28 })
  }

  const extended = [...FEATURES, ...FEATURES, ...FEATURES]

  return (
    <section className="py-24 overflow-hidden" style={{ background: '#0c0b09' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-3 px-8 md:px-16" style={{ color: 'rgba(200,168,110,0.5)' }}>W — Carousel auto-défilement premium</p>

      <div className="flex items-end justify-between px-8 md:px-16 mb-14">
        <motion.h2 {...fu()} className="font-serif leading-[0.95] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', color: '#ede8de' }}>
          Beau à regarder.<br /><em style={{ color: '#e8826a' }}>Magique à recevoir.</em>
        </motion.h2>
        {/* flèches */}
        <div className="flex gap-3 shrink-0 mb-1">
          {([[-1,'←'],[1,'→']] as const).map(([dir, label]) => (
            <button key={label} onClick={() => jump(dir)}
              className="flex items-center justify-center rounded-full transition-all duration-200"
              style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#c8a86e', fontSize: '1.1rem', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,168,110,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}>
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0c0b09 30%, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0c0b09 30%, transparent)' }} />
        <div style={{ overflow: 'hidden' }}>
          <motion.div style={{ x, display: 'flex', gap: 12, paddingBlock: 16 }}>
            {extended.map(({ title, body }, i) => (
              <CarouselCard key={i} title={title} body={body} index={i} featured={i % 6 === 2} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-10">
        <div className="h-px w-12" style={{ background: 'rgba(200,168,110,0.15)' }} />
        {FEATURES.map((_, i) => (
          <div key={i} onClick={() => jump(i % 2 === 0 ? 1 : -1)}
            className="rounded-full transition-all duration-500"
            style={{ width: i === 2 ? 24 : 4, height: 4, background: i === 2 ? '#e8826a' : 'rgba(200,168,110,0.25)', cursor: 'pointer' }} />
        ))}
        <div className="h-px w-12" style={{ background: 'rgba(200,168,110,0.15)' }} />
      </div>
    </section>
  )
}

/* ── VERSION X : Carousel light theme ───────────────────────── */
function CarouselCardLight({ title, body, index, featured = false }: { title: string; body: string; index: number; featured?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-50, 50], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mx, [-50, 50], [-5, 5]), { stiffness: 300, damping: 30 })
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect()
    mx.set(e.clientX - r.left - r.width / 2)
    my.set(e.clientY - r.top - r.height / 2)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900, width: 'clamp(280px, 30vw, 360px)', flexShrink: 0 }}
      whileHover="hover"
      variants={{ rest: {}, hover: { scale: 1.03, transition: { duration: 0.25 } } }}
      className="relative flex flex-col gap-4 p-7 rounded-2xl overflow-hidden cursor-default mx-3">
      <div className="absolute inset-0 rounded-2xl" style={{
        background: featured ? '#e8826a' : 'white',
        border: featured ? 'none' : '1px solid #ece8e4',
        boxShadow: featured ? '0 20px 60px rgba(232,130,106,0.28)' : '0 2px 16px rgba(0,0,0,0.06)',
      }} />
      <motion.span className="absolute inset-0 pointer-events-none"
        style={{
          background: featured
            ? 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.12) 60%, transparent 80%)'
            : 'linear-gradient(105deg, transparent 20%, rgba(200,168,110,0.1) 40%, rgba(240,210,140,0.2) 50%, rgba(200,168,110,0.1) 60%, transparent 80%)',
          x: '-140%',
        }}
        variants={{ rest: { x: '-140%' }, hover: { x: '140%', transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] } } }} />
      <div className="relative z-10 flex gap-4 items-start">
        <FeatureIcon index={index} />
        <div className="flex flex-col gap-2">
          <p className="font-sans text-[0.48rem] tracking-[0.22em] uppercase" style={{ color: featured ? 'rgba(255,255,255,0.6)' : '#c8a86e' }}>0{(index % 6) + 1}</p>
          <h3 className="font-serif text-[1.05rem] leading-[1.2]" style={{ color: featured ? 'white' : '#2c2c2c' }}>{title}</h3>
          <p className="font-sans font-light text-[0.78rem] leading-[1.8]" style={{ color: featured ? 'rgba(255,255,255,0.7)' : '#9a9590' }}>{body}</p>
        </div>
      </div>
    </motion.div>
  )
}

function VersionX() {
  const CARD_W = 372
  const TOTAL = CARD_W * FEATURES.length
  const x = useMotionValue(0)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  pausedRef.current = paused

  useAnimationFrame((_, delta) => {
    if (pausedRef.current) return
    let next = x.get() - (delta / 1000) * 36
    if (next <= -TOTAL) next += TOTAL
    x.set(next)
  })

  const jump = (dir: 1 | -1) => {
    const current = x.get()
    let target = current + dir * -CARD_W
    if (target <= -TOTAL) target += TOTAL
    if (target > 0) target -= TOTAL
    animate(x, target, { type: 'spring', stiffness: 180, damping: 28 })
  }

  const extended = [...FEATURES, ...FEATURES, ...FEATURES]

  return (
    <section className="py-24 overflow-hidden" style={{ background: '#faf8f3' }}>
      <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase mb-3 px-8 md:px-16" style={{ color: '#c8a86e' }}>X — Carousel light theme</p>

      <div className="flex items-end justify-between px-8 md:px-16 mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' as never }}
          transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          className="font-serif leading-[0.95] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', color: '#2c2c2c' }}>
          Beau à regarder.<br /><em style={{ color: '#e8826a' }}>Magique à recevoir.</em>
        </motion.h2>
        <div className="flex gap-3 shrink-0 mb-1">
          {([[-1,'←'],[1,'→']] as const).map(([dir, label]) => (
            <button key={label} onClick={() => jump(dir)}
              className="flex items-center justify-center rounded-full transition-all duration-200"
              style={{ width: 44, height: 44, background: 'white', border: '1px solid #ece8e4', color: '#c8a86e', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#fdf5ee')}
              onMouseLeave={e => (e.currentTarget.style.background = 'white')}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}>
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #faf8f3 30%, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #faf8f3 30%, transparent)' }} />
        <div style={{ overflow: 'hidden' }}>
          <motion.div style={{ x, display: 'flex', gap: 12, paddingBlock: 16 }}>
            {extended.map(({ title, body }, i) => (
              <CarouselCardLight key={i} title={title} body={body} index={i} featured={i % 6 === 2} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-10">
        <div className="h-px w-12" style={{ background: 'rgba(200,168,110,0.2)' }} />
        {FEATURES.map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-500"
            style={{ width: i === 2 ? 24 : 4, height: 4, background: i === 2 ? '#e8826a' : 'rgba(200,168,110,0.2)', cursor: 'pointer' }} />
        ))}
        <div className="h-px w-12" style={{ background: 'rgba(200,168,110,0.2)' }} />
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
        {['G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X'].map(l => (
          <a key={l} href={`#v${l}`} style={{ color: ['W','X'].includes(l) ? '#fff' : ['R','S','T','U','V'].includes(l) ? '#e8826a' : ['M','N','O','P','Q'].includes(l) ? '#c8a86e' : 'rgba(255,255,255,0.4)', textDecoration: 'none', fontWeight: ['W','X'].includes(l) ? 800 : ['R','S','T','U','V'].includes(l) ? 700 : 400 }}>Ver. {l}</a>
        ))}
        <a href="/" style={{ marginLeft: 'auto', color: '#e8826a', textDecoration: 'none' }}>← Site</a>
      </div>
      <div id="vG"><VersionG /></div>
      <div id="vH"><VersionH /></div>
      <div id="vI"><VersionI /></div>
      <div id="vJ"><VersionJ /></div>
      <div id="vK"><VersionK /></div>
      <div id="vL"><VersionL /></div>
      <div id="vM"><VersionM /></div>
      <div id="vN"><VersionN /></div>
      <div id="vO"><VersionO /></div>
      <div id="vP"><VersionP /></div>
      <div id="vQ"><VersionQ /></div>
      <div id="vR"><VersionR /></div>
      <div id="vS"><VersionS /></div>
      <div id="vT"><VersionT /></div>
      <div id="vU"><VersionU /></div>
      <div id="vV"><VersionV /></div>
      <div id="vW"><VersionW /></div>
      <div id="vX"><VersionX /></div>
    </div>
  )
}
