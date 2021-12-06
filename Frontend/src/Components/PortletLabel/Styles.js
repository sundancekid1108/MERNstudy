export default (theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        fontSize: '1.3rem',
        marginRight: theme.spacing(1),
        color: theme.palette.text.secondary,
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 500
    },
    subtitle: {
        fontWeight: 400,
        marginLeft: theme.spacing(1),
        color: theme.palette.text.secondary
    }
});