import useRemoveNavHeader from "@/hooks/useRemoveNavHeader";
import { Link, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { login } from "@/lib/userRequests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BigBtn } from "@/components/Buttons";
import { SectionTitle } from "@/components/SectionTitle";
import { CustomTextInput } from "@/components/CustomFormInput";

type UserCredentials = {
    email: string;
    password: string;
}

export default function() {
    useRemoveNavHeader();

    const router = useRouter();
    
    const { control, formState, getValues } = useForm<UserCredentials>({
        defaultValues: {
          email: "jil.jane@gmail.com",
          password: "Jil123"
        },
        mode: "all",
      });

    const onSubmit = () => {
      login(getValues('email'), getValues('password'))
          .then(async res => await await AsyncStorage.setItem('user', JSON.stringify(res)))
          .then(() => router.replace('/'))
          .catch(async err => await console.log(222, err))
    };
  

    return (
          <View className="flex flex-col justify-center h-full">
            <View className="mx-14">
              <SectionTitle customStyles="mb-5">Login</SectionTitle>
              
                  <CustomTextInput label="Email" control={control} name="email" rules={{ required: true }} />
                  <CustomTextInput label="Password" control={control} name="password" rules={{ required: true }} />
                  <Link className="block mt-[-0.5rem] mb-2 underline font-jo-md text-base" href={'/create-user'}>Don't have an account? Register here!</Link>

                  
                  <BigBtn active={formState.isValid} customStyles="mt-3" handleClick={() => onSubmit()}>Submit</BigBtn>
            </View>
          </View>
    )
}
