const fs = require("fs-extra");
const path = require("path");
const XRegExp = require("xregexp");

// 文件路径
let helloWordPath = path.join("./files", "hello-world.md"); // 文章
let outputPath = path.join("./files", "output.json"); // 输出文件

// 内容读取
let helloword = fs.readFile(helloWordPath, "utf8");
// helloword.then(e => {
//   console.log(e)
// })
// console.log(helloword)

// 清空输出文件
// let output = fs.outputFile(outputPath, '')

// 拆分脚注内容
const footnoteRegex = XRegExp(/(?<num>\*\*.{1,3}\*\*)(?<text>.*)/);

helloword.then(postsData => {
  // 获取脚注内容并处理
  console.log(postsData);
  let footnoteInfo = [];
  XRegExp.forEach(
    postsData,
    /\[(?<altText>.*?)\]\((?<imageUrl>[^\s"]+)(?: \"(?<iamgeTitle>.*?)\")?\)/,
    function(match, i) {
      let info = {
        altText: match.groups.altText,
        imageUrl: match.groups.imageUrl,
        iamgeTitle: match.groups.iamgeTitle
      };
      footnoteInfo.push(info);
    }
  );
  console.log(footnoteInfo)
  return footnoteInfo
});

// .then(postsData => {
//     // 获取经文并替换经文中内容为脚注内容
//     return article.then(ccc => {
//         // 经文内容临时放到test中
//         let text = ccc;
//         for (let index = 0; index < postsData.length; index++) {
//             const element = postsData[index];
//             // 如果能在文章中找到脚注，则替换该脚注
//             if (text.indexOf(element.num) != -1) {
//                 // 格式化为脚注格式，并且去掉空格 回车 换行等不合法的字符串
//                 let formatText = "[" + element.text.trim() + "](^)"
//                 text = text.replace(element.num, formatText);
//             }
//         }
//         // console.log(text)
//         return text
//     })
// }).then(outputData => {
//     // 清空输出的文件，重新写入数据
//     return fs.outputFile(outputPath, outputData)
// }).then(()=>{
//     console.log("done!")
// })
