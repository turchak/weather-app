const convertDate = date => {
    const convertDow = dow => { 
        let result;
        switch(dow) {
        case 0:
            result = 'Sun';
            break;

        case 1:
            result = 'Mon';
            break;

        case 2:
            result = 'Tue';
            break;

        case 3:
            result = 'Wed';
            break; 

        case 4:
            result = 'Thu';
            break;

        case 5:
            result = 'Fri';
            break;

        case 6:
            result = 'Sat';
            break;                      
        }
        return result;    
    };

    const convertMonth = month => {
        let result;
        switch(month) {
        case 0:
            result = 'Jan';
            break;

        case 1:
            result = 'Feb';
            break;

        case 2:
            result = 'Mar';
            break;

        case 3:
            result = 'Apr';
            break; 

        case 4:
            result = 'May';
            break;

        case 5:
            result = 'June';
            break;

        case 6:
            result = 'July';
            break;
            
        case 7:
            result = 'Aug';
            break;

        case 8:
            result = 'Sept';
            break;

        case 9:
            result = 'Oct';
            break;

        case 10:
            result = 'Nov';
            break;

        case 11:
            result = 'Dec';
            break;                                            
        }
        return result;   
    };


    const time = new Date(date*1000);
    const day = time.getDate();
    const dow = convertDow(time.getDay());
    const month = convertMonth(time.getMonth());
    const period = dow + ' ' + day + ' ' + month;
    
    return period;
};

export default convertDate;