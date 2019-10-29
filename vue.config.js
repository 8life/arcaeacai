// 这里是node的js语法,文件的引入不能使用es6 import
// 只能使用common.js  require
// 获取本地json文件
// var data = require('./data.json')
// var seller = data.seller
// var goods = data.goods
// var ratings = data.ratings
// 将需要修改webpack配置的对象通过module.exports公开出去
// TODO:如果真实开发请让你的api与公司的api保持一致,项目完成后打包上架时,不会打包此处的代码! 你项目中网络请求与公司提供的api不一致导致无法请求数据

module.exports = {
    devServer: {
        before(app) {
            app.get('/qwp',function(req,res){
                res.json('ab');
            })
        //     // 在服务器开始创建时声明当前本地服务
        //     // app代表服务器,get当前api为get请求,
        //     app.get('/ele/seller', function (req, res) {
        //         res.json({data: seller});
        //     });
        //     app.get('/ele/goods', function (req, res) {
        //         res.json({data: goods});
        //         // res.json 后台向前端返回json数据
        //     });
        //     app.get('/ele/ratings', function (req, res) {
        //         res.json({data: ratings});
        //     });
        },
        // 跨域api代理设置,TODO:跨域代理同样不会被打包到上架项目中,所以跨域api与真实服务保持一致

        proxy: {
            "/arcaea_rank": { // 当项目向/api开头的路径发送请求都会通过服务器代理访问target网站
                target: "https://redive.estertion.win", // 代理跳转的目标网站
                changeOrigin: true, // 代理跳转至指定的host
               //这是歌曲排行
            },
            // http://v2.api.dmzj.com/recommend.json
        }
    }
}