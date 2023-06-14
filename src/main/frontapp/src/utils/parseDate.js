export function paresDate(){
    const nowTime = new Date().toString().split(" ")

    const year = nowTime[3];

    function month(){
        const t2 = new Date().getMonth();

        if(t2 <10){
            return '0' + (t2+1);
        }else{
            return (t2+1);
        }
    };

    const minute = nowTime[2];

    const time = nowTime[4];

    return `${year}.${month()}.${minute} ${time}`
    
}
