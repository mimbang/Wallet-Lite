
import { Color } from "@/constants/Color";
import { FetchCategory } from "@/services/database";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type CategoriesProps = {
    categorie_id: number | null;
    onChange: (id: number | null) => void;
};


export default function ListCat({categorie_id,onChange}:CategoriesProps)  {
    const [categories,setCategories] = useState<any[]>([]);


    useEffect(()=> {
        const load = async () => {


            const res: any = await FetchCategory();
            if (typeof res === "string") {
                // web / no-sql
                setCategories([]);
                return;
            }
            setCategories(res.result || [])
        }
        load()
    },
    [])

    const handlePress = (id: number) => {
    if (categorie_id === id) {
        onChange(null); // désélection
    } else {
        onChange(id); // sélection
    }
};



const renderCategory = ({ item }: { item: any }) => {
    const selected = categorie_id === item.id;

    return (
        <TouchableOpacity
            onPress={() => handlePress(item.id)}
            style={{
                padding: 10,
                height:"100%",
                marginRight: 8,
                borderRadius: 10,
                backgroundColor: selected ? Color.main: "#6d6d6d",
            }}
        >
            <MaterialIcons name={item.icon} size={30} color={"green"}/>
            <Text style={{ color: selected ? "white" : "black" }}>
                {item.name} {item.type ? `(${item.type})` : ""}
            </Text>
        </TouchableOpacity>
    );
};



    return (
        // <View style={{backgroundColor:"green"}}>
            <FlatList data={categories}
            keyExtractor={(item) => String(item.id)}
                renderItem={renderCategory} 
                // ListHeaderComponent={AddCategory}
                horizontal
                showsHorizontalScrollIndicator={false}
      />
            
        // </View>
    )
}