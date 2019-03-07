'use strict'
var Authentication = require('../models/authentication.model');
var Believer = require('../models/believer.model');
var Admin = require('../models/admin.model');
module.exports = {
    getAllAuthentication: function(req, res) {
        Authentication.find({}, function(error, authentication) {
            if (error) { res.status(500).json({ success: false, message: error.message }); return; };
            if (authentication.length == 0) { res.status(404).json({ success: false, message: "Authentication Collection is Empty" }).end(); return; };
            if (authentication.length != 0) { res.status(200).json(authentication).end(); return; };
        });
    },
    authenticateUser: function(req, res) {
        var authenticatedata = req.swagger.params.authenticatedata.value;
        Authentication.find({ "username": authenticatedata.username, "password": authenticatedata.password }, function(error, authentication) {
            if (error) { res.status(500).json({ success: false, message: error.message }); return; };
            if (authentication.length == 0) { res.status(404).json({ success: false, message: "Wrong username or Password" }).end(); return; };
            if (authentication.length != 0 && authentication[0].title == 'believer') {
                Believer.find({ "believercode": authentication[0].username }, function(error, user) {
                    if (error) { res.status(500).json({ success: false, message: error.message }); return; };
                    if (user.length == 0) { res.status(404).json({ success: false, message: "Wrong username or Password" }).end(); return; };
                    if (user.length != 0) { res.status(200).json(user[0]); return; };
                });
            };
            if (authentication.length != 0 && (authentication[0].title == 'superAdmin' || authentication[0].title == 'dioAdmin' || authentication[0].title == 'Admin' || authentication[0].title == 'communityAdmin')) {
                Admin.find({ "admincode": authentication[0].username }, function(error, admin) {
                    if (error) { res.status(500).json({ success: false, message: error.message }); return; };
                    if (admin.length == 0) { res.status(404).json({ success: false, message: "Wrong username or Password" }).end(); return; };
                    if (admin.length != 0) { res.status(200).json(admin[0]); return; };
                });
            }
        });
    },
    checkCode: function(req, res) {
        var userdata = req.swagger.params.usercode.value;
        Authentication.find({ "username": userdata.username }, function(error, userexist) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (userexist.length == 0) { res.status(404).json({ success: false, message: "usercode Doesn't Exist" }).end(); return; };
            if (userexist.length != 0) { res.status(200).json({ success: true, message: "usercode Exist" }).end(); return; };
        });
    },
    updatePassword: function(req, res) {
        var profiledata = req.swagger.params.profiledata.value;
        Authentication.update({ "username": profiledata.username, "password": profiledata.password }, { $set: { "password": profiledata.newpassword } },
            function(error, result) {
                if (error) { res.status(500).json({ success: false, message: error.message }).end(); return; }
                if (result.nModified == 0) { res.status(404).json({ success: false, message: "Invalid  Details" }).end(); return; }
                if (result.nModified != 0) { res.status(200).json({ success: true, message: "Password Changed Successfully" }).end(); return; }
            });
    },
    updateSingleAuthentication: function(req, res) {
        Authentication.findByIdAndUpdate(req.swagger.params.authenticationid.value, req.swagger.params.authentication.value, { new: true }, function(error, updatedauthentication) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (updatedauthentication == null) { res.status(404).json({ success: false, message: "Authentication to be Updated not Found" }).end(); return; };
            if (updatedauthentication != null) { res.status(200).json(updatedauthentication).end(); return; };
        });
    }
};