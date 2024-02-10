import { useContext, useEffect } from "react";
import { useMapBox } from "../hooks/useMapBox"
import { SocketContext } from "../context/SocketContext";

const puntoInicial = { lng: -122.4725, lat: 37.8010, zoom: 13.5 };

export const MapaPage = () => {
    const { socket } = useContext(SocketContext);
    const { coords, setRef, nuevoMarcador$, enMovimiento$, agregarMarcador, actualizarPocicion } = useMapBox(puntoInicial);
    useEffect(() => {
        socket.on('marcadores-activos', (marcadores) => {
            for (const key of Object.keys(marcadores)) {
                agregarMarcador(marcadores[key], key);
            }
        }, [socket, agregarMarcador])
    });
    useEffect(() => {
        nuevoMarcador$.subscribe(marcador => {
            socket.emit('marcador-nuevo', marcador)
        })
    }, [nuevoMarcador$, socket]);

    useEffect(() => {
        enMovimiento$.subscribe(marcador => {
            socket.emit('marcador-actualizado', marcador)
        });
    }, [enMovimiento$, socket]);

    useEffect(()=>{
        socket.on('marcador-actualizado', (marcador)=>{
            actualizarPocicion(marcador);
        })
    },[socket])

    useEffect(() => {
        socket.on('marcador-nuevo', (marcador) => {
            agregarMarcador(marcador, marcador.id);
        })
    }, [socket, agregarMarcador]);
    return (
        <>
            <div className='info'>
                lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
            </div>
            <div ref={setRef} className='mapContainer'>jjj</div>
        </>
    )
}
