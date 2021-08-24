const userModel = require('../models//user_model');
const bcryptjs = require('bcryptjs');

module.exports = {


    userLogin: (req, res) => {
        console.log('calling')
        const { userEmail, userPassword } = req.body;
        userModel
            .findOne({ userEmail })
            .then((userData) => {
                if (!userData) {
                    res.status(400).json({ msg: "User Does not Exists !" });
                } else {
                    bcryptjs
                        .compare(userPassword, userData.userPassword)
                        .then((isMatch) => {
                            if (!isMatch) {
                                res.status(400).json({ msg: "Enter correct password." });
                            } else {
                                res.status(200).json({data:userData,msg:"Login Success."});
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({ msg: "An error has occurred" });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    userRegistration: (req, res) => {
        let { userEmail, userPassword, userName } = req.body;
        userModel
            .findOne({ userEmail })
            .then((restData) => {
                if (restData) {
                    res.status(400).json({ msg: "This Email is Already Taken !" });
                } else {
                    bcryptjs.genSalt(10, (err, salt) => {
                        bcryptjs.hash(userPassword, salt, (err, hash) => {
                            if (err) {
                                throw err;
                            } else {
                                //  console.log(req.body.userEmail);
                                userPassword = hash;
                                const userInfo = new userModel({
                                    userEmail: userEmail,
                                    userPassword: userPassword,
                                    userName: userName
                                });
                                userInfo
                                    .save()
                                    .then((data) => {
                                        res.status(200).json({
                                            data: data,
                                            msg: "Registration success",
                                        });
                                       /* client.send(new rqs.SetUserValues(data._id, 
                                            {
                                                'userEmail':userEmail,
                                                'userName':userName,
                                                "!cascadeCreate": true
                                              },
                                        ), (error,recommbeeData)=>{
                                            console.log(error);
                                            
                                          });
                                          */
                                      
                                       
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        res.status(400).json({ msg: "Error" });
                                    });
                            }
                        });
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ msg: "An error has occurred" });
            });
    }

}