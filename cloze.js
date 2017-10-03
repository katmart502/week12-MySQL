var fs = require("fs");
var Inquirer = require("Inquirer");
// var flashCard = require("./FlashCard.js");

var ClozeCard = function() {
	this.activityLog = function(type, front, back) {
		this.text = front;
		this.cloze = back;
		this.type = type;
		this.date = Date.now(); //convert this to a usable date loser!
		fs.appendFile("activityLog.txt", this.type + " --- Question: " + this.text + " --- Cloze: " + this.cloze + " --- Date: " + this.date + "\r\n", function(err) {
			if (err) {
		    	return console.log(err);
		  	}

		});
	}
	this.createClozeCard = function() {
		// this.questionToSend = "No Value Yet - Cloze Question";
		// this.answerToSend = "No Value Yet - Cloze Answer";
		Inquirer.prompt([{
			type: "input",
			message: "What is the full question?",
			name: "question",
		},
		{
			type: "input",
			message: "What is the cloze to your quesiton?",
			name: "answer",
		}]).then(function (inquirerResponse){
			var partial = inquirerResponse.question.replace(inquirerResponse.answer, "---");
			var questionToSend = partial;
			console.log("Question in Inquirer" + questionToSend);
			var answerToSend = inquirerResponse.answer;
			console.log("Answer in Inquirer" + answerToSend);
			fs.appendFile("clozeCards.txt",  questionToSend + "," + answerToSend + ",", function(err) {
				if (err) {
			    	return console.log(err);
			  	}
			  	// this.questionToSend = questionToSend;
			  	// this.answerToSend = answerToSend;
			});
		});
		
	}
	this.displayClozeCard = function (question, answer, done, count) {
		this.question = question;
		this.answer = answer;
		this.done = done;
		this.count = count;
		if (!done) {
			console.log("---------------\nQuestion: " + this.question);
			var waitTill1 = new Date(new Date().getTime() + 5 * 1000);
			while(waitTill1 > new Date()){}
			console.log("Answer: " + this.answer + "\n---------------");
			this.activityLog("Cloze Card Display", this.question, this.answer);
			this.count = this.count + 2;
			var waitTill2 = new Date(new Date().getTime() + 1.5 * 1000);
			while(waitTill2 > new Date()){}
			this.readClozeCard(this.count);
		} else {
			console.log("All done!");
		}
	}
	this.readClozeCard = function(count) {
		var data = fs.readFileSync("clozeCards.txt").toString();
		var dataArr = data.split(",");
	  	this.done = false;
	   	this.count = count;
	   	this.answerCount = count + 1;
   		if (this.count > dataArr.length - 3) {
				this.done = true;
		}
   		this.displayClozeCard(dataArr[this.count], dataArr[this.answerCount], this.done, this.count);
	}
};

module.exports = ClozeCard;
