(function (P, H) {
  P.config.navigation = {
    enabled: true,
    sticky: true, // true = stays at the top while scrolling; false = scrolls away.
    height: '80px',
    surface: H.surface({ background: H.background(['#101414'], 180, { opacity: 0.96 }),
      border: { enabled: true, color: '#ffffff12', width: '0 0 1px' } }),
    brand: H.link('alex morgan', 'index.html#home', { newTab: false,
      label: H.text('alex morgan', 'subheading', { style: { fontSize: '1.25rem', fontWeight: 700 } }),
      icon: { enabled: true, name: 'code', color: '#c3f26b', size: 25 } }),
    menu: {
      enabled: true,
      toggle: H.link('Menu', '#', { newTab: false, icon: { enabled: true, name: 'menu', size: 22 } }),
      items: [
        H.link('Home', 'index.html#home', { newTab: false }),
        H.link('Projects', 'index.html#projects', { newTab: false }),
        H.link('About me', 'index.html#about', { newTab: false }),
        H.link('Résumé', 'assets/documents/resume.html')
      ]
    },
    socials: {
      enabled: true,
      items: [
        H.link('GitHub', 'https://github.com/', { label: { enabled: false }, icon: { enabled: true, name: 'github', color: '#dae2d8', size: 19 },
          surface: H.surface({ background: H.background(['#19201c']), border: { enabled: true, color: '#374233' }, radius: '7px', padding: '10px', hover: { background: H.background(['#2a3823']), border: { color: '#c3f26b' } } }) }),
        H.link('LinkedIn', 'https://www.linkedin.com/', { label: { enabled: false }, icon: { enabled: true, name: 'linkedin', color: '#dae2d8', size: 19 },
          surface: H.surface({ background: H.background(['#19201c']), border: { enabled: true, color: '#374233' }, radius: '7px', padding: '10px' }) })
      ]
    }
  };
})(Portfolio, Portfolio.helpers);
