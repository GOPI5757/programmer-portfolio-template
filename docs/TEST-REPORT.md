# Verification report

Verified on 1 October 2026 using a real Chromium-based Microsoft Edge browser in automated desktop and mobile-sized sessions.

## Passed

- All configuration and application JavaScript parses successfully.
- Three project IDs map to three detail pages; four category IDs are valid and unique.
- Enabled local asset references and responsive image variants exist.
- Home hero plus top bar fits the 1440 × 900 initial viewport.
- Default project introduction, tags, gallery, and description fit that desktop viewport.
- Layout checks at 360px, 390px, 768px, 1024px, and 1920px widths find no horizontal page overflow.
- Desktop and mobile page screenshots were visually reviewed; image proportions were corrected and rechecked.
- Category changes show the correct cards; one card can belong to multiple categories.
- Empty categories and empty galleries display their configured messages.
- All three project routes render their content. Unknown and disabled projects have an unavailable state.
- Galleries cycle forward and backward, including wrapping at both ends.
- YouTube player creation is deferred until a click; switching away removes the player.
- Direct video links open separately. Local video elements use native controls and metadata preloading.
- One-image explanations sit beside their image on desktop; two-image explanations sit below the pair; mobile stacks them.
- Multiple code blocks render their filenames and selectable code. Copy controls show feedback.
- Floating contact opens, minimizes, and responds to Escape; its mobile width stays inside the viewport.
- Mobile navigation opens and closes; selecting an internal link closes it.
- The résumé and configured external social links have separate-tab behavior and protective rel attributes.
- Global font inheritance, a specific text font override, gradient colors/angle, and responsive text overrides work.
- Whole sections, individual texts, cards, tags, images, snippets, and contact home control can be disabled.
- Shared project hero, gallery, content, and code-block switches control their respective components.
- Static and absent top-bar variants work; the home section adjusts its height when the bar is absent.
- Disabling the menu toggle preserves accessible navigation; disabling the contact toggle preserves accessible contact content.
- Missing image and invalid video URL states produce readable feedback.
- Literal HTML in text content remains plain text.
- At 200% text enlargement, the tested desktop and mobile layouts retain content without horizontal page overflow.
- Full-size lossless WebP pixels match the original RGB source images exactly.
- No application JavaScript errors occurred during the passing test runs.

## Scope and limits

- These checks use simulated viewport sizes in Edge, not every physical phone or browser. Safari and Firefox were not run here.
- The YouTube source page was checked and identifies the demo clip as Big Buck Bunny. Player insertion/removal was verified with a controlled response; uninterrupted remote streaming was not verified. Real playback depends on internet access, browser restrictions, the video's embed permissions, and an HTTP(S) origin.
- The disabled local-video sample intentionally has no video file. Local-player creation and missing-file handling were checked, not playback of your future footage.
- Sample identity, social URLs, email, phone, and résumé require replacement. Social links currently open service homepages.
- Keyboard operation, focus styles, alt-text fields, reduced-motion handling, and layout enlargement are included. This is not a formal accessibility certification.
- No instant-load guarantee is made. Slow-network throughput and the eventual host's caching/compression behavior were not benchmarked.
- No public deployment was performed; this is a portable ZIP delivery.

After customization, run `node tools/validate-config.cjs` if Node.js is available, and review your real content in a browser before publishing.

## Project-section update

The updated package adds only a configurable divider after the project introduction and selectable section buttons within each work group. The original project data and media are unchanged.

Additional checks cover divider placement, one selected panel per work group, independent selections, image/code switching, code copying after selection, keyboard navigation, disabled sections, default selection, optional stacked-mode fallback, and narrow-screen button wrapping. Existing gallery, navigation, home, contact, and layout checks were rerun.
