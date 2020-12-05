curl https://raw.githubusercontent.com/porpoiseless/ithkuil/master/data/dictionary.js \
| sed '$ a module.exports = {ROOT_INDEX};' \
> mod_dic.js
node expand.js > dic_expand.json

curl https://raw.githubusercontent.com/lynn/ithkuil/master/lexicon.hjson \
| node hj2j.js \
| jq '.kkr[0] |= "+k"' \
| jq '.["ř"] |= .[1:]' \
| jq '.zg |= [.[0],.[1:]]' \
| jq '.fsqw |= ["@sk",.]' \
| jq '.pstw |= ["@num",.]' \
| jq '.pk |= ["@pk",.]' \
| jq 'with_entries(select(.key|test("^jm$|^lfq$|^pš$|^kpl$")|not))' \
| jq 'with_entries(select(.value|.[0]!="@kp"))' \
> lex_hj.json
node explex.js > lexexp.json
