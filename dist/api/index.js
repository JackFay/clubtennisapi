'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _facets = require('./facets');

var _facets2 = _interopRequireDefault(_facets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    // mount the facets resource
    api.use('/facets', (0, _facets2.default)({ config: config, db: db }));

    // perhaps expose some API metadata at the root
    api.get('/', function (req, res) {
        res.json({ version: _package.version });
    });

    api.get('/events', function (req, res) {
        var getEventsQuery = "SELECT * FROM events";

        db.query(getEventsQuery, function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(rows);
            }
        });
    });

    api.post('/events', function (req, res) {
        console.log(req.body);
        var events = req.body;
        var postEventsQuery = "INSERT INTO events SET ?";

        db.query(postEventsQuery, req.body, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(result);
                res.send("successfully added event(s)");
            }
        });
    });

    return api;
};
//# sourceMappingURL=index.js.map