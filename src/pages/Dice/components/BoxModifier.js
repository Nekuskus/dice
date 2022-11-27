import "./BoxModifier.css";

const BoxDice = ({value, onChange, id}) => {
    const handleFocus = (event) => event.target.select();
    return (
        <div className='boxMod'>
            <form className='modForm'>
                <div>
                    <span className="modSpan">
                        {value}
                    </span>
                </div>
                <input className='modTextbox' type='text' onFocus={handleFocus} onChange={onChange.bind(this, id)} defaultValue='0' id={id.toString().concat('mod')}/>
            </form>
        </div>
    );
};

export default BoxDice;