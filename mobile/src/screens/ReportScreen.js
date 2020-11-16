import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, withTheme } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { signOut } from '../store/actions';
import { getCurrentUser, getSignedInWith } from '../store/selectors';
import Spacer from '../components/Spacer';
import AppbarHeader from '../components/AppbarHeader';

const title = 'Denúncia';

const ReportScreen = () => {
  return (
    <>
      <AppbarHeader title={title} />
      <SafeAreaView style={styles.container}>
        <Spacer vertical={16}>Fazer denúncia</Spacer>
      </SafeAreaView>
    </>
  );
};

ReportScreen.navigationOptions = {
  title,
  tabBarIcon: ({ tintColor }) => (
    <MaterialCommunityIcons name="home-outline" size={24} color={tintColor} />
  ),
  tabBarAccessibilityLabel: 'Report Screen',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
});

const mapStateToProps = (state) => {
  return {
    currentUser: getCurrentUser(state),
    signedInWith: getSignedInWith(state),
  };
};
export default compose(
  connect(mapStateToProps, { signOut }),
  withTheme,
  withNavigation
)(ReportScreen);