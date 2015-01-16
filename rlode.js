
/* jshint node: true */
/* eslint max-len: 0 */
/* eslint-env node */

"use strict";

var Mixins        = require("./mixins.js"),
    RubyFuns      = require("./ruby_based_functions.js"),
    SassBasedFuns = require("./sass_based_functions.js"),
    SassFuns      = require("./sass_functions.js"),
    Variables     = require("./variables.js");

var AllRules      = [ Mixins, RubyFuns, SassBasedFuns, SassFuns, Variables ],
    Counts        = AllRules.map(function(X) { return X.length; }),
    Count         = Counts.reduce(function(P,X) { return P+X; }, 0);

console.log("\nCheck against " + Count.toString() + " = " + JSON.stringify(Counts) + " rules.\n");
