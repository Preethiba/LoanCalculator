document.getElementById("loanForm").addEventListener("submit",function(e){
//hide results
document.getElementById('results').style.display = 'none';

//show loading
document.getElementById('loading').style.display = 'block';

setTimeout(calculateResults,2000);

e.preventDefault();
});

function calculateResults(){
//UI vars
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	const monthlyPayment = document.getElementById('monthlyPayment');
	const totalPayment = document.getElementById('totalPayment');
	const totalInterest = document.getElementById('totalInterest');

	const principal = parseFloat(amount.value);
	const calculateInterest = parseFloat(interest.value) / 100 / 12;
	const calculatePayments = parseFloat(years.value) * 12;

	//Compute monthly payment
	const x = Math.pow(1 + calculateInterest,calculatePayments);
	const monthly = (principal*x*calculateInterest)/(x-1);

	if(isFinite(monthly)){
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly*calculatePayments).toFixed(2);
		totalInterest.value = ((monthly*calculatePayments)-principal).toFixed(2);

		//show results
		document.getElementById('results').style.display = 'block';

		//hide loading
		document.getElementById('loading').style.display = 'none';
	}else{
		showError('Please check the numbers');
	}
}

//show Error
function showError(msg){

	//show results
	document.getElementById('results').style.display = 'none';

	//hide loading
	document.getElementById('loading').style.display = 'none';

	//Create a div
	const errorDiv = document.createElement('div');

	//get Element
	const main = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	//Add class
	errorDiv.className = 'alert alert-danger';

	//Create a text node
	errorDiv.appendChild(document.createTextNode(msg));

	//Insert error
	main.insertBefore(errorDiv,heading);

	//Clear error
	setTimeout(clearError,3000);

 }


function clearError(){
	document.querySelector('.alert').remove();
}


