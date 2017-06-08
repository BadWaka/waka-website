/**
 * 基础类型
 */

// 布尔值
let isDone: boolean = false;

// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

// 字符串
let name1: string = 'bob';
name1 = 'smith';

// 模板字符串
let name2: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello,my name is ${name2}.
I'll be ${age + 1} years old next month.`;

// 数组
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// 元祖 Tuple
let x: [string, number];
x = ['hello', 10];
// x = [10, 'hello'];
console.log(x[0].substr(1));
// console.log(x[1].substr(1));
x[3] = 'world';
console.log(x[3].toString());
// x[6] = true;

// 枚举
enum Color {Red = 1, Green = 2, Blue = 3}
let c: Color = Color.Green;
console.log(c);
let colorName: string = Color[2];
console.log('colorName', colorName);

// 任意值
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false;
// notSure.ifItExists();
// notSure.toFixed();

let prettySure: Object = 4;
// prettySure.toFixed();

let list3: any[] = [1, true, 'free'];
list3[1] = 100;

// 空值
function warnUser(): void {
    alert('This is my warning message');
}

let unusable: void = undefined;

// Null Undefined
let u: undefined = undefined;
let n: null = null;

// Never
function error(message: string): never {
    throw new Error(message);
}

function fail() {
    return error('Something failed');
}

function infiniteLoop(): never {
    while (true) {
    }
}

// 类型断言

// 尖括号语法
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;

// as 语法
let someValue2: any = 'this is a string';
let strLength2: number = (someValue as string).length;