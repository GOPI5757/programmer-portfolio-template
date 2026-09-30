(function (P, H) {
  P.config.footer = {
    enabled: true, id: 'contact',
    surface: H.surface({ background: H.background(['#0c100e']), padding: '65px 0' }),
    eyebrow: H.text('03 / Get in touch', 'eyebrow'),
    title: H.text('Contact', 'heading', { style: { fontSize: '2.5rem' } }),
    links: { enabled: true, items: [
      H.link('Email', 'mailto:hello@example.com', { newTab: false }),
      H.link('GitHub', 'https://github.com/'),
      H.link('LinkedIn', 'https://www.linkedin.com/'),
      H.link('itch.io', 'https://itch.io/')
    ] },
    name: H.text('Alex Morgan', 'subheading', { style: { fontSize: '1.4rem' } }),
    note: H.text('Game programmer · Always curious.', 'body', { style: { fontSize: '0.9rem' } }),
    copyright: H.text('© {year} Alex Morgan', 'label', { style: { color: '#899487', fontSize: '0.8rem' } })
  };
})(Portfolio, Portfolio.helpers);
