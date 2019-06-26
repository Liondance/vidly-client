import auth from "./auth-service";

export async function registerUser(user) {
  let userInDb = {
    name: user.name,
    email: user.username,
    password: user.password
  };

  await auth.registerUser(userInDb);
}
