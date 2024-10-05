const { json } = require('express');
const { ormdb, leavemanagement } = require('../../../configuration/db');



exports.external=(req, res) => {
    const { userId, password } = req.body; // Extract userId and password from request body
    console.log('Received POST data:', userId, password);
  
    // Redirect to the React app with userId and password in the query string
    res.redirect(`http://localhost:3000/login?userId=${userId}&password=${encodeURIComponent(password)}`);
  };

exports.getAllData = (req, res) => {
    console.log("Processing user login mdnsf dj sfgherj g");
    console.log(req.body);

    // SQL query to validate user credentials
    const query = "SELECT u.full_name,u.email,u.emp_id,u.reporting_branch_lta, bm.branch_name,bm.branch_code,bm.branch_type_code FROM `user` u JOIN `branchmaster` bm ON u.branch_id = bm.branch_id WHERE u.`emp_id` = ? AND u.`password` =  ? ";
    
    leavemanagement.query(query, [req.body.userid, req.body.password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while fetching data");
        }
        
        if (result.length === 0) {
            return res.json("No data found");
        }

        
        const user = result[0]; // Assuming the user details are in the first row
        const userId = user.emp_id;

        // Query to check user's access in ormdb
        const accessQuery = "SELECT access_config FROM `user_access` WHERE `user_id` = ?";
        
        ormdb.query(accessQuery, [req.body.userid], (accessErr, accessResult) => {
            if (accessErr) {
                console.error(accessErr);
                if (!res.headersSent) {
                    return res.status(500).send("An error occurred while checking user access");
                }
            }
            if (accessResult.length === 0) {
                // No access data found for the user
                return res.json({
                    userDetails: user,
                    userAccess: "No access found for user"
                });
            }
 


            // User has access, return the user details and access information
            const userAccess = accessResult[0]; // Assuming access details are in the first row

            console.log("use ",user);
            console.log("access ",userAccess);
            if (!res.headersSent) {
                return res.json({
                    userDetails: user,
                    userAccess: userAccess
                });
            }
        });
    });
};


exports.getAccess= (req, res) => {
    console.log("Processing get access");
    console.log(req.body);

    // SQL query to validate user credentials
    const query = "SELECT u.full_name,u.email,u.emp_id,u.reporting_branch_lta, bm.branch_name,bm.branch_code,bm.branch_type_code FROM `user` u JOIN `branchmaster` bm ON u.branch_id = bm.branch_id WHERE u.`emp_id` = ?  ";
    
    leavemanagement.query(query, [req.body.userid], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while fetching data");
        }
        
        if (result.length === 0) {
            return res.json("No data found");
        }

        
        const user = result[0]; // Assuming the user details are in the first row
        const userId = user.emp_id;

        // Query to check user's access in ormdb
        const accessQuery = "SELECT access_config FROM `user_access` WHERE `user_id` = ?";
        
        ormdb.query(accessQuery, [req.body.userid], (accessErr, accessResult) => {
            if (accessErr) {
                console.error(accessErr);
                if (!res.headersSent) {
                    return res.status(500).send("An error occurred while checking user access");
                }
            }

            if (accessResult.length === 0) {
                if (!res.headersSent) {
                    return res.json("No access found for user");
                }
            }

            // User has access, return the user details and access information
            const userAccess = accessResult[0]; // Assuming access details are in the first row

            console.log("use ",user);
            console.log("access ",userAccess);
            if (!res.headersSent) {
                return res.json({
                    userDetails: user,
                    userAccess: userAccess||{}
                });
            }
        });
    });
};

exports.updateData = (req, res) => {
    const userId = req.body.userId;
    const accessConfig = req.body.accessData; // assuming you're sending access config in the request body

    // Convert accessConfig to JSON string
   // const accessConfigJson = JSON.stringify(accessConfig);

    console.log('Received request body:', req.body);

    // SQL query to check if the user's access already exists
    const checkQuery = "SELECT * FROM `user_access` WHERE `user_id` = ?";

    ormdb.query(checkQuery, userId, (err, result) => {
        if (err) {
            console.error('Error checking user access:', err);
            return res.status(500).send("An error occurred while checking user access");
        }
        
        console.log('Check query result:', result);

        // If access exists, update it
        if (result.length > 0) {
            const updateQuery = "UPDATE `user_access` SET `access_config` = ? WHERE `user_id` = ?";

            ormdb.query(updateQuery, [accessConfig, userId], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating user access:', updateErr);
                    return res.status(500).send("An error occurred while updating user access");
                }
                console.log('User access updated successfully');
                return res.json({ message: "User access updated successfully" });
            });
        } else {
            // If access doesn't exist, insert a new row
            const insertQuery = "INSERT INTO `user_access` (`user_id`, `access_config`, `User_Created_By`) VALUES (?, ?, ?)";

            ormdb.query(insertQuery, [userId, accessConfig, req.body.empid], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error('Error inserting user access:', insertErr);
                    return res.status(500).send("An error occurred while inserting user access");
                }
                console.log('User access added successfully');
                return res.json({ message: "User access added successfully" });
            });
        }
    });
};


exports.subranch = (req, res) => {
    console.log("Get Sub branch ");
    console.log(req.body);
 
    let query;
    let queryParams = [];
 
    // Check if reportingBranch is 1
    if (req.body.reportingBranch === '1') {
        // Fetch all data when reportingBranch is 1
        query = "SELECT * FROM `branchmaster`";
    } else {
        // Fetch data for the specific reportingBranch
        query = "SELECT * FROM `branchmaster` WHERE `reporting_branch_lta` = ?";
        queryParams = [req.body.reportingBranch];
    }
 
    leavemanagement.query(query, queryParams, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while fetching data");
        }
 
        console.log(result);
        if (result.length === 0) {
            return res.json("No data found");
        }
 
        res.json(result);
    });
};