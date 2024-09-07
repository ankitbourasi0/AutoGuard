import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '../components/ScreenWrapper'; // Assuming you have a ScreenWrapper component
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';
import { ScrollView } from 'react-native-gesture-handler';

const ObBookInformation: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [showModal, setShowModal] = useState(false);

  const handleAcknowledge = () => {
    setShowModal(false);
    navigation.navigate("NewCrimeSceneBookEntry")
  };

  const handleAccept = () => {
    setShowModal(true);
  };

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("ObservationBookMain")} style={styles.backButton}>
            <Icon name="arrow-back-outline" size={24} color="#3E3E3E" />
          </TouchableOpacity>
          <Text style={styles.title}>Standing Instructions For All Security Officers On Site</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.sectionTitle}>These instructions apply to all personnel on all sites. The act of signing on duty at the beginning of each shift certifies that these standing instructions have been read and that they are known and understood.</Text>

          <Text style={styles.subtitle}>DO:</Text>
          <Text style={styles.text}>1. Read, understand and obey the job description (site Instructions) for the post.</Text>
          <Text style={styles.text}>2. Sign on duty in the occurrence Book (OB) at the beginning of each shift and off duty when relieved or leaving the site.</Text>
          <Text style={styles.text}>3. Be on duty in full, clean, correct uniform 10 min before the duty shift starts.</Text>
          <Text style={styles.text}>4. Keep all gates closed and locked when they are not used or attended.</Text>
          <Text style={styles.text}>5. Perform a careful perimeter patrol of the premises at the beginning and end of each duty shift.</Text>
          <Text style={styles.text}>6. Report all unusual occurrences to the Control Room and record them in the OB.</Text>
          <Text style={styles.text}>7. Notify the Controller if your relief has not arrived 10 minutes before he is due.</Text>
          <Text style={styles.text}>8. Ensure that the Guard Room is neat and clean.</Text>
          <Text style={styles.text}>9. Apply for leave at your Branch Office or on Auto Guard mobile application.</Text>
          <Text style={styles.text}>10. Submit sick leave certificate within 24 hours of recommencing duty after being off sick.</Text>

          <Text style={styles.subtitle}>DO NOT:</Text>
          <Text style={styles.text}>1. Come on duty under the influence of drugs or alcohol and do not consume drugs or alcohol on, at or near a client premises.</Text>
          <Text style={styles.text}>2. Leave your post unattended during the course of your dirty shift or until relieved.</Text>
          <Text style={styles.text}>3. Sleep on duty.</Text>
          <Text style={styles.text}>4. Get into or move any vehicle or machinery belonging to a client on, at or near a client’s premises.</Text>
          <Text style={styles.text}>5. Light any fires on, at or near a client's premises.</Text>
          <Text style={styles.text}>6. Swing gates or booms open or closed; keep them under control at all times.</Text>
          <Text style={styles.text}>7. Remove any keys from designated clock points or interfere with or damage any patrol system equipment.</Text>
          <Text style={styles.text}>8. Interfere with or damage any client's equipment.</Text>
          <Text style={styles.text}>9. Take any equipment from a client's premises.</Text>
          <Text style={styles.text}>10. Make unauthorized phone calls.</Text>
          <Text style={styles.text}>11. Be absent from your work without permission.</Text>
          <Text style={styles.text}>12. Leave your post unless the reliever has arrived.</Text>
          <Text style={styles.text}>13. Borrow any money from the client or his employees.</Text>

          <Text style={styles.subtitle}>NATURE OF OFFENCE:</Text>
          <Text style={styles.text}>1. Low productivity, unsatisfactory performance, loitering at work.</Text>
          <Text style={styles.text}>2. Late arrival or early departure.</Text>
          <Text style={styles.text}>3. Creating/contributing to unacceptable working conditions/environment.</Text>
          <Text style={styles.text}>4. Failure to obey instructions.</Text>
          <Text style={styles.text}>5. Disregard of Company/Client rules & regulations.</Text>
          <Text style={styles.text}>6. Wastage of materials.</Text>
          <Text style={styles.text}>7. Failure to maintain work standards (incompetence).</Text>
          <Text style={styles.text}>8. Negligence in performance of duty.</Text>
          <Text style={styles.text}>9. Failure to report an accident or damage to Company/Clients property.</Text>
          <Text style={styles.text}>10. Not wearing full company uniform when on duty.</Text>
          <Text style={styles.text}>11. Use of abusive and/or obscene language.</Text>
          <Text style={styles.text}>12. Sleeping on duty.</Text>
          <Text style={styles.text}>13. Absence from work without reason.</Text>
          <Text style={styles.text}>14. Insubordination, refusal to carry out or obey legitimate instructions.</Text>
          <Text style={styles.text}>15. Failure to comply with health/fire/safety regulations.</Text>
          <Text style={styles.text}>16. Possession of drugs/alcohol on Company/Clients premises.</Text>
          <Text style={styles.text}>17. Being under the influence of drugs or alcohol whilst on duty.</Text>
          <Text style={styles.text}>18. Possession of a fire-arm/dangerous weapon on Company/Clients premises without prior permission.</Text>
          <Text style={styles.text}>19. Defacement of Company/Clients premises/property/notice board/documents/books.</Text>
          <Text style={styles.text}>20. Interference with/disruption of work of other employees.</Text>

          <TouchableOpacity onPress={handleAccept} style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>

        {/* Modal */}
        {showModal && (
          <Modal transparent={true} animationType="fade" visible={showModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Note</Text>
                <Text style={styles.modalText}>
                  Accepting the given instructions makes you responsible for following them and accountable for any consequences if you do not!
                </Text>
                <TouchableOpacity onPress={handleAcknowledge} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Acknowledge</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E3E3E',
    textAlign: 'center',
    flex: 1,
  },
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  acceptButton: {
    backgroundColor: '#3E3E3E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  acceptButtonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#3E3E3E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ObBookInformation;
