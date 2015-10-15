JSONSelect For CouchDB
=====================

CSS-like selectors for JSON, which can be used over couch views or one doc

 - It makes it easy to access data in complex JSON documents.
 - It feels like CSS.


See [jsonselect](http://jsonselect.org/) docs for more details on the query

Install
-------

    npm i couchdb-jsonselect -g

Add jsonselect to a couchdb database
------------------------------------

    couchdb-jsonselect http://localhost:5984/databasename



Retrieve Only Part Of A Doc
---------------------------

Lets say you have a doc with id `abc3092390`. To retrieve part of a doc, such as the .languagesSpoken property, use the following url

    http://localhost:5984/databasename/_design/jsonselect/_show/select/abc3092390?select=.languagesSpoken




Retrieve Only Part Of A Doc From A View
-------------------------------------


Assume you have a view named ddoc/myview 
To get all the .languagesSpoken on that view, use the following url

    http://localhost:5984/databasename/_design/jsonselect/_list/select/ddoc/myview?include_docs=true&select=.languagesSpoken

Return an array of all docs that contain the model field, with the value of that field.

       [
       {"id":"1","key":"1","value":["English"]}
       ,{"id":"2","key":"2","value":["Spanish"]}
       ]

The include_docs is used for the view to return the doc to the list. The full doc is not actually returned, only the portion selected.


ldjson
-------

We can also return from a view ldjson by adding the query parameter `?ldjson=true` eg

    http://localhost:5984/databasename/_design/jsonselect/_list/select/ddoc/myview?include_docs=true&select=.languagesSpoken&ldjson=true
