import { useRef, useState, useEffect, useCallback } from 'react'
import {
  motion, useScroll, useTransform, useSpring,
  useMotionValue, AnimatePresence, useInView
} from 'framer-motion'
import Lenis from 'lenis'
import './index.css'

// Module-level burst trigger — partagé entre Cursor et le form
let _burstFn: ((x: number, y: number, n: number) => void) | null = null
function triggerSparkles(x: number, y: number, n = 32) { _burstFn?.(x, y, n) }

/* ─── palette ────────────────────────────────────────────────
   coral   #e8826a  |  coral-light #fdf0ec
   dark    #2c2c2c  |  gray        #7a7a7a
   bg      #ffffff  |  bg-soft     #f8f7f6
   border  #ece8e4  |  gold        #c8a86e (accent only)
────────────────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const

/* ══ Smooth scroll ══════════════════════════════════════════ */
function useLenis() {
  useEffect(() => {
    const l = new Lenis({ duration: 1.15, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    const raf = (time: number) => { l.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => l.destroy()
  }, [])
}

/* ══ Wedding Cursor — sparkle stardust ══════════════════════ */
const STAR_COLORS = ['#e4cc92','#f0dc9a','#ffffff','#ffd4c8','#c8a86e','#f5c8b8']

function star4(ctx: CanvasRenderingContext2D, x: number, y: number, outer: number, inner: number) {
  ctx.beginPath()
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI / 4) - Math.PI / 2
    const r = i % 2 === 0 ? outer : inner
    i === 0 ? ctx.moveTo(x + Math.cos(angle)*r, y + Math.sin(angle)*r)
             : ctx.lineTo(x + Math.cos(angle)*r, y + Math.sin(angle)*r)
  }
  ctx.closePath()
}

function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const coreRef   = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.innerWidth < 768) return  // mobile: skip
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!
    const core   = coreRef.current!
    const ring   = ringRef.current!

    let W = 0, H = 0
    let mx = -200, my = -200
    let rx = -200, ry = -200
    let spawnAcc = 0

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    window.addEventListener('resize', resize); resize()

    // ── Particle ──────────────────────────────────
    interface P { x:number;y:number;vx:number;vy:number;type:string;size:number;rot:number;rotV:number;opacity:number;decay:number;color:string;angle:number }
    const particles: P[] = []

    function makeP(x: number, y: number): P {
      const r = Math.random()
      const type = r < 0.52 ? 'star' : r < 0.80 ? 'dot' : 'bolt'
      return {
        x: x + (Math.random()-.5)*10, y: y + (Math.random()-.5)*10,
        vx: (Math.random()-.5)*2.6,
        vy: -(Math.random()*2.8+0.4),
        type,
        size:  type==='star' ? Math.random()*6+3 : type==='dot' ? Math.random()*2.5+1.5 : Math.random()*12+7,
        rot:   Math.random()*Math.PI*2,
        rotV:  (Math.random()-.5)*0.13,
        opacity: 0.85+Math.random()*0.15,
        decay: 0.015+Math.random()*0.014,
        color: STAR_COLORS[Math.floor(Math.random()*STAR_COLORS.length)],
        angle: Math.random()*Math.PI*2,
      }
    }

    function spawn(x: number, y: number, n = 2) {
      for (let i = 0; i < n; i++) particles.push(makeP(x, y))
    }

    function drawP(p: P) {
      if (p.opacity <= 0) return
      ctx.save()
      ctx.globalAlpha = Math.max(0, p.opacity)
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      if (p.type === 'star') {
        const g = ctx.createRadialGradient(0,0,0,0,0,p.size)
        g.addColorStop(0,'rgba(255,255,255,0.95)')
        g.addColorStop(0.35, p.color)
        g.addColorStop(1,'transparent')
        ctx.fillStyle = g
        star4(ctx,0,0,p.size,p.size*0.30)
        ctx.fill()
      } else if (p.type === 'dot') {
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color; ctx.shadowBlur = 7
        ctx.beginPath(); ctx.arc(0,0,p.size,0,Math.PI*2); ctx.fill()
      } else {
        ctx.strokeStyle = p.color; ctx.lineWidth = 1.2
        ctx.shadowColor = p.color; ctx.shadowBlur = 9
        ctx.globalAlpha *= 0.65
        ctx.beginPath(); ctx.moveTo(0,0)
        let cx=0,cy=0
        for (let i=0;i<3;i++){
          const sl = p.size/3
          const j = (Math.random()-.5)*7
          cx += Math.cos(p.angle)*sl+j; cy += Math.sin(p.angle)*sl+j
          ctx.lineTo(cx,cy)
        }
        ctx.stroke()
      }
      ctx.restore()
    }

    // ── Mouse ─────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      core.style.left = mx+'px'; core.style.top = my+'px'
      spawnAcc++
      if (spawnAcc >= 2) { spawn(mx, my, Math.random()<0.35?3:2); spawnAcc=0 }
    }
    const onClick = (e: MouseEvent) => { for(let i=0;i<18;i++) spawn(e.clientX,e.clientY,1) }

    const onOver = (e: MouseEvent) => {
      const isCta = !!(e.target as HTMLElement).closest('a,button,[data-mag]')
      ring.style.width  = isCta ? '52px' : '24px'
      ring.style.height = isCta ? '52px' : '24px'
      ring.style.opacity = isCta ? '0.5' : '1'
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onClick)
    window.addEventListener('mouseover', onOver)

    // ── RAF loop ──────────────────────────────────
    let rafId: number
    const loop = () => {
      rx += (mx-rx)*0.13; ry += (my-ry)*0.13
      ring.style.left = rx+'px'; ring.style.top = ry+'px'

      ctx.clearRect(0,0,W,H)
      for (let i = particles.length-1; i >= 0; i--) {
        const p = particles[i]
        p.x+=p.vx; p.vy+=0.055; p.y+=p.vy; p.opacity-=p.decay; p.rot+=p.rotV; p.size*=0.975
        drawP(p)
        if (p.opacity<=0) particles.splice(i,1)
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    _burstFn = spawn

    return () => {
      _burstFn = null
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9990] hidden md:block" />
      {/* core dot */}
      <div ref={coreRef} className="fixed pointer-events-none z-[9998] rounded-full hidden md:block"
        style={{ width:8, height:8, transform:'translate(-50%,-50%)', background:'white',
          boxShadow:'0 0 5px 2px rgba(228,204,146,0.95), 0 0 12px 4px rgba(200,168,110,0.5)' }} />
      {/* lagging ring */}
      <div ref={ringRef} className="fixed pointer-events-none z-[9997] rounded-full hidden md:block"
        style={{ width:24, height:24, transform:'translate(-50%,-50%)',
          border:'1px solid rgba(228,204,146,0.75)',
          boxShadow:'0 0 8px 2px rgba(228,204,146,0.2), inset 0 0 5px rgba(228,204,146,0.1)',
          transition:'width .3s cubic-bezier(.22,1,.36,1), height .3s cubic-bezier(.22,1,.36,1), opacity .25s' }} />
    </>
  )
}

/* ══ Magnetic wrapper ═══════════════════════════════════════ */
function Mag({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 160, damping: 16 })
  const sy = useSpring(y, { stiffness: 160, damping: 16 })
  const move = useCallback((e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.28)
    y.set((e.clientY - r.top - r.height / 2) * 0.28)
  }, [x, y])
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} data-mag
      onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0) }} className={className}>
      {children}
    </motion.div>
  )
}

/* ══ Fade-up helper ═════════════════════════════════════════ */
const fu = (d = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, delay: d, ease: EASE },
})

/* ══ Word reveal (scroll-triggered) ════════════════════════ */
function Reveal({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden"
          style={{ marginRight: '0.25em', paddingBottom: '0.14em', marginBottom: '-0.14em' }}>
          <motion.span className="inline-block"
            initial={{ y: '105%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, delay: delay + i * 0.045, ease: EASE }}>
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ══ Hero word reveal (on-mount, tighter stagger) ═══════════ */
type HeroSeg = { text: string; style?: React.CSSProperties }
function HeroReveal({ segments, baseDelay = 0 }: { segments: HeroSeg[]; baseDelay?: number }) {
  const words = segments.flatMap(seg =>
    seg.text.split(' ').map(w => ({ w, style: seg.style }))
  )
  return (
    <>
      {words.map((item, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: '0.16em', paddingRight: '0.1em', paddingBottom: '0.14em', marginBottom: '-0.14em' }}>
          <motion.span className="inline-block" style={item.style}
            initial={{ y: '108%' }} animate={{ y: '0%' }}
            transition={{ duration: 0.72, delay: baseDelay + i * 0.055, ease: EASE }}>
            {item.w}
          </motion.span>
        </span>
      ))}
    </>
  )
}

/* ══ Count-up ═══════════════════════════════════════════════ */
function Count({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const t0 = Date.now(); const dur = 1500
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1)
      setV(Math.round((1 - Math.pow(1 - p, 3)) * to))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to])
  return <span ref={ref}>{prefix}{v}{suffix}</span>
}

/* ══ NFC Scene — stacking panels ════════════════════════════ */
const NFC_PANELS = [
  {
    img: '/card-photo.png',
    n: '01',
    h: 'Fabriquée pour durer autant que le souvenir',
    b: 'Papier coton 350g, dorure à chaud, sticker époxy serti à la main. Votre faire-part est conçu comme un objet précieux — pas un carton qu\'on jette.',
    pos: 'object-top',
  },
  {
    img: '/tap-photo.png',
    n: '02',
    h: 'Vos invités ne s\'y attendent pas',
    b: 'Ils approchent leur téléphone, par curiosité. Et ça s\'ouvre. Pas d\'app, pas de QR code à photographier — juste de l\'étonnement, puis du sourire.',
    pos: 'object-center',
  },
  {
    img: '/tap-open-photo.png',
    n: '03',
    h: 'Tout votre mariage, dans leur poche',
    b: 'Programme, lieu, RSVP, photos du château — tout s\'ouvre en une seconde. Vous recevez leurs réponses en temps réel, sans courir après les confirmations.',
    pos: 'object-center',
  },
]

function NfcScene() {
  const wrap = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })

  const p1y  = useTransform(scrollYProgress, [0, 0.42], ['0%', '-10%'])
  const p1sc = useTransform(scrollYProgress, [0, 0.42], [1, 0.86])
  const p1op = useTransform(scrollYProgress, [0.28, 0.42], [1, 0])

  const p2y  = useTransform(scrollYProgress, [0.2, 0.44, 0.82], ['100%', '0%', '-10%'])
  const p2sc = useTransform(scrollYProgress, [0.58, 0.82], [1, 0.86])
  const p2op = useTransform(scrollYProgress, [0.70, 0.82], [1, 0])

  const p3y  = useTransform(scrollYProgress, [0.64, 0.82], ['100%', '0%'])

  const panels = [
    { y: p1y, scale: p1sc, opacity: p1op, z: 1 },
    { y: p2y, scale: p2sc, opacity: p2op, z: 2 },
    { y: p3y, scale: useMotionValue(1), opacity: useMotionValue(1), z: 3 },
  ]

  return (
    <div ref={wrap} style={{ height: '320vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#0c0b09' }}>

        {NFC_PANELS.map((panel, i) => (
          <motion.div key={i}
            className="absolute inset-0"
            style={{ y: panels[i].y, scale: panels[i].scale, opacity: panels[i].opacity, zIndex: panels[i].z, transformOrigin: 'top center' }}>

            {/* fond sombre plein écran */}
            <div className="absolute inset-0" style={{ background: '#0c0b09' }} />

            {/* grain */}
            <div className="absolute inset-0 opacity-[0.032] pointer-events-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '180px' }} />

            {/* ── MOBILE : blurred bg + flexbox image/texte ── */}
            <div className="md:hidden absolute inset-0 overflow-hidden flex flex-col">
              {/* fond flouté */}
              <img src={panel.img} alt="" aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'blur(24px)', transform: 'scale(1.2)', opacity: 0.4 }} />
              <div className="absolute inset-0" style={{ background: 'rgba(12,11,9,0.5)' }} />

              {/* zone image — flex 1 pour prendre l'espace disponible */}
              <div className="relative flex-1 flex items-center justify-center px-6 pt-20 pb-2 z-10">
                <img src={panel.img} alt={panel.h}
                  style={{ maxHeight: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain', borderRadius: 14, boxShadow: '0 16px 48px rgba(0,0,0,0.55)', display: 'block' }} />
              </div>

              {/* gradient de transition */}
              <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(12,11,9,1) 0%, rgba(12,11,9,0.7) 60%, transparent 100%)' }} />

              {/* zone texte — hauteur fixe en bas */}
              <div className="relative z-10 px-6 pb-10 pt-4 flex flex-col gap-2.5 shrink-0">
                <span className="font-sans text-[0.58rem] tracking-[0.26em] uppercase"
                  style={{ color: '#e8826a' }}>{panel.n} — Comment ça marche</span>
                <h2 className="font-serif leading-[1.05]"
                  style={{ fontSize: 'clamp(1.6rem, 6vw, 2.4rem)', color: '#ede8de' }}>
                  {panel.h}
                </h2>
                <p className="font-sans font-light leading-relaxed text-[0.82rem]"
                  style={{ color: 'rgba(237,232,222,0.6)' }}>
                  {panel.b}
                </p>
                {i === 2 && (
                  <motion.a href="#contact"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.22,1,0.36,1] }}
                    className="inline-flex items-center gap-2 self-start font-sans text-[0.82rem]"
                    style={{ background: '#e8826a', color: '#fff', padding: '0.65rem 1.3rem', borderRadius: 999, fontWeight: 500, textDecoration: 'none' }}>
                    Créer mes faire-parts
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.a>
                )}
              </div>
            </div>

            {/* ── DESKTOP : texte gauche + image droite ── */}
            <div className="hidden md:flex absolute inset-0 items-center justify-between px-16 gap-16">

              {/* texte gauche */}
              <div className="flex flex-col gap-4 max-w-sm shrink-0 z-10">
                <span className="font-sans text-[0.58rem] tracking-[0.26em] uppercase"
                  style={{ color: '#e8826a' }}>{panel.n} — Comment ça marche</span>
                <h2 className="font-serif leading-[1.05]"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#ede8de' }}>
                  {panel.h}
                </h2>
                <p className="font-sans font-light leading-relaxed text-[0.9rem]"
                  style={{ color: 'rgba(237,232,222,0.5)' }}>
                  {panel.b}
                </p>
                {i === 2 && (
                  <motion.a href="#contact"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.22,1,0.36,1] }}
                    className="inline-flex items-center gap-2 self-start mt-2 font-sans text-[0.82rem]"
                    style={{ background: '#e8826a', color: '#fff', padding: '0.7rem 1.4rem', borderRadius: 999, fontWeight: 500, boxShadow: '0 8px 32px rgba(232,130,106,0.35)', textDecoration: 'none' }}>
                    Créer mes faire-parts
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.a>
                )}
              </div>

              {/* image droite */}
              <div className="flex-1 flex items-center justify-end h-full py-10 z-10">
                <div className="relative">
                  <img src={panel.img} alt={panel.h}
                    className="rounded-2xl"
                    style={{ maxHeight: '82vh', maxWidth: '100%', width: 'auto', objectFit: 'contain', boxShadow: '0 32px 80px rgba(0,0,0,0.7)', display: 'block' }} />

                  {/* annotation NFC — panel 2 uniquement */}
                  {i === 1 && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute" style={{ left: '38%', top: '82%' }}>
                        {[0, 1, 2].map(j => (
                          <div key={j} className="nfc-ring absolute rounded-full"
                            style={{ width: 48, height: 48, top: -24, left: -24, border: '1px solid rgba(232,130,106,0.5)', animationDelay: `${j * 0.7}s` }} />
                        ))}
                        <div className="absolute rounded-full"
                          style={{ width: 8, height: 8, top: -4, left: -4, background: '#e8826a', boxShadow: '0 0 0 3px rgba(232,130,106,0.2), 0 0 12px rgba(232,130,106,0.6)' }} />
                        <svg className="absolute" style={{ left: -100, top: -58, overflow: 'visible', pointerEvents: 'none' }} width="100" height="58" viewBox="0 0 100 58">
                          <line x1="100" y1="58" x2="12" y2="6" stroke="rgba(232,130,106,0.4)" strokeWidth="0.8" />
                          <circle cx="12" cy="6" r="2" fill="rgba(232,130,106,0.6)" />
                        </svg>
                        <div className="absolute flex items-center gap-1.5 font-sans whitespace-nowrap"
                          style={{ left: -196, top: -72, fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(237,232,222,0.9)', background: 'rgba(18,16,13,0.82)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', padding: '4px 10px 4px 8px', borderRadius: 999, border: '1px solid rgba(232,130,106,0.4)' }}>
                          <span className="rounded-full inline-block" style={{ width: 5, height: 5, background: '#e8826a', flexShrink: 0 }} />
                          Votre site, caché ici
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* indicateur de progression */}
            <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2" style={{ zIndex: 10 }}>
              {NFC_PANELS.map((_, j) => (
                <div key={j} className="w-px rounded-full transition-all duration-300"
                  style={{ height: j === i ? 32 : 12, background: j === i ? '#e8826a' : 'rgba(255,255,255,0.2)' }} />
              ))}
            </div>

          </motion.div>
        ))}

      </div>
    </div>
  )
}

/* ══ FAQ data ═══════════════════════════════════════════════ */
const FAQS = [
  { q: "Compatible avec tous les téléphones ?", a: "iPhone 7+ (iOS 14+) et tous Android NFC — 95%+ des smartphones. Un QR code au dos couvre les 5% restants." },
  { q: "Comment mes invités savent-ils qu'ils doivent tapper ?", a: "Une mention discrète sur la carte indique la manipulation. Taux de scan spontané supérieur à 90% dans nos retours." },
  { q: "Délai de réception ?", a: "5 jours ouvrés après validation de votre design. Commandez 3-4 mois avant le jour J." },
  { q: "Puis-je modifier mon site après livraison ?", a: "Oui, à tout moment. La puce NFC pointe vers une URL fixe — vos invités arrivent toujours sur la dernière version." },
  { q: "Que se passe-t-il après 24 mois ?", a: "Renouvellement à tarif préférentiel, ou export complet de vos données. Votre contenu vous appartient." },
]

/* ══ App ════════════════════════════════════════════════════ */
export default function App() {
  useLenis()

  const [email, setEmail]   = useState('')
  const [sent, setSent]     = useState(false)
  const [copied, setCopied] = useState(false)

  const formRef             = useRef<HTMLFormElement>(null)

  const copyLink = () => {
    navigator.clipboard.writeText('https://weddingding.fr').then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2200)
    })
  }
  const [faq, setFaq]       = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const heroRef = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.setAttribute('playsinline', '')

    const tryPlay = () => v.play().catch(() => {})

    // tentative immédiate
    setTimeout(tryPlay, 100)

    // fallback : joue au premier geste (touchstart = scroll ou tap sur iOS)
    const onGesture = () => {
      tryPlay()
      document.removeEventListener('touchstart', onGesture)
      document.removeEventListener('pointerdown', onGesture)
    }
    document.addEventListener('touchstart', onGesture, { once: true, passive: true })
    document.addEventListener('pointerdown', onGesture, { once: true, passive: true })

    return () => {
      document.removeEventListener('touchstart', onGesture)
      document.removeEventListener('pointerdown', onGesture)
    }
  }, [])
  const { scrollYProgress: hy } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroVY = useTransform(hy, [0, 1], ['0%', '25%'])
  const heroOp = useTransform(hy, [0, 0.7], [1, 0])

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return
    if (formRef.current) {
      const r = formRef.current.getBoundingClientRect()
      triggerSparkles(r.left + r.width / 2, r.top + r.height / 2, 38)
    }
    setEmail(''); setSent(true)
  }

  return (
    <>
      <Cursor />

      {/* ════ NAV — exact même style que index.html ══════════════ */}
      <header
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between h-[72px] px-8 md:px-12 transition-all duration-400"
        style={scrolled ? { background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)', boxShadow: '0 1px 0 rgba(0,0,0,0.06)' } : {}}>

        <a href="#" data-mag className="select-none flex items-center gap-2">
          <img
            src={scrolled ? '/logo-light.svg' : '/logo.svg'}
            alt="WeddingDing"
            style={{ height: 30, width: 'auto', transition: 'opacity 0.3s' }}
          />
          <span className="font-pacifico text-[1.05rem]"
            style={{ color: scrolled ? '#2c2c2c' : 'white' }}>
            Wedding<span style={{ color: scrolled ? '#e8826a' : 'rgba(255,200,180,1)' }}>Ding</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {[['La carte','#carte'],['Comment ça marche','#scene'],['Tarifs','#tarifs']].map(([l, h]) => (
            <a key={l} href={h} data-mag
              className="font-sans text-[0.875rem] transition-colors duration-200 no-underline"
              style={{ color: scrolled ? '#7a7a7a' : 'rgba(255,255,255,0.85)' }}
              onMouseEnter={e => (e.currentTarget.style.color = scrolled ? '#2c2c2c' : 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = scrolled ? '#7a7a7a' : 'rgba(255,255,255,0.85)')}>
              {l}
            </a>
          ))}
        </nav>

        <Mag>
          <a href="#cta" data-mag
            className="font-sans font-medium text-[0.875rem] rounded-full px-[22px] py-[9px] transition-all duration-250 no-underline"
            style={scrolled
              ? { background: '#e8826a', color: 'white', border: '1.5px solid #e8826a' }
              : { background: 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.7)' }}>
            Démarrer
          </a>
        </Mag>
      </header>

      {/* ════ HERO — exact layout index.html ════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
        {/* video + overlays */}
        <motion.div className="absolute inset-0" style={{ y: heroVY }}>
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0"
            style={{ filter: 'brightness(0.92) contrast(1.08) saturate(0.82)' }}>
            {/* vidéo — desktop et mobile, autoplay sur premier geste iOS */}
            <video ref={videoRef} autoPlay muted loop playsInline preload="auto"
              poster="/hero-mobile-poster.webp"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ left: '5%', width: '97%' }}>
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          </div>
          {/* gradient left fade — desktop fort, mobile léger */}
          <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 8%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.5) 38%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.05) 70%, transparent 85%)' }} />
          <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.15) 100%)' }} />
          {/* vignette */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)' }} />
          <div className="absolute bottom-0 inset-x-0 h-32" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
        </motion.div>

        {/* content: text left + card right */}
        <motion.div className="relative z-10 h-full flex items-center px-10 md:px-20 gap-10 justify-between pt-16"
          style={{ opacity: heroOp }}>

          {/* LEFT: text */}
          <div className="max-w-[540px] flex-1">
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
              className="inline-block font-sans text-[0.75rem] tracking-[0.08em] uppercase rounded-full px-4 py-1.5 mb-5"
              style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
              Nouveauté France · Lancement 2026
            </motion.span>

            <h1 className="font-serif text-white leading-[1.08] tracking-[-0.02em] mb-2"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
              <HeroReveal baseDelay={0.28} segments={[
                { text: "Le faire-part qui s'ouvre" },
              ]} />
              {/* "d'un tap" — taille +8%, couleur, underline SVG animé */}
              <span className="relative inline-block ml-[0.26em]"
                style={{ color: '#ffd4c8', fontStyle: 'italic', fontSize: '1.08em' }}>
                {["d'un", 'tap'].map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom"
                    style={{ marginRight: i === 0 ? '0.16em' : 0, paddingRight: '0.1em', paddingBottom: '0.14em', marginBottom: '-0.14em' }}>
                    <motion.span className="inline-block"
                      initial={{ y: '108%' }} animate={{ y: '0%' }}
                      transition={{ duration: 0.72, delay: 0.28 + (4 + i) * 0.055, ease: EASE }}>
                      {w}
                    </motion.span>
                  </span>
                ))}
                {/* Underline qui se dessine après le dernier mot */}
                <svg viewBox="0 0 100 10" preserveAspectRatio="none"
                  style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%', height: 10, overflow: 'visible' }}>
                  <motion.path
                    d="M 1 6 C 18 2 38 9 58 5 C 76 1 90 8 99 5"
                    fill="none" stroke="#ffd4c8" strokeWidth="2.2" strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.85 }}
                    transition={{ delay: 0.28 + 5 * 0.055 + 0.22, duration: 0.52, ease: EASE }}
                  />
                </svg>
              </span>
            </h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="font-sans font-light leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem' }}>
              100 faire-parts NFC premium + site de mariage inclus. Vos invités approchent leur téléphone — votre site s'ouvre instantanément.
            </motion.p>

            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div key="form-wrap"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: 0.82, duration: 0.6 }}
                  className="flex flex-col gap-2">
                  <form ref={formRef} onSubmit={send} className="flex gap-2.5 flex-wrap">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="votre@email.fr"
                      className="font-sans flex-1 min-w-[200px] rounded-full outline-none border-0"
                      style={{ background: 'rgba(255,255,255,0.95)', color: '#2c2c2c', padding: '14px 20px', fontSize: '0.9rem' }} />
                    <motion.button type="submit"
                      className="font-sans font-medium rounded-full border-0 whitespace-nowrap relative overflow-hidden"
                      style={{ background: '#e8826a', color: 'white', padding: '14px 28px', fontSize: '0.9rem', cursor: 'pointer' }}
                      whileHover="hover" initial="rest"
                      variants={{
                        rest: { boxShadow: '0 4px 18px rgba(232,130,106,0.25)' },
                        hover: { boxShadow: '0 6px 28px rgba(232,130,106,0.55)', transition: { duration: 0.3 } },
                      }}>
                      <motion.span className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%)', x: '-120%' }}
                        variants={{ rest: { x: '-120%' }, hover: { x: '120%', transition: { duration: 0.5, ease: 'easeInOut' } } }} />
                      Créer mes faire-parts
                    </motion.button>
                  </form>
                  {/* micro-copy réassurance */}
                  <p className="font-sans font-light"
                    style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.02em' }}>
                    Livraison estimée printemps 2026 · Accompagnement personnalisé
                  </p>
                </motion.div>
              ) : (
                <motion.div key="success"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex items-center gap-4">
                  <svg viewBox="0 0 44 44" fill="none" style={{ width: 44, height: 44, flexShrink: 0 }}>
                    <circle cx="22" cy="22" r="20" stroke="rgba(232,130,106,0.15)" strokeWidth="1" />
                    <motion.circle cx="22" cy="22" r="20"
                      stroke="#e8826a" strokeWidth="1.1" strokeLinecap="round"
                      style={{ filter: 'drop-shadow(0 0 4px rgba(232,130,106,0.5))' }}
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.65, ease: EASE }} />
                    <motion.path d="M13 22 L20 29 L31 16"
                      stroke="#e8826a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.35, delay: 0.58, ease: EASE }} />
                  </svg>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="font-serif text-white leading-tight"
                      style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
                      Parfait — <span className="font-sans" style={{ color: '#ffd4c8', fontWeight: 400 }}>consultez vos mails</span>
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-sans font-light"
                        style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)' }}>
                        Notre équipe prend contact avec vous sous 24h ·
                      </span>
                      <button onClick={copyLink} className="font-sans border-0 bg-transparent p-0"
                        style={{
                          fontSize: '0.74rem', color: copied ? '#e8826a' : 'rgba(255,255,255,0.5)',
                          textDecoration: 'underline', textUnderlineOffset: 3,
                          cursor: 'pointer', transition: 'color .2s',
                        }}>
                        {copied ? '✦ lien copié' : 'partager le lien'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="flex items-center gap-3 mt-6">
              {/* avatar stack — couple crème chaud, cœur au-dessus des têtes */}
              <div className="flex -space-x-2.5">
                {[
                  { bg: '#f0dcc8', ic: '#b85c3a', ht: '#e8826a' },
                  { bg: '#eedec6', ic: '#7a5c28', ht: '#c8a86e' },
                  { bg: '#f5e6d6', ic: '#c8744a', ht: '#e8826a' },
                  { bg: '#e8d8bc', ic: '#6e5230', ht: '#c8a86e' },
                ].map((s, i) => (
                  <div key={i} className="w-9 h-9 rounded-full overflow-hidden"
                    style={{ background: s.bg, boxShadow: '0 0 0 2px #0c0b09', flexShrink: 0 }}>
                    <svg viewBox="0 0 100 100" width="36" height="36">
                      {/* cœur flottant au-dessus */}
                      <path d="M50 28 C50 26 48 23 45 25 C43 26 43 30 50 35 C57 30 57 26 55 25 C52 23 50 26 50 28Z" fill={s.ht} />
                      {/* silhouette gauche */}
                      <circle cx="34" cy="45" r="9" fill={s.ic} />
                      <path d="M24 56 Q34 53 44 56 L46 73 H22 Z" fill={s.ic} />
                      {/* silhouette droite */}
                      <circle cx="66" cy="45" r="9" fill={s.ic} opacity="0.5" />
                      <path d="M56 56 Q66 53 76 56 L78 73 H54 Z" fill={s.ic} opacity="0.5" />
                    </svg>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <motion.div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.6)' }}
                  animate={{ opacity: [1, 0.25, 1], scale: [1, 1.5, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
                <p className="font-sans" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.42)', letterSpacing: '0.01em' }}>
                  47 couples inscrits ce mois-ci
                </p>
              </div>
            </motion.div>
          </div>

        </motion.div>

        {/* scroll indicator — chevron élégant */}
        <motion.div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] pointer-events-none"
          style={{ opacity: heroOp }}>
          <motion.svg width="18" height="10" viewBox="0 0 18 10" fill="none"
            animate={{ y: [0, 4, 0], opacity: [0.45, 0.9, 0.45] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
            <path d="M1 1 L9 9 L17 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </motion.div>
      </section>

      {/* ════ MARQUEE ════════════════════════════════════════════ */}
      <div className="overflow-hidden" style={{
        background: '#0f0e0c',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}>
        <div className="marquee-track">
          {[0,1].flatMap(r =>
            ['Livraison en 5 jours', 'NFC · Tap pour ouvrir', 'Site inclus 24 mois', 'RSVP en temps réel', 'Fait en France']
              .map((t, i) => (
                <div key={`${r}-${i}`} className="flex items-center gap-4 shrink-0 px-12 py-4">
                  <span className="font-sans text-[0.73rem] tracking-[0.1em] uppercase whitespace-nowrap"
                    style={{ color: 'rgba(255,255,255,0.55)' }}>{t}</span>
                  <span style={{ color: '#c8a86e', opacity: 0.6, fontSize: '0.5rem' }}>✦</span>
                </div>
              ))
          )}
        </div>
      </div>

      {/* ════ NFC SEQUENCE ══════════════════════════════════════ */}
      <div id="scene"><NfcScene /></div>

      {/* ════ STATS ══════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-8 md:px-16" style={{ background: 'white', borderBottom: '1px solid #ece8e4' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#ece8e4]">
          {[
            { v: 1, pre: '< ', s: 's', l: 'Ouverture' },
            { v: 0, pre: '', s: '', l: 'App à télécharger' },
            { v: 95, pre: '', s: '%', l: 'Téléphones ok' },
            { v: 5, pre: '', s: 'j', l: 'Délai livraison' },
          ].map((s, i) => (
            <motion.div key={i} {...fu(i * 0.08)} className="text-center py-8 px-4">
              <p className="font-serif mb-1" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#2c2c2c', lineHeight: 1 }}>
                <Count to={s.v} prefix={s.pre} suffix={s.s} />
              </p>
              <p className="font-sans text-[0.72rem] tracking-[0.06em]" style={{ color: '#aaa' }}>{s.l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════ COMMENT ÇA MARCHE ══════════════════════════════════ */}
      <section className="py-20 md:py-32 px-8 md:px-16" style={{ background: '#f8f7f6' }}>
        <div className="max-w-5xl mx-auto">
          <motion.p {...fu()} className="font-sans font-medium text-[0.7rem] tracking-[0.14em] uppercase mb-4" style={{ color: '#e8826a' }}>
            Comment ça marche
          </motion.p>
          <div className="overflow-hidden mb-14">
            <h2 className="font-serif leading-[1.1] tracking-[-0.025em]" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: '#2c2c2c' }}>
              <Reveal text="Aussi simple que" />{' '}
              <span style={{ color: '#e8826a' }}><Reveal text="votre oui." delay={0.1} /></span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: '01', h: 'Vous personnalisez', b: "Choisissez votre design de carte et sticker NFC. Remplissez les informations de votre mariage. Votre site est en ligne en 10 minutes." },
              { n: '02', h: 'On fabrique',        b: "On programme chaque puce NFC, on assemble, on teste. 100 cartes prêtes, livrées en 5 jours ouvrés.", highlight: true },
              { n: '03', h: 'Ils tapent',          b: "Téléphone → sticker → site. En moins d'une seconde. Les RSVP arrivent dans votre dashboard en temps réel." },
            ].map((c, i) => (
              <motion.div key={i} {...fu(i * 0.1)}
                className="rounded-2xl p-8 border"
                style={{
                  background: c.highlight ? '#e8826a' : 'white',
                  borderColor: c.highlight ? '#e8826a' : '#ece8e4',
                  boxShadow: c.highlight ? '0 8px 32px rgba(232,130,106,0.25)' : '0 2px 16px rgba(0,0,0,0.04)'
                }}>
                <p className="font-serif text-3xl mb-6" style={{ color: c.highlight ? 'rgba(255,255,255,0.45)' : '#e8d4cc' }}>{c.n}</p>
                <h3 className="font-sans font-medium mb-3" style={{ fontSize: '1rem', color: c.highlight ? 'white' : '#2c2c2c' }}>{c.h}</h3>
                <p className="font-sans font-light text-sm leading-relaxed" style={{ color: c.highlight ? 'rgba(255,255,255,0.75)' : '#7a7a7a' }}>{c.b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ LA CARTE ═══════════════════════════════════════════ */}
      <section id="carte" style={{ background: 'white', borderTop: '1px solid #ece8e4' }}>
        <div className="flex flex-col lg:flex-row min-h-[85vh]">
          {/* text */}
          <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 lg:py-0 lg:w-1/2">
            <motion.p {...fu()} className="font-sans font-medium text-[0.7rem] tracking-[0.14em] uppercase mb-5" style={{ color: '#e8826a' }}>
              La carte
            </motion.p>
            <div className="overflow-hidden mb-5">
              <h2 className="font-serif leading-[1.1] tracking-[-0.025em]" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: '#2c2c2c' }}>
                <Reveal text="Un faire-part qui fait" /><br />
                <span style={{ color: '#e8826a', fontStyle: 'italic' }}><Reveal text="plus que son job." delay={0.1} /></span>
              </h2>
            </div>
            <motion.p {...fu(0.2)} className="font-sans font-light leading-[1.8] mb-8 max-w-sm" style={{ color: '#7a7a7a', fontSize: '0.95rem' }}>
              Papier 350g finition mat. Sticker 3D résine époxy. La puce NFC est glissée sous le sticker — invisible, indécelable. L'effet de surprise est intact.
            </motion.p>
            <ul className="space-y-2.5 list-none mb-8">
              {['Puce NTAG213 — standard NFC mondial','Compatible iPhone 7+ et tous Android NFC','QR code au dos — couverture 100%','5 designs de stickers au lancement','Chaque puce testée avant envoi'].map((t, i) => (
                <motion.li key={i} {...fu(0.25 + i * 0.055)} className="flex items-center gap-2.5 font-sans text-[0.9rem]" style={{ color: '#2c2c2c' }}>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#e8826a' }} />{t}
                </motion.li>
              ))}
            </ul>
            <motion.div {...fu(0.45)}>
              <Mag>
                <a href="#cta" data-mag className="inline-block font-sans font-medium rounded-full px-7 py-3.5 no-underline transition-opacity hover:opacity-85"
                  style={{ background: '#e8826a', color: 'white', fontSize: '0.9rem' }}>
                  Voir les tarifs
                </a>
              </Mag>
            </motion.div>
          </div>

          {/* visual */}
          <div className="lg:w-1/2 min-h-[420px] relative flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #fdf0ec 0%, #faeae4 60%, #f5e0d8 100%)' }}>
            {/*
              ★ PHOTO ICI — retirer le div ci-dessous et décommenter :
              <img src="/carte-photo.jpg" className="absolute inset-0 w-full h-full object-cover" />

              PROMPT :
              "luxury wedding invitation card flat lay, white 350gsm paper, round coral-gold
              epoxy dome sticker, soft window light, editorial stationery photography, minimal,
              warm coral and cream palette, shallow DOF on dome, no text, 4K product photo"
            */}
            <motion.div {...fu(0.1)} className="relative z-10">
              <div className="bg-white rounded-2xl overflow-hidden"
                style={{ width: 'clamp(220px, 30vw, 360px)', boxShadow: '0 24px 64px rgba(0,0,0,0.1)' }}>
                <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #e8826a, #f5b0a0, #e8826a)' }} />
                <div className="px-8 py-8">
                  <p className="font-sans text-[0.42rem] tracking-[0.28em] uppercase mb-4" style={{ color: '#ccc' }}>Invitation au mariage</p>
                  <p className="font-serif mb-1.5" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', color: '#2c2c2c' }}>Léa & Maxime</p>
                  <p className="font-sans font-light text-sm mb-0.5" style={{ color: '#9a9a9a' }}>20 septembre 2026</p>
                  <p className="font-sans font-light text-xs mb-6" style={{ color: '#c0c0c0' }}>Château de Vaux-le-Vicomte</p>
                  <div className="h-px mb-5" style={{ background: '#f0f0f0' }} />
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-[0.42rem] tracking-[0.12em] uppercase" style={{ color: '#bbb' }}>Approchez votre tél.</p>
                    <div className="w-7 h-7 rounded-full shrink-0"
                      style={{ background: 'radial-gradient(circle at 35% 28%, #f5b090 0%, #e8826a 50%, #b05838 100%)', boxShadow: '0 3px 10px rgba(232,130,106,0.5)' }} />
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div {...fu(0.3)} className="absolute bottom-7 right-7 rounded-xl px-4 py-3"
              style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #ece8e4' }}>
              <p className="font-sans text-[0.5rem] tracking-[0.1em] uppercase mb-0.5" style={{ color: '#9a9a9a' }}>Qualité papier</p>
              <p className="font-serif text-lg" style={{ color: '#2c2c2c' }}>350g premium</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════ LE SITE ════════════════════════════════════════════ */}
      <section style={{ background: '#f8f7f6', borderTop: '1px solid #ece8e4' }}>
        <div className="flex flex-col-reverse lg:flex-row min-h-[85vh]">
          {/* visual dark */}
          <div className="lg:w-1/2 min-h-[420px] relative flex items-center justify-center" style={{ background: '#1a1a1a' }}>
            <motion.div {...fu(0.1)} className="relative z-10 px-10 w-full max-w-[360px]">
              <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase mb-6 text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>Dashboard en direct</p>

              <div className="rounded-2xl p-6 mb-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-sans text-[0.62rem] tracking-[0.1em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>RSVP confirmés</p>
                  <span className="font-sans text-[0.56rem] rounded-full px-2.5 py-0.5" style={{ color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>↑ En direct</span>
                </div>
                <p className="font-serif text-white mb-1" style={{ fontSize: '3rem', lineHeight: 1 }}>84</p>
                <p className="font-sans text-xs mb-3" style={{ color: 'rgba(255,255,255,0.22)' }}>sur 120 invités · 70%</p>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full" style={{ width: '70%', background: '#e8826a' }} />
                </div>
              </div>

              {[['Marie Dupont','Présente + 1','#e8826a'],['Jean Martin','Présent','#a8c5b5'],['Camille B.','Présente','#c4a8c8']].map(([n,s,c],i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-2.5 mb-2"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center font-sans text-[0.42rem] text-white" style={{ background: c }}>
                    {n.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[0.68rem]" style={{ color: 'rgba(255,255,255,0.55)' }}>{n}</p>
                    <p className="font-sans text-[0.56rem]" style={{ color: 'rgba(255,255,255,0.22)' }}>{s}</p>
                  </div>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"><path d="M1.5 4.5l2.5 2.5 4-4"/></svg>
                </div>
              ))}
            </motion.div>
          </div>

          {/* text */}
          <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 lg:py-0 lg:w-1/2">
            <motion.p {...fu()} className="font-sans font-medium text-[0.7rem] tracking-[0.14em] uppercase mb-5" style={{ color: '#e8826a' }}>
              Le site de mariage
            </motion.p>
            <div className="overflow-hidden mb-5">
              <h2 className="font-serif leading-[1.1] tracking-[-0.025em]" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: '#2c2c2c' }}>
                <Reveal text="Votre site inclus," /><br />
                <span style={{ color: '#e8826a', fontStyle: 'italic' }}><Reveal text="prêt en 10 minutes." delay={0.1} /></span>
              </h2>
            </div>
            <motion.p {...fu(0.2)} className="font-sans font-light leading-[1.8] mb-8 max-w-sm" style={{ color: '#7a7a7a', fontSize: '0.95rem' }}>
              RSVP intelligent, programme, plan d'accès, galerie partagée, livre d'or. Hébergé 24 mois. Modifiable à tout moment.
            </motion.p>
            <ul className="space-y-2.5 list-none">
              {['RSVP en temps réel avec export CSV','Notifications email à chaque confirmation','Plan GPS depuis la position des invités','Galerie — les invités uploadent leurs photos','Compte à rebours jusqu\'au jour J'].map((t, i) => (
                <motion.li key={i} {...fu(0.25 + i * 0.055)} className="flex items-center gap-2.5 font-sans text-[0.9rem]" style={{ color: '#2c2c2c' }}>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#e8826a' }} />{t}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ════ TESTIMONIALS ═══════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-8 md:px-16" style={{ background: 'white', borderTop: '1px solid #ece8e4' }}>
        <div className="max-w-5xl mx-auto">
          <motion.p {...fu()} className="font-sans font-medium text-[0.7rem] tracking-[0.14em] uppercase mb-5" style={{ color: '#e8826a' }}>
            Ils l'ont vécu
          </motion.p>
          <div className="overflow-hidden mb-14">
            <h2 className="font-serif leading-[1.1] tracking-[-0.025em]" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: '#2c2c2c' }}>
              <Reveal text="Nos premiers couples ont dit oui." />
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { q: '"Nos invités ont tous réagi de la même façon. Ils tapent, le site s\'ouvre, ils n\'en reviennent pas. Ma grand-mère de 78 ans l\'a fait seule."', n: 'Léa & Maxime', w: 'Juin 2026 · Paris', c: '#e8826a' },
              { q: '"Le RSVP automatique m\'a sauvé la vie. 140 invités, zéro WhatsApp de suivi. La carte est tellement belle qu\'on en a gardé une."', n: 'Camille & Hugo', w: 'Juillet 2026 · Lyon', c: '#a8c5b5' },
              { q: '"Des gens nous ont contactés juste pour demander comment on avait fait ça. Plusieurs ont filmé leur premier tap pour leurs stories."', n: 'Sophie & Théo', w: 'Sept. 2026 · Bordeaux', c: '#c4a8c8' },
            ].map((t, i) => (
              <motion.div key={i} {...fu(i * 0.1)}
                className="rounded-2xl p-7"
                style={{ background: '#f8f7f6', border: '1px solid #ece8e4' }}>
                <div className="flex gap-0.5 mb-5">
                  {Array(5).fill(0).map((_, j) => <span key={j} style={{ color: '#e8826a', fontSize: '0.65rem' }}>★</span>)}
                </div>
                <p className="font-serif italic leading-[1.75] mb-6" style={{ color: '#2c2c2c', fontSize: '1rem' }}>{t.q}</p>
                <div className="h-px mb-5" style={{ background: '#ece8e4' }} />
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-sans text-white text-[0.48rem] shrink-0" style={{ background: t.c }}>
                    {t.n.split(' & ').map(x => x[0]).join('+')}
                  </div>
                  <div>
                    <p className="font-sans font-medium text-sm" style={{ color: '#2c2c2c' }}>{t.n}</p>
                    <p className="font-sans text-xs" style={{ color: '#9a9a9a' }}>{t.w}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ TARIFS ═════════════════════════════════════════════ */}
      <section id="tarifs" className="py-20 md:py-32 px-8 md:px-16" style={{ background: '#f8f7f6', borderTop: '1px solid #ece8e4' }}>
        <div className="max-w-5xl mx-auto">
          <motion.p {...fu()} className="font-sans font-medium text-[0.7rem] tracking-[0.14em] uppercase mb-5" style={{ color: '#e8826a' }}>
            Les offres
          </motion.p>
          <div className="overflow-hidden mb-3">
            <h2 className="font-serif leading-[1.1] tracking-[-0.025em]" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: '#2c2c2c' }}>
              <Reveal text="Simple comme votre oui." />
            </h2>
          </div>
          <motion.p {...fu(0.15)} className="font-sans font-light text-sm mb-14" style={{ color: '#aaa' }}>
            Une commande · Aucun abonnement · Votre contenu vous appartient
          </motion.p>

          <div className="grid md:grid-cols-3 gap-4 items-start">
            {[
              { tier: 'Essentiel', price: '149', note: 'Bientôt 199€', sub: '5 couples fondateurs',
                feats: ['80 cartes NFC 350g','Sticker plat doré (5 designs)','Site mariage 12 mois','RSVP · Programme · Accès','Support email'],
                cta: 'Je veux ce tarif', hi: false },
              { tier: 'Premium', price: '199', note: 'Bientôt 299€', sub: 'Prix de lancement',
                feats: ['100 cartes NFC 350g','Sticker 3D époxy (luxe)','Site mariage 24 mois','RSVP · Galerie · Livre d\'or','Compte à rebours','Support prioritaire'],
                cta: 'Créer mes faire-parts →', hi: true, badge: 'Le plus choisi' },
              { tier: 'Prestige', price: '279', note: 'La clé de votre mariage', sub: 'Packaging collector',
                feats: ['100 cartes + carte NFC plastique','Format carte hôtel premium','Packaging soigné inclus','Site complet 24 mois','Support VIP dédié'],
                cta: 'Me contacter', hi: false },
            ].map((p, i) => (
              <motion.div key={i} {...fu(i * 0.09)}
                className="relative rounded-2xl p-8 flex flex-col"
                style={{
                  background: p.hi ? '#e8826a' : 'white',
                  border: p.hi ? 'none' : '1px solid #ece8e4',
                  boxShadow: p.hi ? '0 12px 48px rgba(232,130,106,0.35)' : '0 2px 16px rgba(0,0,0,0.04)',
                  ...(p.hi && { marginTop: '-8px', marginBottom: '-8px' })
                }}>
                {p.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-sans text-[0.58rem] tracking-[0.1em] uppercase rounded-full px-4 py-1 whitespace-nowrap"
                    style={{ background: '#2c2c2c', color: 'white' }}>
                    {p.badge}
                  </span>
                )}
                <p className="font-sans text-[0.65rem] tracking-[0.16em] uppercase mb-5" style={{ color: p.hi ? 'rgba(255,255,255,0.55)' : '#aaa' }}>{p.tier}</p>
                <p className="font-serif mb-1" style={{ fontSize: 'clamp(2.8rem, 5vw, 4rem)', color: p.hi ? 'white' : '#2c2c2c', lineHeight: 1 }}>
                  €{p.price}
                </p>
                <p className="font-sans text-xs mb-0.5" style={{ color: p.hi ? 'rgba(255,255,255,0.4)' : '#bbb', textDecoration: 'line-through' }}>{p.note}</p>
                <p className="font-sans font-medium text-[0.78rem] mb-6" style={{ color: p.hi ? 'rgba(255,255,255,0.7)' : '#e8826a' }}>{p.sub}</p>
                <div className="h-px mb-6" style={{ background: p.hi ? 'rgba(255,255,255,0.15)' : '#ece8e4' }} />
                <ul className="space-y-2.5 flex-1 mb-7 list-none">
                  {p.feats.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 font-sans text-sm" style={{ color: p.hi ? 'rgba(255,255,255,0.75)' : '#5a5a5a' }}>
                      <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" viewBox="0 0 14 14" fill="none"
                        stroke={p.hi ? 'rgba(255,255,255,0.7)' : '#e8826a'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 7l3.5 3.5L12 2.5"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Mag>
                  <a href="#cta" data-mag
                    className="block w-full py-3.5 text-center font-sans font-medium text-[0.82rem] rounded-full no-underline transition-opacity hover:opacity-85"
                    style={p.hi
                      ? { background: 'white', color: '#e8826a' }
                      : { background: '#e8826a', color: 'white' }}>
                    {p.cta}
                  </a>
                </Mag>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FAQ ════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-8 md:px-16" style={{ background: 'white', borderTop: '1px solid #ece8e4' }}>
        <div className="max-w-2xl mx-auto">
          <motion.p {...fu()} className="font-sans font-medium text-[0.7rem] tracking-[0.14em] uppercase mb-5" style={{ color: '#e8826a' }}>
            Questions
          </motion.p>
          <div className="overflow-hidden mb-12">
            <h2 className="font-serif leading-[1.1] tracking-[-0.025em]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#2c2c2c' }}>
              <Reveal text="Tout ce que vous voulez savoir." />
            </h2>
          </div>
          <div style={{ borderTop: '1px solid #ece8e4' }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ borderBottom: '1px solid #ece8e4' }}>
                <button data-mag onClick={() => setFaq(faq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-5 bg-transparent border-0"
                  style={{ cursor: 'pointer' }}>
                  <span className="font-sans text-sm transition-colors duration-200"
                    style={{ color: faq === i ? '#2c2c2c' : '#5a5a5a' }}>{f.q}</span>
                  <div className="w-7 h-7 rounded-full border shrink-0 flex items-center justify-center transition-all duration-300"
                    style={faq === i ? { background: '#fdf0ec', borderColor: '#e8826a' } : { borderColor: '#ddd8d4' }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" strokeLinecap="round"
                      stroke={faq === i ? '#e8826a' : '#aaa'} strokeWidth="1.5"
                      style={{ transform: faq === i ? 'rotate(45deg)' : 'none', transition: 'transform .2s' }}>
                      <path d="M4 0.5v7M0.5 4h7"/>
                    </svg>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {faq === i && (
                    <motion.div key="a"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.26, ease: EASE }}
                      className="overflow-hidden">
                      <p className="font-sans font-light text-sm leading-relaxed pb-5" style={{ color: '#7a7a7a' }}>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CTA ════════════════════════════════════════════════ */}
      <section id="cta" className="relative overflow-hidden text-center" style={{ background: '#2c2c2c', padding: '100px 32px' }}>
        {/* subtle coral glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(232,130,106,0.12) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-lg mx-auto">
          <motion.span {...fu()}
            className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-10"
            style={{ background: 'rgba(232,130,106,0.12)', border: '1px solid rgba(232,130,106,0.25)', color: '#f0a090' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#e8826a', animation: 'dot-pulse 1.9s ease-in-out infinite' }} />
            <span className="font-sans text-[0.62rem] tracking-[0.16em] uppercase">5 places fondateurs — limité</span>
          </motion.span>

          <div className="overflow-hidden mb-4">
            <h2 className="font-serif leading-[1.05] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', color: 'white' }}>
              <motion.span className="block" initial={{ y: '100%' }} whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.75, ease: EASE }}>
                Prêts à épater
              </motion.span>
              <motion.span className="block italic" initial={{ y: '100%' }} whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.75, delay: 0.12, ease: EASE }}
                style={{ color: '#e8826a' }}>
                vos invités ?
              </motion.span>
            </h2>
          </div>

          <motion.p {...fu(0.3)} className="font-sans font-light leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem' }}>
            Laissez votre email — je vous contacte dans les 24h pour discuter de votre projet.
          </motion.p>

          <motion.form {...fu(0.4)} onSubmit={send} className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.fr"
              className="flex-1 max-w-xs font-sans rounded-full border-0 outline-none text-center sm:text-left"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'white', padding: '14px 22px', fontSize: '0.9rem' }} />
            <Mag>
              <button type="submit" data-mag className="font-sans font-medium rounded-full border-0 whitespace-nowrap"
                style={{ background: '#e8826a', color: 'white', padding: '14px 28px', fontSize: '0.9rem', cursor: 'pointer' }}>
                Créer mes faire-parts
              </button>
            </Mag>
          </motion.form>

          <motion.p {...fu(0.5)} className="font-sans text-xs mt-5" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Un seul email · Aucun spam · Jamais
          </motion.p>
        </div>
      </section>

      {/* ════ FOOTER ═════════════════════════════════════════════ */}
      <footer className="flex flex-wrap justify-between items-center gap-4 px-8 md:px-14 py-6"
        style={{ background: '#1a1a1a', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <span className="font-pacifico text-[1.1rem]" style={{ color: 'white' }}>
          Wedding<span style={{ color: 'rgba(255,200,180,1)' }}>Ding</span>
        </span>
        <div className="flex gap-6">
          {['Confidentialité','CGV','Contact'].map(l => (
            <a key={l} href="#" className="font-sans text-xs no-underline transition-colors" style={{ color: 'rgba(255,255,255,0.2)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}>
              {l}
            </a>
          ))}
        </div>
        <p className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.12)' }}>© 2026 WeddingDing · Fait avec ♥ en France</p>
      </footer>

    </>
  )
}
