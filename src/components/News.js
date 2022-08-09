import React, { Component } from "react"
import { NewsItem } from "./NewsItem"
import { Spinner } from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
   static defaultProps={
      country:'in',
      pageSize:5,
      category:'science'
   }
   static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string,
   }
   articles = []
   constructor() {
      super()
      console.log("Hello I am a News Componenet Constructor")
      this.state = {
         articles: this.articles,
         loading: false,
         page: 1,
      }
   }
   handledata = async () => {
      console.log(this.props.category)
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f71b11443bd14581b7fe57a607672f6a&page=${
         this.state.page + 1
      }&pageSize=${this.props.pageSize}`
      this.setState({
         loading:true
      })
      const res = await fetch(url)
      const data = await res.json()
      this.setState({
         articles: data.articles,
         totalResults: data.totalResults,
         loading:false,
      })
   }
   componentDidMount() {
      //    let headers = new Headers({

      //       "User-Agent"   : "MY-UAs-STRING"
      //   });
      //    fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f71b11443bd14581b7fe57a607672f6a&page=1&pageSize=${this.props.pageSize}`)
      //  .then(result => {
      //    console.log(result);
      //    const data = result.articles
      //    console.log(data);
      //    this.setState({
      //       articles: data.articles,
      //       totalResults:data.totalResults
      //   });
      //  }).catch(e=>{
      //    console.log(e);
      //  })
      this.handledata()
   }
   handleNextClick = async () => {
      console.log("Previous")
      if (
         !(this.state.page + 1 >
         Math.ceil(this.state.totalResults / this.props.pageSize))
      ) 
       { 
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f71b11443bd14581b7fe57a607672f6a&page=${
            this.state.page + 1
         }&pageSize=${this.props.pageSize}`
         this.setState({
            loading:true
         })
         const res = await fetch(url)
         const data = await res.json()
         this.setState({
            articles: data.articles,
         })
         this.setState({
            page: this.state.page + 1,
            loading:false
         })
      }
   }
   handlePreviousClick = async () => {
      console.log("Next")
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f71b11443bd14581b7fe57a607672f6a&page=${
         this.state.page - 1
      }&pageSize=${this.props.pageSize}`
      this.setState({
         loading:true
      })
      const res = await fetch(url)
      const data = await res.json()
      this.setState({
         articles: data.articles,
         loading:false
      })
      this.setState({
         page: this.state.page - 1,
      })
   }
   render() {
      return (
         <div className="container my-3">
            <h1 className="text-center my-4">NewsMonkey- Top Headlines</h1>
            {this.state.loading && <Spinner/>}
            <div className="row">
               {!this.state.loading&&this.state.articles.map((element) => {
                  return (
                     <div className="col-md-4" key={element.url}>
                        <NewsItem
                           title={element.title ? element.title : " "}
                           description={
                              element.description ? element.description : " "
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
            <div className="container d-flex justify-content-between">
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
            </div>
         </div>
      )
   }
}

export default News
