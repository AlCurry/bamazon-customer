/*
    
    Al Curry          March 14, 2018
    
    GWU Full Stack Web Development program

    Homework 12 - Node JS & mySQL

    Using the inquirer (for terminal prompting) and mysql (for mysql db connectivity) npm packages, create an order fulfillment program in node js that will run against the products table set up and initially populated in schema.sql.

    Products are initially displayed, an ordered entered, and if there is sufficient quantity in the database, the cost is printed and the quantity in the database updated to reflect the order.

    Database schema defined in schema.sql.

*/

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  displayProducts();
  //orderProduct();
});

function orderProduct() {
  inquirer
    .prompt([
      {
        name: "id",  type: "input",  message: "Enter id to purchase: ",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: "quantity",  type: "input",  message: "Enter quantity to purchase: ",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            return false;
          }
        }
      }
    ]).then(function (answer) {
      console.log("Entered id = " + answer.id + ",  quantity = " + answer.quantity + "\n");

      var query = "SELECT stock_quantity, price FROM products WHERE item_id = ?";

      connection.query(query, [answer.id], function (err, res) {
        //console.log("quanity in db is " + res[0].stock_quantity + " for item_id " + answer.id);
        
        if (res[0].stock_quantity < answer.quantity) {
          console.log("Insufficient quantity");
          connection.end();
        } else {
          fulfillOrder(res[0].stock_quantity - answer.quantity, answer.quantity,answer.id, res[0].price);
        }
      });
    })
}

function fulfillOrder(new_stock_quantity, quantity, id, price) {
  var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
  var prodTotal = 0;
  var tax = 0;
  var total = 0;

  //console.log(new_stock_quantity, id);
      connection.query(query, [new_stock_quantity, id], function (err, res) {
        if (err) throw err;
        
        prodTotal = price * quantity;
        tax = price * quantity * .0575;
        total = prodTotal + tax;

        // mercifully found these somewhat new ( ES8 / 2017 ) padStart function to
        // right justify the output 
        console.log("Product cost: $" + prodTotal.toFixed(2).padStart(10));
        console.log("         tax: $" +  tax.toFixed(2).padStart(10));
        console.log("       total: $"  + total.toFixed(2).padStart(10));
        console.log("\nOrder completed.");
        connection.end();
  });
}

function displayProducts() {
  var id = "";
  var product = "";
  var price = "";
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    console.log("Items for sale".padStart(25));
    console.log("-------------- ".padStart(26));
    console.log("    id   |     product    |    price ");
    for (var i = 0; i < res.length; i++) {
      id = res[i].item_id.toString();
      console.log(id.padStart(5), res[i].product_name.padStart(16), res[i].price.toFixed(2).padStart(13));
    }
  orderProduct();
    
  });
} 

