'use strict'
var Dio = require('../models/dios.model');
var Church = require('../models/church.model');
var Community = require('../models/community.model');
var Believer = require('../models/believer.model');
module.exports = {
    getAllDio: function (req, res) {
        Dio.find({}, function (error, dio) {
            if (error) { res.status(500).json({ success: false, message: error.message }); return; };
            if (dio.length == 0) { res.status(404).json({ success: false, message: "Dio Collection is Empty" }).end(); return; };
            if (dio.length != 0) { res.status(200).json(dio).end(); return; };
        });
    },
    removeAllDio: function (req, res) {
        Dio.remove({}, function (error, result) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "All Dio Removed in Collection" }).end(); return;
        });
    },
    createDio: function (req, res) {
        var dio = new Dio(req.swagger.params.diodata.value);
        dio.save(function (error, dio) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return; }
            if (dio != null) { res.status(200).json(dio).end(); return; };
        });
    },
    getSingleDio: function (req, res) {
        Dio.findById(req.swagger.params.dioid.value, function (error, dio) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (dio == null) { res.status(404).json({ success: false, message: "Dio" }).end(); return; };
            if (dio != null) { res.status(200).json(dio).end(); return; };
        });
    },
    removeSingleDio: function (req, res) {
        Dio.findByIdAndRemove(req.swagger.params.dioid.value, function (error, message) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "Dio Removed" });
        });
    },
    updateSingleDio: function (req, res) {
        Dio.findByIdAndUpdate(req.swagger.params.dioid.value, req.swagger.params.dio.value, { new: true }, function (error, updateddio) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (updateddio == null) { res.status(404).json({ success: false, message: "Dio to be Updated not Found" }).end(); return; };
            if (updateddio != null) { res.status(200).json(updateddio).end(); return; };
        });
    },
    getDioCommunity: function (req, res) {
        Community.find({ 'diocode': req.swagger.params.diocode.value }, function (error, community) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (community.length == 0) { res.status(404).json({ success: false, message: "No Community Found" }).end(); return; };
            if (community.length != 0) { res.status(200).json(community).end(); return; };
        });
    },
    getDioChurches: function (req, res) {
        Church.find({ 'diocode': req.swagger.params.diocode.value }, function (error, church) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (church.length == 0) { res.status(404).json({ success: false, message: "No Church Found" }).end(); return; };
            if (church.length != 0) { res.status(200).json(church).end(); return; };
        });
    },
    getDioBeliever: function (req, res) {
        Believer.find({ 'diocode': req.swagger.params.diocode.value }, function (error, believer) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (believer.length == 0) { res.status(404).json({ success: false, message: "No Believer Found" }).end(); return; };
            if (believer.length != 0) { res.status(200).json(believer).end(); return; };
        });
    },
    getDioBelieverByAge: function (req, res) {
        var agefrom = req.swagger.params.agefrom.value;
        var ageto = req.swagger.params.ageto.value;
        var believerArr = [];
        var currentyear = new Date().getFullYear() + 1;
        Believer.find({ 'diocode': req.swagger.params.diocode.value }, function (error, believer) {
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