import { FunctionComponent, useState, useEffect } from 'react';

export interface ArtworkPanelProps {}

export const ArtworkPanel: FunctionComponent<ArtworkPanelProps> = () => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        getImages();
    }, []);

    const getImages = async () => {
        let perPage = 40;
        // TODO query the exact number, but for now hardcode public domain images as 55k
        // let max = Math.floor(55000 / perPage);
        // Nope. AIC doesn't like page and size values that multiply to over 10000. E.g.
        // https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&size=20&page=501&fields=id,title,image_id
        let max = 1000/ perPage;

        let pageNo = Math.floor(Math.random() * max);
        // TODO add topics, search

        let url = 'https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&size=' + perPage + '&page=' + pageNo + '&fields=id,title,image_id';
        const response = await fetch(url)
        let data = await response.json();
        console.log('Geting ' + perPage + ' results at page ' +pageNo)
        // console.log('API data', data)
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
