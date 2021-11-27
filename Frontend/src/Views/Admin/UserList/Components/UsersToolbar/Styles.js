export default (theme) => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(0.5),
        justifyContent: 'space-between'
    },
    deleteButton: {
        color: theme.palette.danger.main,
        marginRight: theme.spacing(0.5)
    },
    searchInput: {
        marginRight: theme.spacing(0.5)
    }
});