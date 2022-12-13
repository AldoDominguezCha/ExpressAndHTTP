/* The http module is a default native NodeJS module, 
not an npm package we need to install, we just have to include it,
the fs (file system) module is also native, we just need to include
it as well
*/

const http = require('http');

/* fs gives node access to this computer's file system */

const fs = require('fs');

/* The http module has a createServer method, 
it takes a callback function as its argument, 
the callback itself takes arguments: req and res
*/

const server = http.createServer((req, res) => {
    
    /*Inside the request object we have a url property,
    it contains the path relative to the root domain
    */
    
    console.log(req.url);

    if (req.url === '/') {

        /* The res object is our way of responding to the requester
        An HTTP message is composed by:
          1. Start line
          2. Header
          3. Body
        
        The writeHead method for the res object takes two arguments:
          1. Status code
          2. Object for the mime-type
        This method will write the header of the response http message,
        which contains the status of the response and the mime-type
        */

        res.writeHead(200, { 'content-type':'text/html' });

        /* Now we user the write method to write the body,
        with this we have set the headers and body of the response,
        we didn't have to do the same for the start line in the message,
        the http module and node handle that for us
        */

        const homePageHTML = fs.readFileSync('node.html');
        res.write(homePageHTML);
        /* Finally we state that we are ready to reply and close the connection */

        res.end();

    } 
    
    else if (req.url === '/node_logo.png') {

        res.writeHead(200, { 'content-type':'image/png' });
        const nodeLogo = fs.readFileSync('node_logo.png');
        res.write(nodeLogo);
        res.end();
        
    }
    
    else if (req.url === '/styles.css') {

        res.writeHead(200, { 'content-type':'text/css' });
        const cssContent = fs.readFileSync('styles.css');
        res.write(cssContent);
        res.end();
        
    } else {

        res.writeHead(404, { 'content-type':'text/html' });
        res.write('<h4>Error - Page not found</h4>');
        res.end();
    }
    
    
});

/* Create server returns an object with a listen method,
it takes one argument, the port in which it will listen
for http traffic
*/

server.listen(3000);