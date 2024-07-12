import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editClient } from "../../services/endpoints/editClient"
import { errorToast, sucessToast } from "../../constants/toasts";

export const useEditClient = (clear: () => void) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: editClient,
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ["clients"],
            });
            const message = data.message
            sucessToast(`${message || "Cliente atualizado com sucesso"}`)
            clear()
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError(error: any) {
            const message = error.response.data.message
            errorToast(`${message || "Erro ao atualizar cliente"}`)
        },
    })
    return mutation;
}