import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, withTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signOut } from '../store/actions';
import { getCurrentUser, getSignedInWith } from '../store/selectors';
import AppbarHeader from '../components/AppbarHeader';
import Maps from '../components/Maps';
import Spacer from '../components/Spacer';

const title = 'Home';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title,
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="home-outline" size={24} color={tintColor} />
    ),
    tabBarAccessibilityLabel: 'Home Screen',
  };

  render() {
    return (
      <>
        <AppbarHeader title={title} />
        <SafeAreaView style={styles.container}>
          <Maps />
        </SafeAreaView>
      </>
    );
  }
}

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
  }),
  withTheme
)(HomeScreen);
