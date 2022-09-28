export default theme => ({
    title: {
        fontSize: '3rem',
        lineHeight: '3rem',
        textAlign: 'center',
        textTransform: 'capitalize',
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(3)
    },
    [theme.breakpoints.down('sm')]: {
        fullWidth: { width: '100%' }
    }
});