var KeyText = document.querySelector(".inputKey"); //사용자가 입력한 암호키
var InputText = document.querySelector(".inputTEXT"); //사용자가 입력한 평문

function init(){
    SettingBoard();
}

function SettingBoard(){
    //값 가져오기
    var ReplaceText = InputText.value; 
    var KeyValueText = KeyText.value;

    //공백 제거하기
    var ReplaceValue = BlankDelete(ReplaceText)  // 공백제거한 평문
    var KeyValue = BlankDelete(KeyValueText); // 공백제거한 키값

    // key 중복제거 및 alphabet 셋팅
    var key = String(overlap(KeyValue)); //중복제거한 키값
    key += "abcdefghijklmnopqrstuvwxy";

    // 키값에서 중복제거
    var RealKey = overlap(key);
    RealKey.splice(1,1);

    for(var i=0; i<RealKey.length; i++)
        console.log(i+1 +" = " + RealKey[i]);
}

// blank 제거함수
function BlankDelete(BlankText){
    return BlankText.replace(/(\s*)/g, "");
}

//중복제거 함수
function overlap(overlapText){
    var arr = [], dupArr = [];
    for(var i=0; i<overlapText.length; i++) {
        var t = overlapText[i].toLowerCase();
        if(arr.indexOf(t)<0) arr.push(t);
        else if(dupArr.indexOf(t)<0) dupArr.push(t);
    }
    return arr;
}

function strEncryption(){
    
}