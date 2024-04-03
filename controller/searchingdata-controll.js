const dbms = require("../models/datasearchingdb");
const counts = require("../models/attendancedb");


const first = (req,res)=>{

    dbms.fetchdata(0).then((data)=>{
        counts.counts().then((data1)=>{
            let num = data1.count;
            if(data.success){
                
                res.render('searchingdata',{
                    Property:data.property,
                    Data:data.record,
                    init:1,
                    Count:num,
                    success:data.success,
                    sm:0
                })
                
            }
            else{
                res.render("searchingdata", {
                    message:data.message,
                    success:data.success,
                    init:1
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
                    res.render('searchingdata',{
                        Property:data.property,
                        Data:data.record,
                        init:page,
                        Count:num,
                        success:data.success,
                        sm:tempsm
                    })
                    
                }
                else{
                    res.render("searchingdata",{
                        success:data.success,
                        sm:tempsm,
                        init:1
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
               res.render("searchingdata",{
                Property:data.property,
                    Data:data.record,
                    init:page,
                    Count:data.count,
                    success: data.success,
                    sm:tempsm
               }) 
            }
            else{console.log(data.message);
                res.render("searchingdata",{
                    success:data.success,
                    sm:tempsm,
                    init:1
                })
            }
        
    }).catch((e)=>{
        console.log(e);
    })
    }
}


const postlist = (req,res)=>{
    search = true;
    let page  = req.query.pg;
    let x = (page-1)*20


    let st =[];
    let sid = req.body.sid;
    
    if(sid){
       st.push(" Student_Id in ("+sid +")");
    }

    let fname = req.body.fname;
    if(fname){
        st.push(" fname like '"+fname+"%'");
     }
    let lname = req.body.lname;
    if(lname){
        st.push(" lname like '"+lname+"%'");
     }
    let city = req.body.city;
    if(city){
        st.push(" city =  '"+city+"'");
     }
    
    let opt = req.body.opt;
        condition = 'Where ' + st.join(' '+opt+' ');
        dbms.search(condition,x).then((data)=>{

                if(data.success){
                   res.render("searchingdata",{
                    Property:data.property,
                        Data:data.record,
                        init:page,
                        Count:data.count,
                        success: data.success,
                        sm:tempsm
                   }) 
                }
                else{console.log(data.message);
                    res.render("searchingdata",{
                        success:data.success,
                        sm:tempsm,
                        init:1
                    })
                }
            
        }).catch((e)=>{
            console.log(e);
        })

}


module.exports = {first,list,postlist}