$(function () {

    // IIFE 背景 canvas 特效1
    (function backgroundCanvas() {
        var num = 100;  // 这里可以改数量
        var w = window.innerWidth;
        var h = window.innerHeight;
        var max = 100;
        var _x = 0;
        var _y = 0;
        var _z = 150;
        var dtr = function (d) {
            return d * Math.PI / 180;
        };

        var rnd = function () {
            return Math.sin(Math.floor(Math.random() * 360) * Math.PI / 180);
        };
        var dist = function (p1, p2, p3) {
            return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
        };

        var cam = {
            obj: {
                x: _x,
                y: _y,
                z: _z
            },
            dest: {
                x: 0,
                y: 0,
                z: 1
            },
            dist: {
                x: 0,
                y: 0,
                z: 200
            },
            ang: {
                cplane: 0,
                splane: 0,
                ctheta: 0,
                stheta: 0
            },
            zoom: 1,
            disp: {
                x: w / 2,
                y: h / 2,
                z: 0
            },
            upd: function () {
                cam.dist.x = cam.dest.x - cam.obj.x;
                cam.dist.y = cam.dest.y - cam.obj.y;
                cam.dist.z = cam.dest.z - cam.obj.z;
                cam.ang.cplane = -cam.dist.z / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
                cam.ang.splane = cam.dist.x / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
                cam.ang.ctheta = Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
                cam.ang.stheta = -cam.dist.y / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
            }
        };

        var trans = {
            parts: {
                sz: function (p, sz) {
                    return {
                        x: p.x * sz.x,
                        y: p.y * sz.y,
                        z: p.z * sz.z
                    };
                },
                rot: {
                    x: function (p, rot) {
                        return {
                            x: p.x,
                            y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
                            z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x))
                        };
                    },
                    y: function (p, rot) {
                        return {
                            x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
                            y: p.y,
                            z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y))
                        };
                    },
                    z: function (p, rot) {
                        return {
                            x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
                            y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
                            z: p.z
                        };
                    }
                },
                pos: function (p, pos) {
                    return {
                        x: p.x + pos.x,
                        y: p.y + pos.y,
                        z: p.z + pos.z
                    };
                }
            },
            pov: {
                plane: function (p) {
                    return {
                        x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
                        y: p.y,
                        z: p.x * -cam.ang.splane + p.z * cam.ang.cplane
                    };
                },
                theta: function (p) {
                    return {
                        x: p.x,
                        y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
                        z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta
                    };
                },
                set: function (p) {
                    return {
                        x: p.x - cam.obj.x,
                        y: p.y - cam.obj.y,
                        z: p.z - cam.obj.z
                    };
                }
            },
            persp: function (p) {
                return {
                    x: p.x * cam.dist.z / p.z * cam.zoom,
                    y: p.y * cam.dist.z / p.z * cam.zoom,
                    z: p.z * cam.zoom,
                    p: cam.dist.z / p.z
                };
            },
            disp: function (p, disp) {
                return {
                    x: p.x + disp.x,
                    y: -p.y + disp.y,
                    z: p.z + disp.z,
                    p: p.p
                };
            },
            steps: function (_obj_, sz, rot, pos, disp) {
                var _args = trans.parts.sz(_obj_, sz);
                _args = trans.parts.rot.x(_args, rot);
                _args = trans.parts.rot.y(_args, rot);
                _args = trans.parts.rot.z(_args, rot);
                _args = trans.parts.pos(_args, pos);
                _args = trans.pov.plane(_args);
                _args = trans.pov.theta(_args);
                _args = trans.pov.set(_args);
                _args = trans.persp(_args);
                _args = trans.disp(_args, disp);
                return _args;
            }
        };

        (function () {
            "use strict";
            var threeD = function (param) {
                this.transIn = {};
                this.transOut = {};
                this.transIn.vtx = (param.vtx);
                this.transIn.sz = (param.sz);
                this.transIn.rot = (param.rot);
                this.transIn.pos = (param.pos);
            };

            threeD.prototype.vupd = function () {
                this.transOut = trans.steps(
                    this.transIn.vtx,
                    this.transIn.sz,
                    this.transIn.rot,
                    this.transIn.pos,
                    cam.disp
                );
            };

            var Build = function () {
                this.vel = 0.04;
                this.lim = 360;
                this.diff = 200;
                this.initPos = 100;
                this.toX = _x;
                this.toY = _y;
                this.go();
            };

            Build.prototype.go = function () {
                this.canvas = document.getElementById("canv");
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
                this.$ = canv.getContext("2d");
                this.$.globalCompositeOperation = 'source-over';
                this.varr = [];
                this.dist = [];
                this.calc = [];

                for (var i = 0, len = num; i < len; i++) {
                    this.add();
                }

                this.rotObj = {
                    x: 0,
                    y: 0,
                    z: 0
                };
                this.objSz = {
                    x: w / 5,
                    y: h / 5,
                    z: w / 5
                };
            };

            Build.prototype.add = function () {
                this.varr.push(new threeD({
                    vtx: {
                        x: rnd(),
                        y: rnd(),
                        z: rnd()
                    },
                    sz: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    rot: {
                        x: 20,
                        y: -20,
                        z: 0
                    },
                    pos: {
                        x: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
                        y: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
                        z: this.diff * Math.sin(360 * Math.random() * Math.PI / 180)
                    }
                }));
                this.calc.push({
                    x: 360 * Math.random(),
                    y: 360 * Math.random(),
                    z: 360 * Math.random()
                });
            };

            Build.prototype.upd = function () {
                cam.obj.x += (this.toX - cam.obj.x) * 0.05;
                cam.obj.y += (this.toY - cam.obj.y) * 0.05;
            };

            Build.prototype.draw = function () {
                this.$.clearRect(0, 0, this.canvas.width, this.canvas.height);
                cam.upd();
                this.rotObj.x += 0.1;
                this.rotObj.y += 0.1;
                this.rotObj.z += 0.1;

                for (var i = 0; i < this.varr.length; i++) {
                    for (var val in this.calc[i]) {
                        if (this.calc[i].hasOwnProperty(val)) {
                            this.calc[i][val] += this.vel;
                            if (this.calc[i][val] > this.lim) this.calc[i][val] = 0;
                        }
                    }

                    this.varr[i].transIn.pos = {
                        x: this.diff * Math.cos(this.calc[i].x * Math.PI / 180),
                        y: this.diff * Math.sin(this.calc[i].y * Math.PI / 180),
                        z: this.diff * Math.sin(this.calc[i].z * Math.PI / 180)
                    };
                    this.varr[i].transIn.rot = this.rotObj;
                    this.varr[i].transIn.sz = this.objSz;
                    this.varr[i].vupd();
                    if (this.varr[i].transOut.p < 0) continue;
                    var g = this.$.createRadialGradient(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p, this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2);
                    this.$.globalCompositeOperation = 'lighter';
                    // 这里设置为只显示白球
                    g.addColorStop(0, 'hsla(0, 0%, 0%, 0.18)');
                    // g.addColorStop(.5, 'hsla(' + (i + 2) + ',85%, 40%,1)');
                    // g.addColorStop(1, 'hsla(' + (i) + ',85%, 40%,.5)');
                    this.$.fillStyle = g;
                    this.$.beginPath();
                    this.$.arc(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2, 0, Math.PI * 2, false);
                    this.$.fill();
                    this.$.closePath();
                }
            };
            Build.prototype.anim = function () {
                window.requestAnimationFrame = (function () {
                    return window.requestAnimationFrame ||
                        function (callback, element) {
                            window.setTimeout(callback, 1000 / 60);
                        };
                })();
                var anim = function () {
                    this.upd();
                    this.draw();
                    window.requestAnimationFrame(anim);
                }.bind(this);
                window.requestAnimationFrame(anim);
            };

            Build.prototype.run = function () {
                this.anim();

                window.addEventListener('mousemove', function (e) {
                    this.toX = (e.clientX - this.canvas.width / 2) * -0.8;
                    this.toY = (e.clientY - this.canvas.height / 2) * 0.8;
                }.bind(this));
                window.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                    this.toX = (e.touches[0].clientX - this.canvas.width / 2) * -0.8;
                    this.toY = (e.touches[0].clientY - this.canvas.height / 2) * 0.8;
                }.bind(this));
                // 点击增加事件
                window.addEventListener('mousedown', function (e) {
                    for (var i = 0; i < 100; i++) {
                        // this.add();
                    }
                }.bind(this));
                // 点击增加事件
                window.addEventListener('touchstart', function (e) {
                    e.preventDefault();
                    for (var i = 0; i < 100; i++) {
                        // this.add();
                    }
                }.bind(this));
            };
            var app = new Build();
            app.run();
        })();
        window.addEventListener('resize', function () {
            var canvas = document.getElementById('canv');
            canvas.width = w = window.innerWidth;
            canvas.height = h = window.innerHeight;
        }, false);
    })();

    // DOM
    var $tabSignInSignUp = $('#tabSignInSignUp');   // 登录注册tab栏
    var $tabItemSignIn = $('#tabItemSignIn');   // 登录tab
    var $tabItemSignUp = $('#tabItemSignUp');   // 注册tab
    var $signInSection = $('#signInSection');   // 登录区块
    var $signUpSection = $('#signUpSection');   // 注册区块

    if (title === '登录') {
        changeToSignIn();
    } else {
        changeToSignUp();
    }

    /**
     * 登录 tab 点击事件
     */
    $tabItemSignIn.on('click', function (e) {
        changeToSignIn();
    });

    /**
     * 注册 tab 点击事件
     */
    $tabItemSignUp.on('click', function (e) {
        changeToSignUp();
    });

    /**
     * 切换至登录
     */
    function changeToSignIn() {
        $('.tab .item').removeClass('selected');
        $tabItemSignIn.addClass('selected');
        $tabSignInSignUp.css('display', 'flex');
        $signInSection.css('display', 'block');
        $signUpSection.css('display', 'none');
    }

    /**
     * 切换至注册
     */
    function changeToSignUp() {
        $('.tab .item').removeClass('selected');
        $tabItemSignUp.addClass('selected');
        $tabSignInSignUp.css('display', 'flex');
        $signUpSection.css('display', 'block');
        $signInSection.css('display', 'none');
    }

    /**
     * 登录按钮
     */
    $('#btnSignIn').on('click', function () {
        console.log('登录');
        // 手机号
        var mobileNumber = $('#mobileNumberSignIn').val().trim();
        if (!regExpUtil.verifyMobileNumber(mobileNumber)) {
            Toast.show('手机号格式错误，请检查', 'error');
        }
        // 密码
        var password = $('#passwordSignIn').val();
        if (!password) {
            Toast.show('密码不能为空', 'error');
            return;
        }
        // 是否记住我，用来设置 cookie 过期时间
        var expires = 0; // cookie 过期时间
        var rememberMeChecked = $('#rememberMeCheckBox').prop('checked');
        console.log('rememberMeChecked', rememberMeChecked);
        if (rememberMeChecked) {
            expires = 30 * 24 * 60 * 60 * 1000;
        }
        // 登录
        signIn(mobileNumber, password, 'mobilePassword', expires);
    });

    /**
     * 注册按钮
     */
    $('#btnSignUp').on('click', function () {
        console.log('注册');
        // 手机号
        var mobileNumber = $('#mobileNumberSignUp').val().trim();
        if (!regExpUtil.verifyMobileNumber(mobileNumber)) {
            Toast.show('手机号格式错误，请检查', 'error');
            return;
        }
        // 密码
        var password = $('#passwordSignUp').val();
        if (!password) {
            Toast.show('密码不能为空', 'error');
            return;
        }
        // 再次输入密码
        var passwordAgain = $('#passwordAgainSignUp').val();
        if (!passwordAgain) {
            Toast.show('第二次输入的密码不能为空', 'error');
            return;
        }
        if (password !== passwordAgain) {
            Toast.show('两次输入的密码不一致', 'error');
            return;
        }
        // 注册
        signUp(mobileNumber, password, 'mobilePassword');
    });

    /**
     * 记住我按钮
     */
    var $rememberMeCheckBox = $('#rememberMeCheckBox');
    // 进入页面时进行判断
    if (localStorage.getItem(Constant.rememberMeChecked) === 'true') {
        $rememberMeCheckBox.prop('checked', true);
    }
    // 点击事件
    $rememberMeCheckBox.on('click', function () {
        // 存入 localStorage
        var rememberMeChecked = $rememberMeCheckBox.prop('checked');
        localStorage.setItem(Constant.rememberMeChecked, rememberMeChecked);
    });

    /**
     * 注册
     * @param identifier 标识
     * @param credential 凭证
     * @param identity_type 登录类型: 1.mobilePassword(手机号密码);
     */
    function signUp(identifier, credential, identity_type) {
        var data = {
            identifier: identifier,
            credential: credential,
            identity_type: identity_type
        };
        $.ajax({
            type: "POST",
            url: "/api/signup/",
            data: data,
            success: function (result, status, xhr) {
                console.log('注册 success', result);
                switch (result.errno) {
                    case 0:
                        Toast.show('注册成功', 'success');
                        break;
                    case 4:
                        Toast.show('该账号已被注册', 'error');
                        break;
                    default:
                        Toast.show('注册失败，' + result.errmsg, 'error');
                        break;
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
                Toast.show('注册失败' + error.errmsg, 'error');
            }
        });
    }

    /**
     * 登录
     * @param identifier 标识
     * @param credential 凭证
     * @param identity_type 登录类型: 1.mobilePassword(手机号密码);
     */
    function signIn(identifier, credential, identity_type, expires) {
        var data = {
            identifier: identifier,
            credential: credential,
            identity_type: identity_type,
            expires: expires
        };
        $.ajax({
            type: "POST",
            url: "/api/signin/",
            data: data,
            success: function (result, status, xhr) {
                console.log('登录 success', result);
                switch (result.errno) {
                    case 0:
                        Toast.show('登录成功', 'success');
                        break;
                    case 4:
                        Toast.show('登录失败，该用户未注册', 'error');
                        break;
                    case 5:
                        Toast.show('登录失败，凭证不一致，请检查', 'error');
                        break;
                    default:
                        Toast.show('登录失败，' + result.errmsg, 'error');
                        break;
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
                Toast.show('登录失败' + error.errmsg, 'error');
            }
        })
    }

});