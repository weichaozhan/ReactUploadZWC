const Mock = require('mockjs');

module.exports = function (router) {
  router.post('/api/upload', async (ctx, next) => {
    const data = Mock.mock({
      'errorCode': null,
      'errorMsg': null,
      'success': true,
    });
    ctx.body = data;
    await next();
  });
}