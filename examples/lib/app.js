var jsonselect_helpers = require('jsonselect-helpers');


var  shows = {
    select : jsonselect_helpers.show
}

var lists = {
    select : jsonselect_helpers.list
}

module.exports = {
    lists: lists,
    views: require('./views'),
    shows : shows

};

