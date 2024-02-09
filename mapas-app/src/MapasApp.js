
import { SocketContext } from './context/SocketContext'
import { MapaPage } from './pages/MapaPage'

export const MapasApp = () => {
  return (
    <SocketContext.Provider>
      <MapaPage /> 
    </SocketContext.Provider>
  )
}
