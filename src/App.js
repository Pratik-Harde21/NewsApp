import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 5;
  apiKey=process.env.REACT_APP_NEWS_API
  // apiKey="ce99a3d236fb4621a68a3bd1e1ff018e"
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          {/* <News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country={'in'} category={'sport'} /> */}
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country={'in'} category={'general'} />}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country={'in'} category={'business'} />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country={'in'} category={'entertainment'} />}></Route>
            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country={'in'} category={'general'} />}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country={'in'} category={'health'} />}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country={'in'} category={'science'} />}></Route>
            <Route exact path="/sport" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sport" pageSize={this.pageSize} country={'in'} category={'sports'} />}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country={'in'} category={'technology'} />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}