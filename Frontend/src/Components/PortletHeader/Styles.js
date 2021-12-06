export default (theme) => ({
    root: {
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.border}`,
        borderTopLeftRadius: '2px',
        borderTopRightRadius: '2px',
        display: 'flex',
        height: '64px',
        justifyContent: 'space-between',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        position: 'relative'
    },
    noDivider: {
        borderBottom: 'none'
    },
    noPadding: {
        padding: 0
    }
});