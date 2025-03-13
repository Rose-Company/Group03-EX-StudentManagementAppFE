import api from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post("/users/login", {
      email,
      password,
    });

    console.log(response.data);
    if (response.data?.code === 200 && response.data?.token) {
      return {
        user_id: response.data.id,
        email,
        code: response.data.code,
        token: response.data.token,
      };
    } else {
      throw new Error(
        "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập."
      );
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi khi đăng nhập.");
  }
};

// Giả lập hàm login
// export const login = async (username, password) => {
//   const hardcodedUsername = "admin";
//   const hardcodedPassword = "admin";

//   if (username === hardcodedUsername && password === hardcodedPassword) {
//     return {
//       token: "fake-jwt-token",
//       user: {
//         id: 1,
//         username: "admin",
//         role: "admin",
//       },
//       status: 200,
//     };
//   } else {
//     throw new Error("Invalid username or password");
//   }
// };
