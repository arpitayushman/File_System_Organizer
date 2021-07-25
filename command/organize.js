let fs = require("fs");
let path = require("path");
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

// function organizeFn(dirPath) {
//     console.log("organize  command executed with path: " + dirPath);
//     let destPath;
//     if(dirPath == undefined){
//         console.log("Please enter the correct path");
//         return;
//     }
//     else{
//         let exist = fs.existsSync(dirPath);
//         if(exist){
//             destPath = path.join(dirPath,"organized_files");
//             if(fs.existsSync(destPath)==false){
//                 fs.mkdirSync(destPath);
//             }
            
//         }
//         else{
//             console.log("Enter correct path");
//         }
//     }
//     organizeHelper(dirPath,destPath)
// }
// function organizeHelper(source,dest){
//     let childNames = fs.readdirSync(source);
//     //console.log(childNames);
//     for(let i=0;i<childNames.length;i++){
//         let childAddr = path.join(source,childNames[i]);
//         let isfile = fs.lstatSync(childAddr).isFile();
//         if(isfile){
//             //console.log(childNames[i]);
//             let category = (childNames[i]);
//             console.log(childNames[i], category);
//             sendFile(childAddr,dest,category);
//         }
        
//     }
// } 
// function sendFile(srcFilePath,dest,category){
//     let categoryPath = path.join(dest,category);
//     if(fs.existsSync(categoryPath)==false){
//         fs.mkdirSync(categoryPath);
//     }
//     let fileName = path.basename(srcFilePath);
//     let destFilePath = path.join(categoryPath,fileName);
//     fs.copyFileSync(srcFilePath,destFilePath);
//     console.log(fileName,"copied to",category);
// }
// function getCategory(name){
//     let ext = path.extname(name);
//     ext = ext.slice(1);
//     for(let type in types){
//         let cTypeArray = types[type];
//         for(let i=0;i<cTypeArray;i++){
//             if(ext == cTypeArray[i]){
//                 return type;
//             }
//         }
//     }
//     return "others"; 


// }
// module.exports = {
//     organizefxn: organizeFn
// }

 
 

// let fs = require("fs");
// let path = require("path");
// let types = {
//     media: ["mp4", "mkv" , "mp3"],
//     archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
//     documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
//     app: ['exe', 'dmg', 'pkg', "deb"]
// }

function copytodest(dirpath, destfolderPath) {
    let orginalName = path.basename(dirpath);
    let destFilePath = path.join(destfolderPath, orginalName);
    fs.copyFileSync(dirpath, destFilePath);
}

function isFilorNot(dirpath) {
    return fs.lstatSync(dirpath).isFile();
}
function getContent(dirpath) {
    return fs.readdirSync(dirpath);
}
function getFolderName(dirpath) {
    let strArr = dirpath.split(".");
    let ext = strArr.pop();
    for (let key in types) {
        for (let i = 0; i < types[key].length; i++) {
            if (types[key][i] == ext) {
                return key;
            }
        }
    }
    return "others";
}
function orgFiles(dirpath, organizedFilesPath) {
    let isFile = isFilorNot(dirpath);
    if (isFile == true) {
       
        let destFolderName = getFolderName(dirpath);
        console.log(dirpath, "-->", destFolderName);
        let destFolderPath = path.join(organizedFilesPath, destFolderName);
        copytodest(dirpath, destFolderPath);
    } else {
        let content = getContent(dirpath);
        for (let i = 0; i < content.length; i++) {
            let childPath = path.join(dirpath, content[i])
            orgFiles(childPath, organizedFilesPath);
        }
    }
}
function dirCreator(dirpath) {
    if (fs.existsSync(dirpath) == false) {
        fs.mkdirSync(dirpath);
    }
}
function organizeFn(toOrganizeDirPath) {
    //create directories
    let organizedFilesPath = path.join(toOrganizeDirPath, "organized_files");
    dirCreator(organizedFilesPath);
    // organizedFile-> sub directory 
    for (let key in types) {
        let innerDirPath = path.join(organizedFilesPath, key);
        dirCreator(innerDirPath);
    }
    let otherPath = path.join(organizedFilesPath, "others");
    dirCreator(otherPath);

    orgFiles(toOrganizeDirPath, organizedFilesPath)
    // console.log("organize fun ran")
    // traverse and copy files

}

module.exports = {
    organizefxn: organizeFn
}