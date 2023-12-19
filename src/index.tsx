import 'inter-ui'
import '@reach/dialog/styles.css'
import 'react-select-search/style.css'
import 'react-dropdown/style.css'

import Web3Provider from 'components/Web3Provider/Web3Provider'
import { BlockNumberProvider } from 'hooks/useBlockNumber'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { MulticallUpdater } from 'state/multicall/updater'

import App from './pages/App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import store from './state'
import ApplicationUpdater from './state/application/updater'
import TransactionUpdater from './state/transactions/updater'
import UserUpdater from './state/user/updater'
import RadialGradientByChainUpdater from './theme/RadialGradientByChainUpdater'
import ThemeProvider, { ThemedGlobalStyle } from './theme/theme'

if (window.ethereum) {
  // @ts-ignore
  window.ethereum.autoRefreshOnNetworkChange = false
}

function Updaters() {
  return (
    <>
      <RadialGradientByChainUpdater />
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

const container = document.getElementById('root') as HTMLElement

const Router = HashRouter

createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Web3Provider>
          <BlockNumberProvider>
            <Updaters />
            <ThemeProvider>
              <ThemedGlobalStyle />
              <App />
            </ThemeProvider>
          </BlockNumberProvider>
        </Web3Provider>
      </Router>
    </Provider>
  </StrictMode>
)

serviceWorkerRegistration.unregister()
