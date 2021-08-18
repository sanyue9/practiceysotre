import Cookies from 'js-cookie'
export default function() {
    if (Cookies.get('webpy_session_id') == undefined){
        return false;
    }else{
        return true;
    }
}