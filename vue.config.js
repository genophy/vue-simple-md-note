module.exports = {
  devServer:{
    proxy: {
      '/api/': {
        'target'    : 'http://520space.com:5000',
        changeOrigin: true,
        'secure'    : false,
      },
    },
  }

};
