// // // // /**
// // // //  * 接口
// // // //  */
// // // // // function printLabel(labelledObj: {
// // // // //     label: string
// // // // // }) {
// // // // //     console.log(labelledObj.label);
// // // // // }
// // // // //
// // // // // let myObj = {
// // // // //     size: 10,
// // // // //     label: 'Size 10 Object'
// // // // // };
// // // // // printLabel(myObj);
// // // //
// // // // interface LabelledValue {
// // // //     label: string;
// // // // }
// // // //
// // // // function printLabel(labelledObj: LabelledValue) {
// // // //     console.log(labelledObj.label);
// // // // }
// // // //
// // // // let myObj = {
// // // //     size: 10,
// // // //     label: 'Size 10 Object'
// // // // };
// // // // printLabel(myObj);
// // // //
// // // // // 可选属性
// // // // interface SquareConfig {
// // // //     color?: string,
// // // //     width?: number
// // // // }
// // // //
// // // // function createSquare(config: SquareConfig): { color: string; area: number } {
// // // //     let newSquare = {color: 'white', area: 100};
// // // //     if (config.color) {
// // // //         newSquare.color = config.color;
// // // //     }
// // // //     if (config.width) {
// // // //         newSquare.area = config.width * config.width;
// // // //     }
// // // //     return newSquare;
// // // // }
// // // //
// // // // let mySquare = createSquare({
// // // //     color: 'black'
// // // // });
// // // //
// // // // // 只读属性
// // // // interface Point {
// // // //     readonly x: number;
// // // //     readonly y: number;
// // // // }
// // // //
// // // // let p1: Point = {
// // // //     x: 10,
// // // //     y: 20
// // // // };
// // // // // p1.x = 5;
// // // //
// // // // let a: number[] = [1, 2, 3, 4];
// // // // // let ro: ReadonlyArray<number> = a;
// // // // // ro[0] = 12;
// // // //
// // //
// // // interface SquareConfig {
// // //     color?: string;
// // //     width?: number;
// // //     [propName: string]: any // 最佳修改方式是添加一个字符串索引签名
// // // }
// // //
// // // function createSquare(config: SquareConfig): { color: string; area: number } {
// // //     let newSquare = {color: 'white', area: 100};
// // //     if (config.color) {
// // //         newSquare.color = config.color;
// // //     }
// // //     if (config.width) {
// // //         newSquare.area = config.width * config.width;
// // //     }
// // //     return newSquare;
// // // }
// // //
// // // // 使用类型断言绕过额外属性检查
// // // let mySquare = createSquare({
// // //     colour: 'red',
// // //     width: 100
// // // } as SquareConfig);
// //
// // // 函数类型
// // interface SearchFunc {
// //     (source: string, subString: string): boolean;
// // }
// //
// // let mySearch: SearchFunc;
// // // mySearch = function (source: string, subString: string) {
// // //     let result = source.search(subString);
// // //     if (result === -1) {
// // //         return true;
// // //     } else {
// // //         return false;
// // //     }
// // // };
// //
// // mySearch = function (src, sub) {
// //     let result = src.search(sub);
// //     if (result === -1) {
// //         return false;
// //     } else {
// //         return true;
// //     }
// // };
// //
//
// // 可索引的数据类型
// interface StringArray {
//     [index: number]: string;
// }
//
// let myArray: StringArray;
// myArray = ['Bob', 'Fred'];
//
// let myStr: string = myArray[0];
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 索引类型的字符串和数字的返回值的类型必须一致
var Animal = (function () {
    function Animal() {
    }
    return Animal;
}());
var Dog = (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
