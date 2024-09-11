
const {ormdb}=require('../../../configuration/db');


exports.getAllData= (req, res) => {
  console.log("this si reports air export");

  
        query = "SELECT * FROM `air_export_ff` WHERE STR_TO_DATE(`MAWB_DATE`, '%d-%m-%Y') BETWEEN '2024-07-01' AND '2024-07-14';";
   
 ormdb.query(query,  (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.json(result);
        }
    });
};

