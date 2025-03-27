import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPin, X } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const locations = [
  {
    id: 1,
    name: "Hash Gaming Andheri",
    address: "Shop 123, Link Road, Andheri West",
    latitude: 19.1136,
    longitude: 72.8697,
    features: ["24/7 Open", "20 Gaming Stations", "Tournament Area"]
  },
  {
    id: 2,
    name: "Hash Gaming Bandra",
    address: "Plot 45, Hill Road, Bandra West",
    latitude: 19.0596,
    longitude: 72.8295,
    features: ["Premium Lounge", "15 Gaming Stations", "Cafe"]
  },
  {
    id: 3,
    name: "Hash Gaming Powai",
    address: "Tower 3, Hiranandani Gardens",
    latitude: 19.1273,
    longitude: 72.9149,
    features: ["VR Zone", "18 Gaming Stations", "Pro Setup"]
  }
];

// Component to handle map center changes
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

interface LocationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationOverlay({ isOpen, onClose }: LocationOverlayProps) {
  const [selectedLocation, setSelectedLocation] = React.useState<number | null>(null);
  const [center, setCenter] = React.useState<[number, number]>([19.0760, 72.8777]);
  const [zoom, setZoom] = React.useState(11);

  const handleLocationSelect = (location: typeof locations[0]) => {
    setSelectedLocation(location.id);
    setCenter([location.latitude, location.longitude]);
    setZoom(14);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black/80 rounded-2xl w-full max-w-6xl overflow-hidden border border-[#00FF00]/20"
          >
            <div className="p-6 flex justify-between items-center border-b border-[#00FF00]/20">
              <h2 className="text-2xl font-bold text-white">Our Gaming Locations</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
            
            <div className="flex flex-col md:flex-row h-[600px]">
              <div className="w-full md:w-1/3 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {locations.map((location) => (
                    <motion.div
                      key={location.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedLocation === location.id
                          ? 'bg-[#00FF00]/20 border-[#00FF00]'
                          : 'bg-white/5 border-transparent'
                      } border`}
                      onClick={() => handleLocationSelect(location)}
                    >
                      <h3 className="text-lg font-bold text-white mb-2">{location.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{location.address}</p>
                      <div className="flex flex-wrap gap-2">
                        {location.features.map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 rounded-full bg-[#00FF00]/10 text-[#00FF00]"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 relative">
                <MapContainer
                  center={center}
                  zoom={zoom}
                  style={{ width: '100%', height: '100%' }}
                  zoomControl={false}
                >
                  <ChangeView center={center} zoom={zoom} />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {locations.map((location) => (
                    <Marker
                      key={location.id}
                      position={[location.latitude, location.longitude]}
                      eventHandlers={{
                        click: () => handleLocationSelect(location),
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold">{location.name}</h3>
                          <p className="text-sm">{location.address}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}