const http = require('http');
const path = require('path');
const child_process = require('child_process');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

const serve = serveStatic('./cruzr-data');

const getGitCommitHash = () => {
  // Get commit hash
  const output = child_process.execSync('git rev-parse HEAD', {
    cwd: path.resolve(__dirname, 'cruzr-data'), // Run Git pull in the project root
  });
  const commitHash = output.toString().trim();
  return commitHash;
};

const server = http.createServer((req, res) => {
  if (req.url === 'webhook' && req.method === 'POST') {
    // Handle webhook payload
    const payload = req.body;
    console.log('Received webhook payload:', payload);

    // Spawn Git pull in a child process
    child_process
      .spawn('git', ['pull'], {
        stdio: 'inherit', // Inherit parent's stdio for output visibility
        cwd: path.resolve(__dirname, 'cruzr-data'), // Run Git pull in the project root
      })
      .on('exit', code => {
        console.log('Git pull completed with code:', code);
        res.end('Webhook handled successfully');
      });
    return;
  }

  if (req.url === 'webhook' && req.method === 'GET') {
    const hash = getGitCommitHash();
    res.end(`Current commit hash: ${hash}`);
    return;
  }
  const done = finalhandler(req, res);
  serve(req, res, done);
});

server.listen(3003, () => {
  console.log('Server listening on port 3003');
});
