import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';

import { Button, withTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signOut, getLocations } from '../store/actions';
import { getCurrentUser, getSignedInWith } from '../store/selectors';
import AppbarHeader from '../components/AppbarHeader';
import Maps from '../components/Maps';
import Spacer from '../components/Spacer';

const title = 'Bem vindo';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locations);
  const isLoadinLocations = useSelector((state) => state.locations.loading);

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  return (
    <>
      {isLoadinLocations ? (
        <>
          <AppbarHeader title={title} />
          <SafeAreaView style={styles.container}></SafeAreaView>
        </>
      ) : (
        <>
          <AppbarHeader title={title} />
          <SafeAreaView style={styles.container}>
            <Maps locations={locations} />
          </SafeAreaView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    currentUser: getCurrentUser(state),
    signedInWith: getSignedInWith(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    signOut,
    getCurrentUser,
    getSignedInWith,
    getLocations,
  }),
  withTheme
)(HomeScreen);

HomeScreen.navigationOptions = {
  title,
  tabBarIcon: ({ tintColor }) => (
    <MaterialCommunityIcons name="home-outline" size={24} color={tintColor} />
  ),
  tabBarAccessibilityLabel: 'Home Screen',
};
