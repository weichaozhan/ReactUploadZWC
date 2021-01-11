const Mock = require('mockjs');
const { resolve } = require('path');

module.exports = function (router) {
  router.post('/api/upload', async (ctx, next) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    })
      .then(() => {
        const data = Mock.mock({
          'errorCode': null,
          'errorMsg': null,
          'success': true,
        });
        ctx.body = data;
        next();
      });
  });
}