import React, { useEffect, useState} from 'react';
import { allUserSpots } from '../../store/spot';
import { useDispatch, useSelector } from 'react-redux';
import './ManageSpots.css';


const ManageSpots = () => {
  const dispatch = useDispatch();
  const currUserSpots = useSelector((State) => State.spot.currUserSpots);
  const spots = currUserSpots ? Object.values(currUserSpots) : [];
  const currUser = useSelector((State) => State.session.user);
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    if (user) {
      dispatch(allUserSpots());
    }
  }, [dispatch, user]);
}


export default ManageSpots;
