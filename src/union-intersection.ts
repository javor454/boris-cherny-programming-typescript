function unionIntersection() {
	type A = { a: number; x: string };
	type B = { b: boolean; x: string };
	type Union = A | B;
	type Intersection = A & B;

	let a: Union = { a: 1, x: 'x' };
	a = { b: true, x: 'x' };
	a = { a: 1, b: true, x: 'x' };

	let b: Intersection = { a: 1, b: true, x: 'x'};
}

unionIntersection();
