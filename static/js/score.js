// Function to retrieve a query parameter from the URL
function getQueryParam(param) {
    let params = new URLSearchParams(window.location.search);
    return params.get(param);
}
// Get the score from the URL and display it
let score = getQueryParam('score');
let message = getQueryParam("message");

document.getElementById('scoreDisplay').innerText = 'Your Boiler Purity Score is: ' + score;
document.getElementById("finalMessage").innerText = message;

// Function to go back to the quiz page
function goBack() {
    window.location.href = "/";
}

