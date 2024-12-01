import { BigBtn } from "@/components/Buttons";
import { CustomTextInput } from "@/components/CustomFormInput";
import { SectionTitle } from "@/components/SectionTitle";
import useRemoveNavHeader from "@/hooks/useRemoveNavHeader";
import { addUser } from "@/lib/userRequests";
import { Address } from "@/models/Address";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { Link, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

export default function() {
    useRemoveNavHeader();

    const router = useRouter();

    const [step, setStep] = useState(0);

    //const {notifierState, setNotifierState } = useContext(ShopContext)!;

    const { register, handleSubmit, control, formState, getValues, setValue } = useForm<{
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        password: string,
        passwordConfirm: string,
        defaultDeliveryAddress: Address
        defaultBillingAddress: Address
    }>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            passwordConfirm: '',
            defaultDeliveryAddress: {
                streetLine: '',
                postalCode: '',
                city: '',
                county: '',
                country: ''
            },
            defaultBillingAddress: {
                streetLine: '',
                postalCode: '',
                city: '',
                county: '',
                country: ''
            }
        },
        mode: 'all'
    });

    const [useAddressForBilling, setUseAddressForBilling] = useState(false);

    const goToPrevStep = () => {
        setStep(step - 1);
    }

    const goToNextStep = () => {
        setStep(step + 1);
    }

    const toggleUseSameAddressForBilling = (useSameAddress: boolean) => {
        setUseAddressForBilling(useSameAddress);

        if(useSameAddress === true) {
            setValue("defaultBillingAddress", getValues("defaultDeliveryAddress"));
        }
    }

    useEffect(() => {
        if(useAddressForBilling) {
            setValue("defaultBillingAddress", getValues("defaultDeliveryAddress"));
        }
    }, [getValues("defaultDeliveryAddress")])

    const onSubmit = handleSubmit(async (data) => {
        addUser(data)
            .then(async res => await await AsyncStorage.setItem('user', JSON.stringify(res)))
            .then(() => router.replace('/'))
            .catch(async err => await console.log(222, err))
    });

    const getSectionTitleInfo = () => {
        if(step === 0) {
            return "Personal Information";
        } else if(step === 1) {
            return "Delivery Address";
        } else if(step === 2) {
            return "Billing Address";
        }
    }

    return (
        <View className="flex flex-col justify-center h-full">
            <View className="mx-14">  
                <SectionTitle customStyles="mb-5" pinkStyles={getSectionTitleInfo() === "Personal Information" ? "h-14" : ""}>Register {getSectionTitleInfo()}</SectionTitle>

                {/* <UserRegisterForm /> */}    
                <View>
                    {(step === 0) && (
                        <>
                            <CustomTextInput label="First name" control={control} name="firstName" rules={{ required: true }} />
                            <CustomTextInput label="Last name" control={control} name="lastName" rules={{ required: true }} />
                            <CustomTextInput label="Email" control={control} name="email" rules={{ required: true }} />
                            <CustomTextInput label="Phone number" control={control} name="phoneNumber" rules={{ required: true }} />
                            <CustomTextInput label="Password" control={control} name="password" rules={{ required: true }} />
                            <CustomTextInput label="Confirm password" control={control} name="passwordConfirm" rules={{ required: true }} />

                            <Link className="block mt-[-0.5rem] mb-2 font-jo-md underline text-base" href={'/login'}>Already have an account? Log in here!</Link>
                            <BigBtn customStyles="mt-4" handleClick={goToNextStep}>Next</BigBtn>
                        </>
                    )}

                    {(step === 1) && (
                        <>
                            <CustomTextInput label="Street Line" control={control} name="defaultDeliveryAddress.streetLine" rules={{ required: true }} />
                            <CustomTextInput label="Postal Code" control={control} name="defaultDeliveryAddress.postalCode" rules={{ required: true }} />
                            <CustomTextInput label="City" control={control} name="defaultDeliveryAddress.city" rules={{ required: true }} />
                            <CustomTextInput label="County" control={control} name="defaultDeliveryAddress.county" rules={{ required: true }} />
                            <CustomTextInput label="Country" control={control} name="defaultDeliveryAddress.country" rules={{ required: true }} />

                            <View className="flex flex-row justify-start items-center">
                                <Text className="inline-block font-jo-md my-2 -translate-y-1 text-lg">
                                    Use same address for billing:
                                </Text>
                                <Checkbox className="ml-2 w-4 h-4 inline" value={useAddressForBilling} onValueChange={(e) => toggleUseSameAddressForBilling(e)} />
                            </View>
                            

                            <BigBtn customStyles="mt-4" handleClick={goToPrevStep}>Prev</BigBtn>
                            {useAddressForBilling ? 
                                <BigBtn handleClick={() => onSubmit()} customStyles="mt-4" active={formState.isValid && getValues("password") == getValues("passwordConfirm")}>Submit</BigBtn> 
                                : 
                                <BigBtn customStyles="mt-4" handleClick={goToNextStep}>Next</BigBtn>}
                        </>
                    )}

                    {(step == 2) && (
                        <>
                            <CustomTextInput label="Street Line" control={control} name="defaultBillingAddress.streetLine" rules={{ required: true }} />
                            <CustomTextInput label="Postal Code" control={control} name="defaultBillingAddress.postalCode" rules={{ required: true }} />
                            <CustomTextInput label="City" control={control} name="defaultBillingAddress.city" rules={{ required: true }} />
                            <CustomTextInput label="County" control={control} name="defaultBillingAddress.county" rules={{ required: true }} />
                            <CustomTextInput label="Country" control={control} name="defaultBillingAddress.country" rules={{ required: true }} />
                        
                            <BigBtn customStyles="mt-4" handleClick={goToPrevStep}>Prev</BigBtn>
                            <BigBtn customStyles="mt-4" handleClick={() => onSubmit()} active={formState.isValid && getValues("password") == getValues("passwordConfirm")}>Submit</BigBtn>
                        </>
                    )}
                </View>
            </View>
        </View>           
    )
}
