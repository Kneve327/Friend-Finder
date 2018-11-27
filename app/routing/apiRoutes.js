var employeesArray = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(employeesArray);
    })

    app.post("/api/friends", function (req, res) {

        console.log(req.body);

        var user = req.body;
        var userScores = user.scores;
        var bestFriend = employeesArray[0];
        var bestScore = 100;
        var compare = 0;

        for (var i in employeesArray) {
            for (var j = 0; j < 10; j++) {
                compare += Math.abs(parseInt(employeesArray[i].scores[j]) - parseInt(userScores[j]));
            }
            if ((bestScore > compare) && (user.name != employeesArray[i].name)) {
                bestFriend = employeesArray[i];
                bestScore = compare;
            }
            compare = 0;
        }
        var findMatch = true;
        for (var i = 0; i < employeesArray.length; i++) {
            if (user.name == employeesArray[i].name) {
                findMatch = false;
            }
        }
        if (findMatch) {
            employeesArray.push(req.body);
        }
        res.json(bestFriend);

    })


}