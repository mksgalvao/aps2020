import React from 'react';

const Card = () => {
  return (
    <>
      <div style={styles.card}> Bla</div>
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 20,
    alignSelf: 'center',
    marginTop: 45,
    marginBottom: 15,
    backgroundColor: theme.colors.accent,
  },
});

export default Card;
