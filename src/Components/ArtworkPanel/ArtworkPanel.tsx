import { FunctionComponent, useState, useEffect } from 'react';
import { ImageDescriptor } from '../../Store/artworks/artworks.types';
import { OpenSeadragon } from 'use-open-seadragon';
import { useDispatch } from 'react-redux';
import { setActiveArtworkAction } from '../../Store/artworks';
import { addArtworkToLightboxAction } from '../../Store/artworks';
import { v4 as uuidv4 } from 'uuid';
import './ArtworkPanel.css';

export interface ArtworkPanelProps {}

export const ArtworkPanel: FunctionComponent<ArtworkPanelProps> = () => {
  const dispatch = useDispatch();

  const imageClickHandler = (item: any) => {
    // define initial crop as full width or height
    let thumb = item['thumbnail'];
    let edge = thumb['height'];
    if (thumb['height'] > thumb['width']) {
      // console.log('portrait');
      edge = thumb['width'];
    }
    let crop = new OpenSeadragon.Rect(0, 0, edge, edge);
    let squaresrc =
      'https://lakeimagesweb.artic.edu/iiif/2/' +
      item['image_id'] +
      '/0,0,' +
      edge +
      ',' +
      edge +
      '/!200,200/0/default.jpg';

    const artwork: ImageDescriptor = {
      imageUrl: squaresrc,
      uuid: uuidv4(),
      caption: item['title'] + ', ' + item['artist_display'],
      tileSource: `https://lakeimagesweb.artic.edu/iiif/2/${item['image_id']}/info.json`,
      objectID: item['id'],
      crop: crop,
    };

    dispatch(addArtworkToLightboxAction(artwork));
    dispatch(setActiveArtworkAction(artwork));
  };

  const perPage = 40;
  // TODO query the exact number, but for now hardcode public domain images as 55k
  // let max = Math.floor(55000 / perPage);
  // Nope. AIC doesn't like page and size values that multiply to over 10000. E.g.
  // https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&size=20&page=501&fields=id,title,image_id
  const max = 1000 / perPage;

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

  const searchHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setpageNo(1);
    getImages();
  };

  const getRandomSearch = () => {
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
      'frog',
      'coin',
      'horse',
    ];
    setQuery(terms[Math.floor(Math.random() * terms.length)]);
    setpageNo(1);
    getImages();
  };

  const getImages = async () => {
    let extra = '';
    if (query !== '') {
      extra = 'q=' + query + '&';
    }

    let url =
      'https://api.artic.edu/api/v1/artworks/search?' +
      extra +
      'query[term][is_public_domain]=true&size=' +
      perPage +
      '&page=' +
      pageNo +
      '&fields=id,title,image_id,artist_display,thumbnail.width,thumbnail.height';
    const response = await fetch(url);
    let data = await response.json();

    // console.log('API data', data)
    if (images.length === 0) {
      // set first three images as sample data
      imageClickHandler(data.data[0]);
      imageClickHandler(data.data[1]);
      imageClickHandler(data.data[2]);
    }
    setImages(data.data);
  };

  return (
    <div className="wrapper stack">
      <div className="button-group">
        <button onClick={getRandomImages}>Random images!</button>
        <button onClick={getRandomSearch}>Random search!</button>
      </div>
      <form onSubmit={searchHandler}>
        <input aria-label="Search" name="search" type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <input type="submit" value="Search" />
      </form>
      <div className="image-grid">
        {images.map((item) => {
          let src = 'https://lakeimagesweb.artic.edu/iiif/2/' + item['image_id'] + '/full/!200,200/0/default.jpg';

          return (
            <img
              className="artwork-preview"
              src={src}
              title={item['title'] + ', ' + item['artist_display']}
              alt={item['title']}
              key={src}
              onClick={() => imageClickHandler(item)}
            />
          );
        })}
      </div>
    </div>
  );
};
