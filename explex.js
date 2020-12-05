const lex = require("./lex_hj")
const eo = require("./myE2O.js").myE2O
const oe = Object.entries
const lex_ent_body = oe(lex).filter(([k,_])=>
  !/^@/.test(k)
)
//console.warn(lex_ent_body.filter(v=>/^[\[\]]*$/.test(JSON.stringify(v[1]))))
const res_ent = lex_ent_body.map(
  ([k,table])=>([k,explex_tb(table)])
)
console.log(JSON.stringify(eo(res_ent),null,2))

function map_walk(arr, func, omittable=false) {
  const omit = omittable &&
    arr.some(v=>Array.isArray(v)) // skip sub branches
  return arr.map(
    value =>
      Array.isArray(value) ?
        map_walk(value, func)
      : func&&!omit ? func(value) : value
  )
}

function explex_tb(table) {
  const same_mode = 
    /^[+@]$/.test(table[0][0]) &&
    typeof table[0] == "string" ?
      table[0][0] : null
  const gloss = same_mode ? table.slice(1) : null
  // can be  multiple gloss like @sx pattern)
  const replacement =
    same_mode == "@" ?
      template => template.replace(
        /@(\d?)/g,
        (_,digit)=>digit?gloss[digit-0-1]:gloss[0]
      )
    : same_mode == "+" ?
        str => `${gloss[0]} [${str}]`
        // no multiple plus-glosses up to now
      : null
  const tabarr =
    same_mode ? lex[table[0].slice(
      same_mode == "@" ? 0 : 1
    )] 
    : table
  return explex_ds(
    map_walk(tabarr,replacement)
  )
}

function explex_ds([ifl,fml,ssd]) {
  const [iflex,fmlex] = [
    explex_pt(ifl),
    explex_pt(typeof fml == "string" ?
      map_walk(ifl,v=>v.concat(` @@ [${fml}]`),true)
    : fml.every && fml.every(v=>typeof v =="string") ?
        fml.map((fpk,i)=>{
          const rpl = v=>v.concat(` @@ [${fpk}]`)
          return Array.isArray(ifl[i]) ?
            map_walk(ifl[i],rpl,true)
          : rpl(ifl[i])
        })
      : fml.length==1&&Array.isArray(fml[0])? //mph, msk, t,p
          [...fml,ifl[1],ifl[2]]
        : fml
    )
  ]
  return ssd ? {
    ifl:iflex,fml:fmlex,
    ssd:eo(Object.entries(ssd).map(d=>[
      `ssd${d[0]-0+1}`,d[1]
    ]))
  }:{ifl:iflex,fml:fmlex}
}
function explex_pt([p1,p2,p3]) {
  const [p1x,p2x,p3x] = [
    explex_st(p1),
    explex_st(typeof p2 == "string" ?
      map_walk(p1,v=>/\s@@\s/.test(v)?
        v.replace(/\s@@\s/,` @@ [${p2}] `):
        v.concat(` @@ [${p2}] `)
      ,true) :
      p2
    ),
    explex_st(typeof p3 == "string" ?
      map_walk(p1,v=>/\s@@\s/.test(v)?
        v.replace(/\s@@\s/,` @@ [${p3}] `):
        v.concat(` @@ [${p3}] `)
      ,true) :
      p3
    )
  ]
  return {p1:p1x,p2:p2x,p3:p3x}
}
function explex_st([s1,s2,s3]) {
  const ret_ent = ["s1","s2","s3"].map(k=>[
    k, {s1,s2,s3}[k].replace(/@@/g,"").replace(/\s\s+/g," ")
  ])
  return eo(ret_ent)
}
