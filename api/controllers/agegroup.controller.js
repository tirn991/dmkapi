'use strict'
var Agegroup = require('../models/agegroup.model');
module.exports = {
    getAllAgegroup: function (req, res) {
        Agegroup.find({}, function (error, agegroup) {
            if (error) { res.status(500).json({ success: false, message: error.message }); return; };
            if (agegroup.length == 0) { res.status(404).json({ success: false, message: "Agegroup Collection is Empty" }).end(); return; };
            if (agegroup.length != 0) { res.status(200).json(agegroup).end(); return; };
        });
    },
    removeAllAgegroup: function (req, res) {
        Agegroup.remove({}, function (error, result) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "All Agegroup Removed in Collection" }).end(); return;
        });
    },
    createAgegroup: function (req, res) {
        var agegroup = new Agegroup(req.swagger.params.agegroupdata.value);
        agegroup.save(function (error, agegroup) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return; }
            if (agegroup != null) { res.status(200).json(agegroup).end(); return; };
        });
    },
    getSingleAgegroup: function (req, res) {
        Agegroup.findById(req.swagger.params.agegroupid.value, function (error, agegroup) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (agegroup == null) { res.status(404).json({ success: false, message: "Agegroup" }).end(); return; };
            if (agegroup != null) { res.status(200).json(agegroup).end(); return; };
        });
    },
    removeSingleAgegroup: function (req, res) {
        Agegroup.findByIdAndRemove(req.swagger.params.agegroupid.value, function (error, message) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "Agegroup Removed" });
        });
    },
    updateSingleAgegroup: function (req, res) {
        Agegroup.findByIdAndUpdate(req.swagger.params.agegroupid.value, req.swagger.params.agegroup.value, { new: true }, function (error, updatedagegroup) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (updatedagegroup == null) { res.status(404).json({ success: false, message: "Agegroup to be Updated not Found" }).end(); return; };
            if (updatedagegroup != null) { res.status(200).json(updatedagegroup).end(); return; };
        });
    }
};