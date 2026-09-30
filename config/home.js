(function (P, H) {
  P.config.home = {
    enabled: true, id: 'home', fitScreen: true,
    surface: H.surface({ background: H.background(['#152323']) }),
    backgroundImage: H.image('assets/images/orbital-1672.webp', 'A cinematic orbital outpost in a mountain canyon', {
      srcSet: 'assets/images/orbital-768.webp 768w, assets/images/orbital-1672.webp 1672w', objectPosition: '50% 50%' }),
    overlay: H.background(['#07131180', '#101414e8'], 180),
    content: { enabled: true, surface: H.surface(),
      eyebrow: H.text('Gameplay · Systems · Tools', 'eyebrow'),
      name: H.text('Alex Morgan', 'display'),
      role: H.text('Game Programmer.', 'subheading', { style: { fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', fontWeight: 450, color: '#c3f26b' } }),
      description: H.text('Turning complex ideas into worlds worth playing.\nI build responsive gameplay, thoughtful systems, and tools that get out of the way.', 'body', { style: { color: '#d0d8d0', maxWidth: '630px', whiteSpace: 'pre-line' } }),
      actions: { enabled: true, items: [
        H.link('Explore my work', '#projects', { newTab: false, surface: H.surface({ background: H.background(['#c3f26b']), radius: '6px', padding: '15px 24px' }), label: { style: { color: '#14200c', fontWeight: 700 } } }),
        H.link('About me', '#about', { newTab: false, surface: H.surface({ background: H.background(['#12231e66']), border: { enabled: true, color: '#6a7e6d' }, radius: '6px', padding: '15px 24px' }) })
      ] }
    },
    bottomNote: H.text('Built around the player.', 'label', { style: { color: '#c2cbbd', letterSpacing: '0.05em' } })
  };
})(Portfolio, Portfolio.helpers);
