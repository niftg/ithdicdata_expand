curl https://raw.githubusercontent.com/porpoiseless/ithkuil/master/data/dictionary.js \
| sed '$ a module.exports = {ROOT_INDEX};' \
> mod_dic.js
node expand.js > dic_expand.json
