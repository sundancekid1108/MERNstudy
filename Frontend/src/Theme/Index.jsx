import { createTheme } from '@material-ui/core/styles';
import palette from './Palette.jsx';

const theme = createTheme({
  palette,
  typography: {
    useNextVariants: true
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export default theme;
