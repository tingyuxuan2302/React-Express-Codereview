// 导出
module.exports = {
    parser: false,
    plugins: {
        autoprefixer: {
            browsers: ["last 4 version", 'Chrome 40', 'Firefox 15', 'iOS > 7'],
            remove: false
        }
    }
};