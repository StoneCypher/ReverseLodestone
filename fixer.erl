
% mostly you don't need this module; this was just here to help me strip interesting keywords out of the
% documentation, in case I need to do it again in the future





-module(fixer).





-export([
    
    starts_with_ds/1,
    justvar/1,
    getvars/1,

    deparen/1

]).





starts_with_ds(X) ->

    lists:nth(1, X) == $$.





justvar(X) ->

    {_,   V} = lists:split(1, X),
    [Var, _] = sc:explode(" ", V, 2),
    Var.





getvars(Text) ->

    % requires https://github.com/StoneCypher/scutil.github.com/
    % since you don't need this script, I'm not bothering with rebar
    % meant for one-time use, so readability < speed

    Lines    = sc:to_lines(Text),

    NoBlanks = [ ThisLine         || ThisLine <- Lines, ThisLine =/= "" ],
    VarsOnly = [ OneLine          || OneLine <- NoBlanks, starts_with_ds(OneLine) ],
    Trimmed  = [ justvar(VarLine) || VarLine <- VarsOnly ],

    Trimmed.





list_pair_first( [A] ) ->

    A;





list_pair_first( [A, _B] ) ->

    A.





deparen(Text) ->

    [ list_pair_first(sc:explode("(", Line, 2)) || Line <- sc:to_lines(Text) ].
