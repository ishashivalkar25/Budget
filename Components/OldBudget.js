import React from 'react';
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

// import {
//     Colors,
//     DebugInstructions,
//     Header,
//     LearnMoreLinks,
//     ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

import { Dropdown } from "react-native-element-dropdown";
import { auth, db, collection, getDocs,getDoc, doc, updateDoc } from "../Firebase/config";
import { useNavigation } from '@react-navigation/core';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
    { label: 'Item 9', value: '9' },
    { label: 'Item 10', value: '10' },
    { label: 'Item 11', value: '11' },
    { label: 'Item 12', value: '12' },
    { label: 'Item 13', value: '13' },
    { label: 'Item 14', value: '14' },
    { label: 'Item 15', value: '15' },
    { label: 'Item 16', value: '16' },
];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const budgetMethods = [
    { label: 'Envelop Method', value: 'Envelop Method' },
    { label: 'Zero Based Budgeting', value: 'Zero Based Budgeting' },
    { label: '50-30-20', value: '50-30-20' },
]

const OldBudget = ({navigation}) => {

    const [monthlyInc, setMonthlyInc] = React.useState();
    const [selectedBudgetingMethod, setSelectedBudgetingMethod] = React.useState();
    const [categories, setCategories] = React.useState([]);
    const [categoryWiseBudget, setCategoryWiseBudget] = React.useState([]);
    const [isBudgetChanged, updateIsBudgetChanged] = React.useState(false);

    React.useEffect(() => {
        fetchExpCategories();
        // fetchBudget();
    }, []);

    React.useEffect(() => {
        fetchBudget();
    }, [navigation]);

    React.useEffect(() => {
        console.log(categories);

    }, [categories]);

    React.useEffect(() => {
        console.log("Budget", categoryWiseBudget);
        updateIsBudgetChanged(true);
    }, [categoryWiseBudget]);

    const fetchBudget = async() => {

        try{
            const budgetForCurrMonth = await getDoc(doc(db, "User", "o4qWuRGsfDRbSyuA1OO2yljfjDr1", "Budget", "March22"));
            setCategoryWiseBudget(budgetForCurrMonth.data().budget);
        }
        catch(e)
        {
            console.log(e);
        }
    }
    const fetchExpCategories = async () => {

        try {
            const querySnapshot = await getDocs(collection(db, "ExpCategory"));
            const catList = [];
            querySnapshot.forEach((doc) => {
                //   console.log(doc.id, JSON.stringify(doc.data()));
                const catName = doc.data();
                // getcat = { label: catName.ExpCatName, value: catName.ExpCatName };
                // console.log(getcat);
                catList.push(catName.ExpCatName);
            });
            setCategories(catList);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    const setBudget = () => {

        if (!monthlyInc) {
            console.log("Please enter Monthly Income!")
            alert("Please enter Monthly Income!")
        }
        else if(monthlyInc<=0)
        {
            alert("Please enter valid Monthly Income!")
        }
        else if (!selectedBudgetingMethod) {
            alert("Please enter Budgeting Method!");
        }
        else {
            navigation.navigate("SetBudget", {
                categories : categories,
                monthlyInc : monthlyInc,
                budgetingMethod : selectedBudgetingMethod,
                month : months[new Date().getMonth()]
            });
        }
        
    }

    return (
        <SafeAreaView>
            <View
                style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    paddingVertical: 20,
                    height : "35%"
                }}
            >
                <View style={styles.monthlyIncContainer}>
                    <Text style={styles.monthlyInc}>Current Month : {months[new Date().getMonth()]}</Text>
                    <Text style={styles.monthlyInc}>Monthly Income</Text>
                    <TextInput
                        style={styles.monthlyIncInput}
                        onChangeText={text => setMonthlyInc(text)}
                        value={monthlyInc}
                        placeholder="Enter Monthly Income here..."
                        keyboardType="numeric"
                    />
                </View>
                <View>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={{ color: "black" }}
                        data={budgetMethods}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Category"
                        searchPlaceholder="Search..."
                        value="category"
                        onChange={(item) => {
                            setSelectedBudgetingMethod(item.value);
                        }}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={setBudget}>
                        <Text style={styles.buttonText}>Set Budget / Revise Budget</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.budgetCategoryContainer}>
                <FlatList
                    data={categoryWiseBudget}
                    renderItem={({item}) =>
                        <View style={styles.budgetCategory}>
                            <Text style={styles.budgetCategoryText}>{item.category}</Text>
                            <Text style={styles.budgetCategoryText}>{item.budget}</Text>
                            <Text style={styles.budgetCategoryText}>{item.budget}</Text>
                        </View>
                    }
                    extraData={isBudgetChanged}
                />
            </View>

        </SafeAreaView>
    )
}

export default OldBudget;
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
        paddingVertical: 10,
        height: "65%",
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