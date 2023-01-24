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
    seatInfoContainer: {
        width: '50%',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#eee'
    },

    seatInfo: { marginRight: theme.spacing(2) },

    seatInfoLabel: {
        marginRight: theme.spacing(1),
        display: 'inline-block',
        width: 10,
        height: 10
    },

    [theme.breakpoints.down('sm')]: {
        seat: { padding: theme.spacing(1.2), margin: theme.spacing(0.5) },
        seatInfoContainer: { width: '100%', display: 'block' },
        seatInfo: { marginTop: theme.spacing(2) }
    }
});