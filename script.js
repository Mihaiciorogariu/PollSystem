// An array of objects representing the poll options.
const options=[
    {id:"option1", text:"JavaScript", votes:0},
    {id:"option2", text:"Python", votes:0},
    {id:"option3", text:"Java", votes:0},
    {id:"option4", text:"C++", votes:0},
];

// Function to handle the vote submission
function submitVote() {

    // Find the selected radio button with the name 'poll'.
    // Ex: If 'JavaScript' is selected, then selectedOption stores:
    // <input type="radio" id="option1" name="poll" value="option1"></input>
    const selectedOption = document.querySelector('input[name="poll"]:checked');

    if(!selectedOption) {
        alert("Please select an option!");
        return;
    }

    // Get the value attribute of the selected radio button, which corresponds to the option ID
    // Ex: If 'JavaScript' is selected, then selectedOption.value stores:
    // 'option1', because value="option1"
    const optionId = selectedOption.value;

    // From the 'options' array, find all the elements (option) that have the id the same as 
    // the one stored in optionId -> "option1"
    const selectedOptionObj = options.find((option) => option.id === optionId);

    // If a matching object is found, increment its votes and log it to the console
    if(selectedOptionObj) {
        selectedOptionObj.votes++;
        console.log(selectedOptionObj);
        // Call displayResult to update the results on the page
        displayResult();
    }
}


function displayResult() {
    // Get the element where the results will be displayed.
    const result = document.getElementById('result');
    const totalVotesElement = document.getElementById('totalVotes');
    const totalVotes = getTotalVotes();

    // Update and show total votes
    totalVotesElement.textContent = `Total Votes: ${totalVotes}`;
    totalVotesElement.style.display = 'block';  // Make it visible

    // Clear any existing content in the results element.
    result.innerHTML = "";

    // Iterate over each option in the options array.
    options.forEach((option) => {
        // Calculate the percentage of total votes for this option
        // If there are no votes yet, default to 0
        const percentage = ((option.votes / getTotalVotes()) * 100).toFixed(2) || 0;

        // Determine the width of the bar representing the votes for this option
        // If-else statement: If percentage
        const barWidth = percentage > 0 ? percentage + "%" : "0%";

        // Create a new div element for this option's result.
        const optionResult = document.createElement("div");
        optionResult.className = "option-result";

        // Set the inner HTML of the div to include the option text, the bar container,
        // and the bar itself with the calculated width, and the percentage of votes.
        optionResult.innerHTML = `
            <span class = "option-text">${option.text}</span>
            <div class = "bar-container">
                <div class="bar" style="width: ${barWidth};"></div>
            </div>
            <span class = "percentage">${percentage}% (${option.votes})</span>
        `;
        // Add the vote results to the new div
        result.appendChild(optionResult);
    });
}


function getTotalVotes() {
    // Reduce -> interates through each element of the array
    // Stores in the accumulator 'total' the sum of all votes (option.votes), starting from 0
    return options.reduce((total, option) => total + option.votes, 0);
}
