import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get("window");

export  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1900fcff",
  },

  backgroundImage: {
    width: "100%",
    height: 320, // équivaut à h-80 environ
    // resizeMode: "cover", // object-cover
      borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
  },

  title: {
    color: "#d60e47",
    fontSize: 30, 
    lineHeight:36,
    textAlign: "center",
    paddingTop:12,
    paddingBottom:12 ,
    // padding-top: 0.75rem /* 12px */;
    // padding-bottom: 0.75rem /* 12px 
  },

  formContainer: {
    backgroundColor: "#ffff",
    height: 0.6 *height, // équivalent à h-screen arrondi
    // marginLeft:20,
    justifyContent:"center",
    alignItems:"center",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // paddingTop: 20,
    
  },

  inputEmail: {
    // letter-spacing: -1px;
    // tracking-widest bg-gray-100 rounded-lg text-base py-2 px-1 mb-5 mx-5
    backgroundColor:"#f3f4f6",color: "#000",borderRadius: 8,
    marginBottom: 20, marginHorizontal:20 ,
    width: "80%", fontSize: 16,
    lineHeight:24, paddingHorizontal:4,
    letterSpacing: 2, paddingVertical:8,
    
  },

  inputPassword: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    marginBottom: 20,
    width: "80%",
    fontSize: 16,lineHeight:24,
    paddingLeft:4,paddingRight:4,
    marginLeft: 20,marginRight:20,
    letterSpacing: 1,
  },

  actionsContainer: {
    alignItems: "center",
    marginTop: 20,
 
  },

  loginButton: {  
    // className='bg-[#fac25a] py-2 rounded-md mx-10 mt-10 mb-3'
    backgroundColor: "#1500ffff", 
    paddingTop: 8 ,paddingBottom: 8, /* 8px */
    marginLeft:40, marginRight:40,
    marginTop:40,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },

  loginButtonText: {
    // className='text-center font-semibold text-gray-100 text-lg'
    textAlign:"center",
    color: "#f3f4f6",
    fontSize: 20,lineHeight:28,
    fontWeight: "600",
  },

  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginRight:8 ,
    marginLeft:8,
  },

  registerText: {
    // className='font-light tracking-wider'
    color: "#00ff11ff",
    marginRight: 10,
    fontWeight:300,
    letterSpacing: 1, paddingLeft:4, paddingRight:4,
  },

  registerLink: {
    // className='font-medium text-[#d60e47]'s
    color: "#ff0000ff",
    fontWeight: "bold",
  },
//   className='flex-row space-x-2 justify-center '
 
});


