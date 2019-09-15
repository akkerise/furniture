module.exports = {
    failed(message) {
        this.response.err.success = false;
        this.response.err.message = typeof message === 'string' ? message : message.toString();
        if (message instanceof Error) this.response.err.message = message.toString();
        if (typeof message === 'string' && message) this.response.err.message = message;
        if (!message) this.response.err.message = 'Failed!';
        this.setCode(400);
        return this.response;
    },
    success(message, data) {
        this.response.err.success = true;
        this.response.err.message = message || 'Success!';
        this.response.data = data;
        this.setCode(200);
        return this.response;
    },
    setCode(code = 200) {
        this.response.err.code = code;
    },
    response: {
        err: {
            success: false,
            message: null,
            code: 200
        },
        data: null,
    }
}