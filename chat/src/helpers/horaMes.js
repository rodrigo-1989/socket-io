import moment from "moment";

export const horaMes = (fecha)=>{
    moment.locale('es');
    const hoyMes= moment(fecha);
    return hoyMes.format('HH:mm a | MMMM Do');
}