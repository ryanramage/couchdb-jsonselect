function(doc, req) {
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