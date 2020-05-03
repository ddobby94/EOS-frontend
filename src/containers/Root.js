import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import App from './App';
import {
    createMuiTheme,
    // makeStyles,
    // createStyles,
    // Theme as AugmentedTheme,
    ThemeProvider,
} from '@material-ui/core/styles';
import { COLORS, METRICS } from '../styles/styles';

// const theme = createMuiTheme({
//   overrides: {
//     // Style sheet name ⚛️
//     MuiButton: {
//       // Name of the rule
//       text: {
//         // Some CSS
//         color: 'white',
//       },
//     },
//   },
// });

const theme = createMuiTheme({
    palette: {
        primary: {
            main: COLORS.primary,
        },
        secondary: {
            main: COLORS.text_on_bg,
        },
        error: {
            main: COLORS.danger,
        },
        text: {
            primary: COLORS.text_on_bg,
        },
        type: 'dark',
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    overrides: {
        MuiOutlinedInput: {
            input: {
                backgroundColor: COLORS.bg_light,
                padding: METRICS.small_spacing,
            },
        },
        MuiInputLabel: {
            root: {
                color: COLORS.text_on_bg,
            },
        },
        MuiFormControl: {
            root: {
                marginTop: METRICS.tiny_spacing,
                marginBottom: METRICS.small_spacing,
            },
        },
        MuiButton: {
            root: {
                fontSize: '1em',
                margin: `${METRICS.smallest_spacing} 0px`,
            },
            label: {
                color: COLORS.text_on_primary,
            }
        }
    },
});

export default class Root extends Component {
    render() {
        const { store, history } = this.props;
        return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </ConnectedRouter>
        </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
