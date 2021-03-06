/*
 * Name: User.js
 * Date: 2015-07-08
 * Author: Joaquin Osvaldo Rodriguez
 */
var relational = require('../../model/relational.js');
var properties = require('../properties.js');
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcryptjs');

var getMenu = function(role) {
  var m = {};
  if (role.indexOf(",") > -1) {
    m = getMenu(role.split(",")[0]);
  } else {
    if (('administrator').indexOf(role) > -1) {
      m = {
        'ACCOUNT': '/account',
        'LOGOUT': '/logout'
      }
    } else {
      m = {
        'HOME': '/account',
        'LOGIN': '/login'
      }
    }
  }
  return m;
};

/*
 * Function returns URL with FQDN for host, prefixed by secure http if applicable.
 */
var getURL = function() {
  var url = 'https://';
  if (!properties.https && !req.secure) {
    url = 'http://';
  }
  url = url + properties.host
  return url;
};



exports.deleteProcedure = function(req, res, next) {
  console.log('deleteProcedure');
  //    var user = req.user;
  //    var role = user.role;
  var idProcedure = req.params.idProcedure;
  //    if (isAuthorized(role, "general-manager")) {
  relational.getProcedure(idProcedure, function(error, p) {
    if (error) {
      res.end('{"status":500}');

    } else {
      if (p !== null) {
        relational.removeProcedure(idProcedure, function(error, result) {
          res.end('{"status":200,"idProcedure":' + idProcedure + '}');
        });
      } else {
        res.end('{"status":500,"idProcedure":' + idProcedure + '}');
      }
    }
  });
};

exports.getAccount = function(req, res, next) {
  console.log("user.getAccount");
  var user = req.user;
  var idUser = user.idUser;
  var role = user.role;
  var menu = getMenu(role);
  if (isAuthorized(role, "administrator")) {
      res.render('account', {
        title: 'EMPLOYEE ACCOUNT',
        menu: menu,
        user: user
      });
  }
};

exports.getNotAuthorized = function(req, res, next) {
  var user = req.user;
  var role = user.role;
  var menu = getMenu(role);
  res.render('account/not-authorized', {
    title: 'NOT AUTHORIZED',
    menu: menu
  });
};


/*
 * Function recusrively searches roles string with comma delimited role names, for a match to the role name contained in the role string. If a role string match is found, functions
 * returns true, else false.
 */
function isAuthorized(role, roles) {
  //    console.log('isAuthorized ' + role + ' ' + roles);
  var authorization = false;
  if (typeof role !== "undefined") {
    if (role.indexOf(",") > -1) {
      authorization = isAuthorized(role.split(",")[0], roles);
    } else {
      if (roles.indexOf(role) > -1) {
        authorization = true;
      }
    }
  }
  return authorization;
};

exports.isAuthorized = isAuthorized;
