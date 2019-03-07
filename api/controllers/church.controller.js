'use strict'
var Church = require('../models/church.model');
var Community = require('../models/community.model');
var Contribution = require('../models/contribution.model');
var Believer = require('../models/believer.model');
var Admin = require('../models/admin.model');
module.exports = {
    getAllChurch: function(req, res) {
        Church.find({}, function(error, church) {
            if (error) { res.status(500).json({ success: false, message: error.message }); return; };
            if (church.length == 0) { res.status(404).json({ success: false, message: "Church Collection is Empty" }).end(); return; };
            if (church.length != 0) { res.status(200).json(church).end(); return; };
        });
    },
    removeAllChurch: function(req, res) {
        Church.remove({}, function(error, result) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "All Churches Removed in Collection" }).end();
            return;
        });
    },
    createChurch: function(req, res) {
        var church = new Church(req.swagger.params.churchdata.value);
        church.save(function(error, church) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return; }
            if (church != null) { res.status(200).json(church).end(); return; };
        });
    },
    getSingleChurch: function(req, res) {
        Church.findById(req.swagger.params.churchid.value, function(error, church) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (church == null) { res.status(404).json({ success: false, message: "Church" }).end(); return; };
            if (church != null) { res.status(200).json(church).end(); return; };
        });
    },
    removeSingleChurch: function(req, res) {
        Church.findByIdAndRemove(req.swagger.params.churchid.value, function(error, message) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "Church Removed" });
        });
    },
    updateSingleChurch: function(req, res) {
        Church.findByIdAndUpdate(req.swagger.params.churchid.value, req.swagger.params.church.value, { new: true }, function(error, updatedchurch) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (updatedchurch == null) { res.status(404).json({ success: false, message: "Church to be Updated not Found" }).end(); return; };
            if (updatedchurch != null) { res.status(200).json(updatedchurch).end(); return; };
        });
    },
    getChurchCommunity: function(req, res) {
        Community.find({ 'churchid': req.swagger.params.churchid.value }, function(error, community) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (community.length == 0) { res.status(404).json({ success: false, message: "No Community Found" }).end(); return; };
            if (community.length != 0) { res.status(200).json(community).end(); return; };
        });
    },
    getChurchContribution: function(req, res) {
        Contribution.find({ 'churchid': req.swagger.params.churchid.value }, function(error, contribution) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (contribution.length == 0) { res.status(404).json({ success: false, message: "No Community Found" }).end(); return; };
            if (contribution.length != 0) { res.status(200).json(contribution).end(); return; };
        });
    },
    getChurchBeliever: function(req, res) {
        Believer.find({ 'churchid': req.swagger.params.churchid.value }, function(error, believer) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (believer.length == 0) { res.status(404).json({ success: false, message: "No Believer Found" }).end(); return; };
            if (believer.length != 0) { res.status(200).json(believer).end(); return; };
        });
    },

    getChurchAdmin: function(req, res) {
        Admin.find({ 'churchid': req.swagger.params.churchid.value }, function(error, admin) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (admin.length == 0) { res.status(404).json({ success: false, message: "No admin Found" }).end(); return; };
            if (admin.length != 0) { res.status(200).json(admin).end(); return; };
        });
    },
    getChurchBelieverByAge: function(req, res) {
        var agefrom = req.swagger.params.agefrom.value;
        var ageto = req.swagger.params.ageto.value;
        var believerArr = [];
        var currentyear = new Date().getFullYear() + 1;
        Believer.find({ 'churchid': req.swagger.params.churchid.value }, function(error, believer) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (believer.length == 0) { res.status(404).json({ success: false, message: "No Believer Found" }).end(); return; };
            if (believer.length != 0) {
                var g;
                for (g = 0; g < believer.length; g++) {
                    if ((currentyear - believer[g].dob.year) > agefrom && (currentyear - believer[g].dob.year) < ageto) {
                        believerArr.push(believer[g]);
                    }
                }
                if (believerArr.length == 0) { res.status(404).json({ success: false, message: "Believer Collection is Empty" }).end(); return; };
                if (believerArr.length != 0) { res.status(200).json(believerArr).end(); return; };
            };
        });
    }
};