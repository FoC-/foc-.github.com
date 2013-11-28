define(function () {
  var module = {};
  module.JSONP =  function( url, callback ) {
        var functionName = ( 'jsonp' + Math.random() * new Date() ).replace('.', '');
        var script = document.createElement('script');
        script.src = url + '?callback=' + functionName;
        document.body.appendChild( script );
        window[functionName] = function(data){
                if(callback){
                        callback( data );
                }
        };
  }; 
return module;
});
