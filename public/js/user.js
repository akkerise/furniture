const user = {};

user.del = id => {
    if (!id || typeof id === 'undefined') return toastr.warning(`Id: ${id} is invalid!`);
    else {
        popup.confirm(`Are you sure delete this user?`, () => {
            ajax({
                service: `/user/service/add`,
                method: "POST",
                loading: true,
                done: res => {
                    const {err} = res;
                    if (err.success) {
                        toastr.success(err.message);
                        location.reload();
                    } else {
                        loading.hide();
                        popup.msg(err.message)
                    }
                },
                fail: e => console.log(e.toString()),
            });
        });
    }
};

user.edit = id => {
    loading.show();
    ajax({
        service: `/user/service/show/${id}`,
        method: "GET",
        loading: true,
        success: res => {
            const {err, data} = res;
            if (err.success) {
                popup.open('user-edit', 'Sửa thông tin người dùng', template('user/edit.ejs', {data}), [
                    {
                        title: 'Cập nhật',
                        style: 'btn-primary',
                        fn: function () {
                            let email = $("input[name=email]").val();
                            if (isEmail(email)) {
                                ajaxSubmit({
                                    id: 'user-edit-form',
                                    service: '/user/service/update',
                                    success: res => {
                                        const {err, data} = res;
                                        popup.close('user-edit');
                                        loading.hide();
                                        if (err.success) location.reload();
                                        else popup.msg(err.message);
                                    },
                                    error: err => err && err.message ? popup.msg(err.message) : popup.msg(err.toString())
                                });
                            } else {
                                $(`input[name=email]`).addClass(`border border-danger`);
                                $("#errors").html("Vui lòng nhập email đúng định dạng.");
                                $("#errors").css("display", "block");
                            }
                        }
                    },
                    {
                        title: 'Bỏ qua',
                        style: 'btn-default',
                        fn: function () {
                            popup.close('user-edit');
                        }
                    }
                ], 'modal-lg');
            } else popup.msg(err.message);
            loading.hide();
        },
        error: function (e) {
            loading.hide();
            console.log(e)
        }
    });
};

user.show = id => {
    ajax({
        service: `/user/service/show/${id}`,
        method: "GET",
        loading: true,
        success: res => {
            const {err, data} = res;
            if (err.success) {
                popup.open('user-show', 'Thông tin người dùng', template('user/show.ejs', {data}), [
                    {
                        title: 'Bỏ qua',
                        style: 'btn-default',
                        fn: function () {
                            popup.close('user-show');
                        }
                    }
                ], 'modal-lg');
            } else popup.msg(err.message);
            loading.hide();
        },
        error: function (e) {
            loading.hide();
            console.log(e)
        }
    });
};