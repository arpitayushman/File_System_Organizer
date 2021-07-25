
let helpObj = require("./command/help");
let treeObj = require("./command/tree");
let organizeObj = require("./command/organize");

let inputArr = process.argv.slice(2);
let cmd = inputArr[0];
switch(cmd){
    case "tree":
        treeObj.treefxn(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizefxn(inputArr[1]);
        break;
    case "help":
        helpObj.helpfxn();
        break;
    default:
        console.log("👏 Please input command");
        break;
}

