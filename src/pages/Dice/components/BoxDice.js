import "./BoxDice.css";

const BoxDice = ({dicetype, onChange, id}) => {
    return (
        <div className='boxDice'>
            <form className='diceForm'>
                <input className='diceTextbox' type='text' onChange={onChange.bind(this, id)} defaultValue='0' id={id.toString().concat('diceType')}/>
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