import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Ferramentas from './components/Ferramentas';
import Carboidratos from './components/Carboidratos';
import Gorduras from './components/Gorduras';
import Header from './components/Header';
import Home from './components/Home';
import Proteinas from './components/Proteinas';
import './global.css';

class App extends Component {
  state = {
  }

  componentDidMount(){

  }

  render(){
    return(
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/proteinas" component={Proteinas} />
          <Route exact path="/carboidratos" component={Carboidratos} />
          <Route exact path="/gorduras" component={Gorduras} />
          <Route exact path="/ferramentas" component={Ferramentas} />
        </Switch>
      </BrowserRouter>
      
    )
  }
}

export default App;
