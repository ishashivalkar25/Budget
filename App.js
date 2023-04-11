import React from 'react';
import { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Budget from "./Components/Budget"
import SetBudget from "./Components/SetBudget"

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Budget" component={Budget}/>
                <Stack.Screen name="SetBudget" component={SetBudget}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    monthlyIncContainer: {
        padding: 10,
        alignItems: "center",
    },
    monthlyInc: {
        margin: 5,
        fontSize: 18,
        fontWeight: "bold",
    },
    monthlyIncInput: {
        // backgroundColor: 'rgba(0,0,0,0.2)',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        textAlign: "center",
        padding: 2
    },
    dropdown: {
        margin: 10,
        width: '85%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 5,
        alignSelf: "center",
        borderRadius: 6,
        alignItems: 'center'
    },
    dropDownStyle: {
        width: '85%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 5,
        alignSelf: "center",
        borderRadius: 6,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    placeholderStyle: {
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: 'black',
    },
    buttonContainer: {
        alignItems: "center",
    },
    button: {
        backgroundColor: "green",
        height: 45,
        width: "85%",
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15
    },
    budgetCategoryContainer: {
        marginVertical: 15,
        height: 500,
    },
    budgetCategory: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginTop: 5,
        borderRadius: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
    },
    budgetCategoryText: {
        textAlignVertical: "center",
        fontWeight: "bold",
        fontSize: 15,
    },
});

export default App;
