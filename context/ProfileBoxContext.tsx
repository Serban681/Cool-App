import { createContext, useState } from "react";

interface ProfileBoxContextProps {
    isProfileBoxOpen: boolean;
    setIsProfileBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileBoxContext = createContext<ProfileBoxContextProps>({isProfileBoxOpen: false, setIsProfileBoxOpen: () => {}});

export const ProfileBoxProvider = ({ children }: { children: React.ReactNode }) => {
    const [isProfileBoxOpen, setIsProfileBoxOpen] = useState<boolean>(false);

    return (
        <ProfileBoxContext.Provider value={{isProfileBoxOpen, setIsProfileBoxOpen}}>
            {children}
        </ProfileBoxContext.Provider>
    )
}
