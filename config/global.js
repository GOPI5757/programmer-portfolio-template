/* Start here: changing fontFamily changes ALL text, except explicit overrides.
   CSS values use strings, e.g. '18px', '1.1rem', 'clamp(2rem, 6vw, 6rem)'. */
(function (P, H) {
  P.config.global = {
    enabled: true,
    siteTitle: 'Alex Morgan — Game Programmer',
    description: 'A sample game programmer portfolio. Gameplay systems, tools, and interactive worlds.',
    fontFamily: "'Segoe UI', Arial, sans-serif",
    colors: { accent: '#c3f26b', text: '#f0f3ed', muted: '#a7b0ac', page: '#101414', line: '#2b3430' },
    layout: { maxWidth: '1240px', pagePadding: 'clamp(24px, 6vw, 100px)', sectionPadding: '100px',
      tabletBreakpoint: 1000, mobileBreakpoint: 640 },
    background: H.background(['#101414']),
    smoothScroll: true,
    textPresets: {
      display: { fontSize: 'clamp(3.3rem, 8vw, 7.2rem)', fontWeight: 750, lineHeight: '1.02', letterSpacing: '-0.065em', color: '#f0f3ed' },
      heading: { fontSize: 'clamp(2.3rem, 4vw, 4rem)', fontWeight: 650, lineHeight: '1.1', letterSpacing: '-0.045em', color: '#f0f3ed' },
      subheading: { fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontWeight: 600, lineHeight: '1.3', letterSpacing: '-0.025em', color: '#f0f3ed' },
      body: { fontSize: '1rem', fontWeight: 400, lineHeight: '1.8', color: '#a7b0ac' },
      label: { fontSize: '0.9rem', fontWeight: 550, lineHeight: '1.4', color: '#d9dfd8' },
      eyebrow: { fontSize: '0.8rem', fontWeight: 650, lineHeight: '1.5', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c3f26b' },
      tag: { fontSize: '0.85rem', fontWeight: 450, lineHeight: '1.4', color: '#dce3d9' },
      code: { fontSize: '0.9rem', fontWeight: 400, lineHeight: '1.75', color: '#d7e4c9', whiteSpace: 'pre' }
    },
    accessibility: {
      skipLink: H.link('Skip to content', '#main', { newTab: false }),
      mediaError: H.text('Media unavailable. Check the file path or connection.', 'label'),
      noScriptMessage: 'Please enable JavaScript to view this configurable portfolio.'
    }
  };
})(Portfolio, Portfolio.helpers);
