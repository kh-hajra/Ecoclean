import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const customPopupStyle = `
  .custom-popup {
    background: transparent;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(67, 56, 224, 0.12);
    min-width: 200px;
    max-width: 230px;
    font-family: system-ui, -apple-system, sans-serif;
    z-index: 1000;
  }

  .custom-popup .mapboxgl-popup-content {
    padding: 0;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #6D28D9;
    pointer-events: auto;
  }

  .popup-header {
    background: white;
    color: #111827;
    padding: 14px;
    font-weight: 600;
    border-bottom: 1px solid #E5E7EB;
  }

  .popup-content {
    background: white;
    padding: 12px;
  }

  .popup-info-item {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
    color: #4B5563;
    font-size: 0.9em;
  }

  .popup-rating {
    color: #6B7280;
    font-size: 0.85em;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .popup-rating .star {
    color: #6D28D9;
  }

  .custom-popup .mapboxgl-popup-close-button {
    right: 8px;
    top: 8px;
    color: #6D28D9;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    padding: 0;
    outline: none;
    transition: all 0.2s ease;
  }

  .custom-popup .mapboxgl-popup-close-button:hover {
    background: rgba(67, 56, 224, 0.15);
  }

  .popup-container {
    cursor: pointer;
    pointer-events: auto;
  }
`;

mapboxgl.accessToken = 'pk.eyJ1Ijoia2gtaGFqcmEiLCJhIjoiY202M2N4dHI0MTcyaDJqc28yMnNrZG02byJ9.jUssFJPm7xaP0qGAttJxzg';

const ServiceMap = ({ cleaners, setCurrentCleaner, setShowCleanerModal }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const popupsRef = useRef({});
  const activePopupRef = useRef(null);
  const styleRef = useRef(null);

  const addOffset = (coordinates) => {
    const offset = (Math.random() - 0.5) * 0.005; // Change this from 0.01 to 0.005
    return [coordinates[0] + offset, coordinates[1] + offset];
  };
  const bringPopupToFront = (cleanerId) => {
    if (!cleanerId || !popupsRef.current[cleanerId]) return;
    const newZIndex = Math.max(...Object.values(popupsRef.current), 0) + 1;
    const popup = popupsRef.current[cleanerId];
    const popupElement = popup.getElement();
    if (popupElement) {
      popupElement.style.zIndex = newZIndex;
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Add custom style
    styleRef.current = document.createElement('style');
    styleRef.current.innerHTML = customPopupStyle;
    document.head.appendChild(styleRef.current);

    // Initialize map
    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [74.3587, 31.5204],
      zoom: 10,
      minZoom: 3,
      maxZoom: 18,
      scrollZoom: true,
    });

    mapInstance.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !cleaners?.length) return;

    // Clear existing markers and popups
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    Object.values(popupsRef.current).forEach(popup => popup.remove());
    popupsRef.current = {};

    // Calculate bounds
    const bounds = new mapboxgl.LngLatBounds();
    cleaners.forEach(cleaner => {
      if (cleaner.coordinates) {
        bounds.extend([cleaner.coordinates.longitude, cleaner.coordinates.latitude]);
      }
    });

    // Add new markers and popups
    cleaners.forEach((cleaner) => {
      if (!cleaner.coordinates) return;

      const offsetCoordinates = addOffset([cleaner.coordinates.longitude, cleaner.coordinates.latitude]);
      const profileImageUrl = cleaner.profileImage || 'default-image-url.png';
      const formattedImageUrl = profileImageUrl.startsWith('http')
        ? profileImageUrl
        : `http://localhost:8080/uploads/${profileImageUrl}`;

      const popupContent = document.createElement('div');
      popupContent.className = 'popup-container';
      popupContent.innerHTML = `
        <div class="popup-container" style="cursor: pointer;">
          <div class="popup-header">
            <div style="display: flex; align-items: center; gap: 12px;">
              <img 
                src="${formattedImageUrl}" 
                alt="${cleaner.cleanerName || 'Cleaner'}" 
                style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover; border: 2px solid #fff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"
              />
              <div>
                <div style="font-weight: 600; font-size: 1.1em; color: #333;">
                  ${cleaner.cleanerName || 'Cleaner'}
                </div>
                <div class="popup-rating" style="display: flex; align-items: center; gap: 4px; font-size: 0.9em; color: #666;">
                  <span class="star" style="color: #FFD700;">★</span> 
                  <span>${cleaner.rating || '5.0'}</span>
                  <span style="margin: 0 2px;">•</span>
                  <span>${cleaner.distance?.toFixed(1) || 0}km</span>
                </div>
              </div>
            </div>
          </div>
          <div class="popup-content">
            <div class="popup-info-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4338E0" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              ${cleaner.phone || 'N/A'}
            </div>
            <div class="popup-info-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4338E0" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12" y2="17"></line>
              </svg>
              ${cleaner.specialization || 'General Cleaning'}
            </div>
          </div>
        </div>
      `;

      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false,
        className: 'custom-popup',
        maxWidth: '250px',
        offset: [0, -15],
      }).setDOMContent(popupContent);

      popupsRef.current[cleaner.id] = popup;

      const marker = new mapboxgl.Marker({
        color: '#22c55e',
        scale: 0.8,
      })
        .setLngLat(offsetCoordinates)
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);

      // Add event listeners
      marker.getElement().addEventListener('click', (e) => {
        e.stopPropagation();
        if (activePopupRef.current) {
          activePopupRef.current.remove();
        }
        setCurrentCleaner(cleaner);
        popup.addTo(map);
        bringPopupToFront(cleaner.id);
        activePopupRef.current = popup;
      });

      popupContent.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activePopupRef.current) {
          activePopupRef.current.remove();
          activePopupRef.current = null;
        }
        setCurrentCleaner(cleaner);
        setShowCleanerModal(true);
      });

      popup.on('close', () => {
        if (activePopupRef.current === popup) {
          activePopupRef.current = null;
        }
      });
    });

    // Fit bounds after adding all markers
    if (cleaners.length > 0) {
      map.fitBounds(bounds, { 
        padding: 50,
        duration: 1000 ,
        // padding: {
        //   top: 100,
        //   bottom: 100,
        //   left: 100,
        //   right: 100
        // },
        maxZoom: 12, // Add this line
        duration: 1000,
        essential: true
      });
    }
  }, [cleaners, setCurrentCleaner, setShowCleanerModal]);

  return (
    <div className="relative w-full mb-8">
      <div 
        id="map" 
        ref={mapContainer} 
        className="w-full h-[400px] rounded-xl shadow-lg" 
        style={{ 
          position: 'relative',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};

export default ServiceMap;