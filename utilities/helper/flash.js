export default {
    state: {
        message: null,
        status: false,
    },
    set(message, status){
        this.state.message = message;
        this.state.status = status;
        setTimeout(() => {this.reset()},3000);
    },
    reset(){
        this.state.message = null;
        this.state.status = false;
    }
}