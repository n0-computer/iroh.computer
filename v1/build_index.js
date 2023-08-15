// const { readdir, readdirSync, writeFileSync } = require('fs').promises;
const toml = require('toml');
const fs = require('fs');

// const file = fs.readFileSync('./content/docs/cloud/quickstart-gateway.md');
// const fm = file.toString().split("+++")[1]
// // console.log(fm);
// const d = toml.parse(fm);
// console.log(JSON.stringify(d));

const getFileList = async (dirName) => {
    let files = [];
    const items = fs.readdirSync(dirName, { withFileTypes: true });

    for (const item of items) {
        if (item.isDirectory()) {
            files = [
                ...files,
                ...(await getFileList(`${dirName}/${item.name}`)),
            ];
        } else {
            files.push(`${dirName}/${item.name}`);
        }
    }
    return files;
};

function fileURL (filepath) {
  return filepath
    .replace(/^(content)/, "")
    .replace(/.md$/, "")
    .replace(/_index/, "")
}

getFileList('content').then((files) => {
    console.log(files);

    const records = files
      .filter((path) => path.endsWith('.md'))
      .reduce((acc, el, i) => {
        const file = fs.readFileSync(el);
        const fm = file.toString().split("+++")[1]
        const d = toml.parse(fm);
        d.url = fileURL(el)
        acc.push(d)
        return acc
      }, []);
    // console.log(JSON.stringify(records));
    console.log('writing file to records.json');
    fs.writeFileSync('records.json',JSON.stringify(records));
    console.log('done');
});