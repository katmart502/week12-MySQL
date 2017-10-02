var fs = require("fs");
var Inquirer = require("Inquirer");
// var flashCard = require("./FlashCard.js");

var BasicCard = function() {
	this.activityLog = function(type, front, back) {
		this.front = front;
		this.back = back;
		this.type = type;
		this.date = Date.now(); //convert this to a usable date loser!
		fs.appendFile("activityLog.txt", this.type + " --- Question: " + this.front + " --- Answer: " + this.back + " --- Date: " + this.date + "\r\n", function(err) {
			if (err) {
		    	return console.log(err);
		  	}
		});
	} 
	this.createBasicCard = function() {
		Inquirer.prompt([{
			type: "input",
			message: "What is the basic question?",
			name: "question",
		},
		{
			type: "input",
			message: "What is the answer to your quesiton?",
			name: "answer",
		}]).then(function (inquirerResponse){
			var questionToSend = inquirerResponse.question;
			var answerToSend = inquirerResponse.answer;
			fs.appendFile("basicCards.txt",  questionToSend + "," + answerToSend + ",", function(err) {
				if (err) {
			    	return console.log(err);
			  	}
			  	// this.activityLog("Basic Card Creation", questionToSend, answerToSend);
			});
		});
	}
	this.displayBasicCard = function (question, answer, done, count) {
		this.question = question;
		this.answer = answer;
		this.done = done;
		this.count = count;
		if (!done) {
			console.log("---------------\nQuestion: " + this.question);
			var waitTill1 = new Date(new Date().getTime() + 5 * 1000);
			while(waitTill1 > new Date()){}
			console.log("Answer: " + this.answer + "\n---------------");
			this.activityLog("Basic Card Display", this.question, this.answer);
			this.count = this.count + 2;
			var waitTill2 = new Date(new Date().getTime() + 1.5 * 1000);
			while(waitTill2 > new Date()){}
			this.readBasicCard(this.count);
		} else {
			console.log("All done!");
			// console.log(flashCard);
			// console.log(flashCard.keepPlaying());
			// let val = flashCard.keepPlaying();
		}
	}
	this.readBasicCard = function(count) {
		var data = fs.readFileSync("basicCards.txt").toString();
		var dataArr = data.split(",");
	  	this.done = false;
	   	this.count = count;
	   	this.answerCount = count + 1;
   		if (this.count > dataArr.length - 3) {
				this.done = true;
		}
   		this.displayBasicCard(dataArr[this.count], dataArr[this.answerCount], this.done, this.count);
	}
};

module.exports = BasicCard;
