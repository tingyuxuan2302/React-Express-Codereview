import { message } from 'antd';
import { browserHistory } from 'react-router';

module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        if (!req.session.user) {
            message.error('未登录')
            // return res.redirect('/signin')
            browserHistory.push('/login')
        }
        next()
    },

    checkNotLogin: function checkNotLogin(req, res, next) {
        if (req.session.user) {
            message.success('未登录');
            return res.redirect('back')// 返回之前的页面
        }
        next()
    }
}
