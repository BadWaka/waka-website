// abstract class Animal {
//     public name;
//
//     public constructor(name) {
//         this.name = name;
//     }
//
//     public abstract eat();
// }
//
// class Cat extends Animal {
//     public eat() {
//         console.log(`${this.name} is eating`);
//     }
// }
//
// let a = new Cat('Jack');
//
// // class Cat extends Animal {
// //     constructor(name) {
// //         super(name);
// //         console.log(this.name);
// //     }
// // }
// //
// // let a = new Animal('Jack');
// // console.log(a.name);
// // a.name = 'Tom';
// // console.log(a.name);

class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sayHi(): string {
        return `My name is ${this.name}`;
    }
}
let a: Animal = new Animal('Jack');
console.log(a.sayHi());