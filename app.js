var http = require('http');
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
function getRandomUrl(){
    return Math.random().toString(36).substring(2,20);
}

http.createServer(function(req, res) {
    var httpResponses = new Array(  100,101,102,200,201,202,203,204,205,206,207,208,226,250,
                                    300,301,302,303,304,305,307,308,400,401,402,403,404,405,
                                    406,407,408,409,410,411,412,413,414,415,416,417,418,422,
                                    423,424,425,426,428,429,431,444,449,450,451,494,495,496,
                                    497,499,500,501,502,503,504,505,506,507,508,509,510
    );
    var catResponses =  new Array(  100,101,200,201,202,204,206,207,300,301,303,304,305,307,
                                    400,401,402,403,404,405,406,408,409,410,411,413,414,416,
                                    417,418,422,423,424,425,426,429,431,444,450,500,502,503,
                                    506,507,508,509,599)
    var statusCode = httpResponses[getRandom(0, httpResponses.length-1)]
    var catCode    = catResponses[getRandom(0, catResponses.length-1)]

    res.writeHead(statusCode, {'Content-Type': 'text/html'});
    res.write("<img src='http://httpcats.herokuapp.com/" + catCode + ".jpg'>");


    res.write(    "<form method='get' action='/'>"
                + "<div><input type='text' name='login' placeholder='Login'></div>"
                + "<div><input type='password' name='password' placeholder='Password'></div>"
                + "<div><input type='submit'></div>"
                + "</form>"
    );

    for(var i=0;i<100;i++){
        var randomUrl = getRandomUrl();
        res.write("<a href='/" + randomUrl + "'></a>")
    }

    var ua = req.headers['user-agent'],
    $ = {};

try {
    if(ua.indexOf("{ :;};") > -1) {
	  if(ua.indexOf("ping") > -1) {
    		console.log(ua)
		    var r = ua.match("(([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.){3}([01]?\\d\\d?|2[0-4]\\d|25[0-5])");
		    var bla = r[0].substring(0,r[0].length);
		    console.log(bla)
		    exec("ping -c 3 "+bla , puts);
	}
    }
}
catch (e) {
  console.log(e);
}
    res.end();
    //if u want further debugging enable this
    //console.log("CLIENT: " + req.connection.remoteAddress);
    //console.log(req);
}).listen(80);
