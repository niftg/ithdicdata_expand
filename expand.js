const r = require("./mod_dic").ROOT_INDEX
const eo = require("./myE2O").myE2O

const dsk = ["ifl","fml"]
const ptk = ["p1","p2","p3"]
const stk = ["s1","s2","s3"]

const rex = r.map(({gloss,root,table,derived})=>{
  const ret = {gloss, root, table: table2obj(table)}
  if(derived){ret.derived=derived}
  return ret
})

console.log(JSON.stringify(rex,null,2))

function table2obj(table) {
  return eo(table.map((ds,i)=>[
    dsk[i], eo(ds.map((pt,i1)=>[
      ptk[i1], eo(pt.map((st,i2)=>[
        stk[i2], st
      ]))
    ]))
  ]))
}
