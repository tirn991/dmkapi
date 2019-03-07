'use strict'
var Community = require('../models/community.model');
var Believer = require('../models/believer.model');
module.exports = {
    getAllCommunity: function (req, res) {
        Community.find({}, function (error, community) {
            if (error) { res.status(500).json({ success: false, message: error.message }); return; };
            if (community.length == 0) { res.status(404).json({ success: false, message: "Community Collection is Empty" }).end(); return; };
            if (community.length != 0) { res.status(200).json(community).end(); return; };
        });
    },
    removeAllCommunity: function (req, res) {
        Community.remove({}, function (error, result) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "All Communityes Removed in Collection" }).end(); return;
        });
    },
    createCommunity: function (req, res) {
        var community = new Community(req.swagger.params.communitydata.value);
        community.save(function (error, community) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return; }
            if (community != null) { res.status(200).json(community).end(); return; };
        });
    },
    getSingleCommunity: function (req, res) {
        Community.findById(req.swagger.params.communityid.value, function (error, community) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (community == null) { res.status(404).json({ success: false, message: "Community" }).end(); return; };
            if (community != null) { res.status(200).json(community).end(); return; };
        });
    },
    removeSingleCommunity: function (req, res) {
        Community.findByIdAndRemove(req.swagger.params.communityid.value, function (error, message) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "Community Removed" });
        });
    },
    updateSingleCommunity: function (req, res) {
        Community.findByIdAndUpdate(req.swagger.params.communityid.value, req.swagger.params.community.value, { new: true }, function (error, updatedcommunity) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (updatedcommunity == null) { res.status(404).json({ success: false, message: "Community to be Updated not Found" }).end(); return; };
            if (updatedcommunity != null) { res.status(200).json(updatedcommunity).end(); return; };
        });
    },
    getCommunityBeliever: function (req, res) {
        Believer.find({ 'communitycode': req.swagger.params.communitycode.value }, function (error, believer) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (believer.length == 0) { res.status(404).json({ success: false, message: "No Believer Found" }).end(); return; };
            if (believer.length != 0) { res.status(200).json(believer).end(); return; };
        });
    },
    getCommunityBelieverByAge: function (req, res) {
        var agefrom = req.swagger.params.agefrom.value;
        var ageto = req.swagger.params.ageto.value;
        var believerArr = [];
        var currentyear = new Date().getFullYear() + 1;
        Believer.find({ 'communitycode': req.swagger.params.communitycode.value }, function (error, believer) {
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