var express = require('express');
var app = express();

var moment = require('moment');

var json2csv = require('json2csv');

var bodyParser = require('body-parser');
var fs = require('fs');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/download', urlencodedParser, function (req, res) {
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
	
	
	var docArray = result.response;
	console.log('result. pARSE +++++++++++++++++++:', docArray.docs);
    var fields = ['issueNum', 'dateUpdatedSec', 'state', 'productType', 'type', 'severity','priority','assignedToUserName','dateSubmittedSec','age','releases','time_chrg_hist.userIdNumber','time_chrg_hist.userId','time_chrg_hist.timeHr','time_chrg_hist.chargeType','issue_assign_hist.userIdNumber','issue_assign_hist.userName','issue_assign_hist.noOfAssignments','issue_assign_hist.timeHr']
	
	var csv = json2csv({ data: docArray.docs, fields: fields });
	res.attachment('accurev_data.csv');
res.status(200).send(csv);
	
	}
   });
   
});

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
	
	
	var docArray = result.response;
	//console.log('docs ' , docs);
    //res.send(JSON.stringify(result.response));
	console.log('result. pARSE +++++++++++++++++++:', docArray.docs);
	/*for (var x in docArray.docs)
	{
		console.log('inside for loop' , docArray.docs[x]["issue_assign_hist.userName"]);
	}*/
	res.render('result', {  docs: docArray.docs , moment: moment});
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
    core: 'Accurev',
    protocol: 'http'
});
 
// Set Debug Level 
var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'Accurev',
    protocol: 'http',
    debugLevel: 'ERROR' // log4js debug level paramter 
});


 



 