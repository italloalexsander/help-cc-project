import logo from './logo.svg';
import React, {Component} from 'react';
import Layout from './components/Layout/Layout'
import PeriodoBuilder from './components/containers/PeriodoBuilder/PeriodoBuilder'
import DisciplinaPage from './components/containers/DisciplinaPage/DisciplinaPage'
import classes from './App.module.css'
import {BrowserRouter, Route} from 'react-router-dom'


class App extends Component{
  render () {
    return(
    <BrowserRouter> 
    <div>
      <Layout>
        <Route path ="/disciplina/:id" component={DisciplinaPage}/>
        <Route path ="/" exact component={PeriodoBuilder}/>
      </Layout>
    </div>
    </BrowserRouter>
    );
  }
}

export default App;
