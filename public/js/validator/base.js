const BaseValidator = {};

BaseValidator.validate = (data, displayErrorPerField = true) => {

    const rules = [
        {
            name: 'email',
            regex: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
        },
        {
            name: 'phone',
            regex: /^[0-9]{10,11}$/
        },
        {
            name: 'name',
            regex: /^[a-zA-Z0-9]{8,32}$/
        },
    ];

    let errors = [];

    let isEmpty = ({name, value}) => {
        if (typeof name === "undefined" || value === null || value === undefined || value === '') {
            errors.push({err: false, message: `Field ${name} is require and not empty.`, name, value});
        } else {
            errors.push({err: true, message: null, name, value});
        }
    };

    let handleCommonErrors = () => {
        $(`#errors`).css("display", "block");
        $("#errors").html('<ul></ul>');
        errors.forEach(({name, err, message}) => {
            let input = $(`input[name=${name}]`);
            if (!err) {
                input.addClass(`border border-danger`);
                $('#errors').find('ul').append(`<li>${message}</li>`);
            } else {
                input.removeClass(`border border-danger`);
                input.addClass(`border border-success`);
            }
        });
    };

    let handlePerFieldErrors = () => {
        errors.forEach(({name, err, message}) => {
            let input = $(`input[name=${name}]`);
            let error = $(`.error-${name}`);
            error.remove();
            if (!err && message !== null) {
                input.addClass(`border border-danger`);
                input.before(`<li class="error-${name} text-danger" style="font-size: 12px; margin-bottom: 2px;">${message}</li>`);
            }else{
                input.removeClass(`border border-danger`);
                input.addClass(`border border-success`);
            }
        })
    };

    let catchEmptyErrors = () => {
        data.filter(({name}) => name !== 'id').forEach(o => isEmpty(o));
    };

    let catchPatternErrors = () => {
        errors.filter(({err}) => err === true).map(error => {
            let rule = rules.find(r => r.name === error.name);
            if (rule && typeof rule !== 'undefined' && rule.name !== undefined && rule.name === error.name) {
                if (!rule.regex.test(error.value)) {
                    error.err = false;
                    error.message = `${error.name.replace(/^./, error.name[0].toUpperCase())} is invalid.`;
                }
            }
        });
    };

    let catchLibValidatorErrors = () => {
        errors.filter(({err}) => err === true).map(error => {

        });
    };

    let initErrors = () => {
        catchErrors();
        if(displayErrorPerField) handlePerFieldErrors();
        else handleCommonErrors();
    };

    let catchErrors = () => {
        catchEmptyErrors();
        catchPatternErrors();
        catchLibValidatorErrors();
    };

    let resultErrors = () => {
        initErrors();
        if (errors.filter(({err}) => err === false).length > 0) return false;
        else {
            $(`#errors`).css("display", "none");
            return true;
        }
    };

    return resultErrors();
};