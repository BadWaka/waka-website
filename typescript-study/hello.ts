// function sayHello(person: string) {
//     return 'Hello, ' + person;
// }
// let user = 'waka';
// console.log(sayHello(user));
//
// let my: string | number | boolean;
// my = 'seven';
// my = 7;
// my = true;
//
// function getLength(something: string | number): string {
//     return something.toString();
// }
//
// interface Person {
//     name: string;
//     age?: number;
//     [propName: string]: any;
// }
// interface NumberArray {
//     [index: number]: number;
// }
// let fi: NumberArray = [1, 2, 3, 4, 5];

type EventName = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventName) {
    // do something
}

