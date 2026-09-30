/* This is the full example. Duplicate it, change the key and card id, then add its
   script tag to project.html. Every object and text can be disabled independently. */
(function (P, H) {
  P.config.projectDetails.orbital = {
    enabled: true,
    pageTitle: 'Orbital Drift — Alex Morgan',
    layout: {}, // Optional overrides: maxWidth, paddingX, paddingY.
    hero: { enabled: true,
      backgroundImage: H.image('assets/images/orbital-1672.webp', ''),
      title: H.text('Orbital Drift', 'heading'),
      tags: { enabled: true, items: [H.tag('Unreal Engine 5'), H.tag('C++'), H.tag('Gameplay systems'), H.tag('Solo prototype')] },
      description: H.text('A sample project exploring momentum-driven movement and modular player abilities. Replace this page with your own development story, footage, and code.', 'body', { style: { maxWidth: '900px', lineHeight: '1.65' } })
    },
    gallery: { enabled: true, // Override any shared gallery option here.
      items: [
        { enabled: true, type: 'youtube', title: 'Sample video — replace with your gameplay',
          url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', // Big Buck Bunny demo, NOT Orbital Drift gameplay.
          start: 0, poster: H.image('assets/images/orbital-1672.webp', 'Orbital Drift illustrative environment'),
          caption: H.text('Sample video · Replace with your gameplay link', 'label'),
          externalLink: H.link('Watch on YouTube', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', { label: { style: { color: '#c3f26b', fontSize: '0.8rem' } } }) },
        { enabled: true, type: 'image', image: H.image('assets/images/orbital-1672.webp', 'Orbital facility and surrounding cliffs'), caption: H.text('Environment study · Orbital facility', 'label') },
        { enabled: true, type: 'image', image: H.image('assets/images/dune-1672.webp', 'A desert ruin used as a second illustrative environment'), caption: H.text('Environment study · Traversal spaces', 'label') },
        { enabled: false, type: 'video', src: 'assets/videos/gameplay.mp4', title: 'Local gameplay recording', controls: true, loop: false, muted: false, autoplay: false,
          poster: H.image('assets/images/orbital-1672.webp', ''), caption: H.text('Local video example — add your own file and enable.', 'label') }
      ]
    },
    content: { enabled: true,
      link: H.link('Explore the source on GitHub', 'https://github.com/', { label: { style: { color: '#c3f26b' } }, surface: H.surface({ padding: '12px 0' }) }),
      works: [
        { enabled: true,
          surface: H.surface(),
          title: H.text('01 — Movement that feels good', 'subheading'),
          description: H.text('The controller separates player intent from movement state. Input buffering, coyote time, and an adjustable acceleration curve make the system easier to tune without adding complexity to every ability.', 'body'),
          sections: [
            { enabled: true, type: 'images', surface: H.surface(),
              title: H.text('Designing the traversal space', 'subheading', { style: { fontSize: '1.25rem' } }),
              images: { enabled: true, items: [
                H.image('assets/images/orbital-1672.webp', 'Wide orbital canyon layout', { aspectRatio: '16 / 10', surface: H.surface({ radius: '8px' }) }),
                H.image('assets/images/dune-1672.webp', 'Alternate open traversal environment', { aspectRatio: '16 / 10', surface: H.surface({ radius: '8px' }) })
              ] },
              explanation: H.text('Two images: the explanation sits underneath the pair. These original illustrations demonstrate the layout; replace them with gameplay screenshots, diagrams, or GIFs from your project.', 'body')
            },
            { enabled: true, type: 'code', surface: H.surface(),
              title: H.text('Input buffering', 'subheading', { style: { fontSize: '1.25rem' } }),
              description: H.text('This illustrative snippet keeps a short window for jump input. Use this area to explain the decisions behind your own implementation.', 'body'),
              snippets: [
                { enabled: true, filename: H.text('BufferedJump.h', 'label'), language: H.text('C++', 'tag'), surface: {},
                  code: H.text('// Illustrative C++ snippet\nstruct BufferedJump\n{\n    float remaining = 0.0f;\n    float duration = 0.12f;\n\n    void Press() { remaining = duration; }\n    void Tick(float dt)\n    {\n        remaining = std::max(0.0f, remaining - dt);\n    }\n};', 'code') },
                { enabled: true, filename: H.text('PlayerMovement.cpp', 'label'), language: H.text('C++', 'tag'), surface: {},
                  code: H.text('// Consume the request once the player can jump.\nif (jumpBuffer.remaining > 0.0f && CanJump())\n{\n    Jump();\n    jumpBuffer.remaining = 0.0f;\n}', 'code') }
              ]
            }
          ]
        },
        { enabled: true, surface: H.surface(),
          title: H.text('02 — Abilities built for iteration', 'subheading'),
          description: H.text('Each ability owns its activation rules and exposes tuning values. Shared movement and cooldown logic stays in one place, keeping new experiments small and easy to remove.', 'body'),
          sections: [
            { enabled: true, type: 'images', surface: H.surface(),
              title: H.text('Readable spaces, readable systems', 'subheading', { style: { fontSize: '1.25rem' } }),
              images: { enabled: true, items: [H.image('assets/images/orbital-1672.webp', 'Orbital outpost environment', { aspectRatio: '4 / 3', surface: H.surface({ radius: '8px' }) })] },
              explanation: H.text('One image: it appears on the left, with this explanation on the right. On smaller screens, both stack vertically. GIFs use the same image field; local videos can be added to the gallery above.', 'body')
            }
          ]
        }
      ]
    }
  };
})(Portfolio, Portfolio.helpers);
