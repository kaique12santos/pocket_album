import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 390,
    height: 84,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#1E1E1E',
  },

  container: {
    height: 67,
    backgroundColor: '#070D0E',
    borderTopWidth: 1,
    borderTopColor: '#151B1C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },

  item: {
    width: 58,
    height: 46,
    alignItems: 'center',
    justifyContent: 'space-between',
    transform: [{ translateY: -5 }],
  },

  leftOfBadge: {
    marginRight: 42,
  },

  rightOfBadge: {
    marginLeft: 42,
  },

  label: {
    color: '#CDDAD5',
    fontSize: 13,
    lineHeight: 15,
    fontFamily: 'Anybody_900Black',
  },

  nativeIcon: {
    color: '#CDDAD5',
    fontSize: 24,
    lineHeight: 24,
    fontFamily: 'Anybody_900Black',
  },

  centerBadge: {
    position: 'absolute',
    top: -9,
    left: '50%',
    width: 76,
    height: 76,
    marginLeft: -38,
    borderRadius: 38,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },



  centerImage: {
    width: 68,
    height: 78,
  },
});
