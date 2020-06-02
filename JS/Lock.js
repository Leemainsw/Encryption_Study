var KeyText = document.querySelector(".inputKey"); //사용자가 입력한 암호키
var InputText = document.querySelector(".inputTEXT"); //사용자가 입력한 평문

var board = new Array(4);
    for (i = 0; i <=4; i++){
        board[i] = new Array(5);
    }

function init(){
    //키 셋팅 및 board 셋팅
    SettingBoard();
    SettingStr(inputText.value);
    //console.log(SettingStr());
}

function SettingStr(str){
    for( let i = 0 ; i < str.length() ; i++ ) 
    {
        if(str.charAt(i)==' ') //공백제거
        {
            str = str.substring(0,i)+str.substring(i+1,str.length);
            blankCheck+=10;
        }
        else
        {
            blankCheck+=0;
        }
        if(str.charAt(i)=='z') //z를 q로 바꿔줘서 처리함.
        {
            str = str.substring(0,i)+'q'+str.substring(i+1,str.length);
            zCheck+=1;
        }
        else 
        {
            zCheck+=0;
        }
    }
    return str;
}

//RealKey의 값을 
function SettingBoard(){
    //값 가져오기
    var KeyValueText = KeyText.value;

    //공백 제거하기
    var KeyValue = BlankDelete(KeyValueText); // 공백제거한 키값
2
    //여기는 키 셋팅
        // key 중복제거 및 alphabet 셋팅
        var key = String(overlap(KeyValue)); //중복제거한 키값
        key += "abcdefghijklmnopqrstuvwxy";

        // 키값에서 중복제거
        var RealKey = overlap(key);
        RealKey.splice(1,1);

        for(let i=0; i<25; i++){
            for(let j=0; j<5; j++){
                console.log(board[i][j])
            }
        }
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