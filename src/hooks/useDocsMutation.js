import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDocsMutation = (mutationFn) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries("detail_document");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { mutate, ...rest };
};

export default useDocsMutation;
