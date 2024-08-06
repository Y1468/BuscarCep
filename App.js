import { useState,useRef} from 'react';
import { Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { api } from './services/api';

export default function App() {

  const[cep,setCep]=useState('')
  const inputRef=useRef(null)
  const[cepUser,setCepUser]=useState(null)

  function limpar(){
    setCep('')
    inputRef.current.focus()
    //Limpando campos
    setCepUser(null)
  }

  async function buscar(){

     if (cep==='') {
       alert('Digite um cep valido')
       setCep('')
       return
     }
     
    try {

      const response=await api.get(`${cep}/json/`)
      console.log(response.data)
      setCepUser(response.data)

      Keyboard.dismiss()//Fechando o teclado

    } catch (error) {
      console.log('Error:' + error)
    }
     

  }

  return (
    <SafeAreaView style={st.container}>
        <View style={st.viewInput}>
           <Text style={st.txt}>Digite o cep desejado</Text>
           <TextInput
              value={cep}
              placeholder='00003434'
              keyboardType='numeric'
              onChangeText={(texto)=>setCep(texto)}
              style={st.input}
              ref={inputRef}
           />
        </View>
        <View style={st.viewBtn}>
           <TouchableOpacity style={[st.btn, {backgroundColor:'blue'}]} onPress={buscar}>
              <Text style={st.txtBtn}>Buscar</Text>
           </TouchableOpacity>

           <TouchableOpacity style={[st.btn, {backgroundColor:'red'}]} onPress={limpar}>
              <Text style={st.txtBtn}>Limpar</Text>
           </TouchableOpacity>
        </View>

        {cepUser &&
          <View style={st.viewCep}>
          <Text style={st.txtCep}>CEP:{cepUser.cep}</Text>
          <Text style={st.txtCep}>Logradouro:{cepUser.logradouro}</Text>
          <Text style={st.txtCep}>Bairro:{cepUser.bairro}</Text>
          <Text style={st.txtCep}>Cidade:{cepUser.localidade}</Text>
          <Text style={st.txtCep}>Estado:{cepUser.uf}</Text>
        </View>
        }
        
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  container:{
    flex:1
  },

  txt:{
     fontSize:22,
     fontWeight:'bold'
  },

  viewInput:{
     justifyContent:'center',
     alignItems:'center',
     marginTop:50
  },

  input:{
     width:'90%',
     padding:10,
     borderColor:'#000',
     borderWidth:2,
     borderRadius:5,
     marginTop:12,
     fontSize:18
  },
  btn:{
    padding:10,
    borderRadius:5
  },

  viewBtn:{
     flexDirection:'row',
     justifyContent:'space-around',
     marginTop:30
  },

  txtBtn:{
    color:'#FFF',
    fontWeight:'bold',
    fontSize:18
  },

  viewCep:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },

  txtCep:{
    fontSize:20
  }
  
});
