
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, ActivityIndicator} from 'react-native';

export default function App() {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function handleMovies(){
      setLoading(true)
      const req = await fetch("https://api.b7web.com.br/cinema/")
      const json = await req.json()
      console.log(json)
      if(json){
        setMovies(json)
        setLoading(false)
      }
    } 
    handleMovies()
  },[])

  

  return (
    
      <SafeAreaView style={styles.container}>
        <Text style={styles.textTitle}>Filmes</Text>
        {loading && 
          <View style={styles.areaLoading}>
            <ActivityIndicator size={'large'} color={'#fff'} style={styles.indicatorLoading}/>
            <Text style={styles.textLoading}>Carregando...</Text>
          </View>
        }
        {!loading && 
        <>
        <Text  style={styles.textTotal}>Total de Filme:{movies.length} </Text>
        <FlatList
        data={movies}
        renderItem={({item})=>(
          <View style={styles.cartItem}>
            <Image source={{uri: item.avatar}} style={{width:200, height:400, borderRadius:5}}/>
            <Text style={styles.textMovie}>{item.titulo}</Text>
          </View>
          
          )}
          keyExtractor={item=> item.titulo}
          />
          </>}
        
      </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#333',
    justifyContent:'center',
  },
  textTotal:{
    fontSize: 18,
    color:'#fff',
    textAlign: 'center',
    marginBottom: 20,
    
  },
  textMovie: {
    color: '#fff',
    fontSize: 22,
  },
  cartItem:{
    alignItems:'center',
    marginBottom:20,
  },
  areaLoading:{
    flex: 1,

  },
  indicatorLoading: {
    marginTop: 30, 
  },
  textLoading:{
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  textTitle:{
    fontSize:25,
    backgroundColor: '#007FFF',
    paddingVertical:5,
    color: '#fff',
    textAlign:'center'
  }
  
  
});
