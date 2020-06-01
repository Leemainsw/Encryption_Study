var KeyText = document.querySelector(".inputKey"); //사용자가 입력한 암호키
var InputText = document.querySelector(".inputTEXT"); //사용자가 입력한 평문

function init(){
    //값 가져오기
    var ReplaceText = InputText.value; 
    var KeyValueText = KeyText.value;

    //공백 제거하기
    var ReplaceValue = BlankDelete(ReplaceText)  // 공백제거한 평문
    var KeyValue = BlankDelete(KeyValueTsext); // 공백제거한 키값

    var key = overlap(KeyValue);
}

// blank 제거함수
function BlankDelete(BlankText){
    return BlankText.replace(/(\s*)/g, "");
}

//중복제거 함수
function overlap(overlapText){
    var arr = [], dupArr = [];
    for(var i=0; i<text.length; i++) {
        var t = overlapText[i].toLowerCase();
        if(arr.indexOf(t)<0) arr.push(t);
        else if(dupArr.indexOf(t)<0) dupArr.push(t);
    }
    console.log(arr);
    return dupArr.length;
}
