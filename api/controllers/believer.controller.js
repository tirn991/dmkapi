'use strict'
var mongoose = require('mongoose');
var Believer = require('../models/believer.model');
var Authentication = require('../models/authentication.model');
var Info = require('../models/info.model');
module.exports = {
  getAllBeliever: function (req, res) {
    Believer.find({}, function (error, believer) {
      if (error) { res.status(500).json({ success: false, message: error.message }); return; };
      if (believer.length == 0) { res.status(404).json({ success: false, message: "Believer Collection is Empty" }).end(); return; };
      if (believer.length != 0) { res.status(200).json(believer).end(); return; };
    });
  },
  getRangedBeliever: function (req, res) {
    var agefrom = req.swagger.params.agefrom.value;
    var ageto = req.swagger.params.ageto.value;
    var believerArr = [];
    var currentyear = new Date().getFullYear() + 1;
    Believer.find({}, function (error, believer) {
      if (error) { res.status(500).json({ success: false, message: error.message }); return; };
      if (believer.length == 0) { res.status(404).json({ success: false, message: "Believer Collection is Empty" }).end(); return; };
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
  },
  getBelieverInfo: function (req, res) {
    Believer.findById(req.swagger.params.believerid.value, function (error, believer) {
      if (error) { res.status(500).json({ success: false, message: error.message }).end(); return; }
      if (believer == null) { res.status(400).json({ success: false, message: "Invalid user" }).end(); return; };
      if (believer != null) {
        var believerAge = (new Date().getFullYear()) - believer.dob.year;
        Info.aggregate([{
          $match: {
            "groupcode": req.swagger.params.groupcode.value, "valid": 1,
            "agefrom": { $lte: believerAge },
            "ageto": { $gte: believerAge }
          }
        },
        { $sort: { 'created_at': -1 } }
        ], function (error, infos) {
          if (infos.length == 0) { res.status(404).json({ success: false, message: "No Info Found" }).end(); return; };
          if (infos.length != 0) { res.status(200).json(infos).end(); return; };
        });
      };
    });
  },
  createBeliever: function (req, res) {
    var believerdataa = req.swagger.params.believerdata.value;
    var believer = new Believer(believerdataa);
    var authentData = { "username": believerdataa.believercode, "password": believerdataa.password, "title": believerdataa.title, "status": believerdataa.status };
    var authentication = new Authentication(authentData);
    authentication.save();
    believer.save(function (error, believer) {
      if (error) { res.status(500).json({ success: false, message: error.message }).end(); return; }
      if (believer != null) { res.status(200).json(believer).end(); return; };
    });
  },
  updateDeviceId: function (req, res) {
    var devicedata = req.swagger.params.device_id.value;
    Believer.findByIdAndUpdate(req.swagger.params.believerid.value, { $set: { "device_id": devicedata.device_id } }, function (error, believer) {
      if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
      if (believer == null) { res.status(404).json({ success: false, message: "Believer not Found" }).end(); return; };
      if (believer != null) { res.status(200).json({ success: true, message: "Token Changed Successifully" }).end(); return; };
    });
  },
  updateProfilePic: function (req, res) {
    var believerId = req.swagger.params.believerid.value;
    var profilePic = (req.swagger.params.profiledata.value).believerinfo;
    Believer.findByIdAndUpdate(believerId, { $set: { "profilepicture": updatedPic } }, function (error, believer) {
      if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
      if (believer == null) { res.status(404).json({ success: false, message: "Believer not Found" }).end(); return; };
      if (believer != null) { res.status(200).json({ success: true, message: updatedPic }).end(); return; };
    });
  },
  removeAllBeliever: function (req, res) {
    Believer.remove({}, function (error, result) {
      if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
      res.status(200).json({ success: true, message: "All Believers Removed in Collection" });
    });
  },
  getSingleBeliever: function (req, res) {
    Believer.findById(req.swagger.params.believerid.value, function (error, believer) {
      if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
      if (believer == null) { res.status(404).json({ success: false, message: "Believer not Found" }).end(); return; };
      if (believer != null) { res.status(200).json(believer).end(); return; };
    });
  },
  removeSingleBeliever: function (req, res) {
    Believer.findByIdAndRemove(req.swagger.params.believerid.value, function (error, message) {
      if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
      res.status(200).json({ success: true, message: "Believer Removed" });
    });
  },
  updateSingleBeliever: function (req, res) {
    var believer = req.swagger.params.believer.value;
    Believer.findByIdAndUpdate(req.swagger.params.believerid.value, believer, { new: true }, function (error, updatedbeliever) {
      if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
      if (updatedbeliever == null) { res.status(404).json({ success: false, message: "Believer to be Updated not Found" }).end(); return; };
      if (updatedbeliever != null) { res.status(200).json(updatedbeliever).end(); return; };
    });
  },
  addRelative: function (req, res) {
    var relative = req.swagger.params.relativedata.value;
    Believer.findByIdAndUpdate(req.swagger.params.believerid.value, { $push: { 'relatives': relative } }, function (error, updatedbeliever) {
      if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
      if (updatedbeliever == null) { res.status(404).json({ success: false, message: "Believer Not Found" }).end(); return; };
      if (updatedbeliever != null) { res.status(200).json({ success: true, message: "New Relative Added" }).end(); return; };
    });
  }
};