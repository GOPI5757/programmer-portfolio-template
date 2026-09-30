# Customization guide

## 1. How configuration works

Edit the files in `config/` with a text editor. All scripts are plain JavaScript, loaded in order by the HTML files. You do not need to change the renderer for normal edits.

Each file uses these short names:

```js
(function (P, H) {
  // P.config contains the website settings.
  // H contains helpers that expand short settings into full objects.
})(Portfolio, Portfolio.helpers);
```

`H.text`, `H.surface`, `H.background`, `H.image`, `H.link`, and `H.tag` keep the files readable. They all supply `enabled: true` by default. You can pass `{ enabled: false }` as an override or set the resulting object's `enabled` property to false. Every visible content item, control, and meaningful group has an enabled switch. Layout-only wrappers are created automatically when their content needs them.

Use quotes around CSS lengths (`'18px'`, `'1.2rem'`, `'60%'`) and font/color names. Booleans `true` and `false` are unquoted. Separate array entries and object properties with commas. Text is rendered as plain text; HTML inside config strings is not executed.

### Hide or show content

Examples below go **inside the matching file's function, after its config assignment and before the closing line**. Alternatively, change the original properties directly.

```js
P.config.home.enabled = false;                       // Entire home section
P.config.home.content.role.enabled = false;          // Just the role text
P.config.projects.cards[0].thumbnail.enabled = false;
P.config.projects.cards[0].metadata.items[1].enabled = false;
P.config.about.paragraphs.items[1].enabled = false;
P.config.contact.homeButton.enabled = false;
P.config.footer.links.items[2].enabled = false;
```

Disabling a parent hides its children. `surface.enabled: false` disables that custom surface styling, rather than removing its content. `background.enabled: false` makes that configured background transparent. `border.enabled: false` removes the border. To hide the whole element, set the element's own `enabled: false`.

`global.enabled` is the master website switch. Project-page `enabled`, `hero.enabled`, `gallery.enabled`, `content.enabled`, and `codeBlock.enabled` are master switches across project pages. Individual project settings can additionally disable their own corresponding content. A disabled project card also makes its detail route unavailable.

Keep at least one way to reach each section you want visitors to find. Disabling a section does not automatically remove links that point to it; disable or update those links in navigation and hero actions too.

## 2. One global font, with overrides for any text

In `config/global.js`, change:

```js
fontFamily: "'Trebuchet MS', Arial, sans-serif",
```

This changes all text that inherits the global family, including buttons, labels, tags, paragraphs, and code. The starter's text objects use `fontFamily: null`, which means inherit. It ships with system fonts, so no font download is needed.

### Load your own font

1. Put a licensed `.woff2` font in `assets/fonts/`.
2. Add a rule to `assets/fonts/fonts.css` (already linked by both HTML pages):

```css
@font-face {
  font-family: 'MyPortfolioFont';
  src: url('./my-font.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

3. Set `global.fontFamily` to `"'MyPortfolioFont', Arial, sans-serif"`.

Use `100 900` only for a variable font that actually includes that weight range. For static files, add one rule per weight/style, such as `font-weight: 400` or `700`.

### Override one text

```js
name: H.text('Your Name', 'display', {
  enabled: true,
  style: {
    fontFamily: "Georgia, serif",
    fontSize: 'clamp(3rem, 8vw, 7rem)',
    fontWeight: 700,
    color: '#f6ffee',
    lineHeight: '1.08',
    letterSpacing: '-0.04em',
    textAlign: 'center',
    fontStyle: 'normal',
    textTransform: 'none',
    textDecoration: 'none',
    textShadow: '0 2px 15px #00000060',
    opacity: 1,
    maxWidth: '950px',
    whiteSpace: 'normal',
    margin: '0',
    padding: '0'
  },
  responsive: {
    tablet: { fontSize: '4rem' },
    mobile: { fontSize: '3rem', letterSpacing: '-0.03em' }
  }
})
```

Change `fontFamily` back to `null` to resume inheritance. The same pattern works for titles, descriptions, paragraphs, tag text, link labels, filenames, code, footer text, and gallery captions. To change all headings, edit `global.textPresets.heading`. Per-text `style` values override the preset. A preset can also have a font override; remove it or set it to null when you want global inheritance.

Available presets: `display`, `heading`, `subheading`, `body`, `label`, `eyebrow`, `tag`, `code`. Add your own preset to `global.textPresets` and use its name with `H.text`.

Any standard camelCase CSS property can be supplied in `style` or responsive text overrides. For example `wordSpacing`, `fontVariant`, `textIndent`, and `textWrap`. Avoid fixed widths/heights that would clip longer text. Optional `hoverStyle` takes the same CSS properties.

## 3. Solid colors, gradients, and overlays

Every configured background uses the same object:

```js
background: H.background(['#15251d'], 135) // one color = solid
background: H.background(['#13291d', '#213b49'], 120) // multiple = gradient
background: H.background(['#081511cc', '#15261a88', '#101414'], 180, {
  enabled: true,
  opacity: 0.9
})
```

- `colors`: one or more CSS colors. Hex, hex with alpha, `rgb()`, `rgba()`, `hsl()` work.
- `angle`: gradient direction in degrees. `0` points upward, `90` right, `180` down.
- `opacity`: `0` to `1`, applied to the background without fading the text.
- `enabled`: false gives a transparent background.

Example home overlay:

```js
overlay: H.background(['#00121955', '#07120fed'], 160)
```

For the entire section, card, button, or tag, use a **surface**:

```js
surface: H.surface({
  background: H.background(['#142721', '#1a293b'], 135),
  border: { enabled: true, color: '#668e65', width: '1px', style: 'solid' },
  radius: '12px',
  padding: '24px',
  margin: '0',
  shadow: '0 12px 35px #00000040',
  style: { minHeight: '100px' },
  hover: {
    background: H.background(['#243f2d', '#263e50'], 90),
    border: { color: '#c3f26b' },
    shadow: '0 18px 40px #00000050'
  },
  responsive: { mobile: { padding: '18px', borderRadius: '8px' } }
})
```

`responsive` surface overrides contain plain CSS properties, such as `background`, `padding`, `borderRadius`, or `gap`. They do not take a nested `H.background` object. Hover surfaces do accept nested background/border objects. CSS `style` can customize other attributes such as width, min-height, alignment, gap, and grid settings. Explicit named surface values (such as `padding`) take precedence over the same property in `style`.

The default responsive breakpoints are 1000px and 640px. Change them in `global.layout`. Element-level responsive overrides take precedence over regular inline styles at those widths.

## 4. Navigation and social icons

Edit `config/navigation.js`:

- `sticky: true` keeps the top bar at the top while scrolling; false lets it scroll away.
- `height` controls its preferred desktop height. The home section accounts for its measured height.
- `brand.label` edits the name; `brand.icon.enabled` hides the decorative code icon.
- `menu.items` holds all navigation items; reorder, remove, disable, or add entries.
- `menu.toggle` controls the mobile menu button. When disabled, mobile links remain expanded.
- `socials.items` is an unlimited list. Each social has its own icon, text, and surface.

```js
H.link('My GitHub', 'https://github.com/YOUR_USERNAME', {
  enabled: true,
  newTab: true,
  label: { enabled: false }, // hide visual label; accessible name remains
  icon: { enabled: true, name: 'github', color: '#ffffff', size: 20 },
  surface: H.surface({
    background: H.background(['#24342a', '#1c2839'], 110),
    border: { enabled: true, color: '#80aa68', width: '2px' },
    radius: '9px', padding: '10px'
  })
})
```

Built-in icons: `github`, `linkedin`, `mail`, `home`, `code`, `gamepad`, `link`, `menu`, `minus`, `play`, `chevronLeft`, `chevronRight`. For another brand, use `icon: { enabled: true, src: 'assets/icons/your-icon.svg', size: 20 }`. A custom image uses its own colors; edit the SVG file to recolor it. Built-in icons use `icon.color`.

Links use `newTab: true` for a separate tab. External links receive `rel="noopener noreferrer"`. Use `newTab: false` for internal navigation, email, and telephone links. A link's `label` is a normal text object with all font settings. `ariaLabel` can optionally provide a separate accessible name.

### Résumé

Put `resume.pdf` into `assets/documents/`, then change the résumé item to:

```js
H.link('Résumé', 'assets/documents/resume.pdf', { newTab: true })
```

The included HTML résumé is a readable, editable sample. It opens in a separate tab already.

## 5. Home

Edit `config/home.js`: `backgroundImage`, `overlay`, `content.name`, `content.role`, `content.description`, and optional eyebrow, actions, and bottom note.

`fitScreen: true` fits the initial home section to viewport height minus the navigation. The rest of the page naturally remains scrollable. Content can grow on small screens, at increased text sizes, or when you add unusually long text; the site preserves readability instead of clipping it. `fitScreen: false` uses the normal hero minimum height, which you can override with `surface.style.minHeight`.

The background image fills its area using `objectFit: 'cover'`. Change `objectPosition` to preserve the important part of the image, for example `'65% center'`. Use `'contain'` to show the whole image with possible empty space.

The starter includes two optional hero buttons. Hide the group with `content.actions.enabled = false`, or disable either item individually.

## 6. Categories and independent project cards

Edit `config/projects.js`. Category IDs are stable internal names; labels are visible text. `all` is reserved for showing all enabled projects.

Add a category to `filters.categories`:

```js
{
  enabled: true,
  id: 'multiplayer',
  label: H.text('Multiplayer', 'label'),
  surface: H.surface()
}
```

Assign one or several categories to a card:

```js
categoryIds: ['gameplay', 'multiplayer', 'systems']
```

No separate membership list is needed on the category. `filters.defaultCategory` chooses the first selection. Disabling filters shows every enabled card. An empty category shows `emptyMessage`. `filters.activeSurface` and `filters.activeTextStyle` control the selected button.

### Card shorthand

The `card(...)` helper in this file creates a fully editable card from:

```js
card(
  'my-game', 'My Game', 'orbital', ['gameplay', 'tools'],
  'Unreal Engine 5', 'C++', '3D',
  'A short description of my work.',
  {
    enabled: true,
    title: { style: { color: '#f7c877', fontFamily: 'Georgia, serif' } },
    surface: { background: H.background(['#282516', '#1b2b29'], 120) }
  }
)
```

The third argument selects the base image filenames (`orbital-1672.webp` and `orbital-768.webp`). Override `thumbnail` if using different paths. The ninth argument is an optional deep override object; nested settings preserve other defaults. Arrays replace the entire array.

Each resulting card has independently editable `thumbnail`, `body.surface`, `index`, `title`, `summary`, `metadata.items`, `open`, and `surface`. Metadata items are, by default, engine, language, and format in that order. You can add, remove, reorder, or disable metadata tags.

```js
// Alternative: edit an existing card after P.config.projects is assigned.
P.config.projects.cards[0].metadata.items[0].text.style.color = '#80baff';
P.config.projects.cards[0].metadata.items[2].text.value = '2.5D';
P.config.projects.cards[0].surface.background = H.background(['#132621', '#293149'], 60);
```

`grid.columns`, `tabletColumns`, `mobileColumns`, and `gap` control the grid. Sensible defaults are 3 / 2 / 1 columns. The card image and View project link open `project.html?id=card-id`.

## 7. Add a project page

1. Add the matching card in `config/projects.js` with a unique ID.
2. Copy `config/project-details/orbital.js` to `config/project-details/my-game.js`.
3. Change `P.config.projectDetails.orbital` to `P.config.projectDetails['my-game']` in the copy.
4. Add this line to `project.html` **after** `config/project-page.js` and **before** `js/app.js`:

```html
<script defer src="config/project-details/my-game.js"></script>
```

5. Edit its title, tags, image, gallery, description, link, and work sections.
6. Visit `project.html?id=my-game`.

Project IDs are case-sensitive. Prefer lowercase letters, numbers, and hyphens. Unknown, hidden, and missing IDs show a friendly unavailable page. The URL is shareable without special server routing.

### Shared layout vs individual overrides

`config/project-page.js` contains defaults. A project can override corresponding fields in its own file. For inherited surfaces, use `{}` or just the fields you want to change; calling `H.surface()` explicitly resets that surface to the helper defaults.

```js
layout: { maxWidth: '1200px', paddingX: 'clamp(20px, 5vw, 80px)', paddingY: '30px' },
hero: {
  enabled: true,
  backgroundImage: H.image('assets/images/my-background.webp', ''),
  overlay: H.background(['#102619bb', '#101414'], 175),
  title: H.text('My Game', 'heading'),
  tags: { enabled: true, items: [H.tag('Unreal Engine'), H.tag('C++')] },
  description: H.text('My contribution to the project.', 'body')
}
```

The hero keeps title, tags, gallery, and description together. With the supplied desktop content, they fit in the first viewport. Small screens and longer content may grow vertically. Use `gallery.maxHeight`, `maxWidth`, `aspectRatio`, and the text styles to adjust this balance.

## 8. Images, YouTube, local video, and GIFs

Put media in `assets/images/` or `assets/videos/`. Paths are relative to the HTML page, **not the config file**. Avoid leading `/` if you want subfolder hosting to work.

### Image object

```js
H.image('assets/images/game-1600.webp', 'Describe the meaningful image content', {
  enabled: true,
  width: 1600, height: 900,
  srcSet: 'assets/images/game-800.webp 800w, assets/images/game-1600.webp 1600w',
  sizes: '(max-width: 640px) 100vw, 720px',
  objectFit: 'cover', objectPosition: 'center', aspectRatio: '16 / 9',
  surface: H.surface({ radius: '8px', border: { enabled: true, color: '#416040' } })
})
```

For a single source, omit `srcSet` or set it to `''`. Replace **both** `src` and `srcSet` when replacing sample images; otherwise the browser may keep selecting a sample variant. `width` and `height` should match the original's dimensions. Meaningful images need descriptive alt text; background-only images can use `''`.

### Gallery entries

Add any number of these to the project's `gallery.items` array, in display order:

```js
{
  enabled: true, type: 'youtube',
  title: 'My gameplay video',
  url: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
  start: 0,
  poster: H.image('assets/images/gameplay-poster.webp', 'Gameplay preview'),
  caption: H.text('Combat prototype', 'label'),
  externalLink: H.link('Watch on YouTube', 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID')
},
{
  enabled: true, type: 'image',
  image: H.image('assets/images/movement.gif', 'A movement mechanic in action'),
  caption: H.text('Movement iteration', 'label')
},
{
  enabled: true, type: 'video', src: 'assets/videos/gameplay.mp4',
  title: 'Gameplay recording', controls: true, loop: false, muted: false, autoplay: false,
  poster: H.image('assets/images/gameplay-poster.webp', ''),
  captions: { enabled: true, src: 'assets/videos/gameplay-en.vtt', language: 'en', label: 'English' },
  caption: H.text('Local gameplay capture', 'label')
}
```

YouTube accepts a watch URL, short `youtu.be` URL, embed URL, or the 11-character ID. Videos must permit embedding. YouTube playback requires internet and usually an HTTP(S) page; use the direct link if embedding is blocked. The default privacy-enhanced player contacts YouTube only after a click. Disabling the custom play button loads a native YouTube embed immediately instead.

Local video uses native controls. Autoplay is allowed only for muted videos and is suppressed when the viewer prefers reduced motion; the browser can still block it. Gallery changes remove the previous player so audio does not continue. Arrow buttons cycle in both directions; keyboard left/right works when a gallery button is focused. Controls disappear for one item. There is no automatic carousel advance.

The disabled local-video sample does not contain an actual video file. Add your file before enabling it.

## 9. Repeatable work sections

Each project's `content.works` array contains any number of work groups:

```js
{
  enabled: true,
  surface: H.surface(),
  title: H.text('01 — My system', 'subheading'),
  description: H.text('What this system does and why it matters.', 'body'),
  sections: [ /* Add any mix of images and code below. */ ]
}
```

The shared `content.title`, `subtitle`, and each project's `content.link` precede those work groups. The content link opens in a new tab by default and can point to GitHub, itch.io, a download, or another page.

### Introduction divider and selectable sections

`config/project-page.js` now includes two settings:

- `introDivider`: a line separating the introductory project description from the detailed content. Its `enabled` switch, gradient background, angle, and surface styles work like other elements. Change `surface.style.height` for thickness. An individual project can override it with its own `introDivider` object.
- `sectionTabs`: turns each work group's `sections` array into title buttons. Clicking a button shows that section's images or code beneath the buttons. Each work group has its own independent selection; existing content and ordering are preserved.

The first enabled section is selected initially. Arrow Left/Right and Home/End move between buttons with keyboard focus. Tab moves into the selected panel. Hidden panels retain their content and copy state when you switch back.

Shared appearance and behavior are in `projectPage.sectionTabs`. Override them for an entire project with `projectDetails.yourProject.content.sectionTabs`, or for a single work group with `work.sectionTabs`:

```js
sectionTabs: {
  enabled: true, // false restores the original vertical sections for this group
  defaultSection: 0, // zero-based index among enabled/selectable sections
  showPanelTitle: false, // true repeats the title above the selected content
  surface: { style: { gap: '14px' } },
  panelSurface: { padding: '12px 0' },
  button: {
    label: { style: { fontFamily: null, fontSize: '1rem', color: '#ffffff' } },
    surface: { background: H.background(['#19332a', '#183444'], 120), radius: '8px' }
  },
  activeSurface: { background: H.background(['#c3f26b', '#8adca3'], 90) },
  activeTextStyle: { color: '#14200c', fontWeight: 700 }
}
```

Buttons use each section's existing `title.value`. A section can optionally add its own `button` object to override its label, font, surface, or selected appearance:

```js
button: {
  enabled: true,
  label: H.text('Movement code', 'label', { style: { fontFamily: 'Georgia, serif' } }),
  surface: { border: { color: '#82b57e' } },
  activeTextStyle: { color: '#102010' }
}
```

`section.enabled: false` hides that section and its button. In tab mode, `button.enabled: false` also removes that section from the selector. An empty or fully disabled group shows no selector. A group with one section shows one button. Long button labels wrap on narrow screens. The existing image/code format and all its configuration options remain the same.

### Image explanation section

```js
{
  enabled: true, type: 'images', surface: H.surface(),
  title: H.text('How it behaves', 'subheading'),
  description: H.text('Optional introduction above the images.', 'body'),
  images: { enabled: true, items: [
    H.image('assets/images/before.webp', 'Before the change', { aspectRatio: '16 / 10' }),
    H.image('assets/images/after.gif', 'After the change', { aspectRatio: '16 / 10' })
  ] },
  explanation: H.text('Explain the result here.', 'body')
}
```

Two enabled images appear side by side with the explanation below. One enabled image appears left with the explanation right. Mobile stacks them. Hiding one of two images automatically selects the one-image layout. More than two images form additional rows of two; the explanation remains below. All image formats supported by the browser, including GIF, can use the same field.

### Code snippet section

```js
{
  enabled: true, type: 'code', surface: H.surface(),
  title: H.text('Implementation', 'subheading'),
  description: H.text('Explain your approach.', 'body'),
  snippets: [
    {
      enabled: true,
      filename: H.text('PlayerController.cpp', 'label'),
      language: H.text('C++', 'tag'),
      surface: {}, // inherit shared code-block appearance
      code: H.text(`void PlayerController::Jump()
{
    ApplyJumpImpulse();
}`, 'code', { style: { fontFamily: "Consolas, 'Courier New', monospace" } })
    }
  ]
}
```

Add more entries to `snippets` for vertically stacked blocks. Every filename, language, and code string is a text object. Copy buttons and their feedback are configured in `projectPage.codeBlock`; individual snippets can override `copy`, `headerSurface`, `surface`, and messages. Code is plain, selectable, safely rendered text with horizontal scrolling for long lines. No automatic syntax highlighting is used.

In a JavaScript template string (backticks), escape literal backticks as `\`` and `${` as `\${`. Alternatively use a single/double quoted string with `\n` for new lines and escaped quotes. Keep the snippets valid JavaScript strings even if the code inside is a different language.

## 10. About, skills, and working knowledge

In `config/about.js`, add paragraphs to `paragraphs.items`:

```js
H.text('Another paragraph about my experience.', 'body', {
  style: { color: '#dbe6d5', fontSize: '1.1rem' }
})
```

Each skills group has `title`, `surface`, and `tags.items`. Add tags with:

```js
H.tag('Networking', {
  enabled: true,
  text: { style: { fontFamily: null, color: '#ffffff', fontWeight: 600 } },
  surface: { background: H.background(['#28504b', '#293c60'], 125), radius: '20px' }
})
```

You can add more groups or disable either existing group. All group titles, tags, and backgrounds use the same customization system.

## 11. Contact dock and footer

`config/contact.js` controls the fixed contact widget on both page types:

- `enabled`: entire widget including its home shortcut.
- `initiallyOpen`: expanded on first load (not persisted between pages).
- `position`: desktop/mobile offsets and panel width.
- `homeButton.enabled`: home shortcut only; it returns to `index.html#home`.
- `toggle`, `close`, `title`: separate controls/text.
- `email`: edit both `label.value` and the `mailto:` href.
- `phone`: edit both displayed number and `tel:` href (international format recommended).
- `buttons.items`: any number of custom social/action links, each with a separate surface and text.

The panel minimizes using the minus button or Escape. On mobile it stays within the viewport and can scroll internally. If the toggle is disabled, the panel stays open so contact content remains reachable. If the close button is disabled, the toggle remains available to close it.

`config/footer.js` controls the footer title, links, right-side name, note, and copyright. Add links to `links.items`. `{year}` in any text is replaced with the current browser year. On mobile, the signature stacks beneath the contact links and the footer reserves room for the dock.

For layout padding, use `global.layout.pagePadding`, the footer's `surface.padding`, and any text/surface-specific overrides. The default footer contact content is left aligned and the name is right aligned on desktop.

## 12. Performance without unnecessary quality loss

- Full-size bundled WebP files are lossless conversions and were checked pixel-for-pixel against the generated RGB sources.
- 768px variants are lossless encodings of resized images. Resizing changes resolution; browsers use them when appropriate for display size and pixel density. Supply larger variants for high-DPI or very wide displays.
- Visible hero media loads eagerly. Content images load lazily; they decode asynchronously and reserve their dimensions to reduce layout shifts.
- YouTube's heavy player loads on click. Local videos preload only metadata.
- There are no external font, icon, framework, or analytics requests by default.
- Keep fonts in WOFF2, avoid excessive font weights, and use `font-display: swap`.
- Prefer short MP4/WebM loops for long animated sequences. GIF can be significantly larger and may continue animating under reduced-motion settings.
- Keep filenames versioned when replacing cached media, such as `gameplay-v2.webp`.

On your host, enable Brotli/gzip for HTML/CSS/JS. Cache versioned images/fonts for a long period; keep HTML and editable configs short-lived or revalidated so changes appear promptly. These are hosting settings; a static folder cannot force every hosting provider's cache policy. No service worker is installed, avoiding stale-config surprises.

Every connection has different latency and bandwidth. Offline playback of external videos is impossible; large files still take time on slow networks. Quality, pixel dimensions, and transfer size must be balanced for your real media.

## 13. Troubleshooting and validation

- **Blank page after editing:** check commas, quotes, braces, and script order. Open browser developer tools for the exact syntax error. Run `node tools/validate-config.cjs` if Node is installed.
- **Image does not change:** update `srcSet` as well as `src`; refresh with cache disabled if necessary.
- **Missing project:** check ID spelling in the card, detail object, and URL; ensure the new config script is in `project.html` before `app.js`.
- **No category matches:** use category IDs in `categoryIds`, not display labels.
- **Wrong background:** `surface.background` and hero `overlay` are separate layers; inspect both. One color ignores the gradient angle, by design.
- **Font override persists:** remove the per-text or preset font family; `null` resumes inheritance.
- **YouTube error:** preview through HTTP(S), ensure the video is public and embeddable, check connectivity/content blockers, or use the direct link.
- **Code copying blocked:** the site tries the Clipboard API and a local-file fallback. Select and copy manually if browser permissions block both.
- **Long content exceeds the first screen:** reduce content or media size; small screens and text enlargement use natural scrolling to avoid lost text.

The optional validator checks script syntax, enabled project mappings, duplicate IDs, local paths, and missing image variants. It does not execute your snippets or verify your external accounts. Recheck the finished site with your real content before publishing.
