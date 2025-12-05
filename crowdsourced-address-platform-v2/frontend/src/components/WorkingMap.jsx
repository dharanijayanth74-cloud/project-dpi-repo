import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import UserDashboard from './UserDashboard';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WorkingMap = () => {
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
    pincode: '',
    gpsEvidence: ''
  });
  
  // Custom hook for map events
  const MapEvents = () => {
    const map = useMapEvents({
      click(e) {
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
          pincode: '',
          gpsEvidence: '',
          points: 0
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
          pincode: '',
          gpsEvidence: ''
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
  
  // Calculate points based on submission quality
  const calculatePoints = (data) => {
    let points = 0;
    
    // Base points by type
    switch(data.type) {
      case 'building': points += 20; break;
      case 'street': points += 30; break;
      case 'boundary': points += 50; break;
      case 'flag': points += 15; break;
      default: points += 10;
    }
    
    // Bonus points for completeness
    if (data.address) points += 5;
    if (data.state && data.district) points += 5;
    if (data.pincode) points += 5;
    if (data.gpsEvidence) points += 10; // GPS evidence bonus
    if (data.accuracy > 0 && data.accuracy <= 10) points += 5; // High accuracy bonus
    
    return points;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate points for this submission
    const points = calculatePoints(formData);
    
    // Update the selected marker with form data and points
    const updatedMarkers = markers.map(marker => 
      marker.id === selectedMarker.id 
        ? { ...marker, ...formData, points }
        : marker
    );
    
    setMarkers(updatedMarkers);
    setSelectedMarker({ ...selectedMarker, ...formData, points });
    
    // In a real app, this would send data to the backend
    console.log('Marker submitted with', points, 'points:', { ...selectedMarker, ...formData });
    
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
      pincode: '',
      gpsEvidence: ''
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
      pincode: '',
      gpsEvidence: ''
    });
  };
  
  // Get icon based on marker type
  const getMarkerIcon = (type) => {
    switch(type) {
      case 'building': return '🏢';
      case 'street': return '🛣️';
      case 'boundary': return '🌐';
      case 'flag': return '🚩';
      default: return '📍';
    }
  };
  
  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={5} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        
        {/* User Dashboard */}
        <UserDashboard markers={markers} />
        
        {/* Render markers */}
        {markers.map(marker => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>
              <div>
                <h3>{getMarkerIcon(marker.type)} {marker.type.charAt(0).toUpperCase() + marker.type.slice(1)}</h3>
                <p><strong>Position:</strong> {marker.position[0].toFixed(6)}, {marker.position[1].toFixed(6)}</p>
                {marker.address && <p><strong>Address:</strong> {marker.address}</p>}
                {marker.state && <p><strong>Location:</strong> {marker.district}, {marker.state}</p>}
                {marker.pincode && <p><strong>Pincode:</strong> {marker.pincode}</p>}
                {marker.accuracy > 0 && <p><strong>Accuracy:</strong> {marker.accuracy}m</p>}
                {marker.points > 0 && <p><strong>Points Earned:</strong> {marker.points}</p>}
                <p><small>Added: {new Date(marker.timestamp).toLocaleString()}</small></p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Submission Form */}
      {showForm && selectedMarker && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          width: '350px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          <h2>Add Location Data</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="type" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Location Type:</label>
              <select 
                id="type" 
                name="type" 
                value={formData.type} 
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                <option value="building">🏢 Building Entrance</option>
                <option value="street">🛣️ Missing Street</option>
                <option value="boundary">🌐 Locality Boundary</option>
                <option value="flag">🚩 Flag Fake/Duplicate</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="address" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Address Details:</label>
              <input 
                type="text" 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange}
                placeholder="Enter full address"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="state" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>State:</label>
                <input 
                  type="text" 
                  id="state" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleInputChange}
                  placeholder="State"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              
              <div style={{ flex: 1 }}>
                <label htmlFor="district" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>District:</label>
                <input 
                  type="text" 
                  id="district" 
                  name="district" 
                  value={formData.district} 
                  onChange={handleInputChange}
                  placeholder="District"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="pincode" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Pincode:</label>
              <input 
                type="text" 
                id="pincode" 
                name="pincode" 
                value={formData.pincode} 
                onChange={handleInputChange}
                placeholder="Enter pincode"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="accuracy" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>GPS Accuracy (meters):</label>
              <input 
                type="number" 
                id="accuracy" 
                name="accuracy" 
                value={formData.accuracy} 
                onChange={handleInputChange}
                placeholder="e.g., 5.5"
                step="0.1"
                min="0"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="gpsEvidence" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>GPS Evidence (optional):</label>
              <input 
                type="text" 
                id="gpsEvidence" 
                name="gpsEvidence" 
                value={formData.gpsEvidence} 
                onChange={handleInputChange}
                placeholder="GPS coordinates or evidence link"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              <small>Earn bonus points for GPS evidence!</small>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="notes" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Notes:</label>
              <textarea 
                id="notes" 
                name="notes" 
                value={formData.notes} 
                onChange={handleInputChange}
                placeholder="Additional information about this location"
                rows="3"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button 
                type="submit" 
                style={{ 
                  flex: 1, 
                  background: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px', 
                  borderRadius: '4px', 
                  cursor: 'pointer' 
                }}
              >
                Submit Location (+{calculatePoints(formData)} pts)
              </button>
              <button 
                type="button" 
                onClick={handleCancel}
                style={{ 
                  flex: 1, 
                  background: '#6c757d', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px', 
                  borderRadius: '4px', 
                  cursor: 'pointer' 
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 1px 5px rgba(0,0,0,0.2)',
        fontSize: '14px',
        zIndex: 1000
      }}>
        <strong>Legend:</strong><br/>
        <span>🏢 Building | 🛣️ Street | 🌐 Boundary | 🚩 Flag</span>
      </div>
    </div>
  );
};

export default WorkingMap;