var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    //Part 1:
    if (query['cmd'] == 'repeat')
    {
      console.log("Handling a request");
      console.log(query);
      //var word = query['word'];
      //var i;
      for (var i = 0; i < query['word'].length; i++)
      {
            res.write('<pre>'+query['word']+'</pre>');
      }
      res.end('');
    }
    
    //part 2:
    if (query['cmd'] == 'dotted')
    {
      console.log("Handling a request");
      console.log(query);
      var word1 = query['word1'];
      res.write('<pre>'+ query['word1']);
      var word2 = query['word2'];
      var total = (query['word1'].length+query['word2'].length);
      for (i = 30; i > total; i--)
      {
        res.write('.');
      }
      res.write(query['word2']+'</pre>');
      
      res.end('');
    }
    
    //part 3:
    if (query['cmd'] == 'stats')
    {
      console.log("Handling a request");
      console.log(query);
      //var num = query['grades'].length;
      var max = 0;
      var min = 1000;
      var avg = 0;
      for (var i in query['grades'])
      {
        //max
        if (max < query['grades'][i])
        {
          max = query['grades'][i];
        }
        //min
        if (min > query['grades'][i])
        {
          min = query['grades'][i];
        }
        //average
        avg = avg + parseInt(query['grades'][i]);
        
      }
      avg = avg/query['grades'].length;
      res.write('<pre>Avg: '+avg+' | Min: '+min+' | Max: '+max+'</pre>');
      
      res.end('');
    }
    
    
    else
    {
      res.end('');
    }
}