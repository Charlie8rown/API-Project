import React, { useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { getOneSpot } from "../../store/spot"
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./SpotDetails.css"




const SpotDetails = ({currentSpot}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const loadedSpot = useSelector((state) => state.spot);
    const singleSpot = useSelector(state => state.spot);
    const images = useSelector(state => state.spot.SpotImages);
    const [spot, setSpot] = useState(useSelector((state) => state.spot));

    useEffect(() => {
        const initialLoad = () =>
        {
        const newSpot = dispatch(getOneSpot(spotId))
        getOneSpot(newSpot);
        }
        setIsLoaded(false)
        initialLoad()
        setIsLoaded(true)
    }, [dispatch])


    useEffect(() => {

        setIsLoaded(false)
        dispatch(getOneSpot(spotId))
            .then(() => console.log("useEffect2"))
            .then(() => setSpot(singleSpot))
            .then(() => setIsLoaded(true))

      }, [spotId, ]);

    const updateHandler = (e) => {
       history.push(`/spots/${spotId}/update`)
    };


    return (
      <>
        {isLoaded && (
          <>
            <h1>{currentSpot.name}</h1>
            <div>
              {currentSpot.city}, {currentSpot.state}, {currentSpot.country}
            </div>

            <div id="images-container">
              <div id="spot-image-list">
                {currentSpot.SpotImages &&
                  currentSpot.SpotImages.map((img) => (
                    <div className="image" key={img.id}>
                      <img className="image" src={img.url} alt="img.jpg" />
                    </div>
                  ))}
                {!currentSpot.SpotImages &&
                  spot.SpotImages.map((img) => (
                    <div className="image" key={img.id}>
                      <img className="image" src={img.url} alt="img.jpg" />
                    </div>
                  ))}
              </div>

              <div>${currentSpot.price} night</div>
            </div>
          </>
        )}
      </>
    );


}

export default SpotDetails;
