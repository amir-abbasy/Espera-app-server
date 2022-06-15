const DataModel = require('../../models/data/DataModel')

const DataController = {
    getOne: (req, res) => {
        const table = req.params.table
        const field = req.params.field
        const value = req.params.value
        new DataModel().getOne(table, field, value, (err, results) => {
            if (err) res.send("ERR")
            else res.send(results)
        })
    },
    addUser: (req, res) => {
        const table = req.params.table
        const fields = req.body
        console.log("===", fields);
        new DataModel().addData(table, fields, (err, results) => {
            if (err) res.send("ERR")
            else res.send(results)
        })
    },
    updateUser: (req, res) => {
        const table = req.params.table
        const fields = req.body
        console.log("===", fields);
        new DataModel().updateData(table, fields, (err, results) => {
            if (err) res.send("ERR")
            else res.send(results)
        })
    },
    deleteData: (req, res) => {
        const table = req.params.table
        const _id = req.body.id
        console.log("===", _id);
        new DataModel().deleteData(table, _id, (err, results) => {
            if (err) res.send("ERR")
            else res.send(results)
        })
    },
    getEndingSpots: (req, res) => {
        new DataModel().getEndingSpots((err, results) => {
            if (err) res.send("ERR" + err)
            else res.send(results)
        })
    }, getCovers: (req, res) => {
        new DataModel().getCovers((err, results) => {
            if (err) res.send("ERR" + err)
            else res.send(results)
        })
    },
    test: (req, res) => {
        console.log("works test new", req.body);
    },


}

module.exports = DataController