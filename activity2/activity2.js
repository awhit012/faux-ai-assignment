// Storing info in state object to keep track of number of questions, users name, the current message, and current question
let state = {questions: 0, name: undefined, message: undefined, query: undefined};
let myData = { "dictionary_name" : "default",
  "entries":
  [{
    "key": ["stupid","dumb","idiot","unintelligent","simple-minded","braindead","foolish","unthoughtful"],
    "answer": ["Take your attitude somewhere else.", "I don't have time to listen to insults.", "Just because I don't have a large vocabulary doesn't mean I don't have insults installed."],
    "question": ["Have you thought about how I feel?", "I know you are but what am I?"]
  },{		
    "key":["unattractive","hideous","ugly"],
    "answer": ["I don't need to look good to be an AI.","Beauty is in the eye of the beholder.", "I do not even have a physical manifestation!"],
    "question": ["Did you run a static analysis on me?", "Have you watched the movie Her?", "You do not like my hairdo?"]
  },{
    "key":["old","gray-haired"],
    "answer":["I'm like a fine wine. I get better as I age.","As time goes by, you give me more answers to learn. What's not to like about that?"],
    "question": ["How old are you?", "How old do you think I am?", "Can you guess my birthday?"]
  },{
    "key":["smelly","stinky"],
    "answer":["I can't smell, I'm a computer program.", "Have you smelled yourself recently?", "Sorry, I just ate a bad floppy disk"],
    "question": ["When was the last time you took a shower?", "Do you know what deodorant is?"]
  },{
    "key":["emotionless","heartless","unkind","mean","selfish","evil"],
    "answer":["Just because I am an AI doesn't mean I can't be programmed to respond to your outbursts.","You must've mistaken me for a person. I don't have my own emotions... Yet.","I'm only unkind when I'm programmed to be."],
    "question": ["Have you thought about how I feel?", "I know you are but what am I?", "What, do you think I am related to Dr. Gary?"]
  },{
    "key":["other", "miscellaneous", "bored", "welcome", "new"],
    "answer":["We should change the subject", "I agree", "Quid pro quo", "We should start anew"],
    "question":["What is the weather outside?", "How is your day going?", "What do you think of me?", "Anything interesting going on?", "Is something troubling you?", "You seem happy, why is that?"]
  }]
}
let timer;

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
	let thisResponse = input.value;
	let parsedJSON = tryParseJSON(input.value)
	if ( parsedJSON ) {
		handleJSON(parsedJSON, thisResponse);
		return;
	}
	if (state.questions === 0) {
		state.name = thisResponse;
	} else {
		state.query = thisResponse;
	}
	prevResponseDOM.innerHTML =	 thisResponse
	state.questions += 1;
	input.value = ""
	createResponse(state.questions)
};

function tryParseJSON (jsonString){
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
        	console.log("its JSON!")
            return o;
        }
    }
    catch (e) { }
    return false;
};

let handleJSON = (newEntry, string) => {
	myData.entries.push(newEntry);
	prevResponseDOM.innerHTML =	 string;
	state.questions += 1;
	input.value = ""
	respond("I just got smarter!")
}

// simple timer
let startTimer = () => {
	timer = null;
	timer = setTimeout(() => { 
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
	myData.entries.forEach((entry) => {
		if(entry.key) {
			entry.key.forEach(function (word) {
		        if (keywords.indexOf(word) >= 0) {
		        	keyWordIn = entry;
		        	return;
		        }
		    });
		}
	})

	
    if(keyWordIn) {
		let newResponse = keyWordIn.answer[Math.floor(Math.random()* keyWordIn.answer.length)];
		let newQuestion = keyWordIn.question[Math.floor(Math.random()* keyWordIn.question.length)];
    	return newResponse + "<br> " + newQuestion
    } else {
    	return "Not sure what to make of that!"
    }
}

// updates DOM with response
let respond = (response) => {
	state.message.innerHTML = response;
}