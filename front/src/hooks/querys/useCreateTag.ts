import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTag } from "../../services/endpoints/createTag";
import { errorToast, sucessToast } from "../../constants/toasts";

export const useCreateTag = (clear: (arg: string) => void) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createTag,
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ["tag"],
            });
            const message = data.message
            sucessToast(`${message || "Tag cadastrada com sucesso"}`)
            clear('')
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError(error: any) {
            const message = error.response.data.message
            errorToast(`${message || "Erro ao cadastrar tag"}`)
        },
    })
    return mutation;
}