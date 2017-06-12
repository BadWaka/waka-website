// // // // function sayHello(person: string) {
// // // //     return 'Hello, ' + person;
// // // // }
// // // // let user = 'waka';
// // // // console.log(sayHello(user));
// // // //
// // // // let my: string | number | boolean;
// // // // my = 'seven';
// // // // my = 7;
// // // // my = true;
// // // //
// // // // function getLength(something: string | number): string {
// // // //     return something.toString();
// // // // }
// // // //
// // // // interface Person {
// // // //     name: string;
// // // //     age?: number;
// // // //     [propName: string]: any;
// // // // }
// // // // interface NumberArray {
// // // //     [index: number]: number;
// // // // }
// // // // let fi: NumberArray = [1, 2, 3, 4, 5];
// // //
// // // type EventName = 'click' | 'scroll' | 'mousemove';
// // // function handleEvent(ele: Element, event: EventName) {
// // //     // do something
// // // }
// // //
// // // handleEvent(document.getElementById('hello'), 'scroll');
// // // handleEvent(document.getElementById('world'), 'dbclick');
// //
// // let x: [string, number];
// // // x[0] = 'waka';
// // // x[1] = 25;
// // //
// // // x[0].slice(1);
// // // x[1].toFixed(2);
// //
// // x = ['waka', 1, '1111111111'];
// // console.log(x[2].slice(1));
//
// // enum Days {Sun=8, Mon=1.5, Tue, Wed, Thu, Fri, Sat}
// //
//
// // 常数枚举 外部枚举
// declare const enum Directions {
//     Up,
//     Down,
//     Left,
//     Right
// }
// let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
//
//
