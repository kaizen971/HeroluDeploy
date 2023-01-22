import {createClient} from '@google/maps';

export async function searchPlacesByLongitudeLatitude(req,res) {

const googleMapsClient = createClient({
    key: 'AIzaSyC6EPImRibZZN3ZFYx1UTbBmlXItxfMmRo'
  });
  const location = {lat: 48.8220039, lng: 2.2063244};

  const types = ['grocery_or_supermarket','health'];
let allResults = [];
  

const searchPlace = (type, index) => {
    googleMapsClient.placesNearby({
          location: location,
          radius: 20000,
          type: type
      }, (err, response) => {
        if (!err) {
            allResults = [...allResults, ...response.json.results];
            if (index < types.length - 1) {
                searchPlace(types[index + 1], index + 1);
            } else {
                const filteredResults = allResults.filter(result => {
                    return result.types.includes('grocery_or_supermarket') && result.types.includes('health');;
                });
                return  res.status(200).json(filteredResults)
            }
        }
      });
    }

    searchPlace(types[0], 0);


}