var numbers = document.querySelectorAll('.number'),
	operators = document.querySelectorAll('.operator'),
	decimalBtn = document.getElementById('decim'),
	clearBtns = document.querySelectorAll('.clear-btn'),
	sqrtBtn = document.getElementById('sqrt'),
	display = document.getElementById('display'),
	MemoryCurrentNumber = 0,
	MemoryNewNumber = false,
	MemoryPendingOperation = '',

	resultBtn = document.getElementById('result');

for (var i = 0; i < numbers.length; i++) {
	var number = numbers[i];
	number.addEventListener('click', function (e) {
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

decimalBtn.addEventListener('click', decimal);

sqrtBtn.addEventListener('click', square);

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

	function square(){
		// if (MemoryPendingOperation === "√x"){
		// 	localOperationMemory = Math.sqrt(parseFloat(localOperationMemory));// doesn't work! why?
		// };
		var localSquareMemory = display.value;

		localSquareMemory = Math.sqrt(parseFloat(localSquareMemory));

		display.value = localSquareMemory;
	}
	
	
	function operation(op) {
		var localOperationMemory = display.value;
		
		if (MemoryNewNumber && MemoryPendingOperation !== '=') {
			display.value = MemoryCurrentNumber;
		} else {
			MemoryNewNumber = true;
			if (MemoryPendingOperation === '+') {
				MemoryCurrentNumber = (MemoryCurrentNumber *1000000 + parseFloat(localOperationMemory)*1000000 )/1000000;
			} else if (MemoryPendingOperation === '-') {
				MemoryCurrentNumber = (MemoryCurrentNumber *1000000 - parseFloat(localOperationMemory)*1000000 )/1000000;;
			} else if (MemoryPendingOperation === '*') {
				MemoryCurrentNumber = ((MemoryCurrentNumber *1000000) *( parseFloat(localOperationMemory)*1000000 ))/1000000000000;;
			} else if (MemoryPendingOperation === "/") {
				MemoryCurrentNumber = (MemoryCurrentNumber *1000000 / parseFloat(localOperationMemory)*1000000 )/1000000000000;;
			} else if (MemoryPendingOperation === "xy"){// how? why not<sup>?
				MemoryCurrentNumber = MemoryCurrentNumber ** parseFloat(localOperationMemory);
			}else {
				MemoryCurrentNumber = parseFloat(localOperationMemory);
			};
			display.value = MemoryCurrentNumber;
			MemoryPendingOperation = op;
		}
		console.log('Click on button with ' + op + '!');
	};

	function decimal() {
		console.log('Click on button decimal!');

		var localDecimalMemory = display.value;

		if (MemoryNewNumber) {
			localDecimalMemory='0.';
			MemoryNewNumber = false;
		} else {
			if(localDecimalMemory.indexOf('.')=== -1){
				
			localDecimalMemory+="."
			}
		}
		display.value = localDecimalMemory;
	};

	function clear(id) {
		console.log('Click on button ' + id + '!');

		if(id==='ce'){
			display.value = 0;
			MemoryNewNumber = true;
		} else if(id ==='c'){
			display.value = 0;
			MemoryNewNumber = true;
			MemoryCurrentNumber = 0;
			MemoryPendingOperation = '';
		}

	};
