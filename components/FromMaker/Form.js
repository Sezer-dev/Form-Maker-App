import React from 'react'
import { Switch, Route } from "react-router-dom"

export default function Form(props) {
    return (
        props.localStr.map((el, index) => {
            return (
                <Switch>
                    <Route exact path={"/" + el.name}>
                        <div className="indFormEl">
                            <h2>{el.name}</h2>
                            {el.fields.map(el => {
                                return (
                                    <input
                                        placeholder={el.name}
                                        required={el.required ? true : false}
                                        type={el.dataType === "STRING" ? "text" : el.dataType === "NUMBER" ? "number" : null}
                                    ></input>
                                )
                            })}
                            <h3>{el.description}</h3>
                            <p>{el.createdAt}</p>
                        </div>
                    </Route>
                </Switch>
            )
        })
    )
}
