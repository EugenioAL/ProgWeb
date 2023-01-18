const http = require('http');

const server = http.createServer(function(req,res){

    const testFolder = '..';
    const fs = require('fs');

    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            res.write(file + ("\n"));
        });
        res.end();
    });

});

server.listen(3000);