define(['jquery'], function() {
  var disqusElement = $('#disqus_thread');
  var disqus_shortname = disqusElement.data('disqus-shortname');
  var disqus_identifier = disqusElement.data('disqus-identifier');
  var disqus_url = disqusElement.data('disqus-url');
  require(['//' + disqus_shortname + '.disqus.com/embed.js', '//' + disqus_shortname + '.disqus.com/count.js']);
});
