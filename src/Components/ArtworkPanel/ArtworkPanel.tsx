import { FunctionComponent, useState, useEffect } from 'react';

export interface ArtworkPanelProps {}

export const ArtworkPanel: FunctionComponent<ArtworkPanelProps> = () => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        getImages();
    }, []);

    const getImages = async () => {
        // TODO add randomness, topics, search
        let url = 'https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&size=20&page=2&fields=id,title,image_id';
        const response = await fetch(url)
        let data = await response.json();
        console.log('API data', data)
        setImages(data.data)
    };

    return (
        <div className="wrapper">
            <div className="image-grid">
            {images.map((item) => {
                let src = 'https://lakeimagesweb.artic.edu/iiif/2/' + item['image_id'] + '/full/!40,40/0/default.jpg';

              return (<img src={src} title={item['title']} alt={item['title']} width="40" height="40" />)
                        })}
            </div>
        </div>
    );

};
