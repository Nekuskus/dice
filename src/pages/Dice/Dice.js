import React, { Component } from "react";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button"
import ChildrenWrapper from "./components/ChildrenWrapper"
import ResultDisplay from "./components/ResultDisplay"
const przyciski = [
    ["Back", "+-", "d%", "/"],
    ['#', '^N', 'vN', "*"],
    ['d4', 'd6', 'd8', "-"],
    ['d10', 'd100', 'd12', "+"],
    ['d20', "dN", "Roll"],
];

class Dice extends Component {
    render() {
        return (
            <div>
                <h2>Kości</h2>
                <div className='maincontent'>
                    <Screen>
                        <ChildrenWrapper>
                        </ChildrenWrapper> 
                        <ResultDisplay value="1d20 = 2"/>
                    </Screen>
                    <ButtonBox>
                        {
                            przyciski.flat().map((b, i) => {
                                return (
                                    <Button
                                        key={i}
                                        className={b === "Roll" ? "roll" : ""}
                                        value={b}
                                        onClick={() => {
                                            
                                        }}
                                    />
                                );
                            })
                        }
                    </ButtonBox>
                </div>
            </div>
        );
    }
}

export default Dice;