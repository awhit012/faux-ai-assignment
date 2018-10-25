// (5) Make it so Eliza displays a running dialogue of the entire conversation.
// (10) Make your Eliza program stateful by saving the responses it gives to <name>. If the browser closes and restarts, and you come back to Eliza, and enter the same <name> as a prior respondent, then you should be able to restore to the prior conversation.
// (5) Add a special "/clear" operation so that it clears the state of the application for <name>, then returns the app to the start form.
// (10) Activity 2, R3 asks you to randomize responses based on a keyword. Extend this functionality so that not only is it random, but you ensure no answer is repeated until all answers are given at least once.
// (5) Add a special /search <string> operation that searches the conversation for any previous user answer containing <string>, and copies that entire previous answer into the one-line user input area.
// (5) Add a special /history operation that lists all of the searches does within that browser session. If the browser is closed and re-opened, then the history is automatically cleared. The history is also cleared if the /clear special command is given (R3).


// Storing info in state object to keep track of number of questions, users name, the current message, and current question
let state = {questions: 0, name: undefined, message: undefined, query: undefined};

// waits for page to fully load before executing main function
document.addEventListener('DOMContentLoaded', function(){ 
	run();
}, false);

// main function, starts timer for when user takes too long, gets submit button, gets current message, adds event handler for submit button
let run = () => {
	startTimer();
	let submitButton = document.getElementById('submitButton');
	state.message = document.getElementsByTagName('h3')[0];

	submitButton.addEventListener("click", handleSubmit, false);
};

// when submit is clicked, prevents default, resets timer, stores input in element, grabs h4 for previous response
// if first question, saves name, else stores query from user
// puts the user input into DOM, increases questions asked, resets text in input box, calls createResponse
let handleSubmit = (event) => {
	event.preventDefault();
	startTimer();
	let input = document.getElementById('input')
	prevResponseDOM = document.getElementsByTagName('h4')[0];

	if(state.questions === 0) {
		state.name = input.value;
	} else {
		state.query = input.value;
	}
	prevResponseDOM.innerHTML =	 input.value
	state.questions += 1;
	input.value = ""
	createResponse(state.questions)
};

// simple timer
let startTimer = () => {
	setTimeout(() => { 
		respond("Whatsa matter, " + state.name + ", cat got your tounge?")
	}, 30000);
}

// Special cases for first question and for "Bye", otherwise calls checkForKeywords

let createResponse = (questionNum) => {
	let response;
	if(questionNum === 1) {
		response = "Hi, " + state.name + ", great to meet you. Can I help you with anything?"
	}
	else if(state.query === "bye") {
		response = "Bye " + state.name + ", nice chatting with you!"
	} else {
		response = checkForKeywords()
	}

	respond(response)
}

// gets keywords from state.query
// iterates over keyword hash and query to see if our query contains any keywords
// returns which keyword the match was found in, if any
// returns random response from responseHash, depending on keyword, or returns default message if no keywords are found
let checkForKeywords = () => {
	let keywords = state.query.split(" ");
	let keyWordIn; 
	Object.keys(keyWordsHash).forEach((key) => {
		keyWordsHash[key].some(function (word) {
	        if (keywords.indexOf(word) >= 0) {
	        	keyWordIn = key;
	        	return;
	        }
	    });
	})
	
    if(keyWordIn) {
    	return responseHash[keyWordIn][Math.floor(Math.random()*responseHash[keyWordIn].length)];
    } else {
    	return "Not sure what to make of that!"
    }
}

// updates DOM with response
let respond = (response) => {
	state.message.innerHTML = response;
}

let keyWordsHash = {
	"homework": ["homework", "math", "code", "assignment", "grades", "quiz", "extra credit"],
	"chores": ["mow", "trash", "sweep", "dishes", "laundry", "shopping", "groceries", "dust"],
	"fun": ["video game", "play", "friends", "movie", "mall", "restaurant", "bungee jump"]
}

let responseHash = {
	"homework": ["Homework huh? That's not really my department.", "Well, I'm glad that is on your mind, but don't bother me with it."],
	"chores": ["Chores? Blech! Nah. You do it. ", "That will build more character if you do it by yourself."],
	"fun": ["Now that's what I'm talking about!", "Alright! I love fun stuff. Let's do this!"]
}
