export default (theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100vh'
    },

    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },

    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    },
    socialLogin: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(4, 0)
    },
    facebookButton: {
        marginTop: theme.spacing(3),
        width: '100%'
    },

    googleButton: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        width: '100%'
    },
    form: {
        paddingLeft: '100px',
        paddingRight: '100px',
        paddingBottom: '125px',
        flexBasis: '700px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        marginTop: theme.spacing(3)
    },
    subtitle: {
        color: theme.palette.text.secondary,
        marginTop: theme.spacing(0.5)
    },
    fields: {
        marginTop: theme.spacing(2)
    },
    textField: {
        width: '100%',
        '& + & ': {
            marginTop: theme.spacing(2)
        }
    },
    progress: {
        display: 'block',
        marginTop: theme.spacing(2),
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    loginButton: {
        marginTop: theme.spacing(2),
        width: '100%'
    },
    register: {
        marginTop: theme.spacing(2),
        color: theme.palette.text.secondary
    },
    registerUrl: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    fieldError: {
        color: theme.palette.danger.main,
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    submitError: {
        color: theme.palette.danger.main,
        alignText: 'center',
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2)
    }
});