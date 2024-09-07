// src/screens/ProfileScreen.tsx

import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import ProfileImageCard from '../components/ProfileImageCard';

const MyProfileScreen: React.FC = () => {
  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Picture Section */}
        <ProfileImageCard
          imageUri="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?w=740&t=st=1723659776~exp=1723660376~hmac=9b7dd0ddbdc9fc620cda0d3bca729028327b67feca5692ae68bec71779441878"
          onEditPress={() => console.log('Edit Profile Picture')}
        />

        {/* Certificate of Registration Section */}
        <View style={styles.certificateCard}>
          <Text style={styles.certificateTitle}>Certificate</Text>
          <View style={styles.certificateImageContainer}>
            <Image
              source={{ uri: 'https://example.com/certificate-image.jpg' }} // Replace with actual image URL
              style={styles.certificateImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.certificateSubtitle}>Certification of Registration</Text>
          <Text style={styles.certificateSubtitle}>Security Officer</Text>
          <View style={styles.certificateInfoContainer}>
            <Text style={styles.certificateInfoText}>This certificate certifies that</Text>
            <View style={styles.certificateInfoRow}>
              <Text style={styles.certificateInfoLabel}>ID Number:</Text>
              <Text style={styles.certificateInfoValue}>8209166077088</Text>
            </View>
            <View style={styles.certificateInfoRow}>
              <Text style={styles.certificateInfoLabel}>PSiRA Reg Number:</Text>
              <Text style={styles.certificateInfoValue}>8182838485</Text>
            </View>
            <View style={styles.certificateInfoRow}>
              <Text style={styles.certificateInfoLabel}>Date of Registration:</Text>
              <Text style={styles.certificateInfoValue}>30 June 2007</Text>
            </View>
            <Text style={styles.certificateInfoText}>
              Is duly registered as a security provider as contemplated in terms of section 21 of the
              Private Security Industry Regulation Act 2001 (Act no 56 of 2001).
            </Text>
            <View style={styles.certificateInfoRow}>
              <Text style={styles.certificateInfoLabel}>Recognised Training Qualification:</Text>
              <Text style={styles.certificateInfoValue}>GRADE A</Text>
            </View>
          </View>
          <View style={styles.certificateFooter}>
            <Text style={styles.certificateFooterText}>Date of Issue: 30 Mar 2017</Text>
            <Text style={styles.certificateFooterText}>Valid Until: 31 Aug 2024</Text>
            <Text style={styles.certificateFooterText}>Certificate Number: SZA789T21</Text>
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTptxKwAtxb1bWCfw_epSC7ZIkl422aJ24xhQ&s' }} // Replace with actual QR code URL
              style={styles.qrCode}
            />
          </View>
          <Text style={styles.certificateNotice}>
            This digital certificate remains the property of PSiRA and must be authenticated at all times using the QR code or go to
            https://www.psira.co.za
          </Text>
        </View>

        {/* Firearm License Section */}
        <View style={styles.firearmLicenseCard}>
          <Text style={styles.firearmLicenseTitle}>Firearm License</Text>
          <Text style={styles.firearmLicenseSubtitle}>License to possess a firearm</Text>
          <Text style={styles.firearmLicenseSubtitle}>Firearms Control Act: 60 of 2000</Text>
          <View style={styles.firearmInfoContainer}>
            <View style={styles.firearmInfoRow}>
              <Text style={styles.firearmInfoLabel}>ID Number:</Text>
              <Text style={styles.firearmInfoValue}>8209166077088</Text>
            </View>
            <View style={styles.firearmInfoRow}>
              <Text style={styles.firearmInfoLabel}>Section:</Text>
              <Text style={styles.firearmInfoValue}>13</Text>
            </View>
            <View style={styles.firearmInfoRow}>
              <Text style={styles.firearmInfoLabel}>Name:</Text>
              <Text style={styles.firearmInfoValue}>H. Jones</Text>
            </View>
            <View style={styles.firearmInfoRow}>
              <Text style={styles.firearmInfoLabel}>Date of Birth:</Text>
              <Text style={styles.firearmInfoValue}>14 Sep 2008</Text>
            </View>
            <View style={styles.firearmInfoRow}>
              <Text style={styles.firearmInfoLabel}>Valid Until:</Text>
              <Text style={styles.firearmInfoValue}>13 Sep 2024</Text>
            </View>
          </View>
          <View style={styles.firearmLicenseFooter}>
            <View style={styles.firearmLicenseFooterRow}>
              <Text style={styles.firearmLicenseFooterText}>Serial Number: BSE100</Text>
              <Text style={styles.firearmLicenseFooterText}>Make: GLOCK</Text>
            </View>
            <View style={styles.firearmLicenseFooterRow}>
              <Text style={styles.firearmLicenseFooterText}>Type: Handgun</Text>
              <Text style={styles.firearmLicenseFooterText}>Model: 34</Text>
            </View>
          </View>
        </View>

        {/* Add other sections here, similar to above */}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  certificateCard: {
    backgroundColor: '#3E3E3E',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center', // Center content inside card
  },
  certificateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  certificateImageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  certificateImage: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  certificateSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  certificateInfoContainer: {
    width: '100%',
    marginVertical: 10,
  },
  certificateInfoText: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    marginVertical: 5,
  },
  certificateInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  certificateInfoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  certificateInfoValue: {
    fontSize: 14,
    color: '#FFF',
  },
  certificateFooter: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  certificateFooterText: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
  },
  qrCode: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  certificateNotice: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  firearmLicenseCard: {
    backgroundColor: '#3E3E3E',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  firearmLicenseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  firearmLicenseSubtitle: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  firearmInfoContainer: {
    width: '100%',
    marginVertical: 10,
  },
  firearmInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  firearmInfoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  firearmInfoValue: {
    fontSize: 14,
    color: '#FFF',
  },
  firearmLicenseFooter: {
    width: '100%',
    marginTop: 10,
  },
  firearmLicenseFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  firearmLicenseFooterText: {
    fontSize: 14,
    color: '#FFF',
  },
});

export default MyProfileScreen;
