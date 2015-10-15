#!/usr/bin/env node

var exec = require('child_process').exec
var url = require('url')


var db_url = process.argv[2]
if (!db_url) return usage()

// push the couchapp we need to couchdb

var cmd = './node_modules/.bin/couchapp push app.js ' + db_url
exec(cmd, function(err, stdout){
	if (err) return console.log(err)
  console.log(stdout.toString());
})

function usage() {
	console.log('usage example: ')
	console.log('   couchdb-jsonselect http://localhost:5984/database')
}