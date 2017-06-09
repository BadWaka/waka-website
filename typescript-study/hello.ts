function sayHello(person: string) {
    return 'Hello, ' + person;
}
let user = 'waka';
console.log(sayHello(user));

let my: string | number | boolean;
my = 'seven';
my = 7;
my = true;

function getLength(something: string | number): string {
    return something.toString();
}