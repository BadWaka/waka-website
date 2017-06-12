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
var Animal = (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.sayHi = function () {
        return "My name is " + this.name;
    };
    return Animal;
}());
var a = new Animal('Jack');
console.log(a.sayHi());
