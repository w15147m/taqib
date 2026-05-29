import axios from 'axios';
import { Alert } from 'react-native';
import { getItem, removeItem } from '../../utils/storage';

export const getHeader = async function () {
    try {
        const authInfo = await getItem('authInfo');
        const tokenData = authInfo?.token || "";
        return {
            Accept: "application/json",
            Authorization: "Bearer " + tokenData,
        };
    } catch (e) {
        console.error('Error fetching headers:', e);
        return {
            Accept: "application/json",
        };
    }
};

export function handleError(e) {
    let code = parseInt(e.response && e.response.status);

    if (code === 401 || code === 403) {
        console.warn("🔐 Session expired or unauthorized (401/403). Cleaning up...");
        removeItem('authInfo');
    } else if (code === 451 && e.response?.data?.resource === "access-denied") {
        Alert.alert("Access Denied", e.response?.data?.message || "You do not have permission to access this resource");
    }
}

export const funcApi = {
    async fetchData(url) {
        try {
            const headers = await getHeader();
            const response = await axios.get(url, { headers });
            return response.data;
        } catch (error) {
            console.error(error);
            handleError(error);
            throw error;
        }
    },

    async post(url, data) {
        try {
            const headers = await getHeader();
            const response = await axios.post(url, data, { headers });
            return response;
        } catch (error) {
            console.error(error);
            handleError(error);
            throw error;
        }
    },

    async put(url, data) {
        try {
            const headers = await getHeader();
            const response = await axios.put(url, data, { headers });
            return response;
        } catch (error) {
            console.error(error);
            handleError(error);
            throw error;
        }
    },

    async deleteFromDb(url, row, list, setList) {
        return new Promise((resolve) => {
            const displayText = row.info || row.title || "this item";

            Alert.alert(
                "Confirmation",
                `Are you sure you want to delete ${displayText}?`,
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                        onPress: () => resolve(false),
                    },
                    {
                        text: "Yes, Delete it!",
                        style: "destructive",
                        onPress: async () => {
                            try {
                                const headers = await getHeader();
                                await axios.delete(url + row.id, { headers });
                                
                                Alert.alert("Success", "Deleted Successfully");
                                
                                if (list && setList) {
                                    const updatedList = list.filter(item => item.id !== row.id);
                                    setList(updatedList);
                                }
                                resolve(true);
                            } catch (error) {
                                console.error(error);
                                Alert.alert("Error", "Something Went Wrong");
                                resolve(false);
                            }
                        }
                    }
                ]
            );
        });
    },

    async destroy(url) {
        try {
            const headers = await getHeader();
            const response = await axios.delete(url, { headers });
            Alert.alert("Success", "Deleted Successfully");
            return response;
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Something Went Wrong");
            return error;
        }
    },

    storeObject(variable, obj) {
        // Warning: AsyncStorage is async in React Native.
        // We preserve these as helpers but recommend async equivalents.
        const { setItem } = require('../../utils/storage');
        setItem(variable, obj);
    },

    async getStoredObject(variable) {
        return await getItem(variable);
    },

    storeString(variable, string) {
        const { setItem } = require('../../utils/storage');
        setItem(variable, string);
    },

    async getStoredString(variable) {
        return await getItem(variable);
    },

    clearStoredString() {
        removeItem('authInfo');
    },
};
