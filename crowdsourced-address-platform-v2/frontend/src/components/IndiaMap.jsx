import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { MarkerClusterGroup } from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './IndiaMap.css';


// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const IndiaMap = () => {
  const [mapCenter] = useState([20.5937, 78.9629]); // Center on India
  const [markers, setMarkers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [formData, setFormData] = useState({
    type: 'building',
    address: '',
    notes: '',
    accuracy: 0,
    state: '',
    district: '',
    pincode: ''
  });

  // Custom component to handle map events
  const MapEvents = () => {
    const map = useMapEvents({
      click: (e) => {
        if (showForm) return; // Don't add marker if form is open
        const { lat, lng } = e.latlng;
        const newMarker = {
          id: Date.now(),
          position: [lat, lng],
          timestamp: new Date().toISOString(),
          type: 'building',
          address: '',
          notes: '',
          accuracy: 0,
          state: '',
          district: '',
          pincode: ''
        };
        setMarkers([...markers, newMarker]);
        setSelectedMarker(newMarker);
        setFormData({
          type: 'building',
          address: '',
          notes: '',
          accuracy: 0,
          state: '',
          district: '',
          pincode: ''
        });
        setShowForm(true);
      },
    });
    return null;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the selected marker with form data
    const updatedMarkers = markers.map(marker => 
      marker.id === selectedMarker.id 
        ? { ...marker, ...formData }
        : marker
    );
    setMarkers(updatedMarkers);
    
    // Update the selected marker
    setSelectedMarker({ ...selectedMarker, ...formData });
    
    // In a real app, this would send data to the backend
    console.log('Marker submitted:', { ...selectedMarker, ...formData });
    
    // Reset form
    setShowForm(false);
    setSelectedMarker(null);
    setFormData({
      type: 'building',
      address: '',
      notes: '',
      accuracy: 0,
      state: '',
      district: '',
      pincode: ''
    });
  };

  // Cancel form submission
  const handleCancel = () => {
    // Remove the temporary marker
    const updatedMarkers = markers.filter(marker => marker.id !== selectedMarker.id);
    setMarkers(updatedMarkers);
    setShowForm(false);
    setSelectedMarker(null);
    setFormData({
      type: 'building',
      address: '',
      notes: '',
      accuracy: 0,
      state: '',
      district: '',
      pincode: ''
    });
  };

  return (
    <div className="map-container">
      <MapContainer 
        center={mapCenter} 
        zoom={5} 
        style={{ height: '100%', width: '100%' }}
        whenCreated={map => {
          // Force resize when map is created
          setTimeout(() => {
            map.invalidateSize();
          }, 100);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        
        <MarkerClusterGroup>
          {markers.map(marker => (
            <Marker key={marker.id} position={marker.position}>
              <Popup>
                <div>
                  <h3>
                    {marker.type === 'building' && '🏢 Building Entrance'}
                    {marker.type === 'street' && '🛣️ Missing Street'}
                    {marker.type === 'boundary' && '🌐 Boundary Update'}
                    {marker.type === 'flag' && '🚩 Fake/Duplicate'}
                    {marker.type === 'landmark' && '📍 Landmark'}
                    {marker.type === 'public_facility' && '🏛️ Public Facility'}
                  </h3>
                  <p><strong>Position:</strong> {marker.position[0].toFixed(6)}, {marker.position[1].toFixed(6)}</p>
                  {marker.address && <p><strong>Address:</strong> {marker.address}</p>}
                  {marker.state && <p><strong>State:</strong> {marker.state}</p>}
                  {marker.district && <p><strong>District:</strong> {marker.district}</p>}
                  {marker.pincode && <p><strong>Pincode:</strong> {marker.pincode}</p>}
                  {marker.notes && <p><strong>Notes:</strong> {marker.notes}</p>}
                  {marker.accuracy > 0 && <p><strong>Accuracy:</strong> {marker.accuracy}m</p>}
                  <p><small>Added: {new Date(marker.timestamp).toLocaleString()}</small></p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      
      {/* Submission Form */}
      {showForm && selectedMarker && (
        <div className="submission-form">
          <h2>Add Location Data</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="type">Location Type:</label>
              <select 
                id="type" 
                name="type" 
                value={formData.type} 
                onChange={handleInputChange}
              >
                <option value="building">🏢 Building Entrance</option>
                <option value="street">🛣️ Missing Street</option>
                <option value="boundary">🌐 Boundary Update</option>
                <option value="flag">🚩 Flag Fake/Duplicate</option>
                <option value="landmark">📍 Landmark</option>
                <option value="public_facility">🏛️ Public Facility</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address Details:</label>
              <input 
                type="text" 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange}
                placeholder="Enter full address"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="state">State:</label>
                <input 
                  type="text" 
                  id="state" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleInputChange}
                  placeholder="Enter state"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="district">District:</label>
                <input 
                  type="text" 
                  id="district" 
                  name="district" 
                  value={formData.district} 
                  onChange={handleInputChange}
                  placeholder="Enter district"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="pincode">Pincode:</label>
              <input 
                type="text" 
                id="pincode" 
                name="pincode" 
                value={formData.pincode} 
                onChange={handleInputChange}
                placeholder="Enter pincode"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="accuracy">GPS Accuracy (meters):</label>
              <input 
                type="number" 
                id="accuracy" 
                name="accuracy" 
                value={formData.accuracy} 
                onChange={handleInputChange}
                placeholder="e.g., 5.5"
                step="0.1"
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="notes">Notes:</label>
              <textarea 
                id="notes" 
                name="notes" 
                value={formData.notes} 
                onChange={handleInputChange}
                placeholder="Additional information about this location"
                rows="3"
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-button">Submit Location</button>
              <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default IndiaMap;