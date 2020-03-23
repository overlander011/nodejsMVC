const student = require('../models/userdb')
const connect = require('../models/mongoose')

class request {
    
    //Create Student  
    async CreateStudent(req) {
        var functionname = "[CreateStudent]"
        
        //create instance from model 
        var Student = new student ({

            StudentID: req.StudentID,
            Firstname_Th: req.Firstname_Th,
            Firstname_Eng: req.Firstname_Eng,
            Lastname_Th: req.Lastname_Th,
            Lastname_Eng :req.Lastname_Eng ,
            Course : {
                CourseID: req.Course.CourseID,
	 		    CourseName_Th: req.Course.CourseName_Th, 		
	 		    CourseName_Eng: req.Course.CourseName_Eng,
                Type: req.Course.Type,
                Faculty : {
                    FacultyID : req.Course.Faculty.FacultyID,
                    FacultyName_Th : req.Course.Faculty.FacultyName_Th,
                    FacultyName_Eng: req.Course.Faculty.FacultyName_Eng
                }
            }
            
        })

        //Check studentID in database
        var resultcheckID = await new connect().checkexist({ StudentID: req.StudentID }, "userdb")
        console.log(resultcheckID) //false คือ ไม่เจอ
        if (!resultcheckID) {
        } else {
            return `${functionname} StudentID not available`
        }

        //save student to database
        await Student.save()
        return `${functionname}  Successfully `
    }
    
    //get student information by ID
    async getStudentbyID(req) {
        var functionname = "[getStudentbyID]"
        
        //Check StudentID in database ?
        var resultcheckID = await new connect().checkexist({ StudentID: req.StudentID }, "userdb")
        if (resultcheckID) {
        } else {
            return `${functionname} StudentID not found `
        }
        
        //get student information by ID in userdb collection
        var resultgetID = await new connect().get({ StudentID: req.StudentID }, "userdb")
        var result = {
            Firstname_Th : resultgetID[0].Firstname,
            Firstname_Th: resultgetID[0].Firstname_Th,
            Firstname_Eng: resultgetID[0].Firstname_Eng,
            Lastname_Th: resultgetID[0].Lastname_Th,
            Lastname_Eng :resultgetID[0].Lastname_Eng ,
            FacultyName_Th :resultgetID[0].Course.Faculty.FacultyName_Th,
            FacultyName_Eng: resultgetID[0].Course.Faculty.FacultyName_Eng
                
            
        }
        
        return result
    }



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

    