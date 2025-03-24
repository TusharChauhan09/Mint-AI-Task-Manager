import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const authStore = create((set) => ({
  isLoading: false,
  isSignedIn: false,
  isSignedUp: false,
  authUser: null,

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/check");
      set({ authUser: res.data.user });
      return true;
    } catch (error) {
      set({ authUser: null });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  signin: async (data) => {
    set({ isSignedIn: true });
    try {
      const res = await axiosInstance.post("/login", data);
      set({ authUser: res.data.user });
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign in failed");
      return false;
    } finally {
      set({ isSignedIn: false });
    }
  },

  signup: async (data) => {
    set({ isSignedUp: true });
    try {
      const res = await axiosInstance.post("/signup", data);
      set({ authUser: res.data.user });
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign up failed");
      return false;
    } finally {
      set({ isSignedUp: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/logout");
      set({ authUser: null });
      toast.success("Successfully Loged Out");
    } catch (error) {
      toast.error("failed to logout");
    }
  },
}));
