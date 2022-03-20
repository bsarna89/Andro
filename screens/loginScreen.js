import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { auth, database } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import {
    get,
    child,
    ref,
    goOffline,
    onValue,
    set,
} from "firebase/database";

import { LogBox } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

LogBox.ignoreLogs(
    ['Setting a timer for a long period of time',
        "navigation.navigate is not a function."])




export default function LoginScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();


    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                navigation?.navigate("Home")
            }
        })

        return unsubscribe;
    }, []);

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {

                const dbRef = ref(database);
                console.log(res.user.uid);
                set(ref(database, `Users/${res.user.uid}`), {
                    username: "user+",
                    email: `${email}`,
                    canBackflip: true,
                    createdAt: Date.now(),
                });

            })
            .then((res) => {

            })
            .catch(error => alert(error.message));
    }

    const handleLogIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Logged in ", userCredential.user);
            })
            .catch((error) => alert(error.message));


    }

    return (

        <KeyboardAvoidingView style={styles.container} behaviour="padding">
            <Text> Login Screen </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => { setEmail(text) }}
                    style={styles.input}
                >
                </TextInput>

                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => { setPassword(text) }}
                    style={styles.input}
                    secureTextEntry
                >
                </TextInput>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogIn}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}> Login </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}> Register </Text>
                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },

    inputContainer: {
        width: "80%"

    },

    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,

    },

    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,

    },

    button: {
        backgroundColor: "#0782F9",
        width: "100%",
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: "center",
    },

    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#0782F9",
        borderWidth: 2,


    },

    buttonOutlineText: {
        color: "blue",
        fontWeight: "700",
        fontSize: 16,

    },

    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    }
});