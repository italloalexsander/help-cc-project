import logo from './logo.svg';
import React, {Component} from 'react';
import Layout from './components/Layout/Layout'
import PeriodoBuilder from './components/containers/PeriodoBuilder/PeriodoBuilder'
import DisciplinaPage from './components/containers/DisciplinaPage/DisciplinaPage'
import classes from './App.module.css'


class App extends Component{
  render () {
    return(
    <div>
      <Layout>
        <PeriodoBuilder/>
        <DisciplinaPage/>
      </Layout>
    </div>
    );
  }
}

export default App;
