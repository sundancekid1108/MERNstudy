export default (theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    field: {
        margin: theme.spacing(3)
    },

    input: {
        display: 'none'
    },
    button: {
        minWidth: 100,
        marginRight: theme.spacing(2)
    },

    buttonFooter: {
        margin: theme.spacing(1)
    },
    portletFooter: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
});