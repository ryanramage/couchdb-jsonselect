


exports.all_docs = {
    map: function(doc) {
        emit(doc._id, null);
    }
};


exports.languages_spoken = {
    map : function(doc) {
        var jsonselect = require('views/lib/jsonselect');
        jsonselect.forEach('.languagesSpoken .lang', doc, function(lang){
            emit(lang, null);
        });
    }
}
