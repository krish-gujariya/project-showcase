const dbms = require("../models/delimetersdb");
const counts = require("../models/attendancedb");

const first = (req,res)=>{
    dbms.fetchdata(0).then((data)=>{
        counts.counts().then((data1)=>{
            let num = data1.count;
            if(data.success){
                
                res.render('delimetersearch',{
                    Property:data.property,
                    Data:data.record,
                    init:1,
                    Count:num,
                    success:data.success,
                    sm:0,
                    arr:errarr,
                    querry:""
                })
                
            }
            else{
                res.render("delimetersearch", {
                    success:data.success,
                    init:1,
                    querry:querry
                })
            }
        }).catch((e)=>{
            console.log(e);
        })
    }).catch((e)=>{
        console.log(e);
    })

}


let search = false;
let tempsm = 0; 

const list = (req,res)=>{
    let page  = req.query.pg;
      sm = req.query.sm;
    if(sm){
        tempsm = sm
    }
    else{
        sm = tempsm;
    }
    let x = (page-1)*20;
    if(!search){

        dbms.fetchdata(x).then((data)=>{
            counts.counts().then((data1)=>{
                
                if(data.success){
                    let num = data1.count
                    res.render('delimetersearch',{
                        Property:data.property,
                        Data:data.record,
                        init:page,
                        Count:num,
                        success:data.success,
                        sm:tempsm,
                        arr:errarr,
                        querry:querry
                    })
                    
                }
                else{
                    res.render("delimetersearch",{
                        success:data.success,
                        sm:tempsm,
                        init:1,
                        querry:querry
                    })
                }
            }).catch((e)=>{
                console.log(e);
            })
        }).catch((e)=>{
            console.log(e);
        })
    }
    else{
        dbms.search(condition,x).then((data)=>{
            if(data.success){
               res.render("delimetersearch",{
                Property:data.property,
                    Data:data.record,
                    init:page,
                    Count:data.count,
                    success: data.success,
                    sm:tempsm,
                    arr:errarr,
                    querry:querry
               }) 
            }
            else{console.log(data.message);
                res.render("delimetersearch",{
                    success:data.success,
                    sm:tempsm,
                    init:1,
                    arr:errarr,
                    querry:querry
                })
            }
        
    }).catch((e)=>{
        console.log(e);
    })
    }
}

let errarr =[];
let condition = "";
let querry;

const postlist = (req,res)=>{
    search = true;
    let page  = req.query.pg;
    let x = (page-1)*20
   
    let fname =[];
    let lname = [];
    let city = [];
    let phone =[];
    let email =[];

     querry = req.body.wholeq;
     let querry1 = querry.split(" ").join("");
    let asd = querry1.replaceAll('_', ' _').replaceAll('^',' ^').replaceAll('$',' $').replaceAll(':',' :').replaceAll('}',' }').split(' ');
    ;
    asd.shift();


    asd.forEach(element => {

        let a = element.at(0);
        switch(a){
            case('_'):{
                    fname.push("'"+element.substring(1)+"%'");  //"aa%"
                    message = false;
                    break;
            }
            
            case('^'):{
                    lname.push("'"+element.substring(1)+"%'");
                    message = false;
                    break;
            }
            
            case('$'):{
                    city.push("'"+element.substring(1)+"%'");
                    message = false;
                    break;
            }
            
            case('}'):{
                    phone.push("'"+element.substring(1)+"%'");
                    message = false;
                    break;
            }

            case(':'):{
                    email.push("'"+element.substring(1)+"%'"); 
                    message = false;
                    break;
            }

            default:{
                break;
            }

        }
        
    });


    let subq = [];
    if(!fname.length==0){
          subq.push(" (fname like "+ fname.join(" or fname like ")+")");

    }

    if(!lname.length==0){
         subq.push(" (lname like "+ lname.join(" or lname like ")+")");
    }

    if(!phone.length==0){
         subq.push("( phone_no like "+ phone.join(" or phone_no like ")+")");
    }

    if(!email.length==0){
          subq.push(" (email like "+ email.join(" or email like ")+")");
    }

    if(!city.length==0){
         subq.push("( city like "+ city.join(" or city like ")+")");
    }

        if(!subq.length==0){
            condition = 'Where ' +  subq.join(" and ");
        }
        dbms.search(condition,x).then((data)=>{

                if(data.success){
                   res.render("delimetersearch",{
                    Property:data.property,
                        Data:data.record,
                        init:page,
                        Count:data.count,
                        success: data.success,
                        sm:tempsm,
                        arr:errarr,
                        querry:querry
                   }) 
                }
                else{console.log(data.message);
                    res.render("delimetersearch",{
                        success:data.success,
                        sm:tempsm,
                        init:1,
                        querry:querry
                    })
                }
            
        }).catch((e)=>{
            console.log(e);
        })

}


module.exports = {first,list,postlist};