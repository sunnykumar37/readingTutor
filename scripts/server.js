const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'generate-avatars.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading avatar generator');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    }
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Avatar generator running at http://localhost:${PORT}`);
}); 