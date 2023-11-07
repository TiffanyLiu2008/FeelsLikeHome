import './SpotDetails.css';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../store/spots';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const [goToSpot, setGoToSpot] = useState(spotId);
  const spot = useSelector(state => state.spots[spotId]);
  useEffect(() => {
    dispatch(getSpotDetails(spotId));
  }, [dispatch, spotId]);
  console.log(spot);
  return (
    <section>
      {/* <table id="report-table">
        <thead>
          <tr>
            <th colSpan="2">Report #{reportId}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="attribute">Understanding:</td>
            <td className="value">{report?.understanding}</td>
          </tr>
          <tr>
            <td className="attribute">Improvement:</td>
            <td className="value">{report?.improvement}</td>
          </tr>
        </tbody>
      </table>
      <div className="footer">
        <Link
          className="back-button"
          to="/"
        >
          Back to Report Index
        </Link>
        <form className="go-to-report-form" onSubmit={handleSubmit}>
          Go to Report #
          <input
            type="number"
            min={1}
            max={99}
            value={goToSpot}
            onChange={(e) => setGoToSpot(e.target.value)}
            required
          />
        </form>
      </div> */}
    </section>
  );
};

export default SpotDetails;
