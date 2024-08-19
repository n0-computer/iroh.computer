import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import ejs from 'ejs'

import api from '../api-code-examples/api.mjs';

(function() {
  try {
    let templateSource = readFileSync('./templates/api.template.mdx');
    Object.keys(api).forEach((key) => {
      console.log('%s api:', key);
      generateApiDocs(api[key], templateSource);
    });
  }
  catch(err) {
    console.error("Error: %s", err);
  }
  console.log('Done!');
})()

function generateApiDocs(api, templateSource) {
  api.forEach((command) => {
    generateApiDoc(command, templateSource)
  })
}

function generateApiDoc(command, templateSource) {
  let examples = {
    rust: readExample('rust', command.slug, 'rs'),
    python: readExample('python', command.slug, 'py'),
    swift: readExample('swift', command.slug, 'swift'),
    kotlin: readExample('kotlin', command.slug, 'kt'),
    nodejs: readExample('nodejs', command.slug, 'js'),

    ...command.examples
  }

  let result = ejs.render(templateSource.toString(), { command, examples });

  // mkdir -p ../src/app/docs/api/{slug}
  mkdir(command.slug);
  const path = `../src/app/docs/api/${command.slug}/page.mdx`;``
  console.log('  %s\texamples: [ %s ]', path, Object.keys(examples).filter(k => !!examples[k]).join(', '));
  writeFileSync(path, result);
}

// mkdir -p ../src/app/docs/api/{slug}
function mkdir(slug) {
  try {
    mkdirSync(`../src/app/docs/api/${slug}`);
  }
  catch(err) {
    if(err.code !== 'EEXIST') {
      throw err;
    }
  }
}

// check if ../api-code-examples/{language}/{slug}.{extension} exists
// if it does, read it to a string and return
// if it doesn't, return undefined
function readExample(language, slug, extension) {
  try {
    return readFileSync(`../api-code-examples/${language}/${slug}.${extension}`).toString();
  }
  catch(err) {
    return undefined;
  }
}