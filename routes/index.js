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

module.exports = router;
