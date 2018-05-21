mongoexport --port 27017 --username iact_rocs --password "I@ct_r0cs" --db rocsDB --collection Learner --type=csv --out learners.csv --fields "nrc, school_emis, district, zone"

mongoexport --port 27017 --username iact_rocs --password "I@ct_r0cs" --db rocsDB --collection Learner --out learners.json

mongoexport --port 27017 --username "iact_rocs" --password "I@ct_r0cs" --db "rocsDB" --collection Learner --out learners.json

mongoexport --db rocsDB --collection learner --out traffic.csv

db.Traffic.find({"time_stamp" : {"$lt": new Date("2018-03-07T00:00:00.000Z")} }).pretty().sort({"time_stamp": -1})

