
/* jshint node: true */
/* eslint max-len: 0 */
/* eslint-env node */

"use strict";





var Glob          = require("glob"),
    FS            = require("fs"),

    Mixins        = require("./mixins.js"),
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

//  console.log("TString for scanning:\n\n" + TString);

    AllRules.map(function(RuleSetTuple) {

        var IWork = [];
        RuleSetTuple[1].map(function(RuleX) {

//          console.log('Should apply rule ' + RuleX);

            if (TString.indexOf(RuleX) > -1) {
//                console.log('Found!');
                IWork.push(RuleX);
            } else {
//              console.log('Not found :(');
            }

        });

        if (IWork.length) {
            Work.push([RuleSetTuple[0], IWork]);
//          console.log('Pushing iwork');
        } else {
//          console.log('Not pushing iwork :(');
        }

    });

    return Work;

}





function ScanEach(StringStringTupleArray, Options) {

    var Work = [],
        Res;

    StringStringTupleArray.map(function(SST) {

//      console.log('SST[1]: ' + SST[1]);
        Res = Scan(SST[1]);
///        console.log("SST TEST\n########\n\n" + SST[0] + ', ' + SST[1]);

        if (Res.length) {
            Work.push([SST[0], Res]);
        }

    });

    return Work;

}





function ScanGlob(TheGlob, _Options) {

    var files = Glob.sync(TheGlob, undefined),
        fdata = [],
        Res;

    files.map(function(File) {
        var FData = FS.readFileSync(File, 'utf8');
        fdata.push([ File, FData ]);
    });

    Res = ScanEach(fdata);

    // bad place for this, but Commander is being unpleasant
    return Res;

}




/*
console.log(JSON.stringify(ScanEach([

    ["foo",              "foo"             ],
    ["leader",           "leader"          ],
    ["aza leader",       "aza leader"      ],
    ["leader aza",       "leader aza"      ],
    ["aza leader aza",   "aza leader aza"  ],
    ["sprite-selectors", "sprite-selectors"]

]), undefined, 2));
*/




module.exports = {

    scan      : Scan,
    scan_each : ScanEach,
    scan_glob : ScanGlob

};
