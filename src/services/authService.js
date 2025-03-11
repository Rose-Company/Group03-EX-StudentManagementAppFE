// import api from "./api";

// export const login = async (username, password) => {
//   try {
//     const response = await api.post("/api/login", {
//       username,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// Giả lập hàm login
export const login = async (username, password) => {
  const hardcodedUsername = "admin";
  const hardcodedPassword = "admin";

  if (username === hardcodedUsername && password === hardcodedPassword) {
    return {
      token: "fake-jwt-token",
      user: {
        id: 1,
        username: "admin",
        role: "admin",
      },
    };
  } else {
    throw new Error("Invalid username or password");
  }
};
