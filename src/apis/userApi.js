import axiosInstance from "./axios";

const prefix = "/api/nanuri/auth";

export const login = async (hisnetToken) => {
  try {
    console.log("Hisnet Token : ", hisnetToken);

    const response = await axiosInstance.post(
      `${prefix}/login`,
      { hisnetToken: hisnetToken } // 토큰을 요청의 본문에 담아 보냅니다.
    );

    const token = response.data.token;
    const userId = response.data.userId;
    const userName = response.data.userName;
    const department = response.data.department;
    const nickname = response.data.nickname;
    const user = { userId, nickname };

    console.log("토큰 보내기 성공");

    return user;
  } catch (error) {
    console.log("토큰 보내기 실패");
    throw error;
  }
};
