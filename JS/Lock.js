var KeyText = document.querySelector(".inputKey"); //사용자가 입력한 암호키
var InputText = document.querySelector(".inputTEXT"); //사용자가 입력한 평문

function init(){
    //키 셋팅 및 board 셋팅
    SettingBoard();
    console.log(SettingStr());

}

function SettingStr(){
    //평문 셋팅
    var InputValueText = InputText.value; 
    var InputValue = BlankDelete(InputValueText)  // 공백제거한 평문
    // 1. 두 글자씩 자른다.
    // 2. 두 글자가 똑같으면 하나는 X와 같은 채움문자로 셋팅한다.
    // 3. 글자가 홀수 이면 마지막 문자는 X와 같은 채움문자로 셋팅한다.

    var Value;

    for(var i = 0; i < InputValueText.length; i+2){
        var temp = InputValueText.substring(i, 2);
        if(temp[0] == temp[1]){
            temp[1] ='x';
            Value += temp;
        }
        else{
            Value += temp;
        }
    }
    return Value;
}

function SettingBoard(){
    //값 가져오기
    var KeyValueText = KeyText.value;

    //공백 제거하기
    var KeyValue = BlankDelete(KeyValueText); // 공백제거한 키값

    //여기는 키 셋팅
        // key 중복제거 및 alphabet 셋팅
        var key = String(overlap(KeyValue)); //중복제거한 키값
        key += "abcdefghijklmnopqrstuvwxy";

        // 키값에서 중복제거
        var RealKey = overlap(key);
        RealKey.splice(1,1);
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