(function (P, H) {
  P.config.projectDetails.dune = {
    enabled: true, pageTitle: 'Sands of Solace — Alex Morgan', layout: {},
    hero: { enabled: true, backgroundImage: H.image('assets/images/dune-1672.webp', ''),
      title: H.text('Sands of Solace', 'heading'),
      tags: { enabled: true, items: [H.tag('Unity'), H.tag('C#'), H.tag('AI'), H.tag('3D')] },
      description: H.text('A sample exploration prototype focused on encounter pacing, readable enemy decisions, and responsive movement through open environments.', 'body') },
    gallery: { enabled: true, items: [
      { enabled: true, type: 'image', image: H.image('assets/images/dune-1672.webp', 'Cinematic desert ruins'), caption: H.text('Environment study · Sands of Solace', 'label') },
      { enabled: true, type: 'image', image: H.image('assets/images/orbital-1672.webp', 'Alternate architectural environment'), caption: H.text('Environment study · Scale and traversal', 'label') }
    ] },
    content: { enabled: true, link: H.link('Find the project on itch.io', 'https://itch.io/', { label: { style: { color: '#c3f26b' } } }), works: [
      { enabled: true, surface: H.surface(), title: H.text('01 — Encounters with breathing room', 'subheading'),
        description: H.text('The encounter director waits for the right conditions before starting a new event. Clear state transitions make pacing easier to inspect and tune.', 'body'),
        sections: [
          { enabled: true, type: 'images', surface: H.surface(), title: H.text('A sense of scale', 'subheading'),
            images: { enabled: true, items: [H.image('assets/images/dune-1672.webp', 'Monumental desert architecture', { aspectRatio: '4 / 3' })] },
            explanation: H.text('A single image and an adjacent explanation. Replace this illustrative environment with a screenshot or GIF of your encounter system in action.', 'body') },
          { enabled: true, type: 'code', surface: H.surface(), title: H.text('An inspectable decision', 'subheading'),
            description: H.text('A small example of keeping encounter conditions explicit.', 'body'),
            snippets: [{ enabled: true, surface: {}, filename: H.text('EncounterDirector.cs', 'label'), language: H.text('C#', 'tag'),
              code: H.text('// Illustrative snippet\nbool CanStartEncounter()\n{\n    return player.IsReady\n        && activeEnemies.Count == 0\n        && timeSinceLastEncounter > cooldown;\n}', 'code') }] }
        ] }
    ] }
  };
})(Portfolio, Portfolio.helpers);
