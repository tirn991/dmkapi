'use strict'
var Nation = require('../models/nations.model');

module.exports = {
    getAllNation: function (req, res) {
        Nation.find({}, function (error, nation) {
            if (error) { res.status(500).json({ success: false, message: error.message }); return; };
            if (nation.length == 0) { res.status(404).json({ success: false, message: "Nation Collection is Empty" }).end(); return; };
            if (nation.length != 0) { res.status(200).json(nation).end(); return; };
        });
    },
    removeAllNation: function (req, res) {
        Nation.remove({}, function (error, result) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "All Nation Removed in Collection" }).end(); return;
        });
    },
    createNation: function (req, res) {
        var nation = new Nation(req.swagger.params.nationdata.value);
        nation.save(function (error, nation) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return; }
            if (nation != null) { res.status(200).json(nation).end(); return; };
        });
    },
    getSingleNation: function (req, res) {
        Nation.findById(req.swagger.params.nationid.value, function (error, nation) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (nation == null) { res.status(404).json({ success: false, message: "Nation" }).end(); return; };
            if (nation != null) { res.status(200).json(nation).end(); return; };
        });
    },
    removeSingleNation: function (req, res) {
        Nation.findByIdAndRemove(req.swagger.params.nationid.value, function (error, message) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "Nation Removed" });
        });
    },
    updateSingleNation: function (req, res) {
        Nation.findByIdAndUpdate(req.swagger.params.nationid.value, req.swagger.params.nation.value, { new: true }, function (error, updatednation) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (updatednation == null) { res.status(404).json({ success: false, message: "Nation to be Updated not Found" }).end(); return; };
            if (updatednation != null) { res.status(200).json(updatednation).end(); return; };
        });
    }
};