const { spawn } = require('child_process')

const zola = spawn('zola', ['serve'], { stdio: ['ignore', 'inherit', 'inherit'] });
zola.on("close", (exit_code) => { console.log("zola done"); })
zola.on('error', (err) => { console.log(`zola error:${err}`) })

const parcel = spawn('npm', ['run', 'parcel'], { stdio: ['ignore', 'inherit', 'inherit'] });
parcel.on("close", (exit_code) => { console.log("parcel done"); })
parcel.on('error', (err) => { console.log(`parcel error:${err}`) })

process.on('SIGINT', function() {
  console.log("Received SIGINT. Stopping.");
  parcel.kill();
  zola.kill();
  process.exit();
});
