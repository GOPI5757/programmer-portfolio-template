/* Dependency-free renderer. Edit config files for content and appearance. */
(function (P) {
  'use strict';
  const C = P.config, H = P.helpers, G = C.global;
  const on = value => !!value && value.enabled !== false;
  const root = document.getElementById('app');
  if (!on(G)) return;
  let sequence = 0;
  const rules = document.createElement('style');
  rules.id = 'config-styles';
  document.head.append(rules);
  const tablet = Number(G.layout.tabletBreakpoint) || 1000;
  const mobile = Number(G.layout.mobileBreakpoint) || 640;
  const element = (tag, className = '', parent) => {
    const node = document.createElement(tag);
    node.className = className;
    if (parent) parent.append(node);
    return node;
  };
  const cssKey = key => key.startsWith('--') ? key : key.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
  function styles(node, values) {
    Object.entries(values || {}).forEach(([key, value]) => {
      if (value !== null && value !== undefined) node.style.setProperty(cssKey(key), String(value));
    });
  }
  function customRule(node, selector, values) {
    const temp = document.createElement('span');
    styles(temp, values);
    if (!temp.style.length) return;
    const name = 'custom-' + (++sequence);
    node.classList.add(name);
    const declarations = Array.from(temp.style).map(key => `${key}:${temp.style.getPropertyValue(key)} !important`).join(';');
    rules.append(document.createTextNode(selector.replaceAll('$', '.' + name).replace('@DECL', declarations)));
  }
  function responsive(node, value) {
    if (!value) return;
    customRule(node, `@media(max-width:${tablet}px){$ {@DECL}}`, value.tablet);
    customRule(node, `@media(max-width:${mobile}px){$ {@DECL}}`, value.mobile);
  }
  function background(bg) {
    if (!on(bg) || !Array.isArray(bg.colors) || !bg.colors.length) return 'transparent';
    let colors = bg.colors;
    if (Number.isFinite(bg.opacity) && bg.opacity < 1) colors = colors.map(color => `color-mix(in srgb, ${color} ${Math.max(0,bg.opacity)*100}%, transparent)`);
    return colors.length === 1 ? colors[0] : `linear-gradient(${Number(bg.angle) || 0}deg, ${colors.join(', ')})`;
  }
  function surfaceValues(config) {
    const out = { ...(config.style || {}) };
    if (config.background) out.background = background(config.background);
    if (config.border) {
      out.borderStyle = on(config.border) ? config.border.style || 'solid' : 'none';
      if (config.border.width != null) out.borderWidth = config.border.width;
      if (config.border.color != null) out.borderColor = config.border.color;
    }
    ['radius','padding','margin','shadow'].forEach(key => {
      if (config[key] != null) out[{radius:'borderRadius',shadow:'boxShadow'}[key] || key] = config[key];
    });
    return out;
  }
  function surface(node, config) {
    if (!node || !on(config)) return;
    styles(node, surfaceValues(config));
    responsive(node, config.responsive);
    if (config.hover) customRule(node, '$:hover {@DECL}', surfaceValues(config.hover));
  }
  function text(config, tag = 'p', className = '', parent) {
    if (!on(config)) return null;
    const node = element(tag, 'text ' + className, parent);
    node.textContent = String(config.value ?? '').replaceAll('{year}', String(new Date().getFullYear()));
    const preset = G.textPresets[config.preset] || G.textPresets.body;
    styles(node, preset);
    styles(node, config.style);
    responsive(node, config.responsive);
    if (config.hoverStyle) customRule(node, '$:hover {@DECL}', config.hoverStyle);
    return node;
  }
  const paths = {
    code: ['m8 5-6 7 6 7','m16 5 6 7-6 7','m14 3-4 18'],
    github: ['M9 19c-4 1-4-2-6-2','M15 22v-4a3.5 3.5 0 0 0-1-3c3-.4 6-1.5 6-6a5 5 0 0 0-1.4-3.5A4.6 4.6 0 0 0 18.5 2S17 1.6 14 3a13 13 0 0 0-7 0C4 1.6 2.5 2 2.5 2a4.6 4.6 0 0 0 .1 3.5A5 5 0 0 0 1.2 9c0 4.5 3 5.6 6 6A3.5 3.5 0 0 0 6 18v4'],
    linkedin: ['M4 9v12M4 4v.1M9 21V9h4v2c2-4 7-2 7 2v8M13 21v-7'],
    mail: ['M3 5h18v14H3z','m3 5 9 7 9-7'],
    home: ['m3 10 9-8 9 8','M5 9v12h5v-7h4v7h5V9'],
    minus: ['M5 12h14'], menu: ['M3 6h18M3 12h18M3 18h18'],
    play: ['m8 4 12 8-12 8z'], chevronLeft: ['m15 5-7 7 7 7'], chevronRight: ['m9 5 7 7-7 7'],
    link: ['m10 13 4-4','M8 16l-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0','M16 8l1-1a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0'],
    gamepad: ['M7 7h10c4 0 6 13 2 13l-4-4H9l-4 4C1 20 3 7 7 7z','M7 10v5M4.5 12.5h5M16 11h.1M19 14h.1']
  };
  function icon(config, parent) {
    if (!on(config)) return;
    if (config.src) {
      const img = element('img', 'custom-icon', parent);
      img.src = safeURL(config.src); img.alt = ''; img.width = Number(config.size) || 20; img.height = Number(config.size) || 20;
      return;
    }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', config.size || 20); svg.setAttribute('height', config.size || 20);
    svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', config.color || 'currentColor');
    svg.setAttribute('stroke-width', '1.6'); svg.setAttribute('stroke-linecap','round'); svg.setAttribute('stroke-linejoin','round'); svg.setAttribute('aria-hidden','true');
    (paths[config.name] || paths.link).forEach(d => { const path = document.createElementNS(svg.namespaceURI,'path'); path.setAttribute('d',d); svg.append(path); });
    parent.append(svg);
  }
  function safeURL(value) {
    if (!value || typeof value !== 'string') return '#';
    if (/^\s*(javascript|data|vbscript):/i.test(value)) return '#';
    try { const url = new URL(value, location.href); return ['http:','https:','file:','mailto:','tel:'].includes(url.protocol) ? value : '#'; } catch { return '#'; }
  }
  function link(config, parent, className = '', button = false) {
    if (!on(config)) return null;
    const node = element(button ? 'button' : 'a', 'link ' + className, parent);
    node.setAttribute('aria-label', config.ariaLabel || config.label?.value || 'Link');
    if (button) node.type = 'button';
    else { node.href = safeURL(config.href); if (config.newTab) { node.target = '_blank'; node.rel = 'noopener noreferrer'; } }
    icon(config.icon, node);
    text(config.label, 'span', '', node);
    surface(node, config.surface);
    return node;
  }
  function mediaImage(config, parent, eager = false, className = '') {
    if (!on(config)) return null;
    const wrap = element('div', 'media-wrapper ' + className, parent);
    const img = element('img', '', wrap);
    img.alt = config.alt || ''; img.width = config.width || 1672; img.height = config.height || 941;
    img.loading = eager ? 'eager' : 'lazy'; img.decoding = 'async';
    if (eager) img.fetchPriority = 'high';
    if (config.srcSet) img.srcset = config.srcSet;
    if (config.sizes) img.sizes = config.sizes;
    img.src = safeURL(config.src);
    styles(img, { objectFit: config.objectFit, objectPosition: config.objectPosition, aspectRatio: config.aspectRatio });
    responsive(img, config.responsive); surface(wrap, config.surface);
    img.addEventListener('error', () => { img.hidden = true; text(G.accessibility.mediaError, 'p', 'media-error', wrap); }, { once: true });
    return wrap;
  }
  function backdrop(parent, imageConfig, overlay) {
    if (on(imageConfig)) mediaImage(imageConfig, parent, true, 'background-media');
    if (on(overlay)) { const layer = element('div','background-overlay',parent); layer.style.background = background(overlay); }
  }
  function tags(config, parent) {
    if (!on(config)) return;
    const row = element('div','tags',parent); surface(row,config.surface);
    (config.items || []).filter(on).forEach(item => { const tag = element('span','tag',row); surface(tag,item.surface); text(item.text,'span','',tag); });
  }
  function section(config, parent, className, tag = 'section') {
    if (!on(config)) return null;
    const node = element(tag,className,parent); if (config.id) node.id = config.id; surface(node, config.surface); return node;
  }
  function configure() {
    document.title = G.siteTitle;
    document.querySelector('meta[name="description"]').content = G.description;
    const r = document.documentElement;
    styles(r, { '--font-family': G.fontFamily, '--page': G.colors.page, '--text': G.colors.text, '--muted': G.colors.muted, '--accent': G.colors.accent, '--line': G.colors.line,
      '--max-width': G.layout.maxWidth, '--page-padding': G.layout.pagePadding, '--section-padding': G.layout.sectionPadding });
    document.body.style.background = background(G.background);
    if (G.smoothScroll && !matchMedia('(prefers-reduced-motion: reduce)').matches) r.style.scrollBehavior = 'smooth';
    rules.append(document.createTextNode(`
      @media(max-width:${tablet}px){
        .header-inner{gap:18px}.nav-list{gap:18px}.project-grid{grid-template-columns:repeat(var(--tablet-columns,2),minmax(0,1fr))}
        .section-heading{gap:30px}.about-layout{column-gap:40px;grid-template-columns:.7fr 1.3fr}.skill-groups{grid-column:1/-1}
        .hero-content{gap:16px}.footer-layout{padding-bottom:40px}
      }
      @media(max-width:${mobile}px){
        :root{--section-padding:65px}.header-inner{grid-template-columns:1fr auto;gap:12px;min-height:68px;padding-block:10px}
        .brand{grid-column:1;grid-row:1}.menu-toggle{display:inline-flex;grid-column:2;grid-row:1;padding:8px}
        .nav-list{display:none;grid-column:1/-1;flex-direction:column;align-items:stretch;gap:3px;padding:12px 0 0}
        .nav-list.is-open{display:flex}.nav-list .link{justify-content:flex-start;padding:12px}.header-socials{grid-column:1/-1;justify-content:flex-start;display:none;padding-bottom:8px}
        .site-header.menu-open .header-socials,.site-header.no-menu .header-socials{display:flex}.site-header.no-menu .header-socials{grid-column:2;grid-row:1}.site-header.no-menu .nav-list{display:flex}
        .hero-content{padding:48px 0 115px;gap:17px}.hero-note{bottom:75px}.hero-actions{gap:10px;margin-top:4px}.hero-actions .link{padding:12px 16px!important}
        .section-heading{display:block}.section-heading > .text{margin-top:20px}.filters{gap:8px}.filter{padding:10px 13px}
        .project-grid{grid-template-columns:repeat(var(--mobile-columns,1),minmax(0,1fr))}.about-layout{grid-template-columns:1fr;gap:28px}.skill-groups{grid-column:1;grid-template-columns:1fr;gap:30px}
        .footer-layout{flex-direction:column;align-items:flex-start;padding-bottom:80px;gap:36px}.footer-signature{text-align:left}.footer-links{gap:18px}
        .contact-dock{left:var(--dock-mobile-left,12px);bottom:var(--dock-mobile-bottom,12px)}.contact-panel{max-height:calc(100svh - 24px)}
        .gallery-row{grid-template-columns:1fr 1fr;gap:8px}.gallery-stage{grid-column:1/-1;grid-row:1;max-height:none;min-height:120px}.gallery-next{justify-self:end}.gallery-arrow{padding:9px!important}
        .gallery-caption{gap:12px}.video-play{padding:10px 12px!important;gap:5px}.video-play .text{font-size:.8rem!important}
        .project-hero{padding-block:25px}.project-hero.fit-screen{min-height:auto}.project-hero-content{gap:16px}.project-hero-content h1{font-size:clamp(2rem,8vw,3rem)!important}
        .image-explanation{grid-template-columns:1fr}.image-explanation.pair > .explanation{grid-column:1}.work{padding-block:30px}.snippet pre{padding:16px}.snippet-header{gap:10px}
      }
      @media(max-height:600px) and (min-width:${mobile+1}px){.hero-content{padding:35px 0 55px;gap:10px}.hero-content h1{font-size:clamp(3rem,7vw,5rem)!important}.hero-content .eyebrow{margin:0}.hero-note{bottom:10px}.hero-actions{margin-top:4px}}
    `));
  }
  function navigation() {
    const cfg = C.navigation;
    if (!on(cfg)) { styles(document.documentElement, {'--nav-height':'0px','--sticky-offset':'0px'}); return; }
    const header = section(cfg, root, 'site-header' + (cfg.sticky ? ' is-sticky' : ''), 'header');
    const inner = element('div','container header-inner',header);
    const brand = link(cfg.brand,inner,'brand');
    const menu = on(cfg.menu) ? element('nav','nav-list',inner) : null;
    if (menu) {
      menu.id = 'main-navigation'; menu.setAttribute('aria-label','Main navigation');
      (cfg.menu.items || []).forEach(item => {
        const anchor = link(item,menu);
        if (anchor && document.body.dataset.page === 'home' && item.href === 'index.html#home') anchor.setAttribute('aria-current','page');
        anchor?.addEventListener('click', () => setMenu(false));
      });
    }
    const socials = section(cfg.socials,inner,'header-socials','div');
    if (socials) (cfg.socials.items || []).forEach(item => link(item,socials,'icon-link'));
    const toggle = on(cfg.menu) ? link(cfg.menu.toggle,inner,'menu-toggle',true) : null;
    const setMenu = opened => {
      header.classList.toggle('menu-open',opened); menu?.classList.toggle('is-open',opened); toggle?.setAttribute('aria-expanded',String(opened));
    };
    if (toggle) {
      toggle.setAttribute('aria-controls','main-navigation'); toggle.setAttribute('aria-expanded','false');
      toggle.addEventListener('click',() => setMenu(!header.classList.contains('menu-open')));
      header.addEventListener('keydown', event => { if (event.key === 'Escape') { setMenu(false); toggle.focus(); } });
    } else header.classList.add('no-menu');
    brand?.addEventListener('click',() => setMenu(false));
    const measure = () => {
      // Use the closed row height so opening a mobile menu does not resize the hero.
      const mobileMode = matchMedia(`(max-width:${mobile}px)`).matches;
      const height = mobileMode && header.classList.contains('menu-open') ? 69 : Math.ceil(header.getBoundingClientRect().height);
      styles(document.documentElement, {'--nav-height': `${height}px`, '--sticky-offset': cfg.sticky ? `${height}px` : '0px'});
    };
    header.style.setProperty('--nav-height',cfg.height || '80px');
    new ResizeObserver(measure).observe(header); measure();
  }
  function home(main) {
    const cfg = C.home;
    const hero = section(cfg,main,'hero' + (cfg?.fitScreen ? ' fit-screen' : ''));
    if (!hero) return;
    backdrop(hero,cfg.backgroundImage,cfg.overlay);
    const content = section(cfg.content,hero,'hero-content','div');
    if (content) {
      text(cfg.content.eyebrow,'p','eyebrow',content);
      text(cfg.content.name,'h1','',content);
      text(cfg.content.role,'p','role',content);
      text(cfg.content.description,'p','',content);
      const actions = section(cfg.content.actions,content,'hero-actions','div');
      if (actions) cfg.content.actions.items.forEach(item => link(item,actions));
    }
    text(cfg.bottomNote,'p','hero-note',hero);
  }
  function projects(main) {
    const cfg = C.projects, block = section(cfg,main,'section projects-section');
    if (!block) return;
    const container = element('div','container',block), heading = element('div','section-heading',container), titles = element('div','',heading);
    text(cfg.eyebrow,'p','eyebrow',titles); text(cfg.title,'h2','',titles); text(cfg.intro,'p','',heading);
    const filters = section(cfg.filters,container,'filters','div');
    if (filters) filters.setAttribute('aria-label','Filter projects by category');
    const grid = section(cfg.grid,container,'project-grid','div');
    if (!grid) return;
    grid.id = 'project-results';
    const status = element('p','sr-only',container); status.setAttribute('role','status');
    styles(grid,{'--columns':cfg.grid.columns,'--tablet-columns':cfg.grid.tabletColumns,'--mobile-columns':cfg.grid.mobileColumns,'--grid-gap':cfg.grid.gap});
    const categories = (cfg.filters?.categories || []).filter(on);
    let current = categories.some(cat => cat.id === cfg.filters?.defaultCategory) ? cfg.filters.defaultCategory : categories[0]?.id || 'all';
    if (!filters) current = 'all';
    const buttons = [];
    const cardNodes = new Map();
    function renderCards() {
      grid.replaceChildren();
      buttons.forEach(({button,item}) => {
        const active = item.id === current; button.setAttribute('aria-pressed',String(active));
        button.removeAttribute('style'); surface(button,item.surface); if (active) surface(button,cfg.filters.activeSurface);
        const label = button.querySelector('.text'); if (label) { label.removeAttribute('style'); styles(label,G.textPresets[item.label.preset]); styles(label,item.label.style); if (active) styles(label,cfg.filters.activeTextStyle); }
      });
      const cards = cfg.cards.filter(card => on(card) && (current === 'all' || card.categoryIds.includes(current)));
      cards.forEach(card => {
        if (cardNodes.has(card.id)) { grid.append(cardNodes.get(card.id)); return; }
        const article = section(card,grid,'project-card','article'); article.dataset.project = card.id;
        cardNodes.set(card.id,article);
        if (on(card.thumbnail)) {
          const wrap = on(card.open) ? element('a','card-media',article) : element('div','card-media',article);
          if (on(card.open)) { wrap.href = safeURL(card.open.href); wrap.setAttribute('aria-label',card.title.value); }
          mediaImage(card.thumbnail,wrap);
        }
        const body = section(card.body,article,'card-body','div');
        if (!body) return;
        text(card.index,'p','card-index',body); text(card.title,'h3','',body); text(card.summary,'p','',body); tags(card.metadata,body); link(card.open,body);
      });
      if (!cards.length) text(cfg.emptyMessage,'p','empty-state',grid);
      status.textContent = `${cards.length} project${cards.length === 1 ? '' : 's'} shown`;
    }
    if (filters) categories.forEach(item => {
      const button = element('button','filter',filters); button.type = 'button'; button.setAttribute('aria-controls','project-results');
      button.setAttribute('aria-label',item.label.value); text(item.label,'span','',button); buttons.push({button,item});
      button.addEventListener('click',() => { current = item.id; renderCards(); });
    });
    renderCards();
  }
  function about(main) {
    const cfg = C.about, block = section(cfg,main,'section about-section'); if (!block) return;
    const inner = element('div','container about-layout',block), title = element('div','',inner);
    text(cfg.eyebrow,'p','eyebrow',title); text(cfg.title,'h2','',title);
    const paragraphs = section(cfg.paragraphs,inner,'about-paragraphs','div');
    if (paragraphs) cfg.paragraphs.items.forEach(item => text(item,'p','',paragraphs));
    const groups = section(cfg.groups,inner,'skill-groups','div');
    if (groups) cfg.groups.items.forEach(group => { const node = section(group,groups,'skill-group','div'); if (node) { text(group.title,'h3','',node); tags(group.tags,node); } });
  }
  function footer() {
    const cfg = C.footer, node = section(cfg,root,'site-footer','footer'); if (!node) return;
    const inner = element('div','container footer-layout',node), left = element('div','',inner), right = element('div','footer-signature',inner);
    text(cfg.eyebrow,'p','eyebrow',left); text(cfg.title,'h2','',left);
    const links = section(cfg.links,left,'footer-links','div'); if (links) cfg.links.items.forEach(item => link(item,links));
    text(cfg.name,'p','',right); text(cfg.note,'p','',right); text(cfg.copyright,'p','footer-copyright',right);
  }
  function contact() {
    const cfg = C.contact; if (!on(cfg)) return;
    const dock = element('aside','contact-dock',root); dock.setAttribute('aria-label','Quick contact');
    styles(dock,{'--dock-left':cfg.position.left,'--dock-bottom':cfg.position.bottom,'--dock-width':cfg.position.width,'--dock-mobile-left':cfg.position.mobileLeft,'--dock-mobile-bottom':cfg.position.mobileBottom});
    const homeButton = link(cfg.homeButton,dock,'dock-home');
    const toggle = link(cfg.toggle,dock,'contact-toggle',true);
    const panel = element('div','contact-panel',dock); panel.id = 'contact-panel'; panel.setAttribute('role','region'); panel.setAttribute('aria-label',cfg.title.value); surface(panel,cfg.surface);
    const close = link(cfg.close,panel,'contact-close',true);
    text(cfg.title,'h2','',panel);
    const fields = element('div','contact-fields',panel); link(cfg.email,fields); link(cfg.phone,fields);
    const socials = section(cfg.buttons,panel,'contact-socials','div'); if (socials) cfg.buttons.items.forEach(item => link(item,socials));
    const setOpen = (opened, focus = false) => {
      panel.hidden = !opened; if (homeButton) homeButton.hidden = opened;
      if (toggle) { toggle.hidden = opened && !!close; toggle.setAttribute('aria-expanded',String(opened)); }
      if (focus) (opened ? close || panel.querySelector('a,button') : toggle)?.focus();
    };
    toggle?.setAttribute('aria-controls',panel.id);
    toggle?.addEventListener('click',() => setOpen(panel.hidden,true));
    close?.addEventListener('click',() => setOpen(false,true));
    document.addEventListener('keydown',event => { if (event.key === 'Escape' && !panel.hidden) setOpen(false,true); });
    // Without a toggle the content remains reachable as a permanent panel.
    if (!toggle && close) close.hidden = true;
    setOpen(cfg.initiallyOpen || !toggle);
  }
  function youtubeId(url) {
    try {
      if (/^[\w-]{11}$/.test(url)) return url;
      const u = new URL(url); if (!['youtube.com','www.youtube.com','m.youtube.com','youtu.be','www.youtube-nocookie.com'].includes(u.hostname)) return null;
      const id = u.hostname === 'youtu.be' ? u.pathname.slice(1) : u.searchParams.get('v') || u.pathname.split('/').filter(Boolean).pop();
      return /^[\w-]{11}$/.test(id || '') ? id : null;
    } catch { return null; }
  }
  function gallery(config, parent) {
    if (!on(config)) return;
    const items = (config.items || []).filter(item => on(item) && (item.type !== 'image' || on(item.image)));
    const wrap = element('div','gallery',parent);
    wrap.setAttribute('role','region'); wrap.setAttribute('aria-label','Project media gallery');
    styles(wrap,{'--media-max-width':config.maxWidth,'--media-max-height':config.maxHeight,'--media-ratio':config.aspectRatio});
    if (!items.length) { text(config.emptyMessage,'p','',wrap); return; }
    const row = element('div','gallery-row',wrap);
    const controlsOn = on(config.controls) && items.length > 1;
    const prevSlot = element('div','gallery-previous',row);
    const prev = controlsOn ? link(config.controls.previous,prevSlot,'gallery-arrow',true) : null;
    const stage = element('div','gallery-stage',row); surface(stage,config.surface);
    const nextSlot = element('div','gallery-next',row);
    const next = controlsOn ? link(config.controls.next,nextSlot,'gallery-arrow',true) : null;
    const info = element('div','gallery-caption',wrap); info.setAttribute('aria-live','polite');
    let index = 0;
    function show(nextIndex) {
      index = (nextIndex + items.length) % items.length;
      stage.replaceChildren(); info.replaceChildren();
      const item = items[index];
      if (item.type === 'image') mediaImage(item.image,stage,true);
      else if (item.type === 'youtube') {
        const id = youtubeId(item.url);
        if (!id) text(config.unavailableMessage,'p','media-error',stage);
        else {
          mediaImage(item.poster,stage,true,'video-poster');
          const play = link(config.play,stage,'video-play',true);
          const startVideo = () => {
            stage.replaceChildren(); const iframe = element('iframe','',stage);
            iframe.title = item.title || 'Project video'; iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen'; iframe.allowFullscreen = true;
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&start=${Math.max(0,Math.floor(Number(item.start)||0))}`;
            iframe.focus();
          };
          if (play) play.addEventListener('click',startVideo);
          else { // Disabling the custom play button uses the native embedded player.
            stage.replaceChildren();
            const iframe = element('iframe','',stage); iframe.title = item.title || 'Project video'; iframe.allowFullscreen = true;
            iframe.src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&start=${Math.max(0,Math.floor(Number(item.start)||0))}`;
          }
        }
      } else if (item.type === 'video') {
        const video = element('video','',stage); video.src = safeURL(item.src); video.controls = item.controls !== false; video.playsInline = true; video.preload = 'metadata';
        video.loop = !!item.loop; video.muted = !!item.muted; video.autoplay = !!item.autoplay && !!item.muted && !matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (on(item.poster)) video.poster = safeURL(item.poster.src); video.setAttribute('aria-label',item.title || 'Project video');
        if (item.captions?.enabled && item.captions.src) { const track = element('track','',video); track.kind = 'captions'; track.src = safeURL(item.captions.src); track.srclang = item.captions.language || 'en'; track.label = item.captions.label || 'English'; track.default = true; }
        video.addEventListener('error',() => { video.hidden = true; text(G.accessibility.mediaError,'p','media-error',stage); },{once:true});
      } else text(config.unavailableMessage,'p','media-error',stage);
      const caption = element('div','gallery-caption-text',info);
      text(item.caption,'p','',caption);
      link(item.externalLink,caption,'gallery-external');
      if (on(config.counter)) text(H.merge(config.counter,{value: config.counter.value.replace('{current}',index+1).replace('{total}',items.length)}),'p','gallery-counter',info);
    }
    prev?.addEventListener('click',() => show(index-1)); next?.addEventListener('click',() => show(index+1));
    wrap.addEventListener('keydown',event => {
      if (!controlsOn || !['BUTTON','DIV'].includes(event.target.tagName)) return;
      if (event.key === 'ArrowLeft' && prev) { event.preventDefault(); show(index-1); }
      if (event.key === 'ArrowRight' && next) { event.preventDefault(); show(index+1); }
    });
    show(0);
  }
  async function copyCode(value) {
    try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(value); return true; } } catch { /* Use file:// fallback below. */ }
    const input = element('textarea','sr-only',document.body); input.value = value; input.select();
    let success = false; try { success = document.execCommand('copy'); } catch { success = false; } input.remove(); return success;
  }
  function codeSnippet(snippet, parent) {
    if (!on(snippet) || !on(C.projectPage.codeBlock)) return;
    const cfg = H.merge(C.projectPage.codeBlock,snippet);
    const block = element('div','snippet',parent); surface(block,cfg.surface);
    const header = element('div','snippet-header',block); surface(header,cfg.headerSurface);
    text(snippet.filename,'p','filename',header); text(snippet.language,'p','language',header);
    const button = on(snippet.code) ? link(cfg.copy,header,'copy-button',true) : null;
    if (on(snippet.code)) { const pre = element('pre','',block); pre.tabIndex = 0; text(snippet.code,'code','',pre); }
    const status = element('div','copy-status',block); status.setAttribute('role','status'); status.hidden = true;
    button?.addEventListener('click', async () => {
      const copied = await copyCode(snippet.code.value); status.replaceChildren(); text(copied ? cfg.copiedMessage : cfg.copyErrorMessage,'p','',status); status.hidden = false; button.focus();
    });
  }
  function workSection(cfg,parent,showTitle = true) {
    const node = section(cfg,parent,'work-section'); if (!node) return;
    if (showTitle) text(cfg.title,'h4','',node);
    text(cfg.description,'p','',node);
    if (cfg.type === 'images') {
      const images = on(cfg.images) ? (cfg.images.items || []).filter(on) : [];
      const layout = element('div','image-explanation ' + (images.length === 1 ? 'single' : images.length > 1 ? 'pair' : 'no-images'),node);
      images.forEach(img => mediaImage(img,layout)); text(cfg.explanation,'p','explanation',layout);
    } else if (cfg.type === 'code') (cfg.snippets || []).forEach(snippet => codeSnippet(snippet,node));
  }
  function workSections(work, parent, defaults) {
    const cfg = H.merge(defaults,work.sectionTabs);
    const sections = (work.sections || []).filter(on);
    if (!on(cfg)) { sections.forEach(item => workSection(item,parent)); return; }
    const entries = sections.map((item,index) => ({ item, index, button: H.merge(cfg.button,item.button) })).filter(entry => on(entry.button));
    if (!entries.length) return;
    const tabs = element('div','work-section-tabs',parent);
    tabs.setAttribute('role','tablist');
    tabs.setAttribute('aria-label',work.title?.value || 'Work sections');
    surface(tabs,cfg.surface);
    const groupId = 'work-tabs-' + (++sequence);
    const controls = entries.map(({item,index,button: buttonCfg},position) => {
      const fallback = cfg.fallbackLabel?.value?.replace('{number}',index+1) || `Section ${index+1}`;
      const label = H.merge(buttonCfg.label,{value: buttonCfg.label?.value || item.title?.value || fallback});
      const button = link(H.merge(buttonCfg,{label}),tabs,'work-section-tab',true);
      button.id = `${groupId}-tab-${position}`;
      button.setAttribute('role','tab');
      const panel = element('div','work-section-panel',parent);
      panel.id = `${groupId}-panel-${position}`;
      panel.hidden = true;
      panel.tabIndex = 0;
      panel.setAttribute('role','tabpanel'); panel.setAttribute('aria-labelledby',button.id);
      button.setAttribute('aria-controls',panel.id);
      surface(panel,cfg.panelSurface);
      workSection(item,panel,cfg.showPanelTitle);
      const activeSurface = H.merge(cfg.activeSurface,buttonCfg.activeSurface);
      if (on(activeSurface)) customRule(button,'$[aria-selected="true"] {@DECL}',surfaceValues(activeSurface));
      const labelNode = button.querySelector('.text');
      if (labelNode) customRule(labelNode,'[role="tab"][aria-selected="true"] $ {@DECL}',H.merge(cfg.activeTextStyle,buttonCfg.activeTextStyle));
      return {button,panel};
    });
    function select(index,focus = false) {
      controls.forEach(({button,panel},position) => {
        const selected = position === index;
        button.setAttribute('aria-selected',String(selected)); button.tabIndex = selected ? 0 : -1;
        panel.hidden = !selected;
      });
      if (focus) controls[index].button.focus();
    }
    controls.forEach(({button},index) => {
      button.addEventListener('click',() => select(index));
      button.addEventListener('keydown',event => {
        let next;
        if (event.key === 'ArrowRight') next = (index+1) % controls.length;
        if (event.key === 'ArrowLeft') next = (index-1+controls.length) % controls.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = controls.length-1;
        if (next !== undefined) { event.preventDefault(); select(next,true); }
      });
    });
    const initial = Number.isInteger(cfg.defaultSection) && cfg.defaultSection >= 0 && cfg.defaultSection < controls.length ? cfg.defaultSection : 0;
    select(initial);
  }
  function projectPage(main) {
    const cfg = C.projectPage; if (!on(cfg)) return;
    const id = new URLSearchParams(location.search).get('id');
    const data = Object.prototype.hasOwnProperty.call(C.projectDetails,id) ? C.projectDetails[id] : null;
    const card = C.projects.cards.find(item => item.id === id);
    surface(main,cfg.surface);
    if (!on(data) || (card && !on(card))) {
      const missing = section(cfg.notFound,main,'container not-found');
      if (missing) { text(cfg.notFound.title,'h1','',missing); text(cfg.notFound.description,'p','',missing); link(cfg.backLink,missing); }
      document.title = 'Project not found — ' + G.siteTitle; return;
    }
    document.title = data.pageTitle || data.hero.title.value + ' — ' + G.siteTitle;
    const description = data.hero.description?.value || G.description; document.querySelector('meta[name="description"]').content = description;
    const layout = H.merge(cfg.layout,data.layout);
    styles(main,{'--project-width':layout.maxWidth,'--project-padding':layout.paddingX,'--project-padding-y':layout.paddingY});
    const heroCfg = H.merge(cfg.hero,data.hero);
    const hero = on(cfg.hero) ? section(heroCfg,main,'project-hero' + (heroCfg.fitScreen ? ' fit-screen' : '')) : null;
    if (hero) {
      backdrop(hero,heroCfg.backgroundImage,heroCfg.overlay);
      const content = element('div','project-container project-hero-content',hero);
      link(cfg.backLink,content,'back-link'); text(heroCfg.title,'h1','',content); tags(heroCfg.tags,content);
      if (on(cfg.gallery)) gallery(H.merge(cfg.gallery,data.gallery),content);
      text(heroCfg.description,'p','',content);
    }
    const contentCfg = H.merge(cfg.content,data.content);
    if (hero && on(cfg.content) && on(contentCfg) && on(cfg.introDivider)) {
      section(H.merge(cfg.introDivider,data.introDivider),main,'project-container project-divider','hr');
    }
    const content = on(cfg.content) ? section(contentCfg,main,'section project-content') : null;
    if (content) {
      const inner = element('div','project-container',content), heading = element('div','section-heading',inner);
      text(contentCfg.title,'h2','',heading); text(contentCfg.subtitle,'p','',heading); link(contentCfg.link,heading);
      (contentCfg.works || []).forEach(work => {
        const article = section(work,inner,'work','article'); if (!article) return;
        text(work.title,'h3','',article); text(work.description,'p','',article);
        workSections(work,article,H.merge(cfg.sectionTabs,contentCfg.sectionTabs));
      });
    }
  }
  configure();
  link(G.accessibility.skipLink,root,'skip-link'); navigation();
  const main = element('main','',root); main.id = 'main'; main.tabIndex = -1;
  if (document.body.dataset.page === 'project') projectPage(main); else { home(main); projects(main); about(main); }
  footer(); contact();
  // Hashes work on a fresh URL even though sections are created after parsing.
  if (location.hash) requestAnimationFrame(() => { const target = document.getElementById(decodeURIComponent(location.hash.slice(1))); target?.scrollIntoView({behavior:'instant'}); });
  // Public read-only helpers are useful for validation and advanced extensions.
  P.utils = { background, youtubeId };
})(window.Portfolio);
