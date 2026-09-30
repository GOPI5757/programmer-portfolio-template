(function (P, H) {
  const card = (id, title, image, categories, engine, language, format, summary, overrides = {}) => H.merge({
    enabled: true, id, categoryIds: categories,
    surface: H.surface({ background: H.background(['#19201e']), border: { enabled: true, color: '#303b34' }, radius: '10px',
      hover: { border: { color: '#8eb348' }, shadow: '0 16px 36px #00000040' } }),
    thumbnail: H.image(`assets/images/${image}-1672.webp`, `${title} — illustrative game environment`, {
      srcSet: `assets/images/${image}-768.webp 768w, assets/images/${image}-1672.webp 1672w`,
      sizes: '(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw', aspectRatio: '16 / 10' }),
    body: { enabled: true, surface: H.surface({ padding: '25px' }) },
    index: H.text(`0${id === 'orbital' ? 1 : id === 'dune' ? 2 : 3}`, 'eyebrow'),
    title: H.text(title, 'subheading', { style: { fontSize: '1.65rem' } }),
    summary: H.text(summary, 'body', { style: { fontSize: '0.95rem', lineHeight: '1.65' } }),
    metadata: { enabled: true, items: [H.tag(engine), H.tag(language), H.tag(format)] },
    open: H.link('View project', `project.html?id=${id}`, { newTab: false,
      label: { style: { color: '#c3f26b' } }, surface: H.surface({ padding: '6px 0' }) })
  }, overrides);
  P.config.projects = {
    enabled: true, id: 'projects',
    surface: H.surface({ background: H.background(['#101414']) }),
    eyebrow: H.text('01 / Selected work', 'eyebrow'),
    title: H.text('Projects', 'heading'),
    intro: H.text('A closer look at the mechanics, systems, and small details that make a game feel right.', 'body', { style: { maxWidth: '550px' } }),
    filters: { enabled: true, defaultCategory: 'all',
      surface: H.surface(),
      activeSurface: H.surface({ background: H.background(['#c3f26b']), border: { enabled: true, color: '#c3f26b' } }),
      activeTextStyle: { color: '#14200c' },
      categories: [
        { enabled: true, id: 'all', label: H.text('All projects', 'label'), surface: H.surface() },
        { enabled: true, id: 'gameplay', label: H.text('Gameplay', 'label'), surface: H.surface() },
        { enabled: true, id: 'systems', label: H.text('Systems & AI', 'label'), surface: H.surface() },
        { enabled: true, id: 'tools', label: H.text('Tools', 'label'), surface: H.surface() }
      ] },
    grid: { enabled: true, columns: 3, tabletColumns: 2, mobileColumns: 1, gap: '25px', surface: H.surface() },
    emptyMessage: H.text('No projects in this category yet.', 'body'),
    cards: [
      card('orbital', 'Orbital Drift', 'orbital', ['gameplay', 'systems'], 'Unreal Engine 5', 'C++', '3D', 'Momentum-driven traversal and a modular ability system in a forgotten orbital outpost.'),
      card('dune', 'Sands of Solace', 'dune', ['gameplay', 'systems'], 'Unity', 'C#', '3D', 'An exploration prototype built around dynamic encounters and tactile movement.'),
      card('grove', 'Echoes of the Grove', 'grove', ['tools', 'gameplay'], 'Godot', 'GDScript', '2.5D', 'A world-building toolkit and a small adventure through a luminous, living forest.')
    ]
  };
})(Portfolio, Portfolio.helpers);
