var KeyText = document.querySelector(".inputKey"); //사용자가 입력한 암호키
var InputText = document.querySelector(".inputTEXT"); //사용자가 입력한 암호문
var PReasult = document.querySelector("#result");
var NextBtn = document.querySelector("#encryptionBtn");
var zCheck = new Array();
var RealKey;

var board = new Array(4);
for (i = 0; i <=4; i++){
    board[i] = new Array(5);
}

function init(){
    //키 셋팅 및 board 셋팅
    SettingBoard();

    var DecryptionResult = strDecryption(RealKey, BlankDelete(InputText.value));
    //숨기기
    KeyText.style.display = "none";
    InputText.style.display = "none";
    PReasult.style.display = "block";
    PReasult.innerHTML= DecryptionResult;
    NextBtn.style.display = "none";
}

//RealKey의 값을 
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
        RealKey = overlap(key);
        RealKey.splice(1,1);

        //board [5][5] 배열에 Real Key 넣기
        board = RealKey.reduce((RealKey, number, index) => {
        const criteria = 5;
        const arrayIndex = Math.floor(index / criteria);
        if (!RealKey[arrayIndex]) {
            RealKey[arrayIndex] = [];
        }
        RealKey[arrayIndex] = [...RealKey[arrayIndex], number];
            return RealKey;
        }, []);
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

// 복호화
function strDecryption(key, str){
    var playFair = new Array(); //바꾸기 전 쌍자암호를 저장할 곳
    var decPlayFair = new Array(); //바꾼 후의 쌍자암호 저장할 곳
    var x1 = 0 , x2 = 0 , y1 = 0, y2 = 0; //쌍자 암호 두 글자의 각각의 행,열 값
    var decStr ="";

    var lengthOddFlag = 1;
    
    for( let i = 0; i < str.length; i+=2 )
    {
        var tempArr = new Array();
        tempArr[0] = str.charAt(i);
        tempArr[1] = str.charAt(i+1);
        playFair.push(tempArr);
    }
    
    for(let i = 0 ; i < playFair.length ; i++ )
    {
        var tempArr = new Array();
        for( let j = 0 ; j < board.length; j++ )
        {
            for( let k = 0 ; k < board[j].length; k++ )
            {
                if(board[j][k] == playFair[i][0])
                {
                    x1 = j;
                    y1 = k;
                }
                else if(board[j][k] == playFair[i][1])
                {
                    x2 = j;
                    y2 = k;
                }
            }
        }
        
        if(x1==x2) //행이 같은 경우 각각 바로 아래열 대입
        {
            tempArr[0] = board[x1][(y1+4)%5];
            tempArr[1] = board[x2][(y2+4)%5];
        }
        else if(y1==y2) //열이 같은 경우 각각 바로 옆 열 대입
        {
            tempArr[0] = board[(x1+4)%5][y1];
            tempArr[1] = board[(x2+4)%5][y2];
        }
        else //행, 열 다른경우 각자 대각선에 있는 곳.
        {
            tempArr[0] = board[x2][y1];
            tempArr[1] = board[x1][y2];
        }
        
        decPlayFair.push(tempArr);
    }
    
    for(let i = 0 ; i < decPlayFair.length; i++) //중복 문자열 돌려놓음
    {
        if(i!=decPlayFair.length-1 && decPlayFair[i][1]=='x' 
                && decPlayFair[i][0]==decPlayFair[i+1][0])
        {	
            decStr += decPlayFair[i][0];
        }
        else
        {
            decStr += decPlayFair[i][0]+""+decPlayFair[i][1];
        }
    }
    
    
    
    for(let i = 0; i < zCheck.length; i++)//z위치 찾아서 q로 돌려놓음
    {
        if( zCheck.charAt(i) == '1' ) 
            decStr = decStr.substring(0,i)+'z' + decStr.substring(i+1,decStr.length);
    }
    
    //마지막에 한 글자였을 때 
    //if(oddFlag) decStr = decStr.substring(0,decStr.length-1);

    return decStr;
}