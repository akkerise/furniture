(function () {
    this.ajax = function (params) {
    	params.loading = (typeof params.loading !== 'undefined' && !params.loading) ? false : true;
    	if (params.contentType === 'json') {
            params.contentType = 'application/json; charset=utf-8';
            params.data = JSON.stringify(params.data);
        }
        para = $.extend({
            url: baseUrl + params.service,
            dataType: 'json',
            headers: {
                // "auth": "huylx@peacesoft.net",
                // "code": "0973789890"
            },
            success: function (result) {
                loading.hide();
                params.done(result);
            },
            error: function () {
                loading.hide();
            }
        }, params);
        if (params.loading){
            loading.show();
        }
        $.ajax(para);
    };

    this.ajaxSubmit = function (params) {
        var data = {};
        $('#' + params.id).find('input, select, textarea').each(function () {
            if ($(this).attr('type') === 'checkbox') {
                if ($(this).is(':checked')) {
                    data[$(this).attr('name')] = true;
                } else {
                    data[$(this).attr('name')] = false;
                }
            } else if ($(this).attr('type') === 'radio') {
                if ($(this).is(':checked')) {
                    data[$(this).attr('name')] = $(this).val();
                }
            }
            else {
                if ($(this).val() !== '' && typeof $(this).attr('name') != 'undefined') {
                    data[$(this).attr('name')] = $(this).val();
                }
            }
        });
        para = $.extend({
            success: function (result) {
                loading.hide();
                params.done(result);
            },
            service: params.service,
            type: 'post',
            data: data,
            contentType: 'json'
        }, params);
        ajax(para);
    };

    this.submitWithFile = function (params) {
        var data = new FormData();
        var count = $('#'+params.id + ' .' + params.fileName).length;
        for (var i = 0; i < count; i++) {
            var fileItem = $('#' + params.fileName + i)[0].files;
            for (var j = 0; j < fileItem.length; j++) {
               data.append("file" + i, fileItem[j]);
            }
        }
        $.each($('#' + params.id).serializeArray(), function (key, input) {
            data.append(input.name, input.value);
        });
        para = $.extend({
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
        ajax(para);
    };
})();