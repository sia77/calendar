var http = require('http');

http.createServer(function(req, res){
	res.writeHead(200, {'Access-Control-Allow-Origin': null, 
						'Content-Type' : 'application/json'});

	
	res.end(generateJason());

}).listen(8080);


function generateJason(){
	var json = JSON.stringify({time : Date.now()});
	return json;
}