module.exports = function(router, koaBody) {
  // 模拟数据返回 
  // 测试
  const testBack = require('./routes/upload');

  testBack(router, koaBody);
}