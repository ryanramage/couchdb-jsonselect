JSONSelect For Kanso
=====================

CSS-like selectors for JSON, which can be used in couch views, and provided show and list functions.

 - It makes it easy to access data in complex JSON documents.
 - It feels like CSS.

http://jsonselect.org/


Add To Kanso
------------

    "dependencies": {
        "jsonselect" : null
    }


Use in a view
-------------

    exports.languages_spoken = {
        map : function(doc) {
            var jsonselect = require('views/lib/jsonselect');
            jsonselect.forEach('.languagesSpoken .lang', doc, function(lang){
                emit(lang, null);
            });
        }
    }

As you can see it makes it easier and more clear to get and iterate over parts of a complex document.


Retrieve Only Part Of A Doc
---------------------------

One nice thing you can do, is retreive just part of a doc using the show function provided.

Assume you have a document named ```mydoc``` , and jsonselect has been added to the design doc ```_design/app```.
To get all the ```.languagesSpoken``` properties on that doc, use the following url

    http://localhost:5984/db/_design/app/_show/json_select/mydoc?select=.languagesSpoken




Retrieve Only Part Of A Doc In A View
-------------------------------------

One nice thing you can do, is retreive just part of a doc retrieved in a view using the list function provided.

Assume you have a view named ```myview``` and jsonselect has been added to the design doc ```_design/app```.
To get all the ```.languagesSpoken``` on that view, use the following url

    http://localhost:5984/db/_design/app/_list/json_select/myview?include_docs=true&select=.languagesSpoken

Return an array of all docs that contain the model field, with the value of that field.

       [
       {"id":"1","key":"1","value":["English"]}
       ,{"id":"2","key":"2","value":["Spanish"]}
       ]

The include_docs is used for the view to return the doc to the list. The full doc is not actually returned, only the portion selected.









