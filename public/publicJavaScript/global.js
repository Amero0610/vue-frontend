/*
 * @Author: AmeroL
 * @Date: 2022-05-06 01:27:40
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-17 00:44:22
 * @FilePath: /vue-frontend/public/publicJavaScript/global.js
 * @email: vian8416@163.com
 */

function stringToArrayWithWrap(str) {
  let a = str.split('\n');
  let objArray = new Array();
  for (let i = 0; i < a.length; i++) {
    let tempobj = {};
    tempobj.value = a[i];
    objArray.push(tempobj);
  }
  // console.log(objArray);
  return objArray;
}

function returnStringWordLenght(str) {
  // way 1
  // // 替换中文字符为空格
  // value = value.replace(/[\u4e00-\u9fa5]+/g, ' ');
  // // 将换行符，前后空格不计算为单词数
  // value = value.replace(/\n|\r|^\s+|\s+$/gi, '');

  // // 多个空格替换成一个空格
  // value = value.replace(/\s+/gi, ' ');
  // // 更新计数
  // var length = 0;
  // var match = value.match(/\s/g);
  // if (match) {
  //   length = match.length + 1;
  // } else if (value) {
  //   length = 1;
  // }
  // return length;

  // way 2
  // str = str.replace(/(^\s*)|(\s*$)/gi, '');
  // str = str.replace(/[ ]{2,}/gi, ' ');
  // str = str.replace(/\n /, '\n');
  // return str.split(' ').length;
  // way 3
  if (str.length == 0) {
    return 0;
  }
  return str.match(/[A-Za-z0-9]+/gm).length;
}

function timeDown(maxtime) {
  let timeMSg = '';
  function CountDown() {
    if (maxtime >= 0) {
      let minutes = Math.floor(maxtime / 60);
      let seconds = Math.floor(maxtime % 60);
      let count = minutes + '分' + seconds + '秒';
      //let msg = 'Remaining:' + minutes + ':' + seconds + '';
      --maxtime;
      timeMSg = count;
      console.log(count);
    } else {
      clearInterval(timer);
    }
  }

  let timer = setInterval(() => {
    CountDown();
  }, 1000);
  return timeMSg;
}

export default {
  stringToArrayWithWrap,
  returnStringWordLenght,
  timeDown,
};
