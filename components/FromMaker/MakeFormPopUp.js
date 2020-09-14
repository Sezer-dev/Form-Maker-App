import React from 'react'

export default function MakeFormPopUp(props) {
    return (
        <div
            className="makeFormDiv"
            onClick={props.handlePopUp}
            style={{ display: props.data.dialog ? "flex" : "none" }}>

            <div className="dialog-div">
                <div className="dialog-content">
                    <div id="editable" className="formNameDiv" contentEditable="true"></div>
                    <form>
                        {props.data.formElements}
                    </form>
                    <button onClick={props.addInput}>New Input</button>
                    <button type="submit" onClick={props.addForm} >Create</button>
                    <div id="editable" className="formDescriptionDiv" contentEditable="true"></div>
                    <button id="popDown" onClick={props.handlePopUp}>X</button>
                </div>
            </div>
        </div>
    )
}
