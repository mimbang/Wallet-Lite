import { Color } from "@/constants/Color";
import { StyleSheet } from "react-native";
import { Dimensions,} from 'react-native';

const { height } = Dimensions.get("window");


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#049fffff',
        paddingVertical:40,
        height:"100%",

        
    },
    formContainer: {
    backgroundColor: "#ffff",
    // height: 0.9 *height, // équivalent à h-screen arrondi
    height:"auto",

    // justifyContent:"center",
    alignItems:"center",
    borderTopLeftRadius: "15%",
    borderTopRightRadius: "15%",
    // paddingTop: 20,
    
  },
  headerContain:{
    height: "auto",
    justifyContent: 'center',
    
  },
  angleContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 20,
  width: "100%",



},

  WelcomeText:{
    fontSize:24,
    fontFamily:"sans-serif",
    fontWeight:"bold",
    color:"#000",
  },
  InfoContainer:{
    textDecorationColor:"green",
    // backgroundColor:"#121212ff",
    borderRadius:20,
    paddingVertical:20,
    paddingHorizontal:20,
    marginTop:20,
    gap:10,
    justifyContent:"center",
    alignItems:"center",
  },

  QuicklyInfoContainer:{
    flexDirection:"row",
    // justifyContent:"flex-start",
    justifyContent:"center",
    alignItems:"center",
    margin:20,
    backgroundColor:Color.main,
    height:"auto",
    width:"80%",
    borderRadius:20,
  
    
   
  },


 row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
  },
  category: {
    fontSize: 12,
    color: "#888",
  },
  amount: {
    fontWeight: "bold",
    fontSize: 16,
  },


});