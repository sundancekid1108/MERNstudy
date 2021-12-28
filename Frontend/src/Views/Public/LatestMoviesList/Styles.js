export default (theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        color: theme.palette.common.white,
        height: '100%'
    },
    title: {
        fontSize: '3rem',
        lineHeight: '3rem',
        textAlign: 'center',
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(3)
    },
    [theme.breakpoints.down('sm')]: {
        fullWidth: { width: '100%' }
    }
});