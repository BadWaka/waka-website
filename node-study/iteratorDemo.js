function makeIterator(array) {
    let nextIndex = 0;

    return {
        next: function () {
            return nextIndex < array.length ? {
                value: array[nextIndex++],
                done: false
            } : {
                done: true
            }
        }
    }
}

let it = makeIterator(['a', 'b', 'c', 'd']);
console.log(it.next().value, it.next().done);
console.log(it.next().value, it.next().done);
console.log(it.next().value, it.next().done);