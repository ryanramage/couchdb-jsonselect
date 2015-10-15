#!/usr/bin/env node
var path = require('path')
var exec = require('child_process').exec
var url = require('url')


var db_url = process.argv[2]
if (!db_url) return usage()

// push the couchapp we need to couchdb

var couchapp_path = path.resolve(__dirname, './node_modules/.bin/couchapp')
var app_path = path.resolve(__dirname, './app.js')

var cmd = couchapp_path + ' push ' + app_path + ' ' + db_url
exec(cmd, function(err, stdout){
	if (err) return console.log(err)
  console.log(stdout.toString());
})

function usage() {
	console.log('usage example: ')
	console.log('   couchdb-jsonselect http://localhost:5984/database')
}