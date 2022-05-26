const clr = ['#57D4BB', 'teal', 'green', '#006200'];
let arr = [];
let score = 0;
const scoreHTML = document.getElementById('score');
let wrap = document.getElementById('wrap');

wrap.style.lineHeight = '0';

for (let i = 0; i < 8; i++) {
	for (let k = 0; k < 8; k++) {
		let div = document.createElement('div');
		div.className = 'ball';
		div.style.border = '1px solid gray';
		div.style.width = '50px';
		div.style.height = '50px';
		div.style.display = 'table-cell';
		//div.style.borderRadius = '0px'
		//div.style.borderRadius = '10px'
		//div.style.borderRadius = '15px'
		//div.style.borderRadius = '20px'
		//div.style.borderRadius = '25px'
		div.style.borderRadius = '50%'
		div.style.background = clr[Math.floor(Math.random() * clr.length)];

		arr.push(div);
		wrap.appendChild(div);
	}
	wrap.appendChild(document.createElement('br'));
}

// & Up

let checkUp = function (bub, ind, chArr) {
	if (!arr[ind - 8]) {
		return;
	}

	if (bub.style.backgroundColor === arr[ind - 8].style.backgroundColor) {
		chArr.push(arr[ind - 8]);
		checkUp(arr[ind - 8], ind - 8, chArr);
	}
};

// & Down

let checkDown = function (bub, ind, chArr) {
	if (!arr[ind + 8]) {
		return;
	}

	if (bub.style.backgroundColor === arr[ind + 8].style.backgroundColor) {
		chArr.push(arr[ind + 8]);
		checkDown(arr[ind + 8], ind + 8, chArr);
	}
};

// & Left

let checkLeft = function (bub, ind, chArr, row) {
	var rowL = Math.floor((ind - 1) / 8) + 1;

	if (!arr[ind - 1] || row !== rowL) {
		return;
	}

	if (bub.style.backgroundColor === arr[ind - 1].style.backgroundColor) {
		chArr.push(arr[ind - 1]);
		checkLeft(arr[ind - 1], ind - 1, chArr, row);
	}
};

// & Right

let checkRight = function (bub, ind, chArr, row) {
	var rowL = Math.floor((ind + 1) / 8) + 1;

	if (!arr[ind + 1] || row !== rowL) {
		return;
	}

	if (bub.style.backgroundColor === arr[ind + 1].style.backgroundColor) {
		chArr.push(arr[ind + 1]);
		checkRight(arr[ind + 1], ind + 1, chArr, row);
	}
};

addEventListener('click', function (e) {
	if (e.target.className !== 'ball') {
		return;
	}

	let index = arr.indexOf(e.target);
	//console.log(index);

	let changeArr = [e.target];

	checkUp(e.target, index, changeArr);
	checkDown(e.target, index, changeArr);

	var row = Math.floor(index / 8) + 1;

	checkLeft(e.target, index, changeArr, row);
	checkRight(e.target, index, changeArr, row);

	if (changeArr.length >= 3) {
		changeArr.forEach((element) => {
			element.style.background = clr[Math.floor(Math.random() * clr.length)];
		});

		score += changeArr.length;
		scoreHTML.innerHTML = 'Score: ' + score;
	}

	var countComb = 0;

	arr.forEach((element) => {
		var index = arr.indexOf(element);

		var changeArr = [element];

		checkUp(element, index, changeArr);
		checkDown(element, index, changeArr);

		var row = Math.floor(index / 8) + 1;

		checkLeft(element, index, changeArr, row);
		checkRight(element, index, changeArr, row);

		if (changeArr.length >= 3) {
			countComb += 1;
		}
	});

	if (countComb < 1) {
		alert('Алилуя Алилуя ти виграв я задолбався рахувати : ' + score);
	}
});
