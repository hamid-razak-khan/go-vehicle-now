
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type VehicleType = 'car' | 'bike' | 'scooter';

export type Vehicle = {
  id: string;
  name: string;
  type: VehicleType;
  pricePerHour: number;
  isAvailable: boolean;
  imageUrl?: string;
  description?: string;
};

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  isSelected: boolean;
}

const VehicleTypeIcon: React.FC<{ type: VehicleType }> = ({ type }) => {
  switch (type) {
    case 'car':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.9 2 11 2 11.3V16c0 .6.4 1 1 1h2"/>
          <circle cx="7" cy="17" r="2"/>
          <path d="M9 17h6"/>
          <circle cx="17" cy="17" r="2"/>
        </svg>
      );
    case 'bike':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="15" r="4"/>
          <circle cx="18" cy="15" r="4"/>
          <path d="M6 15 9 3h7l-3 6H7l-4 6"/>
          <path d="m18 15-3-6"/>
        </svg>
      );
    case 'scooter':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7" cy="17" r="2"/>
          <circle cx="17" cy="17" r="2"/>
          <path d="M12 17h2l3-5h2a2 2 0 0 0 0-4h-4l-3 5H6a2 2 0 0 0-2 2v2h8"/>
        </svg>
      );
    default:
      return null;
  }
};

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect, isSelected }) => {
  const { name, type, pricePerHour, isAvailable, description } = vehicle;
  
  const typeColor = {
    car: 'bg-blue-100 text-blue-800',
    bike: 'bg-green-100 text-green-800',
    scooter: 'bg-purple-100 text-purple-800'
  };
  
  return (
    <Card className={`transition-all duration-300 ${isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">
              <VehicleTypeIcon type={type} />
            </span>
            {name}
          </CardTitle>
          <Badge className={typeColor[type]}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        {description && <p className="text-muted-foreground text-sm mb-2">{description}</p>}
        <div className="flex justify-between items-center">
          <div className="font-medium">
            ${pricePerHour} <span className="text-sm text-muted-foreground">per hour</span>
          </div>
          <Badge variant={isAvailable ? "outline" : "secondary"}>
            {isAvailable ? 'Available' : 'Unavailable'}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onSelect(vehicle)} 
          className="w-full"
          disabled={!isAvailable}
          variant={isSelected ? "default" : "outline"}
        >
          {isSelected ? 'Selected' : 'Select Vehicle'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
