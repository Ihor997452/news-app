import logo from './logo.svg';
import './App.css';
import {} from "react-router-dom";
import Home from "./components/home";
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import NewsDetail from "./components/news/news-detail";
import NewsItemForm from "./components/admin/news-item-form/news-item-form";

function App() {
  return (
      <Switch>
          <Route exact path={"/"} component={Home}/>
          <Route path={`/news/:id`} component={NewsDetail}/>
          <Route exact path={"/news-item-form"} component={NewsItemForm}/>
          <Route exact path={"/news-item-form/:id"} component={NewsItemForm}/>
      </Switch>
  );
}

export default App;
