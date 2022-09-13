export default (theme) => ({
    root: {
        height: '100%',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        backgroundColor: theme.palette.white,
        color: theme.palette.primary.main,
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    }
});