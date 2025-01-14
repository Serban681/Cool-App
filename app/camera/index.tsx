import useRemoveNavHeader from '@/hooks/useRemoveNavHeader';
import { CameraCapturedPicture, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import AntDesign from '@expo/vector-icons/AntDesign';
import useGetUser from '@/hooks/useGetUser';
import { updateUser } from '@/lib/userRequests';
import { useRouter } from 'expo-router';

export default function App() {
    useRemoveNavHeader();

    const router = useRouter();
    const { user, setUser } = useGetUser();

    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    const [photoTaken, setPhotoTaken] = useState(false);
    const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);

    if (!permission) {
        return <View />;
    }

    if(!permission.granted) {
        requestPermission();
    }

    const takePhoto = async () => {
        await cameraRef.current?.takePictureAsync({ quality: 0.2, base64: true }).then((_photo) => setPhoto(_photo!));

        setPhotoTaken(true);
    }

    const uploadPhoto = async () => {
        const form = new FormData()
        form.append('image', photo?.base64?.toString()!);

        fetch('https://api.imgbb.com/1/upload?key=beaccd33cd2927f45cb243dc430dc60e', {
            method: 'POST',
            body: form
        })
        .then(response => response.json())
        .then(image => {
            updateUser({ ...user, profileImageUrl: image.data.display_url }).then(res => {
                setUser(res);
                router.replace('/profile');
            })
        })
        .catch((error) => console.log(error));
    }

    if(!photoTaken) {
        return (
            <View style={styles.container}>
                <CameraView ref={cameraRef} style={styles.camera} facing="front">
                    <View className='absolute top-3 left-2'>
                        <TouchableOpacity onPress={() => router.replace('/profile')}>
                            <Ionicons name="chevron-back" size={35} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => takePhoto()}>
                            <Ionicons name="camera" size={50} color="white" />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
        );
    }

    return (
        <View>
            <Image
                source={{ uri: photo?.uri }} 
                className='w-full h-full'
                alt="Taken Picture"
            />
            <View className='absolute bottom-10 left-1/4'>
                <TouchableOpacity style={styles.button} onPress={() => uploadPhoto()}>
                    <AntDesign name="check" size={50} color="white" />
                </TouchableOpacity>
            </View>
            <View className='absolute bottom-10 right-1/4'>
                <TouchableOpacity style={styles.button} onPress={() => setPhotoTaken(false)}>
                    <AntDesign name="close" size={50} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative'
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    }
});
