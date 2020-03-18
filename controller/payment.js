const mongoose = require('../models/mongoose.js')
const adduser = require('../models/userdb')
//const addupdateAction = require('..models/')
const connect = require('../models/mongoose')
const coverhash = require('../Util/hash256.js')
const emailnotify = require('../Util/emailalert.js')
const genpassword = require('../Util/genpass')

class payment {
    //register user
    async register(req) {
        var functionname = "[Register]"
        //hash password before save in database 
        var hash_Password = coverhash.hash(`${req.Password}`) 

        var member = new adduser ({
            Username: req.Username,
            Firstname: req.Firstname,
            Lastname: req.Lastname,
            Email: req.Email,
            Password: hash_Password,
            Budget :req.Budget ,
            Used : 0,
            Total: req.Budget
            
        })

        //Check user in DB
        var resultcheckID = await new connect().checkexist({ Username: req.Username }, "userdb")
        console.log(resultcheckID) //false คือ ไม่เจอ
        if (!resultcheckID) {
            console.log(`${functionname} Username  available`)
        } else {
            return `${functionname} Username not available`
        }
        
        //check E - mail in DB
        var resultcheckEmail = await new connect().checkexist({ Email: req.Email }, "userdb")
        console.log(!resultcheckEmail)
        if (!resultcheckEmail) {
            console.log(`${functionname} Email available `)
        } else {
            return `${functionname} Email not available `
        }
        var subject = 'Welcome to Win Win application '
        var text = 'You have been Register Successfully , Happy Life !!!!!' 
        //ส่ง แจ้งเตือน ไปยัง Useremail 
        emailnotify.emailnotification(req.Email,subject,text)
        var result = await member.save()
        return `${functionname} Register Successfully `
    }
    
    //login with username + password
    async login(req) {
        var functionname = "[Login]"
        //hash password before save in database 
        var hash_Password = coverhash.hash(`${req.Password}`)  
        
        //เช็คว่ามี Username นี้ใน DB ยัง
        var resultcheckID = await new connect().checkexist({ Username: req.Username }, "userdb")
        if (resultcheckID) {
        } else {
            return `${functionname} Username not found `
        }
        
        //เช็คPassword ในDB ว่า ตรงกับ Password ที่กรอกมาไหม
        var resultgetID = await new connect().get({ Username: req.Username }, "userdb")
        if (hash_Password == resultgetID[0].Password) {
        } else {
            return `${functionname} Wrong Password `
        }
        
        return `${functionname} Login Successfully `
    }

    //get information by username
    async getInformation(req) {
        var functionname = "[getInformation]"
        var hash_Password = coverhash.hash(`${req.Password}`) 
        
        //เช็คว่า Username มีใน DB หรือยัง
        var resultcheckID = await new connect().checkexist({ Username: req.Username }, "userdb")
        if (resultcheckID) {
        } else {
            return `${functionname} Username not found `
        }
        
        //เช็คPassword ในDB ว่า ตรงกับ Password ที่กรอกมาไหม
        var resultgetID = await new connect().get({ Username: req.Username }, "userdb")
        if (hash_Password == resultgetID[0].Password) {
        } else {
            return `${functionname} Wrong Password `
        }
    
        var resultgetID = await new connect().get({ Username: req.Username }, "userdb")
        var result = {
            Username :  resultgetID[0].Username,
            Firstname : resultgetID[0].Firstname,
            Lastname : resultgetID[0].Lastname,
            Email : resultgetID[0].Email,
            Budget : resultgetID[0].Budget,
            Used : resultgetID[0].Used,
            Total : resultgetID[0].Total,
            Expense_history : resultgetID[0].Expense_history
        }
        return result
    }
    
    
    //delete
    async deleteInformation(req) {
        var hash_Password = coverhash.hash(`${req.Password}`) 
        var member = {
            Username: req.Username,
            Passwod: hash_Password
        }
        var resultgetID = await new connect().delete({ Username: req.Username }, "userdb")
        return "Delete Successfully"
    }

    //save travel history to DB
    async addhistory(req) {
        var functionname = "[Addhistory]"
        //hash password before save in database 
        var hash_Password = coverhash.hash(`${req.Password}`) 
    
        var member =  {
            PointA: req.PointA,
            PointB: req.PointB,
            Distance: req.Distance,
            Price :req.Price ,
            Type : req.Type,
            Date :req.Date,
        }
        console.log(member)
        //เช็คว่า Username มีใน DB หรือยัง
        var resultcheckID = await new connect().checkexist({ Username: req.Username }, "userdb")
        if (resultcheckID) {
        } else {
            return `${functionname} Username not found `
        }
        
        //เช็คPassword ในDB ว่า ตรงกับ Password ที่กรอกมาไหม
        var resultgetID = await new connect().get({ Username: req.Username }, "userdb")
        if (hash_Password == resultgetID[0].Password) {
        } else {
            return `${functionname} Wrong Password `
        }
        //add items to []Expense_history
        var resultUpdate = await new connect().update({Username: req.Username },{
             $push: { Expense_history: {
                        PointA: req.PointA,
                        PointB: req.PointB,
                        Distance: req.Distance,
                        Price :req.Price ,
                        Type : req.Type,
                        Date :req.Date,
                        } 
                    } 
                },'userdb')
        
        var Total = resultgetID[0].Total-req.Price
        var Used = resultgetID[0].Used+req.Price
        //update  Total and Used
        var resultUpdate = await new connect().update({Username: req.Username },{ Total:Total,Used:Used},'userdb')   
        
        return `${functionname} Addhistory Successfully `
    }

    async editInformation(req) {
        var functionname = "[editInformation]"
        var hash_Password = coverhash.hash(`${req.Password}`) 
        var hash_newPassword = coverhash.hash(`${req.newPassword}`) 
        
        //เช็คว่า Username มีใน DB หรือยัง
        var resultcheckID = await new connect().checkexist({ Username: req.Username }, "userdb")
        if (resultcheckID) {
        } else {
            return `${functionname} Username not found `
        }
        
        //เช็คPassword ในDB ว่า ตรงกับ Password ที่กรอกมาไหม
        var resultgetID = await new connect().get({ Username: req.Username }, "userdb")
        if (hash_Password == resultgetID[0].Password) {
        } else {
            return `${functionname} Wrong Password `
        }

        // update firstname,lastname , password
        var resultUpdate = await new connect().update({Username: req.Username },
            { 
                Firstname:req.newFirstname,
                Lastname:req.newLastname,
                Password:hash_newPassword
            },'userdb')   
        
        return `${functionname} Changes information Successfully `
    }

    async sendPassword(req) {
        var functionname = "[Forget Password]"
        var resultcheckEmail = await new connect().checkexist({ Email: req.Email }, "userdb")
        console.log(resultcheckEmail)
        if (resultcheckEmail) {
        } else {
            return `${functionname} Can't find that Email : ${req.Email}`  
        }
        var resultnewPass = genpassword.genpass()
        var hash_newPassword = coverhash.hash(`${resultnewPass}`) 
        var resultUpdate = await new connect().update({Email: req.Email },{Password:hash_newPassword},'userdb')   
        var subject = 'You have reset the password.'
        var text = `This is your new password ${resultnewPass} ` 
        
        //ส่ง แจ้งเตือน ไปยัง Useremail 
        emailnotify.emailnotification(req.Email,subject,text)
    
        return `${functionname} Sending new password successfully ${resultnewPass} `
    }

}
module.exports = payment

    