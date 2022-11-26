import "./BoxModifier.css";

const BoxDice = ({value, onChange, id}) => {
    return (
        <div className='boxMod'>
            <form className='modForm'>
                <div>
                    <span className="modSpan">
                        ^
                    </span>
                </div>
                <input className='modTextbox' type='text' onChange={onChange.bind(this, id)} defaultValue='0' id={id.toString().concat('mod')}/>
            </form>
        </div>
    );
};

export default BoxDice;