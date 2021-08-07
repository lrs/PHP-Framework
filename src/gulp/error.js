const notify = require("gulp-notify");

module.exports = (err) => {
    notify.onError({
        title: "Gulp: <%= error.title %>",
        subtitle: "Failure!",
        message: "Error: <%= error %>",
        sound: "Beep",
    })(err);

    // Have to emit 'end' in Gulp task otherwise Gulp pipe will not continue.
    if (this.emit) {
        this.emit("end");
    }
};
