var numbers = document.querySelectorAll('.number'),
	operators = document.querySelectorAll('.operator'),
	decimalBtn = document.getElementById('decim'),
	clearBtns = document.querySelectorAll('.clear-btn'),
	sqrtBtn = document.getElementById('sqrt'),
	backBtn = document.getElementById('back'),
	signBtn = document.getElementById('sign'),

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

backBtn.addEventListener('click', back);

signBtn.addEventListener('click', sign);

function numberPress(number) {
	console.log('Click on button with ' + number + '!');
	ErrProof()

	if (MemoryNewNumber) {
		display.value = number;
		MemoryNewNumber = false;
	} else {
		if (display.value === '0' ) {
			display.value = number;
		}else if(display.value === '-0' ) {
			display.value = '-' + number;
		} else {
			display.value += number;
		}
	}
	};

	function square(){

		ErrProof()

		var localSquareMemory = display.value;
		if(localSquareMemory < 0){
			display.value = 'Error: must be positive number';
			display.style ="color:red; font-size:25px; background-color: #933; ";
			
		} else {

		localSquareMemory = Math.sqrt(parseFloat(localSquareMemory));
		display.value = localSquareMemory;
		}
	}

	function back(){
		ErrProof()
		
		var localBackMemory = display.value;
			if(localBackMemory.length == 2 && localBackMemory[0] == '-' ){
				display.value = 0;
			} else if(localBackMemory.length != 1){
				display.value = localBackMemory.slice(0,-1);
			} else if(localBackMemory.length != '0'){
				display.value = 0;
			}  

	}

	function sign(){
		ErrProof()

		var localSignMemory = display.value;
		if(localSignMemory[0] != '-'){
			display.value = '-' + localSignMemory;
	} else {
		display.value = localSignMemory.slice(1);
	}
	}
	
	
	function operation(op) {
		ErrProof()

		var localOperationMemory = display.value;
	
		if (MemoryNewNumber && MemoryPendingOperation != '=') {
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
			if(isNaN(MemoryCurrentNumber)){
				display.value = 'Error: not possible';
				display.style ="color:red; font-size:25px; background-color: #933; ";
				
			} else {

			display.value = MemoryCurrentNumber;
			MemoryPendingOperation = op;}
		}
		console.log('Click on button with ' + op + '!');
	};

	function decimal() {
		console.log('Click on button decimal!');
		ErrProof()

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
		ErrProof()

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

	function ErrProof(){
		if (display.value =="Error: must be positive number" || display.value =="Error: not possible"){
			display.value = 0;
			MemoryNewNumber = true;
			MemoryCurrentNumber = 0;
			MemoryPendingOperation = '';
			display.style ="background-color: #02471c; color: rgb(7, 197, 7);font-size: 40px; "
			
		}
	}
