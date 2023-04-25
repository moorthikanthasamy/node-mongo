import { createServer } from "node:http"

const server = createServer(function (req, res) {
   if (req.method === 'POST' && req.url === '/create') {
      let body = '';
      req.on('data', chunk => {
         body += chunk.toString();
      });
      req.on('end', () => {
         console.log(`Received data: ${body}`);
         res.writeHead(200, { 'Content-Type': 'text/plain' });
         res.end('Data received');
      });
   } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
   }

   // Business Logic
   res.end('Hello world!');
})
server.listen(3000, () => console.log('Server is started'))