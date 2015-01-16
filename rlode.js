
/* jshint node: true */
/* eslint max-len: 0 */
/* eslint-env node */

"use strict";

var Mixins        = require("./mixins.js"),
    RubyFuns      = require("./ruby_based_functions.js"),
    SassBasedFuns = require("./sass_based_functions.js"),
    SassFuns      = require("./sass_functions.js"),
    Variables     = require("./variables.js");

var AllRules      = [ [ "Mixins",        Mixins        ], 
                      [ "RubyFuns",      RubyFuns      ], 
                      [ "SassFuns",      SassFuns      ],
                      [ "SassBasedFuns", SassBasedFuns ],
                      [ "Variables",     Variables     ] ];





function Scan(String) {

  var Work = [];

  AllRules.map(function(RuleSetTuple) {
    var IWork = [];
    RuleSetTuple[1].map(function(RuleX) {
      if (String.indexOf(RuleX) > -1) {
        IWork.push(RuleX);
      }
    });
    if (IWork.length) { Work.push(RuleSetTuple[0], IWork); }
  });

  return Work;

}

console.log("Scan(\"abc\")");
console.log(Scan("abc"));

console.log("Scan(\"base-leader\")");
console.log(Scan("base-leader"));

console.log("Scan(\"aza base-leader aza\")");
console.log(Scan("aza base-leader aza"));

console.log("Scan(\"aza base-leader\")");
console.log(Scan("aza base-leader"));

console.log("Scan(\"base-leader aza\")");
console.log(Scan("base-leader aza"));

module.exports = Scan;
