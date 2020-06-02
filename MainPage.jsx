import React, { Component } from "react";
import './main.css'



class MainPage extends Component{
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this)
        this.disp = this.disp.bind(this)
    }
    handleClick(){
        const form = document.querySelector('form');
        const formData = new FormData(form);
        const name = formData.get('name');
        const content = formData.get('content');
        const d = {
            name,
            content
        }
        const url = 'http://localhost:5000/val'

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(d),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(createdVal =>{
            console.log(createdVal)
        })
    }
    disp(){
        const valsElement = document.querySelector('.vals');
        fetch('http://localhost:5000/thoughts')
        .then(response => response.json())
        .then(vals =>{
            vals.reverse();
                vals.forEach(val => {
                    const div = document.createElement('div');
                    const header = document.createElement('h2');
                    header.textContent = val.name;
    
                    const contents = document.createElement('h5');
                    contents.textContent = val.content;
    
                    const date = document.createElement('small');
                    date.textContent = new Date(val.createDate);
    
                    div.appendChild(header);
                    div.appendChild(contents);
                    div.appendChild(date);
    
                    valsElement.appendChild(div);
                    
                })
                console.log("hi")
        })
        
    }
    render(){
    return (
    <div onLoad= {this.disp}className="title">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css"></link>
        <h1 >Spread Happiness</h1>
    <form className="mew-form">
        <div id="inside">
        <label id = "lname"> Name </label>
        <input type = "text" className="u-full-width" name="name"></input><br></br><br></br>
        <label id = "lcontent"> Thought </label>
        <input type = "text" className="u-full-width" name="content"></input><br></br><br></br>
        <input type = "button" value = "Submit" className ="button-primary" onClick = {this.handleClick}></input>
        </div>
    </form>
    <div   className="vals">
       
    </div>

    </div>
        )
    }
}

export default MainPage;