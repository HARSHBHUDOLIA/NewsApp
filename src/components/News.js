import React, { Component } from "react"


import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from './Spinner';
import NewsItem from './NewsItem';

export class News extends Component {
   static defaultProps = {
      country: "in",
      pageSize: 5,
      category: "science",
   }
   static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
   }
   articles = []
   capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1)
   }
   constructor(props) {
      super(props)
      console.log("Hello I am a News Componenet Constructor")
      this.state = {
         articles: this.articles,
         loading: true,
         page: 1,
         totalResults: 0,
      }
      document.title = `${this.capitalizeFirstLetter(
         this.props.category
      )}- NewsMonkey`
   }

   async updateNews() {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f71b11443bd14581b7fe57a607672f6a&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({
         loading: true,
      })
      const res = await fetch(url)
      const data = await res.json()
      this.setState({
         articles: data.articles,
         totalResults: data.totalResults,
         loading: false,
      })
   }
   componentDidMount() {
      this.updateNews()
   }
   // handleNextClick = async () => {
   //    this.setState({
   //       page: this.state.page + 1,
   //    })
   //    this.updateNews()
   // }
   // handlePreviousClick = async () => {
   //    this.setState({
   //       page: this.state.page - 1,
   //    })
   //    this.updateNews()
   // }
   fetchMoreData = async () => {
      this.setState({
         page: this.state.page + 1,
      })
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
      
      const res = await fetch(url)
      const data = await res.json()
      this.setState({
         articles: this.state.articles.concat(data.articles),
         totalResults: data.totalResults,
         
      })
   }
   render() {
      return (
        <>
            <h1 className="text-center" style={{marginTop:"90px"}}>
               NewsMonkey- Top from{" "}
               {this.capitalizeFirstLetter(this.props.category)} Headlines{" "}
            </h1>
            {this.state.loading && <Spinner />}
            <InfiniteScroll
               dataLength={this.state.articles.length}
               next={this.fetchMoreData}
               hasMore={this.state.articles.length !== this.state.totalResults}
               loader={<Spinner/>}
            >
               <div className="container">
                  <div className="row">
                     {this.state.articles.map((element,index) => {
                        return (
                           <div className="col-md-4" key={element.url+index}>
                              <NewsItem
                                 title={element.title ? element.title : " "}
                                 description={
                                    element.description
                                       ? element.description
                                       : " "
                                 }
                                 imageUrl={element.urlToImage}
                                 newsUrl={element.url}
                                 author={element.author}
                                 date={element.publishedAt}
                                 source={element.source.name}
                              />
                           </div>
                        )
                     })}
                  </div>
               </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
               <button
                  disabled={this.state.page <= 1}
                  type="button"
                  className="btn btn-dark"
                  onClick={this.handlePreviousClick}
               >
                  {" "}
                  Previous
               </button>
               <button
                  disabled={
                     this.state.page + 1 >
                     Math.ceil(this.state.totalResults / this.props.pageSize)
                  }
                  type="button"
                  className="btn btn-dark"
                  onClick={this.handleNextClick}
               >
                  Next{" "}
               </button>
            </div> */}
        </>
      )
   }
}

export default News
// 