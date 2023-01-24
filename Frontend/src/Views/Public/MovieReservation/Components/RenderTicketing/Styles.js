export default (theme) => ({
    bannerTitle: {
        fontSize: theme.spacing(1.4),
        textTransform: 'uppercase',
        color: 'rgb(93, 93, 97)',
        marginBottom: theme.spacing(1)
    },
    bannerContent: {
        fontSize: theme.spacing(2),
        textTransform: 'capitalize',
        color: theme.palette.common.white
    },
    [theme.breakpoints.down('sm')]: {
        hideOnSmall: {
            display: 'none'
        }
    }
});