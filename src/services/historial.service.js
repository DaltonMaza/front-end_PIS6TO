// services/historialService.js
import axios from 'axios';

const URL = process.env.URL_API;

export const getAllHistorial = async (token) => {
    let headers = {
        headers: {
            "Accept": "application/json",
        }
    }
    if (token !== "NONE") {
        headers = {
            headers: {
                "Accept": "application/json",
                "X-Access-Token": token
            }
        }
    }
    const { data } = await axios.get(`${URL}historial/obtenerAll`, headers);
    return data;
};
