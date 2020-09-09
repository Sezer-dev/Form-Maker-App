import React, { Component } from 'react';

export default class MakeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arr: [],
            localStr: "",
            formTypes: {
                "name": "",
                "description": "",
                "creatAt": "",
                "fields": []
            }
        }
    }

    inputEkle = () => {
        this.setState({
            arr: [...this.state.arr,
            <div>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-minus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z" />
                    <path fillRule="evenodd" d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
                </svg>
                <input type="text" placeholder="Input Name" />
                <select>
                    <option>Optional</option>
                    <option>Required</option>
                </select>
                <select>
                    <option>Text</option>
                    <option>Number</option>
                </select>
            </div>

            ]
        })
    }

    formEkle = event => {
        event.persist()
        let tarih = new Date();

        let formFields = []
        for (let i = 0; i < event.target.parentElement.childNodes[1].childNodes.length; i++) {
            const [, input, selectReq, selectType] = event.target.parentElement.childNodes[1].childNodes[i].childNodes
            formFields.push({
                "name": input.value,
                "required": selectReq.value === "Required" ? true : false,
                "dataType": selectType.value === "Text" ? "STRING" : "NUMBER"
            })
        }
        this.setState(prevState => ({
            formTypes: {
                "name": event.target.parentElement.firstElementChild.firstChild === null ? "" : event.target.parentElement.firstElementChild.firstChild.data,
                "description": event.target.parentElement.lastElementChild.firstChild === null ? "" : event.target.parentElement.lastElementChild.firstChild.data,
                "createdAt": `${tarih.getFullYear()}-${tarih.getMonth()} - ${tarih.getDate()}`,
                "fields": [...prevState.formTypes.fields, ...formFields]
            }
        }), () => {
            if (localStorage.getItem("forms") === null) {
                this.setState({ localStr: JSON.stringify([this.state.formTypes]) }, () => {
                    localStorage.setItem("forms", this.state.localStr)
                })
            } else {
                let kamur = JSON.parse(localStorage.getItem("forms"))
                this.setState({ localStr: JSON.stringify([...kamur, { ...this.state.formTypes }]) }, () => {
                    localStorage.setItem("forms", this.state.localStr)
                })

            }
        })

    }

    render() {
        return (
            <div className="makeFormDiv">
                <div id="editable" className="formNameDiv" contentEditable="true"></div>
                <form>
                    {this.state.arr}
                </form>
                <button onClick={this.inputEkle}>New Input</button>
                <button type="submit" onClick={this.formEkle} >Create</button>
                <div id="editable" className="formDescriptionDiv" contentEditable="true"></div>
            </div>
        )
    }
}