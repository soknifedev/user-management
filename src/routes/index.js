import express    from 'express';
import requireDir from 'require-dir';

const router = express.Router();
router.fallbackVersion = 1;


const catch404 = (req, res, next) => {
  res.error(`Some of the aliases you requested do not exist: ${req.path}`, 404);
};

const versionDirectories = requireDir('./',
  {
    recurse:    true,
    extensions: ['.js'],
    filter:     (fullPath) => /v[0-9]+$/.test(fullPath)
  });

const versions = Object.keys(versionDirectories);

versions.forEach(async (version) => {
  const versionMatch = version.match(/^v([0-9]+)$/);

  if (versionMatch) {
    const apiVersion = parseInt(versionMatch[1], 10);

    console.log('Loading API version = ', apiVersion);
    const assert   = await import(`../middlewares/v${apiVersion}/assert`);
    const response = await import(`../middlewares/v${apiVersion}/response`);

    import('./autoloader.js').then((autoloaderJS) => {

      const autoloaderRouter   = autoloaderJS.default(apiVersion);
      const routePath = `/v${apiVersion}`;
  
      router.use(routePath, [ response.default, autoloaderRouter, catch404, assert.default ]);
      console.log('API', routePath, 'routes loaded');

      if (apiVersion === router.fallbackVersion) {
        router.use([ response.default, autoloaderRouter, catch404, assert.default ]);
        console.log('API', routePath, 'is used as fallback');
      }
    });

  } else {
    console.log('Could not find any route for API version "', version, '"');
  }
});

export default router;
