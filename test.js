const fs = require('fs-extra')
const path = require("path")
const XRegExp = require('xregexp');

// 文件路径
let articlePath = path.join('./files', 'article.md'); // 经文
let footnotePath = path.join('./files', 'footnote.md'); // 脚注
let outputPath = path.join('./files', 'output.md'); // 输出文件

// 内容读取
let article = fs.readFile(articlePath, 'utf8')
let footnote = fs.readFile(footnotePath, 'utf8')
// 清空输出文件
// let output = fs.outputFile(outputPath, '')

// 拆分脚注内容 
const footnoteRegex = XRegExp(/(?<num>\*\*.{1,3}\*\*)(?<text>.*)/);


footnote.then(footnoteData => {
    // 获取脚注内容并处理
    // console.log(data)
    let footnoteInfo = [];
    XRegExp.forEach(footnoteData, /(\*\*)(.{1,3})(\*\*)(.*)/, function (match, i) {
        let dataProcess = XRegExp.exec(match[0], footnoteRegex);
        // console.log(dataProcess.groups.num)
        // console.log(dataProcess.groups.text)
        let info = {
            num: dataProcess.groups.num,
            text: dataProcess.groups.text
        }
        footnoteInfo.push(info)
    });
    // console.log(footnoteData)
    return footnoteInfo
}).then(footnoteData => {
    // 获取经文并替换经文中内容为脚注内容
    return article.then(ccc => {
        // 经文内容临时放到test中
        let text = ccc;
        for (let index = 0; index < footnoteData.length; index++) {
            const element = footnoteData[index];
            // 如果能在文章中找到脚注，则替换该脚注
            if (text.indexOf(element.num) != -1) {
                // 格式化为脚注格式，并且去掉空格 回车 换行等不合法的字符串
                let formatText = "[" + element.text.trim() + "](^)"
                text = text.replace(element.num, formatText);
            }
        }
        // console.log(text)
        return text
    })
}).then(outputData => {
    // 清空输出的文件，重新写入数据
    return fs.outputFile(outputPath, outputData)
}).then(()=>{
    console.log("done!")
})