export default (theme) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.neutral}`,
    borderRadius: '4px',
    display: 'flex',
    flexBasis: '420px',
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingTop: theme.spacing()
  },
  icon: {
    marginRight: theme.spacing(),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  }
});
