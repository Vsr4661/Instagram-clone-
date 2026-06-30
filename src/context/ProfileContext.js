import { createContext, useState } from "react";

export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    name: "Vaibhav Singh",
    username: "vaibhavsingh",
    bio: "React Native Developer 🚀",
  });

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}