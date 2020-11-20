import 'express-async-errors';

import assert     from 'assert';
import express    from 'express';
import fs from 'fs';
import requireDir from 'require-dir';

const loader = (version) => {
  const router = express.Router();

  router.version = parseInt(version, 10);
  router.versionPath = `${__dirname}/v${router.version}`;
  assert(router.version, 'Version must be specified before autoloading routes.');
  assert(fs.existsSync(router.versionPath), `Could not find routes for version ${router.version} in ${router.versionPath}`);



  const routesFiles = requireDir(router.versionPath,
    {
      recurse:    true,
      extensions: ['.js']
    });
  
  const routes = Object.values(routesFiles).map((r) => r.default);

  routes.forEach((route) => {
    if(route !== undefined) {
      router.use(route.options.prefix, route);
      console.log('API resource', `/v${router.version + route.options.prefix}`, 'loaded');
  }
  });
  return router;
};

export default loader;
