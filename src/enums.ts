enum A {
	Prvni = 1,
	Druhy = 2,
	Ctvrty = 'ctvrty',
}
enum A {
	Treti = 6,
}
const enum B {
	Buddy
}

function test(b: B) {
	return 'done';
}

function enums() {
	console.log(Object.values(A))
	console.log(A[6]); // Treti
	console.log(A[3]); // Treti
	//console.log(B[0]); // error
	console.log(test(B.Buddy));
	// console.log(test('Buddy')); // error
	let a = null; // any
}

enums();
