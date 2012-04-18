var jsonselect = require('views/lib/jsonselect');


exports.show = function(doc, req) {

    if (!doc) return;
    if (!req.query.select) return;
    var result =  jsonselect.match(req.query.select, doc);

    return {
        code: 200,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(result)
    };

}




exports.list = function(head, req) {

    var realJson = true;
    if (req.query.streamJson) {
        realJson = false;
    }
    var include_docs = false;
    if (req.query.include_docs) {
        include_docs = true;
    }

    start({'headers' : {'Content-Type' : 'application/json'}});
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
    send(pre + JSON.stringify(row) + '\n');
    return true;
}
