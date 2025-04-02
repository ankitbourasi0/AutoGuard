import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '../components/ScreenWrapper';
import HeaderText from '../utils/HeaderText'; // Assuming you have a common header component
import { NavigationProps } from '../types/navigation';

const CrimeSceneInfo: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("CrimeSceneMain")}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <HeaderText title="Crime Scene Security Protocol" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Secure the Area */}
        <Text style={styles.sectionTitle}>Crime Scene Security Protocol For Security Officers</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.boldText}>1. Secure the Area</Text>
          {"\n"}- Immediately cordon off the crime scene using tape or barriers to prevent unauthorized access.
          {"\n"}- Establish a perimeter that is wide enough to protect all potential evidence.
        </Text>
        
        {/* Prevent Contamination */}
        <Text style={styles.sectionText}>
          <Text style={styles.boldText}>2. Prevent Contamination</Text>
          {"\n"}- Do not touch, move, or disturb any objects within the crime scene.
          {"\n"}- Avoid walking through the crime scene unless absolutely necessary.
        </Text>
        
        {/* Control Access */}
        <Text style={styles.sectionText}>
          <Text style={styles.boldText}>3. Control Access</Text>
          {"\n"}- Only allow authorized personnel (police, forensic experts) to enter the crime scene.
          {"\n"}- Maintain a log of all individuals who enter and exit the crime scene, noting their time of entry and exit.
        </Text>

        {/* Documentation */}
        <Text style={styles.sectionText}>
          <Text style={styles.boldText}>4. Documentation</Text>
          {"\n"}- Take photos and videos of the crime scene only if explicitly instructed by the police or forensic team.
          {"\n"}- Ensure all documentation (photos, videos) is handled with care and submitted to the authorities.
        </Text>

        {/* Interfere with Investigations */}
        <Text style={styles.sectionText}>
          <Text style={styles.boldText}>5. Interfere with Investigations</Text>
          {"\n"}- Do not interfere with the investigations conducted by the South African Police Service (SAPS) or other investigative authorities.
          {"\n"}- Cooperate fully with all instructions and requests from the investigating officers.
        </Text>

        {/* Communication */}
        <Text style={styles.sectionText}>
          <Text style={styles.boldText}>6. Communication</Text>
          {"\n"}- Do not discuss the details of the crime scene with unauthorized personnel or the public.
          {"\n"}- Do not share any images, videos, or information related to the crime scene on public platforms, including social media.
        </Text>

        {/* Preserve Evidence */}
        <Text style={styles.sectionText}>
          <Text style={styles.boldText}>7. Preserve Evidence</Text>
          {"\n"}- If you identify potential evidence, do not touch it. Instead, notify the investigative team immediately.
          {"\n"}- Protect any evidence from environmental factors (rain, wind) by covering it without disturbing its position.
        </Text>

        {/* Safety */}
        <Text style={styles.sectionText}>
          <Text style={styles.boldText}>8. Safety</Text>
          {"\n"}- Ensure the safety of all personnel by maintaining a secure and controlled environment.
          {"\n"}- Be vigilant for any hazards or potential threats within or around the crime scene.
        </Text>

        {/* Report */}
        <Text style={styles.sectionText}>
          <Text style={styles.boldText}>9. Report</Text>
          {"\n"}- Report any suspicious activity or individuals to the investigating officers immediately.
          {"\n"}- Document and report any breaches of the crime scene perimeter or protocol.
        </Text>

        {/* Footer */}
        <Text style={styles.footerText}>
          By following these guidelines, security officers can help maintain the integrity of the crime scene and support the investigation process effectively.
        </Text>

        {/* Acknowledge Button */}
        <TouchableOpacity style={styles.acknowledgeButton} onPress={() => navigation.navigate("NewCrimeSceneBookEntry")}>
          <Text style={styles.acknowledgeText}>Acknowledge</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
  acknowledgeButton: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acknowledgeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default CrimeSceneInfo;
