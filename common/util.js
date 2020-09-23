/**
 * 数组拍平
 * @param {Array} arr 拍平前的数组
 * @return {Array} 
 */
export const myFlat = arr => {
    while (arr.some(t => Array.isArray(t))) {
        arr = [].concat.apply([], arr);
    }
    return arr;
}

/**
 * 截流函数
 * @param {Function} fn 回调函数
 * @param {Number} delay 延迟毫秒数
 * @param {Number} mustRunDelay 延迟多少毫秒，强制执行一下
 */
export function throttle(fn, delay, mustRunDelay) {
    let timer = null,
        start; // 开始触发回调的时间
    return function() {
        let context = this, // 保留上下文this
            args = arguments, // 储存参数
            current = +new Date(); // 触发回调的当前时间戳
        clearTimeout(timer); // 清空延时器
        if (!start) {
            start = current;
        }
        // 如果操作的时间差小于设置的强行触发时间，则重新设定延时器
        if (current - start < mustRunDelay) {
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, delay);
        } else {
            // 如果操作的时间差大于设置的强行触发时间，则强行触发回调
            fn.apply(context, args);
            start = current;
        }
    };
}

/**
 * debounce 防抖函数
 * @Author   bangyao.chen@ttpai.cn
 * @DateTime 2018-09-04T17:11:45+0800
 * @param    {Function}               fn     回调函数
 * @param    {Number}                 delay  延迟毫秒数
 * @return   {Function}                      回调函数
 */
export function debounce(fn, delay) {
    let timer = null;
    return function () {
        let context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.call(context, context, args)
        }, delay);
    }
}

/**
 * 判断数据类型
 * @param {String} type 数据类型（大写开头的数据类型） 
 */
export const judgeType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);