import React from 'react';
import { Star, Phone, Award, Calendar, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import Button from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
const CleanerModal = ({ cleaner, isOpen, onClose, onSelect, isSelected }) => {
  if (!cleaner) return null;

  console.log("Cleaner object:", cleaner); // Debugging: Log the cleaner object

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${
            i <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white shadow-lg rounded-full border-[#4338E0]" style={{
        boxShadow: "0px 10px 15px rgba(67, 56, 224, 0.2)", // Custom drop shadow
      }}>
        <DialogHeader>
          <div className="flex items-center gap-3 border-b pb-2 mb-2">
            <img 
              src={cleaner.profileImage} 
              alt={cleaner.cleanerName}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <DialogTitle className="text-2xl font-semibold text-gray-800">
                {cleaner.cleanerName}
              </DialogTitle>
              <div className="flex items-center gap-1">
                {renderStars(cleaner.rating || 0)} {/* Fallback to 0 if rating is undefined */}
                <span className="text-sm font-medium text-gray-600 ml-1">
                  ({(cleaner.rating || 0).toFixed(1)}) {/* Fallback to 0 if rating is undefined */}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>{cleaner.phone}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <Award className="w-4 h-4 text-gray-500" />
              <span>{cleaner.specialization}</span>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Services</h3>
              <div className="flex flex-wrap gap-2">
                {cleaner.services.map((service, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Experience</h3>
              <p className="text-gray-600">{cleaner.experience}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Availability</h3>
              <div className="flex flex-wrap gap-3">
                {cleaner.availability?.map((slot, index) => (
                  <div 
                    key={slot._id || index} 
                    className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-lg"
                  >
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{slot.day}: {slot.startTime} - {slot.endTime}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="mt-4">
          <Button 
            onClick={() => onSelect(cleaner)}
            variant={isSelected ? "outline" : "default"}
            className={`w-full py-3 rounded-lg font-semibold text-white ${
              isSelected
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#4338E0] hover:bg-green-600"
            } transition duration-300`}
          >
            {isSelected ? "Unselect Cleaner" : "Select Cleaner"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CleanerModal;