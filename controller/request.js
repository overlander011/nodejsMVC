const patient = require('../models/patientdb')
const hospital = require('../models/hospitaldb')
const patientStatus = require('../models/patientStatusdb')
const connect = require('../models/mongoose')

class request {
    async request (){return}

//--------------------------------------------------------------------------------------------------------------------------------------------------------   

     //Create Faculty 
     async getAll_PatientList(req) {
        
        //get covid - patient in database
        var covidPatientIDList = await new connect().get({ Covid_status:"Positive"  }, "patientStatusdb")
        var All_PatientListAsArray =[] 

        for(var i=0 ; i<covidPatientIDList.length; i++){
             var HNID = covidPatientIDList[i].HNID
             var All_PatientList = await new connect().get( {HNID : HNID} , "patientdb")
        
             //result of information's covid patiene
             var result = {
                 HNID: All_PatientList[0].HNID,
                 Firstname: All_PatientList[0].Firstname,
                 Lastname :All_PatientList[0].Lastname,
                 HID : All_PatientList[0].HID
             }

            All_PatientListAsArray.push(result)
        }
        return All_PatientListAsArray

     }

//--------------------------------------------------------------------------------------------------------------------------------------------------------

    //getTotal Patients In Hospital
    async getTotal_PatientsInHospital(req) {

        var All_PatientsInHospital = [] 
        var each_PatientInHospital = [] 
        var ResultEachHospital =[]
        var All_PatientList = await new request().getAll_PatientList();
        
        for(var i =0; i<All_PatientList.length ; i++){
            //HID ของผู้ป่วยโควิดแต่ละคน 
            var PatientListHID = All_PatientList[i].HID 
            //ข้อมูลโรงพยาบาลของแต่ละคน
            var patientHID = await new connect().get({ HID:PatientListHID }, "hospitaldb") 
            var AllHospital = await new connect().get({  }, "hospitaldb") 

            var result ={
                 HID:patientHID[0].HID,
                 Title: patientHID[0].Title
            }
            //อ่านและเก็บค่าใส่อาเรย์
            All_PatientsInHospital.push(result)
            
        }
   
        //นับจำนวนผู้ป่วยแต่ละโรงพยาบาล
        for(var j=0;j<AllHospital.length;j++){
            var count = 0;
            for(var k=0;k<All_PatientsInHospital.length;k++){
                if(AllHospital[j].HID==All_PatientsInHospital[k].HID){
                    count += 1
                    each_PatientInHospital[j] = count            
                }                 
            }   
            //จับค่าใส่ใน json 
            var resultEachHospital = {
                Title: AllHospital[j].Title,
                Total: each_PatientInHospital[j]
            }
            //ใส่ค่าในอาเรย์
            ResultEachHospital.push(resultEachHospital)
            ResultEachHospital.sort((a, b) => Number(b.Total) - Number(a.Total));
        }

        return  ResultEachHospital



      

    }




//--------------------------------------------------------------------------------------------------------------------------------------------------------

    async getDataPatient(req) {
        var functionname = "[ShowDataPatient]"
       
        var All_PatientList = await new request().getAll_PatientList();

        var Total_Patients = await new request().getTotal_PatientsInHospital();
        var result = {
            All_PatientList,
            Total_Patients
        }




        return result
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
        var resultCourse = await new connect().get({ Course: resultStundent.Course.CourseID }, "coursedb")
        console.log(resultCourse)
        
     
        
        var result = {
            Firstname_Th: resultStundent[0].Firstname_Th,
            Firstname_Eng: resultStundent[0].Firstname_Eng,
            Lastname_Th: resultStundent[0].Lastname_Th,
            Lastname_Eng :resultStundent[0].Lastname_Eng ,
            Course: resultStundent[0].Course.CourseID
            // FacultyName_Th : resultFaculty[0].FacultyName_Th,
            // FacultyName_Eng : resultFaculty[0].FacultyName_Eng

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

    