import "./BoxOperator.css";

const BoxOperator = ({value}) => {
    return (
        <div className='boxOperator'>
            <div className='boxValue'>
                {value}
            </div>
            <div className='boxClear'></div>
        </div>
    );
};

export default BoxOperator;