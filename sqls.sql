CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    fullname varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL,
    mobile varchar(255) NOT NULL
);


CREATE TABLE products (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pr_id varchar(255) NOT NULL,
    pr_name varchar(255) NOT NULL,
    pr_price varchar(255) NOT NULL,
    pr_discription varchar(255) NOT NULL,
    pr_thumbnails varchar(255) NOT NULL
);

CREATE TABLE contests (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id varchar(255) NOT NULL,
    con_id varchar(255) NOT NULL,
    con_status varchar(255) NOT NULL, -- active, soldout, completed
    con_total_spots varchar(255) NOT NULL,
    con_spots varchar(255) NOT NULL, 
    con_startdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    con_enddate TIMESTAMP NULL DEFAULT NULL,
    con_win varchar(255) NOT NULL,
    con_discription varchar(255) NOT NULL,
    con_thumbnails varchar(255) NOT NULL,
    con_winner varchar(255) NOT NULL,
    con_winnerCoupen varchar(255) NOT NULL
);

CREATE TABLE orders_spots (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_id varchar(255) NOT NULL,
    contest_id varchar(255) NOT NULL,
    user_id varchar(255) NOT NULL,
    coupen varchar(255) NOT NULL,
    order_status varchar(255) NOT NULL, -- oncart, shipped, deliverd, canceled, completed
    quantity varchar(255) NOT NULL, 
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




