export default {
    failed(message) {
        this.err.status = false;
        this.err.message = typeof message === 'string' ? message : message.toString();
        if(message instanceof Error) this.err.message = message.toString();
        if(typeof message === 'string' && message) this.err.message = message;
        if(!message) this.err.message = 'Failed!';
        return this.response;
    },
    success(data, message) {
        this.data = data;
        this.err.status = true;
        this.err.message = message ? message : 'Success!';
        return this.response;
    },
    setCode(code = 200){
        this.err.code = code;
    },
    response: {
        err: {
            status: false,
            message: null,
            code: 200
        },
        data: null,
    }
}