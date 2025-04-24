// This pinia store contains state with respect to whether a user is logged in 
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { loginUser, logoutUser } from '../api/api' // import API calls
import jwt_decode from 'jwt-decode'; // import JSON Web Token decoder to decode the token into the user's information

//Notifications
const toast = useToast()

// Defining a store
export const useLoggedInUserStore = defineStore({
  id: 'loggedInUser',
  state: () => ({
    name: "",
    role: "",
    isLoggedIn: false,
    token: ""
  }),
  actions: {
    async login(username, password) {
      try {
        const { token, role } = await loginUser(username, password);
        const decodedToken = jwt_decode(token);

        this.$patch({
          isLoggedIn: true,
          role: role || decodedToken.role,
          name: decodedToken.name,
          token: token
        });

        localStorage.setItem('userRole', this.role);
        this.$router.push("/");
        toast.success("Login Successful!");
      } catch (error) {
        toast.error(error.message);
      }
    },
    logout() {
      logoutUser();
      this.$reset();
      localStorage.removeItem('userRole');
      this.$router.push("/login");
      toast.info("You have been logged out!");
    }
  },
  getters: {
    isEditor: (state) => state.role === 'editor',
    isViewer: (state) => state.role === 'viewer'
  }
});
