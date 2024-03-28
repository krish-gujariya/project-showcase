let mysql = require('mysql');
let fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');

conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"root",
    database: "Student_Info"
})

conn.connect((err)=>{
    if(err) console.log(err);
})


async function Record(number){
    let mp = async()=> new Promise((resolve, reject) => {
        
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
       LIMIT 200 offset ${number}
       ;`
        conn.query(sql,(err,data)=>{
            if(err) console.log(err);
            resolve(JSON.parse(JSON.stringify(data)));
        })
        
    })
    let c = mp();
    return c;
}



async function RecordQuerry(number){
    let result = await Record(number);
    return result;
}


async function Result(id){
    let mp = async() =>  new Promise((resolve,reject)=>{
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
        conn.query(sql,id,(err,data)=>{
            if(err) console.log(err);
            resolve(JSON.parse(JSON.stringify(data)));
        })
    })
    let c = mp();
    return c;
}



async function Resultdata(id){
    let data = await Result(id);
    return data;
}

async function resgrade(id){
    let mp = async() => new Promise((resolve,rejects)=>{
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

       conn.query(sql,id,(err,data)=>{
        if(err) console.log(err);
        resolve(JSON.parse(JSON.stringify(data)));
       })
    })
    let c = mp();
    return c;
}

async function grade(id){
    let data = await resgrade(id);
    return data; 
}

async function Attendance(number){
    let mp = async()=> new Promise((resolve, reject) => {
        
        sql =`Select ROUND((count(Attendance1.PA1)*100/90),2) as Percentage
        FROM Attendance1 LEFT JOIN Student_Master 
        ON
        Attendance1.Student_Id = Student_Master.Student_Id
        WHERE PA1 = 1 and Student_Master.Student_Id =?`;
        conn.query(sql,number,(err,data)=>{
            if(err) console.log(err);
            resolve(JSON.parse(JSON.stringify(data)));
        })
        
    })
    let c = mp();
    return c;
}

async function Attenper(number){
    let result = await Attendance(number);
    return result;
}


module.exports ={RecordQuerry, Resultdata,grade, Attenper};
