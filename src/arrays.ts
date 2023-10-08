function arrays() {
	let a = [1, 'a']; // (string|number)[]
	let b = []; // any[]

	function buildArray() {
		let a = [];
		a.push(1); // number[]
		a.push('a'); // (string|number)[]

		return a;
	}
	let pole = buildArray();
	// pole.push(true); // error

	let optionalTuple: [number, number?][] = [
		[1, 2],
		[3],
	];

	let restTuple: [string, ...string[]] = ['a', 'B', 'c'];

	let d = [1, 2 ,3];
	d.splice(0, 2)
	console.log(d); // [3]

	let readonlyArray: Readonly<number[]> = [1, 2, 3];
}

arrays();
