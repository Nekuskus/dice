import React, { useState } from "react";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button"
import ChildrenWrapper from "./components/ChildrenWrapper"
import ResultDisplay from "./components/ResultDisplay"
import BoxDice from "./components/BoxDice";
import BoxNDice from "./components/BoxNDice";
import BoxInt from "./components/BoxInt";
import BoxOperator from "./components/BoxOperator";
import BoxModifier from "./components/BoxModifier";

const przyciski = [
    ["Back", /*"+-",*/ "d%", "/"],
    ['#', '^N', 'vN', "*"],
    ['d4', 'd6', 'd8', "-"],
    ['d10', 'd100', 'd12', "+"],
    ['d20', "dN", "Roll"],
];

/*
element {
    sign: true/false,
    value: int
    operator: "-"/"+","^N"...
    isdice: true/false
    dicetype: int
    ismodifier: true/false
    isoperator: true/false
    isnumber: true/false
    ntype: int
}
*/

// this function is inclusive on both sides and assumes both numbers are integers
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const Dice = () => {
    let [state, setState] = useState({
        elements: [],
        displaystr: ""
    });
    function handleAppend(b) {
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
                    sign: undefined,
                    value: 0,
                    operator: undefined,
                    isdice: true,
                    dicetype: b.slice(1),
                    ntype: (b === 'dN' ? 0 : undefined),
                    ismodifier: false,
                    isoperator: false,
                    isnumber: false,
                    isdiceresult: false
                });
                break;
            case "+":
            case "-":
            case "/":
            case "*":
                elements.push({
                    sign: undefined,
                    value: undefined,
                    operator: b,
                    isdice: false,
                    dicetype: undefined,
                    ntype: undefined,
                    ismodifier: false,
                    isoperator: true,
                    isnumber: false,
                    isdiceresult: false
                });
                break;
            case "^N":
            case "vN":
                elements.push({
                    sign: undefined,
                    value: undefined,
                    operator: b,
                    isdice: false,
                    dicetype: undefined,
                    ntype: undefined,
                    ismodifier: true,
                    isoperator: false,
                    isnumber: false,
                    isdiceresult: false
                });
                break;
            case "#":
                elements.push({
                    sign: undefined,
                    value: 0,
                    operator: undefined,
                    isdice: false,
                    dicetype: undefined,
                    ntype: undefined,
                    ismodifier: false,
                    isoperator: false,
                    isnumber: true,
                    isdiceresult: false
                });
                break;
            case "Back":
                elements.pop();
                break;
            default:
                console.log("this was not supposed to happen");
                break;
        }
        setState({ elements: elements });
        console.log(state.elements);
    }
    function handleSign(b) {
        let elements = state.elements;
        if (elements.at(-1).isnum) {
            elements.at(-1).value = -elements.at(-1).value;
        } else if (elements.at(-1).isdice) {
            elements.at(-1).sign = !(elements.at(-1).sign);
        }
        setState({ elements: elements });
        // true: +, false: -
    }
    function handleRoll(b) {
        let elements = JSON.parse(JSON.stringify(state.elements)); //deep copy
        let length = elements.length;
        let str = '';
        let error = false;
        let errorstr = '';
        for (let i = 0; i < length; i++) {
            if (elements[i].isdice) {
                if (elements[i].value !== 0) {
                    let negative = false;
                    if(elements[i].value < 0) {
                        negative = true;
                        elements[i].value *= -1;
                    }
                    let values = [];
                    switch (elements[i].dicetype) {
                        case "4":
                        case "6":
                        case "8":
                        case "10":
                        case "12":
                        case "20":
                            for (let i2 = 0; i2 < elements[i].value; i2++) {
                                values.push(getRandom(1, elements[i].dicetype));
                            }
                            break;
                        case "100":
                            for (let i2 = 0; i2 < elements[i].value; i2++) {
                                values.push(getRandom(0, 9) * 10);
                            }
                            break;
                        case "%":
                            for (let i2 = 0; i2 < elements[i].value; i2++) {
                                values.push(getRandom(1, 100));
                            }
                            break;
                        case "N":
                            for (let i2 = 0; i2 < elements[i].value; i2++) {
                                if(elements[i].ntype !== 0) values.push(getRandom(1, elements[i].ntype));
                                else values.push(0);
                            }
                            break;
                    }
                    elements[i].values = values;
                    if(negative) {
                        for(let i2 = 0; i2 < elements[i].values.length; i2++) {
                            elements[i].values[i2] *= -1;
                        }
                    }
                } else {
                    elements[i].values = [0];
                }
                elements[i].isdiceresult = true;
                elements[i].isdice = false;
            }
        }
        for (let i = 0; i < length; i++) {
            if (elements[i].isdiceresult) {
                console.log(elements[i].values)
                if (elements.at(i + 1) !== undefined && elements.at(i + 1).ismodifier) {
                    str += '<span class="parentnotation"> (</span><span class="arraynotation">[ </span>';
                } else {
                    str += '<span class="arraynotation"> [ </span>';
                }
                for (let i2 = 0; i2 < elements[i].values.length; i2++) {
                    str += elements[i].values[i2];
                    if ((i2 + 1) !== elements[i].values.length) {
                        str += '<span class="arraynotation"> , </span>';
                    }
                }
                if (elements.at(i + 1) !== undefined && elements.at(i + 1).ismodifier) {
                    str += ' <span class="arraynotation"> ]</span><span class="parentnotation">)</span>';
                } else {
                    str += '<span class="arraynotation"> ] </span>';
                }
            } else if (elements[i].isnumber) {
                str += ` <span class="numbernotation">${elements[i].value}</span> `
            } else if (elements[i].isoperator) {
                str += ` <span class="operatornotation">${elements[i].operator}</span>`
            } else if (elements[i].ismodifier) {
                str += `<span class="parentnotation">^</span>${elements[i].value}`;
            }
        }
        console.log(str);
        for (let i = 0; i < length; i++) {
            if (elements[i].ismodifier && !error) {
                if (elements[i - 1] !== undefined && elements[i - 1].isdiceresult) {
                    elements[i - 1].values.sort((a, b) => {
                        if (a < b) return -1;
                        else if (a > b) return 1;
                        else return 0;
                    });
                    if (elements[i].value <= elements[i - 1].values.length) {
                        if(elements[i].value !== 0) {
                            if (elements[i].operator === '^N') {
                                elements[i - 1].values = elements[i - 1].values.slice(elements[i - 1].values.length - elements[i].value)
                            } else if (elements[i].operator === 'vN') {
                                elements[i - 1].values = elements[i - 1].values.slice(0, elements[i].value)
                            }
                        } else {
                            elements[i - 1].values = [0];
                        }
                        elements.splice(i, 1);
                        length -= 1;
                        i -= 1;
                        console.log('result = ' + JSON.stringify(elements));
                    } else {
                        error = true;
                        errorstr = 'Ilość wybranych kości nie może być większa od ilości kości'
                    }
                } else {
                    error = true;
                    errorstr = 'Modyfikatorów rzutów można używać tylko po rzutach kością'
                }
            }
        }
        function getValueOrSum(el) {
            if (el.isdiceresult) {
                return el.values.reduce((accumulator, currentValue) => accumulator + currentValue);
            } else if (el.isnumber) {
                return parseFloat(el.value);
            }
            return undefined;
        }
        for (let i = 0; i < length; i++) {
            if (elements[i].isoperator && (elements[i].operator === '*' || elements[i].operator === '/') && !error) {
                if (elements[i - 1] !== undefined && elements[i + 1] !== undefined && !elements[i - 1].isoperator && !elements[i + 1].isoperator) {
                    if (elements[i].operator === '*') {
                        elements[i].value = getValueOrSum(elements[i - 1]) * getValueOrSum(elements[i + 1]);
                        elements[i].isnumber = true;
                        elements[i].isoperator = false;
                    } else if (elements[i].operator === '/') {
                        elements[i].value = getValueOrSum(elements[i - 1]) / getValueOrSum(elements[i + 1]);
                        elements[i].isnumber = true;
                        elements[i].isoperator = false;
                    }
                    console.log('result = ' + elements[i].value.toString());
                    elements.splice(i + 1, 1);
                    elements.splice(i - 1, 1);
                    length -= 2;
                    i -= 1;
                } else {
                    error = true;
                    errorstr = 'Operatorów można używać tylko pomiędzy wyrażeniami';
                }
            }
        }
        for (let i = 0; i < length; i++) {
            if (elements[i].isoperator && (elements[i].operator === '+' || elements[i].operator === '-') && !error) {
                if (elements[i - 1] !== undefined && elements[i + 1] !== undefined && !elements[i - 1].isoperator && !elements[i + 1].isoperator) {
                    if (elements[i].operator === '+') {
                        elements[i].value = getValueOrSum(elements[i - 1]) + getValueOrSum(elements[i + 1]);
                        elements[i].isnumber = true;
                        elements[i].isoperator = false;
                    } else if (elements[i].operator === '-') {
                        elements[i].value = getValueOrSum(elements[i - 1]) - getValueOrSum(elements[i + 1]);
                        elements[i].isnumber = true;
                        elements[i].isoperator = false;
                    }
                    elements.splice(i + 1, 1);
                    elements.splice(i - 1, 1);
                    length -= 2;
                    i -= 1;
                } else {
                    error = true;
                    errorstr = 'Operatorów można używać tylko pomiędzy wyrażeniami';
                }
            }
        }
	if (elements.length > 1) {
            console.log("More than 1 element left after eval, assuming multiplication");
	    for (let i = 0; elements[i].length - 1; i++) {
                elements[0].value = getValueOrSum(elements[0]) *  getValueOrSum(elements[1]);
                elements.splice(1, 1);
                elements[0].isnumber = true;
                elements[0].isdiceresult = false;
                elements[0].isoperator = false;
                // Cannot be modifier but I'll set it anyways
                elements[0].ismodifier = false;
            }
        }
        let result = elements[0].value;
        let display = document.getElementById('resultDisplay');
        if (!error) {
            display.innerHTML = str + "<span class='operatornotation'> = </span><span class='numbernotation'>" + result.toString() + "</span>";
        } else {
            display.innerHTML = errorstr;
        }
        setState({ elements: state.elements });
    }
    function handleDiceBlur(id) {
        let elements = state.elements;
        let input = document.getElementById(id.toString().concat("diceType"))
        let value = input.value;
        let correct = /-?^\d+$/.test(value) && value !== undefined;
        if (!correct) {
            input.value = 0;
            value = 0;
        }
        elements.at(id).value = value;
        setState({ elements: elements });
    }
    function handleDicetypeBlur(id) {
        let elements = state.elements;
        let input = document.getElementById(id.toString().concat("nType"))
        let value = input.value;
        let correct = /^\d+$/.test(value) && value;
        if (!correct) {
            input.value = 0;
            value = 0;
        }
        elements.at(id).ntype = value;
        setState({ elements: elements });
    }
    function handleNumberBlur(id) {
        let elements = state.elements;
        let input = document.getElementById(id.toString().concat("int"))
        let value = input.value;
        let correct = /^-?\d+$/.test(value) && value !== undefined;
        if (!correct) {
            input.value = 0;
            value = 0;
        }
        elements.at(id).value = value;
        setState({ elements: elements });
    }
    function handleModifierBlur(id) {
        let elements = state.elements;
        let input = document.getElementById(id.toString().concat("mod"))
        let value = input.value;
        let correct = /^\d+$/.test(value) && value !== undefined;
        if (!correct) {
            input.value = 0;
            value = 0;
        }
        elements.at(id).value = value;
        setState({ elements: elements });
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
                                if (el.isdice) {
                                    if (el.dicetype === 'N') {
                                        return (
                                            <BoxNDice
                                                key={id}
                                                id={id}
                                                onBlur={handleDiceBlur.bind(this, id)}
                                                onBlurN={handleDicetypeBlur.bind(this, id)}
                                            />
                                        )
                                    }
                                    else {
                                        return (
                                            <BoxDice
                                                key={id}
                                                id={id}
                                                dicetype={el.dicetype}
                                                onBlur={handleDiceBlur.bind(this, id)}
                                            />
                                        )
                                    }
                                } else if (el.isnumber) {
                                    return (
                                        <BoxInt
                                            key={id}
                                            id={id}
                                            onBlur={handleNumberBlur.bind(this, id)}
                                        />
                                    )
                                } else if (el.isoperator) {
                                    return (
                                        <BoxOperator
                                            key={id}
                                            value={el.operator}
                                        />
                                    )
                                } else if (el.ismodifier) {
                                    return (
                                        <BoxModifier
                                            key={id}
                                            id={id}
                                            value={el.operator.slice(0, 1)
                                            }
                                            onBlur={handleModifierBlur.bind(this, id)}
                                        />
                                    )
                                }
                            })
                        }
                    </ChildrenWrapper>
                    <ResultDisplay value={'1d20 = 2'} />
                </Screen>
                <ButtonBox>
                    {
                        przyciski.flat().map((b, i) => {
                            return (
                                <Button
                                    key={i}
                                    id={i}
                                    className={b === "Roll" ? "roll" : (b === "Back" ? "back" : "")}
                                    value={b}
                                    onClick={b === "Roll" ? handleRoll.bind(this, b) : (b === "+-" ? handleSign.bind(this, b) : handleAppend.bind(this, b))}
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
