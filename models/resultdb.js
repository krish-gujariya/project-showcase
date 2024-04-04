let mysql = require('mysql');
let fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');
const mysql1 = require("./studentdb-connection");

const {conn, prom} =  mysql1.connection();




async function RecordQuerry(number){
        
        sql =`Select 
        Result.Student_id as rollno, Student_Master.fname,
       sum(case when exam_id =1 then pracmark  end) as terprac,
       sum(case when exam_id =1 then ThMark  end) as tertheor,
       sum(case when exam_id =2 then pracmark  end) as preprac,
       sum(case when exam_id =2 then ThMark  end) as pretheor,
       sum(case when exam_id =3 then pracmark  end) as finprac,
       sum(case when exam_id =3 then ThMark  end) as fintheor,
       sum(pracmark + ThMark) as Obtotal,
       sum(totalpracmark+ totalthmark) as otf,
       ( ROUND(sum(pracmark + ThMark)*100/sum(totalpracmark+ totalthmark),2)) as percent
       from Result LEFT JOIN Student_Master
       ON
       Result.Student_id = Student_Master.Student_id
       group by Result.Student_id
       LIMIT 200 offset ?
       ;`

       try {
           const result = await prom(sql, number);
           const data = JSON.parse(JSON.stringify(result));
           return {data:data, success:true};
        
       } catch (error) {
            console.log(error);
            return {data:null, success:false};

       }
    }



async function Resultdata(id){
        sql =`
        Select 
         Result.Subject_id, Subject.Subject_name,
        sum(case when exam_id =1 then pracmark  end) as terprac,
        sum(case when exam_id =1 then ThMark  end) as tertheor,
        sum(case when exam_id =2 then pracmark  end) as preprac,
        sum(case when exam_id =2 then ThMark  end) as pretheor,
        sum(case when exam_id =3 then pracmark  end) as finprac,
        sum(case when exam_id =3 then ThMark  end) as fintheor,
        sum(pracmark + ThMark) as Obtotal,
        sum(totalpracmark+ totalthmark) as otf
        from Result LEFT JOIN Subject
        ON
        Result.Subject_id = Subject.Subject_id
        where Result.Student_id = ?
        group by Result.Subject_id , Result.Student_id
        ;`;

        
        try {
            const result= await prom(sql, [id]);
            const data = JSON.parse(JSON.stringify(result));
            return {success:true,data:data};
        } catch (error) {
            console.log(error);
            return {success:false , data:null};
            
        }
}


async function grade(id){
        sql =`Select  Student_Master.fname, Student_Master.lname, Student_Master.dept_name,
       sum(pracmark + ThMark) as Obtotal,
       sum(totalpracmark+ totalthmark) as otf,
       ( ROUND(sum(pracmark + ThMark)*100/sum(totalpracmark+ totalthmark),2)) as percent
       from Result LEFT JOIN Student_Master
       ON
       Result.Student_id = Student_Master.Student_id
       where Result.Student_id =?
       group by Result.Student_id
       ;`;
          
       try {
        const result= await prom(sql, [id]);
        const data = JSON.parse(JSON.stringify(result));
        return {success:true,data:data};
    } catch (error) {
        console.log(error);
        return {success:false , data:null};
        
    }
}


async function Attenper(number){
        
        sql =`Select ROUND((count(Attendance1.PA1)*100/90),2) as Percentage
        FROM Attendance1 LEFT JOIN Student_Master 
        ON
        Attendance1.Student_Id = Student_Master.Student_Id
        WHERE PA1 = 1 and Student_Master.Student_Id =?`;
        
             
       try {
        const result= await prom(sql, [number]);
        const data = JSON.parse(JSON.stringify(result));
        return {success:true,data:data};
    } catch (error) {
        console.log(error);
        return {success:false , data:null};
        
    }

       
}


module.exports ={RecordQuerry, Resultdata,grade, Attenper};
