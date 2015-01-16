
/* jshint node: true */
/* eslint max-len: 0 */
/* eslint-env node */

"use strict";





var Glob          = require("glob"),
    FS            = require("fs"),
    color         = require("cli-color"),
    ctrim         = require('cli-color/trim'),

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

    var files = new Glob.sync(TheGlob),
        fdata = [];

    files.map(function(File) {
        var FData = FS.readFileSync(File, 'utf8');
        fdata.push([ File, FData ]);
    });

    return ScanEach(fdata);

}





function NicePrint(Result) {

    if (Result.length) {

        console.log(color.white('Some possible Compass terms detected in the following files:'));

        Result.map(function(ResultItem) {

            var Filename   = ResultItem[0],
                Violations = ResultItem[1];

            console.log(color.cyan( '\n  ' + Filename ));
            console.log(color.blue( '  ' + new Array(Filename.length+1).join('=') ));

            Violations.map(function(ViolationKind) {

                var ViolationClass  = ViolationKind[0],
                    ViolationItems  = ViolationKind[1],
                    first           = true,
                    PrintLeader     = "      ",
                    Separator       = ", ",
                    MaxWidth        = 158,
                    CurrentLine     = PrintLeader,

                    AddGapToLeader  = function() {
                        CurrentLine += color.magenta(Separator);
                    },

                    AddItemToLeader = function(Item) {
                        if (first) { first = false; } else { AddGapToLeader(); }
                        CurrentLine += color.blue(Item);
                    };

                console.log(color.green("    Possible violations of type ") + color.yellow(ViolationClass) + color.green(':') );

                ViolationItems.map(function(ThisViolation) {

                    if ((ctrim(CurrentLine).length + Separator.length + ThisViolation.length) > MaxWidth) {

                        AddGapToLeader();
                        first = true;
                        console.log(CurrentLine);
                        CurrentLine = PrintLeader;
                    }

                    AddItemToLeader(ThisViolation);

                });

                console.log(CurrentLine + '\n');

            });

        });

    } else {
        console.log(color.green('No Compass terms detected'));
    }

}





module.exports = {

    scan       : Scan,
    scan_each  : ScanEach,
    scan_glob  : ScanGlob,
    nice_print : NicePrint

};
