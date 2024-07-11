import { API_URL, COINGECKO } from "@/consts/urls";
import axios from "axios";

const useAPI = () => {
    const getRelayStatus = async () => {
        try {
            const res = await axios.get(`${API_URL}/relayers`);
            return res.data.result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return {
        getRelayStatus,
    };
};

export default useAPI;
