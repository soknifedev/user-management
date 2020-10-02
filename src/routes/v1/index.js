import express    from 'express';
import requireDir from 'require-dir';


const router = express.Router();
router.version = 1;

Object.values(requireDir(`./`, { recurse: true, extensions: ['.js']  }))
  .forEach(r => {
    for(let i in r) {
      let _route = r[i];
      let _routePath = `/v${router.version + _route.default.options.prefix}`;
      router.use(_route.default.options.prefix, _route.default);
      console.log('API resource', _routePath, 'loaded');
    }
  });

  
export default router;