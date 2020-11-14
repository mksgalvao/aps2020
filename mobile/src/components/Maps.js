import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

//  google api key

const Maps = (props) => {
  const [region, setRegion] = useState({
    latitude: -23.7031764,
    longitude: -46.771167,
    latitudeDelta: 0.009,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        {props.locations.map((dam, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: dam.location.lat,
              longitude: dam.location.lng,
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
export default Maps;
