import {axiosService} from "./axios.service";

import {urls} from '../constants';

export const userService = {
    create: (user) => axiosService.post(`${urls.auth}/registration`, user ),
    getByEmail: (email) => axiosService.get(`${urls.users}/${email}`),
    getAll: () => axiosService.get(urls.users)
}