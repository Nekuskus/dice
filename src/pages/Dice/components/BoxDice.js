import "./BoxDice.css";

const BoxDice = ({dicetype, onChange, id}) => {
    const handleFocus = (event) => event.target.select();
    return (
        <div className='boxDice'>
            <form className='diceForm'>
                <input className='diceTextbox' type='text' onFocus={handleFocus} onChange={onChange.bind(this, id)} defaultValue='0' id={id.toString().concat('diceType')}/>
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