import "./BoxNDice.css";

const BoxNDice = ({onChange, id, onChangeN }) => {
    return (
        <div className='boxNDice'>
            <form className='diceNForm'>
                <input className='diceNTextbox' type='text' onChange={onChange.bind(this, id)} defaultValue='0' id={id.toString().concat('diceType')}/>
                <div>
                    <span className="diceNSpan">
                        d
                    </span>
                    <input className='diceNTextbox' type='text' onChange={onChangeN.bind(this, id)} defaultValue='0' id={id.toString().concat('nType')}/>
                </div>
            </form>
        </div>
    );
};

export default BoxNDice;