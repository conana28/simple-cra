// i18n
import './locales/i18n';

// scroll bar
import 'simplebar/src/simplebar.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { HelmetProvider } from 'react-helmet-async';
// routes
import { RouterProvider } from 'react-router-dom';
import { r } from './routes';
// import { router } from './routes';

// theme
import ThemeProvider from './theme';
// locales
import ThemeLocalization from './locales';
// components
import SnackbarProvider from './components/snackbar';
import { ThemeSettings, SettingsProvider } from './components/settings';
import { MotionLazyContainer } from './components/animate';
import ScrollToTop from './components/scroll-to-top';

// Check our docs
// https://docs.minimals.cc/authentication/js-version

import { AuthProvider } from './auth/JwtContext';
import { CellarContextProvider } from './sections/cellar/CellarContext';
// <Navigate> element changes the current location when it is rendered.
// It's a component wrapper around useNavigate,
// and accepts all the same arguments as props.

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
      <CellarContextProvider>
        <HelmetProvider>
          <SettingsProvider>
            {/* <BrowserRouter> - NOT NEEDED FOR 6.4 */}
            {/* <ScrollToTop /> Disabled as crashed routing */}
            {/*  */}
            <MotionLazyContainer>
              <ThemeProvider>
                <ThemeSettings>
                  <ThemeLocalization>
                    <SnackbarProvider>
                      <RouterProvider router={r} />
                      {/* <Router /> -- NOT NEEDED FOR 6.4 */}
                    </SnackbarProvider>
                  </ThemeLocalization>
                </ThemeSettings>
              </ThemeProvider>
            </MotionLazyContainer>
            {/* </BrowserRouter> */}
          </SettingsProvider>
        </HelmetProvider>
      </CellarContextProvider>
    </AuthProvider>
  );
}
