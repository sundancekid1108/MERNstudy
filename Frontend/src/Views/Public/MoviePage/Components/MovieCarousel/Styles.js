export default (theme) => ({
    container: {
        display: 'flex',
        alignItems: 'baseline'
    },
    h2: {
        color: theme.palette.common.white,
        margin: theme.spacing(3),
        textTransform: 'capitalize'
    },
    button: {},
    carousel: {
        width: '85%',
        height: '100%',
        margin: 'auto'
    },
    arrow: {
        position: 'absolute',
        top: 0,
        bottom: 60,
        width: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0,0,0,.5)',
        color: theme.palette.common.white,
        textAlign: 'center',
        zIndex: 1,
        '&.prevArrow': {
            left: 0,
            opacity: ({ currentSlide }) => (currentSlide ? 1 : 0)
        },
        '&.nextArrow': {
            right: 0,
            opacity: ({ currentSlide, slideCount }) =>
                currentSlide === slideCount ? 0 : 1
        }
    },
    slider: { '& .slick-slide': { padding: theme.spacing(1) } }
});