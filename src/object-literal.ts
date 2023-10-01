function objectLiteral() {
	let a: object = { b: "x" };
	console.log(a.b); // error
	a = 1; // error

	let b: {};
	b = 1; // ok
	b = 'a'; // ok
	b = null; // error
	b = undefined; // error
}

objectLiteral();
