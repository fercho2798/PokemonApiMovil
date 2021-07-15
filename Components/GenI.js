import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

const GenI = props => {
  const [pokemons, setPokemons] = useState([]);
  const [searchfield, setsearchfield] = useState('');

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(pokemons => setPokemons(pokemons.results));
  };

  return (
    <View>
      <View style={styles.searchCont}>
        <TextInput
          style={styles.searchfield}
          placeholder="Busca tu pokemon"
          onChangeText={value => setsearchfield(value)}
          value={searchfield}
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          {pokemons
            .filter(pokemon =>
              pokemon.name.toLowerCase().includes(searchfield.toLowerCase()),
            )
            .map((pokemon, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={index}
                  style={styles.card}
                  onPress={() =>
                    props.navigation.navigate('Detalles', {
                      pokemon: pokemon.name,
                    })
                  }>
                  <Image
                    style={{width: 150, height: 150}}
                    source={{
                      uri: `https://img.pokemondb.net/sprites/sword-shield/normal/${
                        pokemon.name
                      }.png`,
                    }}
                  />
                  <Text>{pokemon.name.toUpperCase()}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default GenI;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  card: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  searchCont: {
    position: 'absolute',
    marginBottom: 70,
    left: '20%',
    zIndex: 1,
    marginTop: 10,
  },
  searchfield: {
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    width: 250,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
});
