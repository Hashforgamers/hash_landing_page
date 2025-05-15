import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Users, Clock, Gamepad, Store, MapPin, Wifi, Coffee, Upload, DollarSign } from 'lucide-react';
import { supabase } from './supabaseClient' // adjust the path as needed
import emailjs from "emailjs-com";

interface PreRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreRegistrationForm: React.FC<PreRegistrationFormProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formError, setFormError] = useState('');
  const [isPlayerForm, setIsPlayerForm] = useState(true);
  const [formData, setFormData] = useState({

    // Player form data
    fullName: '',
    phone: '',
    email: '',
    city: '',
    preferredCafe: '',
    gamingType: [],
    favoriteGames: [],
    peakHours: '',
    groupSize: '1',
    
    // Café form data
    cafeName: '',
    ownerName: '',
    cafePhone: '',
    cafeEmail: '',
    cafeLocation: '',
    googleMapsLink: '',
    gamingTypes: [],
    totalStations: '',
    hasHighSpeedInternet: false,
    pcGamingRate: '0',
    ps5Rate: '0',
    xboxRate: '0',
    vrRate: '0',
    mobileRate: '0',
    peakHoursDetails: '',
    hasDiscounts: false,
    hasMemberships: false,
    additionalServices: [],
    willingToPartner: false,
    willingToDiscount: false,
    cafeImages: [] as File[]
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    let insertError = null;
    let groupSize = null;

    if (isPlayerForm) {
      groupSize = formData.groupSize === '5+' ? 5 : parseInt(formData.groupSize.split('-')[0], 10);

      const playerPayload = {
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        preferred_cafe: formData.preferredCafe || null,
        gaming_type: formData.gamingType.length ? formData.gamingType : null,
        favorite_games: formData.favoriteGames.length ? formData.favoriteGames : null,
        peak_hours: formData.peakHours ? [formData.peakHours] : null,
        group_size: groupSize
      };

      const { error } = await supabase.from('player_registrations').insert([playerPayload]);
      insertError = error;

      if (error) {
        console.error('Error inserting player data:', error);
        return;
      }

      console.log('✅ Player registration submitted successfully');
    } else {
      const cafePayload = {
        cafe_name: formData.cafeName,
        owner_name: formData.ownerName,
        cafe_phone: formData.cafePhone,
        cafe_email: formData.cafeEmail,
        location: formData.cafeLocation,
        google_maps_link: formData.googleMapsLink,
        gaming_types: formData.gamingTypes.length ? formData.gamingTypes : null,
        total_stations: formData.totalStations ? parseInt(formData.totalStations, 10) : null,
        has_high_speed_internet: formData.hasHighSpeedInternet,
        pc_gaming_rate: formData.pcGamingRate || null,
        ps5_rate: formData.ps5Rate || null,
        xbox_rate: formData.xboxRate || null,
        vr_rate: formData.vrRate || null,
        mobile_rate: formData.mobileRate || null,
        peak_hours_details: formData.peakHoursDetails || null,
        has_discounts: formData.hasDiscounts,
        has_memberships: formData.hasMemberships,
        additional_services: formData.additionalServices.length ? formData.additionalServices : null,
        willing_to_partner: formData.willingToPartner,
        willing_to_discount: formData.willingToDiscount,
        cafe_images: formData.cafeImages.map(file => file.name)
      };

      const { error } = await supabase.from('cafe_registrations').insert([cafePayload]);
      insertError = error;

      if (error) {
        console.error('Error inserting café data:', error);
        return;
      }

      console.log('✅ Café registration submitted successfully');
    }

    if (!insertError) {
      const safeStr = (val: any) => (val == null ? "N/A" : String(val));

    const templateParams = isPlayerForm
      ? {
          name: safeStr(formData.fullName),
          email: safeStr(formData.email),
        }
      : {
          name: safeStr(formData.cafeName),
          email: safeStr(formData.cafeEmail),
        };

      await emailjs.send(
        'service_oqp55sh',
        'template_eegfj9b',
        templateParams,
        'oDRkZOrqmtQ1TpZHE'
      );
      console.log('Acknowledgment email sent!');
    }

    onClose();
  } catch (err) {
    console.error('❌ Unexpected error in form submission:', err);
  }
};


  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  const playerFormSteps = [
    {
      title: "Personal Information",
      icon: <Users className="w-6 h-6" />,
      fields: (
        <>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
                required
              />
            </div>
          </div>
        </>
      )
    },
    {
      title: "Location Preferences",
      icon: <Clock className="w-6 h-6" />,
      fields: (
        <>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">City / Area</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Gaming Café (Optional)</label>
              <input
                type="text"
                value={formData.preferredCafe}
                onChange={(e) => setFormData({ ...formData, preferredCafe: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
              />
            </div>
          </div>
        </>
      )
    },
    {
      title: "Gaming Preferences",
      icon: <Gamepad className="w-6 h-6" />,
      fields: (
        <>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Gaming Type</label>
            <div className="grid grid-cols-2 gap-3">
              {['PC Gaming', 'Console (PS5/Xbox)', 'VR Gaming', 'Mobile Esports'].map((type) => (
                <motion.button
                  key={type}
                  type="button" // Ensure it's a button, not a submit button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    // Prevent form submission behavior
                    e.preventDefault(); 

                    const types = formData.gamingType.includes(type)
                      ? formData.gamingType.filter(t => t !== type)
                      : [...formData.gamingType, type];
                    setFormData({ ...formData, gamingType: types });
                  }}
                  className={`p-3 rounded-lg border ${
                    formData.gamingType.includes(type)
                      ? 'border-[#FF0000] bg-[#FF0000]/20'
                      : 'border-white/20 hover:border-[#FF0000]/50'
                  } transition-all text-sm text-center`}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Favorite Games</label>
            <div className="grid grid-cols-2 gap-3">
              {['Valorant', 'CS2', 'FIFA', 'GTA V', 'Call of Duty', 'Fortnite', 'PUBG', 'Other'].map((game) => (
                <motion.button
                  key={game}
                  type="button" // Ensure it's a button, not a submit button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    // Prevent form submission behavior
                    e.preventDefault(); 

                    const games = formData.favoriteGames.includes(game)
                      ? formData.favoriteGames.filter(g => g !== game)
                      : [...formData.favoriteGames, game];
                    setFormData({ ...formData, favoriteGames: games });
                  }}
                  className={`p-3 rounded-lg border ${
                    formData.favoriteGames.includes(game)
                      ? 'border-[#FF0000] bg-[#FF0000]/20'
                      : 'border-white/20 hover:border-[#FF0000]/50'
                  } transition-all text-sm text-center`}
                >
                  {game}
                </motion.button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Peak Gaming Hours</label>
            <select
              value={formData.peakHours}
              onChange={(e) => setFormData({ ...formData, peakHours: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
            >
              <option value="">Select time</option>
              <option value="morning">Morning (6 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
              <option value="evening">Evening (5 PM - 10 PM)</option>
              <option value="night">Late Night (10 PM - 6 AM)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Group Size</label>
            <select
              value={formData.groupSize}
              onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
            >
              <option value="1">Solo Player</option>
              <option value="2">2 Players</option>
              <option value="3-4">3-4 Players</option>
              <option value="5+">5+ Players</option>
            </select>
          </div>
        </div>
        </>
      )
    }
  ];

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const isValidPhone = (phone: string) =>
    /^[6-9]\d{9}$/.test(phone); // Indian 10-digit mobile starting 6-9  

  const validatePlayerStep = () => {
    console.log("I am at step",step)
    switch (step) {
      case 1: // Personal Information
        return (
          formData.fullName?.trim() &&
          isValidEmail(formData.email) &&
          isValidPhone(formData.phone)
        );
  
      case 2: // city 
        return (
          formData.city?.trim()
        );
  
      case 3: // Account Setup
      {
        console.log('gamingType:', formData.gamingType);
        console.log('favoriteGames:', formData.favoriteGames);
        console.log('peakHours:', formData.peakHours);
      
        return (
          formData.gamingType && formData.gamingType.length > 0 &&
          formData.favoriteGames && formData.favoriteGames.length > 0 &&
          formData.peakHours && formData.peakHours.trim() !== ''
        );
      }
      default:
        return true;
    }
  };
  
  const validateCafeStep = () => {
    switch (step) {
      case 1: // Café Details
        return (
          formData.cafeName?.trim() &&
          formData.ownerName?.trim() &&
          formData.cafeLocation?.trim() &&
          isValidEmail(formData.cafeEmail) &&
          isValidPhone(formData.cafePhone)
        );
    
      case 2: // Gaming Setup
        return (
          formData.gamingTypes?.length > 0 &&
          formData.totalStations > 0 &&
          formData.hasHighSpeedInternet !== undefined
        );
    
      case 3: // Pricing & Services
        return (
          Number(formData.pcGamingRate) >= 0 &&
          Number(formData.ps5Rate) >= 0 &&
          Number(formData.xboxRate) >= 0 &&
          Number(formData.vrRate) >= 0 &&
          (formData.hasDiscounts !== undefined) &&
          (formData.hasMemberships !== undefined)
        );
    
      case 4: // Partnership
        return (
          formData.willingToPartner === true ||
          formData.willingToDiscount === true
        );
    
      default:
        return true;
    }
  };
  

  const cafeFormSteps = [
    {
      title: "Café Details",
      icon: <Store className="w-6 h-6" />,
      fields: (
        <>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Café Name</label>
              <input
                type="text"
                value={formData.cafeName}
                onChange={(e) => setFormData({ ...formData, cafeName: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Owner / Manager Name</label>
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Number</label>
              <input
                type="tel"
                value={formData.cafePhone}
                onChange={(e) => setFormData({ ...formData, cafePhone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={formData.cafeEmail}
                onChange={(e) => setFormData({ ...formData, cafeEmail: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Café Location</label>
              <input
                type="text"
                value={formData.cafeLocation}
                onChange={(e) => setFormData({ ...formData, cafeLocation: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
                required
                placeholder="Full address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Google Maps Link (Optional)</label>
              <input
                type="url"
                value={formData.googleMapsLink}
                onChange={(e) => setFormData({ ...formData, googleMapsLink: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
                placeholder="https://maps.google.com/..."
              />
            </div>
          </div>
        </>
      )
    },
    {
      title: "Gaming Setup",
      icon: <Gamepad className="w-6 h-6" />,
      fields: (
        <>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">Available Gaming Types</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'PC Gaming',
                  'PlayStation 5',
                  'Xbox Series X/S',
                  'VR Gaming',
                  'Mobile Esports',
                  'Streaming Setup'
                ].map((type) => (
                  <motion.button
                    key={type}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const types = formData.gamingTypes.includes(type)
                        ? formData.gamingTypes.filter(t => t !== type)
                        : [...formData.gamingTypes, type];
                      setFormData({ ...formData, gamingTypes: types });
                    }}
                    className={`p-3 rounded-lg border ${
                      formData.gamingTypes.includes(type)
                        ? 'border-[#FF0000] bg-[#FF0000]/20'
                        : 'border-white/20 hover:border-[#FF0000]/50'
                    } transition-all text-sm text-center`}
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Gaming Stations</label>
              <input
                type="number"
                value={formData.totalStations}
                onChange={(e) => setFormData({ ...formData, totalStations: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
                required
                min="1"
              />
            </div>
            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasHighSpeedInternet}
                  onChange={(e) => setFormData({ ...formData, hasHighSpeedInternet: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-[#FF0000] rounded border-[#FF0000]/20"
                />
                <span className="text-sm font-medium">High-Speed Internet Available</span>
              </label>
            </div>
          </div>
        </>
      )
    },
    {
      title: "Pricing & Services",
      icon: <DollarSign className="w-6 h-6" />,
      fields: (
        <>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">PC Gaming Rate (per hour)</label>
                <input
                  type="number"
                  value={formData.pcGamingRate}
                  onChange={(e) => setFormData({ ...formData, pcGamingRate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
                  placeholder="₹"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">PS5 Rate (per hour)</label>
                <input
                  type="number"
                  value={formData.ps5Rate}
                  onChange={(e) => setFormData({ ...formData, ps5Rate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
                  placeholder="₹"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Xbox Rate (per hour)</label>
                <input
                  type="number"
                  value={formData.xboxRate}
                  onChange={(e) => setFormData({ ...formData, xboxRate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
                  placeholder="₹"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">VR Gaming Rate (per hour)</label>
                <input
                  type="number"
                  value={formData.vrRate}
                  onChange={(e) => setFormData({ ...formData, vrRate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#FF0000]/20 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-all"
                  placeholder="₹"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3">Additional Services</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Food & Beverages',
                  'Private Gaming Rooms',
                  'Tournament Hosting',
                  'Streaming Setup',
                  'Team Training',
                  'Coaching Services'
                ].map((service) => (
                  <motion.button
                    key={service}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const services = formData.additionalServices.includes(service)
                        ? formData.additionalServices.filter(s => s !== service)
                        : [...formData.additionalServices, service];
                      setFormData({ ...formData, additionalServices: services });
                    }}
                    className={`p-3 rounded-lg border ${
                      formData.additionalServices.includes(service)
                        ? 'border-[#FF0000] bg-[#FF0000]/20'
                        : 'border-white/20 hover:border-[#FF0000]/50'
                    } transition-all text-sm text-center`}
                  >
                    {service}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasMemberships}
                  onChange={(e) => setFormData({ ...formData, hasMemberships: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-[#FF0000] rounded border-[#FF0000]/20"
                />
                <span className="text-sm font-medium">Membership Plans Available</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasDiscounts}
                  onChange={(e) => setFormData({ ...formData, hasDiscounts: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-[#FF0000] rounded border-[#FF0000]/20"
                />
                <span className="text-sm font-medium">Peak Hour Discounts Available</span>
              </label>
            </div>
          </div>
        </>
      )
    },
    {
      title: "Partnership",
      icon: <Users className="w-6 h-6" />,
      fields: (
        <>
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.willingToPartner}
                  onChange={(e) => setFormData({ ...formData, willingToPartner: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-[#FF0000] rounded border-[#FF0000]/20"
                />
                <span className="text-sm font-medium">Interested in Platform Partnership</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.willingToDiscount}
                  onChange={(e) => setFormData({ ...formData, willingToDiscount: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-[#FF0000] rounded border-[#FF0000]/20"
                />
                <span className="text-sm font-medium">Willing to Offer Early Registration Discounts</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Upload Café Images</label>
              <div className="space-y-2">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setFormData({ ...formData, cafeImages: files });
                  }}
                  className="hidden"
                  id="cafe-images"
                />
                <label
                  htmlFor="cafe-images"
                  className="flex items-center justify-center w-full p-4 border-2 border-dashed border-[#FF0000]/20 rounded-lg cursor-pointer hover:border-[#FF0000]/40 transition-all"
                >
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-[#FF0000]" />
                    <p className="text-sm font-medium">Click to upload café images</p>
                    <p className="text-xs text-gray-400 mt-1">Gaming setup, interior, etc.</p>
                  </div>
                </label>
                {formData.cafeImages.length > 0 && (
                  <p className="text-sm text-[#FF0000]">
                    {formData.cafeImages.length} image(s) selected
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )
    }
  ];

  const currentSteps = isPlayerForm ? playerFormSteps : cafeFormSteps;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            variants={modalVariants}
            className="bg-black/90 border border-[#FF0000]/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-[#FF0000]/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Gift className="w-6 h-6 text-[#FF0000]" />
                  <h2 className="text-xl font-bold">Pre-registration</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="mt-4 flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsPlayerForm(true);
                    setStep(1);
                  }}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                    isPlayerForm
                      ? 'bg-[#FF0000] text-black'
                      : 'border border-[#FF0000]/20 hover:border-[#FF0000]'
                  }`}
                >
                  Player Registration
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsPlayerForm(false);
                    setStep(1);
                  }}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                    !isPlayerForm
                      ? 'bg-[#FF0000] text-black'
                      : 'border border-[#FF0000]/20 hover:border-[#FF0000]'
                  }`}
                >
                  Café Registration
                </motion.button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  {currentSteps.map((s, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setStep(index + 1)}
                      className={`flex items-center space-x-2 ${
                        step === index + 1 ? 'text-[#FF0000]' : 'text-gray-400'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        step === index + 1 ? 'border-[#FF0000] bg-[#FF0000]/20' : 'border-gray-600'
                      }`}>
                        {s.icon}
                      </div>
                      <span className="hidden md:inline text-sm">{s.title}</span>
                    </motion.button>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={step}
                >
                  {currentSteps[step - 1].fields}
                </motion.div>

                {formError && (
                  <div className="mt-4 text-red-500 text-sm">{formError}</div> // Display error message
                )}
              </div>

              <div className="p-6 border-t border-[#FF0000]/20 flex justify-between">
                {step > 1 && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-2 rounded-full border border-[#FF0000]/20 hover:border-[#FF0000] transition-all"
                  >
                    Previous
                  </motion.button>
                )}
                <motion.button
                  type={step === currentSteps.length && (isPlayerForm ? validatePlayerStep() : validateCafeStep()) ? 'submit' : 'button'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const isValidStep = isPlayerForm ? validatePlayerStep() : validateCafeStep(); // Define isValidStep here

                    if (!isValidStep) {
                      setFormError('Please fill all required fields'); // Show error message if validation fails
                      console.error('Please complete this step before proceeding');
                      return; // Stop the flow if validation fails
                    } else {
                      setFormError(''); // Clear error if validation passes
                    }

                    if (step < currentSteps.length) {
                      setStep(step + 1);
                    }
                  }}
                  className="px-6 py-2 rounded-full bg-[#FF0000] text-black font-semibold ml-auto"
                >
                  {step === currentSteps.length ? 'Submit' : 'Next'}
                </motion.button>

              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreRegistrationForm;