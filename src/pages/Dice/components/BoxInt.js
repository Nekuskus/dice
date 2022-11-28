import "./BoxInt.css";

const BoxInt = ({onBlur, id}) => {
    const handleFocus = (event) => event.target.select();
    return (
        <div className='boxInt'>
            <form className='intForm'>
                <input className='intTextbox' type='text' onFocus={handleFocus} onBlur={onBlur.bind(this, id)} defaultValue='0' id={id.toString().concat('int')}/>
            </form>
        </div>
    );
};

export default BoxInt;