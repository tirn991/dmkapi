'use strict'
var Contribution = require('../models/contribution.model');
var Believer = require('../models/believer.model');
var Contributor = require('../models/contributor.model');
module.exports = {
    getAllContribution: function(req, res) {
        Contribution.find({}, function(error, contribution) {
            if (error) { res.status(500).json({ success: false, message: error.message }); return; };
            if (contribution.length == 0) { res.status(404).json({ success: false, message: "Contribution Collection is Empty" }).end(); return; };
            if (contribution.length != 0) { res.status(200).json(contribution).end(); return; };
        });
    },
    removeAllContribution: function(req, res) {
        Contribution.remove({}, function(error, result) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "All Contributiones Removed in Collection" }).end();
            return;
        });
    },
    createContribution: function(req, res) {
        var contribution = new Contribution(req.swagger.params.contributiondata.value);
        contribution.save(function(error, contribution) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return; }
            if (contribution != null) { res.status(200).json(contribution).end(); return; };
        });
    },
    getSingleContribution: function(req, res) {
        Contribution.findById(req.swagger.params.contributionid.value, function(error, contribution) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (contribution == null) { res.status(404).json({ success: false, message: "Contribution" }).end(); return; };
            if (contribution != null) { res.status(200).json(contribution).end(); return; };
        });
    },
    removeSingleContribution: function(req, res) {
        Contribution.findByIdAndRemove(req.swagger.params.contributionid.value, function(error, message) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "Contribution Removed" });
        });
    },
    updateSingleContribution: function(req, res) {
        Contribution.findByIdAndUpdate(req.swagger.params.contributionid.value, req.swagger.params.contribution.value, { new: true }, function(error, updatedcontribution) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (updatedcontribution == null) { res.status(404).json({ success: false, message: "Contribution to be Updated not Found" }).end(); return; };
            if (updatedcontribution != null) { res.status(200).json(updatedcontribution).end(); return; };
        });
    },
    getContributionBeliever: function(req, res) {
        Believer.find({ 'contributioncode': req.swagger.params.contributioncode.value }, function(error, believer) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (believer.length == 0) { res.status(404).json({ success: false, message: "No Believer Found" }).end(); return; };
            if (believer.length != 0) { res.status(200).json(believer).end(); return; };
        });
    },
    getContributionContributor: function(req, res) {
        Contributor.find({ 'contributionid': req.swagger.params.contributionid.value }, function(error, contributor) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (contributor.length == 0) { res.status(404).json({ success: false, message: "No Contributor Found" }).end(); return; };
            if (contributor.length != 0) { res.status(200).json(contributor).end(); return; };
        });
    },
    getContributionBelieverByAge: function(req, res) {
        var agefrom = req.swagger.params.agefrom.value;
        var ageto = req.swagger.params.ageto.value;
        var believerArr = [];
        var currentyear = new Date().getFullYear() + 1;
        Believer.find({ 'contributioncode': req.swagger.params.contributioncode.value }, function(error, believer) {
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