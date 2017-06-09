// // // // // // // // /**
// // // // // // // //  * 接口
// // // // // // // //  */
// // // // // // // // // function printLabel(labelledObj: {
// // // // // // // // //     label: string
// // // // // // // // // }) {
// // // // // // // // //     console.log(labelledObj.label);
// // // // // // // // // }
// // // // // // // // //
// // // // // // // // // let myObj = {
// // // // // // // // //     size: 10,
// // // // // // // // //     label: 'Size 10 Object'
// // // // // // // // // };
// // // // // // // // // printLabel(myObj);
// // // // // // // //
// // // // // // // // interface LabelledValue {
// // // // // // // //     label: string;
// // // // // // // // }
// // // // // // // //
// // // // // // // // function printLabel(labelledObj: LabelledValue) {
// // // // // // // //     console.log(labelledObj.label);
// // // // // // // // }
// // // // // // // //
// // // // // // // // let myObj = {
// // // // // // // //     size: 10,
// // // // // // // //     label: 'Size 10 Object'
// // // // // // // // };
// // // // // // // // printLabel(myObj);
// // // // // // // //
// // // // // // // // // 可选属性
// // // // // // // // interface SquareConfig {
// // // // // // // //     color?: string,
// // // // // // // //     width?: number
// // // // // // // // }
// // // // // // // //
// // // // // // // // function createSquare(config: SquareConfig): { color: string; area: number } {
// // // // // // // //     let newSquare = {color: 'white', area: 100};
// // // // // // // //     if (config.color) {
// // // // // // // //         newSquare.color = config.color;
// // // // // // // //     }
// // // // // // // //     if (config.width) {
// // // // // // // //         newSquare.area = config.width * config.width;
// // // // // // // //     }
// // // // // // // //     return newSquare;
// // // // // // // // }
// // // // // // // //
// // // // // // // // let mySquare = createSquare({
// // // // // // // //     color: 'black'
// // // // // // // // });
// // // // // // // //
// // // // // // // // // 只读属性
// // // // // // // // interface Point {
// // // // // // // //     readonly x: number;
// // // // // // // //     readonly y: number;
// // // // // // // // }
// // // // // // // //
// // // // // // // // let p1: Point = {
// // // // // // // //     x: 10,
// // // // // // // //     y: 20
// // // // // // // // };
// // // // // // // // // p1.x = 5;
// // // // // // // //
// // // // // // // // let a: number[] = [1, 2, 3, 4];
// // // // // // // // // let ro: ReadonlyArray<number> = a;
// // // // // // // // // ro[0] = 12;
// // // // // // // //
// // // // // // //
// // // // // // // interface SquareConfig {
// // // // // // //     color?: string;
// // // // // // //     width?: number;
// // // // // // //     [propName: string]: any // 最佳修改方式是添加一个字符串索引签名
// // // // // // // }
// // // // // // //
// // // // // // // function createSquare(config: SquareConfig): { color: string; area: number } {
// // // // // // //     let newSquare = {color: 'white', area: 100};
// // // // // // //     if (config.color) {
// // // // // // //         newSquare.color = config.color;
// // // // // // //     }
// // // // // // //     if (config.width) {
// // // // // // //         newSquare.area = config.width * config.width;
// // // // // // //     }
// // // // // // //     return newSquare;
// // // // // // // }
// // // // // // //
// // // // // // // // 使用类型断言绕过额外属性检查
// // // // // // // let mySquare = createSquare({
// // // // // // //     colour: 'red',
// // // // // // //     width: 100
// // // // // // // } as SquareConfig);
// // // // // //
// // // // // // // 函数类型
// // // // // // interface SearchFunc {
// // // // // //     (source: string, subString: string): boolean;
// // // // // // }
// // // // // //
// // // // // // let mySearch: SearchFunc;
// // // // // // // mySearch = function (source: string, subString: string) {
// // // // // // //     let result = source.search(subString);
// // // // // // //     if (result === -1) {
// // // // // // //         return true;
// // // // // // //     } else {
// // // // // // //         return false;
// // // // // // //     }
// // // // // // // };
// // // // // //
// // // // // // mySearch = function (src, sub) {
// // // // // //     let result = src.search(sub);
// // // // // //     if (result === -1) {
// // // // // //         return false;
// // // // // //     } else {
// // // // // //         return true;
// // // // // //     }
// // // // // // };
// // // // // //
// // // // //
// // // // // // 可索引的数据类型
// // // // // interface StringArray {
// // // // //     [index: number]: string;
// // // // // }
// // // // //
// // // // // let myArray: StringArray;
// // // // // myArray = ['Bob', 'Fred'];
// // // // //
// // // // // let myStr: string = myArray[0];
// // // //
// // // // // 索引类型的字符串和数字的返回值的类型必须一致
// // // // class Animal {
// // // //     name: string;
// // // // }
// // // //
// // // // class Dog extends Animal {
// // // //     breed: string;
// // // // }
// // // //
// // // // interface NotOkay {
// // // //     [x: number]: Animal;
// // // //     // [x: string]: Dog;
// // // // }
// // // //
// // // // interface NumberDictionary {
// // // //     [index: string]: number;
// // // //     length: number;
// // // //     name: string;   // 错误，`name`的类型不是索引类型的子类型
// // // // }
// // //
// // // // 类类型
// // // // interface ClockInterface {
// // // //     currentTime: Date;
// // // //     setTime(d: Date);
// // // // }
// // // //
// // // // class Clock implements ClockInterface {
// // // //     currentTime: Date;
// // // //
// // // //     setTime(d: Date) {
// // // //         this.currentTime = d;
// // // //     }
// // // //
// // // //     constructor(h: number, m: number) {
// // // //
// // // //     }
// // // // }
// // //
// // // interface ClockConstructor {
// // //     new (hour: number, minute: number): ClockInterface;
// // // }
// // // interface ClockInterface {
// // //     tick();
// // // }
// // // function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
// // //     return new ctor(hour, minute);
// // // }
// // //
// // // class DigitalClock implements ClockInterface {
// // //     constructor(h: number, m: number) {
// // //
// // //     }
// // //
// // //     tick() {
// // //         console.log('beep beep');
// // //     }
// // // }
// // //
// // // class AnalogClock implements ClockInterface {
// // //     constructor(h: number, m: number) {
// // //
// // //     }
// // //
// // //     tick() {
// // //         console.log('tick tick');
// // //     }
// // // }
// // //
// // // let digital = createClock(DigitalClock, 12, 17);
// // // let analog = createClock(AnalogClock, 7, 32);
// // //
// //
// // interface Shape {
// //     color: string;
// // }
// // interface PenStroke {
// //     penWidth: number;
// // }
// // interface Square extends Shape, PenStroke {
// //     sideLength: number;
// // }
// // let square = <Square>{};
// // square.color = 'blue';
// // square.sideLength = 10;
// // square.penWidth = 20;
//
// // 混合类型
// interface Counter {
//     (start: number): string;
//     interval: number;
//     reset(): void;
// }
// function getCounter(): Counter {
//     let counter = <Counter>function (start: number) {
//
//     };
//     counter.interval = 123;
//     counter.reset = function () {
//
//     };
//     return counter;
// }
// let c = getCounter();
// c(10);
// c.reset();
// c.interval = 5.0;

// 接口继承类
