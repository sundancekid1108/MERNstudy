export default (theme) => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1),
        justifyContent: 'space-between'
    },
    spacer: {
        flexGrow: 1
    },
    searchInput: {
        marginRight: theme.spacing(1)
    }
});