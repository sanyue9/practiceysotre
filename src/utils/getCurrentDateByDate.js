export default function(date){
    var year = date.getFullYear();
    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
    var day = date.getDate() < 10 ? '0' + date.getDate(): date.getDate();
    return year + '-' + month + '-' + day;
}