import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { COLORS, METRICS } from '../styles/styles';
import { PersistGate } from 'redux-persist/integration/react'
import { Persistor } from 'redux-persist';
import { History } from 'history';
import { SimpleObject } from '../types/commonTypes';

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
                disabled: {
                    cursor: 'not-allowed'
                }
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
        },
        MuiInputBase: {
            disabled: {
                cursor: 'not-allowed'
            }
        },
        MuiDrawer: {
            paper: {
                zIndex: 9,
            }
        },
        MuiChip: {
            colorPrimary: {
                color: COLORS.text_on_bg,
                backgroundColor: COLORS.makeTransparent(COLORS.primary, 55),
                border: `2px solid ${COLORS.primary}`,
            },
        }
    },
});

const Loading = () => (
    <p>Loading....</p>
)

interface RootPropTypes {
    store: SimpleObject;
    history: History;
    persistor: Persistor;
};

export const Root: React.FunctionComponent<RootPropTypes> = ({ store, history, persistor }) => (
    <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
);

export default Root;
