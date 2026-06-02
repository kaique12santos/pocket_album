import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    position: 'absolute',
    zIndex: 50,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.76)',
  },

  backdropPressable: {
    flex: 1,
  },

  menu: {
    width: 252,
    height: '100%',
    backgroundColor: '#2d7a4d',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderRightWidth: 1,
    borderRightColor: '#07100B',
    paddingTop: 30,
    paddingHorizontal: 18,
    paddingBottom: 24,
    overflow: 'hidden',
  },

  edgeShadow: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },

  closeButton: {
    position: 'absolute',
    top: 18,
    left: 16,
    zIndex: 2,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeLine: {
    position: 'absolute',
    width: 29,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#D9F4DE',
  },

  closeLineLeft: {
    transform: [{ rotate: '45deg' }],
  },

  closeLineRight: {
    transform: [{ rotate: '-45deg' }],
  },

  profileBlock: {
    marginTop: 50,
    marginBottom: 42,
    paddingLeft: 2,
    paddingRight: 34,
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: 'rgba(213, 255, 224, 0.62)',
    backgroundColor: '#0B2415',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  avatarHead: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#CFA276',
    borderWidth: 2,
    borderColor: '#06110A',
    marginBottom: 2,
  },

  avatarBody: {
    width: 36,
    height: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: '#06110A',
  },

  username: {
    color: '#FFD60A',
    fontSize: 19,
    lineHeight: 22,
    fontFamily: 'Anybody_900Black',
  },

  links: {
    gap: 9,
    paddingRight: 12,
  },

  link: {
    minHeight: 42,
    borderRadius: 8,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  separatedLink: {
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(7, 16, 11, 0.18)',
    paddingTop: 16,
  },

  nativeIcon: {
    width: 16,
    color: 'rgba(213, 255, 224, 0.58)',
    fontSize: 13,
    lineHeight: 16,
    fontFamily: 'Anybody_900Black',
  },

  iconSlot: {
    width: 16,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  linkText: {
    flex: 1,
    color: 'rgba(213, 255, 224, 0.62)',
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'ArchivoNarrow_700Bold',
  },

  logoutButton: {
    marginTop: 'auto',
    marginLeft: 10,
    marginRight: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },

  logoutNativeIcon: {
    color: '#FFD1C8',
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Anybody_900Black',
  },

  logoutText: {
    color: '#FFD1C8',
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Anybody_800ExtraBold',
    textTransform: 'uppercase',
  },

  versionText: {
    marginTop: 16,
    marginRight: 30,
    color: 'rgba(213, 255, 224, 0.3)',
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 1.2,
    fontFamily: 'ArchivoNarrow_700Bold',
  },
});
