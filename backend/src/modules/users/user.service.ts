import { getAllUsers, insertUser } from "../../database/app";
import { UserModel } from "../../models/UserModel";

export class UserService {
   addUser = (user: UserModel) => {
      try {
        insertUser(user);
      } catch (error) {
        // TODO: Handle errors
        console.error("something went wrong whiles adding user");
      }
    };
  
    fetchUsers = () => {
      try {
        const response = getAllUsers();
        return response;
      } catch (error) {
        // TODO: Handle errors
        console.error("something went wrong whiles fetching all users");
      }
    };
}