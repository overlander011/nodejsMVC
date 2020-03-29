const rooms = require('../models/roomdb')
const connect = require('../models/mongoose')

class request {
    async request (){return}

//--------------------------------------------------------------------------------------------------------------------------------------------------------   

    //create new Rooms
    async createNewRooms(req) {
        var functionname = "[CreateNewRooms]"

        var Rooms = new rooms ({
            RID :req.RID,
            Firstname:req.Firstname,
            Lastname: req.Lastname,
            Status: req.Status
        })

        //Check RID in DB
        var resultcheckID = await new connect().checkexist({ RID :req.RID }, "roomdb")
        var All_Readyrooms = await new connect().get({  }, "roomdb")
        console.log(resultcheckID) //false คือ ไม่เจอ
        if (!resultcheckID) {
        } else {
            return `${functionname} RID already Exist ,RID now are ${All_Readyrooms.length}`
        }
        
        await Rooms.save()
        return `${functionname}  Successfully `
    }


    //--------------------------------------------------------------------------------------------------------------------------------------------------------

    async editRooms(req) {
        var functionname = "[EditRooms]"

        var Rooms = new rooms ({
            RID :req.RID,
            Firstname:req.Firstname,
            Lastname: req.Lastname,
            Status: req.Status
        })

        //Check RID in DB
        var resultcheckID = await new connect().checkexist({ RID :req.RID }, "roomdb")
        console.log(resultcheckID) //false คือ ไม่เจอ
        if (resultcheckID) {
            var resultRooms = await new connect().update({ RID :req.RID },
                { 
                    Firstname:req.Firstname,
                    Lastname: req.Lastname,
                    Status: req.Status
                    
                },'roomdb')   
        } else {
            return `${functionname} RID not found`
        }

        return `${functionname}  Successfully `
    }

//--------------------------------------------------------------------------------------------------------------------------------------------------------

    //getAll_Login
    async getAll_Readyrooms(req) {
        var All_Readyrooms = await new connect().get({ Status: "Ready" }, "roomdb")
        var totalAll_Readyrooms = All_Readyrooms.length;

        return  totalAll_Readyrooms
    }




//--------------------------------------------------------------------------------------------------------------------------------------------------------

    //getAll_notLogin
    async getAll_Pendingrooms(req) {
        var All_Pendingrooms = await new connect().get({ Status: "Pending" }, "roomdb")
        var totalAll_Pendingrooms = All_Pendingrooms.length;

        return  totalAll_Pendingrooms
    }


//--------------------------------------------------------------------------------------------------------------------------------------------------------

    //getAll_notLogin
    async getAll_NotReadyrooms(req) {
        var All_NotReadyrooms = await new connect().get({ Status: "NotReady" }, "roomdb")
        var totalAll_NotReadyrooms = All_NotReadyrooms.length;

        return  totalAll_NotReadyrooms
    }
//--------------------------------------------------------------------------------------------------------------------------------------------------------

    //getAll_notLogin
    async getName_Readyrooms(req) {
        var Readyrooms = await new connect().get({ Status: "Ready" }, "roomdb")
        var resultNameAsArray = []

        for(var i = 0 ; i<Readyrooms.length;i++ ){
            var result = {
                RID : Readyrooms[i].RID,
                Firstname : Readyrooms[i].Firstname
            }
            resultNameAsArray.push(result)

        }

        return  resultNameAsArray
    }


    
//--------------------------------------------------------------------------------------------------------------------------------------------------------

async getReportData(req) {
   
    var All_Readyrooms = await new request().getAll_Readyrooms();

    var All_Pendingrooms = await new request().getAll_Pendingrooms();

    var All_NotReadyrooms = await new request().getAll_NotReadyrooms();

    var Name_Readyrooms = await new request().getName_Readyrooms();

    var report = {
        All_Readyrooms,
        All_Pendingrooms,
        All_NotReadyrooms,
        Name_Readyrooms
    }


    return report
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

    