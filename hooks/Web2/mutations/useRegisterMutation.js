import { useMutation, useQueryClient } from "react-query";
import http from "../../../utils/http";

const loginData = (data) => {
    return http.post('/auth/register_wallet', data);
};
export const useRegisterMutation = () => {
    return useMutation(loginData, {
        onSuccess: () => { },
        onSettled: () => {
        },
    });
};
