import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';

const Detalles = props => {
  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
    fetchPokemonDetalles();
  });

  const fetchPokemonDetalles = () => {
    const {state} = props.navigation;
    fetch(`https://pokeapi.co/api/v2/pokemon/${state.params.pokemon}`)
      .then(res => res.json())
      .then(detalles => setDetalles(detalles));
  };

  return detalles.name ? (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image
        style={styles.image}
        source={{
          uri: `https://pokeres.bastionbot.org/images/pokemon/${
            detalles.id
          }.png`,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Nombre: {detalles.name.toUpperCase()}</Text>
        <Text style={styles.text}>Alto: {detalles.height / 10} m</Text>
        <Text style={styles.text}>Peso: {detalles.weight / 10} kg</Text>
        <Text style={styles.text}>
          Abilidad: {detalles.abilities[0].ability.name}
        </Text>
      </View>
      {detalles.types[1] ? (
        <Text style={styles.text}>
          {' '}
          Tipo: {detalles.types[0].type.name}/{detalles.types[1].type.name}
        </Text>
      ) : (
        <Text style={styles.text}>Tipo: {detalles.types[0].type.name}</Text>
      )}
    </View>
  ) : (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color="#E63F34" />
    </View>
  );
};

export default Detalles;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    backgroundColor: '#00aae4',
    borderBottomWidth: 5,
    borderRadius: 5,
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
    color: 'red',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 30,
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    borderWidth: 1,
    flexDirection: 'column',
    width: 400,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
  },
});
