import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

NfcManager.start();
function App(): JSX.Element {
    async function readCard() {
        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);
            const tag = await NfcManager.getTag();
            if (tag) {
                console.warn('Tag found:', tag);
            } else {
                console.warn('No tag found!');
            }
        } catch (ex) {
            console.warn('Oops!', ex);
        } finally {
            NfcManager.cancelTechnologyRequest();
        }
    }

    return (
        <View style={styles.wrapper}>
            <Button title="Read Card Informations" onPress={readCard} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default App;