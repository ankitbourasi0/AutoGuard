import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Appbar, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const Notifications:React.FC =( ) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header style={styles.appBar}>
        <Ionicons name="menu" size={24} color="white" />
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>ATG</Text>
          </View>
        </View>
        <Ionicons name="notifications" size={24} color="white" />
      </Appbar.Header>
      
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.notificationTitle}>Notifications</Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>New Payslip Uploaded</Text>
            <Text style={styles.cardSubtitle}>A new payslip for March has been uploaded</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>New Shift Assigned</Text>
            <Text style={styles.cardSubtitle}>A new shift timeslot has been assigned to you</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  appBar: {
    backgroundColor: '#333',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  logoContainer: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -25 }],
  },
  logo: {
    backgroundColor: '#333',
    borderRadius: 25,
    padding: 10,
  },
  logoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  notificationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#d3d3a4',
    borderRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default Notifications