var request = require('request');

var logger = require('./libs/logger.js')("App");

var url = "https://graph.facebook.com/bastlirna?fields=likes";
var period = 1000;

var port = "/dev/ttyAMA0";

// disp const:
var DISP_CLEAR = 0x76;
var DISP_BRIGHTNESS = 0x7A;


function getLikeCount(url, fn)
{
    request(url, function (error, response, body) 
    {
        if (!error && response.statusCode == 200) {
            //console.log(body) // Print the google web page.

            try
            {
                var obj = JSON.parse(body);

                if (obj.likes !== undefined)
                {
                    fn(null, obj.likes);
                }
                else
                {
                    fn("err", null);
                }
            }
            catch(e)
            {
                fn(e, null);
            } 
        } 
        else
        {
            console.log("HTTP Error");
            console.error(error);
            fn(error);
        }
    });
}


var SerialPort = require("serialport").SerialPort
var sp = new SerialPort(port, {
  baudrate: 9600
}, false); 


function disp(data, fn)
{
    sp.write(data, function (err) {
        if (err) 
        {
            console.log("Error disp: " + err);
            if (fn) fn();
            return;
        }
        sp.drain(function (err) {
            if (err) 
            {
                console.log("Error drain disp: " + err);
            }
            if (fn) fn();
        })
    });
}

function dispText(text, fn)
{
    text = "   " + text;
    text = text.substr(-4);

    logger.info("Display: [" + text + "]");

    //disp([DISP_CLEAR], function () {
        disp(text, fn);
    //});
}


function update() {

    getLikeCount(url, function (err, count) {
        logger.info("FB count: " + count);

        if (parseInt(count, 10) > 0)
        {
            dispText(count);
        }

        setTimeout(update, period);
    });

}


sp.open(function (error) {
  if ( error ) 
  {
    console.log('failed to open: ' + error);
  } 
  else 
  {
    console.log('open');
    
    disp([DISP_BRIGHTNESS, 10, DISP_CLEAR], function(err, results) {

        dispText("-00-", function () {
            
            setTimeout(function () {
               update();
            }, period);
        });

    });
  }
});




