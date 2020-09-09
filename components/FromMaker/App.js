import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import MakeForm from './MakeForm';
import Form from "./Form";
import FormList from "./FormList"

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            formJSON: []
        }
    }

    componentDidMount(){
        this.setState( prevState => (prevState.formJSON = JSON.parse(localStorage.getItem("forms")), prevState))
    }

    render() {
        return (
            <Router>
                <div>

                    <Switch>
                        <Route exact path="/form-olustur">
                            <MakeForm />
                        </Route>
                    </Switch>
                    <Link to="/"><button>Homepage</button></Link>
                    <Link to="/form-olustur"><button>Create New Form</button></Link>

                    {Boolean(JSON.parse(localStorage.getItem("forms"))) && <FormList formJSON={this.state.formJSON} />}
                    {Boolean(JSON.parse(localStorage.getItem("forms"))) && <Form formJSON={this.state.formJSON} />}

                </div>
            </Router>
        )
    }
}