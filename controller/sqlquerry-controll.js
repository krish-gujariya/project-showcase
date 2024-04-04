const dbms =require("../models/sqlquerrydb");


const first = (req, res) => {
    let x = 0;
    let pg = 1;
    res.render("sqlresult", {
      init: pg,
      Count: 0,
      pos: x,
      value: "",
      select: false,
    });   
};
let ab;
const list = (req, res) => {
    let x = (req.query.pg - 1) * 20;
    let page = req.query.pg;
    ab = req.body.querry;
    if (!ab.match(/select/i)) {
      res.render("sqlresult", {
        init: 0,
        Count: 0,
        pos: 1,
        select: true,
        value: "",
      });
      return 0;
    }

    try {
      sqldata();
    } catch (error) {
      console.log(error);
    }

    async function sqldata(){
        const data = await dbms.RecordQuerry(ab,x);
        const count = await dbms.counts(ab);
        if(count.success){
          res.render("sqlresult", {
                      Data: data.data,
                      Property: data.prop,
                      init: page,
                      Count: count.count,
                      value: ab,
                      pos: 1,
                      select: false,
                      success: true,
                    });
        }
        else{
          let error = count.count;
                    if(error.match(/You have an error in your SQL syntax/i)){
                        error = 'You have error in sql syntax';
                    }

            res.render("sqlresult", {
              init: 0,
              Count: 0,
              success: count.success,
              pos: 1,
              select: false,
              value: "",
              errmessage: error,
            });
        }
    }

  }


  const getlist = (req, res) => {
    let x = (req.query.pg - 1) * 20;
    let page = req.query.pg;
   
    try {
      
      sqldata();
    } catch (error) {
      res.send("data not found")
      console.log(error);
    }

    async function sqldata(){
      const data = await dbms.RecordQuerry(ab,x);
      const count = await dbms.counts(ab);
      if(count.success){
        
        res.render("sqlresult", {
          Data: data.data,
          Property: data.prop,
          init: page,
          Count: count.count,
          value: ab,
          pos: 1,
          select: false,
          success: true,
        });

      }
      else{
        res.send("data not found");
      }
    }
  
  }

module.exports = {first, list, getlist}