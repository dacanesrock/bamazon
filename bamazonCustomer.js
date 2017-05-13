// Require MySql and Inquirer packages for use 
var mysql = require("mysql");
var inquirer = require("inquirer");
//Require dotenv to store password securely
require("dotenv").config();
var password = process.env.password;
//Require console.table to format database table
require('console.table');

//Create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: password,
    database: "bamazon"
});

//Establish connection to database and generate query
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");
});

function storeFront() {
	connection.query("SELECT * FROM products", function(err, res) {
	    if (err) throw err;
	    console.log("Welcome to La Tienda Robbie!!");
	    console.log("Our Current Stock includes:" + "\n");
	    console.table(res);
	    console.log("--------------------");

	    inquirer.prompt([{
	        name: "start",
	        type: "list",
	        message: "Which item would you like to purchase today?",
	        choices: function(value) {
	            var choiceArray = [];
	            for (var i = 0; i < res.length; i++) {
	                choiceArray.push(res[i].product_name);
	            };
	            return choiceArray;
	        }
	    }, {
	        name: "quantity",
	        type: "input",
	        message: "How many items would you like to buy?"
	    }]).then(function(answer) {
	        // get the information of the chosen item
	        var chosenItem;
	        for (var i = 0; i < res.length; i++) {
	            if (res[i].product_name === answer.start) {
	                chosenItem = res[i];
	            }
	        }

	        if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
	        	var newStock = chosenItem.stock_quantity - parseInt(answer.quantity);
	        	var price = chosenItem.price;
	            connection.query("UPDATE products SET ? WHERE ?", [{
	                stock_quantity: newStock
	            }, {
	                product_name: chosenItem.product_name
	            }], function(error) {
	                if (error) throw err;
	                console.log("Thanks for shopping! You spent $" + (price * answer.quantity) + "\n");
	                console.log("-------------------------------------------------------");
	                reStore();
	            });
	        } else {
		        console.log("Insufficient quantity!" + "\n");
		        console.log("-------------------------------------------------------");
		        reStore();
	        };
	    });
	});
};

function reStore() {
	inquirer.prompt([{
		name: "followup",
		type: "list",
		message: "Would you like to buy another item?",
		choices: ["Yes", "No"]
	}]).then(function(answer) {
		if (answer.followup === "Yes") {
			storeFront();
		} else {
			return;
		};
	})
};

storeFront();