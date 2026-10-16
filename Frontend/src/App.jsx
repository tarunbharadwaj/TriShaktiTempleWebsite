import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Flower2,
  IndianRupee,
  Info,
  Languages,
  MapPin,
  Menu,
  Search,
  UsersRound,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { attractions, contacts, copy, goddessLabels, posters, pujas, schedule, temple } from "@/data/content"
import { cn } from "@/lib/utils"

const navKeys = ["festival", "schedule", "pujas", "attractions", "gallery", "visit"]
const categories = ["all", "alankarana", "archana", "special", "seva"]

function useLanguage() {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("trishakti-language")
    if (saved === "en" || saved === "te") return saved
    return navigator.language?.toLowerCase().startsWith("te") ? "te" : "en"
  })

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dataset.language = language
    localStorage.setItem("trishakti-language", language)
  }, [language])

  return [language, setLanguage]
}

function Reveal({ children, className, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (!window.IntersectionObserver) {
      element.dataset.visible = "true"
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.visible = "true"
          observer.unobserve(element)
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={cn("reveal", className)} {...props}>{children}</div>
}

function LanguageButton({ language, onToggle, compact = false }) {
  return (
    <Button
      variant="outline"
      size={compact ? "sm" : "default"}
      onClick={onToggle}
      aria-label={language === "en" ? "తెలుగుకు మార్చండి" : "Switch to English"}
      className="bg-white/60"
    >
      <Languages className="size-4" aria-hidden="true" />
      {copy[language].language}
    </Button>
  )
}

function Header({ language, setLanguage }) {
  const t = copy[language]
  const toggle = () => setLanguage(language === "en" ? "te" : "en")

  return (
    <header className="site-header">
      <div className="page-shell flex h-[4.75rem] items-center justify-between gap-5">
        <a href="#top" className="group flex min-w-0 items-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-gold">
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-ink">{temple.shortName[language]}</span>
            <span className="block truncate text-[.68rem] font-semibold tracking-[.13em] text-vermilion uppercase">Visakhapatnam</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navKeys.map((key) => (
            <a key={key} href={`#${key}`} className="rounded-full px-4 py-2 text-sm font-semibold text-ink-muted transition-colors hover:bg-white/70 hover:text-ink focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none">
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block"><LanguageButton language={language} onToggle={toggle} compact /></div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="pr-12 text-xl font-bold text-ink">{temple.shortName[language]}</SheetTitle>
              <SheetDescription className="mt-2 text-sm text-ink-muted">{temple.address[language]}</SheetDescription>
              <nav className="mt-10 grid gap-2" aria-label="Mobile navigation">
                {navKeys.map((key, index) => (
                  <SheetClose asChild key={key}>
                    <a href={`#${key}`} className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold text-ink transition-colors hover:bg-gold-pale focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none">
                      <span>{t.nav[key]}</span><span className="text-sm text-ink-faint">0{index + 1}</span>
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-8 sm:hidden"><LanguageButton language={language} onToggle={toggle} /></div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function SectionHeading({ eyebrow, title, body, align = "left" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-3">{title}</h2>
      {body && <p className="mt-4 text-base leading-7 text-ink-muted sm:text-lg">{body}</p>}
    </div>
  )
}

function Hero({ language, setLanguage }) {
  const t = copy[language]
  const toggleLanguage = () => setLanguage(language === "en" ? "te" : "en")

  return (
    <section id="top" className="hero-section scroll-mt-24 overflow-hidden">
      <div className="hero-orb hero-orb--one" /><div className="hero-orb hero-orb--two" />
      <div className="page-shell relative grid min-h-[calc(100svh-4.75rem)] content-start items-center gap-12 py-8 sm:py-12 lg:grid-cols-[1.05fr_.95fr] lg:content-center lg:py-20">
        <div className="relative z-10 max-w-3xl">
          <button
            type="button"
            onClick={toggleLanguage}
            className="mb-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold text-ink-muted outline-none transition-colors hover:bg-white/60 focus-visible:ring-2 focus-visible:ring-gold sm:hidden"
            aria-label={t.languageAction}
          >
            <Languages className="size-4 text-vermilion" aria-hidden="true" />
            <span>{t.languagePrompt}</span>
            <span className="font-bold text-vermilion underline decoration-gold decoration-2 underline-offset-4">{t.languageAction}</span>
          </button>
          <div className="invocation-row mb-10">
            {temple.invocations.map((item) => <span key={item.en}>{item[language]}</span>)}
          </div>
          <p className="eyebrow hero-eyebrow">
            <span>{t.eyebrowTitle}</span>
            <span>{t.eyebrowDate}</span>
          </p>
          <h1 className="hero-title mt-5">{t.heroTitle}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-muted sm:text-xl">{t.heroBody}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="default"><a href="#schedule">{t.viewSchedule}<ArrowDown className="size-4" /></a></Button>
            <Button asChild variant="outline"><a href="#pujas">{t.explorePujas}</a></Button>
          </div>
          <p className="sacred-lines mt-10 max-w-xl border-l-2 border-gold pl-4 text-sm font-semibold leading-6 text-ink-muted">
            {t.sacredLine.split(" · ").map((line) => <span key={line}>{line}</span>)}
          </p>
        </div>

        <Reveal className="relative mx-auto w-full max-w-[32rem] lg:justify-self-end">
          <div className="hero-art">
            <div className="hero-art__copy">
              <p className="hero-art__date">11th–20th October 2026</p>
              <h2 className="hero-art__title">{temple.name[language]}</h2>
              <p className="hero-art__address">{temple.address[language]}</p>
            </div>
            <a href="#gallery" className="hero-art__badge" aria-label={`${t.festivalLabel} — ${t.nav.gallery}`}>
              <CalendarDays className="size-5 text-vermilion" />
              <span>{t.festivalLabel}</span>
              <ArrowUpRight className="size-4 text-vermilion" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Festival({ language }) {
  const t = copy[language]
  const stats = [
    { icon: CalendarDays, value: t.date, label: t.dateLabel },
    { icon: Clock3, value: t.annadanam, label: t.annadanamLabel },
  ]
  return (
    <section id="festival" className="section scroll-mt-24">
      <div className="page-shell">
        <Reveal><p className="eyebrow text-center">{t.festivalLabel}</p></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {stats.map(({ icon: Icon, value, label }, index) => (
            <Reveal key={label} className="h-full" style={{ transitionDelay: `${index * 80}ms` }}>
              <article className="stat-card h-full">
                <div className="icon-chip"><Icon className="size-5" /></div>
                <p className="mt-7 text-3xl font-bold tracking-tight text-ink">{value}</p>
                <p className="mt-2 text-sm font-semibold text-ink-muted">{label}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function formatDate(date, language) {
  const [, month, day] = date.split("-")
  return `${Number(day)} ${language === "te" ? "అక్టోబర్" : month === "10" ? "October" : ""}`
}

function getCurrentScheduleDay() {
  const today = new Date()
  const localDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-")
  const currentDayIndex = schedule.findIndex((day) => day.date === localDate)

  return `day-${currentDayIndex >= 0 ? currentDayIndex : 0}`
}

function ScheduleSection({ language }) {
  const t = copy[language]
  return (
    <section id="schedule" className="section section-tinted scroll-mt-24">
      <div className="page-shell grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">{t.scheduleEyebrow}</p>
            <div className="mt-8 rounded-3xl bg-vermilion p-6 text-white shadow-[0_20px_50px_rgba(143,38,30,.18)]">
              <p className="text-sm font-bold text-gold-soft">{t.dailyMeals}</p>
              <p className="mt-2 text-lg font-semibold">{t.dailyMealsText}</p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <Accordion type="single" collapsible defaultValue={getCurrentScheduleDay()} className="schedule-list">
            {schedule.map((day, index) => (
              <AccordionItem key={day.date} value={`day-${index}`} className="schedule-item">
                <AccordionTrigger className="px-1 sm:px-3">
                  <span className="flex min-w-0 items-center gap-4 sm:gap-6">
                    <span className="date-tile"><strong>{day.date.slice(-2)}</strong><small>OCT</small></span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold tracking-[.1em] text-vermilion uppercase">{day.day[language]} · {formatDate(day.date, language)}</span>
                      <span className="mt-1 block text-base font-bold leading-6 text-ink sm:text-lg">{day.title[language]}</span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-[5.3rem] pr-2 sm:pl-[6.7rem] sm:pr-5">
                  <div className="grid gap-3">
                    {day.events.map((event) => (
                      <div key={`${day.date}-${event.time}`} className="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                        <span className="text-xs font-extrabold tracking-wide text-ink-faint uppercase">{event.time}</span>
                        <span className="text-sm leading-6 text-ink-muted sm:text-base">{event[language]}</span>
                      </div>
                    ))}
                  </div>
                  {day.noticeImage && (
                    <div className="mt-5 border-t border-ink/8 pt-5">
                      <p className="flex items-center gap-2 text-xs font-extrabold tracking-[.08em] text-vermilion uppercase">
                        <Info className="size-4" aria-hidden="true" />
                        {day.noticeImage.title[language]}
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="mt-4 block w-full overflow-hidden rounded-2xl bg-ivory p-2 text-left shadow-sm ring-1 ring-ink/8 outline-none transition hover:ring-gold focus-visible:ring-2 focus-visible:ring-gold"
                            aria-label={day.noticeImage.title[language]}
                          >
                            <img
                              src={day.noticeImage.src}
                              alt={day.noticeImage.alt[language]}
                              className="mx-auto max-h-[42rem] w-auto rounded-xl object-contain"
                              loading="lazy"
                              decoding="async"
                            />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle className="sr-only">{day.noticeImage.title[language]}</DialogTitle>
                          <DialogDescription className="sr-only">{day.noticeImage.alt[language]}</DialogDescription>
                          <img
                            src={day.noticeImage.src}
                            alt={day.noticeImage.alt[language]}
                            className="mx-auto max-h-[86vh] w-auto rounded-[1.4rem]"
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                  <div className="mt-5 border-t border-ink/8 pt-5">
                    <p className="flex items-center gap-2 text-xs font-extrabold tracking-[.08em] text-vermilion uppercase">
                      <Flower2 className="size-4" aria-hidden="true" />
                      {t.alankaranaDetails}
                    </p>
                    <div className={cn("mt-3 grid gap-2", !day.alankaranas.some((item) => item.programmeDetails) && "xl:grid-cols-3")}>
                      {[...day.alankaranas]
                        .sort((first, second) => (first.displayOrder ?? 0) - (second.displayOrder ?? 0))
                        .map((alankarana) => (
                        <article
                          key={alankarana.deity}
                          className={cn("alankarana-card", alankarana.programmeDetails && "sm:grid sm:grid-cols-[11rem_1fr] sm:gap-5")}
                          data-deity={alankarana.deity}
                        >
                          {alankarana.image && (
                            <img
                              src={alankarana.image}
                              alt={alankarana.form[language]}
                              className={cn("mb-4 aspect-[3/4] w-full rounded-xl bg-ivory object-contain object-center", alankarana.programmeDetails && "sm:mb-0")}
                              loading="lazy"
                              decoding="async"
                              onError={(event) => { event.currentTarget.hidden = true }}
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-[.68rem] font-extrabold tracking-[.08em] text-vermilion uppercase">{goddessLabels[alankarana.deity][language]}</p>
                            <h4 className="mt-2 text-base font-bold leading-6 text-ink">{alankarana.form[language]}</h4>
                            <p className="mt-2 text-xs leading-5 text-ink-muted"><span className="font-semibold">{t.sareeColor}:</span> {alankarana.color[language]}</p>
                            {alankarana.programmeDetails && (
                              <div className="mt-4 border-t border-ink/10 pt-4">
                                <p className="text-[.68rem] font-extrabold tracking-[.08em] text-vermilion uppercase">{t.programmeSevaDetails}</p>
                                <dl className="mt-2 divide-y divide-ink/8">
                                  {alankarana.programmeDetails.map((detail) => (
                                    <div key={detail.service.en} className="py-3 first:pt-1">
                                      <dt className="text-xs font-bold leading-5 text-ink">{detail.service[language]}</dt>
                                      <dd className="mt-1 text-xs font-semibold leading-5 text-vermilion">{detail.gotram[language]}</dd>
                                      <dd className="mt-1 text-xs leading-5 text-ink-muted">{detail.devotees[language]}</dd>
                                    </div>
                                  ))}
                                </dl>
                              </div>
                            )}
                          </div>
                        </article>
                        ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

function formatPrice(price, language) {
  return new Intl.NumberFormat(language === "te" ? "te-IN" : "en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price)
}

function PujaSection({ language }) {
  const t = copy[language]
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const filteredPujas = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase()
    return pujas.filter((puja) => {
      const categoryMatch = category === "all" || puja.category === category
      const queryMatch = !normalized || puja.en.toLocaleLowerCase().includes(normalized) || puja.te.includes(query.trim())
      return categoryMatch && queryMatch
    })
  }, [category, query])

  return (
    <section id="pujas" className="section scroll-mt-24">
      <div className="page-shell">
        <Reveal><SectionHeading eyebrow={t.pujaEyebrow} title={t.pujaTitle} body={t.pujaBody} /></Reveal>
        <Reveal className="mt-9">
          <div className="flex flex-col gap-4 rounded-[1.75rem] border border-ink/8 bg-white/70 p-4 shadow-sm sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block lg:w-[21rem]">
              <span className="sr-only">{t.searchPujas}</span>
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.searchPlaceholder} className="h-12 w-full rounded-full border border-ink/10 bg-ivory pl-11 pr-4 text-sm font-medium text-ink outline-none transition-shadow placeholder:text-ink-faint focus:ring-2 focus:ring-gold" />
            </label>
            <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1 lg:justify-end">
              {categories.map((item) => (
                <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={cn("shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition-[transform,background-color,color] active:scale-[.97] focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none", category === item ? "bg-ink text-white" : "bg-ink/5 text-ink-muted hover:bg-ink/10")}>
                  {t[item]}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 hidden overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white shadow-[0_24px_70px_rgba(70,46,26,.07)] md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{t.pujaTitle}</caption>
            <thead className="bg-ink text-white"><tr><th className="w-16 px-5 py-4 text-xs font-bold">No.</th><th className="px-5 py-4 text-xs font-bold">{t.pujaTitle}</th><th className="w-44 px-5 py-4 text-xs font-bold">{t.rate}</th></tr></thead>
            <tbody>
              {filteredPujas.map((puja) => (
                <tr key={puja.id} className="border-t border-ink/8 transition-colors hover:bg-gold-pale/55">
                  <td className="px-5 py-4 text-sm font-bold text-ink-faint">{String(puja.id).padStart(2, "0")}</td>
                  <td className="px-5 py-4"><span className="font-semibold leading-6 text-ink">{puja[language]}</span>{puja.note && <span className="ml-2 text-xs font-medium text-vermilion">· {puja.note[language]}</span>}</td>
                  <td className="px-5 py-4 text-sm font-extrabold text-vermilion">
                    {puja.early ? <span className="grid gap-1"><span>{formatPrice(puja.early, language)} <small className="font-medium text-ink-faint">{t.padyami}</small></span><span>{formatPrice(puja.late, language)} <small className="font-medium text-ink-faint">{t.astami}</small></span></span> : formatPrice(puja.price, language)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid gap-3 md:hidden">
          {filteredPujas.map((puja) => (
            <article key={puja.id} className="rounded-3xl border border-ink/9 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold-pale text-xs font-extrabold text-vermilion">{String(puja.id).padStart(2, "0")}</span><div><h3 className="font-bold leading-6 text-ink">{puja[language]}</h3>{puja.note && <p className="mt-1 text-xs font-semibold text-vermilion">{puja.note[language]}</p>}</div></div>
              <div className="mt-4 flex flex-wrap gap-2 border-t border-ink/8 pt-4 text-sm font-extrabold text-vermilion">
                {puja.early ? <><span>{formatPrice(puja.early, language)} · {t.padyami}</span><span className="text-ink/20">/</span><span>{formatPrice(puja.late, language)} · {t.astami}</span></> : <span>{formatPrice(puja.price, language)}</span>}
              </div>
            </article>
          ))}
        </div>
        {!filteredPujas.length && <div className="mt-6 rounded-3xl border border-dashed border-ink/15 p-10 text-center text-sm font-semibold text-ink-muted">{t.noResults}</div>}
        <aside className="note-card mt-6" aria-label={t.noteLabel}>
          <Info className="mt-0.5 size-5 shrink-0 text-vermilion" aria-hidden="true" />
          <div>
            <p className="text-sm font-extrabold text-ink">{t.noteLabel}</p>
            <ul className="mt-2 grid gap-2 pl-5 text-sm leading-6 text-ink-muted">
              {t.materialNote.split(".").map((point) => point.trim()).filter(Boolean).map((point) => (
                <li key={point} className="list-disc pl-1">{point}.</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}

function GivingSection({ language }) {
  const t = copy[language]
  const amounts = [
    [t.perDay, 116], [t.perMonth, 3116], [t.perYear, 25000], [t.lifetime, 100000],
  ]
  return (
    <section className="section section-dark">
      <div className="page-shell grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <div className="giving-summary">
            <p className="text-sm font-bold tracking-[.14em] text-gold uppercase">{t.dailyMeals}</p>
            <p className="mt-3 text-3xl font-bold text-white">{t.annadanam}</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-white/65">{t.dailyMealsText}</p>
          </div>
        </Reveal>
        <Reveal>
          <SectionHeading eyebrow={t.givingEyebrow} title={t.givingTitle} body={t.givingBody} />
          <div className="mt-8 rounded-[2rem] bg-white/8 p-3 ring-1 ring-white/12 backdrop-blur-sm sm:p-5">
            <div className="mb-3 flex items-center gap-3 px-2"><div className="grid size-10 place-items-center rounded-full bg-gold text-ink"><IndianRupee className="size-5" /></div><h3 className="font-bold text-white">{t.cowDonation}</h3></div>
            <div className="grid grid-cols-2 gap-2">
              {amounts.map(([label, amount]) => <div key={label} className="rounded-2xl bg-white/8 p-4"><p className="text-xs font-semibold text-white/55">{label}</p><p className="mt-1 text-lg font-bold text-gold-soft sm:text-xl">{formatPrice(amount, language)}</p></div>)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function GallerySection({ language }) {
  const t = copy[language]
  return (
    <section id="gallery" className="section section-tinted scroll-mt-24">
      <div className="page-shell">
        <Reveal><SectionHeading eyebrow={t.postersEyebrow} title={t.postersTitle} body={t.postersBody} align="center" /></Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {posters.map((poster, index) => (
            <Reveal key={poster.src} className={cn(index % 2 === 1 && "mt-8 lg:mt-10")}>
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="poster-card group w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4">
                    <img
                      src={poster.src}
                      alt={poster.alt[language]}
                      className="aspect-[3/4] w-full bg-ivory object-contain object-center"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="flex items-center justify-between gap-3 p-4"><span className="text-sm font-bold text-ink">{poster.title[language]}</span><ArrowUpRight className="size-4 shrink-0 text-vermilion transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="sr-only">{poster.title[language]}</DialogTitle>
                  <DialogDescription className="sr-only">{poster.alt[language]}</DialogDescription>
                  <img src={poster.src} alt={poster.alt[language]} className="mx-auto max-h-[86vh] w-auto rounded-[1.4rem]" />
                </DialogContent>
              </Dialog>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function AttractionsSection({ language }) {
  const t = copy[language]
  const widePhotos = new Set([0, 4])

  return (
    <section id="attractions" className="section scroll-mt-24 overflow-hidden">
      <div className="page-shell">
        <Reveal>
          <SectionHeading
            eyebrow={t.attractionsEyebrow}
            title={t.attractionsTitle}
            body={t.attractionsBody}
            align="center"
          />
        </Reveal>

        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gold/70" aria-hidden="true" />
          <p className="text-center text-xs font-bold tracking-[0.18em] text-vermilion uppercase">{t.attractionsPhotos}</p>
          <span className="h-px w-10 bg-gold/70" aria-hidden="true" />
        </div>

        <div className="mt-6 grid auto-rows-[12rem] grid-cols-2 gap-3 sm:auto-rows-[15rem] md:gap-5 lg:auto-rows-[17rem] lg:grid-cols-4">
          {attractions.photos.map((photo, index) => (
            <Reveal
              key={photo.src}
              className={cn(
                "min-h-0",
                widePhotos.has(index) ? "col-span-2 row-span-2" : "col-span-1 row-span-1",
                index === 6 && "col-span-2 lg:col-span-1",
              )}
            >
              <figure className="group relative h-full overflow-hidden rounded-[1.6rem] bg-ink shadow-[0_20px_55px_-32px_rgba(52,26,18,0.55)]">
                <img
                  src={photo.src}
                  alt={photo.alt[language]}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                  loading="lazy"
                  decoding="async"
                />
                <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15" aria-hidden="true" />
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gold/70" aria-hidden="true" />
          <p className="text-center text-xs font-bold tracking-[0.18em] text-vermilion uppercase">{t.attractionsVideos}</p>
          <span className="h-px w-10 bg-gold/70" aria-hidden="true" />
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {attractions.videos.map((video) => (
            <Reveal key={video.src} className="h-full">
              <article className="h-full overflow-hidden rounded-[1.6rem] bg-ink p-2 shadow-[0_20px_55px_-32px_rgba(52,26,18,0.7)]">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={video.title[language]}
                  className="aspect-[9/16] w-full rounded-[1.15rem] bg-black object-contain"
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                <p className="px-3 py-3 text-sm font-bold text-white">{video.title[language]}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function VisitSection({ language }) {
  const t = copy[language]
  const [showCommittee, setShowCommittee] = useState(false)
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Sri+Sri+Sri+Trishakti+Devalayam+Mandir+Marg+Ukkunagaram+Visakhapatnam"
  return (
    <section id="visit" className="section scroll-mt-24">
      <div className="page-shell">
        <Reveal><SectionHeading eyebrow={t.visitEyebrow} title={t.visitTitle} body={t.visitBody} align="center" /></Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <article className="contact-card h-full">
              <div className="icon-chip"><MapPin className="size-5" /></div>
              <h3 className="mt-6 text-xl font-bold text-ink">{t.address}</h3>
              <p className="mt-3 max-w-md text-lg leading-8 text-ink-muted">{temple.address[language]}</p>
              <Button asChild variant="outline" className="mt-7"><a href={mapsUrl} target="_blank" rel="noreferrer">{t.directions}<ArrowUpRight className="size-4" /></a></Button>
            </article>
          </Reveal>
          <Reveal className="h-full">
            <article className="contact-card h-full">
              <div className="icon-chip"><UsersRound className="size-5" /></div>
              <h3 className="mt-6 text-xl font-bold text-ink">{t.contacts}</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div><p className="text-xs font-bold tracking-wide text-ink-faint uppercase">{t.convenor}</p><p className="mt-1 text-lg font-bold text-vermilion">{contacts.convenor}</p></div>
                <div><p className="text-xs font-bold tracking-wide text-ink-faint uppercase">{t.organisers}</p><p className="mt-1 text-base font-bold text-vermilion">{contacts.organisers.join(" · ")}</p></div>
              </div>
              <button type="button" onClick={() => setShowCommittee(!showCommittee)} aria-expanded={showCommittee} className="mt-6 inline-flex items-center gap-2 rounded-lg text-sm font-bold text-ink underline decoration-gold decoration-2 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-gold">
                {showCommittee ? t.hideAll : t.showAll}<ArrowDown className={cn("size-4 transition-transform", showCommittee && "rotate-180")} />
              </button>
              {showCommittee && <div className="mt-4 flex flex-wrap gap-2">{contacts.committee.map((number) => <span key={number} className="rounded-full bg-ink/5 px-3 py-2 text-xs font-bold text-ink-muted">{number}</span>)}</div>}
              <p className="mt-6 text-sm leading-6 text-ink-muted">{t.informationOnly}</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer({ language }) {
  const t = copy[language]
  return (
    <footer className="border-t border-ink/8 bg-gold-pale/45 py-10">
      <div className="page-shell flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div><p className="font-bold text-ink">{temple.name[language]}</p><p className="mt-1 text-xs text-ink-muted">{t.footer}</p></div>
        <p className="max-w-sm text-xs leading-5 text-ink-faint sm:text-right">
          {t.footerCredit}{" "}
          <a
            href="https://www.linkedin.com/in/tarun-bharadwaj/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-vermilion underline decoration-gold decoration-2 underline-offset-4 outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-gold"
          >
            {t.footerCreditLink}
          </a>
        </p>
      </div>
    </footer>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 500)
    updateVisibility()
    window.addEventListener("scroll", updateVisibility, { passive: true })
    return () => window.removeEventListener("scroll", updateVisibility)
  }, [])

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <button type="button" className="back-to-top" data-visible={visible} onClick={scrollToTop} aria-label="Back to top" tabIndex={visible ? 0 : -1}>
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  )
}

export default function App() {
  const [language, setLanguage] = useLanguage()
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header language={language} setLanguage={setLanguage} />
      <main id="main">
        <Hero language={language} setLanguage={setLanguage} />
        <Festival language={language} />
        <ScheduleSection language={language} />
        <PujaSection language={language} />
        <GivingSection language={language} />
        <AttractionsSection language={language} />
        <GallerySection language={language} />
        <VisitSection language={language} />
      </main>
      <Footer language={language} />
      <BackToTop />
    </>
  )
}
