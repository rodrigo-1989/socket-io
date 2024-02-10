import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { v4 } from 'uuid';
import { Subject } from 'rxjs';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9kcmlnby1qcmxtLTE5ODkiLCJhIjoiY2xzY2NkZXNlMG52NzJocWsyYzZxaHppMSJ9.EXex_vuNsPVxZiK-Upt-LQ';

export const useMapBox = (puntoInicial) => {
    const mapaDiv = useRef();

    const setRef = useCallback((node) => {
        mapaDiv.current = node;
    }, []);

    //Referencia a los marcadores
    const marcadores = useRef({});

    //Observable
    const enMovimiento = useRef(new Subject());
    const nuevoMarcador = useRef(new Subject());

    //Mapa y coordenadas
    const mapa = useRef();
    const [coords, setCoords] = useState(puntoInicial);

    //Funcion para agregar marcadores

    const agregarMarcador = useCallback((ev, id) => {
        const { lng, lat } = ev.lngLat || ev;
        const marker = new mapboxgl.Marker();
        marker.id = id ?? v4();
        marker
            .setLngLat([lng, lat])
            .addTo(mapa.current)
            .setDraggable(true);
        marcadores.current[marker.id] = marker;
        //Si el marcador tiene ID n oemitir
        if (!id)
            nuevoMarcador.current.next({ id: marker.id, lat, lng });
        marker.on('drag', ({ target }) => {
            const { id } = target;
            const { lng, lat } = target.getLngLat();
            enMovimiento.current.next({ id, lng, lat });

        });
    },[]);

    const actualizarPocicion = useCallback (({id, lng, lat})=>{
        marcadores.current[id].setLngLat([lng, lat]);
    },[])

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [puntoInicial.lng, puntoInicial.lat],
            zoom: puntoInicial.zoom
        });
        mapa.current = map;
    }, [puntoInicial]);

    //Cuando se mueve el mapa
    useEffect(() => {
        mapa.current?.on('move', () => {
            const { lat, lng } = mapa.current.getCenter();
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: mapa.current.getZoom().toFixed(2)
            });
        });
        // return () => mapa?.off('move');
    }, []);

    //Crear marcadores
    useEffect(() => {
        mapa.current?.on('click', agregarMarcador);
    }, [agregarMarcador])
    return {
        agregarMarcador,
        actualizarPocicion,
        coords, marcadores,
        nuevoMarcador$: nuevoMarcador.current,
        enMovimiento$: enMovimiento.current,
        setRef
    }
}
