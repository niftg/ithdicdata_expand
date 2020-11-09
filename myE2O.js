//my entries-to-object function

function myE2O(entries) {
  return entries.reduce((a,[k,v])=>({...a,[k]:v}),{})
}

module.exports = {myE2O}
