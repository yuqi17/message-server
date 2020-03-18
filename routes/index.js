var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };

  await ctx.render('index', {
  });
})

router.get('/foo', async function (ctx, next) {
  await ctx.render('index', {
    title: 'koa2 foo'
  });
});

router.put('/json', async function (ctx, next) {
   ctx.body = {
     name:'lishi'
   }
});

router.post('/json', async function (ctx, next) {
  console.log(ctx.request.body, ctx.request.query)
  ctx.body = {
    name:'zhangsan'
  }
});

module.exports = router;
