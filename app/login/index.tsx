import useRemoveNavHeader from "@/hooks/useRemoveNavHeader";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, View } from "react-native";
import { login } from "@/lib/userRequests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BigBtn } from "@/components/Buttons";
import { SectionTitle } from "@/components/SectionTitle";
import { CustomTextInput } from "@/components/CustomTextInput";
import { useState } from "react";
import ErrorNotifier from "@/components/ErrorNotifier";

type UserCredentials = {
    email: string;
    password: string;
}

export default function() {
    useRemoveNavHeader();

    const router = useRouter();
    
    const [email, setEmail] = useState('jil.jane@gmail.com');
    const [password, setPassword] = useState('Jil123');

    const [errMessage, setErrMessage] = useState('')

    const onSubmit = () => {
      login(email, password)
          .then(async res => await await AsyncStorage.setItem('user', JSON.stringify(res)))
          .then(() => router.replace('/'))
          .catch(async err => console.log(err))
    };
  

    return (
          <View className="flex flex-col justify-center h-full">
            <View className="mx-14">
              <SectionTitle customStyles="mb-5">Login</SectionTitle>
                  
                  <CustomTextInput label="Email" value={email} setValue={setEmail} />
                  <CustomTextInput label="Password" value={password} setValue={setPassword} />
                  <Link className="block mt-[-0.5rem] mb-2 underline font-jo-md text-base" href={'/create-user'}>Don't have an account? Register here!</Link>

                  
                  <BigBtn customStyles="mt-3" handleClick={() => onSubmit()}>Submit</BigBtn>
            </View>
          </View>
    )
}
