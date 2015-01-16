
/* jshint node: true */
/* eslint max-len: 0 */
/* eslint-env node */

"use strict";

var Mixins        = require("./mixins.js"),
    RubyFuns      = require("./ruby_based_functions.js"),
    SassBasedFuns = require("./sass_based_functions.js"),
    SassFuns      = require("./sass_functions.js"),
    Variables     = require("./variables.js");

var AllRules      = [].concat( Mixins, RubyFuns, SassBasedFuns, SassFuns, Variables );





function Scan(String) {

    var Work = [];
    AllRules.map(function(RuleX) {
      if (String.indexOf(RuleX) > -1) {
        Work.push(RuleX);
      }
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
