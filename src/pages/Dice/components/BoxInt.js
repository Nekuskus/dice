import "./BoxInt.css";

const BoxInt = ({onChange, id}) => {
    return (
        <div className='boxInt'>
            <form className='intForm'>
                <input className='intTextbox' type='text' onChange={onChange.bind(this, id)} defaultValue='0' id={id.toString().concat('int')}/>
            </form>
        </div>
    );
};

export default BoxInt;