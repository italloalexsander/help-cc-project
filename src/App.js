import logo from './logo.svg';
import React, {Component} from 'react';
import Layout from './components/Layout/Layout'
import PeriodoBuilder from './components/containers/PeriodoBuilder/PeriodoBuilder'

class App extends Component{
  render () {
    return(
    <div>
      <Layout>
        <PeriodoBuilder>
        </PeriodoBuilder>
      </Layout>
    </div>
    );
  }
}

export default App;
