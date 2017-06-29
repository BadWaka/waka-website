/**
 * 全局 JS
 */

/**
 * 封装一个 Toast 组件
 * 因为需要用到 .addClass() 和 .removeClass() 方法，引入 jQuery
 */
var Toast = {
    // 隐藏的 setTimeOut 引用
    hideTimeOut: null,
    /**
     * 初始化
     */
    init: function () {
        var toastNode = document.createElement('section');
        toastNode.innerHTML = '<i class="iconfont icon-success"></i><i class="iconfont icon-error"></i><span class="text">111</span>';
        toastNode.id = 'toastWaka'; // 设置id，一个页面有且仅有一个Toast
        toastNode.setAttribute('class', 'toast animated');   // 设置类名 依赖于 animate.css
        toastNode.style.display = 'none';   // 设置隐藏
        document.body.appendChild(toastNode);
    },
    /**
     * 显示Toast
     * @param text 文本内容
     * @param type 类型 success error
     * @param duration 持续时间
     */
    show: function (text, type, duration) {
        // 确保上一次的 TimeOut 已被清空
        if (this.hideTimeOut) {
            clearTimeout(this.hideTimeOut);
            this.hideTimeOut = null;
        }
        if (!text) {
            console.error('text 不能为空!');
            return;
        }
        var domToastWaka = document.getElementById('toastWaka');
        if (!domToastWaka) {
            console.error('toastWaka DOM 不存在!');
            return;
        }
        var domIconSuccess = domToastWaka.querySelector('.icon-success');   // 成功图标
        var domIconError = domToastWaka.querySelector('.icon-error');   // 错误图标
        var domToastText = domToastWaka.querySelector('.text');   // 文字
        domToastText.innerHTML = text || '';
        switch (type) {
            case 'success':
                domIconSuccess.style.display = 'inline';
                domIconError.style.display = 'none';
                break;
            case 'error':
                domIconSuccess.style.display = 'none';
                domIconError.style.display = 'inline';
                break;
            default:
                domIconSuccess.style.display = 'none';
                domIconError.style.display = 'none';
                break;
        }
        domToastWaka.style.display = 'block';
        var $toastWaka = $('#toastWaka');
        $toastWaka.removeClass('fadeOutUp');
        $toastWaka.addClass('fadeInDown');
        // 不传的话默认2s
        var that = this;
        this.hideTimeOut = setTimeout(function () {
            $toastWaka.removeClass('fadeInDown');
            $toastWaka.addClass('fadeOutUp');
            that.hideTimeOut = null;    // 置 TimeOut 引用为空
        }, duration || 2000);
    },
    /**
     * 隐藏 Toast
     */
    hide: function () {
        // 如果 TimeOut 存在
        if (this.hideTimeOut) {
            // 清空 TimeOut 引用
            clearTimeout(this.hideTimeOut);
            this.hideTimeOut = null;
        }
        var domToastWaka = document.getElementById('toastWaka');
        if (domToastWaka) {
            domToastWaka.style.display = 'none';
        }
    }
};

/**
 * 正则工具
 */
var regExpUtil = {
    /**
     * 校验手机号
     * @param mobileNumber
     * @return {boolean}
     */
    verifyMobileNumber: function (mobileNumber) {
        return /^1[34578]\d{9}$/.test(mobileNumber);
    },
    /**
     * 校验邮箱
     * @param email
     * @return {boolean}
     */
    verifyEmail: function (email) {
        return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email);
    }
};

$(function () {

    // 初始化 Toast
    Toast.init();

});