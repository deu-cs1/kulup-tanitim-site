import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Mail,
  Menu,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react'
import './styles.css'

const content = {
  name: 'Kulüp',
  eyebrow: 'Topluluk, gelişim ve etki için yeni nesil kulüp deneyimi',
  title: 'Bir araya gelen fikirleri görünür etkiye dönüştüren kulüp.',
  intro:
    'Üyelerin kendini geliştirdiği, projeler ürettiği, etkinliklerde buluştuğu ve güçlü bir çevre edindiği dinamik bir topluluk yapısı.',
  primaryCta: 'Katılım Talebi Gönder',
  secondaryCta: 'Programı İncele',
  stats: [
    ['Aktif üyelik', 'Topluluk odaklı yapı'],
    ['Etkinlikler', 'Atölye, buluşma, proje'],
    ['Mentorluk', 'Deneyim paylaşımı'],
  ],
  valueProps: [
    {
      icon: Users,
      title: 'Güçlü topluluk',
      text: 'Benzer hedeflere sahip üyelerle düzenli temas, birlikte üretim ve sürdürülebilir ilişki ağı.',
    },
    {
      icon: CalendarDays,
      title: 'Nitelikli program',
      text: 'Seminerler, atölyeler, buluşmalar ve proje günleriyle yıl boyunca yaşayan bir kulüp takvimi.',
    },
    {
      icon: Target,
      title: 'Somut çıktı',
      text: 'Fikirlerin yalnızca konuşulmadığı, ekiplerle projeye ve ölçülebilir sonuca dönüştüğü çalışma modeli.',
    },
  ],
  sections: [
    {
      label: 'Amaç',
      title: 'Üyeleri yalnızca izleyici değil, aktif üretici yapan yapı.',
      text: 'Kulüp, üyelerin sosyal, akademik ve profesyonel gelişimini destekleyen; öğrenme, paylaşma ve birlikte üretme kültürünü merkeze alan bir platform olarak konumlanır.',
    },
    {
      label: 'Deneyim',
      title: 'Her temas noktasında düzenli, erişilebilir ve seçici içerik.',
      text: 'Etkinlik akışı; tanışma buluşmaları, uzman oturumları, saha deneyimleri, proje takımları ve dönem sonu sunumları ile bütünlüklü bir deneyim oluşturur.',
    },
    {
      label: 'Katılım',
      title: 'Net beklenti, kolay başvuru, hızlı yönlendirme.',
      text: 'Aday üyeler kısa bir ilgi formu ile başvurur. Ekip, ilgi alanlarına göre doğru çalışma grubuna yönlendirir ve ilk etkinlik davetini paylaşır.',
    },
  ],
  timeline: [
    'Başvuru ve tanışma',
    'İlgi alanı eşleştirme',
    'Etkinlik ve atölye katılımı',
    'Proje takımıyla üretim',
    'Sunum, değerlendirme ve gelişim',
  ],
}

const contactAlert = 'İletişim koordinatörümüz olmadığı için mail kabul edemiyoruz :/'
const socialAlert =
  'Sosyal medya koordinatörümüz olmadığı için sosyal medya kanallarından iletişime geçemiyoruz :/'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
      <path
        d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.05A4.95 4.95 0 1 1 12 16.95a4.95 4.95 0 0 1 0-9.9Zm0 2A2.95 2.95 0 1 0 12 14.95a2.95 2.95 0 0 0 0-5.9Zm5.2-2.42a1.17 1.17 0 1 1 0 2.34 1.17 1.17 0 0 1 0-2.34Z"
        fill="currentColor"
      />
    </svg>
  )
}

function XSocialIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
      <path
        d="M14.28 10.16 22.23 1h-1.88l-6.91 7.96L7.93 1H1.58l8.34 12.04L1.58 22.65h1.88l7.29-8.4 5.82 8.4h6.35l-8.64-12.49Zm-2.58 2.97-.84-1.2L4.14 2.41h2.89l5.42 7.68.84 1.2 7.07 10.02h-2.89l-5.77-8.18Z"
        fill="currentColor"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
      <path
        d="M5.34 8.86H2.38v12.06h2.96V8.86ZM3.86 3.08a1.72 1.72 0 1 0 0 3.44 1.72 1.72 0 0 0 0-3.44Zm7.26 5.78H8.28v12.06h2.96v-6.32c0-1.68.78-3.01 2.41-3.01 1.42 0 2.04 1.04 2.04 2.88v6.45h2.96v-6.86c0-3.4-1.7-5.48-4.46-5.48a3.7 3.7 0 0 0-3.07 1.58v-1.3Z"
        fill="currentColor"
      />
    </svg>
  )
}

function RedditIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
      <path
        d="M19.42 10.27a2.55 2.55 0 0 0-1.73.68 10.2 10.2 0 0 0-5.1-1.5l.86-4.02 2.79.6a1.9 1.9 0 1 0 .24-1.14l-3.4-.72a.6.6 0 0 0-.7.46l-1.03 4.82a10.34 10.34 0 0 0-5.04 1.5 2.56 2.56 0 1 0-2.82 4.16 4.96 4.96 0 0 0-.04.63c0 3.47 3.84 6.28 8.57 6.28s8.57-2.81 8.57-6.28c0-.21-.01-.42-.04-.63a2.56 2.56 0 0 0-1.09-4.84ZM8.18 14.68a1.35 1.35 0 1 1 0-2.7 1.35 1.35 0 0 1 0 2.7Zm6.9 3.8c-.9.9-2.62.97-3.07.97-.45 0-2.17-.07-3.07-.97a.6.6 0 1 1 .85-.85c.48.48 1.6.62 2.22.62s1.74-.14 2.22-.62a.6.6 0 0 1 .85.85Zm.74-3.8a1.35 1.35 0 1 1 0-2.7 1.35 1.35 0 0 1 0 2.7Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ScrollVideoHero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [duration, setDuration] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  })
  const videoTime = useTransform(smoothProgress, [0, 1], [0, duration || 1])
  const copyY = useTransform(smoothProgress, [0, 0.7], [0, -90])
  const copyOpacity = useTransform(smoothProgress, [0, 0.5, 0.82], [1, 1, 0])
  const videoScale = useTransform(smoothProgress, [0, 1], [1.04, 0.96])

  useEffect(() => {
    return videoTime.on('change', (time) => {
      const video = videoRef.current
      if (!video || !Number.isFinite(time)) return
      if (Math.abs(video.currentTime - time) > 0.035) {
        video.currentTime = Math.min(time, duration || time)
      }
    })
  }, [duration, videoTime])

  return (
    <section className="hero-scroll" ref={sectionRef}>
      <div className="hero-sticky">
        <motion.video
          ref={videoRef}
          className="hero-video"
          src="/assets/hero-section-scroll-animation.mp4"
          muted
          playsInline
          preload="auto"
          style={{ scale: videoScale }}
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration || 0)
            event.currentTarget.pause()
          }}
        />
        <div className="hero-scrim" />
        <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Sparkles size={16} />
            {content.eyebrow}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: 'easeOut' }}
          >
            {content.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: 'easeOut' }}
          >
            {content.intro}
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: 'easeOut' }}
          >
            <motion.a className="button primary" href="#basvuru" whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.96 }}>
              {content.primaryCta}
              <ArrowRight size={18} />
            </motion.a>
            <motion.a className="button ghost" href="#program" whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.96 }}>
              {content.secondaryCta}
              <ChevronRight size={18} />
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.div className="scroll-meter" style={{ scaleX: smoothProgress }} />
      </div>
    </section>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 120], [0, -4])
  const headerScale = useTransform(scrollY, [0, 120], [1, 0.985])
  const headerBg = useTransform(
    scrollY,
    [0, 120],
    ['rgba(21, 22, 22, 0.55)', 'rgba(21, 22, 22, 0.82)'],
  )
  const links = [
    ['Değer', '#deger'],
    ['Program', '#program'],
    ['Süreç', '#surec'],
    ['Başvuru', '#basvuru'],
  ]

  return (
    <motion.header
      className="site-header"
      style={{ y: headerY, scale: headerScale, background: headerBg }}
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <a className="brand" href="#top" aria-label="Ana sayfa">
        <img src="/assets/brand-mark.svg" alt="" />
        <span>{content.name}</span>
      </a>
      <nav className={open ? 'open' : ''}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <button className="icon-button" type="button" onClick={() => setOpen((value) => !value)}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
    </motion.header>
  )
}

function AnimatedStat({ value, label, index }) {
  return (
    <Reveal delay={index * 0.06}>
      <motion.div
        className="stat-item"
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.strong
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
        >
          {value}
        </motion.strong>
        <span>{label}</span>
      </motion.div>
    </Reveal>
  )
}

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const socialLinks = useMemo(
    () => [
      ['Instagram', InstagramIcon],
      ['X', XSocialIcon],
      ['LinkedIn', LinkedInIcon],
      ['Reddit', RedditIcon],
    ],
    [],
  )

  return (
    <>
      <Header />
      <main id="top">
        <ScrollVideoHero />

        <section className="stats-strip">
          {content.stats.map(([value, label], index) => (
            <AnimatedStat key={value} value={value} label={label} index={index} />
          ))}
        </section>

        <section className="section split" id="deger">
          <Reveal>
            <div className="section-copy">
              <span className="section-label">Değer Önerisi</span>
              <h2>Kulübün sunduğu deneyim net, katılımcı ve sonuç odaklı.</h2>
            </div>
          </Reveal>
          <div className="value-grid">
            {content.valueProps.map((item, index) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={index * 0.08}>
                  <motion.article
                    className="value-card"
                    whileHover={{ y: -8, scale: 1.01 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  >
                    <Icon size={24} />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </motion.article>
                </Reveal>
              )
            })}
          </div>
        </section>

        <ProgramSection />

        <section className="section process" id="surec">
          <Reveal>
            <div className="section-copy compact">
              <span className="section-label">Üyelik Akışı</span>
              <h2>Başvurudan üretime uzanan sade süreç.</h2>
            </div>
          </Reveal>
          <div className="timeline">
            {content.timeline.map((step, index) => (
              <Reveal key={step} delay={index * 0.05}>
                <motion.div
                  className="timeline-step"
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section cta" id="basvuru">
          <Reveal>
            <div className="cta-copy">
              <span className="section-label">Başvuru</span>
              <h2>Kulüp yolculuğuna ilk adımı at.</h2>
              <p>
                Katılım talebini ilet, ekip ilgi alanına göre seni doğru program ve çalışma
                grubuna yönlendirsin.
              </p>
              <div className="contact-actions">
                <motion.button
                  className="button primary dark"
                  type="button"
                  onClick={() => alert(contactAlert)}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Mail size={18} />
                  E-posta Gönder
                </motion.button>
                <motion.a
                  className="button ghost dark"
                  href="#program"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Programı Gör
                  <ArrowRight size={18} />
                </motion.a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="contact-card">
              <div className="social-row" aria-label="Sosyal medya hesapları">
                {socialLinks.map(([label, Icon]) => (
                  <motion.button
                    className="social-button"
                    key={label}
                    type="button"
                    aria-label={label}
                    title={label}
                    onClick={() => alert(socialAlert)}
                    whileHover={{ y: -3, rotate: -4, scale: 1.06 }}
                    whileTap={{ scale: 0.9, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 340, damping: 18 }}
                  >
                    <Icon size={20} />
                  </motion.button>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  )
}

function ProgramSection() {
  const visualRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start end', 'end start'],
  })
  const visualY = useTransform(scrollYProgress, [0, 1], [-28, 28])
  const visualRotate = useTransform(scrollYProgress, [0, 1], [-1.6, 1.6])

  return (
    <section className="section narrative" id="program">
      <div className="visual-panel" ref={visualRef}>
        <motion.img
          src="/assets/program-visual.svg"
          alt=""
          style={{ y: visualY, rotate: visualRotate }}
          whileHover={{ scale: 1.025 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        />
      </div>
      <div className="narrative-list">
        {content.sections.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.08}>
            <motion.article
              className="narrative-item"
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            >
              <span>{item.label}</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

createRoot(document.getElementById('root')).render(<App />)
/*
          <div className="narrative-list">
            {content.sections.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.08}>
                <article className="narrative-item">
                  <span>{item.label}</span>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section process" id="surec">
          <Reveal>
            <div className="section-copy compact">
              <span className="section-label">Üyelik Akışı</span>
              <h2>Başvurudan üretime uzanan sade süreç.</h2>
            </div>
          </Reveal>
          <div className="timeline">
            {content.timeline.map((step, index) => (
              <Reveal key={step} delay={index * 0.05}>
                <div className="timeline-step">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section cta" id="basvuru">
          <Reveal>
            <div className="cta-copy">
              <span className="section-label">Başvuru</span>
              <h2>Kulüp yolculuğuna ilk adımı at.</h2>
              <p>
                Katılım talebini ilet, ekip ilgi alanına göre seni doğru program ve çalışma
                grubuna yönlendirsin.
              </p>
              <div className="contact-actions">
                <button className="button primary dark" type="button" onClick={() => alert(contactAlert)}>
                  <Mail size={18} />
                  E-posta Gönder
                </button>
                <a className="button ghost dark" href="#program">
                  Programı Gör
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="contact-card">
              <div className="social-row" aria-label="Sosyal medya hesapları">
                {socialLinks.map(([label, Icon]) => (
                  <button
                    className="social-button"
                    key={label}
                    type="button"
                    aria-label={label}
                    title={label}
                    onClick={() => alert(socialAlert)}
                  >
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
*/
