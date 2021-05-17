import * as fs from "fs";
import {staticFileDir} from "../config/StaticFileConfig";

export  function addImg(fileName: string, fileBase64Url: string) {
    fileBase64Url = fileBase64Url.replace(/^data:image\/.*?;base64,/,"");

    const bitmap = new Buffer(fileBase64Url, 'base64');

    const newFileName = new Date().getTime() + "_" + fileName;

    fs.writeFileSync(`${staticFileDir}${newFileName}`,bitmap,{flag:'w'});

    return "/static/" + newFileName;

}
