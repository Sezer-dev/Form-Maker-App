import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Form from "./Form";
import FormList from "./FormList"

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            formElements: [],
            formTypes: {
                "name": "",
                "description": "",
                "creatAt": "",
                "fields": []
            },
            localStr: []
        }
    }

    componentDidMount() {
        this.setState({ localStr: JSON.parse(localStorage.getItem("forms")) })
    }

    addInput = () => {
        this.setState(prevState => (prevState.formElements.push(
            <div>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-minus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z" />
                    <path fillRule="evenodd" d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
                </svg>
                <input type="text" placeholder="Input Name" />
                <select>
                    <option>Required</option>
                    <option>Optional</option>
                </select>
                <select>
                    <option>Text</option>
                    <option>Number</option>
                </select>
            </div>

        ), prevState))
    }

    addForm = event => {
        event.persist()
        const inputDivs = document.querySelectorAll(".makeFormDiv form  div")
        const formName = document.querySelector(".formNameDiv").firstChild === null ? "" : document.querySelector(".formNameDiv").firstChild.data
        const formDescription = document.querySelector(".formDescriptionDiv").firstChild === null ? "" : document.querySelector(".formDescriptionDiv").firstChild.data
        const tarih = new Date()

        const formFields = []
        for (let i = 0; i < inputDivs.length; i++) {
            const [, input, selectReq, selectType] = inputDivs[i].children
            formFields.push({
                "name": input.value,
                "required": selectReq.value === "Required",
                "dataType": selectType.value === "Text" ? "STRING" : "NUMBER"
            })
        }
        this.setState({
            formTypes: {
                "name": formName,
                "description": formDescription,
                "createdAt": `${tarih.getFullYear()}-${tarih.getMonth()}-${tarih.getDate()}`,
                "fields": [...formFields]
            },
            formElements: []
        }, () => {
            if (localStorage.getItem("forms") === null) {
                localStorage.setItem("forms", JSON.stringify([{ ...this.state.formTypes }]))
                this.setState({ localStr: JSON.parse(localStorage.getItem("forms")) })
            } else {
                let kamur = JSON.parse(localStorage.getItem("forms"))
                kamur.push({ ...this.state.formTypes })
                localStorage.setItem("forms", JSON.stringify([...kamur]))
                this.setState({ localStr: [...kamur] })
            }
        })
    }

    render() {
        return (
            <Router>
                <div>

                    <Switch>
                        <Route exact path="/form-olustur">
                            <div className="makeFormDiv">
                                <div id="editable" className="formNameDiv" contentEditable="true"></div>
                                <form>
                                    {this.state.formElements}
                                </form>
                                <button onClick={this.addInput}>New Input</button>
                                <button type="submit" onClick={this.addForm} >Create</button>
                                <div id="editable" className="formDescriptionDiv" contentEditable="true"></div>
                            </div>
                        </Route>
                    </Switch>
                    <Link to="/"><button>Homepage</button></Link>
                    <Link to="/form-olustur"><button>Create New Form</button></Link>

                    {Boolean(JSON.parse(localStorage.getItem("forms"))) && <FormList localStr={this.state.localStr} />}
                    {Boolean(JSON.parse(localStorage.getItem("forms"))) && <Form localStr={this.state.localStr} />}

                </div>
            </Router>
        )
    }
}