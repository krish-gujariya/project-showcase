let dbms = require('../models/pagginationdb');


const first = (req,res)=>{
    let cnd ='Student_id'
    let page=1;
    let x =0;

    try {
        pagerecord();
        
    } catch (error) {
        console.log(error);
    }


    async function pagerecord(){

        const data = await dbms.lists(x,cnd);
        if(data.success){
            const counts = await dbms.counts();
            res.render('paging',{Data:data.data, Count:counts.count, init:page , value:cnd});
        }
        else{
            res.send("Internal server error")
        }

    }


}


const pagginate = (req,res)=>{
    let x = (req.query.page-1)*200;
    let page =req.query.page;
    let cnd = req.query.values;
    
    try {
        pagerecord();
        
    } catch (error) {
        console.log(error);
    }


    async function pagerecord(){

        const data = await dbms.lists(x,cnd);
        if(data.success){
            const counts = await dbms.counts();
            res.render('paging',{Data:data.data, Count:counts.count, init:page , value:cnd});
        }
        else{
            res.send("Internal server error")
        }

    }

    }

module.exports ={
    first,
    pagginate
}
