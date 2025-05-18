import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App'
import { store } from './redux/store/store'
import { Provider } from 'react-redux'
import PopularMovies from './components/PopularMovies'

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <PopularMovies />
  </Provider>
);