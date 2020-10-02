import express    from 'express';
import requireDir from 'require-dir';
import response   from '../middlewares/response';

const router = express.Router();
router.use(response);


Object.values(requireDir('./', 
    { 
      recurse: true, 
      extensions: ['.js'],
      filter: (fullPath) => /index\.js$|v[0-9]+$/.test(fullPath)
    })
  ).forEach(r => {
    for(let i in r) {
      let _route = r[i];
      let _routePath = `/v${_route.default.version}`;
      router.use(_routePath, _route.default);
      console.log('API', _routePath, 'routes loaded');
    }
  });

  
export default router;