function typeAlias() {
	type Age = number;
	let a: Age = 18;

	type Person = { name: string; age: Age };
	let john: Person = { name: 'john', age: 55 };

	// scope
	type Color = 'red';
	let x = Math.random() < .5;

	if (x) {
		type Color = 'blue'; // má v if bloku prioritu
		let b: Color = 'blue';
	} else {
		let c: Color = 'red';
		c = 'blue'; // error
	}
}

typeAlias();
