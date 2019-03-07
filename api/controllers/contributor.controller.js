'use strict'
var Contributor = require('../models/contributor.model');
var Believer = require('../models/believer.model');
module.exports = {
    getAllContributor: function(req, res) {
        Contributor.find({}, function(error, contributor) {
            if (error) { res.status(500).json({ success: false, message: error.message }); return; };
            if (contributor.length == 0) { res.status(404).json({ success: false, message: "Contributor Collection is Empty" }).end(); return; };
            if (contributor.length != 0) { res.status(200).json(contributor).end(); return; };
        });
    },
    removeAllContributor: function(req, res) {
        Contributor.remove({}, function(error, result) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "All Contributores Removed in Collection" }).end();
            return;
        });
    },
    createContributor: function(req, res) {
        var contributor = new Contributor(req.swagger.params.contributordata.value);
        contributor.save(function(error, contributor) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return; }
            if (contributor != null) { res.status(200).json(contributor).end(); return; };
        });
    },
    getSingleContributor: function(req, res) {
        Contributor.findById(req.swagger.params.contributorid.value, function(error, contributor) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (contributor == null) { res.status(404).json({ success: false, message: "Contributor" }).end(); return; };
            if (contributor != null) { res.status(200).json(contributor).end(); return; };
        });
    },
    removeSingleContributor: function(req, res) {
        Contributor.findByIdAndRemove(req.swagger.params.contributorid.value, function(error, message) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "Contributor Removed" });
        });
    },
    updateSingleContributor: function(req, res) {
        Contributor.findByIdAndUpdate(req.swagger.params.contributorid.value, req.swagger.params.contributor.value, { new: true }, function(error, updatedcontributor) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (updatedcontributor == null) { res.status(404).json({ success: false, message: "Contributor to be Updated not Found" }).end(); return; };
            if (updatedcontributor != null) { res.status(200).json(updatedcontributor).end(); return; };
        });
    },
    getContributorBeliever: function(req, res) {
        Believer.find({ 'contributorcode': req.swagger.params.contributorcode.value }, function(error, believer) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (believer.length == 0) { res.status(404).json({ success: false, message: "No Believer Found" }).end(); return; };
            if (believer.length != 0) { res.status(200).json(believer).end(); return; };
        });
    },
    getContributorBelieverByAge: function(req, res) {
        var agefrom = req.swagger.params.agefrom.value;
        var ageto = req.swagger.params.ageto.value;
        var believerArr = [];
        var currentyear = new Date().getFullYear() + 1;
        Believer.find({ 'contributorcode': req.swagger.params.contributorcode.value }, function(error, believer) {
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