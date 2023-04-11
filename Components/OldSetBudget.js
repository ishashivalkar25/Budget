import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native'
import { Dropdown } from "react-native-element-dropdown";
import { auth, db, collection, addDoc, doc, setDoc } from "../Firebase/config";
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
];


export default function SetBudget({ route, navigation }) {
    
    // const navigation = useNavigation();

    const [categories, setCategories] = React.useState([]);
    const [selectedCategories, updateSelectedCategories] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState();
    const [categoryBudget, setCategoryBudget] = React.useState();
    const [categoryWiseBudget, setCategoryWiseBudget] = React.useState([]);
    const [isCategoryWiseBudgetChanged, updateIsCategoryWiseBudgetChanged] = React.useState(false);
  
    React.useEffect(() => {
        console.log("set budget", route.params.categories);
        const tempCategories = [];
        route.params.categories.forEach((item) => {
            tempCategories.push({ label: item, value: item })
        })
        setCategories(tempCategories);
        console.log(categories);
    }, []);

    React.useEffect(() => {
        console.log(categories);
    }, [categories]);

    const addCategoryWiseBudget = () => {

        console.log(categoryBudget);
        if (selectedCategory != null && !selectedCategories.includes(selectedCategory) && categoryBudget > 0) {
            selectedCategories.push(selectedCategory);
            categoryWiseBudget.push({ category: selectedCategory, budget: parseFloat(categoryBudget) });
            console.log(categoryWiseBudget);
            updateIsCategoryWiseBudgetChanged(true);
            console.log(isCategoryWiseBudgetChanged);
        }
        else {
            alert("You have already set budget for this category!")
        }

        updateIsCategoryWiseBudgetChanged(false);
    }
    const validateBudget = () => {

        const monthlyInc = parseFloat(route.params.monthlyInc);

        var totalAmount = 0;

        categoryWiseBudget.forEach((item) => {
            totalAmount = totalAmount + item.budget;
        })
        console.log("Total", totalAmount);
    
        if(totalAmount>monthlyInc)
        {
            alert("Your set budget amount total is exceeding your monthly income.")
            return false;
        }
        else if(totalAmount<monthlyInc)
        {
            alert("Your set budget amount total is less than your monthly income.")
            return false;
        }
        else
        {
            return true;
        }
        
    }

    const saveBudget = async() => {

        if(!selectedCategories.includes("Other Expenses"))
        {
            categoryWiseBudget.push({ category: "Other Expenses", budget: 0 });
        }

        try{
            const docRef = await setDoc(doc(db, "User", "o4qWuRGsfDRbSyuA1OO2yljfjDr1", "Budget", "March22"), {
                method : route.params.budgetingMethod,
                budget: categoryWiseBudget
              });
              console.log("Saved");
              navigation.navigate("Budget");
        }
        catch(e)
        {
            console.log(e)
        }
    }
    const confirmBudget = () => {

        if(validateBudget())
        {
            Alert.alert('Alert Title', 'Do you want to confirm a Budget?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { 
                    text: 'Yes', 
                    onPress: () => saveBudget()
                },
            ]);
        }
        
    }
    return (
        <SafeAreaView>
            <View
                style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    paddingVertical: 20,
                    height: "29%"
                }}
            >
                <View style={{ alignItems: "center" }}>
                    <Text>Add Category to Budget</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={{ color: "black" }}
                        data={categories}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Category"
                        searchPlaceholder="Search..."
                        value="category"
                        onChange={(item) => {
                            setSelectedCategory(item.value);
                        }}
                    />
                    <TextInput
                        style={styles.monthlyIncInput}
                        onChangeText={text => setCategoryBudget(text)}
                        value={categoryBudget}
                        placeholder='Enter Budget for selected category...'
                        keyboardType="numeric"
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={addCategoryWiseBudget}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.budgetCategoryContainer}>
                <FlatList
                    data={categoryWiseBudget}
                    renderItem={({ item }) =>
                        <View style={styles.budgetCategory}>
                            <Text style={styles.budgetCategoryText}>{item.category}</Text>
                            <Text style={styles.budgetCategoryText}>{item.budget}</Text>
                            <TouchableOpacity style={styles.buttonDelete}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    ListEmptyComponent={
                        <View>
                            <Text>Budget is not set for any Category!</Text>
                        </View>
                    }
                    extraData={isCategoryWiseBudgetChanged}
                />

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={confirmBudget}>
                    <Text style={styles.buttonText}>Set Budget</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    monthlyIncInput: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 10,
        padding: 2,
        width: "85%",
        height: 40,
        paddingHorizontal: 20
    },
    budgetCategoryContainer: {
        paddingVertical: 10,
        height: "61%",
    },
    budgetCategory: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginTop: 5,
        borderRadius: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        alignItems: "center",
        paddingHorizontal: 20,
    },
    budgetCategoryText: {
        textAlignVertical: "center",
        fontWeight: "bold",
        fontSize: 15,
    },
    buttonDelete: {
        borderRadius: 20,
        backgroundColor: "green",
        width: 20,
        height: 20,
        alignItems: "center"
    },
    buttonContainer: {
        alignItems: "center",
        marginVertical: 10
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
        fontSize: 15,
    },
})
