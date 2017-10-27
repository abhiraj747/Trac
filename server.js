var express = require('express');
var app = express();


var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));


app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
	var resultQuery = client.search(client.query().q(req.body.issueSearchQuery),function (err, result) {// Search documents using strQuery 
	console.log('Inside Search ++++:', result.response);
    res.send(JSON.stringify(result.response));
   });
   
});

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

});

var SolrNode = require('solr-node');
 
// Create client 
var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'films_shard1_replica_n2',
    protocol: 'http'
});
 
// Set Debug Level 
var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'films_shard1_replica_n2',
    protocol: 'http',
    debugLevel: 'ERROR' // log4js debug level paramter 
});

 


 