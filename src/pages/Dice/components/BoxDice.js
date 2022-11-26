import "./BoxDice.css";

const BoxDice = ({dicetype, onChange, id, onChangeN }) => {
    return (
        <div className='boxDice'>
            <form className='diceForm'>
                <input className='diceTextbox' type='text' onChange={onChange.bind(this, id)} defaultValue='0' id={id.toString().concat('diceType')}/>
                { dicetype !== 'N' ?
                        <div>
                            <span className="diceSpan">
                                d{dicetype}
                            </span>
                        </div>
                    : 
                        <div>
                            <span className="diceSpan">
                                d
                            </span>
                            <input className='diceTextbox' type='text' onChange={onChangeN.bind(this, id)} defaultValue='0' id={id.toString().concat('nType')}/>
                        </div>
                }
            </form>
        </div>
    );
};

export default BoxDice;

{/* <span className="diceSpan"></span><span className="diceSpan"></span>*/}