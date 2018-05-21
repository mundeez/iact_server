const userDefaultFiltersController = function (UserDefaults) {

    const post = function (req, res) {
        const userDefaults = new UserDefaults(req.body);
        
        if (!req.body) {
            res.status(400);
            res.send('Data is required');
        }
        else {
            UserDefaults.save(function (err) {

            });
        }
    }

    const get = function (req, res) {
        const query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        UserDefaults.find(query, function (err, userDefaults) {

            if (err)
                res.status(500).send(err);
            else {

                const returnUserDefaults = [];
                districts.forEach(function (element, index, array) {
                    const newDistrict = element.toJSON();
                    newDistrict.links = {};
                    newDistrict.links.self = 'http://' + req.headers.host + '/api/districts/' + newDistrict._id
                    returnDistricts.push(newDistrict);
                });
                res.json(returnDistricts);
            }
        });
    }

    return {
        post: post,
        get: get
    }
}

module.exports = userDefaultFiltersController;