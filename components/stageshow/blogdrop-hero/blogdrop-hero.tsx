"use client"

import { Bar, BrandMark, Collapse, Kbd, Roll, Stage, Text, Toast, Window, type Act } from '../kit'
import type { BrandName } from '../kit/brands'
import { Bookmark, Search } from 'lucide-react'
import './blogdrop-hero.css'

// BlogDrop's hero: the product's own feed page in a quiet browser window.
// The cursor picks the "Databases" topic chip, two articles drop into the
// numbered feed, the top one gets saved, and "All" resets the loop with a
// seen cause.
//
// Real strings: the URL, the topic chips, the search placeholder, the top
// article's source and title, and the toast. Everything else is bars on the
// product's real anatomy: mono index numbers, a favicon mark per row, a
// meta line, hairline dividers. Sources are real marks from the kit registry.

type S = {
  topic: 'all' | 'db'
  new1: boolean
  new2: boolean
  saved: boolean
}

const initial: S = { topic: 'all', new1: false, new2: false, saved: false }
const POSTER: S = { topic: 'db', new1: true, new2: true, saved: true }

const REST = { wide: { x: 742, y: 356 }, compact: { x: 288, y: 296 } }

async function script(a: Act<S>) {
  const compact = a.layout === 'compact'
  await a.wait(900)

  // 1. Pick the topic
  a.mark('topic')
  await a.move({ at: 'chip-db', x: 0.5, y: 0.6 })
  await a.wait(350)
  await a.click()
  await a.set({ topic: 'db' })
  await a.wait(700)

  // 2. Two articles drop in; the rows below make room
  a.mark('drop')
  await a.set({ new1: true })
  await a.wait(450)
  await a.set({ new2: true })
  await a.wait(1100)

  // 3. Save the top article
  a.mark('save')
  await a.move({ at: 'save-btn', x: 0.5, y: 0.5 })
  await a.wait(300)
  await a.click()
  await a.set({ saved: true })
  await a.wait(600)
  await a.move(REST)
  await a.wait(2200)

  // 4. Back to All: the reset has a cause. Both rows leave as one motion.
  a.mark('reset')
  await a.move({ at: 'chip-all', x: 0.5, y: 0.6 })
  await a.wait(320)
  await a.click()
  await a.set({ saved: false, topic: 'all', new2: false })
  await a.wait(300)
  await a.set({ new1: false })
  await a.wait(900)
  await a.move(compact ? REST.compact : REST.wide)
  await a.wait(2200)
}

const BASE_ROWS: { brand: BrandName; name: string; date: number; time: number; title: number }[] = [
  { brand: 'notion', name: 'Notion', date: 26, time: 22, title: 430 },
  { brand: 'figma', name: 'Figma', date: 30, time: 18, title: 520 },
  { brand: 'slack', name: 'Slack', date: 24, time: 26, title: 340 },
  { brand: 'vercel', name: 'Vercel', date: 28, time: 20, title: 470 },
]

function Index({ n, roll }: { n: number; roll?: boolean }) {
  return (
    <span className="bd-num">
      {roll ? (
        <Roll className="bd-num__text" delay={60}>{String(n).padStart(2, '0')}</Roll>
      ) : (
        <Text className="bd-num__text">{String(n).padStart(2, '0')}</Text>
      )}
    </span>
  )
}

function Meta({ brand, name, date, time, real }: { brand: BrandName; name: string; date: number; time: number; real?: boolean }) {
  return (
    <span className="bd-meta">
      <span className="bd-favicon">
        <BrandMark brand={brand} size={13} tile={false} />
      </span>
      {real ? <Text className="bd-meta__name">{name}</Text> : <Bar w={38} h={5} tone={3} />}
      <span className="bd-meta__dot" aria-hidden>·</span>
      <Bar w={date} h={5} tone={2} />
      <span className="bd-meta__dot" aria-hidden>·</span>
      <Bar w={time} h={5} tone={2} />
    </span>
  )
}

function SaveButton({ saved }: { saved?: boolean }) {
  return (
    <span className="bd-save" data-target="save-btn" data-cursor="hand" data-saved={saved || undefined}>
      <Bookmark size={14} strokeWidth={1.8} className="bd-save__icon" />
    </span>
  )
}

function FeedRow({ base, n, compact }: { base: number; n: number; compact: boolean }) {
  const r = BASE_ROWS[base]
  return (
    <div className="bd-row">
      <Index n={n} roll />
      <div className="bd-row__main">
        <Meta brand={r.brand} name={r.name} date={r.date} time={r.time} />
        <div className="bd-title">
          <Bar w={compact ? Math.min(r.title, 280) : r.title} h={7} tone={3} />
        </div>
      </div>
    </div>
  )
}

function Scene({ s, layout }: { s: S; layout: 'wide' | 'compact' }) {
  const compact = layout === 'compact'
  const db = s.topic === 'db'
  // Base rows renumber as the new articles land
  const offset = (db && s.new1 ? 1 : 0) + (db && s.new2 ? 1 : 0)
  return (
    <>
      <Window url="blogdrop.app/feed" className="bd-window" body={{ className: 'bd-body' }}>
      <div className="bd-page">
        <div className="bd-toolbar">
          <div className="bd-chips">
            <span className="bd-chip" data-target="chip-all" data-cursor="hand" data-on={s.topic === 'all' || undefined}>
              <Text className="bd-chip__text">All</Text>
            </span>
            <span className="bd-chip" data-target="chip-db" data-cursor="hand" data-on={s.topic === 'db' || undefined}>
              <Text className="bd-chip__text">Databases</Text>
            </span>
            <span className="bd-chip">
              <Text className="bd-chip__text">LLMs</Text>
            </span>
            {!compact && (
              <span className="bd-chip">
                <Text className="bd-chip__text">Infra</Text>
              </span>
            )}
          </div>
          {!compact && (
            <div className="bd-search">
              <Search size={12} strokeWidth={1.8} className="bd-search__icon" />
              <Text className="bd-search__text">Search articles…</Text>
              <Kbd keys={['⌘', 'K']} />
            </div>
          )}
        </div>

        <div className="bd-list" data-crop>
          <Collapse open={db && s.new1} reveal="drop" from="above">
            <div className="bd-row" data-target="new-row">
              <Index n={1} />
              <div className="bd-row__main">
                <Meta brand="stripe" name="Stripe" date={22} time={24} real />
                <div className="bd-title">
                  <Text className="bd-title__text">{compact ? 'How we sharded Postgres' : 'How we sharded Postgres before it sharded us'}</Text>
                </div>
              </div>
              <SaveButton saved={s.saved} />
            </div>
          </Collapse>
          <Collapse open={db && s.new2} reveal="drop" from="above">
            <div className="bd-row">
              <Index n={2} />
              <div className="bd-row__main">
                <Meta brand="github" name="GitHub" date={26} time={18} real />
                <div className="bd-title">
                  <Bar w={compact ? 240 : 300} h={7} tone={3} />
                </div>
              </div>
            </div>
          </Collapse>
          {BASE_ROWS.map((_, i) => (
            <FeedRow key={i} base={i} n={i + offset + 1} compact={compact} />
          ))}
        </div>
      </div>
      </Window>
      <Toast show={s.saved} icon={<Bookmark size={13} strokeWidth={1.8} />} className="bd-toast">
        Saved for later
      </Toast>
    </>
  )
}

export default function BlogDropHero() {
  return (
    <Stage
      width={944}
      height={470}
      compact={{ below: 620, width: 358, height: 356 }}
      accent="#2579f4"
      greys="cool"
      initial={initial}
      poster={POSTER}
      script={script}
      cursor={{ at: REST }}
      className="bd-stage"
    >
      {(s, _rect, layout) => <Scene s={s} layout={layout} />}
    </Stage>
  )
}
