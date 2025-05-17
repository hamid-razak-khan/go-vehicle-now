
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Vehicle = {
  id: string;
  lat: number;
  lng: number;
  type: 'car' | 'bike' | 'scooter';
  name: string;
  pricePerHour: number;
  isAvailable: boolean;
};

type MapViewProps = {
  onVehicleSelect?: (vehicle: Vehicle) => void;
  selectedVehicle?: Vehicle | null;
  userType?: 'customer' | 'provider';
};

const dummyVehicles: Vehicle[] = [
  {
    id: '1',
    lat: 40.7128,
    lng: -74.006,
    type: 'car',
    name: 'Tesla Model S',
    pricePerHour: 25,
    isAvailable: true
  },
  {
    id: '2',
    lat: 40.7148,
    lng: -74.008,
    type: 'car',
    name: 'BMW X5',
    pricePerHour: 22,
    isAvailable: true
  },
  {
    id: '3',
    lat: 40.7118,
    lng: -74.002,
    type: 'bike',
    name: 'Mountain Bike',
    pricePerHour: 8,
    isAvailable: true
  },
  {
    id: '4',
    lat: 40.7158,
    lng: -74.012,
    type: 'scooter',
    name: 'Electric Scooter',
    pricePerHour: 10,
    isAvailable: true
  },
  {
    id: '5',
    lat: 40.7108,
    lng: -73.998,
    type: 'car',
    name: 'Honda Civic',
    pricePerHour: 15,
    isAvailable: false
  }
];

const MapView: React.FC<MapViewProps> = ({ 
  onVehicleSelect, 
  selectedVehicle,
  userType = 'customer'
}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(dummyVehicles);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<{[key: string]: google.maps.Marker}>({});
  
  useEffect(() => {
    // Load Google Maps script
    if (!document.getElementById('google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      document.body.appendChild(script);
      
      return () => {
        if (document.getElementById('google-maps-script')) {
          document.getElementById('google-maps-script')?.remove();
        }
      };
    } else {
      setMapLoaded(true);
    }
  }, []);
  
  useEffect(() => {
    if (!mapLoaded || !window.google) return;
    
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 14,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
    };
    
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    mapRef.current = new google.maps.Map(mapElement, mapOptions);
    
    // Add markers for each vehicle
    vehicles.forEach(vehicle => {
      const markerColor = vehicle.isAvailable ? 
        (vehicle.type === 'car' ? 'blue' : vehicle.type === 'bike' ? 'green' : 'purple') : 
        'gray';
      
      const marker = new google.maps.Marker({
        position: { lat: vehicle.lat, lng: vehicle.lng },
        map: mapRef.current,
        title: vehicle.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: markerColor,
          fillOpacity: 0.8,
          strokeWeight: 2,
          strokeColor: 'white',
        },
      });
      
      // Add click listener to marker
      if (userType === 'customer' && onVehicleSelect && vehicle.isAvailable) {
        marker.addListener('click', () => {
          onVehicleSelect(vehicle);
          
          // Highlight selected marker
          Object.values(markersRef.current).forEach(m => {
            m.setIcon({
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: m === marker ? '#FF5722' : markerColor,
              fillOpacity: 0.8,
              strokeWeight: 2,
              strokeColor: 'white',
            });
          });
        });
      }
      
      markersRef.current[vehicle.id] = marker;
    });
    
    // If a vehicle is already selected, highlight it
    if (selectedVehicle && markersRef.current[selectedVehicle.id]) {
      const marker = markersRef.current[selectedVehicle.id];
      marker.setIcon({
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#FF5722',
        fillOpacity: 0.8,
        strokeWeight: 2,
        strokeColor: 'white',
      });
    }
    
    // Cleanup function
    return () => {
      Object.values(markersRef.current).forEach(marker => {
        marker.setMap(null);
      });
      markersRef.current = {};
    };
  }, [mapLoaded, vehicles, onVehicleSelect, selectedVehicle, userType]);

  return (
    <Card className="shadow-md h-[500px] w-full">
      <CardHeader className="pb-0">
        <CardTitle className="flex justify-between items-center">
          <span>Available Vehicles</span>
          <div className="flex space-x-2">
            <Badge variant="outline" className="bg-blue-100">Cars</Badge>
            <Badge variant="outline" className="bg-green-100">Bikes</Badge>
            <Badge variant="outline" className="bg-purple-100">Scooters</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 h-[calc(100%-80px)]">
        <div 
          id="map" 
          className="rounded-md h-full w-full"
          style={{ 
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {!mapLoaded && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4">Loading map...</p>
              <p className="text-sm text-muted-foreground mt-2">
                Note: This is a demo with a missing API key.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;
