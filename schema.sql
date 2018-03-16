/*
   
    Al Curry          March 14, 2018
    
    GWU Full Stack Web Development program

    Homework 12 - Node JS & mySQL

    Defines "bamazon" database and products table.   
    Works with node js file bamazonCustomer.js

    After creating database and product table, 10 products are inserted.

    Though I worked with Sybase for many years, it's interesting to see the differences and similarities working with mySql.  Most of my Sybase work interfaced with C programs using now vintage dblib connections.  Some was also with Unix scripting languages, and writing multi-page stored proceducres.  The node js interface is good to work with, though at times an adjustment.

*/

DROP DATABASE IF EXISTS bamazon; 
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price FLOAT NULL,
  stock_quantity INT NULL,

  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('iphone','apple', 1000.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('ipad','apple', 700.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('itv','apple', 500.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('iwatch','apple', 450.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('macbook','apple', 1700.00, 100);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('jeans','clothing', 75.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('sneakers','clothing', 85.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('tshirts','clothing', 10.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('sweats','clothing', 45.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('sunglasses','clothing', 170.00, 100);
