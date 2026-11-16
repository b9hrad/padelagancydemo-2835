# O padel / Orvante — Design
Three-section monochrome editorial web landing page for a fictional six-court padel club and academy. Use exact supplied photography/composition; adapt agency copy to padel. O padel is the club, ORVANTE its parent identity. No alternate visual template.

## Colors and type
Paper #dadada, ink #111, lower surfaces #000, white #f4f4f4, muted #6f6f6f, white hairlines 14–28%. All imagery grayscale. Self-hosted Inter Tight variable body/UI; Archivo variable width display/brand/bar. Display 90u weight 640 width 104%, tight tracking. Desktop units scale from 1440px capped at 1920px; mobile from 390px.

## Composition
938u hero: centered rear-view portrait, top segmented nav, left PURE / PADEL title, intro and community cards; dark glass ORVANTE plate on portrait; right academy pill/card. 111u black detail bar. Centered 830u scroll-filled manifesto, 52u text, generous whitespace. 1302 × 429u bordered trust panel with heading, frosted icons, avatar card, award card, cropped portrait. All logos fictional.

## Motion and UX
Staggered Web Animations hero entrance; word fill and portrait parallax on scroll; intersection-driven counters/avatar pops. Hover slide/lift/zoom. Reduced motion shows final states; ?rec=1 uses timed motion. Nav scrolls to real sections. Booking/contact buttons open accessible local inquiry dialog, explicitly demo-only without backend submission or fabricated confirmation; keyboard/focus handling.

## Responsive and architecture
<=760px single column: nav/title/intro, full-width portrait and plate, community and academy, manifesto, stacked trust content. No horizontal overflow. Managed React/Vite web; no new routes/database/auth/payment. Local dialog/motion state. Static assets in packages/web/public.
