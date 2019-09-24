const user = {};

user.del = id => {
    loading.show();
    if(!id || typeof id === 'undefined') {
        return toastr.warning(`Id: ${id} is invalid!`);
    }else{
        if(confirm(`Are you sure delete this user?`)){
            ajax({
                service: `/user/service/del/${id}`,
                method: "POST",
                loading: true,
                done: function (res) {
                    const {err, data} = res;
                    return !err.success ? toastr.error(err.message) : toastr.success(err.message);
                },
            });
        }
    }
    
};