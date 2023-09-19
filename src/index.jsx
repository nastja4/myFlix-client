import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
// import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
// import { Container } from 'react-bootstrap';
import { Navbar, Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { store } from './redux/store';


// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <Provider store={store}>
      <Container>
        <MainView />
      </Container>
    </Provider>    
  );    
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);