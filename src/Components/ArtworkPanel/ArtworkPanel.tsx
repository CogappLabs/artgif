import { FunctionComponent, useState, useEffect } from 'react';

export interface ArtworkPanelProps {}

export const ArtworkPanel: FunctionComponent<ArtworkPanelProps> = () => {

    const perPage = 40;
    // TODO query the exact number, but for now hardcode public domain images as 55k
    // let max = Math.floor(55000 / perPage);
    // Nope. AIC doesn't like page and size values that multiply to over 10000. E.g.
    // https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&size=20&page=501&fields=id,title,image_id
    const max = 1000/ perPage;

    const [images, setImages] = useState([]);
    const [query, setQuery] = useState('');
    const [pageNo, setpageNo] = useState(Math.floor(Math.random() * max));

    useEffect(() => {
        getImages();
    }, []);

    const getRandomImages = async () => {
        setQuery('');
        setpageNo(Math.floor(Math.random() * max));
        getImages();

    };

    const getRandomSearch = async () => {

        let terms = [
            'joy',
            'yellow',
            'earth',
            'bed',
            'sculpture',
            'orchard',
            'prayer',
            'shadow',
            'flower',
            'levitation',
            'disguise',
            'pole',
            'dog',
            'chest',
            'boat',
            'angel',
            'fruit',
            'war',
            'mask',
            'bag',
            'cottage',
            'frog'
        ]
        setQuery(terms[Math.floor(Math.random() * terms.length)]);
        setpageNo(1);
        getImages();

    };

    const getImages = async () => {

        let extra = '';
        if (query !== '') {
            extra = 'q=' + query + '&'
        }

        let url = 'https://api.artic.edu/api/v1/artworks/search?' + extra + 'query[term][is_public_domain]=true&size=' + perPage + '&page=' + pageNo + '&fields=id,title,image_id';
        const response = await fetch(url)
        let data = await response.json();
        console.log('Geting ' + perPage + ' results ' + 'for query ' + query + ' at page ' + pageNo)
        // console.log('API data', data)
        setImages(data.data)
    };

    return (
        <div className="wrapper">
            <button onClick={getRandomImages}>Random images!</button>
            <button onClick={getRandomSearch}>Random search!</button>
            <label>
                <input type="text" value={query} />
            </label>
            <div className="image-grid">
            {images.map((item) => {
                let src = 'https://lakeimagesweb.artic.edu/iiif/2/' + item['image_id'] + '/full/!40,40/0/default.jpg';

              return (<img src={src} title={item['title']} alt={item['title']} key={src} width="40" height="40" />)
                        })}
            </div>
        </div>
    );

};
