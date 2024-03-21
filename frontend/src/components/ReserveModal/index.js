import './Reserve.css';

function ReserveModal({email}) {
    return (
        <div>
            <p className='reserveHeading'>Email your host at {email} to reserve</p>
        </div>
    );
}

export default ReserveModal;
