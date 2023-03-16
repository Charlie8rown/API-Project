import './SpotImages.css'

const SpotImages = ({ images }) => {
    let previewImage
    let secondaryImages = [];
    if (!images) return null;

    for (let i = 0; i < images.length; i++) {
        if (i === 5) break;
        if (i === 0) previewImage = <img src={images[0].url} alt='MainPhoto' id='preview-image'></img>
        else {
            secondaryImages.push(<img src={images[i].url} alt = 'SecondaryPhotos' className='secondary-image' key={i}></img>)
        }
    }


    return (
        <div className='all-images'>
            <div className='preview-image'>{previewImage}</div>
            <div className='secondary-images'>
                {secondaryImages}
            </div>
        </div>
    )
}

export default SpotImages;
