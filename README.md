JSONSelect For Kanso
=====================

CSS-like selectors for JSON, which can be used in couch views, lists, and shows.

 - It makes it easy to access data in complex JSON documents.
 - It feels like CSS.

http://jsonselect.org/

See the examples folder for a working app of the examples below.

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


Use in a list
-------------

There is a list function that comes in the jsonselect-helpers module that lets you query your views with jsonselect.
Here is how to use it.

In your design doc:

    var jsonselect_helpers = require('jsonselect-helpers');

    var lists = {
        select : jsonselect_helpers.list
    }

And your query will look like this:

    http://localhost:5984/example/_design/jsonselect-example/_list/select/all_docs?include_docs=true&select=.model

Return an array of all docs that contain the model field, with the value of that field.

   [
   {"id":"1","key":"1","value":["E350"]}
   ,{"id":"2","key":"2","value":["Venture \"Extended Edition\""]}
   ]

The include_docs is used for the view to return the doc to the list. The full doc is not actually returned, only the portion selected.









