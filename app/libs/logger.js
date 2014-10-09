
var util = require("util");
var colors  = require("colors");

// put new line on app start
console.log("\n--------------------------------------------------------------------------------\n");

function NamedLogger(name)
{
    this.name = name;
}

NamedLogger.prototype._log = function(level, msg, args)
{
    if (args.length > 0)
    {
        args.unshift(msg);
        msg = util.format.apply(util, args);
    }
    
    var text = getTimeString() + " " + level + " [" + this.name + "]" + "\t" + msg;
    console.log(text);
}

function getTimeString()
{
    var now = new Date();
    return  now.getFullYear() + "-" + 
            formatNumber(now.getMonth()) + "-" + 
            formatNumber(now.getDate()) + "_" + 
            formatNumber(now.getHours()) + ":" + 
            formatNumber(now.getMinutes()) + ":" + 
            formatNumber(now.getSeconds());
}

function formatNumber(num)
{
    return num < 10 ? "0" + num : num;
}

function genHandler(level)
{
    return function (msg)
    {
        this._log(level, msg, Array.prototype.slice.call(arguments, 1));
    }
}

NamedLogger.prototype.debug = genHandler("DEBG".grey);
NamedLogger.prototype.info  = genHandler("INFO".yellow);
NamedLogger.prototype.ok    = genHandler("OK  ".green);
NamedLogger.prototype.warn  = genHandler("WARN".cyan);
NamedLogger.prototype.error = genHandler("ERR ".red);

NamedLogger.prototype.getTime = getTimeString;

module.exports = function (name) 
{
    return new NamedLogger(name);
}
