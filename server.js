var express = require('express');
var app = express();

var moment = require('moment');

var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
	var searchString = req.body.issueSearchQuery;
	console.log('searchString  :', searchString);
	 if(searchString == '' || searchString === undefined){
		 searchString="*:*";
	 }
	
	var resultQuery = client.search(client.query().q(searchString),function (err, result) {
	if(err)
	{
		res.render('error', {  err : err })
	}
	else{
	// Search documents using strQuery 
	var responseObj = JSON.parse(JSON.stringify(result.response));
	console.log('JSON pARSE ++++:', responseObj);
	var docs = responseObj.docs;
    //res.send(JSON.stringify(result.response));
	res.render('result', {  docs: docs , moment: moment})
	}
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
    core: 'accurev',
    protocol: 'http'
});
 
// Set Debug Level 
var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'accurev',
    protocol: 'http',
    debugLevel: 'ERROR' // log4js debug level paramter 
});

 


 