export default (theme) => ({
    root: {},
    title: { marginLeft: theme.spacing(3) },
    field: {
        margin: theme.spacing(3),
        display: 'flex'
    },
    imageWrapper: {
        width: '50%',
        height: '50%'
    },
    image: {
        width: '50%',
        height: '50%',
        // position: 'absolute',

        backgroundPosition: 'center',

        top: 0,
        left: 0,
        zIndex: 0

    },
    textField: {
        width: '100%',
        marginRight: theme.spacing(3)
    },
    portletFooter: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    buttonFooter: {
        margin: theme.spacing(3)
    },
    infoMessage: {
        marginLeft: theme.spacing(3)
    }
})