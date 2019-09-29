const chalk = require('chalk');

// This is to tell JSON.stringify to treat regular expressions as strings else it will serialize them as empty objects.
function replacer(key, value) {
    if (value instanceof RegExp)
      return (value.toString());
    else
      return value;
}

module.exports.jsonBeautify = function (json) {

    if (typeof json != 'string') {
        json = JSON.stringify(json, replacer, 2);
    }

    // You can customize your preferred colors
    const 
        KEY = chalk.bold.cyanBright,
        STRING = chalk.greenBright,
        NUMBER = chalk.yellowBright,
        BOOLEAN = chalk.redBright,
        NULL = chalk.magentaBright;
        

    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                match = KEY(match);
            } else {
                match = STRING(match);
            }
        } else if (/true|false/.test(match)) {
            match = BOOLEAN(match);
        } else if (/null/.test(match)) {
            match = NULL(match);
        }
        else{
            match = NUMBER(match);
        }
        return match;
    });

    console.log(json);
}