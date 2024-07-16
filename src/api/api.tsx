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

    const fetchPrices = async ({ ids }: { ids: string }) => {
        try {
            const response = await axios.get(COINGECKO, {
                params: {
                    ids: ids,
                    vs_currencies: 'usd',
                },
            });
            return response.data
        } catch (error) {
            console.error('Error fetching prices:', error);
            throw error;
        }
    };


    return {
        getRelayStatus,
        fetchPrices
    };
};

export default useAPI;
