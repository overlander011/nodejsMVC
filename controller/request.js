const student = require('../models/studentdb')
const connect = require('../models/mongoose')

class request {
    async request (){return}

//--------------------------------------------------------------------------------------------------------------------------------------------------------   

    //login with username@cskmitl.ac.th + password
    async loginWithEmail(req) {
        var functionname = "[loginWithEmail]"

        var str = req.Email
        var splitted = str.split('@');
        var SID = splitted[0]; 
        var Email = splitted[1];

        //เช็คว่า Domain คือ cskmitl.ac.th หรือเปล่า
        if(Email !== "cskmitl.ac.th"){
            return `${functionname} Wrong Domain `
        }else{   
        }

        //เช็คว่ามี SID นี้ใน DB หรือเปล่า
        var resultcheckID = await new connect().checkexist({ SID }, "studentdb")
        if (resultcheckID) {
        } else {
            return `${functionname} SID not found `
        }
        
        //เช็คPassword ในDB ว่า ตรงกับ Password ที่กรอกมาไหม
        var resultInfo = await new connect().get({ SID }, "studentdb")
        if (resultInfo[0].Password == req.Password ) {
        } else {
            return `${functionname} Wrong Password `
        }
        
        //เช็ค status ว่า login หรือยัง
        if(resultInfo[0].Status == "ยังไม่เข้าสู่ระบบ"){
            var resultStatus = await new connect().update({SID },
                { 
                    Status:"เข้าสู่ระบบแล้ว"
                    
                },'studentdb')   
        }else{
            return `${functionname} You already Login `
        }
        return `${functionname} Login Successfully `
    }


//--------------------------------------------------------------------------------------------------------------------------------------------------------

    //getAll_Login
    async getAll_Login(req) {
        var resultAllLogin = await new connect().get({ Status: "เข้าสู่ระบบแล้ว" }, "studentdb")
        var numberAllLogin = resultAllLogin.length;

        return  numberAllLogin
    }




//--------------------------------------------------------------------------------------------------------------------------------------------------------

    //getAll_notLogin
    async getAll_notLogin(req) {
        var resultAllnotLogin = await new connect().get({ Status: "ยังไม่เข้าสู่ระบบ" }, "studentdb")
        var numberAllnotLogin = resultAllnotLogin.length;

        return  numberAllnotLogin
    }
//--------------------------------------------------------------------------------------------------------------------------------------------------------

    //getAll_notLogin
    async getName_notLogin(req) {
        var resultAllnotLogin = await new connect().get({ Status: "ยังไม่เข้าสู่ระบบ" }, "studentdb")
        var resultNameAsArray = []
        var numberAllnotLogin = resultAllnotLogin.length;

        for(var i = 0 ; i<numberAllnotLogin;i++ ){
            var nameAllnotLogin = resultAllnotLogin[i].Firstname
            var resultName = {
                Name : nameAllnotLogin
            }
            resultNameAsArray.push(resultName)

        }

        return  resultNameAsArray
    }


    
//--------------------------------------------------------------------------------------------------------------------------------------------------------

async getAllData(req) {
   
    var All_Login = await new request().getAll_Login();

    var All_notLogin = await new request().getAll_notLogin();

    var AllName_notLogin = await new request().getName_notLogin();

    var result = {
        All_Login,
        All_notLogin,
        AllName_notLogin
    }


    return result
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------


    // //login with username + password
    // async login(req) {
    //     var functionname = "[Login]"
    //     //hash password before save in database 
    //     var hash_Password = coverhash.hash(`${req.Password}`)  
        
    //     //เช็คว่ามี Username นี้ใน DB ยัง
    //     var resultcheckID = await new connect().checkexist({ Username: req.Username }, "userdb")
    //     if (resultcheckID) {
    //     } else {
    //         return `${functionname} Username not found `
    //     }
        
    //     //เช็คPassword ในDB ว่า ตรงกับ Password ที่กรอกมาไหม
    //     var resultgetID = await new connect().get({ Username: req.Username }, "userdb")
    //     if (hash_Password == resultgetID[0].Password) {
    //     } else {
    //         return `${functionname} Wrong Password `
    //     }
        
    //     return `${functionname} Login Successfully `
    // }

    
    
    
    // //delete
    // async deleteInformation(req) {
    //     var hash_Password = coverhash.hash(`${req.Password}`) 
    //     var member = {
    //         Username: req.Username,
    //         Passwod: hash_Password
    //     }
    //     var resultgetID = await new connect().delete({ Username: req.Username }, "userdb")
    //     return "Delete Successfully"
    // }

    // //save travel history to DB
    // async addhistory(req) {
    //     var functionname = "[Addhistory]"
    //     //hash password before save in database 
    //     var hash_Password = coverhash.hash(`${req.Password}`) 
    
    //     var member =  {
    //         PointA: req.PointA,
    //         PointB: req.PointB,
    //         Distance: req.Distance,
    //         Price :req.Price ,
    //         Type : req.Type,
    //         Date :req.Date,
    //     }
    //     console.log(member)
    //     //เช็คว่า Username มีใน DB หรือยัง
    //     var resultcheckID = await new connect().checkexist({ Username: req.Username }, "userdb")
    //     if (resultcheckID) {
    //     } else {
    //         return `${functionname} Username not found `
    //     }
        
    //     //เช็คPassword ในDB ว่า ตรงกับ Password ที่กรอกมาไหม
    //     var resultgetID = await new connect().get({ Username: req.Username }, "userdb")
    //     if (hash_Password == resultgetID[0].Password) {
    //     } else {
    //         return `${functionname} Wrong Password `
    //     }
    //     //add items to []Expense_history
    //     var resultUpdate = await new connect().update({Username: req.Username },{
    //          $push: { Expense_history: {
    //                     PointA: req.PointA,
    //                     PointB: req.PointB,
    //                     Distance: req.Distance,
    //                     Price :req.Price ,
    //                     Type : req.Type,
    //                     Date :req.Date,
    //                     } 
    //                 } 
    //             },'userdb')
        
    //     var Total = resultgetID[0].Total-req.Price
    //     var Used = resultgetID[0].Used+req.Price
    //     //update  Total and Used
    //     var resultUpdate = await new connect().update({Username: req.Username },{ Total:Total,Used:Used},'userdb')   
        
    //     return `${functionname} Addhistory Successfully `
    // }

    // async editInformation(req) {
    //     var functionname = "[editInformation]"
    //     var hash_Password = coverhash.hash(`${req.Password}`) 
    //     var hash_newPassword = coverhash.hash(`${req.newPassword}`) 
        
    //     //เช็คว่า Username มีใน DB หรือยัง
    //     var resultcheckID = await new connect().checkexist({ Username: req.Username }, "userdb")
    //     if (resultcheckID) {
    //     } else {
    //         return `${functionname} Username not found `
    //     }
        
    //     //เช็คPassword ในDB ว่า ตรงกับ Password ที่กรอกมาไหม
    //     var resultgetID = await new connect().get({ Username: req.Username }, "userdb")
    //     if (hash_Password == resultgetID[0].Password) {
    //     } else {
    //         return `${functionname} Wrong Password `
    //     }

    //     // update firstname,lastname , password
    //     var resultUpdate = await new connect().update({Username: req.Username },
    //         { 
    //             Firstname:req.newFirstname,
    //             Lastname:req.newLastname,
    //             Password:hash_newPassword
    //         },'userdb')   
        
    //     return `${functionname} Changes information Successfully `
    // }

    // async sendPassword(req) {
    //     var functionname = "[Forget Password]"
    //     var resultcheckEmail = await new connect().checkexist({ Email: req.Email }, "userdb")
    //     console.log(resultcheckEmail)
    //     if (resultcheckEmail) {
    //     } else {
    //         return `${functionname} Can't find that Email : ${req.Email}`  
    //     }
    //     var resultnewPass = genpassword.genpass()
    //     var hash_newPassword = coverhash.hash(`${resultnewPass}`) 
    //     var resultUpdate = await new connect().update({Email: req.Email },{Password:hash_newPassword},'userdb')   
    //     var subject = 'You have reset the password.'
    //     var text = `This is your new password ${resultnewPass} ` 
        
    //     //ส่ง แจ้งเตือน ไปยัง Useremail 
    //     emailnotify.emailnotification(req.Email,subject,text)
    
    //     return `${functionname} Sending new password successfully ${resultnewPass} `
    // }

}
module.exports = request

    