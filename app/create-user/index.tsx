import { BigBtn } from "@/components/Buttons";
import { CustomTextInput } from "@/components/CustomTextInput";
import { SectionTitle } from "@/components/SectionTitle";
import useRemoveNavHeader from "@/hooks/useRemoveNavHeader";
import { addUser } from "@/lib/userRequests";
import { Address } from "@/models/Address";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { Link, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Image, ScrollView, Text, View } from "react-native";
import { RadioButton } from 'react-native-paper';

import * as Location from 'expo-location';

export default function() {
    useRemoveNavHeader();

    const router = useRouter();

    const [step, setStep] = useState(0);

    const [firstName, setFirstName] = useState('Adam');
    const [lastName, setLastName] = useState('Smith');
    const [email, setEmail] = useState('adam@gmail.com');
    const [phoneNumber, setPhoneNumber] = useState('028192323');
    const [gender, setGender] = useState('NOT_MENTIONED');
    const [age, setAge] = useState('0');

    const [password, setPassword] = useState('123');
    const [passwordConfirm, setPasswordConfirm] = useState('123');

    const [defaultDeliveryAddressStreetLine, setDefaultDeliveryAddressStreetLine] = useState('Main Street');
    const [defaultDeliveryAddressPostalCode, setDefaultDeliveryAddressPostalCode] = useState('000000');
    const [defaultDeliveryAddressCity, setDefaultDeliveryAddressCity] = useState('NYC');
    const [defaultDeliveryAddressCounty, setDefaultDeliveryAddressCounty] = useState('NY');
    const [defaultDeliveryAddressCountry, setDefaultDeliveryAddressCountry] = useState('USA');

    const [defaultBillingAddressStreetLine, setDefaultBillingAddressStreetLine] = useState('Main Street');
    const [defaultBillingAddressPostalCode, setDefaultBillingAddressPostalCode] = useState('000000');
    const [defaultBillingAddressCity, setDefaultBillingAddressCity] = useState('NYC');
    const [defaultBillingAddressCounty, setDefaultBillingAddressCounty] = useState('NY');
    const [defaultBillingAddressCountry, setDefaultBillingAddressCountry] = useState('USA');

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
            setDefaultBillingAddressStreetLine(defaultDeliveryAddressStreetLine);
            setDefaultBillingAddressPostalCode(defaultDeliveryAddressPostalCode);
            setDefaultBillingAddressCity(defaultDeliveryAddressCity);
            setDefaultBillingAddressCounty(defaultDeliveryAddressCounty);
            setDefaultBillingAddressCountry(defaultDeliveryAddressCountry);
        }
    }

    useEffect(() => {
        if(useAddressForBilling) {
            setDefaultBillingAddressStreetLine(defaultDeliveryAddressStreetLine);
            setDefaultBillingAddressPostalCode(defaultDeliveryAddressPostalCode);
            setDefaultBillingAddressCity(defaultDeliveryAddressCity);
            setDefaultBillingAddressCounty(defaultDeliveryAddressCounty);
            setDefaultBillingAddressCountry(defaultDeliveryAddressCountry);
        }
    }, [defaultDeliveryAddressStreetLine, defaultDeliveryAddressPostalCode, defaultDeliveryAddressCity, defaultDeliveryAddressCounty, defaultDeliveryAddressCountry])

    const isFormValid = () => {
        return password === passwordConfirm && 
            firstName !== '' && 
            lastName !== '' && 
            email !== '' && 
            phoneNumber !== '' && 
            password !== '' && 
            gender !== '' &&
            age !== '' &&
            defaultDeliveryAddressStreetLine !== '' && 
            defaultDeliveryAddressPostalCode !== '' && 
            defaultDeliveryAddressCity !== '' && 
            defaultDeliveryAddressCounty !== '' && 
            defaultDeliveryAddressCountry !== '' && 
            defaultBillingAddressStreetLine !== '' && 
            defaultBillingAddressPostalCode !== '' && 
            defaultBillingAddressCity !== '' && 
            defaultBillingAddressCounty !== '' && 
            defaultBillingAddressCountry !== '';
    }

    const onSubmit = (async () => {
        const userData ={
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            gender: gender,
            age: age,
            defaultDeliveryAddress: {
                streetLine: defaultDeliveryAddressStreetLine, 
                postalCode: defaultDeliveryAddressPostalCode, 
                city: defaultDeliveryAddressCity, 
                county: defaultDeliveryAddressCounty, 
                country: defaultDeliveryAddressCountry
            },
            defaultBillingAddress: {
                streetLine: defaultBillingAddressStreetLine,
                postalCode: defaultBillingAddressPostalCode,
                city: defaultBillingAddressCity,
                county: defaultBillingAddressCounty,
                country: defaultBillingAddressCountry
            }
        };

        addUser(userData)
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

    async function getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if(status !== 'granted') {
            return;
        }

        let location = await Location.getCurrentPositionAsync({});

        const [geocodedAddress] = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        setDefaultDeliveryAddressStreetLine(geocodedAddress.street ? geocodedAddress.street : '');
        setDefaultDeliveryAddressPostalCode(geocodedAddress.postalCode ? geocodedAddress.postalCode : '');
        setDefaultDeliveryAddressCity(geocodedAddress.city ? geocodedAddress.city : '');
        setDefaultDeliveryAddressCounty(geocodedAddress.region ? geocodedAddress.region : '');
        setDefaultDeliveryAddressCountry(geocodedAddress.country ? geocodedAddress.country : '');
    }

    return (
        <ScrollView>
            <View className="flex flex-col justify-center h-full">
                <View className="mx-14">  
                    <SectionTitle customStyles="my-5" pinkStyles={getSectionTitleInfo() === "Personal Information" ? "h-14" : ""}>Register {getSectionTitleInfo()}</SectionTitle>

                    <View className="mb-5">
                        <View className={`${step === 0 ? 'block' : 'hidden'}`}>
                            <CustomTextInput label="First name" value={firstName} setValue={setFirstName} />
                            <CustomTextInput label="Last name" value={lastName} setValue={setLastName} />
                            <CustomTextInput label="Email" value={email} setValue={setEmail} />
                            <CustomTextInput label="Phone number" value={phoneNumber} setValue={setPhoneNumber} />
                            <CustomTextInput label="Password" value={password} setValue={setPassword} />
                            <CustomTextInput label="Confirm password" value={passwordConfirm} setValue={setPasswordConfirm} />

                            <Text className="font-jo-md text-xl">Gender:</Text>
                            <View className="flex flex-row -ml-2">
                                <View className="flex flex-row items-center">
                                    <RadioButton 
                                        value="NOT_MENTIONED"
                                        status={ gender === 'NOT_MENTIONED' ? 'checked' : 'unchecked' }
                                        onPress={() => setGender('NOT_MENTIONED')}
                                    />
                                    <Text className="text-black font-jo-li">Prefer Not To Say</Text>
                                </View>

                                <View className="flex flex-row items-center">
                                    <RadioButton 
                                        value="MALE"
                                        status={ gender === 'MALE' ? 'checked' : 'unchecked' }
                                        onPress={() => setGender('MALE')}
                                    />
                                    <Text className="text-black font-jo-li">Male</Text>
                                </View>

                                <View className="flex flex-row items-center">
                                    <RadioButton 
                                        value="FEMALE"
                                        status={ gender === 'FEMALE' ? 'checked' : 'unchecked' }
                                        onPress={() => setGender('FEMALE')}
                                    />
                                    <Text className="text-black font-jo-li">Female</Text>
                                </View>        
                            </View>

                            <CustomTextInput label="Age" value={age} setValue={setAge} />

                            <Link className="block mb-2 font-jo-md underline text-base" href={'/login'}>Already have an account? Log in here!</Link>
                            <BigBtn customStyles="mt-4" handleClick={() => goToNextStep()}>Next</BigBtn>
                        </View>

                        <View className={`${step === 1 ? 'block' : 'hidden'}`}>
                            {/* <BigBtn handleClick={() => getCurrentLocation()}>get location</BigBtn> */}
                            

                            <CustomTextInput label="Street Line" value={defaultDeliveryAddressStreetLine} setValue={setDefaultDeliveryAddressStreetLine} />
                            <CustomTextInput label="Postal Code" value={defaultDeliveryAddressPostalCode} setValue={setDefaultDeliveryAddressPostalCode} />
                            <CustomTextInput label="City" value={defaultDeliveryAddressCity} setValue={setDefaultDeliveryAddressCity} />
                            <CustomTextInput label="County" value={defaultDeliveryAddressCounty} setValue={setDefaultDeliveryAddressCounty} />
                            <CustomTextInput label="Country" value={defaultDeliveryAddressCountry} setValue={setDefaultDeliveryAddressCountry} />
                            
                            <View className="flex flex-row">
                                <Text className="font-jo-md my-2text-lg">
                                    Use same address for billing:
                                </Text>

                                <Checkbox className="ml-2 w-4 h-4" value={useAddressForBilling} onValueChange={(e) => toggleUseSameAddressForBilling(e)} />
                            </View>
                        
                            
                            <BigBtn 
                                customStyles="bg-white border-2 border-solid border-black mt-4"
                                handleClick={() => getCurrentLocation()}
                            >
                                <View className="flex flex-row">
                                    <Image
                                        source={{ uri: 'data:image/png;base64,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' }}
                                        className="w-4 h-6"
                                        alt="location button"
                                    />
                                    <Text className="font-jo-md ml-3 text-black">Use my current location</Text>
                                </View>
                            </BigBtn>

                            <BigBtn customStyles="mt-4" handleClick={goToPrevStep}>Prev</BigBtn>
                            {useAddressForBilling ? 
                                <BigBtn handleClick={() => onSubmit()} active={isFormValid()} customStyles="mt-4">Submit</BigBtn> 
                                : 
                                <BigBtn customStyles="mt-4" handleClick={goToNextStep}>Next</BigBtn>}
                        </View>

                        <View className={`${step === 2 ? 'block' : 'hidden'}`}>
                            <CustomTextInput label="Street Line" value={defaultBillingAddressStreetLine} setValue={setDefaultBillingAddressStreetLine} />
                            <CustomTextInput label="Postal Code" value={defaultBillingAddressPostalCode} setValue={setDefaultBillingAddressPostalCode} />
                            <CustomTextInput label="City" value={defaultBillingAddressCity} setValue={setDefaultBillingAddressCity} />
                            <CustomTextInput label="County" value={defaultBillingAddressCounty} setValue={setDefaultBillingAddressCounty} />
                            <CustomTextInput label="Country" value={defaultBillingAddressCountry} setValue={setDefaultBillingAddressCountry} />
                            
                            <BigBtn customStyles="mt-4" handleClick={goToPrevStep}>Prev</BigBtn>
                            <BigBtn customStyles="mt-4" handleClick={() => onSubmit()} active={isFormValid()}>Submit</BigBtn>
                        </View>
                    </View>
                </View>
            </View>  
        </ScrollView>         
    )
}
