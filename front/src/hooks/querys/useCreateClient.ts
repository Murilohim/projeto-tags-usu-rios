import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClientsWithTags } from "../../services/endpoints/createClientsWithTags";
import { errorToast, sucessToast } from "../../constants/toasts";

export const useCreateClient = (clearForm: () => void) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createClientsWithTags,
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ["clients"],
            });
            const message = data.data.message
            sucessToast(`${message || "Cliente cadastrado com sucesso"}`)
            clearForm()
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError(error: any) {
            const message = error.response.data.message
            errorToast(`${message || "Erro ao cadastrar cliente"}`)
        },
    })
    return mutation;
}