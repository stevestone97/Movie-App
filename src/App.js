import "./App.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/Header/NavBar";
import MainContent from "./components/MainContent/MainContent";
import Movies from "./components/pages/Movies";
import MovieDetail from "./components/pages/MovieDetail";
import PersonDetail from "./components/pages/PersonDetail";
import Footer from "./components/Footer/Footer";
import SearchPage from "./components/pages/SearchPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={MainContent} />
        <Route exact path="/movies" component={Movies} />
        <Route path="/movie/:id" component={MovieDetail} />
        <Route path="/search/:search" component={SearchPage} />
        <Route path="/name/:id" component={PersonDetail} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
