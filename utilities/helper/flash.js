module.exports = {
    messages: [],
    message: {
        text: null,
        alert: null,
        success: false,
    },
    set({message, success}) {
        this.message.text = message;
        this.message.alert = success ? 'success' : 'danger';
        this.message.success = success;
        this.messages.push(this.message);
        setTimeout(() => this.reset(), 2500);
    },
    reset() {
        this.message.text = null;
        this.message.alert = null;
        this.message.success = false;
        this.messages = [];
    }
}