// @ts-nocheck
import { createMuiTheme } from '@material-ui/core/styles';
import palette from './Palette';
import paletteDark from './PaletteDark';
import typography from './Typography';

// read more at https://material-ui.com/customization/themes
const theme = createMuiTheme({
    palette,
    typography,
    zIndex: {
        appBar: 1200,
        drawer: 1100
    },
    topBar: {
        height: '56px'
    }
});

export default theme;