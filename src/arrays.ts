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
	pole.push(true); // error
}

arrays();
