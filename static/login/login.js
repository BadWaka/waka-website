$(function () {

    // var canvas = document.querySelector('canvas'),
    //     ctx = canvas.getContext('2d');
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // ctx.lineWidth = .3;
    // ctx.strokeStyle = (new Color(150)).style;
    //
    // var mousePosition = {
    //     x: 30 * canvas.width / 100,
    //     y: 30 * canvas.height / 100
    // };
    //
    // var dots = {
    //     nb: 200,    // 小球数量
    //     distance: 50,  // 连接线距离
    //     d_radius: 100,  // 连接线半径
    //     array: []
    // };
    //
    // // 颜色
    // function colorValue(min) {
    //     return Math.floor(Math.random() * 255 + min);
    // }
    //
    // function createColorStyle(r, g, b) {
    //     return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
    // }
    //
    // function mixComponents(comp1, weight1, comp2, weight2) {
    //     return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
    // }
    //
    // function averageColorStyles(dot1, dot2) {
    //     var color1 = dot1.color,
    //         color2 = dot2.color;
    //
    //     var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
    //         g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
    //         b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
    //     return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
    // }
    //
    // function Color(min) {
    //     min = min || 0;
    //     this.r = colorValue(min);
    //     this.g = colorValue(min);
    //     this.b = colorValue(min);
    //     this.style = createColorStyle(this.r, this.g, this.b);
    //     // 强制使用一种颜色
    //     this.style = createColorStyle(17, 157, 242);
    // }
    //
    // function Dot() {
    //     this.x = Math.random() * canvas.width;
    //     this.y = Math.random() * canvas.height;
    //
    //     this.vx = -.5 + Math.random();
    //     this.vy = -.5 + Math.random();
    //
    //     this.radius = Math.random() * 2;
    //
    //     this.color = new Color();
    //     // console.log(this);
    // }
    //
    // Dot.prototype = {
    //     draw: function () {
    //         ctx.beginPath();
    //         ctx.fillStyle = this.color.style;
    //         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    //         ctx.fill();
    //     }
    // };
    //
    // function createDots() {
    //     for (i = 0; i < dots.nb; i++) {
    //         dots.array.push(new Dot());
    //     }
    // }
    //
    // function moveDots() {
    //     for (i = 0; i < dots.nb; i++) {
    //
    //         var dot = dots.array[i];
    //
    //         if (dot.y < 0 || dot.y > canvas.height) {
    //             dot.vx = dot.vx;
    //             dot.vy = -dot.vy;
    //         }
    //         else if (dot.x < 0 || dot.x > canvas.width) {
    //             dot.vx = -dot.vx;
    //             dot.vy = dot.vy;
    //         }
    //         dot.x += dot.vx;
    //         dot.y += dot.vy;
    //     }
    // }
    //
    // function connectDots() {
    //     for (i = 0; i < dots.nb; i++) {
    //         for (j = 0; j < dots.nb; j++) {
    //             i_dot = dots.array[i];
    //             j_dot = dots.array[j];
    //
    //             if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
    //                 if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
    //                     ctx.beginPath();
    //                     ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
    //                     ctx.moveTo(i_dot.x, i_dot.y);
    //                     ctx.lineTo(j_dot.x, j_dot.y);
    //                     ctx.stroke();
    //                     ctx.closePath();
    //                 }
    //             }
    //         }
    //     }
    // }
    //
    // function drawDots() {
    //     for (i = 0; i < dots.nb; i++) {
    //         var dot = dots.array[i];
    //         dot.draw();
    //     }
    // }
    //
    // function animateDots() {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     moveDots();
    //     connectDots();
    //     drawDots();
    //
    //     requestAnimationFrame(animateDots);
    // }
    //
    // $('canvas').on('mousemove', function (e) {
    //     mousePosition.x = e.pageX;
    //     mousePosition.y = e.pageY;
    // });
    //
    // $('canvas').on('mouseleave', function (e) {
    //     mousePosition.x = canvas.width / 2;
    //     mousePosition.y = canvas.height / 2;
    // });
    //
    // createDots();
    // requestAnimationFrame(animateDots);

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
                g.addColorStop(0, 'hsla(255, 255%, 255%, 1)');
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
        canvas.width = w = window.innerWidth;
        canvas.height = h = window.innerHeight;
    }, false);
});