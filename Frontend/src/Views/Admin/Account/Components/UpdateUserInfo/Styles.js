export default (theme) => ({
    root: {},
    field: {
        margin: theme.spacing(3)
    },
    progress: {
        display: 'block',
        marginTop: theme.spacing(2),
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    errorMessage: {
        color: theme.palette.danger.main,
        alignText: 'center',
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2)
    },
    textField: {
        width: '420px',
        maxWidth: '100%',
        marginRight: theme.spacing(3)
    },
    portletFooter: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
});