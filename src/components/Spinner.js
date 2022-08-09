import React, { Component } from "react"
import "../spinner.css"
export class Spinner extends Component {
   render() {
      return (
         <div className="text-center">
            <div className="spinner-container">
               <div className="loading-spinner"></div>
            </div>
         </div>
      )
   }
}

export default Spinner
