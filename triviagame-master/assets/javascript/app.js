// Triva Game
// Author: Brandon Fomkin

$(document).ready(function(){

// Declare Variable ////////////////////////////////////////////////////////////////////////////
	
	// Dom Elements /////////////////////////////
	var $timerDiv = $('#timerDiv');
	var $timerSpan = $('#timerSpan');
	var $timeRemaining = $('#timeRemaining');
	var $question = $('#questionDiv');
	var $choice = $('.choice');
	var $choice1 = $('#choice1');
	var $choice2 = $('#choice2');
	var $choice3 = $('#choice3');
	var $choice4 = $('#choice4');
	var $start = $('#startButton');

	// Question transitioning ///////////////////
	var questions = [];
	var questionIndex = 0;
	var currentQuestion;

	// Game variables ///////////////////////////
	var wins = 0;
	var losses = 0;
	var questionAnswered = false;



// Timer ///////////////////////////////////////////////////////////////////////////////

	time = 30; // number of seconds for timeRemaining

	runTimer = function(){
		$timerSpan.html('Time Remaining: ')
		counter = setInterval(decrement, 1000);
		$timerSpan.show();
		$timeRemaining.html(' ' + time);
	};

	decrement = function(){

		time--;
		$timeRemaining.html(' ' + time);

		if(time == 0){

			stopTimer();
			$timerSpan.html("Time's Up!");
			$choice1.html(currentQuestion.answer)

			currentQuestion.displayImage();
			$choice1.html(currentQuestion.answer);

			time = 30; // reset the timer
			questionIndex += 1;

			losses ++;
			
			setTimeout(function(){
				$timerSpan.css('margin-left', '0')
			}, 3800)
			setTimeout(nextQuestion, 3800);

		// display answer screen
		}
	}

	stopTimer = function(){
		clearInterval(counter);
		$timeRemaining.empty();
		time = 30;
	}


// Question Object ////////////////////////////////////////////////////////////////////////////
	function question(text, choices, answer, image, sound){

		this.text = text;
		this.choices = choices;
		this.answer = answer;
		this.image = image;
		this.sound = sound;

		this.displayQuestion = function(){

			console.log("displaying question")

			$question.html(this.text);

			// write the answer choice to the array, then set a data attribute = to the choice string
			$choice1.html(this.choices[0]);
			$choice1.data('choice', this.choices[0] );

			$choice2.html(this.choices[1]);
			$choice2.data('choice', this.choices[1] );

			$choice3.html(this.choices[2]);
			$choice3.data('choice', this.choices[2] );

			$choice4.html(this.choices[3]);
			$choice4.data('choice', this.choices[3] );
		};

		this.displayImage = function(){

			$choice1.empty();
			$choice2.empty();
			$choice3.empty();
			$choice4.empty();

			$choice2.html(this.image);

			if (this.sound){
				$choice3.html(this.sound);
				this.sound.get(0).play();
			}
		}

	};


// Other Functions ////////////////////////////////////////////////////////////////////////////

	displayResults = function(){

		$choice.empty();
		$choice1.html("Correct: " + wins);
		$choice2.html("Incorrect: " + losses);
		$start.show();
	}

	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}

	function playMusic(){

		music = Math.floor(Math.random() * playlist.length)

		$('#title').append(playlist[music]);

		song = playlist[music].get(0);
		song.volume = 0.2;
		song.play();

	}

	// Background Music

	var backgroundTheme1 = $("<audio>", {class: 'music', src: "assets/sounds/backgroundmusic.mp3"});
	
	var backgroundTheme2 = $("<audio>", {class: 'music', src: "assets/sounds/Scary.mp3"});

	var backgroundTheme3 = $("<audio>", {class: 'music', src: "assets/sounds/Darkbackground.mp3"});

	$('.music').prop('volume', 0.5);

	// playlist for music to choose at random

	var playlist = [backgroundTheme1, backgroundTheme2, backgroundTheme3 ];


// Question Creation //////////////////////////////////////////////////////////////////////////


	var Q1 = new question("If you pick one normal playing card from a deck at random, what's the probability that it will be a Jack, Queen, King, or heart?", ['24/52', '13/52', 
		'22/52', '17/52'], '22/52');

	var Q2 = new question("This isnt in the first half of the alphabet?", ['C',
		'I', 'D', 'N'], 'N');

	var Q3 = new question("The 23rd letter in the Alphabet, go back 7 and forward 3 ?",
		["X", 'J', 'S', 'O'], 'S');

	var Q4 = new question("If 1 is 3 and 3 is 2 what is 2?",
		['What?', '4', '1', '2'], "1");

	var Q5 = new question("Decompression sickness is a sickeness caused when divers get gas bubbles caught in there lungs, this is also called?",
		['The Bends', 'Benz', 'Divers Lung', 'Divers sickness'], 
		'The Bends');

	var Q6 = new question("What is the capital of Australia?",
		['Canberra', 'Buffalo', 'Sydney', 'Toronto'], 'Sydney');

	var Q7 = new question("Which body part stays the same size from when we are born until we die?",
		['Heart', 'Lungs', 'Eyeball', 'Kidney'], "Eyeball");

	var Q8 = new question("Which country has the largest population?",
		['India', 'China', 'Russia', 'South Africa'], 'Oracle');

	var Q9 = new question("What's the line called between 2 numbers in a fraction?",
		[ 'Fraction', 'Fractoral', 'Vinculum', 'Division line'], 'Vinculum');

	var Q10 = new question("Who Invented the electric chair?", ['A Dentist', 'A Carpenter', 'A Electrician', 'A Plumber'],
		'A Dentist');

	var Q11 = new question("What is the strongest muscle in the human body?" , ['Biceps', 'Hamstring', 'Tongue', 'Jaw'],
		'Tongue');

	var Q12 = new question("What is the only man made object that is observable from the moon?" , ['Mt Rushmore', 'The great wall of China', 'Eifel Tower', 'Sears Tower'], 'The great wall of China');

	var Q13 = new question("What percentage of people are left-handed?", ['22%', '48%', '9%', '13%'],
		'13%');

	var Q14 = new question("What was the first novel written on a typewriter?",
		[ 'Tom Sawyer', 'To kill a Mockingbird', 'Signs', 'Willy'], 'Tom Sawyer');

	var Q15 = new question("Blank can be used for a component to make dynamite?", ['Onion', 'Peanuts', 'Cashews', 'Vinegar'],
		'Peanuts');

	var Q16 = new question("What percent of your body is water?", ['50%', '80%', '60%', '45%'], '80%');

	var Q17 = new question("Which chemical element has the symbol Na?", ['Neon', 'Sodium', 'Niobium', 'Nitrogen'],
		'Sodium');





	questions = [ Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Q14, Q15, Q16, Q17];


// General Functions //////////////////////////////////////////////////////////////////////////
	function nextQuestion(){

		console.log('next question')
		console.log('question index: ' + questionIndex)


		if (questionIndex == questions.length) {
			// end game
			$timerSpan.hide();
			$question.html("Game Over!")

			displayResults();

			// display end screen

		}else {
			// go to the next question

			console.log('current question: ' + currentQuestion)
			currentQuestion = questions[questionIndex];
			currentQuestion.displayQuestion();
			runTimer();
			questionAnswered = false;
		}

	}


// OnClick functions //////////////////////////////////////////////////////////////////////////

	// when start button is clicked ///////////////////////////////////////////////////////////
	$start.on('click', function(){

		questionIndex = 0;
		console.log("question index after start: " + questionIndex)

		// Game variables ///////////////////////////
		wins = 0;
		losses = 0;
		questionAnswered = false;

		questions = shuffleArray(questions);

		currentQuestion = questions[questionIndex];

		$start.hide();
		
		nextQuestion();

	});
	
	// when an answer choice is clicked, compare it to the correct answer
	$choice.on('click', function(){

		if (questionAnswered == false){

			questionAnswered = true;
		

		// logic for correct answer

			if($(this).data('choice') == currentQuestion.answer){
				// right answer logic
				
				$question.html("Impeccable!")

				wins ++;
				questionIndex += 1;

				stopTimer();

				currentQuestion.displayImage();

				setTimeout(nextQuestion, 3800);

		// logic for incorrect answer
			}else {
				// wrong answer logic
	
				$question.html("Misguided!");

				losses ++;
				questionIndex += 1;

				stopTimer();

				currentQuestion.displayImage();

				$('#choice1:hover').css('color', '');

				$choice1.html(currentQuestion.answer);
				setTimeout(nextQuestion, 3800);
			}	
		}
	});


	$timerSpan.hide(); // start with 'time remaining' hidden.

	playMusic();

})// end of jQuery