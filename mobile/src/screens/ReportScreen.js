import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Text,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, withTheme } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { signOut } from '../store/actions';
import { getCurrentUser, getSignedInWith } from '../store/selectors';
import Spacer from '../components/Spacer';
import AppbarHeader from '../components/AppbarHeader';

const title = 'Fazer denúncia';

const ReportScreen = () => {
  return (
    <>
      <AppbarHeader title={title} />
      <SafeAreaView style={styles.container}>
        <Spacer vertical={16}>
          <Button
            onPress={() => Linking.openURL('tel:181')}
            style={styles.button1}
          >
            {' '}
            Ligar
          </Button>
          <Button
            onPress={() =>
              Linking.openURL('https://sabesp-chat.sabesp.com.br/#/')
            }
            style={styles.button1}
          >
            Sabesp Online
          </Button>
        </Spacer>
      </SafeAreaView>
    </>
  );
};

ReportScreen.navigationOptions = {
  title,
  tabBarIcon: ({ tintColor }) => (
    <MaterialCommunityIcons
      name="bullhorn-outline"
      size={24}
      color={tintColor}
    />
  ),
  tabBarAccessibilityLabel: 'Report Screen',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 8,
  },
  button1: {
    padding: 50,
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
