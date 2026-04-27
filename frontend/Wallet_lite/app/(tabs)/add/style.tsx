// import React, { useEffect, useState } from "react";
// import { useRouter } from "expo-router";
// import { insertTransaction, FetchCategory } from "@/services/database";
// import { Color, TextType } from "@/constants/Color";
// import { useAuth } from "@/Context/AuthContext";
// import { Alert, FlatList, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";


// export default function AddTransactionPage() {
// const router = useRouter();
// const { user } = useAuth();
// const [amount, setAmount] = useState<string>("");
// const [description, setDescription] = useState<string>("");
// const [date, setDate] = useState<string>(
//     new Date().toISOString().slice(0, 10)
// ); // YYYY-MM-DD
// const [categories, setCategories] = useState<any[]>([]);
// const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
// const [loading, setLoading] = useState(false);
// const [modalVisible, setModalVisible] = useState(false);
// const [Catname,setCatName] = useState("");
// const [CatType,setCatType] = useState("");
// const options = ["expense","income"];



// useEffect(() => {
//     (async () => {
//         try {
//             const res: any = await FetchCategory();
//             if (typeof res === "string") {
//                 // web / no-sql
//                 setCategories([]);
//                 return;
//             }
//             setCategories(res.result || []);
//             if (res.result && res.result.length > 0) {
//                 setSelectedCatId(res.result[0].id);
//             }
//         } catch (e) {
//             console.warn("fetch categories", e);
//         }
//     })();
// }, []);

// const onSave = async () => {
//     if (!user) {
//         Alert.alert("Non authentifié", "Veuillez vous connecter.");
//         return;
//     }
//     const parsed = parseFloat(amount);
//     if (isNaN(parsed)) {
//         Alert.alert("Erreur", "Montant invalide");
//         return;
//     }
//     if (!selectedCatId) {
//         Alert.alert("Erreur", "Sélectionnez une catégorie");
//         return;
//     }

//     setLoading(true);
//     try {
//         const txData = {
//             amount: parsed,
//             category_id: selectedCatId,
//             date,
//             description: description || "",
//         };
//         const res = await insertTransaction(txData);
//         // insertTransaction returns string on web, otherwise undefined
//         if (Platform.OS === "web" && typeof res === "string") {
//             Alert.alert("Info", "SQLite non disponible sur le web");
//         } else {
//             Alert.alert("Succès", "Transaction ajoutée");
//             router.replace("/(tabs)/home");
//         }
//     } catch (err) {
//         console.error(err);
//         Alert.alert("Erreur", "Impossible d'ajouter la transaction");
//     } finally {
//         setLoading(false);
//     }
// };

// const renderCategory = ({ item }: { item: any }) => {
//     const selected = selectedCatId === item.id;
//     return (
//         <TouchableOpacity
//             onPress={() => setSelectedCatId(item.id)}
//             style={[styles.catItem, selected && styles.catItemSelected]}
//         >
//             <Text style={styles.catText}>
//                 {item.name} {item.type ? `(${item.type})` : ""}
//             </Text>
//         </TouchableOpacity>
//     );
// };
// const AddCategory = () => {
    
//     return (
//         <TouchableOpacity
//             onPress={() => setModalVisible(true)}
//             style={[styles.catItem,{backgroundColor:"green"}]}
//         >

//             <MaterialIcons name="add" size={28} color={"green"} >

//             <Text style={styles.catText}>
//               Ajouter une categories   
//             </Text>

//             </MaterialIcons>
//         </TouchableOpacity>
//     );
// };

// return (
//     <View style={styles.container}>
//         <View>
//             <Text>hello</Text>
//         </View>
//         <Text style={TextType.Titre}>Ajouter une transaction</Text>

//         <Text style={TextType.secondaire}>Montant</Text>
//         <TextInput
//             style={styles.input}
//             keyboardType="numeric"
//             value={amount}
//             onChangeText={setAmount}
//             placeholder="Ex: 12.50 "
//         />

//         <Text style={TextType.secondaire}>Date (YYYY-MM-DD)</Text>
//         <TextInput style={styles.input} value={date} onChangeText={setDate} />

//         <Text style={styles.label}>Description</Text>
//         <TextInput
//             style={styles.input}
//             value={description}
//             onChangeText={setDescription}
//             placeholder="Optionnel"
//         />

//         <Text style={TextType.primaire}>Catégorie</Text>
//         <View style={styles.catList}>
//             <FlatList
//                 data={categories}
//                 keyExtractor={(item) => String(item.id)}
//                 renderItem={renderCategory} ListHeaderComponent={AddCategory}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//             />
//             {/* <Text>test </Text> */}
//         </View>

//         <Modal
//         transparent
//         visible={modalVisible}
//         animationType="fade"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.overlay}>
//           <View style={styles.modal}>

//              <Text style={styles.label}>NOM de la categories ex: internet , taxi </Text>
//              <TextInput
//             style={styles.input}
//             value={description}
//             onChangeText={setDescription}
//             placeholder="nom de la categories "
//             />
//              <View style={{flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
//              <Text style={styles.label}>TYPE de la categories :depense ,expense </Text>
//               {options.map((item) => (
//             <View style={{justifyContent:"space-between",}}>  
//                  <TouchableOpacity style={{backgroundColor: "#1500ffff", width:20,height:10,
//                                    paddingTop: 8 ,paddingBottom: 8, /* 8px */marginLeft:40, marginRight:40,
//                                    marginTop:40, borderRadius: 6,}}
//                   key={item}
//                   onPress={() => {
//                       setCatType(item);
                      
//                     }}
//                     >
//                 <Text style={TextType.secondaire}>{item}</Text>
//               </TouchableOpacity>
//                         </View>
//             ))}
//             </View> 
            

//             <TouchableOpacity
//               onPress={() => setModalVisible(false)}
//             >
//                 <Text style={TextType.secondaire}> fermer</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
       

//         <View style={styles.actions}>
//             <TouchableOpacity
//                 style={[styles.button, styles.cancel]}
//                 onPress={() => router.back()}
//                 disabled={loading}
//             >
//                 <Text style={styles.buttonText}>Annuler</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 style={[styles.button, styles.save]}
//                 onPress={onSave}
//                 disabled={loading}
//             >
//                 <Text style={styles.buttonText}>{loading ? "En cours..." : "Enregistrer"}</Text>
//             </TouchableOpacity>
//         </View>
//     </View>
// );
// }

// const styles = StyleSheet.create({
// container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#049fffff',
//     paddingVertical:40,
//     height:"100%",
// },
// title: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginBottom: 12,
//     color: Color.black || "#000",
// },
// label: {
//     marginTop: 10,
//     marginBottom: 6,
//     color: "#333",
// },
// input: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#e3e3e3",
// },
// catList: {
//     marginTop: 8,
//     height: 60,
// },
// catItem: {
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     backgroundColor: "#fff",
//     marginRight: 8,
//     borderRadius: 8,
//     justifyContent: "center",
// },
// catItemSelected: {
//     borderWidth: 1,
//     borderColor: Color.main,
// },
// catText: {
//     color: "#222",
// },
// actions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
// },
// button: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginHorizontal: 6,
// },
// cancel: {
//     backgroundColor: "#ddd",
// },
// save: {
//     backgroundColor: Color.main,
// },
// buttonText: {
//     color: "#fff",
//     fontWeight: "600",
// },
//  overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//      justifyContent: "center",
//      alignItems: "center",
//   },
//   modal: {
//     width: 400,
//     height:"100%",
//     backgroundColor: "#fff",
//     padding: 28,
//     // borderRadius: 12,
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 12,
//     textAlign: "center",
//   },
// });
// /**
//  * Usage:
//  * - Place <CategoryItem item={cat} selected={...} onPress={...} /> inside your FlatList renderItem
//  * - Render <AddCategoryModal visible={show} onClose={() => setShow(false)} onAdded={refreshCategories} />
//  */

// // export const CategoryItem = ({ item, selected, onPress }: { item: any; selected?: boolean; onPress?: () => void }) => {
// //     // show icon (emoji or text) if item.icon present
// //     const icon = item?.icon || "🏷️";
// //     return (
// //         <TouchableOpacity
// //             onPress={onPress}
// //             style={[localStyles.catItem, selected && localStyles.catItemSelected]}
// //         >
// //             <Text style={localStyles.catText}>
// //                 <Text style={localStyles.icon}>{icon} </Text>
// //                 {item.name} {item.type ? `(${item.type})` : ""}
// //             </Text>
// //         </TouchableOpacity>
// //     );
// // };

// // export const AddCategoryModal = ({
// //     visible,
// //     onClose,
// //     onAdded,
// // }: {
// //     visible: boolean;
// //     onClose: () => void;
// //     onAdded?: () => void;
// // }) => {
// //     const [name, setName] = useState("");
// //     const [icon, setIcon] = useState("");
// //     const [type, setType] = useState<"income" | "expense">("expense");
// //     const [saving, setSaving] = useState(false);

// //     const save = async () => {
// //         if (!name.trim()) {
// //             Alert.alert("Erreur", "Donnez un nom à la catégorie");
// //             return;
// //         }
// //         setSaving(true);
// //         try {
// //             // dynamic import so we don't need to modify top imports
// //             const db = await import("@/services/database");
// //             if (Platform.OS === "web") {
// //                 Alert.alert("Info", "SQLite non disponible sur le web");
// //                 onClose();
// //                 return;
// //             }
// //             await db.insertCategory(name.trim(), icon.trim() || "🏷️", type);
// //             Alert.alert("Succès", "Catégorie ajoutée");
// //             setName("");
// //             setIcon("");
// //             setType("expense");
// //             onAdded && onAdded();
// //             onClose();
// //         } catch (e) {
// //             console.error(e);
// //             Alert.alert("Erreur", "Impossible d'ajouter la catégorie");
// //         } finally {
// //             setSaving(false);
// //         }
// //     };

// //     return (
// //         <Modal visible={visible} animationType="slide" transparent>
// //             <View style={localStyles.modalBackdrop}>
// //                 <View style={localStyles.modal}>
// //                     <Text style={localStyles.modalTitle}>Nouvelle catégorie</Text>

// //                     <TextInput
// //                         style={localStyles.input}
// //                         placeholder="Nom (ex: Taxi)"
// //                         value={name}
// //                         onChangeText={setName}
// //                     />
// //                     <TextInput
// //                         style={localStyles.input}
// //                         placeholder="Icône (emoji ou nom court) ex: 🚕"
// //                         value={icon}
// //                         onChangeText={setIcon}
// //                     />

// //                     <View style={localStyles.typeRow}>
// //                         <TouchableOpacity
// //                             onPress={() => setType("expense")}
// //                             style={[localStyles.typeBtn, type === "expense" && localStyles.typeBtnActive]}
// //                         >
// //                             <Text style={localStyles.typeTxt}>Dépense</Text>
// //                         </TouchableOpacity>
// //                         <TouchableOpacity
// //                             onPress={() => setType("income")}
// //                             style={[localStyles.typeBtn, type === "income" && localStyles.typeBtnActive]}
// //                         >
// //                             <Text style={localStyles.typeTxt}>Revenu</Text>
// //                         </TouchableOpacity>
// //                     </View>

// //                     <View style={localStyles.modalActions}>
// //                         <TouchableOpacity onPress={onClose} style={[localStyles.btn, localStyles.cancel]}>
// //                             <Text style={localStyles.btnText}>Annuler</Text>
// //                         </TouchableOpacity>
// //                         <TouchableOpacity onPress={save} style={[localStyles.btn, localStyles.save]} disabled={saving}>
// //                             <Text style={localStyles.btnText}>{saving ? "En cours..." : "Ajouter"}</Text>
// //                         </TouchableOpacity>
// //                     </View>
// //                 </View>
// //             </View>
// //         </Modal>
// //     );
// // };

// // const localStyles = StyleSheet.create({
// //     catItem: {
// //         paddingHorizontal: 12,
// //         paddingVertical: 8,
// //         backgroundColor: "#fff",
// //         marginRight: 8,
// //         borderRadius: 8,
// //         justifyContent: "center",
// //     },
// //     catItemSelected: {
// //         borderWidth: 1,
// //         borderColor: "#049fffff",
// //     },
// //     catText: {
// //         color: "#222",
// //     },
// //     icon: {
// //         marginRight: 6,
// //     },
// //     modalBackdrop: {
// //         flex: 1,
// //         backgroundColor: "rgba(0,0,0,0.35)",
// //         justifyContent: "center",
// //         padding: 20,
// //     },
// //     modal: {
// //         backgroundColor: "#fff",
// //         borderRadius: 12,
// //         padding: 16,
// //     },
// //     modalTitle: {
// //         fontSize: 18,
// //         fontWeight: "700",
// //         marginBottom: 12,
// //     },
// //     input: {
// //         backgroundColor: "#f7f7f7",
// //         padding: 10,
// //         borderRadius: 8,
// //         borderWidth: 1,
// //         borderColor: "#e3e3e3",
// //         marginBottom: 10,
// //     },
// //     typeRow: {
// //         flexDirection: "row",
// //         justifyContent: "space-between",
// //         marginBottom: 12,
// //     },
// //     typeBtn: {
// //         flex: 1,
// //         padding: 10,
// //         marginHorizontal: 6,
// //         borderRadius: 8,
// //         backgroundColor: "#eee",
// //         alignItems: "center",
// //     },
// //     typeBtnActive: {
// //         backgroundColor: "#049fffff",
// //     },
// //     typeTxt: {
// //         color: "#000",
// //         fontWeight: "600",
// //     },
// //     modalActions: {
// //         flexDirection: "row",
// //         justifyContent: "space-between",
// //     },
// //     btn: {
// //         flex: 1,
// //         padding: 12,
// //         borderRadius: 8,
// //         alignItems: "center",
// //         marginHorizontal: 6,
// //     },
// //     cancel: {
// //         backgroundColor: "#ddd",
// //     },
// //     save: {
// //         backgroundColor: "#049fffff",
// //     },
// //     btnText: {
// //         color: "#fff",
// //         fontWeight: "600",
// //     },
// // });import React, { useEffect, useState } from "react";
// import { useRouter } from "expo-router";
// import { insertTransaction, FetchCategory } from "@/services/database";
// import { Color, TextType } from "@/constants/Color";
// import { useAuth } from "@/Context/AuthContext";
// import { Alert, FlatList, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";


// export default function AddTransactionPage() {
// const router = useRouter();
// const { user } = useAuth();
// const [amount, setAmount] = useState<string>("");
// const [description, setDescription] = useState<string>("");
// const [date, setDate] = useState<string>(
//     new Date().toISOString().slice(0, 10)
// ); // YYYY-MM-DD
// const [categories, setCategories] = useState<any[]>([]);
// const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
// const [loading, setLoading] = useState(false);
// const [modalVisible, setModalVisible] = useState(false);
// const [Catname,setCatName] = useState("");
// const [CatType,setCatType] = useState("");
// const options = ["expense","income"];



// useEffect(() => {
//     (async () => {
//         try {
//             const res: any = await FetchCategory();
//             if (typeof res === "string") {
//                 // web / no-sql
//                 setCategories([]);
//                 return;
//             }
//             setCategories(res.result || []);
//             if (res.result && res.result.length > 0) {
//                 setSelectedCatId(res.result[0].id);
//             }
//         } catch (e) {
//             console.warn("fetch categories", e);
//         }
//     })();
// }, []);

// const onSave = async () => {
//     if (!user) {
//         Alert.alert("Non authentifié", "Veuillez vous connecter.");
//         return;
//     }
//     const parsed = parseFloat(amount);
//     if (isNaN(parsed)) {
//         Alert.alert("Erreur", "Montant invalide");
//         return;
//     }
//     if (!selectedCatId) {
//         Alert.alert("Erreur", "Sélectionnez une catégorie");
//         return;
//     }

//     setLoading(true);
//     try {
//         const txData = {
//             amount: parsed,
//             category_id: selectedCatId,
//             date,
//             description: description || "",
//         };
//         const res = await insertTransaction(txData);
//         // insertTransaction returns string on web, otherwise undefined
//         if (Platform.OS === "web" && typeof res === "string") {
//             Alert.alert("Info", "SQLite non disponible sur le web");
//         } else {
//             Alert.alert("Succès", "Transaction ajoutée");
//             router.replace("/(tabs)/home");
//         }
//     } catch (err) {
//         console.error(err);
//         Alert.alert("Erreur", "Impossible d'ajouter la transaction");
//     } finally {
//         setLoading(false);
//     }
// };

// const renderCategory = ({ item }: { item: any }) => {
//     const selected = selectedCatId === item.id;
//     return (
//         <TouchableOpacity
//             onPress={() => setSelectedCatId(item.id)}
//             style={[styles.catItem, selected && styles.catItemSelected]}
//         >
//             <Text style={styles.catText}>
//                 {item.name} {item.type ? `(${item.type})` : ""}
//             </Text>
//         </TouchableOpacity>
//     );
// };
// const AddCategory = () => {
    
//     return (
//         <TouchableOpacity
//             onPress={() => setModalVisible(true)}
//             style={[styles.catItem,{backgroundColor:"green"}]}
//         >

//             <MaterialIcons name="add" size={28} color={"green"} >

//             <Text style={styles.catText}>
//               Ajouter une categories   
//             </Text>

//             </MaterialIcons>
//         </TouchableOpacity>
//     );
// };

// return (
//     <View style={styles.container}>
//         <View>
//             <Text>hello</Text>
//         </View>
//         <Text style={TextType.Titre}>Ajouter une transaction</Text>

//         <Text style={TextType.secondaire}>Montant</Text>
//         <TextInput
//             style={styles.input}
//             keyboardType="numeric"
//             value={amount}
//             onChangeText={setAmount}
//             placeholder="Ex: 12.50 "
//         />

//         <Text style={TextType.secondaire}>Date (YYYY-MM-DD)</Text>
//         <TextInput style={styles.input} value={date} onChangeText={setDate} />

//         <Text style={styles.label}>Description</Text>
//         <TextInput
//             style={styles.input}
//             value={description}
//             onChangeText={setDescription}
//             placeholder="Optionnel"
//         />

//         <Text style={TextType.primaire}>Catégorie</Text>
//         <View style={styles.catList}>
//             <FlatList
//                 data={categories}
//                 keyExtractor={(item) => String(item.id)}
//                 renderItem={renderCategory} ListHeaderComponent={AddCategory}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//             />
//             {/* <Text>test </Text> */}
//         </View>

//         <Modal
//         transparent
//         visible={modalVisible}
//         animationType="fade"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.overlay}>
//           <View style={styles.modal}>

//              <Text style={styles.label}>NOM de la categories ex: internet , taxi </Text>
//              <TextInput
//             style={styles.input}
//             value={description}
//             onChangeText={setDescription}
//             placeholder="nom de la categories "
//             />
//              <View style={{flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
//              <Text style={styles.label}>TYPE de la categories :depense ,expense </Text>
//               {options.map((item) => (
//             <View style={{justifyContent:"space-between",}}>  
//                  <TouchableOpacity style={{backgroundColor: "#1500ffff", width:20,height:10,
//                                    paddingTop: 8 ,paddingBottom: 8, /* 8px */marginLeft:40, marginRight:40,
//                                    marginTop:40, borderRadius: 6,}}
//                   key={item}
//                   onPress={() => {
//                       setCatType(item);
                      
//                     }}
//                     >
//                 <Text style={TextType.secondaire}>{item}</Text>
//               </TouchableOpacity>
//                         </View>
//             ))}
//             </View> 
            

//             <TouchableOpacity
//               onPress={() => setModalVisible(false)}
//             >
//                 <Text style={TextType.secondaire}> fermer</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
       

//         <View style={styles.actions}>
//             <TouchableOpacity
//                 style={[styles.button, styles.cancel]}
//                 onPress={() => router.back()}
//                 disabled={loading}
//             >
//                 <Text style={styles.buttonText}>Annuler</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 style={[styles.button, styles.save]}
//                 onPress={onSave}
//                 disabled={loading}
//             >
//                 <Text style={styles.buttonText}>{loading ? "En cours..." : "Enregistrer"}</Text>
//             </TouchableOpacity>
//         </View>
//     </View>
// );
// }

// const styles = StyleSheet.create({
// container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#049fffff',
//     paddingVertical:40,
//     height:"100%",
// },
// title: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginBottom: 12,
//     color: Color.black || "#000",
// },
// label: {
//     marginTop: 10,
//     marginBottom: 6,
//     color: "#333",
// },
// input: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#e3e3e3",
// },
// catList: {
//     marginTop: 8,
//     height: 60,
// },
// catItem: {
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     backgroundColor: "#fff",
//     marginRight: 8,
//     borderRadius: 8,
//     justifyContent: "center",
// },
// catItemSelected: {
//     borderWidth: 1,
//     borderColor: Color.main,
// },
// catText: {
//     color: "#222",
// },
// actions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
// },
// button: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginHorizontal: 6,
// },
// cancel: {
//     backgroundColor: "#ddd",
// },
// save: {
//     backgroundColor: Color.main,
// },
// buttonText: {
//     color: "#fff",
//     fontWeight: "600",
// },
//  overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//      justifyContent: "center",
//      alignItems: "center",
//   },
//   modal: {
//     width: 400,
//     height:"100%",
//     backgroundColor: "#fff",
//     padding: 28,
//     // borderRadius: 12,
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 12,
//     textAlign: "center",
//   },
// });
// /**
//  * Usage:
//  * - Place <CategoryItem item={cat} selected={...} onPress={...} /> inside your FlatList renderItem
//  * - Render <AddCategoryModal visible={show} onClose={() => setShow(false)} onAdded={refreshCategories} />
//  */

// // export const CategoryItem = ({ item, selected, onPress }: { item: any; selected?: boolean; onPress?: () => void }) => {
// //     // show icon (emoji or text) if item.icon present
// //     const icon = item?.icon || "🏷️";
// //     return (
// //         <TouchableOpacity
// //             onPress={onPress}
// //             style={[localStyles.catItem, selected && localStyles.catItemSelected]}
// //         >
// //             <Text style={localStyles.catText}>
// //                 <Text style={localStyles.icon}>{icon} </Text>
// //                 {item.name} {item.type ? `(${item.type})` : ""}
// //             </Text>
// //         </TouchableOpacity>
// //     );
// // };

// // export const AddCategoryModal = ({
// //     visible,
// //     onClose,
// //     onAdded,
// // }: {
// //     visible: boolean;
// //     onClose: () => void;
// //     onAdded?: () => void;
// // }) => {
// //     const [name, setName] = useState("");
// //     const [icon, setIcon] = useState("");
// //     const [type, setType] = useState<"income" | "expense">("expense");
// //     const [saving, setSaving] = useState(false);

// //     const save = async () => {
// //         if (!name.trim()) {
// //             Alert.alert("Erreur", "Donnez un nom à la catégorie");
// //             return;
// //         }
// //         setSaving(true);
// //         try {
// //             // dynamic import so we don't need to modify top imports
// //             const db = await import("@/services/database");
// //             if (Platform.OS === "web") {
// //                 Alert.alert("Info", "SQLite non disponible sur le web");
// //                 onClose();
// //                 return;
// //             }
// //             await db.insertCategory(name.trim(), icon.trim() || "🏷️", type);
// //             Alert.alert("Succès", "Catégorie ajoutée");
// //             setName("");
// //             setIcon("");
// //             setType("expense");
// //             onAdded && onAdded();
// //             onClose();
// //         } catch (e) {
// //             console.error(e);
// //             Alert.alert("Erreur", "Impossible d'ajouter la catégorie");
// //         } finally {
// //             setSaving(false);
// //         }
// //     };

// //     return (
// //         <Modal visible={visible} animationType="slide" transparent>
// //             <View style={localStyles.modalBackdrop}>
// //                 <View style={localStyles.modal}>
// //                     <Text style={localStyles.modalTitle}>Nouvelle catégorie</Text>

// //                     <TextInput
// //                         style={localStyles.input}
// //                         placeholder="Nom (ex: Taxi)"
// //                         value={name}
// //                         onChangeText={setName}
// //                     />
// //                     <TextInput
// //                         style={localStyles.input}
// //                         placeholder="Icône (emoji ou nom court) ex: 🚕"
// //                         value={icon}
// //                         onChangeText={setIcon}
// //                     />

// //                     <View style={localStyles.typeRow}>
// //                         <TouchableOpacity
// //                             onPress={() => setType("expense")}
// //                             style={[localStyles.typeBtn, type === "expense" && localStyles.typeBtnActive]}
// //                         >
// //                             <Text style={localStyles.typeTxt}>Dépense</Text>
// //                         </TouchableOpacity>
// //                         <TouchableOpacity
// //                             onPress={() => setType("income")}
// //                             style={[localStyles.typeBtn, type === "income" && localStyles.typeBtnActive]}
// //                         >
// //                             <Text style={localStyles.typeTxt}>Revenu</Text>
// //                         </TouchableOpacity>
// //                     </View>

// //                     <View style={localStyles.modalActions}>
// //                         <TouchableOpacity onPress={onClose} style={[localStyles.btn, localStyles.cancel]}>
// //                             <Text style={localStyles.btnText}>Annuler</Text>
// //                         </TouchableOpacity>
// //                         <TouchableOpacity onPress={save} style={[localStyles.btn, localStyles.save]} disabled={saving}>
// //                             <Text style={localStyles.btnText}>{saving ? "En cours..." : "Ajouter"}</Text>
// //                         </TouchableOpacity>
// //                     </View>
// //                 </View>
// //             </View>
// //         </Modal>
// //     );
// // };

// // const localStyles = StyleSheet.create({
// //     catItem: {
// //         paddingHorizontal: 12,
// //         paddingVertical: 8,
// //         backgroundColor: "#fff",
// //         marginRight: 8,
// //         borderRadius: 8,
// //         justifyContent: "center",
// //     },
// //     catItemSelected: {
// //         borderWidth: 1,
// //         borderColor: "#049fffff",
// //     },
// //     catText: {
// //         color: "#222",
// //     },
// //     icon: {
// //         marginRight: 6,
// //     },
// //     modalBackdrop: {
// //         flex: 1,
// //         backgroundColor: "rgba(0,0,0,0.35)",
// //         justifyContent: "center",
// //         padding: 20,
// //     },
// //     modal: {
// //         backgroundColor: "#fff",
// //         borderRadius: 12,
// //         padding: 16,
// //     },
// //     modalTitle: {
// //         fontSize: 18,
// //         fontWeight: "700",
// //         marginBottom: 12,
// //     },
// //     input: {
// //         backgroundColor: "#f7f7f7",
// //         padding: 10,
// //         borderRadius: 8,
// //         borderWidth: 1,
// //         borderColor: "#e3e3e3",
// //         marginBottom: 10,
// //     },
// //     typeRow: {
// //         flexDirection: "row",
// //         justifyContent: "space-between",
// //         marginBottom: 12,
// //     },
// //     typeBtn: {
// //         flex: 1,
// //         padding: 10,
// //         marginHorizontal: 6,
// //         borderRadius: 8,
// //         backgroundColor: "#eee",
// //         alignItems: "center",
// //     },
// //     typeBtnActive: {
// //         backgroundColor: "#049fffff",
// //     },
// //     typeTxt: {
// //         color: "#000",
// //         fontWeight: "600",
// //     },
// //     modalActions: {
// //         flexDirection: "row",
// //         justifyContent: "space-between",
// //     },
// //     btn: {
// //         flex: 1,
// //         padding: 12,
// //         borderRadius: 8,
// //         alignItems: "center",
// //         marginHorizontal: 6,
// //     },
// //     cancel: {
// //         backgroundColor: "#ddd",
// //     },
// //     save: {
// //         backgroundColor: "#049fffff",
// //     },
// //     btnText: {
// //         color: "#fff",
// //         fontWeight: "600",
// //     },
// // });