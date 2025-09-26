import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import toast from 'react-hot-toast';
import { uploadSolarData, getNewDeviceList } from '../../Database/Action/DashboardAction';

const UploadDataModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const [selectedUID, setSelectedUID] = useState('');
  const [uploading, setUploading] = useState(false);
  const [filenameUID, setFilenameUID] = useState('');
  const [filename, setFilename] = useState('');

  const deviceList = useSelector(state => state.DashboardReducer.newDeviceList || []);

  useEffect(() => {
    dispatch(getNewDeviceList());
  }, [dispatch]);

  const extractUIDFromFilename = (filename) => {
    const baseName = filename.replace(/\.csv$/i, '');
    return baseName.trim();
  };

  const normalizeUID = (uid) => {
    return String(uid || '').trim().toUpperCase();
  };

  const safeParseFloat = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a CSV file to upload.");
      return;
    }

    e.target.value = null;
    setFilename(file.name);

    if (file.type !== "text/csv" && !file.name.endsWith('.csv')) {
      toast.error("Invalid file type. Please upload a CSV file.");
      return;
    }

    const extractedUID = extractUIDFromFilename(file.name);
    setFilenameUID(extractedUID);

    const normalizedExtractedUID = normalizeUID(extractedUID);

    const deviceExists = deviceList.some(device => {
      const deviceUID = normalizeUID(device?.UID);
      return deviceUID === normalizedExtractedUID;
    });

    if (!deviceExists) {
      toast.error(`The filename UID (${extractedUID}) is not registered. Please select a registered UID.`);
      return;
    }

    setSelectedUID(extractedUID);
    setUploading(true);

    try {
      const results = await new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          transformHeader: header => header.trim(),
          complete: resolve,
          error: reject,
        });
      });

      if (results.errors.length > 0) throw new Error("CSV parsing error");

      const formattedData = results.data
        .filter(row => row['Date & Time'] && row['PV Voltage'])
        .map(row => {
          let recordTime;
          try {
            const dateString = row['Date & Time'].trim();
            if (/^\d{2}:\d{2}:\d{2} \d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
              const [timePart, datePart] = dateString.split(' ');
              const [hours, minutes, seconds] = timePart.split(':');
              const [day, month, year] = datePart.split('/');
              recordTime = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds)).toISOString();
            } else {
              recordTime = new Date().toISOString();
            }
          } catch (err) {
            recordTime = new Date().toISOString();
          }

          return {
            PvVolt: safeParseFloat(row['PV Voltage']),
            PvCur: safeParseFloat(row['PV Current']),
            BatVoltage: safeParseFloat(row['Bat Voltage']),
            BatCurrent: safeParseFloat(row['Bat Current']),
            LoadVoltage: safeParseFloat(row['Bat Voltage']),
            LoadCurrent: safeParseFloat(row['Bat Current']),
            BatKWh: 0,
            PVKWh: safeParseFloat(row['KwH (till date)']),
            Temperature: 0,
            RecordTime: recordTime,
          };
        });

      if (formattedData.length === 0) throw new Error("CSV has no valid data");

      dispatch(uploadSolarData({
        UID: extractedUID,
        data: formattedData,
      }));

      toast.success("Data uploaded successfully");
      onClose();

    } catch (error) {
      console.error("CSV Upload Error:", error);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const isUIDRegistered = (uid) => {
    const normalizedInputUID = normalizeUID(uid);
    return deviceList.some(device => {
      const deviceUID = normalizeUID(device?.UID);
      return deviceUID === normalizedInputUID;
    });
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
              padding: '15px',
              color: 'white',
      backgroundColor: '#0d6efd',
        }}>
          <h3 style={{ margin: 0 }}>Upload Solar Data</h3>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            &times;
          </button>
        </div>
        
        <div style={{ padding: '0px 16px 16px 16px' }}>
          <div >
            <label style={{ display: 'block',}}>Select UID</label>
            <select
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                margin: '0px 0px 16px 0px ',
                border: '1px solid #ddd'
              }}
              value={selectedUID}
              onChange={(e) => setSelectedUID(e.target.value)}
            >
              <option value="">-- Avalible Device UID (Unique CODE)--</option>
              {deviceList.map((item, idx) => (
                <option key={idx} value={item.UID}>{item.UID}</option>
              ))}
            </select>
            {filename && (
              <div style={{ marginTop: '8px' }}>
                <small style={{ color: isUIDRegistered(filenameUID) ? 'green' : 'red' }}>
                  This UID from filename: {filenameUID} 
                  {isUIDRegistered(filenameUID) ? ' (Registered)' : ' (Not registered--Register First )'} 
                </small>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="fileUpload" style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: '#0d6efd',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              {uploading ? (
                <i className="fas fa-spinner fa-spin" />
              ) : (
                <>
                  <i className="fa-solid fa-upload" /> Upload Device Data in CSV
                </>
              )}
            </label>
            <input
              id="fileUpload"
              type="file"
              accept=".csv"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <div style={{ marginTop: '8px' }}>
              <small style={{ color: '#6c757d' }}>
                File name format: UID.csv (e.g., IND.RAJ.SHA001.csv)
              </small>
            </div>
          </div>
        </div>
        
        <div >
      
        </div>
      </div>
    </div>
  );
};

export default UploadDataModal;