const UserModel  = require('../../models/data/UserModel')


const table = "users"


const UserController = {
    getOne: (req, res)=>{
        // const table = req.params.table
        const field = req.params.field
        const value = req.params.value
        new UserModel().getOne(table, field, value, (err, results)=>{
            if(err) res.send("ERR")
            else res.send(results)
        })
    },
    getUsers: (req, res)=>{
        // const table = req.params.table
        const sort_field = req.params.field
        new UserModel().getAll(table, sort_field, (err, results)=>{
            if(err) res.send("ERR")
            else res.send(results)
        })
    },
    addUser:(req, res)=>{
        // const table = req.params.table
        const fields = req.body
        new UserModel().addData(table, fields, (err, results)=>{
            if(err) res.send("ERR")
            else res.send("User Added Successfully")
        })
    },
    updateUser:(req, res)=>{
        // const table = req.params.table
        const fields = req.body
        new UserModel().updateData(table, fields, (err, results)=>{
            if(err) res.send("ERR")
            else res.send(results)
        })
    },
    deleteUser:(req, res)=>{
        // const table = req.params.table
        const _id = req.body.id
        console.log("===", _id);
        new UserModel().deleteData(table, _id, (err, results)=>{
            if(err) res.send("ERR")
            else res.send(results)
        })
    },

    login:(req, res)=>{
        new UserModel().getOne(table, "username", req.body.username,  (err, results)=>{
            if(err) res.send("ERR")
            else {
                if(results && results[0]){
                    if(results[0].user_password == req.body.user_password){
                        console.log("go now");
                        res.send(results)
                    }else{
                        res.send("password don't match")
                        console.log("password don't match");
                    }
                }else{
                    res.send("no user font")
                    console.log("no user font");
                }
                // res.send(results)
            
            }
        })
    }
}

module.exports = UserController