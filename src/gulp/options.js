module.exports = {
    dist: process.env.NODE_ENV === "production",
    sass: {
        outputStyle: "expanded",
    },
    autoPrefix: {
        cascade: false,
    },
    cssClean: {
        level: 2,
        keepSpecialComments: 0,
    },
};
