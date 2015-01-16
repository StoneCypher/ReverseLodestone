
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





function Scan(TString) {

  var Work = [];

  AllRules.map(function(RuleSetTuple) {
console.log(RuleSetTuple[0]);
    var IWork = [];
    RuleSetTuple[1].map(function(RuleX) {
      if (TString.indexOf(RuleX) > -1) {
console.log('found ' + RuleX + ' in ' + RuleSetTuple[0] + ' ' + TString);
        IWork.push(RuleX);
      } else {
console.log('did not find ' + RuleX + ' in ' + RuleSetTuple[0] + ' ' + TString);
      }
    });

    if (IWork.length) { Work.push(RuleSetTuple[0], IWork); }

  });

  return Work;

}





function ScanEach(StringStringTupleArray) {

  var Work = [],
      Res;

  StringStringTupleArray.map(function(SST) {
    Res = Scan(SST[1]);
    if (Res.length) {
      console.log('###' + Res);
      Work.push([SST[0], Res]);
    }
  });

  return Work;

}





console.log(JSON.stringify(ScanEach([ 

  ["foo",              "foo"             ],
  ["leader",           "leader"          ],
  ["aza leader",       "aza leader"      ],
  ["leader aza",       "leader aza"      ],
  ["aza leader aza",   "aza leader aza"  ],
  ["sprite-selectors", "sprite-selectors"]

]), undefined, 2));





module.exports = Scan;
