import { useEffect } from "react";
import { useMapBox } from "../hooks/useMapBox"

const puntoInicial = { lng: -122.4725, lat: 37.8010, zoom: 13.5 };

export const MapaPage = () => {
    const { coords, setRef, nuevoMarcador$, enMovimiento$ } = useMapBox(puntoInicial);
    useEffect(() => {
        nuevoMarcador$.subscribe(marcador => {
        })
    }, [nuevoMarcador$]);
    useEffect(()=>{
        enMovimiento$.subscribe(movimiento =>{
        });
    },[enMovimiento$])
    return (
        <>
            <div className='info'>
                lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
            </div>
            <div ref={setRef} className='mapContainer'>jjj</div>
        </>
    )
}
