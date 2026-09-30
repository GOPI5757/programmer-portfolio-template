/* Shared project-page layout. Individual content lives in config/project-details/. */
(function (P, H) {
  P.config.projectDetails = {};
  P.config.projectPage = {
    enabled: true,
    layout: { maxWidth: '1120px', paddingX: 'clamp(24px, 6vw, 100px)', paddingY: '36px' },
    surface: H.surface({ background: H.background(['#101414']) }),
    backLink: H.link('All projects', 'index.html#projects', { newTab: false, label: { style: { color: '#c3f26b' } } }),
    hero: { enabled: true, fitScreen: true, surface: H.surface(),
      overlay: H.background(['#0b1412df', '#101414fa'], 180) },
    // Separation between the project introduction and its detailed content.
    introDivider: { enabled: true,
      surface: H.surface({ background: H.background(['#29352b', '#c3f26b', '#29352b'], 90), style: { height: '1px' } }) },
    // Each work group's existing sections become selectable buttons.
    sectionTabs: {
      enabled: true, // false restores the original stacked sections.
      defaultSection: 0, // Zero-based position among enabled section buttons.
      showPanelTitle: false, // The section title is already shown on its button.
      surface: H.surface(),
      panelSurface: H.surface(),
      button: {
        enabled: true,
        label: H.text('', 'label'), // Empty value uses the section's existing title.
        surface: H.surface({ background: H.background(['#19201e']),
          border: { enabled: true, color: '#3b493d' }, radius: '6px', padding: '12px 18px' })
      },
      activeSurface: H.surface({ background: H.background(['#c3f26b']),
        border: { enabled: true, color: '#c3f26b' } }),
      activeTextStyle: { color: '#14200c', fontWeight: 650 },
      fallbackLabel: H.text('Section {number}', 'label')
    },
    gallery: {
      enabled: true, aspectRatio: '16 / 9', maxWidth: '720px', maxHeight: '40svh',
      surface: H.surface({ background: H.background(['#080d0b']), border: { enabled: true, color: '#3f4d3e' }, radius: '9px' }),
      controls: { enabled: true,
        previous: H.link('Previous media', '#', { newTab: false, label: { enabled: false }, icon: { enabled: true, name: 'chevronLeft', size: 24 }, surface: H.surface({ background: H.background(['#19241c']), border: { enabled: true, color: '#46573b' }, radius: '50%', padding: '12px' }) }),
        next: H.link('Next media', '#', { newTab: false, label: { enabled: false }, icon: { enabled: true, name: 'chevronRight', size: 24 }, surface: H.surface({ background: H.background(['#19241c']), border: { enabled: true, color: '#46573b' }, radius: '50%', padding: '12px' }) })
      },
      counter: H.text('{current} / {total}', 'label', { style: { fontSize: '0.8rem', color: '#aab7a4' } }),
      play: H.link('Play gameplay video', '#', { newTab: false, icon: { enabled: true, name: 'play', size: 24 }, surface: H.surface({ background: H.background(['#c3f26b']), padding: '16px 22px', radius: '7px' }), label: { style: { color: '#14200c', fontWeight: 700 } } }),
      emptyMessage: H.text('Gameplay media coming soon.', 'body'),
      unavailableMessage: H.text('This video link is unavailable. Check its URL in the project config.', 'body')
    },
    content: { enabled: true, surface: H.surface(),
      title: H.text('Content', 'heading'),
      subtitle: H.text('A breakdown of the ideas, implementation, and iteration behind the project.', 'body') },
    codeBlock: {
      enabled: true,
      surface: H.surface({ background: H.background(['#0b100d']), border: { enabled: true, color: '#35432f' }, radius: '9px' }),
      headerSurface: H.surface({ background: H.background(['#1b251c']), padding: '12px 18px' }),
      copy: H.link('Copy code', '#', { newTab: false, label: H.text('Copy code', 'label', { style: { color: '#c3f26b' } }) }),
      copiedMessage: H.text('Copied', 'label'),
      copyErrorMessage: H.text('Select the code to copy it manually.', 'label')
    },
    notFound: { enabled: true, title: H.text('Project not found', 'heading'), description: H.text('This project may have moved or is currently hidden.', 'body') }
  };
})(Portfolio, Portfolio.helpers);
