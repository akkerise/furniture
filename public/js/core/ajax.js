(function () {
    this.ajax = params => {
        params.loading = (typeof params.loading !== 'undefined' && !params.loading) || true;
        if (params.contentType === 'json') {
            params.contentType = 'application/json; charset=utf-8';
            params.data = JSON.stringify(params.data);
        }
        let paras = $.extend({
            url: baseUrl + params.service,
            dataType: 'json',
            headers: {
                "auth": "akkerise@gmail.com",
                "phone": "0968381829",
            },
            success: function (result) {
                loading.hide();
                params.done(result);
            },
            error: function () {
                loading.hide()
            }
        }, params);
        if (params.loading) {
            loading.show();
        }
        $.ajax(paras);
    };

    this.ajaxSubmit = function (params) {
        let data = {};
        $('#' + params.id).find('input, select, textarea').each(function () {
            if ($(this).attr('type') === 'checkbox') {
                if ($(this).is(':checked')) data[$(this).attr('name')] = true;
                else data[$(this).attr('name')] = false;
            } else if ($(this).attr('type') === 'radio') {
                if ($(this).is(':checked')) {
                    data[$(this).attr('name')] = $(this).val();
                }
            } else {
                if ($(this).val() !== '' && typeof $(this).attr('name') != 'undefined') {
                    data[$(this).attr('name')] = $(this).val();
                }
            }
        });
        let paras = $.extend({
            success: function (result) {
                loading.hide();
                params.done(result);
            },
            service: params.service,
            type: 'post',
            data: data,
            contentType: 'json'
        }, params);
        ajax(paras);
    };

    this.ajaxSubmitFile = params => {
        let data = new FormData();
        let count = $('#' + params.id + ' .' + params.fileName).length;
        for (let i = 0; i < count; i++) {
            let fileItem = $('#' + params.fileName + i)[0].files;
            for (let j = 0; j < fileItem.length; j++) {
                data.append("file" + i, fileItem[j]);
            }
        }
        $.each($('#' + params.id).serializeArray(), function (key, input) {
            data.append(input.name, input.value);
        });
        let paras = $.extend({
            success: function (result) {
                loading.hide();
                params.done(result);
            },
            service: params.service,
            type: 'POST',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            async: true
        }, params);
        ajax(paras);
    };
})();