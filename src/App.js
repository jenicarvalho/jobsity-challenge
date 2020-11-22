import Calendar from './components/Calendar'
import { Provider } from 'react-redux'

import store from './redux/reducer'

const App = () => {
  return (
    <Provider store={store}>
      <Calendar />
    </Provider>
  )
}

export default App