import React, { useState } from "react";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button"
import ChildrenWrapper from "./components/ChildrenWrapper"
import ResultDisplay from "./components/ResultDisplay"
import BoxDice from "./components/BoxDice";
const przyciski = [
    ["Back", "+-", "d%", "/"],
    ['#', '^N', 'vN', "*"],
    ['d4', 'd6', 'd8', "-"],
    ['d10', 'd100', 'd12', "+"],
    ['d20', "dN", "Roll"],
];

/*
element {
    sign: true/false,
    value: int
    operation: "-"/"+","^N"...
    isdice: true/false
    dicetype: int
    ismodifier: true/false
    isoperator: true/false
    isnumber: true/false
    ntype: int
}
*/

const Dice = () => {
    let [state, setState] = useState({ 
        elements: []
    });
    function handleAppend (b) {
        let elements = state.elements;
        switch (b) {
            case "d4":
            case "d6":
            case "d8":
            case "d10":
            case "d100":
            case "d12":
            case "d20":
            case "d%":
            case "dN":
                elements.push({
                    sign: true,
                    value: 0,
                    operation: undefined,
                    isdice: true,
                    dicetype: b.slice(1),
                    ntype: (b === 'dN' ? 0 : undefined),
                    ismodifier: false,
                    isoperator: false,
                    isnumber: false
                });
                break;
            case "+":
            case "-":
            case "/":
            case "*":
                elements.push({
                    sign: (b === "+" || b === "*" ? true : false),
                    value: undefined,
                    operation: b,
                    isdice: false,
                    dicetype: undefined,
                    ntype: undefined,
                    ismodifier: false,
                    isoperator: true,
                    isnumber: false
                });
                break;
            case "^N":
            case "vN":
                elements.push({
                    sign: undefined,
                    value: undefined,
                    operation: b,
                    isdice: false,
                    dicetype: undefined,
                    ntype: undefined,
                    ismodifier: true,
                    isoperator: false,
                    isnumber: false
                });
                break;
            case "#":
                elements.push({
                    sign: undefined,
                    value: 0,
                    operation: undefined,
                    isdice: false,
                    dicetype: undefined,
                    ntype: undefined,
                    ismodifier: false,
                    isoperator: false,
                    isnumber: true
                });
                break;
            case "Back":
                elements.pop();
                break;
            default:
                console.log("this was not supposed to happen");
                break;
        }
        setState({elements});
        console.log(state.elements);
    }
    function handleSign (b) {
        let elements = state.elements;
        elements.at(-1).sign = !(elements.at(-1).sign);
        setState({elements});
        // true: +, false: -
    }
    function handleRoll (b) {

    }
    function handleDiceChange(id) {
        let elements = state.elements;
        let input = document.getElementById(id.toString().concat("diceType"))
        let value = input.value || 0;
        let correct = /^\d+$/.test(value);
        if(!correct) {
            input.value = 0;
            value = 0;
        }
        elements.at(id).value = value;
        setState({elements});
    }
    function handleDicetypeChange(id) {
        let elements = state.elements;
        let input = document.getElementById(id.toString().concat("nType"))
        let value = input.value || 0;
        let correct = /^\d+$/.test(value);
        if(!correct) {
            input.value = 0;
            value = 0;
        }
        elements.at(id).ntype = value;
        setState({elements});
    }
    return (
        <div>
            <h2>Kości</h2>
            <div className='maincontent'>
                <Screen>
                    <ChildrenWrapper>
                        {
                            state.elements.map((el, id) => {
                                console.log("id = " + id)
                                return (
                                    <BoxDice
                                        key={id}
                                        id={id}
                                        dicetype={el.dicetype}
                                        onChange={handleDiceChange.bind(this, id)}
                                        onChangeN={el.dicetype === 'N' ? handleDicetypeChange.bind(this, id) : undefined}
                                    />
                                )
                            })
                        }
                    </ChildrenWrapper> 
                    <ResultDisplay value="1d20 = 2"/>
                </Screen>
                <ButtonBox>
                    {
                        przyciski.flat().map((b, i) => {
                            return (
                                <Button
                                    key={i}
                                    id={i}
                                    className={b === "Roll" ? "roll" : ""}
                                    value={b}
                                    onClick={ b === "Roll" ? handleRoll.bind(this, b) : (b === "+-" ? handleSign.bind(this, b) : handleAppend.bind(this, b)) }
                                />
                            );
                        })
                    }
                </ButtonBox>
            </div>
        </div>
    );
}

export default Dice;