const student = require('../models/userdb')
const course = require('../models/coursedb')
const faculty = require('../models/facultydb')
const connect = require('../models/mongoose')

class request {

//--------------------------------------------------------------------------------------------------------------------------------------------------------   

     //Create Faculty 
     async createFaculty(req) {
        var functionname = "[CreateFaculty]"
        
        //create instance from model 
        var Faculty = new faculty ({

            FacultyID: req.FacultyID,
            FacultyName_Th: req.FacultyName_Th,
            FacultyName_Eng: req.FacultyName_Eng,
  
        })

        //Check FacultyID in database
        var resultcheck_FacultyID = await new connect().checkexist({ FacultyID: req.FacultyID }, "facultydb")
        console.log(resultcheck_FacultyID) 
        if (!resultcheck_FacultyID) {
        } else {
            return `${functionname} FacultyID not available`
        }
        

        //save Faculty to database
        await Faculty.save()
        return `${functionname}  Successfully `
    }

//--------------------------------------------------------------------------------------------------------------------------------------------------------

    //Create Course
    async createCourse(req) {
        var functionname = "[CreateCourse]"
        
        //create instance from model 
        var Course = new course ({

            CourseID: req.CourseID,
            CourseName_Th: req.CourseName_Th,
            CourseName_Eng: req.CourseName_Eng,
            Type: req.Type,
            Faculty: {
                FacultyID: req.Faculty.FacultyID,
            }

        })
        
        //Check CourseID in database
        var resultcheck_CourseID = await new connect().checkexist({ CourseID: req.CourseID }, "coursedb")
        console.log(resultcheck_CourseID) 
        if (!resultcheck_CourseID) {
        } else {
            return `${functionname} CourseID not available`
        }

        //Check FacultyID in database
        var resultcheck_FacultyID = await new connect().checkexist({ FacultyID: req.Faculty.FacultyID }, "facultydb")
        console.log(resultcheck_FacultyID) 
        if (resultcheck_FacultyID) {
        } else {
            return `${functionname} FacultyID not found`
        }
        

        //save Faculty to database
        await Course.save()
        return `${functionname}  Successfully `
    }


//--------------------------------------------------------------------------------------------------------------------------------------------------------

    //Create Student  
    async createStudent(req) {
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
            }
            
        })

        //Check studentID in database
        var resultcheck_StudentID = await new connect().checkexist({ StudentID: req.StudentID }, "userdb")
        console.log(resultcheck_StudentID) //false คือ ไม่เจอ
        if (!resultcheck_StudentID) {
        } else {
            return `${functionname} StudentID not available`
        }
        
        //Check CourseID in database
        var resultcheck_CourseID = await new connect().checkexist({ CourseID: req.Course.CourseID }, "coursedb")
        console.log(resultcheck_CourseID) 
        if (resultcheck_CourseID) {
        } else {
            return `${functionname} CourseID not found`
        }

        //save student to database
        await Student.save()
        return `${functionname}  Successfully `
    }
    
//--------------------------------------------------------------------------------------------------------------------------------------------------------

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
        var resultStundent = await new connect().get({ StudentID: req.StudentID }, "userdb")
        console.log(resultStundent)
       
        //get course information by ID in coursedb collection
        var resultCourse = await new connect().get({ CourseID:resultStundent[0].Course.CourseID }, "coursedb")
        console.log(resultCourse)

        //get Facult information by ID in coursedb collection
        var resultFaculty = await new connect().get({ FacultyID:resultCourse[0].Faculty.FacultyID }, "facultydb")
        console.log(resultFaculty)
       
        
        var result = {
            Firstname_Th: resultStundent[0].Firstname_Th,
            Firstname_Eng: resultStundent[0].Firstname_Eng,
            Lastname_Th: resultStundent[0].Lastname_Th,
            Lastname_Eng :resultStundent[0].Lastname_Eng ,
            FacultyName_Th : resultFaculty[0].FacultyName_Th,
            FacultyName_Eng : resultFaculty[0].FacultyName_Eng

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

    