// function createArray<T>(length: number, value: T): Array<T> {
//     let result = [];
//     for (let i = 0; i < length; i++) {
//         result[i] = value;
//     }
//     return result;
// }
//
// createArray<string>(3, 'x');

// 多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}
swap([7, 'seven']);

// 泛型约束
interface LengthWise {
    length: number;
}
function loggingIdenttity<T extends LengthWise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// loggingIdenttity(7);

function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}
let x = {a: 1, b: 2, c: 3, d: 4};
copyFields(x, {b: 10, d: 20});

// 泛型接口
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    return false;
};

interface CreateArrayFunc  <T> {
    (length: number, value: T): Array<T>;
}
let createArray: CreateArrayFunc<any>;
createArray = function <T>(length: number, value: T): Array<T> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
};

// 泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};