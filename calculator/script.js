var numbers = document.querySelectorAll('.number'),
	operators = document.querySelectorAll('.operator'),
	decimalBtn = document.getElementById('decim'),
	clearBtns = document.querySelectorAll('.clear-btn'),
	display = document.getElementById('display'),
	MemoryCurrentNumber = 0,
	MemoryNewNumber = false,
	MemoryPendingOperation = '',

	resultBtn = document.getElementById('result');

for (var i = 0; i < numbers.length; i++) {
	var number = numbers[i];
	number.addEventListener('click', function (e) {
		//console.log(e)
		numberPress(e.srcElement.innerHTML)
	});

};

for (var i = 0; i < operators.length; i++) {
	var operationBtn = operators[i];
	operationBtn.addEventListener('click', function (e) {
		operation(e.target.textContent);
	})
};

for (var i = 0; i < clearBtns.length; i++) {
	var clearBtn = clearBtns[i];
	clearBtn.addEventListener('click', function (e) {
		clear(e.srcElement.id)
	})
};

// resultBtn.addEventListener('click', result);

decimalBtn.addEventListener('click', decimal);

function numberPress(number) {
	console.log('Click on button with ' + number + '!');
	if (MemoryNewNumber) {
		display.value = number;
		MemoryNewNumber = false;
	} else {
		if (display.value === '0') {
			display.value = number;
		} else {
			display.value += number;
		}
	}
	};

	function operation(op) {
		var localOperationMemory = display.value;

		if (MemoryNewNumber && MemoryPendingOperation !== '=') {
			display.value = MemoryCurrentNumber;
		} else {
			MemoryNewNumber = true;
			if (MemoryPendingOperation === '+') {
				MemoryCurrentNumber += parseFloat(localOperationMemory);
			} else if (MemoryPendingOperation === '-') {
				MemoryCurrentNumber -= parseFloat(localOperationMemory);
			} else if (MemoryPendingOperation === '*') {
				MemoryCurrentNumber *= parseFloat(localOperationMemory);
			} else if (MemoryPendingOperation === "/") {
				MemoryCurrentNumber /= parseFloat(localOperationMemory);
			} else {
				MemoryCurrentNumber = parseFloat(localOperationMemory);
			};
			display.value = MemoryCurrentNumber;
			MemoryPendingOperation = op;
		}
		console.log('Click on button with ' + op + '!');
	};

	function decimal() {
		console.log('Click on button decimal!');
	};

	function clear(id) {
		console.log('Click on button ' + id + '!');

	};

	// function result() {
	// 	console.log('Click on button result')
	// };