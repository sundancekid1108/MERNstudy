export default (theme) => ({
    root: {
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.border}`,
        borderBottomLeftRadius: '2px',
        borderBottomRightRadius: '2px'
    },
    noDivider: {
        borderTop: 'none'
    }
});