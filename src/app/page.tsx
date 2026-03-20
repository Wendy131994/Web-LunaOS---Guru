'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// =============================================================================
// ANIMATIONS
// =============================================================================
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}
const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}
const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
}
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const viewportOnce = { once: true, margin: '-40px' as const }

// =============================================================================
// SHARED
// =============================================================================
function RotatingWords({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 2500)
    return () => clearInterval(interval)
  }, [words.length])
  return (
    <AnimatePresence mode="wait">
      <motion.span key={words[index]} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="text-[#B056F6] inline-block">
        {words[index]}
      </motion.span>
    </AnimatePresence>
  )
}

/* eslint-disable @next/next/no-img-element */

// =============================================================================
// HEADER
// =============================================================================
function Header() {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > 100) {
        setVisible(currentY < lastScrollY)
      } else {
        setVisible(true)
      }
      setLastScrollY(currentY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-10"
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <img src="https://www.gurusoluciones.com/hubfs/20211013_logo-blanco.svg" alt="Gurú Soluciones" className="h-10 object-contain brightness-0 opacity-80" loading="lazy" />
        <a href="#demo" className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold bg-[#CDFF22] text-[#240537] border border-[#400863] hover:bg-[#B8E61F] transition-all">
          Pide tu demo
        </a>
      </div>
    </motion.header>
  )
}

// =============================================================================
// HERO
// =============================================================================
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-luna-hero">
      {/* Glows decorativos */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-[#B056F6]/10 blur-[150px]" />
        <div className="absolute -left-20 top-0 h-[500px] w-[500px] rounded-full bg-[#E9D5FF]/40 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-white/30 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 text-center relative z-10 pt-16">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          <motion.div variants={fadeInUp} className="mb-8">
            <span className="font-display text-lg md:text-xl font-bold tracking-wide text-[#B056F6]">Hola, soy Luna ✦</span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#240537]">
            El segundo cerebro de<br /><RotatingWords words={['tu negocio.', 'tus ventas.', 'tu marketing.', 'tu CRM.']} />
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-6 text-lg md:text-xl leading-relaxed text-[#240537]/70 max-w-2xl mx-auto font-body">
            Gestiono tu CRM, segmento tus clientes, creo contenido y lanzo campañas. Soy tu IA aliada para crecer.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-10 flex justify-center">
            <motion.a href="#demo" whileHover={{ y: -3, boxShadow: '0 0 40px rgba(205, 255, 34, 0.3)' }} whileTap={{ scale: 0.98 }} className="btn-luna text-lg">Pide una demo para tu negocio</motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// ASISTENTE DE VENTAS — 2 cols: texto izq | cards der
// =============================================================================
function SalesAssistantSection() {
  const channels = [
    { icon: '💬', name: 'WhatsApp Business', desc: 'Respondo al instante, proceso audios y retomo ventas donde se quedaron.' },
    { icon: '📸', name: 'Instagram', desc: 'Gestiono DMs, menciones y cierro ventas desde Stories.' },
    { icon: '✉️', name: 'Email', desc: 'Cotizaciones profesionales y seguimiento segmentado.' },
    { icon: '🌐', name: 'Chat Web', desc: 'Atiendo visitantes 24/7 y capturo leads automáticamente.' },
  ]

  return (
    <section className="relative py-24 overflow-hidden bg-white" id="sales-assistant">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-56 -top-44 h-[520px] w-[520px] rounded-full bg-[#B056F6]/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-[720px] w-[720px] translate-x-1/3 rounded-full bg-white/60 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Columna izquierda: texto */}
          <motion.div className="flex-1 lg:text-left text-center" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.div variants={fadeInLeft} className="mb-4"><span className="section-label">Tu asistente de ventas con IA</span></motion.div>
            <motion.h2 variants={fadeInLeft} className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-[#240537]">
              Atiendo a tus clientes en <span className="title-highlight">todos tus canales</span>
            </motion.h2>
            <motion.p variants={fadeInLeft} className="mt-5 text-lg text-[#240537]/70 font-body leading-relaxed">
              No importa por dónde llegue tu cliente, yo lo recibo, lo atiendo y te ayudo a cerrar la venta.
            </motion.p>
            <motion.div variants={fadeInLeft} className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🧠</span>
                <p className="text-[#240537]/70 font-body"><strong className="text-[#240537]">Priorizo oportunidades:</strong> te indico cuáles leads tienen mayor probabilidad de convertir.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">🔔</span>
                <p className="text-[#240537]/70 font-body"><strong className="text-[#240537]">Alertas en tiempo real:</strong> cuando un cliente muestra señales de compra, te aviso al instante.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeInLeft} className="mt-8">
              <motion.a href="#demo" whileHover={{ y: -3, boxShadow: '0 0 40px rgba(205, 255, 34, 0.3)' }} whileTap={{ scale: 0.98 }} className="btn-luna text-lg">Quiero vender más con Luna</motion.a>
            </motion.div>
          </motion.div>

          {/* Columna derecha: cards de canales */}
          <motion.div className="flex-1 grid grid-cols-2 gap-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            {channels.map((ch) => (
              <motion.div key={ch.name} variants={fadeInRight} className="bg-white/70 backdrop-blur-sm rounded-[20px] p-6 border border-[#B056F6]/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-3">{ch.icon}</div>
                <h3 className="font-display text-base font-bold text-[#240537] mb-1">{ch.name}</h3>
                <p className="text-[#240537]/60 font-body text-sm leading-relaxed">{ch.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// CRM — 2 cols: steps izq | imagen der
// =============================================================================
function CRMSection() {
  const steps = [
    { number: '01', title: 'Reúno todas las interacciones', description: 'Las interpreto y organizo para que tengas una visión completa de cada cliente.' },
    { number: '02', title: 'Te envío alertas inteligentes', description: 'Para que no se te escape ninguna oportunidad de venta.' },
    { number: '03', title: 'Convierto más leads en clientes', description: 'Gracias a automatizaciones y reportes inteligentes que trabajan por ti.' },
  ]

  return (
    <section className="relative py-24 overflow-hidden bg-[#F9F3FF]" id="crm">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-56 -top-44 h-[520px] w-[520px] rounded-full bg-[#F2E4F9]/40 blur-3xl" />
        <div className="absolute right-0 top-0 h-[720px] w-[720px] translate-x-1/3 rounded-full bg-white/70 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Columna izquierda: texto + steps */}
          <motion.div className="flex-1" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.div variants={fadeInLeft} className="mb-4"><span className="section-label">Tu CRM impulsado por Luna</span></motion.div>
            <motion.h2 variants={fadeInLeft} className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-[#240537]">
              Organizo todo en <span className="title-highlight">un mismo lugar</span>
            </motion.h2>
            <div className="mb-8" />
            <div className="space-y-5">
              {steps.map((step) => (
                <motion.div key={step.number} variants={fadeInLeft} className="flex items-start gap-5 glass-card-luna p-6">
                  <span className="font-display text-xl font-extrabold text-[#B056F6]">{step.number}.</span>
                  <div>
                    <h3 className="font-display text-base font-bold text-[#240537] mb-1">{step.title}</h3>
                    <p className="text-[#240537]/60 font-body text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeInLeft} className="mt-8">
              <motion.a href="#demo" whileHover={{ y: -3, boxShadow: '0 0 40px rgba(205, 255, 34, 0.3)' }} whileTap={{ scale: 0.98 }} className="btn-luna text-lg">Quiero asesorarme</motion.a>
            </motion.div>
          </motion.div>

          {/* Columna derecha: imagen */}
          <motion.div className="flex-1" variants={fadeInRight} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <div className="rounded-[32px] border-2 border-[#B056F6]/30 p-6 bg-gradient-to-br from-[#F2E4F9]/20 to-white overflow-hidden">
              <img src="https://www.gurusoluciones.com/hubfs/frame_02-imagen-01%20new.png" alt="CRM Dashboard" className="w-full h-auto rounded-2xl object-cover" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// MICROSEGMENTACIÓN — fondo oscuro, 2 cols por card
// =============================================================================
function MicrosegmentacionSection() {
  const segments = [
    { icon: '🔄', title: 'Clientes que no vuelven hace 30 días', description: 'Los detecto y les envío una oferta personalizada para traerlos de vuelta.', stat: '85%', statLabel: 'tasa de apertura en WhatsApp' },
    { icon: '👑', title: 'Top compradores del mes', description: 'Les doy trato VIP con acceso anticipado y descuentos exclusivos.', stat: '3x', statLabel: 'más efectivo que email' },
    { icon: '🏷️', title: 'Clientes por tipo de servicio', description: 'Cuando lanzas algo nuevo, solo se lo muestro a quien realmente le interesa.', stat: '71%', statLabel: 'tasa de resolución' },
    { icon: '🎯', title: 'Segmentos por comportamiento', description: 'Agrupo por frecuencia, ticket promedio y canal favorito. Cada mensaje es certero.', stat: '~15%', statLabel: 'conversión con asistente IA' },
  ]

  return (
    <section className="relative py-24 overflow-hidden bg-luna-dark" id="microsegmentacion">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-[#F2E4F9]/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[#B056F6]/[0.08] blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div className="max-w-3xl mx-auto text-center mb-16" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeInUp} className="mb-4"><span className="section-label-light">⭐ Mi superpoder</span></motion.div>
          <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-white">
            Microsegmentación: <span className="text-[#F2E4F9] text-luna-glow">la razón por la que convierto más</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-5 text-lg text-white/70 font-body leading-relaxed">
            No agrupo a tus clientes en categorías genéricas. Los conozco individualmente y creo segmentos ultra-específicos.
          </motion.p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {segments.map((seg) => (
            <motion.div key={seg.title} variants={fadeInUp} className="glass-card p-8 hover:border-[#F2E4F9]/30 transition-all duration-300">
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#F2E4F9]/15 flex items-center justify-center text-2xl border border-[#F2E4F9]/20">{seg.icon}</div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-white mb-2">{seg.title}</h3>
                  <p className="text-white/60 font-body leading-relaxed mb-3">{seg.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#CDFF22] font-display">{seg.stat}</span>
                    <span className="text-sm text-white/40 font-body">{seg.statLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-12 text-center" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.a href="#demo" whileHover={{ y: -3, boxShadow: '0 0 40px rgba(205, 255, 34, 0.3)' }} whileTap={{ scale: 0.98 }} className="btn-luna text-lg">Quiero segmentar así</motion.a>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// REDES SOCIALES — 2 cols: imagen izq | texto der
// =============================================================================
function SocialMediaSection() {
  const features = [
    { icon: '✍️', title: 'Genero contenido a tu medida', description: 'Posts, captions y textos adaptados al tono de tu marca.' },
    { icon: '📅', title: 'Organizo tu calendario', description: 'Te sugiero cuándo publicar basándome en datos reales.' },
    { icon: '📊', title: 'Mido lo que importa', description: 'Analizo qué funciona y te doy recomendaciones concretas.' },
    { icon: '🤖', title: 'Adapto todo automáticamente', description: 'Un contenido adaptado a Instagram, Facebook, TikTok y LinkedIn.' },
  ]

  return (
    <section className="relative py-24 overflow-hidden bg-[#F2E4F9]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-56 -top-44 h-[520px] w-[520px] rounded-full bg-[#B056F6]/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-[720px] w-[720px] translate-x-1/3 rounded-full bg-white/60 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Columna izquierda: imagen */}
          <motion.div className="flex-1" variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <div className="rounded-[32px] border-2 border-[#B056F6]/20 p-3 bg-white overflow-hidden shadow-lg">
              <img src="https://www.gurusoluciones.com/hubfs/mm2025/frame_03-imagen-02.webp" alt="Panel de redes sociales" className="w-full h-auto rounded-2xl object-cover" loading="lazy" />
            </div>
          </motion.div>

          {/* Columna derecha: texto + features */}
          <motion.div className="flex-1" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.div variants={fadeInRight} className="mb-4"><span className="section-label">Contenido para redes sociales</span></motion.div>
            <motion.h2 variants={fadeInRight} className="font-display text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] text-[#240537]">
              Creo contenido que <span className="title-highlight">conecta con tu audiencia</span>
            </motion.h2>
            <motion.p variants={fadeInRight} className="mt-4 text-lg text-[#240537]/60 font-body leading-relaxed mb-6">
              Se acabó el bloqueo creativo. Genero ideas, escribo textos y te sugiero el mejor momento para publicar.
            </motion.p>
            <div className="space-y-4">
              {features.map((feat) => (
                <motion.div key={feat.title} variants={fadeInRight} className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center text-xl border border-[#B056F6]/10">{feat.icon}</div>
                  <div>
                    <h3 className="font-display text-base font-bold text-[#240537]">{feat.title}</h3>
                    <p className="text-[#240537]/60 font-body text-sm leading-relaxed">{feat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeInRight} className="mt-8">
              <motion.a href="#demo" whileHover={{ y: -3, boxShadow: '0 0 40px rgba(205, 255, 34, 0.3)' }} whileTap={{ scale: 0.98 }} className="btn-luna text-lg">Quiero crear contenido con Luna</motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// WHATSAPP + EMAIL — 2 cols cada una, alternando lados
// =============================================================================
function WhatsAppSection() {
  const features = [
    { icon: '📱', title: 'Mensajes hiperpersonalizados', description: 'Basados en el historial y comportamiento de cada cliente.' },
    { icon: '⚡', title: 'Automatizo el envío', description: 'Configura una vez, yo envío en el momento óptimo.' },
    { icon: '📈', title: 'Mido cada resultado', description: 'Quién abrió, respondió y compró. Cada campaña mejora.' },
    { icon: '🎯', title: 'Segmento con precisión', description: 'Cada mensaje llega solo a quien realmente le interesa.' },
  ]

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-56 -top-44 h-[520px] w-[520px] rounded-full bg-[#B056F6]/8 blur-3xl" />
        <div className="absolute right-0 top-0 h-[720px] w-[720px] translate-x-1/3 rounded-full bg-[#F9F3FF]/50 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Columna izquierda: texto + features */}
          <motion.div className="flex-1" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.div variants={fadeInLeft} className="mb-4"><span className="section-label">Campañas de WhatsApp</span></motion.div>
            <motion.h2 variants={fadeInLeft} className="font-display text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] text-[#240537]">
              Lanzo campañas que <span className="title-highlight">realmente convierten</span>
            </motion.h2>
            <motion.p variants={fadeInLeft} className="mt-4 text-lg text-gray-600 font-body leading-relaxed mb-6">
              No es spam. Son mensajes personalizados, al cliente correcto, en el momento perfecto.
            </motion.p>
            <div className="space-y-4">
              {features.map((feat) => (
                <motion.div key={feat.title} variants={fadeInLeft} className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-[#F2E4F9] flex items-center justify-center text-xl border border-[#B056F6]/10">{feat.icon}</div>
                  <div>
                    <h3 className="font-display text-base font-bold text-[#240537]">{feat.title}</h3>
                    <p className="text-gray-600 font-body text-sm leading-relaxed">{feat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeInLeft} className="mt-8">
              <motion.a href="#demo" whileHover={{ y: -3, boxShadow: '0 0 40px rgba(205, 255, 34, 0.3)' }} whileTap={{ scale: 0.98 }} className="btn-luna text-lg">Quiero campañas que conviertan</motion.a>
            </motion.div>
          </motion.div>

          {/* Columna derecha: visual WhatsApp */}
          <motion.div className="flex-1" variants={fadeInRight} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <div className="rounded-[32px] bg-gradient-to-br from-[#25D366]/10 to-[#F2E4F9]/20 border-2 border-[#B056F6]/15 p-8 lg:p-12 flex flex-col items-center justify-center text-center">
              <img src="https://www.gurusoluciones.com/hs-fs/hubfs/mm2025/hero-icono-whatsapp.webp?width=120&height=120" alt="WhatsApp" className="w-24 h-24 mb-6 object-contain" loading="lazy" />
              <p className="font-display font-bold text-[#240537] text-xl mb-2">WhatsApp Business API</p>
              <p className="text-[#240537]/60 font-body">Mensajes masivos personalizados con la potencia de la microsegmentación de Luna.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function EmailMarketingSection() {
  const features = [
    { icon: '✉️', title: 'Diseño tus plantillas', description: 'Profesionales y adaptadas a tu marca.' },
    { icon: '🎯', title: 'Segmento cada envío', description: 'Cada email llega al segmento correcto.' },
    { icon: '⏰', title: 'Optimizo el momento', description: 'Envío cuando tus clientes realmente abren.' },
    { icon: '📊', title: 'Aprendo de cada campaña', description: 'Apertura, clics, conversiones. Siempre mejorando.' },
  ]

  return (
    <section className="relative py-24 overflow-hidden bg-[#F9F3FF]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-56 -top-44 h-[520px] w-[520px] rounded-full bg-[#B056F6]/8 blur-3xl" />
        <div className="absolute right-0 top-0 h-[720px] w-[720px] translate-x-1/3 rounded-full bg-white/50 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-12 lg:gap-16 items-center">
          {/* Columna derecha (visualmente): imagen */}
          <motion.div className="flex-1" variants={fadeInRight} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <div className="rounded-[32px] border-2 border-[#B056F6]/20 p-3 bg-white overflow-hidden shadow-lg">
              <img src="https://www.gurusoluciones.com/hubfs/mm2025/frame_03-imagen-01.webp" alt="Plantilla de email" className="w-full h-auto rounded-2xl object-cover" loading="lazy" />
            </div>
          </motion.div>

          {/* Columna izquierda (visualmente): texto */}
          <motion.div className="flex-1" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.div variants={fadeInLeft} className="mb-4"><span className="section-label">E-mail marketing</span></motion.div>
            <motion.h2 variants={fadeInLeft} className="font-display text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] text-[#240537]">
              Envío emails que <span className="title-highlight">llegan en el momento perfecto</span>
            </motion.h2>
            <motion.p variants={fadeInLeft} className="mt-4 text-lg text-[#240537]/60 font-body leading-relaxed mb-6">
              Diseño, segmento y envío tus campañas de email con precisión quirúrgica.
            </motion.p>
            <div className="space-y-4">
              {features.map((feat) => (
                <motion.div key={feat.title} variants={fadeInLeft} className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-[#F2E4F9] flex items-center justify-center text-xl border border-[#B056F6]/10">{feat.icon}</div>
                  <div>
                    <h3 className="font-display text-base font-bold text-[#240537]">{feat.title}</h3>
                    <p className="text-[#240537]/60 font-body text-sm leading-relaxed">{feat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeInLeft} className="mt-8">
              <motion.a href="#demo" whileHover={{ y: -3, boxShadow: '0 0 40px rgba(205, 255, 34, 0.3)' }} whileTap={{ scale: 0.98 }} className="btn-luna text-lg">Quiero email marketing con Luna</motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// STATS
// =============================================================================
function StatsSection() {
  const stats = [
    { icon: 'https://www.gurusoluciones.com/hs-fs/hubfs/20251127_2_frame_04-icono-01.png?width=80&height=80', value: '+16.000', label: 'webs hechas', sublabel: 'en Argentina y Latinoamérica (2024)' },
    { icon: 'https://www.gurusoluciones.com/hs-fs/hubfs/20251127_2_frame_04-icono-02.png?width=80&height=80', value: '+62.000', label: 'negocios', sublabel: 'nos eligen para vender más' },
    { icon: 'https://www.gurusoluciones.com/hs-fs/hubfs/20251127_2_frame_04-icono-03.png?width=80&height=80', value: '+50', label: 'años de experiencia', sublabel: 'acompañando empresas' },
  ]

  return (
    <section className="py-24 bg-luna-dark">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div className="max-w-4xl mx-auto text-center" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-extrabold text-white mb-3">
            <span className="italic">Nuestra experiencia</span> respalda tus resultados
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-white/60 font-body mb-12">Miles de negocios ya confían en gurú para crecer en internet:</motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={scaleUp} className="text-center">
                <img src={stat.icon} alt="" className="w-16 h-16 mx-auto mb-3 object-contain" loading="lazy" />
                <div className="text-4xl md:text-5xl font-extrabold text-[#CDFF22] font-display mb-2">{stat.value}</div>
                <p className="text-white font-bold font-display">{stat.label}</p>
                <p className="text-white/50 text-sm font-body">{stat.sublabel}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// FINAL CTA
// =============================================================================
function FinalCTASection() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#F2E4F9]" id="demo">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div className="text-center max-w-3xl mx-auto" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-[#240537]">
            Con gurú, tu negocio se organiza, crece y <span className="text-[#B056F6]">se potencia.</span>
            {' '}
            <img src="https://www.gurusoluciones.com/hs-fs/hubfs/20251126_hero-icono-luna.png?width=48&height=48" alt="Luna" className="inline-block w-8 h-8 ml-2" loading="lazy" />
          </motion.h2>
          <motion.div variants={fadeInUp} className="mt-10 flex justify-center">
            <motion.a href="#demo" whileHover={{ y: -3, boxShadow: '0 0 40px rgba(205, 255, 34, 0.3)' }} whileTap={{ scale: 0.98 }} className="btn-luna text-lg">Pide una demo para tu negocio</motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// FOOTER
// =============================================================================
function Footer() {
  return (
    <footer className="bg-white py-10 border-t border-[#F2E4F9]">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <p className="text-gray-400 text-sm font-body">&copy; 2026 Gurú Soluciones. Todos los derechos reservados.</p>
        <p className="text-[#B056F6]/40 text-xs mt-2 font-body">Potenciado por Luna — Inteligencia Artificial para tu negocio.</p>
      </div>
    </footer>
  )
}

// =============================================================================
// PAGE
// =============================================================================
export default function LunaLandingPage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <SalesAssistantSection />
      <CRMSection />
      <MicrosegmentacionSection />
      <SocialMediaSection />
      <WhatsAppSection />
      <EmailMarketingSection />
      <StatsSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
