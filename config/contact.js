(function (P, H) {
  P.config.contact = {
    enabled: true,
    position: { left: '18px', bottom: '24px', mobileLeft: '12px', mobileBottom: '12px', width: '300px' },
    initiallyOpen: false,
    surface: H.surface({ background: H.background(['#202a22', '#121a16'], 135), border: { enabled: true, color: '#44543c' }, radius: '12px', shadow: '0 12px 45px #00000060', padding: '23px' }),
    homeButton: H.link('Back to home', 'index.html#home', { newTab: false, label: { enabled: false }, icon: { enabled: true, name: 'home', size: 19 },
      surface: H.surface({ background: H.background(['#202a22']), border: { enabled: true, color: '#44543c' }, radius: '8px', padding: '12px' }) }),
    toggle: H.link('Contact', '#', { newTab: false, icon: { enabled: true, name: 'mail', size: 18 },
      surface: H.surface({ background: H.background(['#c3f26b']), radius: '8px', padding: '13px 17px' }), label: { style: { color: '#14200c', fontWeight: 700 } } }),
    close: H.link('Minimize contact', '#', { newTab: false, label: { enabled: false }, icon: { enabled: true, name: 'minus', size: 20 } }),
    title: H.text('Let’s make something play.', 'subheading', { style: { fontSize: '1.5rem' } }),
    email: H.link('hello@example.com', 'mailto:hello@example.com', { newTab: false }),
    phone: H.link('+1 (555) 010-2026', 'tel:+15550102026', { newTab: false }),
    buttons: { enabled: true, items: [
      H.link('GitHub', 'https://github.com/', { icon: { enabled: true, name: 'github', size: 18 } }),
      H.link('LinkedIn', 'https://www.linkedin.com/', { icon: { enabled: true, name: 'linkedin', size: 18 } }),
      H.link('itch.io', 'https://itch.io/', { icon: { enabled: true, name: 'gamepad', size: 18 } })
    ] }
  };
})(Portfolio, Portfolio.helpers);
