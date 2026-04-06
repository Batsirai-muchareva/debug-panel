import { useData } from '../context/data-context';

export const useHasData = () => {
    const { rawData } = useData();

    return !! rawData;
}
