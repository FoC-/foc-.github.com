require.config({
  baseUrl: '/js',
  paths: {
    'jquery': 'jquery-2.0.3.min',
    'bootstrap': 'bootstrap.min',
    'ga': 'google-analytics',
    'resume': 'resume/page'
  },
  shim: {
    'jquery': {
      export: '$'
    },
    'bootstrap': ['jquery'],
  }
});