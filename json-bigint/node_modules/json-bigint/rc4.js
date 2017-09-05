
(function(){
    var RC4 = function(pwd,data){
        var key = [256];
        var box = [256];
        var cipher = '';
        var pwdLength =  pwd.length;  
        var dataLength = data.length;

        
        for (var i = 0; i < 256; i++) {
            key[i] = pwd.charCodeAt(i % pwdLength);
            
            box[i] = i;
            
        }

        for(var j = i = 0; i < 256; i ++) {
            j = (j + box [i] + key [i]) % 256;
            var tmp = box [i];
            box [i] = box [j];
            box [j] = tmp;
        }

        var test1 = [dataLength];
        var test2 = [dataLength];

        for(var a = j = i = 0; i < dataLength; i++) {
            a = (a + 1) % 256;
            j = (j + box [a]) % 256;
            var tmp = box [a];
            box [a] = box [j];
            box [j] = tmp;
            var k = box [((box [a] + box [j]) % 256)];

            cipher += String.fromCharCode ( data.charCodeAt(i) ^ k )+'';
        }

        return cipher;
    };


    
    module.exports = RC4;
}());
