'use client';

import React, { useState,useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'leaflet/dist/leaflet.css';
import Button from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { ChevronLeft, Bell, Search, MapPin, Clock, Plus } from 'lucide-react';

// Leaflet icon fix
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const LocationMarker = ({ location, setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return location.lat && location.lng ? (
    <Marker position={[location.lat, location.lng]}>
      <Popup>
        Selected Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
      </Popup>
    </Marker>
  ) : null;
};

export default function BookingScreen({ title = 'Booking', addons = [], recurring = 'Weekly' }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('12:00 AM');
  const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const [selectedAddons, setSelectedAddons] = useState({});

  // Initialize selectedAddons when the component mounts or addons change
  useEffect(() => {
    const initialAddonsState = addons.reduce((acc, { key }) => {
      acc[key] = false; // Default state: all toggles off
      return acc;
    }, {});
    setSelectedAddons(initialAddonsState);
  }, [addons]);

  const handleAddonChange = (addonKey) => {
    setSelectedAddons((prev) => ({ ...prev, [addonKey]: !prev[addonKey] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
        <header className="relative px-6 py-4 bg-blue-600 text-white">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-blue-700"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-2xl font-bold text-center">{title}</h2>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-8">
          {/* Calendar Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">When do you want us to come?</h3>
            <div className="bg-white rounded-lg shadow p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
          </section>

          {/* Time Picker Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Pick a time</h3>
            <div className="bg-white p-4 rounded-lg shadow">
              <TimePicker
                onChange={setTime}
                value={time}
                disableClock
                format="h:mm a"
                className="w-full"
              />
            </div>
          </section>

          {/* Map Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Where are you located?</h3>
            <div className="map-wrapper h-64 w-full rounded-lg overflow-hidden relative z-0">
              <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker location={location} setLocation={setLocation} />
              </MapContainer>
            </div>
          </section>

         
          {/* Add-ons Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Add-ons</h3>
            <div className="space-y-2">
              {addons.map(({ label, key }) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label htmlFor={key} className="text-sm font-medium text-gray-700">
                    {label}
                  </Label>
                  <Switch
                    id={key}
                    checked={selectedAddons[key] || false}
                    onCheckedChange={() => handleAddonChange(key)}
                  />
                </div>
              ))}
            </div>
          </section>


          {/* Summary Section
          <section className="bg-blue-50 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Service Summary</h3>
            <div className="space-y-2">
              <p className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                {`Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}`}
              </p>
              <p className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                {date?.toDateString()}, {time}
              </p>
              <p className="flex items-center text-gray-600">
                <Plus className="h-5 w-5 mr-2 text-blue-500" />
                Recurring: {recurring}
              </p>
            </div>
          </section> */}

          <Button className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105">
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
