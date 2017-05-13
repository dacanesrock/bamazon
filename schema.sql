create database Bamazon;

use Bamazon;

create table products(
id int not null auto_increment,
item_id VARCHAR(45) NULL,
product_name VARCHAR(45) NULL,
department_name VARCHAR(45) NULL,
price DECIMAL(10,2) NULL,
stock_quantity int null,
PRIMARY KEY (id)
);

alter table products
drop primary key, add primary key(item_id);

delete from products where id = 2;
select * from products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("Lime", "Lime", "Latin Food", .1, 30);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("CTort", "Corn Tortilla", "Latin Food", 1, 50);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("Cilan", "Cilantro", "Latin Food", .5, 75);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("Chix", "Shredded Chicken", "Latin Food", 1.45, 25);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("Chor", "Chorizo", "Latin Food", 2, 25);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("OranF", "Orange Fanta", "Latin Food", 1.50, 15);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("GSals", "Sala Verde", "Latin Food", .25, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Salsa Caliente", "Latin Food", .25, 20);