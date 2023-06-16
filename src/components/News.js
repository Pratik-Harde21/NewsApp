import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string) => {
        
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d4693ca242d844a09686085fe65eeea0&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.props.setProgress(20)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url)
        this.props.setProgress(40)
        let parseData = await data.json()
        this.props.setProgress(60)
        // console.log(parseData);
        this.setState({
            articles: parseData.articles,
            totalResults:parseData.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }

    async componentDidMount() {
        // console.log("cdm")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d4693ca242d844a09686085fe65eeea0&pagesize=${this.props.pageSize}`
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ce99a3d236fb4621a68a3bd1e1ff018e&pagesize=${this.props.pageSize}`
        // this.setState({ loading: true })
        // let data = await fetch(url)
        // let parseData = await data.json()
        // console.log(parseData);
        // this.setState({
        //     articles: parseData.articles,
        //     totalResults: parseData.totalResults,
        //     loading: false
        // })
        // let page = this.state.page 
        this.updateNews()
    }
    handlePreviousClick = async () => {
        // console.log("Previous")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=d4693ca242d844a09686085fe65eeea0&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=ce99a3d236fb4621a68a3bd1e1ff018e&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`
        // this.setState({ loading: true })
        // let data = await fetch(url)
        // let parseData = await data.json()
        // console.log(parseData);
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parseData.articles,
        //     loading: false
        // })
        this.setState({page: this.state.page - 1});
        // let page = this.state.page 
        this.updateNews();
    }
    handleNextClick = async () => {
        // console.log("Next")
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d4693ca242d844a09686085fe65eeea0&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ce99a3d236fb4621a68a3bd1e1ff018e&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`
        //     this.setState({ loading: true })
        //     let data = await fetch(url)
        //     let parseData = await data.json()
        //     console.log(parseData);
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parseData.articles,
        //         loading: false
        //     })
        // }
        // var i = 0
        // if(i===0){
        //     this.setState({page: this.state.page + 1});
        //     let page = this.state.page
        //     console.log(page)
        //     // page = this.state.page + 1
        //     this.updateNews(page);
        //     i = i + 1
        // }
        // else{
            this.setState({page: this.state.page + 1});
            // let page = this.state.page
            this.updateNews();
        // }
    }

    fetchMoreData = async() => {
        this.setState({page: this.state.page + 1});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        // this.setState({loading: true})
        let data = await fetch(url)
        let parseData = await data.json()
        // console.log(parseData);
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults:parseData.totalResults
        })
    };

    render() {
        // console.log("render")
        return (
            <>
                <h1 className='text-center' style={{ margin: '35px 0' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={!element.urlToImage ? "https://cdn.slashgear.com/wp-content/uploads/2021/12/earth-globe.jpg" : element.urlToImage} author={!element.author ? "Unknown" : element.author} date={element.publishedAt} newsUrl={element.url} source={element.source.name} />
                            </div>
                        })}
                    </div>
                        </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div> */}
            </>
        )
    }
}


export default News
