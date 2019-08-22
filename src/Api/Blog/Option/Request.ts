import axios, {AxiosResponse} from 'axios';
import {GET_ABOUT, SET_ABOUT} from './ROUTE';
import {Response} from '../../../Class';
import {message} from 'antd';

export async function getAbout(): Promise<string | null>
{
    const {data: {isSuccessful, message: msg, data}}: AxiosResponse<Response<string>> = await axios.get(GET_ABOUT,
        {params: {_t: Date.now()}});
    if (isSuccessful)
    {
        return data!;
    }
    else
    {
        message.warning(msg);
        return null;
    }
}

export async function setAbout(about: string): Promise<true | null>
{
    const {data: {isSuccessful, message: msg}}: AxiosResponse<Response<void>> = await axios.post(SET_ABOUT, about);
    if (isSuccessful)
    {
        return true;
    }
    else
    {
        message.warning(msg);
        return null;
    }
}