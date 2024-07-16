// Create web server
// 1. Import required modules
// 2. Create server
// 3. Start server
// 4. Listen on port
// 5. Handle requests
// 6. Read the file
// 7. Write the response

// 1. Import required modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

// 2. Create server
// http.createServer(callback(request, response))
http.createServer(function (request, response) {
    // 5. Handle requests
    // Parse the request containing file name
    var pathname = url.parse(request.url).pathname;

    // Print the name of the file for which request is made
    console.log('Request for ' + pathname + ' received.');

    // 6. Read the file
    // Read the requested file content from file system
    fs.readFile(pathname.substr(1), function (error, data) {
        if (error) {
            console.log(error);
            // HTTP Status: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            // Page found
            // HTTP Status: 200 : OK
            // Content Type: text/plain
            response.writeHead(200, { 'Content-Type': 'text/html' });

            // Write the content of the file to response body
            response.write(data.toString());
        }

        // Send the response body
        response.end();
    });
}).listen(8081);

// Print URL for accessing server
console.log('Server running at http://