import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/services/mypage";

export const useUserInfo = (isLogin) => {
  const { data: nickName } = useQuery(["member_info"], getUserInfo, {
    staleTime: Infinity,
    enabled: isLogin,
    select: (data) => data?.data?.response.nickName,
  });

  return nickName;
};
