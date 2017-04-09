// Copyright IBM Corp. 2017. All Rights Reserved.
// Licensed under "The MIT License (MIT)"

var express = require('express')
var app = express()
var PORT = process.env.PORT || 3000

var array = {};
app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.get('/:email/:userId',function (req, res) {
	array[req.params.email] = req.params.userId;
  res.setHeader('content-type', 'application/json');
	res.send({
    status : "success"
  });
})

app.get('/:email',function (req, res) {
  res.setHeader('content-type', 'application/json');
	if (array[req.params.email] != undefined) {

		var userid  = {
			userid : array[req.params.email]
		}
		res.send(userid);
	}
	else
	{
		res.status(404);
		res.send({
			error : "No registered user - "+req.params.email
		});
	}
})

app.listen(PORT, function () {
  console.log('Example app listening on port '+PORT)
})
