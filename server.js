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
	
	 if(searchString == '' || searchString === undefined){
		 searchString="*:*";
	 }
	console.log('searchString  :', searchString);
	var resultQuery = client.search(client.query().q(searchString).rows(2147483647),function (err, result) {
	if(err)
	{
		res.render('error', {  err : err })
	}
	else{
	// Search documents using strQuery 
	
	var docArray = result.response;
	//console.log('result. pARSE +++++++++++++++++++:', docArray.docs);
    var fields = ['issueNum', 'dateUpdatedSec', 'state', 'substate','productType', 'type', 'severity','priority','assignedToIdNumber','assignedToUserName','submittedByIdNumber','dateSubmittedSec','datePromotedSec','dateReadyToVerifySec','dateRejectedSec','dateClosedSec','subsystem','comp','shortDescription','symptons','Answer','phsfnd','phaseinject','phase_escaped','cust','age','level','owningteam','sevjust','codechanges','releases','fixlvl','trgtstrm','certbyUserName','isClone','ExtDefectNum','defectvalUserName','defectresUserName','submittedByDisp','time_chrg_hist.userIdNumber','time_chrg_hist.userId','time_chrg_hist.timeHr','time_chrg_hist.chargeType','issue_assign_hist.userIdNumber','issue_assign_hist.userId','issue_assign_hist.userName','issue_assign_hist.noOfAssignments','issue_assign_hist.timeHr']
	//, unwindPath:['time_chrg_hist.userId','time_chrg_hist.timeHr','time_chrg_hist.chargeType']
	var csv = json2csv({ data: docArray.docs, fields: fields });
	res.attachment('accurev_data.csv');
	res.status(200).send(csv);
	
	}
   });
   
});

app.post('/process_post', urlencodedParser, function (req, res) {
	var searchString = req.body.issueSearchQuery;
	var project = req.body.Project;
	
	var searchQuery = 'productType:'+project
	 if(!searchString == '' || !searchString === undefined){
		 searchQuery=searchQuery+' AND ' +searchString;
	 }
	 console.log('searchQuery  :', searchQuery);
	var resultQuery = client.search(client.query().q(searchQuery).rows(2147483647),function (err, result) {
	if(err)
	{
		res.render('error', {  err : err })
	}
	else{
	// Search documents using strQuery 
	
	var docArray = result.response;
	//console.log('result. pARSE +++++++++++++++++++:', docArray.docs);
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


 



 