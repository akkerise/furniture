export default {
    getDateCurrent() {
        let date_str = '';
        let separator_ymd = '-';
        let separator_hms = ':';
        let date = new Date();
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let hour = ("0" + date.getHours()).slice(-2);
        let minute = ("0" + date.getMinutes()).slice(-2);
        let second = ("0" + date.getSeconds()).slice(-2);
        date_str = year + separator_ymd + month + separator_ymd + day + ' ' + hour + separator_hms + minute + separator_hms + second;
        return date_str;
    },
}