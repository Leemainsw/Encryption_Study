var KeyText = document.querySelector(".inputKey"); //사용자가 입력한 암호키
var InputText = document.querySelector(".inputTEXT"); //사용자가 입력한 평문
var PReasult1 = document.querySelector("#result1");
var PReasult2 = document.querySelector("#result2");
var NextBtn = document.querySelector("#encryptionBtn");
var ZIndex = new Array();
var RealKey;
var oddFlag;

var board = new Array(4);
for (i = 0; i <=4; i++){
    board[i] = new Array(5);
}

function init(){
    //키 셋팅 및 board 셋팅
    SettingBoard();
    
    // 암호화된 문장
    var EncryptionResult = strEncryption(RealKey, SettingStr());
    // 복호화된 문장
    var DecryptionResult = strDecryption(RealKey, BlankDelete(EncryptionResult));

    //숨기기
    KeyText.style.display = "none";
    InputText.style.display = "none";
    PReasult1.style.display = "block";
    PReasult2.style.display = "block";
    PReasult1.innerHTML= EncryptionResult;
    PReasult2.innerHTML = DecryptionResult;
    NextBtn.style.display = "none";
}

// 암호화할 때 평문 규칙 처리
function SettingStr(){
    var TEXTValueText = InputText.value;
    // 평문 빈칸 없애기
    TEXTValueText = BlankDelete(TEXTValueText);
    
    //FOR문을 돌려 Z인것은 Q로 바꾸기 복호화 할 때 써야 하니까 ZIndex에 저장하기
    for( let i = 0 ; i < TEXTValueText.length; i++ ) 
    {
        if(TEXTValueText[i]=='z') //z를 q로 바꿔줘서 처리함.
        {
            TEXTValueText = TEXTValueText.substring(0,i)+'q'+TEXTValueText.substring(i+1,TEXTValueText.length);
            ZIndex.push(1);
        }
        else 
        {
            ZIndex.push(0);
        }
    }
    // 정리된? 평문 
    return TEXTValueText;
}

//보드셋팅 및 key값 가져오기
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

// 암호화
function strEncryption(key, str){
        var PrevChange = new Array();
        var encChange = new Array();
        
		let x1 = 0 , x2 = 0 , y1 = 0, y2 = 0;
		var EncryptionStr ="";
			
		for( let i = 0 ; i < str.length; i+=2 ) // arraylist 세팅
		{   
            var tempArray = new Array();
            // if (!tmpArr[i]) tmpArr[i] = []
			tempArray[0] = str.charAt(i);
				if( str.charAt(i) == str.charAt(i+1)) //글이 반복되면 x추가
				{
					tempArray[1] = 'x';
					i--;
				}else{
					tempArray[1] = str.charAt(i+1);
                }
                // 마지막에 1글자 남으면 x추가
                if(str.length%2==0 && i+1 === str.length)
                {
                    tempArray[1] = 'x'; 
                    oddFlag = true;
                }
                PrevChange.push(tempArray);
		}
        
        // Mapping된 글자 출력
		for(var i = 0 ; i < PrevChange.length; i++ )
		{
			console.log(PrevChange[i][0]+""+PrevChange[i][1]+" ");
		}
		
		for(var i = 0 ; i < PrevChange.length; i++ )
		{
            var tempArray = new Array();
			for( var j = 0 ; j < 5; j++ ) //쌍자암호의 각각 위치체크
			{
				for( var k = 0 ; k < 5; k++)
				{   
					if(board[j][k] == PrevChange[i][0])
					{
						x1 = j;
                        y1 = k;
					}
					if(board[j][k] == PrevChange[i][1])
					{
						x2 = j;
                        y2 = k;
					}
				}
			}
			
			if(x1==x2) //행이 같은경우
			{
				tempArray[0] = board[x1][(y1+1)%5];
				tempArray[1] = board[x2][(y2+1)%5];
			}
			else if(y1==y2) //열이 같은 경우
			{
				tempArray[0] = board[(x1+1)%5][y1];
				tempArray[1] = board[(x2+1)%5][y2];
			} 
			else //행, 열 모두 다른경우
			{
				tempArray[0] = board[x2][y1];
				tempArray[1] = board[x1][y2];
			}
			encChange.push(tempArray);
			
		}
		
		for(let i = 0 ; i < encChange.length; i++)
		{
			EncryptionStr += encChange[i][0]+""+encChange[i][1]+" ";
		}

        console.log(encChange);

		return EncryptionStr;
}


// 복호화
function strDecryption(key, str){
    var PrevChange = new Array(); //바꾸기 전 
    var decChange = new Array(); //바꾼 후
    var x1 = 0 , x2 = 0 , y1 = 0, y2 = 0; //쌍자 암호 두 글자의 각각의 행,열 값
    var DecryptionStr = new Array();
    
    for( let i = 0; i < str.length; i+=2 )
    {
        var tempArr = new Array();
        tempArr[0] = str.charAt(i);
        tempArr[1] = str.charAt(i+1);
        PrevChange.push(tempArr);
    }
    
    for(let i = 0 ; i < PrevChange.length ; i++ )
    {
        var tempArr = new Array();
        for( let j = 0 ; j < board.length; j++ )
        {
            for( let k = 0 ; k < board[j].length; k++ )
            {
                if(board[j][k] == PrevChange[i][0])
                {
                    x1 = j;
                    y1 = k;
                }
                else if(board[j][k] == PrevChange[i][1])
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
        
        decChange.push(tempArr);
    }
    
    for(let i = 0 ; i < decChange.length; i++) //중복 문자열 돌려놓음
    {
        if(i!=decChange.length-1 && decChange[i][1]=='x' 
                && decChange[i][0]==decChange[i+1][0])
        {	
            DecryptionStr += decChange[i][0];
        }

        else
        {
            DecryptionStr += decChange[i][0]+""+decChange[i][1];
        }
    }

    // 암호화 할 때 Q로 바꾼 Z 되돌리기
    for(let i = 0 ; i < ZIndex.length; i++)
    {
        if(ZIndex[i] == '1'){
            DecryptionStr = DecryptionStr.substring(0,i)+'z'+DecryptionStr.substring(i+1,DecryptionStr.length);
        }
    }
    
    //마지막에 한 글자였을 때 
    if(oddFlag){
        console.log("마지막에 한 글자였을 때");
        DecryptionStr = DecryptionStr.substring( 0 , DecryptionStr.length-1);
    } 

    return DecryptionStr;
}