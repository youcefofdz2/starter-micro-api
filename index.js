const http = require('http');
const request = require('request');
const url = require('url');
const { parse } = require('querystring');


const PORT = process.env.PORT || 3000;
//const PORT = 8080;
const server = http.createServer((request_data, res) => {
	
	
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
 // res.end('Hello World\n');
  
setInterval(function() {
res.write('run! ');
}, 2000); 
try {
 
if (request_data.method == 'POST') {

 var body = ''
    request_data.on('data', function(data){
      body += data
    })
    request_data.on('end', function() {
	    
    var data_full = parse(body);
	    
    var post_url =  data_full.post_url;
    var post_header =  data_full.post_header;
    var post_data= data_full.post_data;
	//post_data= post_data.replaceAll(';:;', '&');
 	    
if(post_data == ""){post_data = "{}";}
const post_full = JSON.parse(post_data);
 
	    
if(post_header == ""){post_header = "{}";}	    
const  header_full = JSON.parse(post_header);
	    
var method = 'get';
if(post_data !== ""){method = 'post';}
	    
 res.write("method="+method);
 res.write(" / post_data="+post_data);
	    
if(post_url !== ""){
request({
   url: post_url,
   form: post_full,
   headers: header_full,
   method: method
  },
  function (e, r, body) {
      //console.log(body);
	 var header0 = r.headers;
	 var statusCode0 = r.statusCode
	 header0 = JSON.stringify(header0);
	 res.write(";:;"+statusCode0+";:;"+header0+";:;");
	 res.end(body);
	  //process.exit();
  });
  }else{
   res.end("dane!");
  }  
	    
   // res.end('post = '+post_url+post_header+post_data)
    })


}else{
	
var html = `
            <html>
                <body>
                    <form method="post" action="?">
		    <input type="text" name="post_url" /><br>
                    <textarea rows="4" cols="50" name="post_header"></textarea>
		    <textarea rows="4" cols="50" name="post_data"></textarea>
                        <input type="submit" value="Submit" />
                    </form>
                </body>
            </html>`
res.end(html)
}
}
catch (e){
 res.end("catch error!"); 
}
  
});
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});
