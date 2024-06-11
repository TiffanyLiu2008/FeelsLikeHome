import './Reserve.css';

function ReserveModal({email}) {
    return (
        <div className='reserveModal'>
            <h1 className='heading'>Please email your host at {email} to reserve.</h1>
        </div>
    );
}

export default ReserveModal;
