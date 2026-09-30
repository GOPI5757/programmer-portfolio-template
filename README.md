# Game programmer portfolio

A complete, dependency-free HTML, CSS, and JavaScript portfolio. No build step or account is required.

## Start

1. Extract the **entire ZIP** to a folder.
2. Open `index.html` in a current browser. Local pages, images, navigation, categories, galleries, and the contact widget work directly from the folder.
3. Edit the JavaScript files inside `config/`, save, and refresh the page.
4. Read **[docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md)** for the complete guide and copyable examples.

For embedded YouTube playback, preview through HTTP rather than opening a file directly. If Python is installed, open a terminal in this folder and run:

```sh
python -m http.server 8080
```

Then visit `http://localhost:8080`. Stop the server with Ctrl+C. You can also use your editor's local web preview. YouTube requires internet access and may reject local `file://` origins, blocked cookies, or unavailable videos. Each YouTube item can include a direct viewing link.

## What is included

- Full-height home section with a background image and configurable gradient overlay.
- Sticky or static navigation, configurable social icons, and a résumé that opens in a new tab.
- Projects mapped to multiple categories; each card has independent appearance settings.
- Three complete project pages with tags, image/video galleries, work sections, image explanations, and code blocks.
- About paragraphs, skill tags, and working-knowledge tags.
- A collapsible fixed contact panel and separately switchable home button.
- Footer contact links and name text.
- Global font inheritance; individual text overrides; enabled switches; configurable colors, gradients, borders, spacing, and responsive overrides.
- Original illustrative images in lossless WebP, plus smaller responsive variants.

## Replace the sample content

**Alex Morgan, the projects, biography, résumé, email, phone, and social destinations are examples.** Project images are AI-generated environment illustrations, not evidence of completed games. The sample YouTube clip is Big Buck Bunny, not project gameplay. Replace these with your own identity, accurate work, screenshots, footage, links, and résumé before publishing.

## Folder map

```text
index.html                    Home / projects / about / contact
project.html                  Project details: ?id=orbital
config/
  helpers.js                  Shared constructors and merge helper
  global.js                   Global font, typography, theme, spacing
  navigation.js               Brand, menu, résumé, social icons, sticky switch
  home.js                     Hero image, overlay, texts, optional buttons
  projects.js                 Categories, cards, category mappings
  project-page.js             Shared project layout, gallery and code defaults
  project-details/
    orbital.js                Full example with both content-section types
    dune.js                   Second project
    grove.js                  Third project
  about.js                    Paragraphs, skills and working knowledge
  contact.js                  Floating contact panel and home button
  footer.js                   Footer links and name
css/styles.css                Responsive layout and component structure
js/app.js                     Rendering and interactions
assets/
  images/                     Portfolio images (full and responsive)
  videos/                     Your MP4/WebM files go here
  fonts/fonts.css             Add local @font-face rules here
  documents/resume.html       Editable example; replace with your PDF if desired
  icons/favicon.svg          Site icon; custom social icons may go here
docs/
  CUSTOMIZATION.md            Full editing guide
  ASSETS.md                   Artwork and media notes
  TEST-REPORT.md              Verification results and limits
tools/validate-config.cjs     Optional Node-based config checker
```

## Publish

Upload the folder contents to any static website host. Keep the folder paths and filenames intact and use HTTPS. No routing rewrite is needed: each detail page uses `project.html?id=your-id`. You can also host the site in a subfolder because asset paths are relative. This delivery does not publish the site.

Optional validation, if Node.js is installed:

```sh
node tools/validate-config.cjs
```

## Performance expectations

The site uses local assets, no framework, no icon/font CDN, lazy image loading below the first screen, responsive image selection, asynchronous decoding, and click-to-load YouTube players. Full-size WebP files preserve the source RGB pixels exactly. Smaller variants are resized for their intended display size.

Instant loading on every network is impossible. A slow or offline connection cannot immediately load remote video or uncached assets. Hosting compression and caching, correctly sized images, and short video clips make the largest practical difference. See the guide for deployment caching recommendations.
