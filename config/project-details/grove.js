(function (P, H) {
  P.config.projectDetails.grove = {
    enabled: true, pageTitle: 'Echoes of the Grove — Alex Morgan', layout: {},
    hero: { enabled: true, backgroundImage: H.image('assets/images/grove-1672.webp', ''),
      title: H.text('Echoes of the Grove', 'heading'),
      tags: { enabled: true, items: [H.tag('Godot'), H.tag('GDScript'), H.tag('Editor tools'), H.tag('2.5D')] },
      description: H.text('A sample adventure and world-building toolkit. The focus is on shortening the path from an environment idea to a playable space.', 'body') },
    gallery: { enabled: true, items: [
      { enabled: true, type: 'image', image: H.image('assets/images/grove-1672.webp', 'Luminous forest and ancient gate'), caption: H.text('Environment study · Echoes of the Grove', 'label') }
    ] },
    content: { enabled: true, link: H.link('Explore the tools on GitHub', 'https://github.com/', { label: { style: { color: '#c3f26b' } } }), works: [
      { enabled: true, surface: H.surface(), title: H.text('01 — Tools that keep you creating', 'subheading'),
        description: H.text('A reusable placement tool exposes only the settings needed for a particular task. Small editor helpers reduce repetition and leave more time for composition and playtesting.', 'body'),
        sections: [
          { enabled: true, type: 'images', surface: H.surface(), title: H.text('Building a living forest', 'subheading'),
            images: { enabled: true, items: [H.image('assets/images/grove-1672.webp', 'Bioluminescent forest study', { aspectRatio: '4 / 3' })] },
            explanation: H.text('Use this area for a GIF showing your tool inside the editor. A single image stays beside its explanation on larger screens and stacks above it on mobile.', 'body') },
          { enabled: true, type: 'code', surface: H.surface(), title: H.text('Preview changes in the editor', 'subheading'),
            description: H.text('An illustrative Godot property that updates the scene immediately.', 'body'),
            snippets: [{ enabled: true, surface: {}, filename: H.text('grove_light.gd', 'label'), language: H.text('GDScript', 'tag'),
              code: H.text('@tool\nextends OmniLight3D\n\n@export var glow_strength: float = 2.0:\n    set(value):\n        glow_strength = value\n        light_energy = glow_strength', 'code') }] }
        ] }
    ] }
  };
})(Portfolio, Portfolio.helpers);
