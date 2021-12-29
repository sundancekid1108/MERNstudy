export default (theme) => ({
    root: {
        maxWidth: '100%',
        paddingBottom: theme.spacing(2)
    },
    imageWrapper: {
        height: '200px',
        margin: '0 auto',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        'object-fit': 'cover'
    },
    details: { padding: theme.spacing(3) },
    title: {
        fontSize: '18px',
        lineHeight: '21px',
        marginTop: theme.spacing(2),
        textTransform: 'capitalize'
    },
    description: {
        lineHeight: '16px',
        height: theme.spacing(4),
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        color: theme.palette.text.secondary,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    stats: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(3)
    },
    updateIcon: {
        color: theme.palette.text.secondary
    },
    updateText: {
        marginLeft: theme.spacing(1),
        color: theme.palette.text.secondary
    }
});