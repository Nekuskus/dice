import "./BoxDice.css";

const BoxDice = ({dicetype, onBlur, id}) => {
    const handleFocus = (event) => event.target.select();
    return (
        <div className='boxDice'>
            <form className='diceForm'>
                <input className='diceTextbox' type='text' onFocus={handleFocus} onBlur={onBlur.bind(this, id)} defaultValue='0' id={id.toString().concat('diceType')}/>
                <div>
                    <span className="diceSpan">
                        d{dicetype}
                    </span>
                </div>
            </form>
        </div>
    );
};

export default BoxDice;