require.config({
    baseUrl: '/js',
    paths: {
        'jquery': 'jquery-2.0.3.min',
        'bootstrap': 'bootstrap.min',
        'ga': 'google-analytics'
    },
    shim: {
        'jquery': { export: "$" },
        "bootstrap": ["jquery"]
    }
});

require(['jquery','utils','bootstrap', 'ga'], function($,utils) {
    $(function() {
      var template = '<a href="{url}" target="_blank"><img src="http://{domain}/favicon.ico" alt="{display}" height="20"></a>';
      utils.JSONP('http://www.gravatar.com/'+$('#social-buttons').data('gravatar-hash') +'.json', function(data) {
        var accounts = data.entry[0].accounts || [];
        accounts[accounts.length] = { url: 'https://github.com/FoC-', domain: 'github.com', display: 'github.com'};
        accounts[accounts.length] = { url: 'http://stackoverflow.com/users/1095657/foc', domain: 'stackoverflow.com', display: 'stackoverflow.com'};
        accounts[accounts.length] = { url: 'https://bitbucket.org/nickola_kush', domain: 'bitbucket.org', display: 'bitbucket.org'};

        $.each(accounts, function() {
          var html = template.replace('{url}', this.url)
          .replace('{domain}', this.domain)
          .replace('{display}', this.display);
          $("#social-buttons").append(html);
  });
});
});
});
