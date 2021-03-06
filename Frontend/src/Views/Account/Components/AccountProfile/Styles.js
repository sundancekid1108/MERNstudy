export default (theme) => ({
    root: {},
    details: {
        display: "flex",
    },
    info: {},
    emailText: {
        marginTop: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
    dateText: {
        color: theme.palette.text.secondary,
    },
    avatar: {
        marginLeft: "auto",
        height: "100px",
        width: "100px",
        flexShrink: 0,
        flexGrow: 0,
    },
    progressWrapper: {
        marginTop: theme.spacing(2),
    },
    uploadButton: {
        marginRight: theme.spacing(2),
    },
});