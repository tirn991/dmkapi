'use strict'
var Info = require('../models/info.model');
module.exports = {
    getAllInfo: function (req, res) {
        Info.find({}, function (error, info) {
            if (error) { res.status(500).json({ success: false, message: error.message }); return; };
            if (info.length == 0) { res.status(404).json({ success: false, message: "Info Collection is Empty" }).end(); return; };
            if (info.length != 0) { res.status(200).json(info).end(); return; };
        });
    },
    removeAllInfo: function (req, res) {
        Info.remove({}, function (error, result) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "All Infos Removed in Collection" }).end(); return;
        });
    },
    createInfo: function (req, res) {
        var info = new Info(req.swagger.params.infodata.value);
        info.save(function (error, info) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return; }
            if (info != null) { res.status(200).json(info).end(); return; };
        });
    },
    getSingleInfo: function (req, res) {
        Info.findById(req.swagger.params.infoid.value, function (error, info) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (info == null) { res.status(404).json({ success: false, message: "Info" }).end(); return; };
            if (info != null) { res.status(200).json(info).end(); return; };
        });
    },
    removeSingleInfo: function (req, res) {
        Info.findByIdAndRemove(req.swagger.params.infoid.value, function (error, message) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            res.status(200).json({ success: true, message: "Info Removed" });
        });
    },
    updateSingleInfo: function (req, res) {
        Info.findByIdAndUpdate(req.swagger.params.infoid.value, req.swagger.params.info.value, { new: true }, function (error, updatedinfo) {
            if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
            if (updatedinfo == null) { res.status(404).json({ success: false, message: "Info to be Updated not Found" }).end(); return; };
            if (updatedinfo != null) { res.status(200).json(updatedinfo).end(); return; };
        });
    },
    getGroupInfo: function (req, res) {
        Info.find({'groupcode':req.swagger.params.groupcode.value, 'valid':1}, function (error, info) {
            if (error) { res.status(500).json({ success: false, message: error.message }); return; };
            if (info.length == 0) { res.status(404).json({ success: false, message: "Info Collection is Empty" }).end(); return; };
            if (info.length != 0) { res.status(200).json(info).end(); return; };
        });
    },
};
