
import React from "react";
import { useEffect, useRef } from "react";
import { Animated, StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";



export default function ProcessCard({income , expense}: any,   style?: StyleProp<TextStyle> | undefined
){
        const total = income + expense;

        if(total === 0){
            return(
                <View style={styles.card}>
                    <Text style={styles.empty}>No data available</Text>
                </View>
            );

        }

        const dominantIsincome = income >= expense;
        const ratio = Math.max(income,expense)/ total


        const incomePercent = income /total ;
        const expensePercent = expense / total;

        const incomeAnim = useRef(new Animated.Value(0)).current;
        const expenseAnim = useRef(new Animated.Value(0)).current;

        useEffect(() =>{
            Animated.parallel([
                Animated.timing(incomeAnim,{
                    toValue:incomePercent,
                    duration:800,
                    useNativeDriver:false,
                }),
                Animated.timing(expenseAnim,{
                    toValue:expensePercent,
                    duration:800,
                    useNativeDriver:false,
                }),
            ]).start();
        } , [income, expense]);

        const incomeWidth = incomeAnim.interpolate({
            inputRange:[0,1],
            outputRange:["0%", "100%"],

        });
        const expenseWidth = expenseAnim.interpolate({
            inputRange:[0,1],
            outputRange:["0%","100%"],
        });

        return(
            <View style={styles.card}>
                
                <View style={styles.bar}>
                    <Animated.View 
                              style={[styles.income,{width:incomeWidth,backgroundColor:"green"}]}>
                                <Text style={{fontSize:16, fontWeight:"600",}}>
                                    {Math.round(incomePercent * 100)} %
                                </Text>
                    </Animated.View>

                    <Animated.View 
                              style={[styles.expense,{width:expenseWidth,backgroundColor:"red",}]}>
                            <Text style={{fontSize:16, fontWeight:"600",}}>
                                    {Math.round(expensePercent * 100)} %
                            </Text>
                    </Animated.View>
                              
                </View>
               
                   

            </View>
        )
    }

const styles = StyleSheet.create({
    card:{
       
        width:"100%",
        height:"auto",
        marginVertical:16,
        // backgroundColor:"red",
        alignItems:"center",
        justifyContent:"center"
    

    },
   
  
    bar:{
        flexDirection:"row",
        backgroundColor:"#e53935",
        borderRadius:10,
        overflow:"hidden",
    },
   
    income:{
        color:"#4caf50",
        alignItems:"center",
        justifyContent:"center",
    },
    expense:{
        color:"#e53935",alignItems:"center",
        justifyContent:"center",
    },
   

    empty:{
        // textAlign:"center",
        color:"#999",
        fontSize:14
    }
})