let fs = require("fs");
let path = require("path");

function tree(src) {
    console.log("tree command executed with path : " + src);
    if(src==undefined){
        src = process.cwd();
    }
    let content = fs.readdirSync(src);
    console.log(content);
    let parentFolderName = path.basename(src);
    let completePath = "└──" + parentFolderName;
    for(let i = 0;i<content.length;i++){
        completePath = completePath + "\n\t" + "├──"+content[i];

    console.log(completePath);
    console.log("`````````````````");
    }
    console.log(completePath);
}

module.exports = {
    treefxn: tree
}