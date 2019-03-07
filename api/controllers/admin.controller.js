'use strict'
var Authentication = require('../models/authentication.model');
var Admin = require('../models/admin.model');

module.exports = {
  getAllAdmin: function (req, res) {
    Admin.find({}, function (error, admin) {
      if (error) { res.status(500).json({ success: false, message: error.message }); return; };
      if (admin.length == 0) { res.status(404).json({ success: false, message: "Admin Collection is Empty" }).end(); return; };
      if (admin.length != 0) { res.status(200).json(admin).end(); return; };
    });
  },
  createAdmin: function (req, res) {
    var admindata = req.swagger.params.admindata.value;
    var admin = new Admin(req.swagger.params.admindata.value);
    var authentData = { "username": admindata.admincode, "password": admindata.password, "title": admindata.title, "status": admindata.status };
    var authentication = new Authentication(authentData);
    authentication.save();
    admin.save(function (error, admin) {
      if (error) { res.status(500).json({ success: false, message: error.message }).end(); return; }
      if (admin != null) { res.status(200).json(admin).end(); return; };
    });
  },
  AddAdminLogs: function (req, res) {
    var logsdata = req.swagger.params.logsdata.value;
    Admin.findByIdAndUpdate(req.swagger.params.adminid.value, { $push: { "adminlogs": logsdata } }, function (error, admin) {
      if (error) { res.status(500).json({ success: false, message: error.message }) };
      if (admin == null) { res.status(404).json({ success: false, message: "No such Admin" }) };
      if (admin != null) { res.status(200).json({ success: true, message: "Logs Added Successifully" }) };
    });
  },
  removeAllAdmin: function (req, res) {
    Admin.remove({}, function (error, result) {
      if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
      res.json({ success: true, message: "All Admin Removed in Collection" });
    });
  },
  getSingleAdmin: function (req, res) {
    Admin.findById(req.swagger.params.adminid.value, function (error, admin) {
      if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
      if (admin == null) { res.status(404).json({ success: false, message: "Admin not Found" }).end(); return; };
      if (admin != null) { res.status(200).json(admin).end(); return; };
    });
  },
  removeSingleAdmin: function (req, res) {
    Admin.findByIdAndRemove(req.swagger.params.adminid.value, function (error, message) {
      if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
      res.json({ success: true, message: "Admin Removed" });
    });
  },
  updateSingleAdmin: function (req, res) {
    var admin = req.swagger.params.admin.value;
    Admin.findByIdAndUpdate(req.swagger.params.adminid.value, admin, { new: true }, function (error, updatedadmin) {
      if (error) { res.status(500).json({ success: false, message: error.message }).end(); return }
      if (updatedadmin == null) { res.status(404).json({ success: false, message: "Admin to be Updated not Found" }).end(); return; };
      if (updatedadmin != null) { res.status(200).json(updatedadmin).end(); return; };
    });
  }
};