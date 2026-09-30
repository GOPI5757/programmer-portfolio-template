/* Optional config/asset validation. Requires Node.js, no packages. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const errors = [];
function walk(dir) { return fs.readdirSync(dir,{withFileTypes:true}).flatMap(item=>item.isDirectory()?walk(path.join(dir,item.name)):[path.join(dir,item.name)]); }
const scripts = walk(path.join(root,'config')).filter(file=>file.endsWith('.js'));
scripts.push(path.join(root,'js/app.js'));
for(const file of scripts) {
  try { new vm.Script(fs.readFileSync(file,'utf8'),{filename:file}); }
  catch(error) { errors.push(error.message); }
}
const context = vm.createContext({ window: {}, console });
try {
  const html = fs.readFileSync(path.join(root,'project.html'),'utf8');
  const sources = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(match=>match[1]).filter(src=>src.startsWith('config/'));
  for(const src of sources) {
    const file=path.join(root,src);
    vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
    if(src==='config/helpers.js') context.Portfolio=context.window.Portfolio;
  }
  // Home-only config files are still checked and loaded for references.
  for(const src of ['config/home.js','config/about.js']) vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),context);
  const config = context.Portfolio.config;
  const categories=config.projects.filters.categories;
  const ids=categories.map(c=>c.id);
  if(new Set(ids).size!==ids.length) errors.push('Category IDs must be unique.');
  const projectIds=config.projects.cards.map(card=>card.id);
  if(new Set(projectIds).size!==projectIds.length) errors.push('Project card IDs must be unique.');
  for(const card of config.projects.cards.filter(x=>x.enabled!==false)) {
    if(!config.projectDetails[card.id] || config.projectDetails[card.id].enabled===false) errors.push(`Missing or disabled project detail for card: ${card.id}`);
    for(const id of card.categoryIds) if(!ids.includes(id)) errors.push(`${card.id}: unknown category ${id}`);
  }
  const refs = new Set();
  function inspect(value) {
    if(!value || typeof value!=='object' || value.enabled===false) return;
    if(Array.isArray(value)) { value.forEach(inspect); return; }
    Object.entries(value).forEach(([key,child])=>{
      if((key==='src'||key==='href') && typeof child==='string' && !/^(https?:|mailto:|tel:|#)/i.test(child)) refs.add(child.split(/[?#]/)[0]);
      if(key==='srcSet' && typeof child==='string') child.split(',').map(x=>x.trim().split(/\s+/)[0]).filter(Boolean).forEach(x=>refs.add(x));
      inspect(child);
    });
  }
  inspect(config);
  for(const file of ['index.html','project.html']) {
    const html=fs.readFileSync(path.join(root,file),'utf8');
    for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) if(!/^(https?:|#)/.test(match[1])) refs.add(match[1]);
  }
  for(const ref of refs) if(!/^(https?:|data:)/i.test(ref) && !fs.existsSync(path.join(root,ref))) errors.push(`Missing local file: ${ref}`);
  if(!errors.length) console.log(`PASS: ${scripts.length} scripts parsed; ${projectIds.length} projects, ${ids.length} categories, and ${refs.size} local references checked.`);
} catch(error) { errors.push(error.stack); }
if(errors.length) { console.error(errors.join('\n')); process.exitCode=1; }
