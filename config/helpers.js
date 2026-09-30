/* Shared config constructors. Every visible item starts with enabled: true.
   Keep this file before the other configs in the HTML script list. */
window.Portfolio = { config: {}, helpers: {} };
(function (P) {
  'use strict';
  const merge = (base, extra) => {
    const result = { ...base };
    Object.entries(extra || {}).forEach(([key, value]) => {
      result[key] = value && typeof value === 'object' && !Array.isArray(value)
        ? merge(base[key] || {}, value) : value;
    });
    return result;
  };
  P.helpers.merge = merge;
  P.helpers.text = (value, preset = 'body', overrides = {}) => merge({
    enabled: true, value, preset,
    style: { fontFamily: null, fontSize: null, fontWeight: null, color: null,
      lineHeight: null, letterSpacing: null, textAlign: null, fontStyle: null,
      textTransform: null, textDecoration: null, textShadow: null, opacity: null,
      maxWidth: null, whiteSpace: null, margin: null, padding: null },
    responsive: { tablet: {}, mobile: {} }
  }, overrides);
  P.helpers.background = (colors = ['#101414'], angle = 135, overrides = {}) => merge({
    enabled: true, colors, angle, opacity: 1
  }, overrides);
  P.helpers.surface = (overrides = {}) => merge({
    enabled: true, background: { enabled: false, colors: ['#101414'], angle: 135, opacity: 1 },
    border: { enabled: false, color: '#303939', width: '1px', style: 'solid' },
    radius: null, padding: null, margin: null, shadow: null,
    style: {}, responsive: { tablet: {}, mobile: {} }, hover: {}
  }, overrides);
  P.helpers.image = (src, alt, overrides = {}) => merge({
    enabled: true, src, alt, srcSet: '', sizes: '100vw', width: 1672, height: 941,
    objectFit: 'cover', objectPosition: 'center', aspectRatio: null,
    surface: P.helpers.surface(), responsive: { tablet: {}, mobile: {} }
  }, overrides);
  P.helpers.link = (label, href, overrides = {}) => merge({
    enabled: true, label: P.helpers.text(label, 'label'), href, newTab: true,
    surface: P.helpers.surface(), icon: { enabled: false, name: 'link', color: 'currentColor', size: 18 }
  }, overrides);
  P.helpers.tag = (label, overrides = {}) => merge({
    enabled: true, text: P.helpers.text(label, 'tag'),
    surface: P.helpers.surface({ background: P.helpers.background(['#1b2221']),
      border: { enabled: true, color: '#34403a' }, radius: '5px', padding: '7px 12px' })
  }, overrides);
})(window.Portfolio);
