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
}

functions();
