function definitiveAssignment() {
	let a: number;
	a = 1; //ok
	a = "x"; //error

	let b: number;
	let c = b * 3; //error
}

definitiveAssignment();
