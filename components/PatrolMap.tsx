import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Polyline, Region, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';

const dummyShiftLocation: LatLng = {
  latitude: 37.78825,
  longitude: -122.4324,
};

// More detailed patrol path
const dummyPatrolPath: LatLng[] = [
  { latitude: 37.78825, longitude: -122.4324 }, // Start (can be same as shift location)
  { latitude: 37.78900, longitude: -122.43320 }, // Point 1
  { latitude: 37.78980, longitude: -122.43200 }, // Point 2
  { latitude: 37.78950, longitude: -122.43100 }, // Point 3
  { latitude: 37.78850, longitude: -122.43050 }, // Point 4 (end)
];

export default function PatrolMap(): JSX.Element {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentPatrolTargetIndex, setCurrentPatrolTargetIndex] = useState<number>(0);
  // State to track if patrol has started
  const [isPatrolActive, setIsPatrolActive] = useState<boolean>(false);

  // State to track if location permissions are granted
  const [locationPermissionGranted, setLocationPermissionGranted] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      } else {
        setLocationPermissionGranted(true);
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      // Optionally, start watching location updates here for real-time tracking
    })();
  }, []);

  const handleClockIn = (): void => {
    Alert.alert('✅ Clocked In', 'Guard clocked in successfully.');
  };

  const handleStartPatrol = (): void => {
    if (dummyPatrolPath.length > 0) {
      setCurrentPatrolTargetIndex(0); // Start with the first point in the path
      setIsPatrolActive(true); // Set patrol as active
      Alert.alert('🚶‍♂️ Patrol Started', 'Guard has started patrol. Follow the marked path.');
    } else {
      Alert.alert('⚠️ No Patrol Path', 'Cannot start patrol, no path defined.');
    }
  };

  // Simulate advancing to the next patrol point
  const advancePatrolPoint = () => {
    setCurrentPatrolTargetIndex(prevIndex => {
      if (prevIndex < dummyPatrolPath.length - 1) {
        return prevIndex + 1;
      }
      // When patrol is complete
      Alert.alert('🎉 Patrol Complete!', 'You have reached the end of the patrol path.');
      setIsPatrolActive(false); // Set patrol as inactive
      // Optionally reset currentPatrolTargetIndex or handle end-of-patrol state
      return prevIndex; // Stay at the last point or reset as needed
    });
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView // Add `showsUserLocation={true}` if you want the default blue dot
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.009, // Adjusted for a slightly wider view of the patrol area
            longitudeDelta: 0.009,
          }}
        >
          {/* Current Location */}
          <Marker
            // Use the actual location state for the guard's position
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="You are here"
            description="Your current location"
            pinColor="blue"
          />


          {/* Shift Location */}
          <Marker
            coordinate={dummyShiftLocation}
            title="Shift Base"
            description="Your designated shift starting point"
            pinColor="green"
          />

          {/* Patrol Path */}
          <Polyline
            coordinates={dummyPatrolPath}
            strokeColor="#FF0000" // Red color for the path
            strokeWidth={3}
          />

          {/* Markers for each point in the patrol path */}
          {dummyPatrolPath.map((point, index) => (
            <Marker
              key={`patrol-point-${index}`}
              coordinate={point}
              title={`Patrol Point ${index + 1}`}
              description={index === currentPatrolTargetIndex ? "Next Stop" : (index < currentPatrolTargetIndex ? "Visited" : "Upcoming")}
            >
              <View style={[styles.patrolPointMarkerBase, index === currentPatrolTargetIndex ? styles.currentTargetMarker : (index < currentPatrolTargetIndex ? styles.visitedTargetMarker : styles.upcomingTargetMarker)]}>
                <Text style={styles.patrolPointText}>{index + 1}</Text>
              </View>
            </Marker>
          ))}
        </MapView>
      ) : (
        <Text style={styles.loadingText}>
          {errorMsg ? errorMsg : 'Fetching location...'}
        </Text>
      )}

      <View style={styles.controls}>
        {/* Clock In button - maybe only show if not clocked in */}
        <Button title="Clock In" onPress={handleClockIn} disabled={!locationPermissionGranted} />
        <View style={{ marginVertical: 5 }} />

        {/* Start Patrol button - only show if clocked in and patrol not active */}
        {!isPatrolActive && locationPermissionGranted && (
           <Button title="Start Patrol" onPress={handleStartPatrol} />
        )}

        {/* Button to simulate reaching the next point (for development/testing) */}
        {isPatrolActive && currentPatrolTargetIndex < dummyPatrolPath.length - 1 && (
          <>
            <View style={{ marginVertical: 5 }} />
            <Button title={`Simulate Reached Point ${currentPatrolTargetIndex + 1}`} onPress={advancePatrolPoint} />
          </>
        )}
        {isPatrolActive && currentPatrolTargetIndex === dummyPatrolPath.length - 1 && (
           <Text style={styles.patrolCompleteText}>Patrol path finished!</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loadingText: { marginTop: 50, textAlign: 'center', fontSize: 16 },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center', // Center buttons horizontally
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  patrolPointMarkerBase: {
    paddingHorizontal: 7, // Slightly less padding
    paddingVertical: 4,   // Slightly less padding
    borderRadius: 15, // Make it rounder
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upcomingTargetMarker: { // Points after the current target
    backgroundColor: 'rgba(220, 0, 0, 0.8)', // Darker Red for upcoming
  },
  currentTargetMarker: {
    backgroundColor: 'rgba(255, 140, 0, 0.9)', // Dark Orange for current target
    transform: [{ scale: 1.2 }], // Make it slightly bigger
  },
  visitedTargetMarker: {
    backgroundColor: 'rgba(0, 128, 0, 0.8)', // Green for visited
  },
  patrolPointText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10, // Smaller text for the numbers
  },
  patrolCompleteText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});
