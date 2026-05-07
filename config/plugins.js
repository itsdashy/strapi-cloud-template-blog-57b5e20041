module.exports = () => ({
	"google-map-picker": {
        config: {
        apiKey: "AIzaSyCZCnDWlrrmggL-HccXWpXDMHxlT6OhEVc", // required
        default_center: { lat: 54.106438, lng: 11.556940 }, // required
        /*
        favorites_places: [
            {
            title: "Berlin",
            coordinates: { lat: 52.518536, lng: 52.518536 },
            },
            {
            title: "Zurich",
            coordinates: { lat: 47.384168, lng: 8.526831 },
            },
            {
            title: "Oslo",
            coordinates: { lat: 59.911002, lng: 10.756167},
            },
        ],
        */
        },
    },
    'google-maps-tonik': {
      enabled: true,
      resolve: './src/plugins/google-maps-tonik'
    },
});
