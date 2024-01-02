export const getCurrentDate=()=>{
    var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date().getDate();
    var month = mL[new Date().getMonth()] ;
    var year = new Date().getFullYear();

    return date + ' ' + month + ', ' + year;//format: d-m-y;
}