export default (theme) => ({
    row: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
    seat: {
        cursor: 'pointer',
        color: 'rgba(255,255,255,0.7)',
        borderRadius: 2,
        padding: theme.spacing(2),
        margin: theme.spacing(0.5),
        fontWeight: 600,
        '&:hover': {
            background: 'rgb(120, 205, 4)'
        }
    },
    [theme.breakpoints.down('sm')]: {
        seat: { padding: theme.spacing(0.8), margin: theme.spacing(0.5) }
    }
});