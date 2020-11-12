curl https://raw.githubusercontent.com/porpoiseless/ithkuil/master/data/dictionary.js \
| sed '$ a module.exports = {ROOT_INDEX};' \
> mod_dic.js
node expand.js > dic_expand.json

curl https://raw.githubusercontent.com/lynn/ithkuil/master/lexicon.hjson \
| node hj2j.js > lex_hj.json
