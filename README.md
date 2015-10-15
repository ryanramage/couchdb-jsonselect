JSONSelect For CouchDB
=====================

CSS-like selectors for JSON, which can be used over couch views.

 - It makes it easy to access data in complex JSON documents.
 - It feels like CSS.


See [jsonselect](http://jsonselect.org/) docs for more details on the query

Install
-------

    npm i couchdb-jsonselect -g

Add jsonselect to a couchdb database
------------------------------------

    couchdb-jsonselect http://localhost:5984/databasename


jsonselect from a view
-----------------------

Assume you have a view named ddoc/myview. To select only the .languagesSpoken from each doc, use the following url

    http://localhost:5984/databasename/_design/jsonselect/_list/select/ddoc/myview?include_docs=true&select=.languagesSpoken

You can use all the [query parameters](http://docs.couchdb.org/en/stable/api/ddoc/views.html#get--db-_design-ddoc-_view-view) for the view, eg

    http://localhost:5984/databasename/_design/jsonselect/_list/select/ddoc/myview?include_docs=true&select=.languagesSpoken&start_key="a"&end_key="b"



Retrieve Only Part Of A Doc
---------------------------

Lets say you have a doc with id `abc3092390`. To retrieve part of a doc, such as the .languagesSpoken property, use the following url

    http://localhost:5984/databasename/_design/jsonselect/_show/select/abc3092390?select=.languagesSpoken






ldjson
-------

We can also return ldjson from a view by adding the query parameter `?ldjson=true` eg

    http://localhost:5984/databasename/_design/jsonselect/_list/select/ddoc/myview?include_docs=true&select=.languagesSpoken&ldjson=true
