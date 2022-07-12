require('dotenv').config();
const pool = require('./config')


class Model {
    //mysql config

    db = pool


    //get a data
    getOne =  (table, field, value, callback) => {
        let sql = `SELECT * FROM ${table} WHERE ??=?`;
        this.db.query(sql, [field, value], callback);
    }

    //insert into a specific table
    /**
     * @param {table name} table 
     * @param {what you want to insert} obj 
     * @param {err,results()=>{}} callback 
     */
     addData = (table, obj, callback) => {
        let sql = `INSERT INTO ${table} SET ?`;
        this.db.query(sql, obj, callback);
    }



      //update a specific row on a table
    /**
    * @param {table name} table
    * @param {what you want to insert} obj
    * @param {err,results()=>{}} callback
    */
     updateData = (table, obj, callback) => {
        let sql = `UPDATE ${table} SET ? WHERE id = ?`;
        this.db.query(sql, [obj, obj.id], callback);
    }



     //delete a specific row on a table
    /**
    * @param {table name} table
    * @param {id} id
    * @param {err,results()=>{}} callback
    */
     delete = (table, field, value, callback) => {
        let sql = `DELETE FROM ${table} WHERE ?? = ?`;
        this.db.query(sql, [field, value], callback);
    }
    
    
    //get all data from a table in decending order by a field
    getAll = async (table, field, callback) => {
        console.log("ordre by", field);
        let sql = `SELECT * from ${table} ORDER BY ${field || 'id'} DESC`;
        this.db.query(sql, callback);
    }

    //get all data from a table in filter by a field and order by field
    getAllByField = async (table, field, value, order_field, callback) => {
        let sql = `SELECT * from ?? WHERE ?? =? ORDER BY ?? DESC`;
        this.db.query(sql, [table, field, value, order_field], callback);
    }

    



}

module.exports = Model;