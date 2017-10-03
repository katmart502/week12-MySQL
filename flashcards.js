var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var Inquirer = require("Inquirer");


var playPrompt = function() {
	Inquirer.prompt([{
		type: "list",
		message: "What type of card do you want to view?",
		choices: ["Basic Flash Card", "Cloze Flash Card",],
		name: "action",
	}]).then(function (inquirerResponse){
		var count = 0;
		if (inquirerResponse.action === "Basic Flash Card"){
			var showCard = new BasicCard();
			showCard.readBasicCard(count);
		} else if (inquirerResponse.action === "Cloze Flash Card"){
			var showCard = new ClozeCard();
			showCard.readClozeCard(count);
		} else {
			console.log("Error!!!");
		}
	});
};

var creatPrompt = function () {
	Inquirer.prompt([{
		type: "list",
		message: "What do you want to do?",
		choices: ["Basic Flash Card", "Cloze Flash Card",],
		name: "action",
	}]).then(function (inquirerResponse){
		if (inquirerResponse.action === "Basic Flash Card"){
			var createCard = new BasicCard();
			createCard.createBasicCard();
		} else if (inquirerResponse.action === "Cloze Flash Card"){
			var createCard = new ClozeCard();
			createCard.createClozeCard();
		} else {
			console.log("Error!!!");
		}
	});
};

var initialPrompt = function () {
	Inquirer.prompt([{
		type: "list",
		message: "What do you want to do?",
		choices: ["View Flash Cards", "Create Flash Card",],
		name: "action",
	}]).then(function (inquirerResponse){
		if (inquirerResponse.action === "Create Flash Card"){
			creatPrompt();
		} else if (inquirerResponse.action === "View Flash Cards"){
			playPrompt();
		} else {
			console.log("Error!!!");
		}
	});
};

initialPrompt();
