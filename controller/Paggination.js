let dbms = require('../models/pagginationdb');


const first = (req,res)=>{
    let cnd ='Student_id'
    let page=1;
    let x =0;
    dbms.lists(x,cnd).then((data)=>{
        dbms.counts().then((data2)=>{
            let count1 = data2[0].count;
            res.render('paging',{Data:data, Count:count1, init:page , value:cnd});
        })
    })
}


const pagginate = (req,res)=>{
    let x = (req.query.page-1)*200;
    console.log(x);
    let page =req.query.page;
    let cnd = req.query.values;
    console.log(typeof cnd);
    dbms.lists(x, `${cnd}`).then((data)=>{
        dbms.counts().then((data2)=>{
            let count1 = data2[0].count;
            res.render('paging',{Data:data, Count:count1, init:page , value:cnd});
        })
    })
    

    }

module.exports ={
    first,
    pagginate
}
