import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import ejs from 'ejs'

import commands from '../command-code-examples/commands.mjs';

(function() {
  try {
    let templateSource = readFileSync('./templates/command.template.mdx');
    Object.keys(commands).forEach((key) => {
      console.log('%s commands:', key);
      generateCommands(commands[key], templateSource);
    });
  }
  catch(err) {
    console.error("Error: %s", err);
  }
  console.log('Done!');
})()

function generateCommands(commands, templateSource) {
  commands.forEach((command) => {
    generateCommand(command, templateSource)
  })
}

function generateCommand(command, templateSource) {
  let examples = {
    rust: readExample('rust', command.slug, 'rs'),
    python: readExample('python', command.slug, 'py'),
    swift: readExample('swift', command.slug, 'swift'),
    go: readExample('go', command.slug, 'go'),
    kotlin: readExample('kotlin', command.slug, 'kotlin'),

    ...command.examples
  }

  let result = ejs.render(templateSource.toString(), { command, examples });

  // mkdir -p ../src/app/docs/commands/{slug}
  mkdir(command.slug);
  const path = `../src/app/docs/commands/${command.slug}/page.mdx`;``
  console.log('  %s\texamples: [ %s ]', path, Object.keys(examples).filter(k => !!examples[k]).join(', '));
  writeFileSync(path, result);
}

// mkdir -p ../src/app/docs/commands/{slug}
function mkdir(slug) {
  try {
    mkdirSync(`../src/app/docs/commands/${slug}`);
  }
  catch(err) {
    if(err.code !== 'EEXIST') {
      throw err;
    }
  }
}

// check if ../command-code-examples/{language}/{slug}.{extension} exists
// if it does, read it to a string and return
// if it doesn't, return undefined
function readExample(language, slug, extension) {
  try {
    return readFileSync(`../command-code-examples/${language}/${slug}.${extension}`).toString();
  }
  catch(err) {
    return undefined;
  }
}