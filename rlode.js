
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

    AllRules.map(function(RuleSetTuple) {

        var IWork = [];
        RuleSetTuple[1].map(function(RuleX) {

            if (TString.indexOf(RuleX) > -1) {
                IWork.push(RuleX);
            }

        });

        if (IWork.length) {
            Work.push([RuleSetTuple[0], IWork]);
        }

    });

    return Work;

}





function ScanEach(StringStringTupleArray, Options) {

    var Work = [],
        Res;

    StringStringTupleArray.map(function(SST) {

        Res = Scan(SST[1]);

        if (Res.length) {
            Work.push([SST[0], Res]);
        }

    });

    return Work;

}





function ScanGlob(TheGlob, _Options) {

    var files = Glob.sync(TheGlob, undefined),
        fdata = [];

    files.map(function(File) {
        var FData = FS.readFileSync(File, 'utf8');
        fdata.push([ File, FData ]);
    });

    return ScanEach(fdata);

}





module.exports = {

    scan      : Scan,
    scan_each : ScanEach,
    scan_glob : ScanGlob

};
