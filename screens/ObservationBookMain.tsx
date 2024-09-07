// CrimeSceneMain.tsx
import React from 'react';
import { View } from 'react-native';
import CommonBook from '../components/CommonBook';

const ObservationBookMain: React.FC = () => {
  return (
  
      <CommonBook
        headerTitle='Observation Book'
        newEntryTitle='New Entry'
        newEntryDescription='Make new Observation Book entry'
        newEntryNavigation={{ name: "ObBookInformation" }}
        allEntryTitle='All Entries'
        allEntryDescription='View All your Observation Book entries'
        allEntriesNavigation={{ name: "AllObservationBooksEntries" }}
      />

  );
};

export default ObservationBookMain;
