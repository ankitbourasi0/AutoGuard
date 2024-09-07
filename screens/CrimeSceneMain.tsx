// CrimeSceneMain.tsx
import React from 'react';
import { View } from 'react-native';
import CommonBook from '../components/CommonBook';

const CrimeSceneMain: React.FC = () => {
  return (
      <CommonBook
        headerTitle='Crime Scene Book'
        newEntryTitle='New Entry'
        newEntryDescription='Make new Crime Scene Book entry'
        newEntryNavigation={{ name: "CrimeSceneInformation" }}
        allEntryTitle='All Entries'
        allEntryDescription='View All your Crime Scene Book entries'
        allEntriesNavigation={{ name: "AllCrimeSceneBookEntries" }}
      />
   
  );
};

export default CrimeSceneMain;
