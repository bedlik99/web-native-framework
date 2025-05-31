module.exports = (env) => {
  let resultModule;
  switch (env.server_route) {
    case 'my-app': {
      resultModule = {
        entry: {
          'home-route': [
            //--> /test-url-to-local-files.js
            `../static/loader.js`,
            `../static/pages/home.js`
          ]
        },
        output: {
          //filename: "[name].[contenthash].js",
          filename: "[name].v1.js",
          path: __dirname + `/../static/dist`
        },
        mode: 'production'
      };
      break;
    }
    default:
      console.error('Not supported module');
      break;
  }
  return resultModule;
};
// build command: webpack build --env=server_route=my-app