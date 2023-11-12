import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

function App(): JSX.Element {
    const [nfcReading, setNfcReading] = useState(false);
    const [nfcData, setNfcData] = useState("")

    useEffect(() => {
        NfcManager.start();
    }, [])

    async function readCard() {
        try {
            setNfcData("");
            setNfcReading(true);
            await NfcManager.requestTechnology(NfcTech.NfcA);
            const tag = await NfcManager.getTag();
            if (tag) {
                console.warn('Tag found:', tag);
                setNfcData(JSON.stringify(tag));
            } else {
                console.warn('No tag found!');
            }
        } catch (ex) {
            console.warn('Oops!', ex);
        } finally {
            NfcManager.cancelTechnologyRequest();
            setNfcReading(false);
        }
    }

    const writeData = () => {
        const data = JSON.parse(nfcData);
        return (
            <View>
                {Object.keys(data).map((key, index) => (
                    <Text style={styles.info} key={index}>
                        {key}: {JSON.stringify(data[key])}
                    </Text>
                ))}
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            {nfcReading && !nfcData ? <Text style={styles.info}>Reading NFC...</Text> : <Button title="Read Card Informations" onPress={readCard} />}
            {nfcData && writeData()}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        borderColor: "white",
        borderWidth: 3,
        padding: 20,
        borderRadius: 20,
        backgroundColor: "grey",
        color: "white",
        fontSize: 20,
    }
});
export default App;