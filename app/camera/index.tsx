import useRemoveNavHeader from '@/hooks/useRemoveNavHeader';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function App() {
    useRemoveNavHeader();

    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    const [photoTaken, setPhotoTaken] = useState(false);
    const [photoUri, setPhotoUri] = useState<string>('');

    if (!permission) {
        return <View />;
    }

    if(!permission.granted) {
        requestPermission();
    }

    const takePhoto = async () => {
        await cameraRef.current?.takePictureAsync({ quality: 0.2 }).then((photo) => setPhotoUri(photo!.uri));

        setPhotoTaken(true);
    }

    if(!photoTaken) {
        return (
            <View style={styles.container}>
                <CameraView ref={cameraRef} style={styles.camera} facing="front">
                    <View className='absolute top-3 left-2'>
                        <TouchableOpacity onPress={() => console.log('miau')}>
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
                source={{ uri: photoUri }} 
                className='w-full h-full'
                alt="Taken Picture"
            />
            <View className='absolute bottom-10 left-1/4'>
                <TouchableOpacity style={styles.button} onPress={() => takePhoto()}>
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
