import mapboxgl from 'mapbox-gl'; // Load worker code separately with worker-loader}
import { useEffect, useRef, useState } from 'react';

export const MapaPage = () => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9kcmlnby1qcmxtLTE5ODkiLCJhIjoiY2xzY2NkZXNlMG52NzJocWsyYzZxaHppMSJ9.EXex_vuNsPVxZiK-Upt-LQ';
    const puntoInicial = { lng: -103, lat: 20, zoom: 5 };
    const mapaDiv = useRef();
    const [mapa, setMapa] = useState();
    const [coords, setCoords] = useState(puntoInicial);
    useEffect(() => {
        let map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [puntoInicial.lng, puntoInicial.lat],
            zoom: puntoInicial.zoom
        });
        setMapa(map);
    }, [])

    useEffect(() => {
        mapa?.on('move', () => {
            const { lat, lng } = mapa.getCenter();
            setCoords({ lat:lat.toFixed(4), lng:lng.toFixed(4), zoom:mapa.getZoom().toFixed(4) });
        })
        return () => mapa?.off('move');
    }, [mapa]);
    return (
        <>
            <div className='info'>
                lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
            </div>
            <div ref={mapaDiv} className='mapContainer'>jjj</div>
        </>
    )
}
