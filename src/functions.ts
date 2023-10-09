function a(par: number) {
	return par + 1;
}
let a2 = function (par: number) {
	return par + 1;
}
let a3 = (par: number) => {
	return par + 1;
}
let a4 = (par: number) => par + 1;
let a5 = new Function('par', 'return par + 1');



function functions() {
	console.log(a5(5));

	let sum = (): number => Array.from(arguments).reduce((total, n) => total + n, 0);
	// sum(1,2,3); // TS error

	console.log(a(1));
	console.log(a.apply(null, [1]));
	console.log(a.call(null, 1));
	console.log(a.bind(null, 1)());

	let x = { a() { return this; }};
	console.log(x.a()); // this = x
	let b = x.a;
	console.log(b()); // this = undefined

	function c(this: number): number {
		return this.valueOf();
	}

	console.log(c.call(5));

	function* createFibonacciGenerator(): IterableIterator<number> {
		let a = 0;
		let b = 1;
		while (true) {
			yield a;
			[a, b] = [b, a + b];
		}
	}
	let gen = createFibonacciGenerator();
	console.log(gen.next()); // { value: 0, done: false }
	console.log(gen.next()); // { value: 1, done: false }
	console.log(gen.next()); // { value: 1, done: false }
	console.log(gen.next()); // { value: 2, done: false }
	console.log(gen.next()); // { value: 3, done: false }
	console.log(gen.next()); // { value: 5, done: false }
}

functions();
