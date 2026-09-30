(function (P, H) {
  P.config.about = {
    enabled: true, id: 'about',
    surface: H.surface({ background: H.background(['#171e1b', '#111715'], 120), border: { enabled: true, color: '#29352b', width: '1px 0' } }),
    eyebrow: H.text('02 / Behind the code', 'eyebrow'),
    title: H.text('About me', 'heading'),
    paragraphs: { enabled: true, surface: H.surface(), items: [
      H.text('I’m Alex, a game programmer drawn to the space between good engineering and great game feel. I enjoy taking an idea from a rough prototype to something you want to keep playing.', 'body', { style: { fontSize: '1.12rem', color: '#d4dcd2' } }),
      H.text('My work spans gameplay systems, AI, and developer tools. I care about readable code, fast iteration, and working closely with artists and designers to find the right solution.', 'body'),
      H.text('Away from the editor, you’ll usually find me studying the details of a favorite game or sketching the next small experiment.', 'body')
    ] },
    groups: { enabled: true, surface: H.surface(), items: [
      { enabled: true, title: H.text('Skills', 'subheading'), surface: H.surface(), tags: { enabled: true, items: ['C++', 'C#', 'Unreal Engine', 'Unity', 'Gameplay programming', 'Blueprints'].map(x => H.tag(x)) } },
      { enabled: true, title: H.text('Working knowledge', 'subheading'), surface: H.surface(), tags: { enabled: true, items: ['Godot', 'GDScript', 'AI & behavior trees', 'Git', 'Profiling', 'Shaders', 'Blender'].map(x => H.tag(x)) } }
    ] }
  };
})(Portfolio, Portfolio.helpers);
