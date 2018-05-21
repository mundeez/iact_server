var zoneController = function (Zone) {

    var post = function (req, res) {
        var zone = new Zone(req.body);
        
        if (!req.body) {
            res.status(400);
            res.send('Data is required');
        }
        else {
            zone.save(function (err) {

            });
        }
    }

    var get = function (req, res) {
        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Zone.find(query, function (err, zones) {

            if (err)
                res.status(500).send(err);
            else {

                var returnZones = [];
                zones.forEach(function (element, index, array) {
                    var newZone = element.toJSON();
                    newZone.links = {};
                    newZone.links.self = 'http://' + req.headers.host + '/api/zones/' + newZone._id
                    returnZones.push(newZone);
                });
                res.json(returnZones);
            }
        });
    }

    return {
        post: post,
        get: get
    }
}

module.exports = zoneController;