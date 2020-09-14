import React from 'react'
import { Route, Link } from "react-router-dom";

export default function FormList(props) {
    return (
        <Route exact path="/">

            <table>
                <tbody>
                    {props.localStr.map((el, index) => {
                        return (
                            <tr key={index}>
                                <td>{el.name}</td>
                                <td><Link to={"/form-" + el.name}><button >Show Me</button></Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Route>
    )
}