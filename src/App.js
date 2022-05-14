import React, {Component} from 'react';
import Layout from './components/Layout/Layout'
import PeriodoBuilder from './components/containers/PeriodoBuilder/PeriodoBuilder'
import DisciplinaPage from './components/containers/DisciplinaPage/DisciplinaPage'
import LandingPage from './components/LandingPage/LandingPage'
import {BrowserRouter, Route} from 'react-router-dom'
import Auth from './components/containers/Auth/Auth'


class App extends Component{
  render () {
    return(
    <BrowserRouter> 
    <div>
      <Layout>
        <Route path = "/" exact component ={LandingPage}/>
        <Route path ="/login" component={Auth}/>
        <Route path ="/disciplina/:id" component={DisciplinaPage}/>
        <Route path ="/disciplinas" exact component={PeriodoBuilder}/>
      </Layout>
    </div>
    </BrowserRouter>
    );
  }
}

export default App;
