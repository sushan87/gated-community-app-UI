import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useWindowDimensions} from 'react-native';
import {DrawerActions} from '@react-navigation/native';

const Bulletin = ({props}) => {
  const [likedPosts, setLikedPosts] = React.useState({});

  const navigation = useNavigation();

  console.log('Props = ', props);
  console.log('Navigation = ', navigation);

  const handleLike = index => {
    setLikedPosts(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const bulletinPosts = [
    {
      name: 'Pradeep',
      role: 'FCADMIN',
      time: '9:00am',
      message: 'Breakfast started!',
      timestamp: '2 hours ago',
    },
    {
      name: 'Santosh',
      role: 'CEADMIN',
      time: '11:00am',
      message:
        'Quiz has started in the main hall. All participants please proceed to the venue. Prizes to be won!',
      timestamp: '1 hour ago',
    },
    {
      name: 'Santosh',
      role: 'CCADMIN',
      time: '5:30pm',
      message:
        'Sandhya arati is starting. Please join us for the evening prayers.',
      timestamp: '10 minutes ago',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Bulletin Board</Text>

        <TouchableOpacity style={styles.refreshButton}>
          <Text style={styles.iconText}>↻</Text>
        </TouchableOpacity>
      </View>

      {/* Bulletin Posts */}
      {bulletinPosts.map((item, index) => (
        <View key={index} style={styles.bulletinItem}>
          <View style={styles.postHeader}>
            <View style={styles.posterInfo}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.posterName}>{item.name}</Text>
                <View style={styles.roleContainer}>
                  <Text style={styles.adminRole}>{item.role}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.timeStamp}>{item.timestamp}</Text>
          </View>

          <Text style={styles.bulletinMessage}>{item.message}</Text>

          <View style={styles.postActions}>
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => handleLike(index)}>
              <Text
                style={[
                  styles.iconText,
                  likedPosts[index] ? styles.likedIcon : styles.unlikedIcon,
                ]}>
                {likedPosts[index] ? '👍' : '👍'}
              </Text>
              <Text
                style={[
                  styles.likeText,
                  likedPosts[index] && styles.likedText,
                ]}>
                Like
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.iconText}>↗</Text>
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.subscriptionButton}
        onPress={() => navigation.navigate('Subscription')}>
        <Text style={styles.subscriptionButtonText}>
          Go to Subscription Page
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Pull down to refresh</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: '#32325D',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#32325D',
  },
  refreshButton: {
    padding: 8,
  },
  iconText: {
    fontSize: 18,
    color: '#8898AA',
  },
  bulletinItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  posterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5E72E4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  posterName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#32325D',
    marginBottom: 2,
  },
  roleContainer: {
    backgroundColor: '#F6F9FC',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  adminRole: {
    color: '#5E72E4',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeStamp: {
    color: '#8898AA',
    fontSize: 12,
  },
  bulletinMessage: {
    fontSize: 16,
    color: '#525F7F',
    lineHeight: 24,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F6F9FC',
    paddingTop: 12,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  likeText: {
    marginLeft: 8,
    color: '#8898AA',
    fontSize: 14,
  },
  likedText: {
    color: '#5E72E4',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareText: {
    marginLeft: 8,
    color: '#8898AA',
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    color: '#8898AA',
    fontSize: 14,
  },

  subscriptionButton: {
    backgroundColor: '#5E72E4',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  subscriptionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Bulletin;
