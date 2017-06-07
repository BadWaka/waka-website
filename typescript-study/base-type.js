// 布尔值
var isDone = false;
// 数字
var decLiteral = 6;
var hexLiteral = 0xf00d;
var binaryLiteral = 10;
var octalLiteral = 484;
// 字符串
var name1 = 'bob';
name1 = 'smith';
// 模板字符串
var name2 = "Gene";
var age = 37;
var sentence = "Hello,my name is " + name2 + ".\nI'll be " + (age + 1) + " years old next month.";
// 数组
var list = [1, 2, 3];
var list2 = [1, 2, 3];
// 元祖 Tuple
var x;
x = ['hello', 10];
// x = [10, 'hello'];
console.log(x[0].substr(1));
// console.log(x[1].substr(1));
x[3] = 'world';
console.log(x[3].toString());
// x[6] = true;
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log(c);
var colorName = Color[2];
console.log('colorName', colorName);
// 任意值
var notSure = 4;
notSure = 'maybe a string instead';
notSure = false;
// notSure.ifItExists();
// notSure.toFixed();
var prettySure = 4;
// prettySure.toFixed();
var list3 = [1, true, 'free'];
list3[1] = 100;
