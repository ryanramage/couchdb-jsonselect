var fs = require('fs')
var jsonselect = fs.readFileSync('./node_modules/JSONSelect/src/jsonselect.js').toString()

var ddoc = {
  _id: '_design/jsonselect',
  views: {},
  lists: {},
  shows: {}
}

ddoc.views.lib = {
  jsonselect: jsonselect
}

ddoc.shows.select = function(doc, req) {
  var error = {
  	code : 400
  }

  if (!doc) return {
    code : 404,
    body: "Please provide a doc to the show function"
  }
  if (!req.query.select) return {
    code : 500,
    body: "a querystring select was not provided"
  }
  var jsonselect = require('views/lib/jsonselect');
  var result =  jsonselect.match(req.query.select, doc);

  return {
    code: 200,
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(result)
  };
}


ddoc.lists.select = function(head, req) {

    var realJson = true;
    if (req.query.ldjson) {
        realJson = false;
    }
    var include_docs = false;
    if (req.query.include_docs) {
        include_docs = true;
    }

    var jsonselect = require('views/lib/jsonselect');

    function handleRow(row, select, include_docs, sent_count, realJson) {
        if (select) return handleSelectRow(row, select, include_docs, sent_count, realJson);
        else return wrapSend(row, sent_count, realJson);
    }


    function handleSelectRow(row, select, include_docs, sent_count, realJson) {
        try {
            var doc = row.value;
            if (include_docs) doc = row.doc;
            var result =  jsonselect.match(select, doc);
            if (result && result.length > 0) {
                var emitRow = {
                    id : row.id,
                    key : row.key,
                    value : result
                };
                return wrapSend(emitRow, sent_count, realJson);
            }
        } catch(ignore){}
        return false;
    }


    function wrapSend(row, sent_count, realJson) {
        var pre = '';
        if (sent_count > 0 && realJson) pre = ',';
        send(pre + JSON.stringify(row) + '\r\n');
        return true;
    }

    if (realJson) start({'headers' : {'Content-Type' : 'application/json'}});
    else start({'headers' : {'Content-Type' : 'application/json; boundary=NL'}});
    if (realJson) send('[\n');
    var count = 0;
    var row;
    while ((row = getRow())) {
        if (handleRow(row, req.query.select, include_docs, count, realJson)) {
            count++;
        }
    }
    if (realJson) send(']');

}

module.exports = ddoc