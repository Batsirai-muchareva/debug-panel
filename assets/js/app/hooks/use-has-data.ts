import { useProvider } from "@app/hooks/use-provider";

export const useHasData = () => {
    const { data } = useProvider();

    return !! data;
}
