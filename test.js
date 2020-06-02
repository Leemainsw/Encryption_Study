console.log(encrypt("be careful for assassinator", "assassinator"));

function encrypt(plain, key) {
    //key = SettingBoard(key);
    key = constructKeyMatrix(key);
    plain = editPlain(plain);
    result = encryptPlayFair(plain, key);
    return result;
}

function decrypt(cipher, key) {
  //currently not supported
    return cipher;
}

// 키 setting
function constructKeyMatrix(key) {
    const alphabet = "abcdefghijklmnopqrstuvwxy";
    key += alphabet;
    for (let i = 0; i < key.length; i++) {
    if (key.indexOf(key[i]) !== i) {
        key = key.slice(0, i) + key.slice(i + 1); //abcdefghi => abcd + fghi
        i--;
    }

    }
    return key;s
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

function SettingBoard(key){
    key += "abcdefghijklmnopqrstuvwxy";
    // 키값에서 중복제거
    var RealKey = overlap(key);
    RealKey.splice(1,1);

    return RealKey;
}


// 평문편집
function editPlain(plain) {
    for (let i = 0; i < plain.length - 1; i += 2) {
    if (plain[i] === plain[i + 1])
        plain = plain.slice(0, i + 1) + 'x' + plain.slice(i + 1);
    }

    if (plain.length % 2 === 1) plain += 'x';

    plain = plain.replace(/z/g, 'q'); 
    return plain;
}

// 검사
function encryptPlayFair(plaintext, key) {
    var ciphertext = "";
    for (let i = 0; i < plaintext.length - 1; i += 2) {
        var i1, i2, j1, j2;
        // index (1d) --> i = index / 5 , j = index % 5 (2d)
        //5/2 = 2.5 | 0 = 2
        i1 = key.indexOf(plaintext[i]) / 5 | 0; //integer
        j1 = key.indexOf(plaintext[i]) % 5;

        i2 = key.indexOf(plaintext[i + 1]) / 5 | 0; //integer
        j2 = key.indexOf(plaintext[i + 1]) % 5;

        //same row
        if (i1 == i2)
        // i1, (j1 + 1) % 5 and i2, (j2 + 1) % 5
        ciphertext += key[i1 * 5 + (j1 + 1) % 5] + key[i2 * 5 + (j2 + 1) % 5];

        //same column
        else if (j1 == j2)
        //(i1 + 1) % 5, j1 and (i2 + 1) % 5, j2
        ciphertext += key[((i1 + 1) % 5)] + key[((i2 + 1) % 5) * 5 + j2];

        else
        // i1, j2 and i2, j1
        ciphertext += key[i1 * 5 + j2] + key[i2 * 5 + j1];
    }
    return ciphertext;
}