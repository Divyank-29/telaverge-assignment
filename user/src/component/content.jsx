/* eslint-disable no-unused-vars */
import React,  {useEffect } from "react";
import { useParams } from "react-router-dom";
export default Content;


function Content (){
    let courseId=useParams();
    const [course , setCourse] = React.useState([]);
    
    // useEffect(() => { 
    //     fetch(`http://localhost:3000/course/${courseId}`, {
    //       method: "GET",
    //       headers: {
    //         "authorization": "Bearer " + localStorage.getItem("token")
    //       }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(data);
    //     });
    //   });

                return (
                    <div>
                        
                    </div>
                )
   
}