const backgroundImage =
    'https://image.tmdb.org/t/p/original/dKxkwAJfGuznW8Hu0mhaDJtna0n.jpg';

export default (theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: '100vh'
    },
    grid: {
        height: '100%'
    },
    heroSection: {
        color: theme.palette.common.white,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            height: '90vh',
            minHeight: 500,
            maxHeight: 1300
        },
        zIndex: 0
    },
    container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.5,
        zIndex: -1
    },
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: -2
    }
});